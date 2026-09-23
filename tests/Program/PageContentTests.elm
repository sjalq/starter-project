module Program.PageContentTests exposing (suite)

{-| Program tests for page content verification.

Renders each page through the full frontend and asserts on visible text.

-}

import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Test exposing (Test)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text)


suite : Test
suite =
    Test.describe "Page Content"
        [ Test.describe "Home Page"
            [ pageShows "home page has welcome header" "/" [ "Your Lamdera app is running" ]
            , pageShows "home page has getting-started hint" "/" [ "src/Pages/Default.elm" ]
            , pageShows "home page has examples link" "/" [ "View Examples →" ]
            ]
        , Test.describe "Examples Page"
            [ pageShows "examples page has header" "/examples" [ "Examples" ]
            , pageShows "examples page has console logger card" "/examples" [ "Console Logger Example", "Log to Console" ]
            , pageShows "examples page has clipboard card" "/examples" [ "Clipboard Example", "Copy \"Hello from Elm!\"" ]
            , pageShows "examples page has how it works card" "/examples" [ "How It Works", "elm-pkg-js" ]
            ]
        , Test.describe "Negative control"
            [ pageLacks "home page does not render examples content" "/" "Console Logger Example"
            ]
        ]


pageShows : String -> String -> List String -> Test
pageShows name path expectedTexts =
    Sim.start name
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString ("session-" ++ name))
            path
            { width = 1920, height = 1080 }
            (\frontend -> [ frontend.checkView 100 (Query.has (List.map text expectedTexts)) ])
        ]
        |> Test.toTest


pageLacks : String -> String -> String -> Test
pageLacks name path unexpectedText =
    Sim.start name
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString ("session-" ++ name))
            path
            { width = 1920, height = 1080 }
            (\frontend -> [ frontend.checkView 100 (Query.hasNot [ text unexpectedText ]) ])
        ]
        |> Test.toTest
