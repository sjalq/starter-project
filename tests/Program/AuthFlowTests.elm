module Program.AuthFlowTests exposing (suite)

{-| Program tests for authentication flows.
-}

import Auth.Common
import Auth.PasswordHash
import Dict
import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Auth Flow"
        [ Sim.start "starts logged out with an idle auth flow and closed modal"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-auth-initial")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    [ frontend.checkModel 100
                        (\model ->
                            case ( model.login, model.authFlow, model.loginModalOpen ) of
                                ( NotLogged _, Auth.Common.Idle, False ) ->
                                    Ok ()

                                _ ->
                                    Err "Expected NotLogged, Idle auth flow and a closed login modal"
                        )
                    ]
                )
            ]
            |> Test.toTest
        , Sim.start "email/password login creates a session"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-auth-login")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    submitForm frontend False "admin@example.com" "admin"
                        ++ [ Test.checkBackend 100 <|
                                \backend ->
                                    if Dict.member "session-auth-login" backend.sessions then
                                        Ok ()

                                    else
                                        Err "Expected a session for the logged-in browser"
                           , frontend.checkModel 100
                                (\model ->
                                    case model.login of
                                        LoggedIn _ ->
                                            Ok ()

                                        _ ->
                                            Err "Expected the frontend to be logged in"
                                )
                           ]
                )
            ]
            |> Test.toTest
        , Sim.start "wrong password does not create a session"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-auth-wrong")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    submitForm frontend False "admin@example.com" "not-the-password"
                        ++ [ Test.checkBackend 100 <|
                                \backend ->
                                    if Dict.member "session-auth-wrong" backend.sessions then
                                        Err "A wrong password must not create a session"

                                    else
                                        Ok ()
                           ]
                )
            ]
            |> Test.toTest
        , Sim.start "signing up with an existing email cannot overwrite its password"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-auth-takeover")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    submitForm frontend True "admin@example.com" "attacker-password"
                        ++ [ Test.checkBackend 100 <|
                                \backend ->
                                    case Dict.get "admin@example.com" backend.emailPasswordCredentials of
                                        Just creds ->
                                            if Auth.PasswordHash.verifyPassword "admin" { hash = creds.passwordHash, salt = creds.passwordSalt } then
                                                if Dict.member "session-auth-takeover" backend.sessions then
                                                    Err "Signup for an existing email must not create a session"

                                                else
                                                    Ok ()

                                            else
                                                Err "The existing password was overwritten"

                                        Nothing ->
                                            Err "Seeded credentials disappeared"
                           ]
                )
            ]
            |> Test.toTest
        , Sim.start "valid signup creates an account under the normalised email"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-auth-signup")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    signupDirect frontend "  New.User@Example.org " "long-enough-password"
                        ++ [ Test.checkBackend 100 <|
                                \backend ->
                                    if Dict.member "new.user@example.org" backend.emailPasswordCredentials && Dict.member "session-auth-signup" backend.sessions then
                                        Ok ()

                                    else
                                        Err "Expected an account for new.user@example.org and a session"
                           ]
                )
            ]
            |> Test.toTest
        , Test.describe "backend rejects invalid signups sent directly over the websocket"
            (List.map
                (\( name, email, password ) ->
                    Sim.start name
                        [ Test.connectFrontend 0
                            (Effect.Lamdera.sessionIdFromString ("session-" ++ name))
                            "/"
                            { width = 1920, height = 1080 }
                            (\frontend ->
                                signupDirect frontend email password
                                    ++ [ Test.checkBackend 100 <|
                                            \backend ->
                                                if Dict.size backend.emailPasswordCredentials == 1 && not (Dict.member ("session-" ++ name) backend.sessions) then
                                                    Ok ()

                                                else
                                                    Err "Invalid signup must not create an account or session"
                                       ]
                            )
                        ]
                        |> Test.toTest
                )
                [ ( "case variant of the SysAdmin email", "ADMIN@Example.com", "long-enough-password" )
                , ( "password shorter than the minimum", "someone@example.org", "short" )
                , ( "malformed email", "not-an-email", "long-enough-password" )
                , ( "empty email", "", "long-enough-password" )
                ]
            )
        ]


signupDirect : Test.FrontendActions ToBackend frontendMsg frontendModel toFrontend backendMsg backendModel -> String -> String -> List (Test.Action ToBackend frontendMsg frontendModel toFrontend backendMsg backendModel)
signupDirect frontend email password =
    [ frontend.sendToBackend 10 (EmailPasswordAuthToBackend (EmailPasswordSignupToBackend email password Nothing)) ]


submitForm : Test.FrontendActions toBackend FrontendMsg frontendModel toFrontend backendMsg backendModel -> Bool -> String -> String -> List (Test.Action toBackend FrontendMsg frontendModel toFrontend backendMsg backendModel)
submitForm frontend isSignup email password =
    let
        formMsg msg =
            frontend.update 10 (EmailPasswordAuthMsg (EmailPasswordFormMsg msg))
    in
    (if isSignup then
        [ formMsg EmailPasswordFormToggleMode ]

     else
        []
    )
        ++ [ formMsg (EmailPasswordFormEmailChanged email)
           , formMsg (EmailPasswordFormPasswordChanged password)
           , formMsg (EmailPasswordFormConfirmPasswordChanged password)
           , formMsg EmailPasswordFormSubmit
           ]
