port module Ports.ConsoleLogger exposing (log, logReceived)

import Json.Decode as D
import Json.Encode as E


port console_logger_to_js : E.Value -> Cmd msg


port console_logger_from_js : (E.Value -> msg) -> Sub msg


log : String -> Cmd msg
log message =
    console_logger_to_js (E.string message)


logReceived : (String -> msg) -> Sub msg
logReceived toMsg =
    console_logger_from_js
        (\value ->
            case D.decodeValue D.string value of
                Ok message ->
                    toMsg message

                Err _ ->
                    toMsg "Error decoding message from JS"
        )
