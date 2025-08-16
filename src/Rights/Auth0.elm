module Rights.Auth0 exposing (..)

import Auth.Common
import Auth.Flow
import Auth.Method.OAuthAuth0
import Dict exposing (Dict)
import Env
import Lamdera
import Time
import Types exposing (..)


renewSession : Lamdera.SessionId -> Lamdera.ClientId -> BackendModel -> ( BackendModel, Cmd BackendMsg )
renewSession _ _ model =
    ( model, Cmd.none )


handleAuthSuccess :
    BackendModel
    -> Lamdera.SessionId
    -> Lamdera.ClientId
    -> Auth.Common.UserInfo
    -> Auth.Common.MethodId
    -> Maybe Auth.Common.Token
    -> Time.Posix
    -> ( BackendModel, Cmd BackendMsg )
handleAuthSuccess backendModel sessionId clientId userInfo _ _ _ =
    let
        sessionsWithOutThisOne : Dict Lamdera.SessionId Auth.Common.UserInfo
        sessionsWithOutThisOne =
            Dict.filter (\_ { email } -> email /= userInfo.email) backendModel.sessions

        newSessions =
            Dict.insert sessionId userInfo sessionsWithOutThisOne

        response =
            AuthSuccess userInfo
    in
    ( { backendModel | sessions = newSessions }, Lamdera.sendToFrontend clientId response )


logout : Lamdera.SessionId -> Lamdera.ClientId -> BackendModel -> ( BackendModel, Cmd msg )
logout sessionId _ model =
    ( { model | sessions = model.sessions |> Dict.remove sessionId }, Cmd.none )


backendConfig : BackendModel -> Auth.Flow.BackendUpdateConfig FrontendMsg BackendMsg ToFrontend FrontendModel BackendModel
backendConfig model =
    { asToFrontend = AuthToFrontend
    , asBackendMsg = AuthBackendMsg
    , sendToFrontend = Lamdera.sendToFrontend
    , backendModel = model
    , loadMethod = Auth.Flow.methodLoader config.methods
    , handleAuthSuccess = handleAuthSuccess model
    , isDev = True
    , renewSession = renewSession
    , logout = logout
    }


config : Auth.Common.Config FrontendMsg ToBackend BackendMsg ToFrontend FrontendModel BackendModel
config =
    { toBackend = AuthToBackend
    , toFrontend = AuthToFrontend
    , backendMsg = AuthBackendMsg
    , sendToFrontend = Lamdera.sendToFrontend
    , sendToBackend = Lamdera.sendToBackend
    , renewSession = renewSession
    , methods =
        [ customizeAuth0Method (Auth.Method.OAuthAuth0.configuration Env.auth0AppClientId Env.auth0AppClientSecret Env.auth0AppTenant)
        ]
    }


customizeAuth0Method : Auth.Common.Method frontendMsg backendMsg frontendModel backendModel -> Auth.Common.Method frontendMsg backendMsg frontendModel backendModel
customizeAuth0Method method =
    case method of
        Auth.Common.ProtocolOAuth oauthConfig ->
            let
                authEndpoint =
                    oauthConfig.authorizationEndpoint

                updatedEndpoint =
                    { authEndpoint
                        | query = Just "connection=google-oauth2&prompt=select_account&auth0Client=eyJuYW1lIjoiR2VuZXJhbCIsInZlcnNpb24iOiIxLjAuMCJ9"
                    }
            in
            Auth.Common.ProtocolOAuth
                { oauthConfig
                    | authorizationEndpoint = updatedEndpoint
                }

        _ ->
            method
