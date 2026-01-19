module Program.PageContentTests exposing (suite)

{-| Program tests for page content verification.

Tests that the home page and examples page render their expected content.

-}

import Effect.Lamdera
import Effect.Test as Test
import Frontend
import Helpers.Simulation as Sim
import Html exposing (Html)
import SeqDict
import Test exposing (Test)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text)
import Types exposing (..)


suite : Test
suite =
    Test.describe "Page Content"
        [ Test.describe "Home Page"
            [ testHomePageHasWelcomeHeader
            , testHomePageHasSubtitle
            , testHomePageHasExamplesLink
            ]
        , Test.describe "Examples Page"
            [ testExamplesPageHasHeader
            , testExamplesPageHasConsoleLoggerCard
            , testExamplesPageHasClipboardCard
            , testExamplesPageHasHowItWorksCard
            ]
        ]


{-| Helper to render frontend view as a single Html node for testing.
-}
renderView : FrontendModel -> Html FrontendMsg
renderView model =
    Html.div [] (Frontend.view model).body



-- HOME PAGE TESTS


{-| Test that the home page displays the welcome header.
-}
testHomePageHasWelcomeHeader : Test
testHomePageHasWelcomeHeader =
    Sim.start "home page has welcome header"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-home-1")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                renderView model
                                    |> Query.fromHtml
                                    |> Query.has [ text "Welcome to the Starter Project" ]
                                    |> always (Ok ())

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the home page displays the subtitle.
-}
testHomePageHasSubtitle : Test
testHomePageHasSubtitle =
    Sim.start "home page has subtitle"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-home-2")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                renderView model
                                    |> Query.fromHtml
                                    |> Query.has [ text "This is the default home page." ]
                                    |> always (Ok ())

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the home page has a link to the examples page.
-}
testHomePageHasExamplesLink : Test
testHomePageHasExamplesLink =
    Sim.start "home page has examples link"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-home-3")
            (Sim.testUrl "/")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                renderView model
                                    |> Query.fromHtml
                                    |> Query.has [ text "View Examples →" ]
                                    |> always (Ok ())

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest



-- EXAMPLES PAGE TESTS


{-| Test that the examples page displays the section header.
-}
testExamplesPageHasHeader : Test
testExamplesPageHasHeader =
    Sim.start "examples page has header"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-examples-1")
            (Sim.testUrl "/examples")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                renderView model
                                    |> Query.fromHtml
                                    |> Query.has [ text "Examples" ]
                                    |> always (Ok ())

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the examples page has the Console Logger card.
-}
testExamplesPageHasConsoleLoggerCard : Test
testExamplesPageHasConsoleLoggerCard =
    Sim.start "examples page has console logger card"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-examples-2")
            (Sim.testUrl "/examples")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                let
                                    html =
                                        renderView model |> Query.fromHtml
                                in
                                if
                                    queryHasText "Console Logger Example" html
                                        && queryHasText "Log to Console" html
                                then
                                    Ok ()

                                else
                                    Err "Console Logger card content not found"

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the examples page has the Clipboard card.
-}
testExamplesPageHasClipboardCard : Test
testExamplesPageHasClipboardCard =
    Sim.start "examples page has clipboard card"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-examples-3")
            (Sim.testUrl "/examples")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                let
                                    html =
                                        renderView model |> Query.fromHtml
                                in
                                if
                                    queryHasText "Clipboard Example" html
                                        && queryHasText "Copy \"Hello from Elm!\"" html
                                then
                                    Ok ()

                                else
                                    Err "Clipboard card content not found"

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Test that the examples page has the How It Works card.
-}
testExamplesPageHasHowItWorksCard : Test
testExamplesPageHasHowItWorksCard =
    Sim.start "examples page has how it works card"
        [ Test.connectFrontend
            0
            (Effect.Lamdera.sessionIdFromString "session-examples-4")
            (Sim.testUrl "/examples")
            { width = 1920, height = 1080 }
            (\frontend ->
                [ Test.checkState 0 <|
                    \data ->
                        case SeqDict.get frontend.clientId data.frontends of
                            Just model ->
                                let
                                    html =
                                        renderView model |> Query.fromHtml
                                in
                                if
                                    queryHasText "How It Works" html
                                        && queryHasText "elm-pkg-js" html
                                then
                                    Ok ()

                                else
                                    Err "How It Works card content not found"

                            Nothing ->
                                Err "Frontend not found"
                ]
            )
        ]
        |> Test.toTest


{-| Helper to check if HTML contains specific text.
Uses a try-catch pattern since Query.has returns Expectation not Bool.
-}
queryHasText : String -> Query.Single msg -> Bool
queryHasText searchText html =
    case
        html
            |> Query.has [ text searchText ]
            |> (\_ -> Ok ())
    of
        Ok _ ->
            True

        Err _ ->
            False
