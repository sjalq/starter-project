module Backend exposing (..)

import Auth.Flow
import Dict
import Fusion.Generated.Types
import Fusion.Patch
import Lamdera
import RPC
import Rights.Auth0 exposing (backendConfig)
import Rights.Permissions exposing (sessionCanPerformAction)
import Rights.Role exposing (roleToString)
import Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)
import Supplemental exposing (..)
import Task
import Time exposing (Posix, millisToPosix)
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
      , pollingJobs = Dict.empty
      , userAgentConfigs = Dict.empty
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
            let
                _ =
                    Debug.log "AuthToBackend" authToBackend
            in
            Auth.Flow.updateFromFrontend (backendConfig model) connectionId browserCookie authToBackend model

        GetUserToBackend ->
            case Dict.get browserCookie model.sessions of
                Just userInfo ->
                    case Dict.get userInfo.email model.users of
                        Just user ->
                            ( model, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend user ] )

                        Nothing ->
                            let
                                user =
                                    createUser userInfo

                                newModel =
                                    insertUser userInfo.email user model
                            in
                            ( newModel, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend user ] )

                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId <| UserInfoMsg Nothing )

        LoggedOut ->
            ( { model | sessions = Dict.remove browserCookie model.sessions }, Cmd.none )

        Fusion_PersistPatch patch ->
            let
                value =
                    Fusion.Patch.patch { force = False } patch (Fusion.Generated.Types.toValue_BackendModel model)
                        |> Result.withDefault (Fusion.Generated.Types.toValue_BackendModel model)
            in
            case
                Fusion.Generated.Types.build_BackendModel value
            of
                Ok newModel ->
                    ( newModel
                      -- , Lamdera.sendToFrontend connectionId (Admin_FusionResponse value)
                    , Cmd.none
                    )

                Err err ->
                    ( model
                    , Cmd.none
                    )
                        |> log ("Failed to apply fusion patch: " ++ Debug.toString err)

        Fusion_Query query ->
            ( model
            , Lamdera.sendToFrontend connectionId (Admin_FusionResponse (Fusion.Generated.Types.toValue_BackendModel model))
            )
        
        RequestAgentConfigs ->
            case getCurrentUserEmail model browserCookie of
                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId (PermissionDenied RequestAgentConfigs) ) 
                
                Just userEmail ->
                    let
                        configs = Dict.get userEmail model.userAgentConfigs |> Maybe.withDefault Dict.empty
                        configsWithDefaults = addDefaultAgentConfigs configs
                        configsView : Dict.Dict AgentConfigId AgentConfigView
                        configsView = Dict.map (\_ cfg -> agentConfigToView cfg) configsWithDefaults
                        
                        -- Update model if defaults were added
                        newModel = 
                            if Dict.isEmpty configs then
                                { model | userAgentConfigs = Dict.insert userEmail configsWithDefaults model.userAgentConfigs }
                            else
                                model
                    in
                    ( newModel, Lamdera.sendToFrontend connectionId (ReceiveAgentConfigs configsView) )

        SaveAgentConfig agentConfig ->
            case getCurrentUserEmail model browserCookie of
                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId (PermissionDenied msg) )
                
                Just userEmail ->
                    let
                        currentUserConfigs = Dict.get userEmail model.userAgentConfigs |> Maybe.withDefault Dict.empty
                        configsWithDefaults = addDefaultAgentConfigs currentUserConfigs
                        
                        -- Use simple synchronous ID generation for new configs
                        finalConfigSimpleId = 
                             if agentConfig.id == "new-agent" then
                                 -- NOTE: This ID generation is very basic.
                                 { agentConfig | id = userEmail ++ "-" ++ String.fromInt (10000 + Dict.size currentUserConfigs) } 
                             else
                                 agentConfig

                        updatedUserConfigs = Dict.insert finalConfigSimpleId.id finalConfigSimpleId configsWithDefaults
                        
                        -- Update the main backend model
                        newModel =
                            { model | userAgentConfigs = Dict.insert userEmail updatedUserConfigs model.userAgentConfigs }
                        
                        -- Create the view model to send back
                        updatedConfigsView =
                            Dict.map (\_ cfg -> agentConfigToView cfg) updatedUserConfigs
                    in
                    ( newModel, Lamdera.sendToFrontend connectionId (ReceiveAgentConfigs updatedConfigsView) )
                        |> log ("Saved config " ++ finalConfigSimpleId.id ++ " for user " ++ userEmail)

        DeleteAgentConfig configId ->
            ( model, Cmd.none )


updateFromFrontendCheckingRights : BrowserCookie -> ConnectionId -> ToBackend -> Model -> ( Model, Cmd BackendMsg )
updateFromFrontendCheckingRights browserCookie connectionId msg model =
    -- Check permission first before processing the message
    if
        case msg of
            NoOpToBackend ->
                True

            LoggedOut ->
                True

            AuthToBackend _ ->
                True

            GetUserToBackend ->
                True

            _ ->
                sessionCanPerformAction model browserCookie msg
    then
        -- User has permission, process the message
        updateFromFrontend browserCookie connectionId msg model

    else
        -- User doesn't have permission, send PermissionDenied message
        ( model, Lamdera.sendToFrontend connectionId (PermissionDenied msg) )


log =
    Supplemental.log NoOpBackendMsg


userToFrontend : User -> UserFrontend
userToFrontend user =
    { email = user.email
    , isSysAdmin = isSysAdmin user
    , role = getUserRole user |> roleToString
    }


-- Helper Functions --

generateUniqueIdForUser : Email -> Posix -> AgentConfigId
generateUniqueIdForUser email time =
    email ++ "-" ++ String.fromInt (Time.posixToMillis time)

getCurrentUserEmail : BackendModel -> BrowserCookie -> Maybe Email
getCurrentUserEmail model browserCookie =
    Dict.get browserCookie model.sessions
        |> Maybe.map (\userInfo -> userInfo.email)

agentConfigToView : AgentConfig -> AgentConfigView
agentConfigToView config =
    { id = config.id
    , name = config.name
    , provider = config.provider
    , endpoint = config.endpoint
    }

defaultAgentConfigs : UserAgentConfigs
defaultAgentConfigs =
    let
        openai = { id = "default-openai", name = "OpenAI (Default)", provider = OpenAI, endpoint = "https://api.openai.com/v1/chat/completions", apiKey = "" } -- API Key is empty for defaults
        anthropic = { id = "default-anthropic", name = "Anthropic Claude (Default)", provider = Anthropic, endpoint = "https://api.anthropic.com/v1/messages", apiKey = "" }
        gemini = { id = "default-gemini", name = "Google Gemini (Default)", provider = GoogleGemini, endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", apiKey = "" }
    in
    Dict.fromList
        [ ( openai.id, openai )
        , ( anthropic.id, anthropic )
        , ( gemini.id, gemini )
        ]

addDefaultAgentConfigs : UserAgentConfigs -> UserAgentConfigs
addDefaultAgentConfigs existingConfigs =
    if Dict.isEmpty existingConfigs then
        defaultAgentConfigs
    else
        existingConfigs
