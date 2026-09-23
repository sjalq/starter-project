module Frontend exposing (..)

import Auth.Common
import Auth.EmailPasswordAuth
import Auth.Flow
import Browser exposing (UrlRequest(..))
import Browser.Navigation
import Components.LoginModal
import Effect.Browser.Navigation
import Effect.Command as Command exposing (Command, FrontendOnly)
import Effect.Lamdera
import Effect.Subscription as Subscription exposing (Subscription)
import Env
import Html exposing (..)
import Html.Attributes as Attr
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


type alias Model =
    FrontendModel


app :
    { init : Url -> Browser.Navigation.Key -> ( Model, Cmd FrontendMsg )
    , view : Model -> Browser.Document FrontendMsg
    , update : FrontendMsg -> Model -> ( Model, Cmd FrontendMsg )
    , updateFromBackend : ToFrontend -> Model -> ( Model, Cmd FrontendMsg )
    , subscriptions : Model -> Sub FrontendMsg
    , onUrlRequest : UrlRequest -> FrontendMsg
    , onUrlChange : Url -> FrontendMsg
    }
app =
    Effect.Lamdera.frontend Lamdera.sendToBackend
        { init = initWithAuth
        , onUrlRequest = UrlClicked
        , onUrlChange = UrlChanged
        , update = update
        , updateFromBackend = updateFromBackend
        , subscriptions = subscriptions
        , view = view
        }


subscriptions : Model -> Subscription FrontendOnly FrontendMsg
subscriptions _ =
    Subscription.batch
        [ Ports.ConsoleLogger.logReceived ConsoleLogReceived
        , Ports.Clipboard.copyResult ClipboardResult
        ]


init : Url -> Effect.Browser.Navigation.Key -> ( FrontendModel, Command FrontendOnly ToBackend FrontendMsg )
init url key =
    let
        route =
            Route.fromUrl url

        model =
            { key = key
            , currentRoute = route
            , adminPage = { logs = [] }
            , authFlow = Auth.Common.Idle
            , authRedirectBaseUrl = { url | query = Nothing, fragment = Nothing }
            , login = NotLogged False
            , currentUser = Nothing
            , pendingAuth = False
            , preferences = defaultPreferences
            , emailPasswordForm = emptyEmailPasswordForm
            , profileDropdownOpen = False
            , loginModalOpen = False
            , portFeedback = Nothing
            }
    in
    inits model route


inits : Model -> Route -> ( Model, Command FrontendOnly ToBackend FrontendMsg )
inits model route =
    case route of
        Admin adminRoute ->
            Pages.Admin.init model adminRoute
                |> Tuple.mapSecond (Command.fromCmd "Admin.init")

        Default ->
            Pages.Default.init model
                |> Tuple.mapSecond (Command.fromCmd "Default.init")

        Examples ->
            Pages.Examples.init model
                |> Tuple.mapSecond (Command.fromCmd "Examples.init")

        _ ->
            ( model, Command.none )


update : FrontendMsg -> Model -> ( Model, Command FrontendOnly ToBackend FrontendMsg )
update msg model =
    case msg of
        NoOpFrontendMsg ->
            ( model, Command.none )

        UrlClicked urlRequest ->
            case urlRequest of
                Internal url ->
                    ( model
                    , Effect.Browser.Navigation.pushUrl model.key (Url.toString url)
                    )

                External url ->
                    ( model
                    , Effect.Browser.Navigation.load url
                    )

        UrlChanged url ->
            let
                newModel =
                    { model | currentRoute = Route.fromUrl url }
            in
            inits newModel newModel.currentRoute

        DirectToBackend msg_ ->
            ( model, Effect.Lamdera.sendToBackend msg_ )

        Admin_LogsNavigate params ->
            ( model
            , Effect.Browser.Navigation.pushUrl model.key (Route.toString (Admin (AdminLogs params)))
            )

        Logout ->
            ( { model
                | login = NotLogged False
                , currentUser = Nothing
                , adminPage = { logs = [] }
                , pendingAuth = False
                , preferences = defaultPreferences
                , emailPasswordForm = emptyEmailPasswordForm
              }
            , Effect.Lamdera.sendToBackend LoggedOut
            )

        Auth0SigninRequested ->
            Auth.Flow.signInRequested "OAuthAuth0" { model | login = NotLogged True, pendingAuth = True } Nothing
                |> Tuple.mapSecond (AuthToBackend >> Lamdera.sendToBackend >> Command.fromCmd "Auth0Signin")

        EmailPasswordAuthMsg authMsg ->
            updateEmailPasswordAuth authMsg model

        ToggleDarkMode ->
            let
                newDarkModeState =
                    not model.preferences.darkMode

                currentFrontendPreferences =
                    model.preferences

                updatedFrontendPreferences : Preferences
                updatedFrontendPreferences =
                    { currentFrontendPreferences | darkMode = newDarkModeState }
            in
            ( { model | preferences = updatedFrontendPreferences }
            , Effect.Lamdera.sendToBackend (SetDarkModePreference newDarkModeState)
            )

        ToggleProfileDropdown ->
            ( { model | profileDropdownOpen = not model.profileDropdownOpen }, Command.none )

        ToggleLoginModal ->
            ( { model | loginModalOpen = not model.loginModalOpen }, Command.none )

        CloseLoginModal ->
            ( { model | loginModalOpen = False }, Command.none )

        EmailPasswordAuthError errorMsg ->
            let
                updatedForm =
                    model.emailPasswordForm
                        |> (\form -> { form | error = Just errorMsg })
            in
            ( { model | emailPasswordForm = updatedForm, loginModalOpen = True }, Command.none )

        ConsoleLogClicked ->
            ( model, Ports.ConsoleLogger.log "Hello from Elm!" )

        ConsoleLogReceived message ->
            ( { model | portFeedback = Just message }, Command.none )

        CopyToClipboard text ->
            ( model, Ports.Clipboard.copyToClipboard text )

        ClipboardResult result ->
            ( { model
                | portFeedback =
                    case result of
                        Ok message ->
                            Just message

                        Err error ->
                            Just error
              }
            , Command.none
            )


updateFromBackend : ToFrontend -> Model -> ( Model, Command FrontendOnly ToBackend FrontendMsg )
updateFromBackend msg model =
    case msg of
        NoOpToFrontend ->
            ( model, Command.none )

        -- Admin page
        Admin_Logs_ToFrontend logs ->
            let
                oldAdminPage =
                    model.adminPage
            in
            ( { model | adminPage = { oldAdminPage | logs = logs } }, Command.none )

        AuthToFrontend authToFrontendMsg ->
            authUpdateFromBackend authToFrontendMsg model
                |> Tuple.mapSecond (Command.fromCmd "AuthToFrontend")

        AuthSuccess userInfo ->
            ( { model | login = LoggedIn userInfo, pendingAuth = False, loginModalOpen = False }
            , Command.batch
                [ Effect.Lamdera.sendToBackend GetUserToBackend
                , Effect.Browser.Navigation.pushUrl model.key "/"
                ]
            )

        UserInfoMsg mUserinfo ->
            case mUserinfo of
                Just userInfo ->
                    ( { model | login = LoggedIn userInfo, pendingAuth = False }, Command.none )

                Nothing ->
                    ( { model | login = NotLogged False, currentUser = Nothing, adminPage = { logs = [] }, pendingAuth = False, preferences = defaultPreferences }, Command.none )

        UserDataToFrontend currentUser ->
            let
                modelWithUser =
                    { model | currentUser = Just currentUser, preferences = currentUser.preferences }
            in
            case model.currentRoute of
                Admin adminRoute ->
                    Pages.Admin.init modelWithUser adminRoute
                        |> Tuple.mapSecond (Command.fromCmd "Admin.init")

                _ ->
                    ( modelWithUser, Command.none )

        PermissionDenied _ ->
            ( model, Command.none )

        A0 _ ->
            ( model, Command.none )


view : Model -> Browser.Document FrontendMsg
view model =
    let
        colors =
            Theme.getColors model.preferences.darkMode
    in
    { title = Pages.PageFrame.appName
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
            , showOAuth = not (String.isEmpty Env.auth0AppTenant)
            }
        ]
    }


callbackForAuth0Auth : FrontendModel -> Url.Url -> Effect.Browser.Navigation.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForAuth0Auth model url key =
    Auth.Flow.init model
        "OAuthAuth0"
        url
        (Effect.Browser.Navigation.withRealKey key)
        (\msg -> Lamdera.sendToBackend (AuthToBackend msg))


callbackForGoogleAuth : FrontendModel -> Url.Url -> Effect.Browser.Navigation.Key -> ( FrontendModel, Cmd FrontendMsg )
callbackForGoogleAuth model url key =
    Auth.Flow.init model
        "OAuthGoogle"
        url
        (Effect.Browser.Navigation.withRealKey key)
        (\msg -> Lamdera.sendToBackend (AuthToBackend msg))


authCallbackCmd : FrontendModel -> Url.Url -> Effect.Browser.Navigation.Key -> ( FrontendModel, Cmd FrontendMsg )
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


initWithAuth : Url.Url -> Effect.Browser.Navigation.Key -> ( FrontendModel, Command FrontendOnly ToBackend FrontendMsg )
initWithAuth url key =
    let
        ( model, initCmds ) =
            init url key

        ( authModel, authCmd ) =
            authCallbackCmd model url key
    in
    ( authModel
    , Command.batch
        [ initCmds
        , Command.fromCmd "authCallback" authCmd
        , Effect.Lamdera.sendToBackend GetUserToBackend
        ]
    )


updateEmailPasswordAuth : EmailPasswordAuthMsg -> Model -> ( Model, Command FrontendOnly ToBackend FrontendMsg )
updateEmailPasswordAuth authMsg model =
    case authMsg of
        EmailPasswordFormMsg formMsg ->
            let
                newForm =
                    updateEmailPasswordForm formMsg model.emailPasswordForm

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
                                Effect.Lamdera.sendToBackend (EmailPasswordAuthToBackend backendMsg)

                            else
                                Command.none

                        _ ->
                            Command.none

                newModel =
                    if formMsg == EmailPasswordFormSubmit && newForm.error == Nothing then
                        { model | emailPasswordForm = newForm, login = NotLogged True, pendingAuth = True }

                    else
                        { model | emailPasswordForm = newForm }
            in
            ( newModel, cmd )


emptyEmailPasswordForm : EmailPasswordFormModel
emptyEmailPasswordForm =
    { email = ""
    , password = ""
    , confirmPassword = ""
    , name = ""
    , isSignupMode = False
    , error = Nothing
    }


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

            else if model.isSignupMode && String.length model.password < Auth.EmailPasswordAuth.minimumPasswordLength then
                { model | error = Just ("Passwords must be at least " ++ String.fromInt Auth.EmailPasswordAuth.minimumPasswordLength ++ " characters") }

            else if model.isSignupMode && model.password /= model.confirmPassword then
                { model | error = Just "Passwords do not match" }

            else
                model


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

                errorCmd =
                    Task.perform identity (Task.succeed (EmailPasswordAuthError errorMsg))
            in
            ( { newModel | pendingAuth = False, login = NotLogged False }, Cmd.batch [ cmd, errorCmd ] )

        Auth.Common.AuthSessionChallenge _ ->
            ( model, Cmd.none )
