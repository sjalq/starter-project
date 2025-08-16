module Auth.EmailPasswordAuth exposing (FormMsg(..), completeSignup, handleLogin, handleSignup)

import Auth.Common
import Auth.PasswordHash exposing (verifyPassword)
import Dict
import Lamdera
import Random
import Types exposing (..)



-- TYPES


type FormMsg
    = EmailChanged String
    | PasswordChanged String
    | ConfirmPasswordChanged String
    | NameChanged String
    | ToggleMode
    | Submit



-- INITIAL VALUES
-- FORM UPDATE
-- Form is valid, submission will be handled by parent
-- BACKEND OPERATIONS


handleLogin : BrowserCookie -> ConnectionId -> String -> String -> BackendModel -> ( BackendModel, Cmd BackendMsg )
handleLogin browserCookie connectionId email password model =
    case Dict.get email model.emailPasswordCredentials of
        Just creds ->
            let
                hashedPassword =
                    { hash = creds.passwordHash, salt = creds.passwordSalt }
            in
            if verifyPassword password hashedPassword then
                let
                    -- Get user name from stored user data
                    userName =
                        case Dict.get email model.users of
                            Just user ->
                                user.name

                            Nothing ->
                                Nothing

                    userInfo =
                        { email = email, name = userName, username = Nothing, picture = Nothing }

                    newSessions =
                        Dict.insert browserCookie userInfo model.sessions
                in
                ( { model | sessions = newSessions }
                , Lamdera.sendToFrontend connectionId (AuthSuccess userInfo)
                )

            else
                ( model
                , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
                )

        Nothing ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
            )


handleSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> BackendModel -> ( BackendModel, Cmd BackendMsg )
handleSignup browserCookie connectionId email password maybeName model =
    case Dict.get email model.emailPasswordCredentials of
        Just _ ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "User already exists")))
            )

        Nothing ->
            let
                saltGenerator =
                    Random.int 100000000 999999999 |> Random.map String.fromInt

                cmd =
                    Random.generate
                        (\salt ->
                            EmailPasswordAuthResult (EmailPasswordSignupWithHash browserCookie connectionId email password maybeName salt (Auth.PasswordHash.hashPassword salt password).hash)
                        )
                        saltGenerator
            in
            ( model, cmd )


completeSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> String -> String -> BackendModel -> ( BackendModel, Cmd BackendMsg )
completeSignup browserCookie connectionId email _ maybeName salt hash model =
    let
        newCredentials =
            { email = email
            , passwordHash = hash
            , passwordSalt = salt
            , createdAt = 0
            }

        initialPreferences =
            { darkMode = True }

        user =
            { email = email, name = maybeName, preferences = initialPreferences }

        userInfo =
            { email = email, name = maybeName, username = Nothing, picture = Nothing }

        updatedModel =
            { model
                | emailPasswordCredentials = Dict.insert email newCredentials model.emailPasswordCredentials
                , users = Dict.insert email user model.users
                , sessions = Dict.insert browserCookie userInfo model.sessions
            }
    in
    ( updatedModel, Lamdera.sendToFrontend connectionId (AuthSuccess userInfo) )
