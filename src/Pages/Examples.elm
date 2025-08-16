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
                [ -- Console Logger Example
                  Components.Card.withTitle colors
                    "Console Logger Example"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "Click the button below to send a message to the browser console:" ]
                    , div [ Attr.class "w-full sm:w-auto" ]
                        [ Components.Button.primary colors (Just ConsoleLogClicked) "Log to Console" ]
                    , p [ Attr.class "mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400" ]
                        [ text "Check your browser's developer console to see the message!" ]
                    ]
                , -- Clipboard Example
                  Components.Card.withTitle colors
                    "Clipboard Example"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "Click the buttons below to copy different text to your clipboard:" ]
                    , div [ Attr.class "flex flex-col sm:flex-row gap-3 sm:gap-2" ]
                        [ Components.Button.success colors (Just (CopyToClipboard "Hello from Elm!")) "Copy \"Hello from Elm!\""
                        , Components.Button.success colors (Just (CopyToClipboard "Elm ports are awesome!")) "Copy \"Elm ports are awesome!\""
                        , Components.Button.success colors (Just (CopyToClipboard "https://lamdera.com")) "Copy Lamdera URL"
                        ]
                    , p [ Attr.class "mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400" ]
                        [ text "Try pasting (Ctrl+V or Cmd+V) somewhere to see the copied text!" ]
                    ]
                , -- Code Example
                  Components.Card.withTitle colors
                    "How It Works"
                    [ p [ Attr.class "mb-4 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ text "This example demonstrates the elm-pkg-js standard for Lamdera:" ]
                    , ul [ Attr.class "list-disc list-inside space-y-2 text-sm md:text-base", Attr.style "color" colors.primaryText ]
                        [ li [] [ text "Port modules are defined in src/Ports/" ]
                        , li [] [ text "JavaScript handlers are in elm-pkg-js/" ]
                        , li [] [ text "elm-pkg-js-includes.js wires everything together" ]
                        , li [] [ text "Lamdera automatically initializes the ports" ]
                        ]
                    ]
                ]
            ]
        ]
