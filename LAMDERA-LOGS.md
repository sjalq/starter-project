# Lamdera.log - How It Works and How to Use It

## What is Lamdera.log?

There is no `Lamdera.log` function. "Lamdera.log" is the name for a system
built into the Lamdera runtime where `Debug.log` output is captured to a
disk-backed log file and served via an authenticated HTTP endpoint.

Every `Debug.log` call in your Elm backend code ends up in a file at
`~/lamdera-logs/{appname}/out.log` on the Lamdera server, with timestamps
added automatically.


## The data flow

```
Elm backend code:     _ = Debug.log "INFO" "Starting sync"
        |
JS runtime:           console.log("INFO: Starting sync")
        |
console-stamp:        [2026-03-26 14:23:45.082] INFO: Starting sync
(auto-timestamps)
        |
stdout redirect:      appended to ~/lamdera-logs/{appname}/out.log
        |
HTTP endpoint:        GET /_logs/read?key=...&lines=100&direction=tail
```


## Why this matters for the starter-project

Logger.elm already calls `Debug.log` on every log call (line 301):

```elm
log level message toMsg ( model, cmd ) =
    let
        ...
        _ = Debug.log (levelToString level) message   -- writes to log file
    in
    ...
```

This means every `Logger.logInfo`, `Logger.logWarn`, `Logger.logError`, and
`Logger.logDebug` call is ALREADY writing to the Lamdera log file in production.

The `logState` in BackendModel is a second copy of what is already on disk.
Both systems work simultaneously. You can choose to:

(a) Keep both (current state) - in-memory for the admin UI, disk for CLI/external
(b) Drop logState and read from the HTTP endpoint only (saves model memory)


## How to log (you're already doing it)

```elm
-- In Backend.elm update function:
SomeEvent ->
    Logger.logInfo "Something happened" GotLogTime ( model, Cmd.none )
        |> wrapLogCmd

-- This produces a line in the log file like:
-- [2026-03-26 14:23:45.082] INFO: Something happened
```

You can also use raw Debug.log anywhere in backend code:

```elm
-- Quick and dirty, no Logger module needed:
let
    _ = Debug.log "my-label" someValue
in
( model, Cmd.none )

-- Produces:
-- [2026-03-26 14:23:45.082] my-label: <elm-formatted value>
```

Both approaches write to the same log file.


## How to read logs

### From your app's admin page

The current admin page at /admin/logs reads from `model.logState` (in-memory).
This works but is capped at 2000 entries and loses history on restart.

### From the command line (recommended for debugging)

```bash
# Read last 50 lines
./scripts/node/lamdera-logs.mjs read --lines 50

# Read first 100 lines
./scripts/node/lamdera-logs.mjs read --lines 100 --direction head

# Read a range
./scripts/node/lamdera-logs.mjs read --from 1000 --to 1100

# Get total line count
./scripts/node/lamdera-logs.mjs count

# Check if logging is enabled
./scripts/node/lamdera-logs.mjs status

# Filter with grep (pipe-friendly)
./scripts/node/lamdera-logs.mjs read --lines 500 | grep "ERROR"

# Follow-style: grab last 20 lines every 5 seconds
watch -n 5 './scripts/node/lamdera-logs.mjs read --lines 20'
```

### From curl directly

```bash
# URL-encode the key (+ -> %2B, = -> %3D, / -> %2F)
KEY="your_url_encoded_key_here"
APP="your-app-name"

# Read last 100 lines
curl -s "https://${APP}.lamdera.app/_logs/read?key=${KEY}&lines=100&direction=tail"

# Get line count
curl -s "https://${APP}.lamdera.app/_logs/read/count?key=${KEY}"

# Check status
curl -s "https://${APP}.lamdera.app/_logs/status"
```

### From your Elm frontend (same-domain fetch)

Since the frontend is served from the same domain, you can fetch logs
directly without CORS issues:

```elm
fetchLogs : String -> Int -> String -> Cmd FrontendMsg
fetchLogs urlEncodedKey lines direction =
    Http.get
        { url =
            "/_logs/read?key="
                ++ urlEncodedKey
                ++ "&lines="
                ++ String.fromInt lines
                ++ "&direction="
                ++ direction
        , expect = Http.expectString GotLogLines
        }
```

The log key should be stored in Env.elm and sent to the frontend only
after admin authentication, so it is not exposed to unauthenticated users.


## HTTP API reference

All endpoints are on the same domain as your deployed Lamdera app.

```
GET /_logs/read
    key         required    URL-encoded log key
    lines       optional    number of lines (default 100)
    direction   optional    "tail" (default) or "head"
    from        optional    start line number (0-based)
    to          optional    end line number
    Returns: text/plain, newline-separated

GET /_logs/read/count
    key         required    URL-encoded log key
    Returns: JSON {"count": N}

GET /_logs/enable       Toggle logging on
GET /_logs/disable      Toggle logging off
GET /_logs/status       Returns "true" or "false"
```


## Getting your log key

Log keys are per-app and currently provided by Mario Rogic (Lamdera founder)
on request via Discord DM. Send him your app name(s).

The key contains +, =, / characters that MUST be URL-encoded for HTTP use:
  + -> %2B
  = -> %3D
  / -> %2F

Store the raw key in Env.elm, URL-encode it when building request URLs.


## What the log file looks like

```
[2026-03-26 15:18:49.082] [v125] 💾⏬ snapshot requested
[2026-03-26 15:18:49.115] [v125] 💾 exported from Elm in 33ms
[2026-03-26 15:18:51.106] [v126] [active] ☀️  upgraded from previous model
[2026-03-26 15:18:51.107] [v126] ✅ v126 is now in control
[2026-03-26 15:19:07.109] [v126][🧠] 32.97 🐿  manual gc started
[2026-03-26 17:30:01.234] INFO: Starting contact sync
[2026-03-26 17:30:01.567] INFO: Fetched 42 contacts from Paystack
[2026-03-26 17:30:02.890] ERROR: HubSpot API timeout after 30s
[2026-03-26 17:30:02.891] WARN: Retrying HubSpot sync in 60s
```

Lines with [vN] prefixes are Lamdera runtime infrastructure messages
(snapshots, upgrades, GC). Lines with INFO/WARN/ERROR/DEBUG are your
application logs from Logger.elm / Debug.log.


## Gotchas

1. URL-encode the key. Raw keys with +, =, / break query strings.

2. Apps need a recent deploy for the logging runtime to be active.
   If the endpoint returns nothing, ask Mario to cycle the app.

3. Debug.log is allowed in `lamdera check` and `lamdera deploy` but
   NOT with the `--optimize` flag. Never use --optimize with Debug.log.

4. The log file grows indefinitely. For high-traffic apps, discuss
   log rotation with Mario.

5. The key is not yet self-service. Mario plans to add a dashboard
   UI for key retrieval and make the key format URL-safe.
