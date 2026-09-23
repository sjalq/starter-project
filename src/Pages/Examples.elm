module Pages.Examples exposing (..)

import Components.Button
import Components.Card
import Components.Header
import Html exposing (..)
import Html.Attributes as Attr
import Theme
import Types exposing (..)


init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( model, Cmd.none )


view : FrontendModel -> Theme.Colors -> Html FrontendMsg
view model colors =
    div [ Attr.style "background-color" colors.primaryBg, Attr.class "min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 md:px-6 py-4 md:py-8" ]
            [ Components.Header.sectionHeader colors "Examples"
            , div [ Attr.class "space-y-6 md:space-y-8" ]
                [ viewPortFeedback model colors
                , Components.Card.withTitle colors
                    "Console Logger Example"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "Send a message from Elm to JavaScript through a port." ]
                    , div [ Attr.class "w-full sm:w-auto" ]
                        [ Components.Button.primary colors (Just ConsoleLogClicked) "Log to Console" ]
                    , p [ Attr.class "mt-4 text-xs md:text-sm", Attr.style "color" colors.secondaryText ]
                        [ text "The message appears in your browser's developer console, and JavaScript replies through a port." ]
                    ]
                , Components.Card.withTitle colors
                    "Clipboard Example"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "Copy text to the clipboard with the browser Clipboard API." ]
                    , div [ Attr.class "flex flex-col sm:flex-row gap-3 sm:gap-2" ]
                        [ Components.Button.success colors (Just (CopyToClipboard "Hello from Elm!")) "Copy \"Hello from Elm!\""
                        , Components.Button.success colors (Just (CopyToClipboard "https://lamdera.com")) "Copy Lamdera URL"
                        ]
                    , p [ Attr.class "mt-4 text-xs md:text-sm", Attr.style "color" colors.secondaryText ]
                        [ text "Paste anywhere (Ctrl+V or Cmd+V) to check the result." ]
                    ]
                , Components.Card.withTitle colors
                    "How It Works"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "This example demonstrates the elm-pkg-js standard for Lamdera:" ]
                    , ul [ Attr.class "list-disc list-inside space-y-2 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ li [] [ text "Port modules are defined in src/Ports/" ]
                        , li [] [ text "JavaScript handlers are in elm-pkg-js/" ]
                        , li [] [ text "elm-pkg-js-includes.js wires everything together" ]
                        , li [] [ text "lamdera live loads every file in elm-pkg-js/; production deploys use elm-pkg-js-includes.js" ]
                        ]
                    ]
                ]
            ]
        ]


viewPortFeedback : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewPortFeedback model colors =
    case model.portFeedback of
        Just message ->
            div
                [ Attr.class "p-3 rounded text-sm"
                , Attr.style "background-color" colors.secondaryBg
                , Attr.style "color" colors.primaryText
                , Attr.style "border" ("1px solid " ++ colors.border)
                ]
                [ text ("Reply from JavaScript: " ++ message) ]

        Nothing ->
            text ""
