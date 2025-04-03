module Frontend exposing (..)

import Auth.Common
import Auth.Flow
import Browser exposing (UrlRequest(..))
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events as HE
import Lamdera
import Pages.Admin
import Pages.Default
import Pages.PageFrame exposing (viewCurrentPage, viewTabs)
import Pages.AgentSettings
import Route exposing (..)
import Supplemental exposing (..)
import Time exposing (..)
import Types exposing (..)
import Url exposing (Url)
import Fusion.Patch
import Fusion
import Dict

type alias Model =
    FrontendModel



-- app =
--     Lamdera.frontend
--         { init = initWithAuth
--         , onUrlRequest = UrlClicked
--         , onUrlChange = UrlChanged
--         , update = update
--         , updateFromBackend = updateFromBackend
--         , subscriptions = subscriptions
--         , view = view
--         }


{-| replace with your app function to try it out
-}
app =
    Lamdera.frontend
        { init = initWithAuth
        , onUrlRequest = UrlClicked
        , onUrlChange = UrlChanged
        , update = update
        , updateFromBackend = updateFromBackend
        , subscriptions = always Sub.none
        , view = view
        }


subscriptions : FrontendModel -> Sub FrontendMsg
subscriptions _ =
    Sub.none


init : Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
init url key =
    let
        route =
            Route.fromUrl url

        model : FrontendModel -- Explicitly type annotate to help linter
        model =
            { key = key
            , currentRoute = route
            , adminPage =
                { logs = []
                , isAuthenticated = False
                , remoteUrl = ""
                }
            , authFlow = Auth.Common.Idle
            , authRedirectBaseUrl = { url | query = Nothing, fragment = Nothing }
            , login = NotLogged False
            , currentUser = Nothing
            , pendingAuth = False
            , fusionState = Fusion.VUnloaded
            , agentConfigs = Dict.empty -- Re-add agentConfigs initialization
            , agentSettingsPage = -- Re-add agentSettingsPage initialization
                { isLoading = False
                , error = Nothing
                , editingConfig = Nothing
                }
            }
    in
    inits model route


inits : Model -> Route -> ( Model, Cmd FrontendMsg )
inits model route =
    case route of
        Admin adminRoute ->
            Pages.Admin.init model adminRoute

        Default ->
            Pages.Default.init model

        AgentSettings ->
            let
                currentPageModel = model.agentSettingsPage
                updatedPageModel = { currentPageModel | isLoading = True, error = Nothing }
            in
            ( { model | agentSettingsPage = updatedPageModel }
            , Lamdera.sendToBackend RequestAgentConfigs
            )

        _ ->
            ( model, Cmd.none )


