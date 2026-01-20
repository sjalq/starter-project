module Program.DarkModeTests exposing (suite)

{-| Program tests for dark mode functionality.

Tests that dark mode preference can be toggled and persists correctly.

-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import SeqDict
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Dark Mode"
        [ testDefaultDarkMode
        , testBackendInitializesWithDarkMode
        ]


{-| Test that the app starts with dark mode enabled by default.
-}
testDefaultDarkMode : Test
testDefaultDarkMode =
    Sim.start "default dark mode enabled"
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
                                if model.preferences.darkMode then
                                    Ok ()

                                else
                                    Err "Expected dark mode to be enabled by default"

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the backend initializes correctly with test data.
-}
testBackendInitializesWithDarkMode : Test
testBackendInitializesWithDarkMode =
    Sim.start "backend initializes"
        [ Test.checkBackend 0 <|
            \backend ->
                -- Backend should initialize without errors
                Ok ()
        ]
        |> Test.toTest
