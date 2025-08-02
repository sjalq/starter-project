#!/usr/bin/env pwsh

Remove-Item -Recurse -Force "$env:USERPROFILE\.elm" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\elm-stuff" -ErrorAction SilentlyContinue
echo "y" | lamdera reset
echo "y" | cmd /c "set LDEBUG=1 && lamdera live"