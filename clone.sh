#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EP_ORIG_CWD="$(pwd)"
export EP_ORIG_CWD

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required to run elm-pages scripts. Please install Node.js (which includes npx)." >&2
  exit 1
fi

# Run from the script project directory; point to src/Clone.elm explicitly
cd "$SCRIPT_DIR/script" || exit 1
if ! npx --yes elm-pages@latest run src/Clone.elm -- "$@"; then
  echo "[warn] elm-pages script failed; falling back to Node implementation" >&2
  if command -v node >/dev/null 2>&1; then
    node "$SCRIPT_DIR/scripts/clone.js" "$@"
  else
    echo "Node.js is required for fallback. Please install Node.js." >&2
    exit 1
  fi
fi