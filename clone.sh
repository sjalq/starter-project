#!/bin/bash

TARGET=$1

if [ -z "$TARGET" ]; then
    echo "Usage: $0 <target_directory>"
    echo "Example: $0 my-awesome-project"
    exit 1
fi

echo "🚀 Creating new Lamdera project at $TARGET..."

# Create target directory
mkdir -p "$TARGET"

# Copy all files excluding git history and this script
echo "📋 Copying project files..."
rsync -a --exclude=".git" --exclude="clone.sh" ./ "$TARGET/"

# Initialize a new git repository
cd "$TARGET"
echo "🔧 Initializing git repository..."
git init

# Initialize and update submodules
echo "📦 Setting up submodules..."
git submodule add https://github.com/sjalq/auth.git auth
git submodule add https://github.com/sjalq/lamdera-websocket.git lamdera-websocket-package

# Update submodules to latest
git submodule update --init --recursive

echo "💾 Creating initial commit..."
git add .
git commit -m "Initial commit from starter project with submodules"

echo ""
echo "✅ Done! New project created at $TARGET"
echo ""
echo "Next steps:"
echo "1. cd $TARGET"
echo "2. Update src/Env.elm with your auth credentials"
echo "3. Run ./compile.sh to build the project"
echo "4. Run 'lamdera live' to start development" 