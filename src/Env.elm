module Env exposing (Mode(..), auth0AppClientId, auth0AppClientSecret, auth0AppTenant, logSize, mode, modelKey, slackApiToken, slackChannel, sysAdminEmail)

{-| Per-environment configuration.

Values here are the local development defaults. Production values come from the
dashboard on the sjalq.app box: `set_env` (see README, "Live on the sjalq.app box").

-}


{-| Shared secret for the `getModel`, `setModel` and `getLogs` RPC endpoints
(sent as the `x-lamdera-model-key` header). The default only works locally:
in Production the RPC endpoints refuse it, so set your own in the dashboard.
-}
modelKey : String
modelKey =
    "1234567890"


{-| Optional Slack bot token and channel used by the task chain example.
Leave empty to disable Slack logging.
-}
slackApiToken : String
slackApiToken =
    ""


slackChannel : String
slackChannel =
    ""


{-| Maximum number of in-memory log entries kept by `Logger`.
-}
logSize : String
logSize =
    "2000"


{-| Auth0 application credentials. Create an application at
<https://manage.auth0.com> and set these in the Lamdera dashboard.
Never commit a real client secret.
-}
auth0AppClientId : String
auth0AppClientId =
    ""


auth0AppClientSecret : String
auth0AppClientSecret =
    ""


auth0AppTenant : String
auth0AppTenant =
    ""


{-| The account with this email gets the SysAdmin role.
-}
sysAdminEmail : String
sysAdminEmail =
    "admin@example.com"


type Mode
    = Development
    | Production


mode : Mode
mode =
    Development
