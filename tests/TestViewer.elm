module TestViewer exposing (main)

{-| Visual test viewer for program tests.

Run with: lamdera make tests/TestViewer.elm --output=tests/viewer.js
Then open tests/viewer.html in a browser.

-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import SeqDict
import Types exposing (..)


{-| All program tests for the viewer.
-}
allTests :
    List
        (Test.EndToEndTest
            ToBackend
            FrontendMsg
            FrontendModel
            ToFrontend
            BackendMsg
            BackendModel
        )
allTests =
    [ homePageRendersTest
    , adminPageRendersTest
    , examplesPageRendersTest
    , navigationTests
    ]


{-| Test that home page renders with expected content.
-}
homePageRendersTest =
    Sim.start "Home Page Renders"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-home")
            "/"
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.snapshotView 100 { name = "Home Page Initial" }
                ]
            )
        ]


{-| Test that admin page renders.
-}
adminPageRendersTest =
    Sim.start "Admin Page Renders"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-admin")
            "/admin"
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.snapshotView 100 { name = "Admin Page" }
                ]
            )
        ]


{-| Test that examples page renders.
-}
examplesPageRendersTest =
    Sim.start "Examples Page Renders"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-examples")
            "/examples"
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.snapshotView 100 { name = "Examples Page" }
                ]
            )
        ]


navigationTests =
    Sim.start "Navigation: route changes"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session1")
            "/"
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.snapshotView 100 { name = "Initial Home" }
                , Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                if model.currentRoute == Default then
                                    Ok ()

                                else
                                    Err "Expected Default route"

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]


main =
    Test.viewer allTests
