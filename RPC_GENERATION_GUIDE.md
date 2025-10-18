# Automatic RPC Endpoint Generation

## Overview

This Lamdera project features **automatic RPC endpoint generation** using `@rpc` annotations. Just mark your functions with `@rpc` and they're instantly available as HTTP endpoints!

## Quick Start

### 1. Write Your Endpoint Function

```elm
module Endpoints.MyFeature exposing (..)

import Lamdera exposing (SessionId)
import Types exposing (..)

{-| @rpc
-}
myEndpoint : SessionId -> BackendModel -> MyRequest -> ( Result String MyResponse, BackendModel, Cmd BackendMsg )
myEndpoint sessionId model request =
    ( Ok { data = "Hello!" }
    , model
    , Cmd.none
    )
```

### 2. Run the Compiler

```bash
./compile.sh
```

### 3. Use Your Endpoint

Your endpoint is now available at:
```
POST /_r/Endpoints_MyFeature_myEndpoint
```

## How It Works

### The Magic Pipeline

1. **Scan** - `codegen/scan-rpc-endpoints.js` finds all `@rpc` annotations
2. **Parse** - Extracts function signatures using `SignatureParser.elm`
3. **Generate** - `codegen/Generate.elm` creates routing code via elm-codegen
4. **Compile** - Generated code is integrated into `src/RPC.elm`

### Endpoint Naming

Module path + function name with underscores:

| Source | Endpoint Name |
|--------|--------------|
| `Endpoints.Example.calculateSum` | `Endpoints_Example_calculateSum` |
| `Bonkers.Cool.findMyStuff` | `Bonkers_Cool_findMyStuff` |
| `User.Profile.update` | `User_Profile_update` |

### Function Signature Requirements

Your RPC functions **MUST** follow this pattern:

```elm
functionName : SessionId -> BackendModel -> Param1 -> Param2 -> ... -> ( Result String OutputType, BackendModel, Cmd BackendMsg )
```

**Required:**
- First parameter: `SessionId`
- Second parameter: `BackendModel`
- Return type: `( Result String YourType, BackendModel, Cmd BackendMsg )`

**Flexible:**
- Any number of additional parameters (they become your API params)
- Any custom types for input/output

## Examples

### Simple Endpoint (One Parameter)

```elm
{-| @rpc
-}
greetUser : SessionId -> BackendModel -> String -> ( Result String String, BackendModel, Cmd BackendMsg )
greetUser sessionId model userName =
    ( Ok ("Hello, " ++ userName ++ "!")
    , model
    , Cmd.none
    )
```

→ Available at `/_r/Endpoints_Demo_greetUser`

### Multiple Parameters

```elm
{-| @rpc
-}
multiply : SessionId -> BackendModel -> Int -> Int -> ( Result String Int, BackendModel, Cmd BackendMsg )
multiply sessionId model a b =
    ( Ok (a * b)
    , model
    , Cmd.none
    )
```

→ Available at `/_r/Endpoints_Demo_multiply`

### Complex Types

```elm
type alias CalculateRequest =
    { numbers : List Int
    , operation : Operation
    }

type alias CalculateResponse =
    { result : Float
    , metadata : ResultMetadata
    }

{-| @rpc
-}
calculate : SessionId -> BackendModel -> CalculateRequest -> ( Result String CalculateResponse, BackendModel, Cmd BackendMsg )
calculate sessionId model request =
    -- Your logic here
    ( Ok response, model, Cmd.none )
```

→ Available at `/_r/Endpoints_Math_calculate`

## Testing

### Run Scanner Tests

```bash
node codegen/scan-rpc-endpoints.test.js
```

Tests verify:
- ✅ Finding `@rpc` annotations
- ✅ Parsing type signatures
- ✅ Handling multiple parameters
- ✅ Filtering SessionId/BackendModel
- ✅ Nested module paths
- ✅ Multiple endpoints per file

### Run Full Test Suite

```bash
./compile.sh
```

This runs:
1. RPC scanner tests (JavaScript)
2. SignatureParser tests (Elm property-based)
3. Full Lamdera compilation

## Architecture

```
src/Endpoints/*.elm          ← Your endpoints with @rpc annotations
        ↓
codegen/scan-rpc-endpoints.js ← Scans for annotations
        ↓
codegen/endpoints.json        ← Discovered endpoints
        ↓
codegen/Generate.elm          ← elm-codegen generator
        ↓
generated/GeneratedRPC.elm    ← Generated routing code
        ↓
src/RPC.elm                   ← Integrates generated endpoints
```

## Best Practices

### ✅ DO

- Use descriptive module names (`Endpoints.User`, `Endpoints.Payment`)
- Keep endpoints focused (one responsibility)
- Document your endpoints with clear doc comments
- Use custom types for complex parameters
- Return meaningful error messages in `Result String`

### ❌ DON'T

- Manually edit `generated/` files (they'll be overwritten!)
- Skip the `@rpc` annotation (it won't be discovered)
- Change the function signature format (parser won't recognize it)
- Nest endpoints deeper than `/_r/{endpointName}`

## Troubleshooting

### Endpoint Not Found?

1. Check you have `{-| @rpc -}` (on its own line!)
2. Verify function signature matches required pattern
3. Run `./compile.sh` to regenerate
4. Check `codegen/endpoints.json` to see what was discovered

### Compilation Errors?

1. Ensure input/output types are defined
2. Check that all imported modules exist
3. Verify `SessionId` and `BackendModel` are imported from `Types`

### Generated Code Looks Wrong?

**DON'T edit `generated/GeneratedRPC.elm`!** Instead:
1. Fix your source endpoint function
2. Or update the generator in `codegen/Generate.elm`
3. Run `./compile.sh` to regenerate

## Advanced: How The Parser Works

The `SignatureParser` (in `src/SignatureParser.elm`) parses signatures like:

```
myFunc : SessionId -> BackendModel -> Param1 -> Param2 -> ( Result String Output, BackendModel, Cmd BackendMsg )
```

It extracts:
- Function name: `myFunc`
- Parameters: `["Param1", "Param2"]` (SessionId/BackendModel filtered out)
- Output type: `Output` (from `Result String Output`)

This is **fully property-tested** with 16 tests covering edge cases!

## Files You Care About

| File | Purpose | Edit? |
|------|---------|-------|
| `src/Endpoints/**/*.elm` | Your RPC functions | ✅ YES |
| `codegen/scan-rpc-endpoints.js` | Finds @rpc annotations | Only if extending |
| `codegen/Generate.elm` | elm-codegen generator | Only if extending |
| `generated/GeneratedRPC.elm` | Generated routing | ❌ NEVER |
| `src/RPC.elm` | Integrates endpoints | Only for new features |

## Contributing New Endpoints

1. Create file in `src/Endpoints/YourFeature.elm`
2. Add `{-| @rpc -}` above your function
3. Follow the required signature pattern
4. Run `./compile.sh`
5. Profit! 🎉

Your endpoint is now live at `/_r/Endpoints_YourFeature_yourFunction`!
