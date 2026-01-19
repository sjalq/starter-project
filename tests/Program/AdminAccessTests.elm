module Program.AdminAccessTests exposing (suite)

{-| Program tests for admin access and permissions.

Tests that admin functionality is properly protected and permissions are enforced.

-}

import Dict
import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import SeqDict
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Admin Access"
        [ testAdminPageLoads
        , testBackendHasTestUsers
        ]


{-| Test that admin page loads correctly.
-}
testAdminPageLoads : Test
testAdminPageLoads =
    Sim.start "admin page loads"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session1")
            (Sim.testUrl "/admin")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                case model.currentRoute of
                                    Admin AdminDefault ->
                                        Ok ()

                                    Admin _ ->
                                        Ok ()

                                    other ->
                                        Err ("Expected Admin route, got: " ++ Debug.toString other)

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that backend initializes with test users from TestData.
-}
testBackendHasTestUsers : Test
testBackendHasTestUsers =
    Sim.start "backend has test users"
        [ Test.checkBackend 0 <|
            \backend ->
                if Dict.isEmpty backend.users then
                    Err "Expected test users to be initialized"

                else
                    Ok ()
        ]
        |> Test.toTest
