At the start of each session, make sure you read the .cursor/*.mdc files so you know how to operate this project. Please note, you can do compiler checks with ./compile.sh

**IMPORTANT**: Always use `http://localhost:8000` instead of `http://0.0.0.0:8000` when accessing the Lamdera development server. The 0.0.0.0 binding is for the server to listen on all interfaces, but clients should connect via localhost.

## Property-Based Testing

This Lamdera project uses property-based tests with elm-explorations/test. Since Lamdera uses lamdera/codecs which is incompatible with standard elm-test, you must use the Lamdera compiler.

### Running Tests

```bash
cd tests
elm-test --compiler lamdera
```

This tells elm-test to use the lamdera compiler instead of the standard elm compiler, allowing it to properly compile lamdera/codecs and other Lamdera-specific packages.

### Test Structure

Tests should be organized in `tests/tests/` directory:

```elm
module Tests exposing (..)

import Test exposing (Test)
import YourTestModule

suite : Test
suite =
    Test.describe "All Tests"
        [ YourTestModule.suite
        ]
```

### elm.json Configuration

The `tests/elm.json` must include:
- `"type": "application"` (not "package")
- Source directories: `["../src", "../auth/src", "tests"]`
- All dependencies from main elm.json
- `"elm-explorations/test": "2.2.0"` in direct dependencies

### Example Property-Based Test

```elm
module ExampleTests exposing (..)

import Expect
import Fuzz exposing (Fuzzer)
import Test exposing (..)

suite : Test
suite =
    describe "Example Property Tests"
        [ fuzz Fuzz.int "reversing twice returns original" <|
            \num ->
                num
                    |> negate
                    |> negate
                    |> Expect.equal num
        ]
```

## RPC Endpoint Conventions

### Creating RPC Endpoints

RPC endpoints are defined in `src/RPC.elm`. To add a new endpoint:

1. Create your handler function with one of these signatures:
   - **JSON endpoints**: `SessionId -> BackendModel -> Headers -> Json.Value -> ( Result Http.Error Json.Value, BackendModel, Cmd BackendMsg )`
   - **Raw endpoints**: `SessionId -> BackendModel -> HttpRequest -> ( RPCResult, BackendModel, Cmd msg )`

2. Register it in `lamdera_handleEndpoints` in `RPC.elm`:

```elm
lamdera_handleEndpoints rawReq args model =
    case args.endpoint of
        "myEndpoint" ->
            LamderaRPC.handleEndpointJson myHandler args model
        -- ...
```

### URL Structure

All RPC endpoints are available at `/_r/{endpointName}`:

- `/_r/getModel` - Get the entire BackendModel (requires auth header)
- `/_r/setModel` - Set the entire BackendModel (requires auth header)
- `/_r/getLogs` - Get server logs as JSON (requires auth header)
- `/_r/getPrice` - Example async endpoint (starts polling job)
- `/_r/getPriceResult` - Example async endpoint (polls for result)

### Async/Long-Running Endpoints

For endpoints that take longer than Lamdera's timeout, use the polling pattern in `AsyncRPC.elm`. See `EndpointExample/Price.elm` for a complete example.

## Lamdera REPL (Labs Feature)

The Lamdera REPL allows live inspection and modification of frontend and backend models during `lamdera live` sessions. This is extremely powerful for rapid development and debugging.

### Opening the REPL

1. Run `lamdera live`
2. Open browser to `http://localhost:8000`
3. Click "Show Repl" button in the developer bar

### Available Functions

In all tabs:
```elm
fem      : Types.FrontendModel          -- Get current frontend model
setFem   : FrontendModel -> FrontendModel  -- Set frontend model
updateFE : FrontendMsg -> FrontendMsg   -- Send FrontendMsg to update
sendToBE : ToBackend -> ToBackend       -- Send message to backend
capture  : a -> a                       -- Snapshot a live value
```

In leader tab only (green dot):
```elm
bem       : Types.BackendModel          -- Get current backend model
setBem    : BackendModel -> BackendModel   -- Set backend model
updateBE  : BackendMsg -> BackendMsg    -- Send BackendMsg to update
sendToFE  : ClientId -> ToFrontend -> ToFrontend  -- Send to specific client
broadcast : ToFrontend -> ToFrontend    -- Send to all clients
```

### LLM Agent Development Acceleration

**1. Rapid State Inspection**
Instead of adding Debug.log statements and recompiling, directly inspect models:
```elm
> bem.users
> fem.currentRoute
> bem.logState |> Logger.toList |> List.take 5
```

**2. Test Message Handlers Without UI**
Trigger any message directly to test your update functions:
```elm
> updateBE (GotLogTime someLoggerMsg)
> updateFE ToggleDarkMode
> sendToBE (Admin_FetchLogs "error")
```

**3. Simulate User Actions**
Test flows without clicking through UI:
```elm
> sendToBE (EmailPasswordAuthToBackend (EmailPasswordLoginToBackend "test@test.com" "password"))
> broadcast (Admin_Logs_ToFrontend [])
```

**4. Hot-Patch State for Testing**
Modify state directly to test edge cases:
```elm
> setBem { bem | users = Dict.empty }
> setFem { fem | currentUser = Nothing }
```

**5. Debug Data Transformations**
Test pure functions with actual model data:
```elm
> bem.users |> Dict.values |> List.filter (\u -> u.email == "test@test.com")
> Logger.toList bem.logState |> List.length
```

### Important: Live Values Warning

`fem` and `bem` return **current** values each time called. To snapshot:
```elm
> oldModel = capture bem    -- Correct: captures current value
> oldModel = bem            -- Wrong: will always equal current bem
```

### CLI Backend Access

Inspect backend model from command line (useful for scripting):
```bash
# Print entire backend model
lamdera backend

# Evaluate specific expression
lamdera backend --eval='Dict.size model.users'

# With imports
lamdera backend --import='import Dict' --eval='Dict.keys model.users'

# Start REPL session
lamdera backend --repl
```

### Agent Workflow Tips

1. **Before implementing a feature**: Use `bem` and `fem` to understand current state structure
2. **After code changes**: Use `updateFE`/`updateBE` to verify message handling works
3. **Debugging failures**: Inspect state with `bem`/`fem` to see what went wrong
4. **Testing edge cases**: Use `setBem`/`setFem` to create specific scenarios
5. **Create helper module**: Define custom functions for common REPL operations (pass model as parameter since REPL functions aren't available in modules)