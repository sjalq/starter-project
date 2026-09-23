#!/usr/bin/env bash
# Build the visual program-test viewer and serve it on http://localhost:8888
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "Compiling test viewer..."
lamdera make tests/TestViewer.elm --output=tests/viewer.js

echo ""
echo "Test viewer compiled. Open: http://localhost:8888/viewer.html"
echo "Press Ctrl+C to stop the server."
echo ""
cd tests
exec python3 -m http.server 8888 --bind 127.0.0.1
