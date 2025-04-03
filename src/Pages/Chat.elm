module Pages.Chat exposing (..)

import Html exposing (Html, div, h2, input, button, text, ul, li, span)
import Html.Attributes exposing (placeholder, value, type_, class, classList)
import Html.Events exposing (onInput, onClick)
import Types exposing (FrontendMsg(..), ChatMessage, MessageSender(..), AgentId)


type alias Model =
    { chatInput : String
    , messages : List ChatMessage
    }


init : Model
init =
    { chatInput = ""
    , messages = [] -- Start with no messages (data comes from FrontendModel)
    }


view : Model -> Html FrontendMsg
view model =
    -- Main container with padding and max-width
    Html.div [ class "p-4 max-w-4xl mx-auto" ]
        [
            Html.h2 [ class "text-2xl font-bold mb-4" ] [ Html.text "Chat" ],
            -- Message display area with border and scroll
            div [ class "h-96 border rounded p-2 mb-4 overflow-y-auto flex flex-col-reverse" ]
                [ viewMessages model.messages ],
            viewInput model.chatInput
        ]


viewMessages : List ChatMessage -> Html FrontendMsg
viewMessages messages =
    -- Using div instead of ul for flex layout
    div [ class "flex flex-col space-y-2" ]
        (
            List.map viewMessage messages
        )


viewMessage : ChatMessage -> Html FrontendMsg
viewMessage message =
    -- Individual message container
    div [] -- Outer div for alignment
        [
            div
                [ classList
                    [ ( "flex", True )
                    , ( "justify-end", message.sender == UserSender )
                    , ( "justify-start", message.sender /= UserSender )
                    ]
                ]
                [ -- Inner div for message bubble styling
                  div
                      [ class "max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-lg"
                      , classList -- Differentiate background based on sender
                          [ ( "bg-blue-500 text-white", message.sender == UserSender )
                          , ( "bg-gray-200 text-gray-800", message.sender /= UserSender )
                          ]
                      ]
                      [
                        span [ class "font-semibold text-sm block mb-1" ] [ text (senderToString message.sender) ],
                        span [] [ text message.text ]
                      ]
                ]
        ]


senderToString : MessageSender -> String
senderToString sender =
    case sender of
        UserSender -> "You"
        AgentSender agentId -> agentId


viewInput : String -> Html FrontendMsg
viewInput currentInput =
    -- Input area using flexbox
    div [ class "flex space-x-2" ]
        [ input
            [ type_ "text"
            , placeholder "Type your message..."
            , value currentInput
            , onInput ChatInputChanged
            , class "flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" -- Input styling
            ]
            []
        , button
            [ onClick SendChatMessage
            , class "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50" -- Button styling
            , Html.Attributes.disabled (String.isEmpty currentInput) -- Disable if input is empty
            ]
            [ text "Send" ]
        ] 