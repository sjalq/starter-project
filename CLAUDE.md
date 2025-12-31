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