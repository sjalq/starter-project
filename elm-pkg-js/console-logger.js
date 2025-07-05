/* elm-pkg-js
import Json.Encode
port console_logger_to_js : Json.Encode.Value -> Cmd msg
port console_logger_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    // Subscribe to messages from Elm
    if (app.ports.console_logger_to_js) {
        app.ports.console_logger_to_js.subscribe(function(message) {
            // Log the message to the console
            console.log("[Elm Console Logger]:", message);
            
            // Send a confirmation back to Elm
            if (app.ports.console_logger_from_js) {
                app.ports.console_logger_from_js.send("Logged: " + message);
            }
        });
    }
}