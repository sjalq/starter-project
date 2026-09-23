module Auth.EmailPasswordAuth exposing (completeSignup, handleLogin, handleSignup, minimumPasswordLength)

import Auth.Common
import Auth.PasswordHash exposing (verifyPassword)
import Crypto.Hash
import Dict
import Effect.Command exposing (BackendOnly, Command)
import Effect.Lamdera
import Effect.Task
import Effect.Time
import Env
import Time
import Types exposing (..)


handleLogin : BrowserCookie -> ConnectionId -> String -> String -> BackendModel -> ( BackendModel, Command BackendOnly ToFrontend BackendMsg )
handleLogin browserCookie connectionId rawEmail password model =
    let
        email =
            normalizeEmail rawEmail
    in
    case Dict.get email model.emailPasswordCredentials of
        Just creds ->
            if verifyPassword password { hash = creds.passwordHash, salt = creds.passwordSalt } then
                let
                    userInfo =
                        { email = email
                        , name = Dict.get email model.users |> Maybe.andThen .name
                        , username = Nothing
                        , picture = Nothing
                        }
                in
                ( { model | sessions = Dict.insert browserCookie userInfo model.sessions }
                , sendToClient connectionId (AuthSuccess userInfo)
                )

            else
                ( model, sendError connectionId "Invalid email or password" )

        Nothing ->
            ( model, sendError connectionId "Invalid email or password" )


{-| Refuses emails that already belong to an account (password or OAuth) and
the configured SysAdmin email, so signup can never take over an existing
identity or grant the SysAdmin role. Validation is repeated here because the
backend must not trust the frontend form.
-}
handleSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> BackendModel -> ( BackendModel, Command BackendOnly ToFrontend BackendMsg )
handleSignup browserCookie connectionId rawEmail password maybeName model =
    let
        email =
            normalizeEmail rawEmail
    in
    if not (isPlausibleEmail email) then
        ( model, sendError connectionId "Please enter a valid email address" )

    else if String.length password < minimumPasswordLength then
        ( model, sendError connectionId ("Passwords must be at least " ++ String.fromInt minimumPasswordLength ++ " characters") )

    else if emailIsTaken email model || email == normalizeEmail Env.sysAdminEmail then
        ( model, sendError connectionId "An account with this email already exists" )

    else
        ( model
        , Effect.Time.now
            |> Effect.Task.perform
                (\now ->
                    let
                        salt =
                            Crypto.Hash.sha256 (email ++ browserCookie ++ String.fromInt (Time.posixToMillis now))
                    in
                    EmailPasswordAuthResult
                        (EmailPasswordSignupWithHash browserCookie connectionId email maybeName salt (Auth.PasswordHash.hashPassword salt password).hash)
                )
        )


completeSignup : BrowserCookie -> ConnectionId -> String -> Maybe String -> String -> String -> BackendModel -> ( BackendModel, Command BackendOnly ToFrontend BackendMsg )
completeSignup browserCookie connectionId email maybeName salt hash model =
    if emailIsTaken email model then
        ( model, sendError connectionId "An account with this email already exists" )

    else
        let
            userInfo =
                { email = email, name = maybeName, username = Nothing, picture = Nothing }
        in
        ( { model
            | emailPasswordCredentials =
                Dict.insert email
                    { email = email, passwordHash = hash, passwordSalt = salt, createdAt = 0 }
                    model.emailPasswordCredentials
            , users = Dict.insert email { email = email, name = maybeName, preferences = defaultPreferences } model.users
            , sessions = Dict.insert browserCookie userInfo model.sessions
          }
        , sendToClient connectionId (AuthSuccess userInfo)
        )


minimumPasswordLength : Int
minimumPasswordLength =
    8


normalizeEmail : String -> String
normalizeEmail =
    String.trim >> String.toLower


isPlausibleEmail : String -> Bool
isPlausibleEmail email =
    case String.split "@" email of
        [ local, domain ] ->
            not (String.isEmpty local) && String.contains "." domain && not (String.contains " " email)

        _ ->
            False


emailIsTaken : String -> BackendModel -> Bool
emailIsTaken email model =
    Dict.member email model.emailPasswordCredentials || Dict.member email model.users


sendError : ConnectionId -> String -> Command BackendOnly ToFrontend BackendMsg
sendError connectionId message =
    sendToClient connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString message)))


sendToClient : ConnectionId -> ToFrontend -> Command BackendOnly ToFrontend BackendMsg
sendToClient connectionId =
    Effect.Lamdera.sendToFrontend (Effect.Lamdera.clientIdFromString connectionId)