update : FrontendMsg -> Model -> ( Model, Cmd FrontendMsg )
update msg model =
    case msg of
        NoOpFrontendMsg ->
            ( model, Cmd.none )

        UrlRequested urlRequest ->
            case urlRequest of
                Internal url ->
                    ( model
                    , Nav.pushUrl model.key (Url.toString url)
                    )

                External url ->
                    ( model
                    , Nav.load url
                    )

        UrlClicked urlRequest ->
            case urlRequest of
                Internal url ->
                    ( model
                    , Nav.pushUrl model.key (Url.toString url)
                    )

                External url ->
                    ( model
                    , Nav.load url
                    )

        UrlChanged url ->
            let
                newModel =
                    { model | currentRoute = Route.fromUrl url }
            in
            inits newModel newModel.currentRoute

        DirectToBackend msg_ ->
            ( model, Lamdera.sendToBackend msg_ )

        Admin_RemoteUrlChanged url ->
            let
                oldAdminPage =
                    model.adminPage
            in
            ( { model | adminPage = { oldAdminPage | remoteUrl = url } }, Cmd.none )

        GoogleSigninRequested ->
            Auth.Flow.signInRequested "OAuthGoogle" { model | login = NotLogged True, pendingAuth = True } Nothing
                |> Tuple.mapSecond (AuthToBackend >> Lamdera.sendToBackend)

        Logout ->
            ( { model | login = NotLogged False, pendingAuth = False }, Lamdera.sendToBackend LoggedOut )

        Auth0SigninRequested ->
            Auth.Flow.signInRequested "OAuthAuth0" { model | login = NotLogged True, pendingAuth = True } Nothing
                |> Tuple.mapSecond (AuthToBackend >> Lamdera.sendToBackend)

        Admin_FusionPatch patch ->
            ( { model
                | fusionState =
                    Fusion.Patch.patch { force = False } patch model.fusionState
                        |> Result.withDefault model.fusionState
              }
            , Lamdera.sendToBackend (Fusion_PersistPatch patch)
            )

        Admin_FusionQuery query ->
            ( model, Lamdera.sendToBackend (Fusion_Query query) )

        -- Agent Settings Page Messages (Ensure these are present)
        AgentSettings_EditConfig maybeId ->
            let
                configToEdit =
                    case maybeId of
                        Nothing ->
                            Just
                                { id = "new-agent" 
                                , name = ""
                                , provider = OpenAI
                                , endpoint = Pages.AgentSettings.defaultEndpoint OpenAI
                                }

                        Just id ->
                            Dict.get id model.agentConfigs
                
                currentPageModel = model.agentSettingsPage -- Extract record
                updatedPageModel = { currentPageModel | editingConfig = configToEdit, error = Nothing } -- Update extracted record
            in
            ( { model | agentSettingsPage = updatedPageModel }, Cmd.none )

        AgentSettings_UpdateName name ->
            updateEditingAgentConfig model (\cfg -> { cfg | name = name })

        AgentSettings_UpdateProvider provider ->
            updateEditingAgentConfig model
                (\cfg ->
                    let
                        newEndpoint =
                            if cfg.endpoint == "" || cfg.endpoint == Pages.AgentSettings.defaultEndpoint cfg.provider then
                                Pages.AgentSettings.defaultEndpoint provider

                            else
                                cfg.endpoint
                    in
                    { cfg | provider = provider, endpoint = newEndpoint }
                )

        AgentSettings_UpdateEndpoint endpoint ->
            updateEditingAgentConfig model (\cfg -> { cfg | endpoint = endpoint })

        AgentSettings_UpdateApiKey apiKey ->
            -- The key is now held temporarily in the Page's model state (apiKeyInput)
            -- and passed directly via AgentSettings_SaveConfig.
            -- This message doesn't need to update the main FrontendModel.
            ( model, Cmd.none )

        AgentSettings_SaveConfig apiKey -> -- Modified to receive API key
            case model.agentSettingsPage.editingConfig of
                Nothing ->
                    let
                        currentPageModel = model.agentSettingsPage
                        updatedPageModel = { currentPageModel | error = Just "Error: No configuration is being edited." }
                    in
                    ( { model | agentSettingsPage = updatedPageModel }, Cmd.none )

                Just configView ->
                    if String.isEmpty apiKey then
                        -- Basic validation: Don't save if API key is empty
                        let
                            currentPageModel = model.agentSettingsPage
                            updatedPageModel = { currentPageModel | error = Just "Error: API Key cannot be empty." }
                        in
                        ( { model | agentSettingsPage = updatedPageModel }, Cmd.none )
                    
                    else
                        -- Construct the full AgentConfig record
                        let
                            fullConfig : AgentConfig
                            fullConfig =
                                { id = configView.id -- Backend will replace "new-agent" with real ID
                                , name = configView.name
                                , provider = configView.provider
                                , endpoint = configView.endpoint
                                , apiKey = apiKey -- Include the API key
                                }
                            
                            -- Set loading state and send to backend
                            currentPageModel = model.agentSettingsPage
                            updatedPageModel = { currentPageModel | isLoading = True, error = Nothing }
                        in
                        ( { model | agentSettingsPage = updatedPageModel }
                        , Lamdera.sendToBackend (SaveAgentConfig fullConfig)
                        )

        AgentSettings_CancelEdit ->
            let
                currentPageModel = model.agentSettingsPage
                updatedPageModel = { currentPageModel | editingConfig = Nothing, error = Nothing }
            in
            ( { model | agentSettingsPage = updatedPageModel }, Cmd.none )

        AgentSettings_DeleteConfig id ->
            let
                currentPageModel = model.agentSettingsPage
                updatedPageModel = { currentPageModel | isLoading = True, error = Nothing } -- Clear error on delete attempt
            in
            ( { model | agentSettingsPage = updatedPageModel }
            , Lamdera.sendToBackend (DeleteAgentConfig id)
            )


updateFromBackend : ToFrontend -> Model -> ( Model, Cmd FrontendMsg )
updateFromBackend msg model =
    case msg of
        NoOpToFrontend ->
            ( model, Cmd.none )

        Admin_Logs_ToFrontend logs ->
            let
                oldAdminPage =
                    model.adminPage
            in
            ( { model | adminPage = { oldAdminPage | logs = logs } }, Cmd.none )

        AuthToFrontend authToFrontendMsg ->
            authUpdateFromBackend authToFrontendMsg model

        AuthSuccess userInfo ->
            ( { model | login = LoggedIn userInfo, pendingAuth = False }, Cmd.batch [ Nav.pushUrl model.key "/", Lamdera.sendToBackend GetUserToBackend ] )

        UserInfoMsg mUserinfo ->
            case mUserinfo of
                Just userInfo ->
                    ( { model | login = LoggedIn userInfo, pendingAuth = False }, Cmd.none )

                Nothing ->
                    ( { model | login = NotLogged False, pendingAuth = False }, Cmd.none )

        UserDataToFrontend currentUser ->
            ( { model | currentUser = Just currentUser }, Cmd.none )

        Admin_FusionResponse value ->
            ( { model | fusionState = value }, Cmd.none )

        PermissionDenied _ ->
            ( model, Cmd.none )

        ReceiveAgentConfigs configs ->
            let 
                currentPageModel = model.agentSettingsPage
                -- Important: If we were editing a 'new' config and save succeeded, 
                -- the backend response won't include the apiKey. We should clear 
                -- the editing state upon successful reception of the *list*.
                -- Or, better, backend could send back the saved config (without key)
                -- For now, just clear loading/error and update list.
                updatedPageModel = { currentPageModel | isLoading = False, error = Nothing }
            in
            ( { model | agentConfigs = configs, agentSettingsPage = updatedPageModel }, Cmd.none )




view : Model -> Browser.Document FrontendMsg
view model =
    { title = pageTitle model.currentRoute
    , body =
        [ viewTabs model
        , Html.div [ style "padding" "10px" ] [ viewCurrentPage model ]
        ]
    }


pageTitle : Route -> String
pageTitle route =
    case route of
        Default -> "Home"
        AgentSettings -> "Agent Settings"
        Admin _ -> "Admin Panel"
        NotFound -> "Not Found"


viewCurrentPage : FrontendModel -> Html FrontendMsg
viewCurrentPage model =
    case model.currentRoute of
        Default ->
            Pages.Default.view model

        Admin _ -> -- Match any Admin route
            Pages.Admin.view model -- Call with only model

        AgentSettings ->
            Html.map identity
                (Pages.AgentSettings.view (agentSettingsSubModel model))

        NotFound ->
            div [] [ text "Page not found!" ]


-- HELPER FUNCTIONS --

-- Helper to create the sub-model for the AgentSettings page
agentSettingsSubModel : Model -> Pages.AgentSettings.Model
agentSettingsSubModel model =
    Pages.AgentSettings.init model.agentConfigs model.agentSettingsPage


-- Helper function to update the currently editing agent configuration
updateEditingAgentConfig : Model -> (AgentConfigView -> AgentConfigView) -> ( Model, Cmd FrontendMsg )
updateEditingAgentConfig model updater =
    let
        updatedEditingConfig =
            model.agentSettingsPage.editingConfig
                |> Maybe.map updater

        currentPageModel = model.agentSettingsPage -- Extract record
        updatedPageModel = { currentPageModel | editingConfig = updatedEditingConfig } -- Update extracted record
    in
    ( { model | agentSettingsPage = updatedPageModel }, Cmd.none )


