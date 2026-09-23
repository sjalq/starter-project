/* elm-pkg-js
import Json.Encode
port console_logger_to_js : Json.Encode.Value -> Cmd msg
port console_logger_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    if (!app.ports.console_logger_to_js) {
        return;
    }

    app.ports.console_logger_to_js.subscribe(function (message) {
        console.log("[Elm Console Logger]:", message);

        if (app.ports.console_logger_from_js) {
            app.ports.console_logger_from_js.send("Logged: " + message);
        }
    });
};
