#!/usr/bin/env pwsh

Write-Host "Generating Elm function documentation..."
node LLMBuildTools/gen-elm-functions.cjs --exclude src/Fusion --exclude src/Evergreen --exclude src/generated

Write-Host "Compiling Lamdera..."
lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm