module Program.NavigationTests exposing (suite)

{-| Program tests for navigation: each URL loads the expected route.
-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Route
import Test exposing (Test)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Navigation"
        [ loadsRoute "/" Default
        , loadsRoute "/admin" (Admin AdminDefault)
        , loadsRoute "/admin/logs" (Admin (AdminLogs Route.defaultLogsParams))
        , loadsRoute "/examples" Examples
        , loadsRoute "/does-not-exist" NotFound
        ]


loadsRoute : String -> Route -> Test
loadsRoute path expected =
    Sim.start ("loading " ++ path ++ " selects the expected route")
        [ Test.connectFrontend 0
            (Effect.Lamdera.sessionIdFromString ("session-nav" ++ path))
            path
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.checkModel 100
                    (\model ->
                        if model.currentRoute == expected then
                            Ok ()

                        else
                            Err ("Expected " ++ Debug.toString expected ++ ", got " ++ Debug.toString model.currentRoute)
                    )
                ]
            )
        ]
        |> Test.toTest
