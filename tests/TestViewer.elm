module TestViewer exposing (main)

{-| Visual viewer for program test snapshots.

Build and serve with `./scripts/run-test-viewer.sh`, then open
<http://localhost:8888/viewer.html>.

-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Types exposing (..)


type alias ViewerTest =
    Test.EndToEndTest ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel


allTests : List ViewerTest
allTests =
    [ pageSnapshot "Home Page" "/"
    , pageSnapshot "Examples Page" "/examples"
    , pageSnapshot "Admin Page (logged out)" "/admin"
    , pageSnapshot "Not Found Page" "/does-not-exist"
    ]


pageSnapshot : String -> String -> ViewerTest
pageSnapshot name path =
    Sim.start name
        [ Test.connectFrontend 0
            (Effect.Lamdera.sessionIdFromString ("session-" ++ name))
            path
            { width = 1920, height = 1080 }
            (\frontend -> [ frontend.snapshotView 100 { name = name } ])
        ]


main : Program () (Test.Model ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel) (Test.Msg ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel)
main =
    Test.viewer allTests
