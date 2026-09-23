port module Ports.Clipboard exposing (copyResult, copyToClipboard)

import Effect.Command as Command exposing (Command, FrontendOnly)
import Effect.Subscription as Subscription exposing (Subscription)
import Json.Decode as D
import Json.Encode as E


port clipboard_to_js : E.Value -> Cmd msg


port clipboard_from_js : (D.Value -> msg) -> Sub msg


copyToClipboard : String -> Command FrontendOnly toMsg msg
copyToClipboard text =
    Command.sendToJs "clipboard_to_js" clipboard_to_js (E.string text)


copyResult : (Result String String -> msg) -> Subscription FrontendOnly msg
copyResult toMsg =
    Subscription.fromJs "clipboard_from_js"
        clipboard_from_js
        (\value ->
            D.decodeValue resultDecoder value
                |> Result.mapError (\_ -> "Failed to decode clipboard response")
                |> Result.andThen identity
                |> toMsg
        )


resultDecoder : D.Decoder (Result String String)
resultDecoder =
    D.map2
        (\ok message ->
            if ok then
                Ok message

            else
                Err message
        )
        (D.field "ok" D.bool)
        (D.field "message" D.string)
