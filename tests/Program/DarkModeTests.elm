module Program.DarkModeTests exposing (suite)

{-| Program tests for dark mode functionality.
-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Dark Mode"
        [ Sim.start "dark mode is enabled by default"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-dark-default")
                "/"
                { width = 1920, height = 1080 }
                (\frontend -> [ frontend.checkModel 100 (expectDarkMode True) ])
            ]
            |> Test.toTest
        , Sim.start "toggling dark mode flips the preference"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-dark-toggle")
                "/"
                { width = 1920, height = 1080 }
                (\frontend ->
                    [ frontend.update 100 ToggleDarkMode
                    , frontend.checkModel 100 (expectDarkMode False)
                    , frontend.update 100 ToggleDarkMode
                    , frontend.checkModel 100 (expectDarkMode True)
                    ]
                )
            ]
            |> Test.toTest
        ]


expectDarkMode : Bool -> FrontendModel -> Result String ()
expectDarkMode expected model =
    if model.preferences.darkMode == expected then
        Ok ()

    else
        Err ("Expected darkMode = " ++ Debug.toString expected)
