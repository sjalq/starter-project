#!/bin/bash
# Compile and run the visual test viewer

echo "Compiling test viewer..."
lamdera make tests/TestViewer.elm --output=tests/viewer.js

if [ $? -eq 0 ]; then
    echo ""
    echo "Test viewer compiled successfully!"
    echo ""
    echo "Open in browser: file://$(pwd)/tests/viewer.html"
    echo ""
    echo "Or start a local server:"
    echo "  cd tests && python3 -m http.server 8080"
    echo "  Then open: http://localhost:8080/viewer.html"

    # Try to open in browser (works on most systems)
    if command -v xdg-open &> /dev/null; then
        xdg-open "tests/viewer.html" 2>/dev/null &
    elif command -v open &> /dev/null; then
        open "tests/viewer.html"
    elif command -v explorer.exe &> /dev/null; then
        # WSL
        explorer.exe "tests\\viewer.html"
    fi
else
    echo "Compilation failed!"
    exit 1
fi
