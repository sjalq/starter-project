/* elm-pkg-js
import Json.Encode
port clipboard_to_js : Json.Encode.Value -> Cmd msg
port clipboard_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    if (!app.ports.clipboard_to_js) {
        return;
    }

    const reply = (ok, message) => {
        if (app.ports.clipboard_from_js) {
            app.ports.clipboard_from_js.send({ ok, message });
        }
    };

    app.ports.clipboard_to_js.subscribe(async function (text) {
        try {
            await navigator.clipboard.writeText(text);
            reply(true, "Copied to clipboard");
        } catch (err) {
            console.error("Failed to copy to clipboard:", err);
            reply(false, "Failed to copy: " + err.message);
        }
    });
};