callbackForAuth0Auth : FrontendModel -> Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForAuth0Auth model url key =
    let
        ( authM, authCmd ) =
            Auth.Flow.init model
                "OAuthAuth0"
                url
                key
                (\msg -> Lamdera.sendToBackend (AuthToBackend msg))
    in
    ( authM, authCmd )


callbackForGoogleAuth : FrontendModel -> Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForGoogleAuth model url key =
    let
        ( authM, authCmd ) =
            Auth.Flow.init model
                "OAuthGoogle"
                url
                key
                (\msg -> Lamdera.sendToBackend (AuthToBackend msg))
    in
    ( authM, authCmd )


authCallbackCmd : FrontendModel -> Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
authCallbackCmd model url key =
    let
        { path } =
            url
    in
    case path of
        "/login/OAuthGoogle/callback" ->
            callbackForGoogleAuth model url key

        "/login/OAuthAuth0/callback" ->
            callbackForAuth0Auth model url key

        _ ->
            ( model, Cmd.none )


initWithAuth : Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
initWithAuth url key =
    let
        ( model, cmds ) =
            init url key
    in
    authCallbackCmd model url key
        |> Tuple.mapSecond (\cmd -> Cmd.batch [ cmds, cmd, Lamdera.sendToBackend GetUserToBackend ])


viewWithAuth : Model -> Browser.Document FrontendMsg
viewWithAuth model =
    { title = "View Auth Test"
    , body =
        [ div
            [ style "margin" "20px"
            , style "font-family" "Arial, sans-serif"
            ]
            [ h1
                [ style "color" "#333" ]
                [ text "Auth0 Test" ]
            , case model.login of
                LoggedIn userInfo ->
                    div
                        [ style "padding" "20px"
                        , style "border" "1px solid #ccc"
                        , style "border-radius" "5px"
                        , style "background-color" "#f8f8f8"
                        , style "max-width" "400px"
                        ]
                        [ div
                            [ style "margin-bottom" "15px"
                            , style "font-size" "16px"
                            ]
                            [ text ("👤 Logged in as: " ++ userInfo.email) ]
                        , button
                            [ HE.onClick Logout
                            , style "background-color" "#f44336"
                            , style "color" "white"
                            , style "padding" "10px 15px"
                            , style "border" "none"
                            , style "border-radius" "4px"
                            , style "cursor" "pointer"
                            ]
                            [ text "Logout" ]
                        ]

                _ ->
                    div
                        [ style "padding" "20px"
                        , style "border" "1px solid #ccc"
                        , style "border-radius" "5px"
                        , style "background-color" "#f8f8f8"
                        , style "max-width" "400px"
                        ]
                        [ p
                            [ style "margin-bottom" "15px" ]
                            [ text "Please sign in to continue" ]
                        , button
                            [ HE.onClick Auth0SigninRequested
                            , style "background-color" "#4CAF50"
                            , style "color" "white"
                            , style "padding" "10px 15px"
                            , style "border" "none"
                            , style "border-radius" "4px"
                            , style "cursor" "pointer"
                            ]
                            [ text "Sign in with Auth0" ]
                        ]
            ]
        ]
    }


authUpdateFromBackend : Auth.Common.ToFrontend -> FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
authUpdateFromBackend authToFrontendMsg model =
    case authToFrontendMsg of
        Auth.Common.AuthInitiateSignin url ->
            if model.pendingAuth then
                let
                    ( newModel, cmd ) =
                        Auth.Flow.startProviderSignin url model
                in
                ( { newModel | pendingAuth = False, login = LoginTokenSent }, cmd )

            else
                ( model, Cmd.none )

        Auth.Common.AuthError err ->
            let
                ( newModel, cmd ) =
                    Auth.Flow.setError model err
            in
            ( { newModel | pendingAuth = False, login = NotLogged False }, cmd )

        Auth.Common.AuthSessionChallenge _ ->
            ( model, Cmd.none )
