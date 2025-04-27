module Frontend exposing (..)

import Auth.Common
import Auth.Flow
import Browser exposing (UrlRequest(..), Document)
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes as Attr exposing (style)
import Html.Events as HE
import Lamdera
import Pages.Admin
import Pages.Default
import Pages.PageFrame exposing (viewCurrentPage, viewTabs)
import Route exposing (..)
import Supplemental exposing (..)
import Time exposing (..)
import Types exposing (..)
import Url exposing (Url)
import Theme
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
    Sub.none


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
            ( { model | login = NotLogged False, pendingAuth = False, preferences = { darkMode = False } }, Lamdera.sendToBackend LoggedOut )

        Auth0SigninRequested ->
            Auth.Flow.signInRequested "OAuthAuth0" { model | login = NotLogged True, pendingAuth = True } Nothing
                |> Tuple.mapSecond (AuthToBackend >> Lamdera.sendToBackend)

        ToggleDarkMode ->
            let
                newDarkModeState =
                    not model.preferences.darkMode

                -- Explicitly alias the nested record
                currentFrontendPreferences =
                    model.preferences

                updatedFrontendPreferences : Preferences
                updatedFrontendPreferences =
                    { currentFrontendPreferences | darkMode = newDarkModeState } -- Update the alias
            in
            ( { model | preferences = updatedFrontendPreferences }
            , Lamdera.sendToBackend (SetDarkModePreference newDarkModeState)
            )

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
            ( { model | login = LoggedIn userInfo, pendingAuth = False }, Cmd.batch [ Nav.pushUrl model.key "/", Lamdera.sendToBackend GetUserToBackend ] )

        UserInfoMsg mUserinfo ->
            case mUserinfo of
                Just userInfo ->
                    ( { model | login = LoggedIn userInfo, pendingAuth = False }, Cmd.none )

                Nothing ->
                    ( { model | login = NotLogged False, pendingAuth = False, preferences = { darkMode = False } }, Cmd.none )

        UserDataToFrontend currentUser ->
            ( { model | currentUser = Just currentUser, preferences = currentUser.preferences }, Cmd.none )

        -- Admin_FusionResponse value ->
        --     ( { model | fusionState = value }, Cmd.none )

        PermissionDenied _ ->
            -- Simply ignore the denied action without any UI notification
            ( model, Cmd.none )


view : Model -> Browser.Document FrontendMsg
view model =
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
        ]
    }


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
            in
            ( { newModel | pendingAuth = False, login = NotLogged False }, cmd )

        Auth.Common.AuthSessionChallenge _ ->
            ( model, Cmd.none )
