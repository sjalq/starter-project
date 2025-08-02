#!/bin/bash

# Colors for better UX
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}🚀 Lamdera Starter Project Setup${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get project name
if [ -z "$1" ]; then
    echo -e "${YELLOW}What would you like to name your project?${NC}"
    read -p "Project name: " PROJECT_NAME
    
    if [ -z "$PROJECT_NAME" ]; then
        echo -e "${RED}❌ Project name cannot be empty${NC}"
        exit 1
    fi
else
    PROJECT_NAME="$1"
fi

# Clean project name (remove spaces, special chars)
CLEAN_NAME=$(echo "$PROJECT_NAME" | sed 's/[^a-zA-Z0-9-]/-/g' | tr '[:upper:]' '[:lower:]')

# Suggest default path (parent directory)
DEFAULT_PATH="../$CLEAN_NAME"

echo ""
echo -e "${YELLOW}Where would you like to create your project?${NC}"
echo -e "${BLUE}Default: ${DEFAULT_PATH}${NC}"
read -p "Project path (press Enter for default): " CUSTOM_PATH

# Use default if no custom path provided
if [ -z "$CUSTOM_PATH" ]; then
    TARGET="$DEFAULT_PATH"
else
    TARGET="$CUSTOM_PATH"
fi

# Check if directory already exists
if [ -d "$TARGET" ]; then
    echo -e "${RED}❌ Directory '$TARGET' already exists!${NC}"
    echo ""
    read -p "Continue anyway? This will overwrite existing files. (y/N): " OVERWRITE
    if [[ ! $OVERWRITE =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Cancelled.${NC}"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}${BOLD}📋 Creating '$PROJECT_NAME' at: $TARGET${NC}"
echo ""

# Create target directory
mkdir -p "$TARGET"

# Copy all files excluding git history and this script
echo -e "${BLUE}📋 Copying project files...${NC}"
rsync -a --exclude=".git" --exclude="clone.sh" ./ "$TARGET/"

# Initialize a new git repository
cd "$TARGET"
echo -e "${BLUE}🔧 Initializing git repository...${NC}"
git init > /dev/null 2>&1

# Initialize and update submodules
echo -e "${BLUE}📦 Setting up submodules...${NC}"
git submodule add https://github.com/sjalq/auth.git auth > /dev/null 2>&1
git submodule add https://github.com/sjalq/lamdera-websocket.git lamdera-websocket-package > /dev/null 2>&1

# Update submodules to latest
git submodule update --init --recursive > /dev/null 2>&1

echo -e "${BLUE}💾 Creating initial commit...${NC}"
git add . > /dev/null 2>&1
git commit -m "Initial commit from starter project with submodules" > /dev/null 2>&1

echo ""
echo -e "${GREEN}${BOLD}✅ Success! Project '$PROJECT_NAME' created!${NC}"
echo ""
echo -e "${YELLOW}${BOLD}🚀 Next steps:${NC}"
echo -e "${BLUE}1.${NC} cd $TARGET"
echo -e "${BLUE}2.${NC} Update src/Env.elm with your auth credentials (optional)"
echo -e "${BLUE}3.${NC} Run ./compile.sh to build the project"
echo -e "${BLUE}4.${NC} Run 'lamdera live' to start development"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}" 