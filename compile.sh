#!/bin/bash

# Run elm-pages
npx elm-pages run fusion/scripts/src/Main.elm elm.json generated Types.BackendModel

# Compile lamdera files
lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm
