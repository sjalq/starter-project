#!/usr/bin/env pwsh
# Build the project: regenerate the Elm function cheat sheet, run tests, compile.
# Keep in step with compile.sh and compile.js.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Invoke-Step([string]$Description, [scriptblock]$Command) {
    Write-Host $Description
    & $Command
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed: $Description" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Invoke-Step "Generating Elm function documentation..." { node LLMBuildTools/gen-elm-functions.cjs --exclude src/Evergreen }
Invoke-Step "Running tests..." { elm-test-rs --compiler lamdera }
Invoke-Step "Compiling Lamdera..." { lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm --output=/dev/null }

Write-Host "Build completed successfully!"
