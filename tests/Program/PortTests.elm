module Program.PortTests exposing (suite)

{-| Program tests for the elm-pkg-js port round trips shown on the Examples page.
-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Json.Encode as E
import Test exposing (Test)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text)


suite : Test
suite =
    Test.describe "Ports"
        [ portReplyShows "console logger reply is shown"
            "console_logger_from_js"
            (E.string "Logged: Hello from Elm!")
            "Reply from JavaScript: Logged: Hello from Elm!"
        , portReplyShows "clipboard success is shown"
            "clipboard_from_js"
            (E.object [ ( "ok", E.bool True ), ( "message", E.string "Copied to clipboard" ) ])
            "Reply from JavaScript: Copied to clipboard"
        , portReplyShows "clipboard failure is shown"
            "clipboard_from_js"
            (E.object [ ( "ok", E.bool False ), ( "message", E.string "Failed to copy: denied" ) ])
            "Reply from JavaScript: Failed to copy: denied"
        ]


portReplyShows : String -> String -> E.Value -> String -> Test
portReplyShows name portName payload expectedText =
    Sim.start name
        [ Test.connectFrontend 0
            (Effect.Lamdera.sessionIdFromString ("session-" ++ name))
            "/examples"
            { width = 1920, height = 1080 }
            (\frontend ->
                [ frontend.checkView 100 (Query.hasNot [ text "Reply from JavaScript" ])
                , frontend.portEvent 100 portName payload
                , frontend.checkView 100 (Query.has [ text expectedText ])
                ]
            )
        ]
        |> Test.toTest
