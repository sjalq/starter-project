#!/bin/bash

echo "Generating Elm function documentation..."
node LLMBuildTools/gen-elm-functions.cjs --exclude src/Fusion --exclude src/Evergreen --exclude src/generated

echo "Scanning for @rpc annotations..."
node codegen/scan-rpc-endpoints.js

echo "Generating RPC endpoints with elm-codegen..."
PATH="$(pwd)/scripts:$PATH" elm-codegen run --flags-from codegen/endpoints.json

echo "Running tests..."
elm-test-rs --compiler lamdera

echo "Compiling Lamdera..."
lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm
