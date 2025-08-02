module Backend exposing (..)

import Auth.Common
import Auth.Flow
import Auth.PasswordHash exposing (HashedPassword, generateHashedPassword, verifyPassword)
import Dict
-- import Fusion.Generated.Types
-- import Fusion.Patch
import Lamdera
import Random
import RPC
import Rights.Auth0 exposing (backendConfig)
import Rights.Permissions exposing (sessionCanPerformAction)
import Rights.Role exposing (roleToString)
import Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)
import Supplemental exposing (..)
import Task
import Types exposing (..)


type alias Model =
    BackendModel


app =
    Lamdera.backend
        { init = init
        , update = update
        , updateFromFrontend = updateFromFrontendCheckingRights
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub msg
subscriptions _ =
    Sub.batch
        [-- things that run on timers and things that listen to the outside world
        ]


init : ( Model, Cmd BackendMsg )
init =
    ( { logs = []
      , pendingAuths = Dict.empty
      , sessions = Dict.empty
      , users = Dict.empty
      , emailPasswordCredentials = Dict.empty
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
            Auth.Flow.backendUpdate (backendConfig model) authMsg

        EmailPasswordAuthResult result ->
            case result of
                EmailPasswordSignupWithHash browserCookie connectionId email password maybeName salt hash ->
                    completeEmailPasswordSignup browserCookie connectionId email password maybeName salt hash model

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


updateFromFrontend : BrowserCookie -> ConnectionId -> ToBackend -> Model -> ( Model, Cmd BackendMsg )
updateFromFrontend browserCookie connectionId msg model =
    case msg of
        NoOpToBackend ->
            ( model, Cmd.none )

        Admin_FetchLogs ->
            ( model, Lamdera.sendToFrontend connectionId (Admin_Logs_ToFrontend model.logs) )

        Admin_ClearLogs ->
            let
                newModel =
                    { model | logs = [] }
            in
            ( newModel, Lamdera.sendToFrontend connectionId (Admin_Logs_ToFrontend newModel.logs) )

        Admin_FetchRemoteModel remoteUrl ->
            ( model
              -- put your production model key in here to fetch from your prod env.
            , RPC.fetchImportedModel remoteUrl "1234567890"
                |> Task.attempt GotRemoteModel
            )

        AuthToBackend authToBackend ->
            Auth.Flow.updateFromFrontend (backendConfig model) connectionId browserCookie authToBackend model

        EmailPasswordAuthToBackend authMsg ->
            handleEmailPasswordAuth browserCookie connectionId authMsg model

        GetUserToBackend ->
            case Dict.get browserCookie model.sessions of
                Just userInfo ->
                    case getUserFromCookie browserCookie model of
                        Just user ->
                            ( model, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend user ] )

                        Nothing ->
                            let
                                initialPreferences =
                                    { darkMode = True } -- Default new users to dark mode
                                
                                user =
                                    createUser userInfo initialPreferences

                                newModel =
                                    insertUser userInfo.email user model
                            in
                            ( newModel, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend user ] )

                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId <| UserInfoMsg Nothing )

        LoggedOut ->
            ( { model | sessions = Dict.remove browserCookie model.sessions }, Cmd.none )

        SetDarkModePreference preference ->
            case getUserFromCookie browserCookie model of
                Just user ->
                    let
                        -- Explicitly alias the nested record
                        currentPreferences = 
                            user.preferences
                        
                        updatedUserPreferences : Preferences
                        updatedUserPreferences =
                            { currentPreferences | darkMode = preference } -- Update the alias
                        
                        updatedUser : User
                        updatedUser =
                            { user | preferences = updatedUserPreferences }

                        updatedUsers =
                            Dict.insert user.email updatedUser model.users
                    in
                    ( { model | users = updatedUsers }, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )
                        |> log "User or session not found for SetDarkModePreference"

        A00_WebSocketReceive message ->
            -- Echo websocket message back to frontend
            ( model, Lamdera.sendToFrontend connectionId (A00_WebSocketSend ("Echo: " ++ message)) )

        -- Fusion_PersistPatch patch ->
        --     let
        --         value =
        --             Fusion.Patch.patch { force = False } patch (Fusion.Generated.Types.toValue_BackendModel model)
        --                 |> Result.withDefault (Fusion.Generated.Types.toValue_BackendModel model)
        --     in
        --     case
        --         Fusion.Generated.Types.build_BackendModel value
        --     of
        --         Ok newModel ->
        --             ( newModel
        --               -- , Lamdera.sendToFrontend connectionId (Admin_FusionResponse value)
        --             , Cmd.none
        --             )

                -- Err err ->
                --     ( model
                --     , Cmd.none
                --     )
                --         |> log ("Failed to apply fusion patch: " ++ Debug.toString err)

        -- Fusion_Query query ->
        --     ( model
        --     , Lamdera.sendToFrontend connectionId (Admin_FusionResponse (Fusion.Generated.Types.toValue_BackendModel model))
        --     )


