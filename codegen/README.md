# Elm Codegen for RPC Endpoints

## ✅ Status: Working with Lamdera!

elm-codegen now works with Lamdera using a simple wrapper script.

## How It Works

The `scripts/elm` wrapper makes elm-codegen use Lamdera as the compiler:

```bash
#!/bin/bash
exec lamdera "$@"
```

When `compile.sh` runs, it adds `scripts/` to PATH so elm-codegen finds this wrapper instead of the standard elm compiler.

## Generated Files

- `generated/HelloWorld.elm` - Example output (will be replaced with RPC code)
- More files will be generated as we build out the RPC generator

## Usage

```bash
./compile.sh
# Runs elm-codegen automatically with Lamdera
```

Or manually:

```bash
PATH="$(pwd)/scripts:$PATH" elm-codegen run
```

## Next Steps

1. **Build the RPC scanner** - Parse Elm files for `@rpc` annotations
2. **Extract type signatures** - Get param types and return types
3. **Generate wrappers** - Create JSON encoding/decoding boilerplate
4. **Update routing** - Auto-register endpoints in RPC.elm

## Function Signature Format

```elm
{-| @rpc endpointName -}
functionName : SessionId -> BackendModel -> Param1 -> Param2 -> ... -> ( Result String OutputType, BackendModel, Cmd BackendMsg )
```

## Files

- `Generate.elm` - Main generator (currently outputs HelloWorld example)
- `GenerateRPC.elm` - Reference implementation for RPC generation
- `elm.json` - Codegen dependencies
- `elm.codegen.json` - Configuration

## Property-Based Tests

The Node.js tests in `rpc-codegen/test.js` validate the parsing logic.
Once we port this to pure Elm, we'll write Elm tests using `elm-explorations/test`.
