port module Ports.ConsoleLogger exposing (log, logReceived)

import Effect.Command as Command exposing (Command, FrontendOnly)
import Effect.Subscription as Subscription exposing (Subscription)
import Json.Decode as D
import Json.Encode as E


port console_logger_to_js : E.Value -> Cmd msg


port console_logger_from_js : (D.Value -> msg) -> Sub msg


log : String -> Command FrontendOnly toMsg msg
log message =
    Command.sendToJs "console_logger_to_js" console_logger_to_js (E.string message)


logReceived : (String -> msg) -> Subscription FrontendOnly msg
logReceived toMsg =
    Subscription.fromJs "console_logger_from_js"
        console_logger_from_js
        (\value ->
            D.decodeValue D.string value
                |> Result.withDefault "Error decoding message from JS"
                |> toMsg
        )
