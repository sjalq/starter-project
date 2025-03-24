module Backend exposing (..)

import Types exposing (..)
import Lamdera exposing (ClientId, SessionId, sendToFrontend)
import Dict
import Task
import Time
import Auth.Flow
import Auth.Common exposing (backendConfig)
import Rights.Permissions exposing (sessionCanPerformAction)
import Rights.Role exposing (roleToString)
import Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)
import Supplemental exposing (..)


type alias Model =
    BackendModel


app =
    Lamdera.backend
        { init = init
        , update = update
        , updateFromFrontend = updateFromFrontend
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub BackendMsg
subscriptions model =
    Sub.none


init : ( Model, Cmd BackendMsg )
init =
    ( { logs = []
      , pendingAuths = Dict.empty
      , sessions = Dict.empty
      , users = Dict.empty
      , pollingJobs = Dict.empty
      }
    , Cmd.none
    )


update : BackendMsg -> Model -> ( Model, Cmd BackendMsg )
update msg model =
    case msg of
        NoOpBackendMsg ->
            ( model, Cmd.none )

        Log logMsg ->
            ( model, Cmd.none )
                |> log logMsg

        GotRemoteModel result ->
            case result of
                Ok model_ ->
                    ( model_, Cmd.none )
                        |> log "GotRemoteModel Ok"

                Err err ->
                    ( model, Cmd.none )
                        |> log ("GotRemoteModel Err: " ++ httpErrorToString err)

        AuthBackendMsg authMsg ->
            Auth.Flow.backendUpdate (Auth.backendConfig model) authMsg

        GotCryptoPriceResult token result ->
            case result of
                Ok priceStr ->
                    let
                        updatedPollingJobs =
                            Dict.insert token (Ready (Ok priceStr)) model.pollingJobs
                    in
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> log ("Crypto price calculated: " ++ priceStr)

                Err err ->
                    let
                        updatedPollingJobs =
                            Dict.insert token (Ready (Err (httpErrorToString err))) model.pollingJobs
                    in
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> log ("Failed to calculate crypto price: " ++ httpErrorToString err)

        StoreTaskResult token result ->
            let
                updatedPollingJobs =
                    Dict.insert token (Ready result) model.pollingJobs
                
                logMsg =
                    case result of
                        Ok data ->
                            "Task completed successfully: " ++ token
                        
                        Err err ->
                            "Task failed: " ++ token ++ " - " ++ err
            in
            ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                |> log logMsg

        GotJobTime token timestamp ->
            let
                updatedPollingJobs =
                    Dict.insert token (BusyWithTime timestamp) model.pollingJobs
            in
            ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                |> log ("Updated job " ++ token ++ " with timestamp: " ++ String.fromInt timestamp)


updateFromFrontend : SessionId -> ClientId -> ToBackend -> Model -> ( Model, Cmd BackendMsg )
updateFromFrontend sessionId clientId msg model =
    case msg of
        NoOpToBackend ->
            ( model, Cmd.none )

        Admin_FetchLogs ->
            ( model, sendToFrontend clientId (Admin_Logs_ToFrontend model.logs) )

        Admin_ClearLogs ->
            ( { model | logs = [] }, Cmd.none )

        Admin_FetchRemoteModel url ->
            ( model, Cmd.none )

        AuthToBackend authToBackend ->
            Auth.Flow.updateFromFrontend (Auth.backendConfig model) clientId sessionId authToBackend model

        GetUserToBackend ->
            case Dict.get sessionId model.sessions of
                Just userInfo ->
                    case Dict.get userInfo.email model.users of
                        Just user ->
                            ( model
                            , sendToFrontend clientId (UserDataToFrontend { email = user.email, role = "user", isSysAdmin = user.isSysAdmin })
                            )

                        Nothing ->
                            ( model, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )

        LoggedOut ->
            ( { model | sessions = Dict.remove sessionId model.sessions }
            , sendToFrontend clientId (UserInfoMsg Nothing)
            )

        Fusion_PersistPatch patch ->
            ( model, Cmd.none )

        Fusion_Query query ->
            ( model, Cmd.none )

        InitiateUpload filename ->
            -- Here you would typically:
            -- 1. Generate a presigned URL from your S3 provider
            -- 2. Send it back to the frontend
            -- For this example, we'll simulate success:
            ( model
            , Task.perform
                (\_ ->
                    let
                        uploadUrl =
                            "https://your-s3-bucket.s3.amazonaws.com/" ++ filename
                    in
                    sendToFrontend clientId (FileUploadInitiated uploadUrl)
                )
                Time.now
            )

        UploadChunk filename chunkNum base64Data ->
            -- Here you would:
            -- 1. Decode the base64 data
            -- 2. Upload the chunk to S3
            -- 3. Send progress updates to the frontend
            -- For this example, we'll simulate progress:
            let
                progress =
                    toFloat chunkNum * 10
            in
            if progress >= 100 then
                ( model
                , sendToFrontend clientId
                    (FileUploadComplete ("https://your-s3-bucket.s3.amazonaws.com/" ++ filename))
                )

            else
                ( model
                , sendToFrontend clientId (FileUploadProgress progress)
                )


log =
    Supplemental.log NoOpBackendMsg


userToFrontend : User -> UserFrontend
userToFrontend user =
    { email = user.email
    , isSysAdmin = isSysAdmin user
    , role = getUserRole user |> roleToString
    }
