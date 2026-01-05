module Backend exposing (Model, app)

-- import Fusion.Generated.Types
-- import Fusion.Patch

import Auth.EmailPasswordAuth as EmailPasswordAuth
import Auth.Flow
import Dict
import Env
import Lamdera
import Logger
import Rights.Auth0 exposing (backendConfig)
import Rights.Permissions exposing (sessionCanPerformAction)
import Rights.Role exposing (roleToString)
import Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)
import Supplemental exposing (..)
import Task
import TestData
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
    Sub.none


init : ( Model, Cmd BackendMsg )
init =
    let
        logSize =
            Env.logSize |> String.toInt |> Maybe.withDefault 2000

        initialModel =
            { logState = Logger.init logSize
            , pendingAuths = Dict.empty
            , sessions = Dict.empty
            , users = Dict.empty
            , emailPasswordCredentials = Dict.empty
            , pollingJobs = Dict.empty
            }

        -- Initialize with test data for development
        modelWithTestData =
            TestData.initializeTestData initialModel
    in
    ( modelWithTestData, Cmd.none )


update : BackendMsg -> Model -> ( Model, Cmd BackendMsg )
update msg model =
    case msg of
        NoOpBackendMsg ->
            ( model, Cmd.none )

        GotLogTime loggerMsg ->
            ( { model | logState = Logger.handleMsg loggerMsg model.logState }
            , Cmd.none
            )

        GotRemoteModel result ->
            case result of
                Ok model_ ->
                    ( model_, Cmd.none )
                        |> Logger.logInfo "GotRemoteModel Ok" GotLogTime

                Err err ->
                    ( model, Cmd.none )
                        |> Logger.logError ("GotRemoteModel Err: " ++ httpErrorToString err) GotLogTime

        AuthBackendMsg authMsg ->
            Auth.Flow.backendUpdate (backendConfig model) authMsg

        EmailPasswordAuthResult result ->
            case result of
                EmailPasswordSignupWithHash browserCookie connectionId email password maybeName salt hash ->
                    EmailPasswordAuth.completeSignup browserCookie connectionId email password maybeName salt hash model

        GotCryptoPriceResult token result ->
            case result of
                Ok priceStr ->
                    let
                        updatedPollingJobs =
                            Dict.insert token (Ready (Ok priceStr)) model.pollingJobs
                    in
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> Logger.logInfo ("Crypto price calculated: " ++ priceStr) GotLogTime

                Err err ->
                    let
                        updatedPollingJobs =
                            Dict.insert token (Ready (Err (httpErrorToString err))) model.pollingJobs
                    in
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> Logger.logError ("Failed to calculate crypto price: " ++ httpErrorToString err) GotLogTime

        StoreTaskResult token result ->
            let
                updatedPollingJobs =
                    Dict.insert token (Ready result) model.pollingJobs
            in
            case result of
                Ok _ ->
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> Logger.logInfo ("Task completed successfully: " ++ token) GotLogTime

                Err err ->
                    ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                        |> Logger.logError ("Task failed: " ++ token ++ " - " ++ err) GotLogTime

        GotJobTime token timestamp ->
            let
                updatedPollingJobs =
                    Dict.insert token (BusyWithTime timestamp) model.pollingJobs
            in
            ( { model | pollingJobs = updatedPollingJobs }, Cmd.none )
                |> Logger.logDebug ("Updated job " ++ token ++ " with timestamp: " ++ String.fromInt timestamp) GotLogTime


updateFromFrontend : BrowserCookie -> ConnectionId -> ToBackend -> Model -> ( Model, Cmd BackendMsg )
updateFromFrontend browserCookie connectionId msg model =
    case msg of
        NoOpToBackend ->
            ( model, Cmd.none )

        Admin_FetchLogs searchQuery ->
            let
                allLogs =
                    Logger.toList model.logState

                filteredLogs =
                    if String.isEmpty searchQuery then
                        allLogs

                    else
                        allLogs
                            |> List.filter
                                (\logEntry ->
                                    String.contains (String.toLower searchQuery)
                                        (String.toLower logEntry.message)
                                )
            in
            ( model, Lamdera.sendToFrontend connectionId (Admin_Logs_ToFrontend filteredLogs) )

        Admin_ClearLogs ->
            let
                logSize =
                    Env.logSize |> String.toInt |> Maybe.withDefault 2000

                newModel =
                    { model | logState = Logger.init logSize }
            in
            ( newModel, Lamdera.sendToFrontend connectionId (Admin_Logs_ToFrontend []) )

        Admin_FetchRemoteModel _ ->
            -- Remote model fetching removed (was RPC-based)
            ( model, Cmd.none )

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
                                    { darkMode = True }

                                -- Default new users to dark mode
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
                            { currentPreferences | darkMode = preference }

                        -- Update the alias
                        updatedUser : User
                        updatedUser =
                            { user | preferences = updatedUserPreferences }

                        updatedUsers =
                            Dict.insert user.email updatedUser model.users
                    in
                    ( { model | users = updatedUsers }, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )
                        |> Logger.logWarn "User or session not found for SetDarkModePreference" GotLogTime

        A message ->
            -- Echo websocket message back to frontend
            ( model, Lamdera.sendToFrontend connectionId (A0 ("Echo: " ++ message)) )


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

            SetDarkModePreference _ ->
                -- Allow everyone to set their own preference
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
            EmailPasswordAuth.handleLogin browserCookie connectionId email password model

        EmailPasswordSignupToBackend email password maybeName ->
            EmailPasswordAuth.handleSignup browserCookie connectionId email password maybeName model
