#!/usr/bin/env pwsh
# Recover from lamdera/Elm package cache corruption, then restart the dev server.

Set-Location $PSScriptRoot

Write-Host "Resetting: deletes %APPDATA%\elm (global Elm/Lamdera package cache, re-downloaded on next build) and ./elm-stuff, runs lamdera reset, then starts lamdera live with LDEBUG=1."
Remove-Item -Recurse -Force "$env:APPDATA\elm" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\elm-stuff" -ErrorAction SilentlyContinue
echo "y" | lamdera reset
$env:LDEBUG = "1"
echo "y" | lamdera live
