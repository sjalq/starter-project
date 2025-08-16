port module Ports.Clipboard exposing (copyResult, copyToClipboard)

import Json.Decode as D
import Json.Encode as E


port clipboard_to_js : E.Value -> Cmd msg


port clipboard_from_js : (E.Value -> msg) -> Sub msg


copyToClipboard : String -> Cmd msg
copyToClipboard text =
    clipboard_to_js (E.string text)


copyResult : (Result String String -> msg) -> Sub msg
copyResult toMsg =
    clipboard_from_js
        (\value ->
            case D.decodeValue (D.oneOf [ D.map Ok D.string, D.map Err D.string ]) value of
                Ok result ->
                    toMsg result

                Err _ ->
                    toMsg (Err "Failed to decode clipboard response")
        )
