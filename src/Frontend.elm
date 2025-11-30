module Frontend exposing (..)

import Auth.Common
import Auth.Flow
import Browser exposing (UrlRequest(..))
import Browser.Navigation as Nav
import Components.LoginModal
import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as HE
import Lamdera
import Pages.Admin
import Pages.Default
import Pages.Examples
import Pages.PageFrame exposing (viewCurrentPage, viewTabs)
import Ports.Clipboard
import Ports.ConsoleLogger
import Route
import Task
import Theme
import Types exposing (..)
import Url exposing (Url)



-- import Fusion.Patch
-- import Fusion


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
    Sub.batch
        [ Ports.ConsoleLogger.logReceived ConsoleLogReceived
        , Ports.Clipboard.copyResult ClipboardResult
        ]


init : Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
init url key =
    let
        route =
            Route.fromUrl url

        initialPreferences =
            { darkMode = True }

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
            , preferences = initialPreferences
            , emailPasswordForm =
                { email = ""
                , password = ""
                , confirmPassword = ""
                , name = ""
                , isSignupMode = False
                , error = Nothing
                }
            , profileDropdownOpen = False
            , loginModalOpen = False
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

        Examples ->
            Pages.Examples.init model

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

        Logout ->
            let
                -- Reset form to initial clean state
                cleanForm =
                    { email = ""
                    , password = ""
                    , confirmPassword = ""
                    , name = ""
                    , isSignupMode = False
                    , error = Nothing
                    }
            in
            ( { model
                | login = NotLogged False
                , pendingAuth = False
                , preferences = { darkMode = True }
                , emailPasswordForm = cleanForm
              }
            , Lamdera.sendToBackend LoggedOut
            )

        Auth0SigninRequested ->
            Auth.Flow.signInRequested "OAuthAuth0" { model | login = NotLogged True, pendingAuth = True } Nothing
                |> Tuple.mapSecond (AuthToBackend >> Lamdera.sendToBackend)

        EmailPasswordAuthMsg authMsg ->
            updateEmailPasswordAuth authMsg model

        ToggleDarkMode ->
            let
                newDarkModeState =
                    not model.preferences.darkMode

                -- Explicitly alias the nested record
                currentFrontendPreferences =
                    model.preferences

                updatedFrontendPreferences : Preferences
                updatedFrontendPreferences =
                    { currentFrontendPreferences | darkMode = newDarkModeState }

                -- Update the alias
            in
            ( { model | preferences = updatedFrontendPreferences }
            , Lamdera.sendToBackend (SetDarkModePreference newDarkModeState)
            )

        ToggleProfileDropdown ->
            ( { model | profileDropdownOpen = not model.profileDropdownOpen }, Cmd.none )

        ToggleLoginModal ->
            ( { model | loginModalOpen = not model.loginModalOpen }, Cmd.none )

        CloseLoginModal ->
            ( { model | loginModalOpen = False }, Cmd.none )

        EmailPasswordAuthError errorMsg ->
            let
                updatedForm =
                    model.emailPasswordForm
                        |> (\form -> { form | error = Just errorMsg })
            in
            ( { model | emailPasswordForm = updatedForm, loginModalOpen = True }, Cmd.none )

        ConsoleLogClicked ->
            ( model, Ports.ConsoleLogger.log "Hello from Elm!" )

        ConsoleLogReceived message ->
            ( model, Cmd.none )

        CopyToClipboard text ->
            ( model, Ports.Clipboard.copyToClipboard text )

        ClipboardResult result ->
            ( model, Cmd.none )



-- Admin_FusionPatch patch ->
--     ( { model
--         | fusionState =
--             Fusion.Patch.patch { force = False } patch model.fusionState
--                 |> Result.withDefault model.fusionState
--       }
--     , Lamdera.sendToBackend (Fusion_PersistPatch patch)
--     )
-- Admin_FusionQuery query ->
--     ( model, Lamdera.sendToBackend (Fusion_Query query) )


