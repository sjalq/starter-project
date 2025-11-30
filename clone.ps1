#!/usr/bin/env pwsh
# Wrapper script for create-lamdera-app CLI
# Usage: .\clone.ps1 [project-name]

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Check for Node.js
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "Node.js is required. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

& node "$ScriptDir\bin\create-lamdera-app.js" $args