updateFromFrontendCheckingRights : BrowserCookie -> ConnectionId -> ToBackend -> Model -> ( Model, Cmd BackendMsg )
updateFromFrontendCheckingRights browserCookie connectionId msg model =
    if
        case msg of
            NoOpToBackend ->
                True

            LoggedOut ->
                True

            AuthToBackend _ ->
                True

            EmailPasswordAuthToBackend _ ->
                True

            GetUserToBackend ->
                True
            
            SetDarkModePreference _ -> -- Allow everyone to set their own preference
                True

            _ ->
                sessionCanPerformAction model browserCookie msg
    then
        updateFromFrontend browserCookie connectionId msg model

    else
        ( model, Lamdera.sendToFrontend connectionId (PermissionDenied msg) )


getUserFromCookie : BrowserCookie -> Model -> Maybe User
getUserFromCookie browserCookie model =
    Dict.get browserCookie model.sessions
        |> Maybe.andThen (\userInfo -> Dict.get userInfo.email model.users)


log =
    Supplemental.log NoOpBackendMsg


userToFrontend : User -> UserFrontend
userToFrontend user =
    { email = user.email
    , isSysAdmin = isSysAdmin user
    , role = getUserRole user |> roleToString
    , preferences = user.preferences
    }


handleEmailPasswordAuth : BrowserCookie -> ConnectionId -> EmailPasswordAuthToBackend -> Model -> ( Model, Cmd BackendMsg )
handleEmailPasswordAuth browserCookie connectionId authMsg model =
    case authMsg of
        EmailPasswordLoginToBackend email password ->
            handleEmailPasswordLogin browserCookie connectionId email password model

        EmailPasswordSignupToBackend email password maybeName ->
            handleEmailPasswordSignup browserCookie connectionId email password maybeName model


handleEmailPasswordLogin : BrowserCookie -> ConnectionId -> String -> String -> Model -> ( Model, Cmd BackendMsg )
handleEmailPasswordLogin browserCookie connectionId email password model =
    case Dict.get email model.emailPasswordCredentials of
        Just creds ->
            let
                hashedPassword = { hash = creds.passwordHash, salt = creds.passwordSalt }
            in
            if verifyPassword password hashedPassword then
                let
                    -- Get user name from stored user data
                    userName = case Dict.get email model.users of
                        Just user -> user.name
                        Nothing -> Nothing
                    
                    userInfo = { email = email, name = userName, username = Nothing, picture = Nothing }
                    newSessions = Dict.insert browserCookie userInfo model.sessions
                in
                ( { model | sessions = newSessions }
                , Lamdera.sendToFrontend connectionId (AuthSuccess userInfo)
                )
            else
                ( model
                , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
                )

        Nothing ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
            )


handleEmailPasswordSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> Model -> ( Model, Cmd BackendMsg )
handleEmailPasswordSignup browserCookie connectionId email password maybeName model =
    case Dict.get email model.emailPasswordCredentials of
        Just _ ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "User already exists")))
            )

        Nothing ->
            let
                saltGenerator = Random.int 100000000 999999999 |> Random.map String.fromInt
                cmd = Random.generate (\salt -> 
                    EmailPasswordAuthResult (EmailPasswordSignupWithHash browserCookie connectionId email password maybeName salt (Auth.PasswordHash.hashPassword salt password).hash)
                    ) saltGenerator
            in
            ( model, cmd )


completeEmailPasswordSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> String -> String -> Model -> ( Model, Cmd BackendMsg )
completeEmailPasswordSignup browserCookie connectionId email password maybeName salt hash model =
    let
        newCredentials =
            { email = email
            , passwordHash = hash
            , passwordSalt = salt  
            , createdAt = 0
            }
        
        initialPreferences = { darkMode = True }
        user = { email = email, name = maybeName, preferences = initialPreferences }
        userInfo = { email = email, name = maybeName, username = Nothing, picture = Nothing }
        
        updatedModel = 
            { model 
            | emailPasswordCredentials = Dict.insert email newCredentials model.emailPasswordCredentials
            , users = Dict.insert email user model.users
            , sessions = Dict.insert browserCookie userInfo model.sessions
            }
    in
    ( updatedModel, Lamdera.sendToFrontend connectionId (AuthSuccess userInfo) )  
