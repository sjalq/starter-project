#!/usr/bin/env pwsh

# Colors for better UX
$RED = "`e[0;31m"
$GREEN = "`e[0;32m"
$YELLOW = "`e[1;33m"
$BLUE = "`e[0;34m"
$BOLD = "`e[1m"
$NC = "`e[0m" # No Color

Write-Host "${BLUE}${BOLD}🚀 Lamdera Starter Project Setup${NC}"
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""

# Get project name
if (-not $args[0]) {
    Write-Host "${YELLOW}What would you like to name your project?${NC}"
    $PROJECT_NAME = Read-Host "Project name"
    
    if ([string]::IsNullOrWhiteSpace($PROJECT_NAME)) {
        Write-Host "${RED}❌ Project name cannot be empty${NC}"
        exit 1
    }
} else {
    $PROJECT_NAME = $args[0]
}

# Clean project name (remove spaces, special chars)
$CLEAN_NAME = $PROJECT_NAME -replace '[^a-zA-Z0-9-]', '-'
$CLEAN_NAME = $CLEAN_NAME.ToLower()

# Suggest default path relative to home directory
$DEFAULT_PATH = $CLEAN_NAME

Write-Host ""
Write-Host "${YELLOW}Where would you like to create your project? ${BLUE}(relative to your home directory)${NC}"
Write-Host "${BLUE}Default: ~/${DEFAULT_PATH}${NC}"
$CUSTOM_PATH = Read-Host "Project path (press Enter for default)"

# Use default if no custom path provided
if ([string]::IsNullOrWhiteSpace($CUSTOM_PATH)) {
    $RELATIVE_PATH = $DEFAULT_PATH
} else {
    $RELATIVE_PATH = $CUSTOM_PATH
}

# Convert to absolute path from home directory
$TARGET = Join-Path $HOME $RELATIVE_PATH

# Check if directory already exists
if (Test-Path $TARGET) {
    Write-Host "${RED}❌ Directory '$TARGET' already exists!${NC}"
    Write-Host ""
    $OVERWRITE = Read-Host "Continue anyway? This will overwrite existing files. (y/N)"
    if ($OVERWRITE -notmatch '^[Yy]$') {
        Write-Host "${YELLOW}Cancelled.${NC}"
        exit 1
    }
}

Write-Host ""
Write-Host "${GREEN}${BOLD}📋 Creating '$PROJECT_NAME' at: $TARGET${NC}"
Write-Host ""

# Create target directory
New-Item -ItemType Directory -Force -Path $TARGET | Out-Null

# Copy all files excluding git history and this script
Write-Host "${BLUE}📋 Copying project files...${NC}"
Get-ChildItem -Path . -Recurse | Where-Object {
    $_.FullName -notmatch '\.git' -and 
    $_.Name -ne 'clone.ps1' -and 
    $_.Name -ne 'clone.sh'
} | ForEach-Object {
    $dest = $_.FullName.Replace((Get-Location).Path, $TARGET)
    $destDir = Split-Path $dest
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    }
    if (-not $_.PSIsContainer) {
        Copy-Item $_.FullName $dest -Force
    }
}

# Initialize a new git repository
Set-Location $TARGET
Write-Host "${BLUE}🔧 Initializing git repository...${NC}"
git init *>$null

# Initialize and update submodules
Write-Host "${BLUE}📦 Setting up submodules...${NC}"
git submodule add https://github.com/sjalq/auth.git auth *>$null
git submodule add https://github.com/sjalq/lamdera-websocket.git lamdera-websocket-package *>$null

# Update submodules to latest
git submodule update --init --recursive *>$null

Write-Host "${BLUE}💾 Creating initial commit...${NC}"
git add . *>$null
git commit -m "Initial commit from starter project with submodules" *>$null

Write-Host ""
Write-Host "${GREEN}${BOLD}✅ Success! Project '$PROJECT_NAME' created!${NC}"
Write-Host "${GREEN}   📁 Location: ~/$RELATIVE_PATH${NC}"
Write-Host ""
Write-Host "${YELLOW}${BOLD}🚀 Next steps:${NC}"
Write-Host "${BLUE}1.${NC} .\compile.ps1"
Write-Host "${BLUE}2.${NC} lamdera live"
Write-Host "${BLUE}3.${NC} Test login with: ${BOLD}sys@admin.com${NC} / ${BOLD}admin${NC}"
Write-Host ""
Write-Host "${GREEN}Happy coding! 🎉${NC}"
Write-Host ""
Write-Host "${BLUE}Changing to your new project directory...${NC}"

# Change to the target directory and start a new PowerShell session there
Set-Location $TARGET
powershell