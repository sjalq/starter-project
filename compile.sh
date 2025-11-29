#!/bin/bash

echo "Generating Elm function documentation..."
node LLMBuildTools/gen-elm-functions.cjs --exclude src/Fusion --exclude src/Evergreen --exclude src/generated

echo "Running tests..."
elm-test-rs --compiler lamdera

echo "Compiling Lamdera..."
lamdera make src/Backend.elm src/Frontend.elm
