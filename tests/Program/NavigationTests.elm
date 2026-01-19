module Program.NavigationTests exposing (suite)

{-| Program tests for navigation functionality.

Tests that routes are handled correctly and URL changes work as expected.

-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import SeqDict
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Navigation"
        [ testStartsAtHomePage
        , testNavigateToAdmin
        , testNavigateToExamples
        ]


{-| Test that the app starts at the home page.
-}
testStartsAtHomePage : Test
testStartsAtHomePage =
    Sim.start "starts at home page"
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
                                if model.currentRoute == Default then
                                    Ok ()

                                else
                                    Err ("Expected Default route, got: " ++ Debug.toString model.currentRoute)

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test navigating to the admin page.
-}
testNavigateToAdmin : Test
testNavigateToAdmin =
    Sim.start "navigate to admin"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session2")
            (Sim.testUrl "/admin")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                case model.currentRoute of
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


{-| Test navigating to the examples page.
-}
testNavigateToExamples : Test
testNavigateToExamples =
    Sim.start "navigate to examples"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session3")
            (Sim.testUrl "/examples")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                if model.currentRoute == Examples then
                                    Ok ()

                                else
                                    Err ("Expected Examples route, got: " ++ Debug.toString model.currentRoute)

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest
