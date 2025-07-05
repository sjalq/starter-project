/* elm-pkg-js
import Json.Encode
port clipboard_to_js : Json.Encode.Value -> Cmd msg
port clipboard_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    // Subscribe to copy-to-clipboard requests from Elm
    if (app.ports.clipboard_to_js) {
        app.ports.clipboard_to_js.subscribe(async function(text) {
            try {
                // Use the modern Clipboard API
                await navigator.clipboard.writeText(text);
                
                // Send success message back to Elm
                if (app.ports.clipboard_from_js) {
                    app.ports.clipboard_from_js.send("Copied to clipboard!");
                }
            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
                
                // Send error message back to Elm
                if (app.ports.clipboard_from_js) {
                    app.ports.clipboard_from_js.send("Failed to copy: " + err.message);
                }
            }
        });
    }
}