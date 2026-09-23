#!/usr/bin/env bash
# Recover from lamdera/Elm package cache corruption, then restart the dev server.
set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

echo "Resetting: deletes ~/.elm (global Elm/Lamdera package cache, re-downloaded on next build) and ./elm-stuff, runs 'lamdera reset', then starts 'lamdera live' with LDEBUG=1."
rm -rf ~/.elm
rm -rf ./elm-stuff
yes | lamdera reset || true
yes | LDEBUG=1 lamdera live
