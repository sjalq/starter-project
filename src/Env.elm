module Env exposing (..)

-- The Env.elm file is for per-environment configuration.
-- See https://dashboard.lamdera.app/docs/environment for more info.


dummyConfigItem =
    ""


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
    "---------------------------------------"


auth0AppClientSecret : String
auth0AppClientSecret =
    "---------------------------------------"


auth0AppTenant : String
auth0AppTenant =
    "your-app-gibberish-here.us.auth0.com"


sysAdminEmail : String
sysAdminEmail =
    "schalk.dormehl@gmail.com"


openAiApiKey : String
openAiApiKey =
    ""


type Mode
    = Development
    | Production


mode =
    Development
