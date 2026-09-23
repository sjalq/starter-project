// Lamdera bundles the JavaScript listed here with production deploys.
// In local development (`lamdera live`) every file in elm-pkg-js/ is loaded
// automatically, so this file only runs in production.

const consoleLogger = require('./elm-pkg-js/console-logger.js')
const clipboard = require('./elm-pkg-js/clipboard.js')

exports.init = async function init(app) {
    await consoleLogger.init(app)
    await clipboard.init(app)
}
