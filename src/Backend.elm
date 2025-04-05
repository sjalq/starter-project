module Backend exposing (..)

import Auth.Flow
import Dict
-- import Fusion.Generated.Types
-- import Fusion.Patch
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
      , userAgentConfigs = Dict.empty -- This remains Dict.empty, records are created on demand
      , chatHistories = Dict.empty
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
                            let
                                userConfigs = Dict.get userInfo.email model.userAgentConfigs
                            in
                            ( model, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend userConfigs user ] )

                        Nothing ->
                            let
                                user =
                                    createUser userInfo

                                newModel =
                                    insertUser userInfo.email user model

                                -- User has no configs yet, so defaultAgentId is Nothing
                                userConfigs = Nothing
                            in
                            ( newModel, Cmd.batch [ Lamdera.sendToFrontend connectionId <| UserInfoMsg <| Just userInfo, Lamdera.sendToFrontend connectionId <| UserDataToFrontend <| userToFrontend userConfigs user ] )

                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId <| UserInfoMsg Nothing )

        LoggedOut ->
            ( { model | sessions = Dict.remove browserCookie model.sessions }, Cmd.none )

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

        --         Err err ->
        --             ( model
        --             , Cmd.none
        --             )
        --                 |> log ("Failed to apply fusion patch: " ++ Debug.toString err)

            -- Fusion_Query query ->
            --     ( model
            --     , Lamdera.sendToFrontend connectionId (Admin_FusionResponse (Fusion.Generated.Types.toValue_BackendModel model))
            --     )
        
        RequestAgentConfigs ->
            case getCurrentUserEmail model browserCookie of
                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId (PermissionDenied RequestAgentConfigs) ) 
                
                Just userEmail ->
                    let
                        -- Directly fetch the user's config record, which should exist
                        currentUserAgentRecord = 
                            Dict.get userEmail model.userAgentConfigs 
                                -- Provide a fallback just in case, but log it 
                                |> Maybe.withDefault { configs = Dict.empty, defaultId = Nothing } 
                                
                        -- No need to add defaults anymore
                        -- configsWithDefaultsRecord = addDefaultAgentConfigsIfEmpty currentUserAgentRecord
                            
                        configsView : Dict.Dict AgentConfigId AgentConfigView
                        configsView = 
                            Dict.map (\_ cfg -> agentConfigToView cfg) currentUserAgentRecord.configs
                        
                        -- No model update needed here anymore
                        newModel = model

                        payload : { configs : Dict.Dict AgentConfigId AgentConfigView, defaultId : Maybe AgentConfigId }
                        payload =
                            { configs = configsView
                            , defaultId = currentUserAgentRecord.defaultId
                            }
                    in
                    ( newModel, Lamdera.sendToFrontend connectionId (ReceiveAgentData payload) )

        SaveAgentConfig agentConfig ->
            case getCurrentUserEmail model browserCookie of
                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId (PermissionDenied msg) )
                
                Just userEmail ->
                    let
                        currentUserAgentRecord = 
                            Dict.get userEmail model.userAgentConfigs 
                            |> Maybe.withDefault { configs = Dict.empty, defaultId = Nothing } -- Should exist

                        -- No need for defaults here either
                        
                        -- Use simple synchronous ID generation for new configs
                        finalConfigSimpleId =
                             if agentConfig.id == "new-agent" then
                                 -- NOTE: This ID generation is very basic.
                                { agentConfig | id = userEmail ++ "-" ++ String.fromInt (10000 + Dict.size currentUserAgentRecord.configs) } 
                             else
                                 agentConfig

                        updatedConfigsDict = Dict.insert finalConfigSimpleId.id finalConfigSimpleId currentUserAgentRecord.configs
                        
                        -- Preserve existing default ID when saving
                        updatedUserAgentRecord =
                            { currentUserAgentRecord | configs = updatedConfigsDict }
                        
                        -- Update the main backend model
                        newModel =
                            { model | userAgentConfigs = Dict.insert userEmail updatedUserAgentRecord model.userAgentConfigs }
                        
                        -- Create the view model to send back
                        payload : { configs : Dict.Dict AgentConfigId AgentConfigView, defaultId : Maybe AgentConfigId }
                        payload =
                            { configs = Dict.map (\_ cfg -> agentConfigToView cfg) updatedUserAgentRecord.configs
                            , defaultId = updatedUserAgentRecord.defaultId
                            }
                    in
                    ( newModel, Lamdera.sendToFrontend connectionId (ReceiveAgentData payload) )
                        |> log ("Saved config " ++ finalConfigSimpleId.id ++ " for user " ++ userEmail)

        SendChatMsg messageText ->
            let
                -- 1. Parse message for @mentions (placeholder)
                targetAgentId : Maybe AgentId
                targetAgentId =
                    if String.startsWith "@@" messageText then
                        -- Super basic parsing - takes the first word after @
                        messageText
                            |> String.split " "
                            |> List.head
                            |> Maybe.map (String.dropLeft 1)
                    else
                        Nothing

                -- 2. Determine responding agent (placeholder - use default or mentioned)
                maybeDefaultId = 
                    getCurrentUserEmail model browserCookie
                        |> Maybe.andThen (\email -> Dict.get email model.userAgentConfigs)
                        |> Maybe.andThen (.defaultId)

                respondingAgentId : AgentId
                respondingAgentId =
                    case targetAgentId of 
                        Just mentionedId -> mentionedId -- Use @mention if present
                        Nothing -> Maybe.withDefault "DefaultAgent" maybeDefaultId -- Otherwise use stored default, fallback to "DefaultAgent"

                -- 3. Construct user message to store
                userChatMessage : ChatMessage
                userChatMessage =
                    { sender = UserSender, text = messageText }

                -- 4. Generate placeholder agent response
                agentResponseText : String
                agentResponseText =
                    "Agent " ++ respondingAgentId ++ " received: '" ++ messageText ++ "' (placeholder response)"
                
                agentChatMessage : ChatMessage
                agentChatMessage =
                    { sender = AgentSender respondingAgentId, text = agentResponseText }

                -- 5. Update chat history for the user session
                currentHistory =
                    Dict.get browserCookie model.chatHistories
                        |> Maybe.withDefault []
                
                updatedHistory =
                    currentHistory ++ [ userChatMessage, agentChatMessage ]

                newModel =
                    { model | chatHistories = Dict.insert browserCookie updatedHistory model.chatHistories }
                
                -- 6. Send only the agent's response back to the frontend
                cmd =
                    Lamdera.sendToFrontend connectionId (ReceiveChatMsg agentChatMessage)

            in
            ( newModel, cmd )
                |> log ("Chat message from " ++ Debug.toString browserCookie ++ ": '" ++ messageText ++ "' -> Agent: " ++ respondingAgentId)

        DeleteAgentConfig configId ->
            ( model, Cmd.none )

        SetDefaultAgent agentIdToSet ->
            case getCurrentUserEmail model browserCookie of
                Nothing ->
                    ( model, Lamdera.sendToFrontend connectionId (PermissionDenied msg) )

                Just userEmail ->
                    let
                        currentUserAgentRecord =
                            Dict.get userEmail model.userAgentConfigs 
                            |> Maybe.withDefault { configs = Dict.empty, defaultId = Nothing } -- Should exist

                        -- Check if the agentId exists in the user's configurations
                        agentExists =
                            Dict.member agentIdToSet currentUserAgentRecord.configs

                        ( updatedModel, cmdToSend ) =
                            if agentExists then
                                let
                                    -- Update the record with the new defaultId
                                    updatedUserAgentRecord = 
                                        { currentUserAgentRecord | defaultId = Just agentIdToSet }
                                    
                                    newModel =
                                         { model | userAgentConfigs = Dict.insert userEmail updatedUserAgentRecord model.userAgentConfigs }
                                        
                                    -- Prepare payload for frontend update
                                    payload : { configs : Dict.Dict AgentConfigId AgentConfigView, defaultId : Maybe AgentConfigId }
                                    payload =
                                        { configs = Dict.map (\_ cfg -> agentConfigToView cfg) updatedUserAgentRecord.configs
                                        , defaultId = updatedUserAgentRecord.defaultId
                                        }
                                in
                                ( newModel, Lamdera.sendToFrontend connectionId (ReceiveAgentData payload) )

                            else
                                -- Agent ID doesn't exist, maybe log an error, don't change anything
                                ( model, Cmd.none ) 
                                    |> log ("Attempted to set non-existent agent ID as default: " ++ agentIdToSet ++ " for user " ++ userEmail)

                    in
                    ( updatedModel, cmdToSend )
                        |> log ("Set default agent for " ++ userEmail ++ " to " ++ agentIdToSet)


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


userToFrontend : Maybe UserAgentConfigs -> User -> UserFrontend
userToFrontend maybeUserAgentConfigs user =
    { email = user.email
    , isSysAdmin = isSysAdmin user
    , role = getUserRole user |> roleToString
    , defaultAgentId = maybeUserAgentConfigs |> Maybe.andThen (.defaultId)
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
    , apiKey = config.apiKey
    }