updateFromBackend : ToFrontend -> Model -> ( Model, Cmd FrontendMsg )
updateFromBackend msg model =
    case msg of
        NoOpToFrontend ->
            ( model, Cmd.none )

        -- Admin page
        Admin_Logs_ToFrontend logs ->
            let
                oldAdminPage =
                    model.adminPage
            in
            ( { model | adminPage = { oldAdminPage | logs = logs } }, Cmd.none )

        AuthToFrontend authToFrontendMsg ->
            authUpdateFromBackend authToFrontendMsg model

        AuthSuccess userInfo ->
            ( { model | login = LoggedIn userInfo, pendingAuth = False, loginModalOpen = False }
            , Cmd.batch
                [ Lamdera.sendToBackend GetUserToBackend
                , Nav.pushUrl model.key "/"
                ]
            )

        UserInfoMsg mUserinfo ->
            case mUserinfo of
                Just userInfo ->
                    ( { model | login = LoggedIn userInfo, pendingAuth = False }, Cmd.none )

                Nothing ->
                    ( { model | login = NotLogged False, pendingAuth = False, preferences = { darkMode = True } }, Cmd.none )

        UserDataToFrontend currentUser ->
            ( { model | currentUser = Just currentUser, preferences = currentUser.preferences }, Cmd.none )

        -- Admin_FusionResponse value ->
        --     ( { model | fusionState = value }, Cmd.none )
        PermissionDenied _ ->
            -- Simply ignore the denied action without any UI notification
            ( model, Cmd.none )

        A0 message ->
            -- Log websocket messages for debugging
            ( model, Cmd.none )


view : Model -> Browser.Document FrontendMsg
view model =
    let
        colors =
            Theme.getColors model.preferences.darkMode
    in
    { title = "Dashboard"
    , body =
        [ div
            [ Theme.primaryBg model.preferences.darkMode
            , Theme.primaryText model.preferences.darkMode
            , Attr.style "min-height" "100vh"
            , Attr.class "p-4"
            ]
            [ viewTabs model
            , viewCurrentPage model
            ]
        , Components.LoginModal.view
            { isOpen = model.loginModalOpen
            , colors = colors
            , emailPasswordForm = model.emailPasswordForm
            , onClose = CloseLoginModal
            , onAuth0Login = Auth0SigninRequested
            , onEmailPasswordMsg = EmailPasswordAuthMsg
            , onNoOp = NoOpFrontendMsg
            , isAuthenticating = model.pendingAuth
            }
        ]
    }


callbackForAuth0Auth : FrontendModel -> Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForAuth0Auth model url key =
    Auth.Flow.init model
        "OAuthAuth0"
        url
        key
        (\msg -> Lamdera.sendToBackend (AuthToBackend msg))


callbackForGoogleAuth : FrontendModel -> Url.Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForGoogleAuth model url key =
    Auth.Flow.init model
        "OAuthGoogle"
        url
        key
        (\msg -> Lamdera.sendToBackend (AuthToBackend msg))


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


updateEmailPasswordAuth : EmailPasswordAuthMsg -> Model -> ( Model, Cmd FrontendMsg )
updateEmailPasswordAuth authMsg model =
    case authMsg of
        EmailPasswordFormMsg formMsg ->
            let
                newForm =
                    updateEmailPasswordForm formMsg model.emailPasswordForm

                -- Check if form was validated and should submit
                cmd =
                    case formMsg of
                        EmailPasswordFormSubmit ->
                            if newForm.error == Nothing then
                                let
                                    backendMsg =
                                        if newForm.isSignupMode then
                                            EmailPasswordSignupToBackend newForm.email
                                                newForm.password
                                                (if String.isEmpty (String.trim newForm.name) then
                                                    Nothing

                                                 else
                                                    Just newForm.name
                                                )

                                        else
                                            EmailPasswordLoginToBackend newForm.email newForm.password
                                in
                                Lamdera.sendToBackend (EmailPasswordAuthToBackend backendMsg)

                            else
                                Cmd.none

                        _ ->
                            Cmd.none

                newModel =
                    if formMsg == EmailPasswordFormSubmit && newForm.error == Nothing then
                        { model | emailPasswordForm = newForm, login = NotLogged True, pendingAuth = True }

                    else
                        { model | emailPasswordForm = newForm }
            in
            ( newModel, cmd )

        EmailPasswordLoginRequested email password ->
            ( { model | login = NotLogged True, pendingAuth = True }
            , Lamdera.sendToBackend (EmailPasswordAuthToBackend (EmailPasswordLoginToBackend email password))
            )

        EmailPasswordSignupRequested email password maybeName ->
            ( { model | login = NotLogged True, pendingAuth = True }
            , Lamdera.sendToBackend (EmailPasswordAuthToBackend (EmailPasswordSignupToBackend email password maybeName))
            )


