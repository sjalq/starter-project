module Pages.Examples exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as HE
import Theme
import Types exposing (..)


init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( model, Cmd.none )


view : FrontendModel -> Theme.Colors -> Html FrontendMsg
view model colors =
    div [ Attr.style "background-color" colors.primaryBg, Attr.class "min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 py-8" ]
            [ h1 [ Attr.class "text-3xl font-bold mb-8", Attr.style "color" colors.primaryText ]
                [ text "Examples" ]
            
            , div [ Attr.class "space-y-8" ]
                [ -- Console Logger Example
                  div [ Attr.class "bg-gray-100 dark:bg-gray-800 p-6 rounded-lg" ]
                    [ h2 [ Attr.class "text-xl font-semibold mb-4", Attr.style "color" colors.primaryText ]
                        [ text "Console Logger Example" ]
                    , p [ Attr.class "mb-4", Attr.style "color" colors.primaryText ]
                        [ text "Click the button below to send a message to the browser console:" ]
                    , button 
                        [ HE.onClick ConsoleLogClicked
                        , Attr.class "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        ]
                        [ text "Log to Console" ]
                    , p [ Attr.class "mt-4 text-sm text-gray-600 dark:text-gray-400" ]
                        [ text "Check your browser's developer console to see the message!" ]
                    ]
                
                , -- Clipboard Example
                  div [ Attr.class "bg-gray-100 dark:bg-gray-800 p-6 rounded-lg" ]
                    [ h2 [ Attr.class "text-xl font-semibold mb-4", Attr.style "color" colors.primaryText ]
                        [ text "Clipboard Example" ]
                    , p [ Attr.class "mb-4", Attr.style "color" colors.primaryText ]
                        [ text "Click the buttons below to copy different text to your clipboard:" ]
                    , div [ Attr.class "space-y-2" ]
                        [ button 
                            [ HE.onClick (CopyToClipboard "Hello from Elm!")
                            , Attr.class "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                            ]
                            [ text "Copy \"Hello from Elm!\"" ]
                        , button 
                            [ HE.onClick (CopyToClipboard "Elm ports are awesome!")
                            , Attr.class "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                            ]
                            [ text "Copy \"Elm ports are awesome!\"" ]
                        , button 
                            [ HE.onClick (CopyToClipboard "https://lamdera.com")
                            , Attr.class "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            ]
                            [ text "Copy Lamdera URL" ]
                        ]
                    , p [ Attr.class "mt-4 text-sm text-gray-600 dark:text-gray-400" ]
                        [ text "Try pasting (Ctrl+V or Cmd+V) somewhere to see the copied text!" ]
                    ]
                
                , -- Code Example
                  div [ Attr.class "bg-gray-100 dark:bg-gray-800 p-6 rounded-lg" ]
                    [ h2 [ Attr.class "text-xl font-semibold mb-4", Attr.style "color" colors.primaryText ]
                        [ text "How It Works" ]
                    , p [ Attr.class "mb-4", Attr.style "color" colors.primaryText ]
                        [ text "This example demonstrates the elm-pkg-js standard for Lamdera:" ]
                    , ul [ Attr.class "list-disc list-inside space-y-2", Attr.style "color" colors.primaryText ]
                        [ li [] [ text "Port modules are defined in src/Ports/" ]
                        , li [] [ text "JavaScript handlers are in elm-pkg-js/" ]
                        , li [] [ text "elm-pkg-js-includes.js wires everything together" ]
                        , li [] [ text "Lamdera automatically initializes the ports" ]
                        ]
                    ]
                ]
            ]
        ]