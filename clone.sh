#!/bin/bash

TARGET=$1

if [ -z "$TARGET" ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

# Create target directory
mkdir -p "$TARGET"

# Copy all files excluding git history and this script
rsync -a --exclude=".git" --exclude="clone.sh" ./ "$TARGET/"

# Initialize a new git repository
cd "$TARGET"
git init
git add .
git commit -m "Initial commit from starter project"

echo "Done! New project created at $TARGET" 