updateEmailPasswordForm : EmailPasswordFormMsg -> EmailPasswordFormModel -> EmailPasswordFormModel
updateEmailPasswordForm msg model =
    case msg of
        EmailPasswordFormEmailChanged email ->
            { model | email = email, error = Nothing }

        EmailPasswordFormPasswordChanged password ->
            { model | password = password, error = Nothing }

        EmailPasswordFormConfirmPasswordChanged confirmPassword ->
            { model | confirmPassword = confirmPassword, error = Nothing }

        EmailPasswordFormNameChanged name ->
            { model | name = name, error = Nothing }

        EmailPasswordFormToggleMode ->
            { model | isSignupMode = not model.isSignupMode, error = Nothing }

        EmailPasswordFormSubmit ->
            if String.isEmpty (String.trim model.email) || String.isEmpty (String.trim model.password) then
                { model | error = Just "Please fill in all required fields" }

            else if model.isSignupMode && model.password /= model.confirmPassword then
                { model | error = Just "Passwords do not match" }

            else
                model



-- Valid form


viewWithAuth : Model -> Browser.Document FrontendMsg
viewWithAuth model =
    let
        isDark =
            model.preferences.darkMode

        colors =
            Theme.getColors isDark
    in
    { title = "View Auth Test"
    , body =
        [ div
            [ Attr.style "margin" "20px"
            , Attr.style "font-family" "Arial, sans-serif"
            , Theme.primaryBg isDark
            , Theme.primaryText isDark
            ]
            [ h1
                [ Theme.primaryText isDark ]
                [ text "Auth0 Test" ]
            , case model.login of
                LoggedIn userInfo ->
                    div
                        [ Attr.style "padding" "20px"
                        , Attr.style "border" ("1px solid " ++ colors.border)
                        , Attr.style "border-radius" "5px"
                        , Attr.style "background-color" colors.secondaryBg
                        , Attr.style "max-width" "400px"
                        ]
                        [ div
                            [ Attr.style "margin-bottom" "15px"
                            , Attr.style "font-size" "16px"
                            , Attr.style "color" colors.primaryText
                            ]
                            [ text ("👤 Logged in as: " ++ userInfo.email) ]
                        , button
                            [ HE.onClick Logout
                            , Attr.style "background-color" colors.dangerBg
                            , Attr.style "color" colors.buttonText
                            , Attr.style "padding" "10px 15px"
                            , Attr.style "border" "none"
                            , Attr.style "border-radius" "4px"
                            , Attr.style "cursor" "pointer"
                            ]
                            [ text "Logout" ]
                        ]

                _ ->
                    div
                        [ Attr.style "padding" "20px"
                        , Attr.style "border" ("1px solid " ++ colors.border)
                        , Attr.style "border-radius" "5px"
                        , Attr.style "background-color" colors.secondaryBg
                        , Attr.style "max-width" "400px"
                        ]
                        [ p
                            [ Attr.style "margin-bottom" "15px"
                            , Attr.style "color" colors.primaryText
                            ]
                            [ text "Please sign in to continue" ]
                        , button
                            [ HE.onClick Auth0SigninRequested
                            , Attr.style "background-color" colors.buttonBg
                            , Attr.style "color" colors.buttonText
                            , Attr.style "padding" "10px 15px"
                            , Attr.style "border" "none"
                            , Attr.style "border-radius" "4px"
                            , Attr.style "cursor" "pointer"
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

                errorMsg =
                    case err of
                        Auth.Common.ErrAuthString msg ->
                            msg

                        _ ->
                            "Authentication failed"

                -- Send error to form via message
                errorCmd =
                    Task.perform identity (Task.succeed (EmailPasswordAuthError errorMsg))
            in
            ( { newModel | pendingAuth = False, login = NotLogged False }, Cmd.batch [ cmd, errorCmd ] )

        Auth.Common.AuthSessionChallenge _ ->
            ( model, Cmd.none )
