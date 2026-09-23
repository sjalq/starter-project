#!/usr/bin/env bash
# Build the project: regenerate the Elm function cheat sheet, run tests, compile.
# Keep in step with compile.js and compile.ps1.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

echo "Generating Elm function documentation..."
node LLMBuildTools/gen-elm-functions.cjs --exclude src/Evergreen

echo "Running tests..."
elm-test-rs --compiler lamdera

echo "Compiling Lamdera..."
lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm --output=/dev/null

echo "Build completed successfully!"
