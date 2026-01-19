module Program.AuthFlowTests exposing (suite)

{-| Program tests for authentication flows.

Tests login, signup, logout, and session management.

-}

import Auth.Common
import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import SeqDict
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Auth Flow"
        [ testStartsLoggedOut
        , testAuthFlowStartsIdle
        , testLoginModalInitiallyClosed
        ]


{-| Test that the app starts with user logged out.
-}
testStartsLoggedOut : Test
testStartsLoggedOut =
    Sim.start "starts logged out"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session1")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                case model.login of
                                    NotLogged _ ->
                                        Ok ()

                                    _ ->
                                        Err ("Expected NotLogged, got: " ++ Debug.toString model.login)

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that auth flow starts in Idle state.
-}
testAuthFlowStartsIdle : Test
testAuthFlowStartsIdle =
    Sim.start "auth flow starts idle"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session2")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                case model.authFlow of
                                    Auth.Common.Idle ->
                                        Ok ()

                                    _ ->
                                        Err ("Expected Idle auth flow, got: " ++ Debug.toString model.authFlow)

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that login modal is initially closed.
-}
testLoginModalInitiallyClosed : Test
testLoginModalInitiallyClosed =
    Sim.start "login modal initially closed"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session3")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                if model.loginModalOpen then
                                    Err "Expected login modal to be closed initially"

                                else
                                    Ok ()

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest
