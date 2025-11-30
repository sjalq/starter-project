#!/bin/bash
# Wrapper script for create-lamdera-app CLI
# Usage: ./clone.sh [project-name]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Please install from https://nodejs.org/" >&2
  exit 1
fi

node "$SCRIPT_DIR/bin/create-lamdera-app.js" "$@"
