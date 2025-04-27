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
import Route exposing (..)
import Supplemental exposing (..)
import Time exposing (..)
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
    Sub.none


init : Url -> Nav.Key -> ( FrontendModel, Cmd FrontendMsg )
init url key =
    let
        route =
            Route.fromUrl url
        
        initialPreferences =
            { darkMode = False }

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
                newPreferences =
                    { model.preferences | darkMode = not model.preferences.darkMode }
            in
            ( { model | preferences = newPreferences }
            , Lamdera.sendToBackend (SetDarkModePreference newPreferences.darkMode)
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
        [ div [ Attr.styles (Pages.PageFrame.darkModeStyles model.preferences) ]
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
