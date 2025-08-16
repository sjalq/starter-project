module Env exposing (Mode(..), auth0AppClientId, auth0AppClientSecret, auth0AppTenant, logSize, mode, modelKey, openAiApiKey, slackApiToken, slackChannel, stillTesting, sysAdminEmail)

-- The Env.elm file is for per-environment configuration.
-- See https://dashboard.lamdera.app/docs/environment for more info.


modelKey =
    "1234567890"


slackApiToken =
    "1234567890"


slackChannel =
    "#test"


logSize =
    "2000"


stillTesting =
    "1"


auth0AppClientId : String
auth0AppClientId =
    "qqkzut4gKyC6Y2lB3nlPsOBwnLmTQxfx"


auth0AppClientSecret : String
auth0AppClientSecret =
    "-2bRUV-1JXwO9sqCuTdKziBYG1Rn83bfRvB9LPBqsp5yFcVClx19G-6dI0XtDmEU"


auth0AppTenant : String
auth0AppTenant =
    "dev-ioeftjgqbnfyd4lp.us.auth0.com"


sysAdminEmail : String
sysAdminEmail =
    "sys@admin.com"


openAiApiKey : String
openAiApiKey =
    ""


type Mode
    = Development
    | Production


mode =
    Development
