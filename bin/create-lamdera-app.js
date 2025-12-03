#!/usr/bin/env node

/**
 * create-lamdera-app
 *
 * CLI tool to scaffold new Lamdera projects with auth, WebSockets, and more.
 * Works on Windows, macOS, and Linux.
 *
 * Usage:
 *   npx create-lamdera-app [project-name]
 *   ./clone.sh [project-name]
 *   ./clone.ps1 [project-name]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

// ============================================================================
// Configuration
// ============================================================================

const REPO_URL = 'https://github.com/sjalq/starter-project.git';
const IS_WINDOWS = process.platform === 'win32';

// Files/folders that should NEVER be copied to new projects
const EXCLUDE_PATTERNS = [
  '.git',
  '.gitmodules',
  'bin',              // CLI scripts
  'clone.sh',         // Unix wrapper
  'clone.ps1',        // Windows wrapper
  'node_modules',
  'package-lock.json',
  '.npmignore',
  'elm-stuff',        // Elm build cache - will be regenerated
  'auth',             // Will be added as submodule
  'lamdera-websocket-package', // Will be added as submodule
];

// Submodules to set up in new project
const SUBMODULES = [
  { name: 'auth', url: 'https://github.com/sjalq/auth.git' },
  { name: 'lamdera-websocket-package', url: 'https://github.com/sjalq/lamdera-websocket.git' },
];

// ============================================================================
// Terminal Colors (ANSI - works on modern Windows 10+, macOS, Linux)
// ============================================================================

const COLORS = {
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
  cyan: '\x1b[0;36m',
  magenta: '\x1b[0;35m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

// ============================================================================
// Utility Functions
// ============================================================================

const println = (msg = '') => process.stdout.write(msg + '\n');
const print = (msg = '') => process.stdout.write(msg);

/**
 * Prompt user for input
 */
const prompt = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await new Promise((resolve) => rl.question(question, resolve));
  rl.close();
  return answer;
};

/**
 * Clean project name for use as folder name
 */
const cleanProjectName = (name) => {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
};

/**
 * Expand ~ to home directory (cross-platform)
 */
const expandHome = (p) => {
  if (p.startsWith('~')) {
    const home = os.homedir();
    return path.join(home, p.slice(1));
  }
  return p;
};

/**
 * Resolve target path from user input
 */
const resolveTargetPath = (inputPath, defaultPath, cwd) => {
  if (!inputPath || inputPath.trim() === '') {
    return path.resolve(defaultPath);
  }
  const expanded = expandHome(inputPath.trim());
  if (path.isAbsolute(expanded)) {
    return path.normalize(expanded);
  }
  return path.resolve(cwd, expanded);
};

/**
 * Check if a command exists (cross-platform)
 */
const commandExists = (cmd) => {
  try {
    const checkCmd = IS_WINDOWS ? `where ${cmd}` : `command -v ${cmd}`;
    execSync(checkCmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

/**
 * Run a shell command
 */
const run = (cmd, options = {}) => {
  const { silent = false, cwd = process.cwd() } = options;
  execSync(cmd, {
    stdio: silent ? 'ignore' : 'inherit',
    cwd,
    // Use shell for better cross-platform compatibility
    shell: true,
  });
};

/**
 * Copy directory recursively (pure Node.js - no shell dependencies)
 */
const copyRecursive = (src, dest, excludeSet) => {
  const stat = fs.statSync(src);
  const basename = path.basename(src);

  // Skip excluded items
  if (excludeSet.has(basename)) {
    return;
  }

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      if (!excludeSet.has(item)) {
        copyRecursive(
          path.join(src, item),
          path.join(dest, item),
          excludeSet
        );
      }
    }
  } else {
    // Ensure parent directory exists
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
};

/**
 * Remove directory recursively (cross-platform)
 */
const removeDir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

// ============================================================================
// UI Components
// ============================================================================

const printBanner = () => {
  println('');
  println(`${COLORS.cyan}${COLORS.bold}+----------------------------------------------------------------+${COLORS.reset}`);
  println(`${COLORS.cyan}${COLORS.bold}|${COLORS.reset}  ${COLORS.magenta}${COLORS.bold}create-lamdera-app${COLORS.reset}                                        ${COLORS.cyan}${COLORS.bold}|${COLORS.reset}`);
  println(`${COLORS.cyan}${COLORS.bold}|${COLORS.reset}  ${COLORS.dim}The Ultimate Lamdera Starter - Auth, WebSockets & More${COLORS.reset}      ${COLORS.cyan}${COLORS.bold}|${COLORS.reset}`);
  println(`${COLORS.cyan}${COLORS.bold}+----------------------------------------------------------------+${COLORS.reset}`);
  println('');
};

const printFolderHelp = (cwd) => {
  const home = os.homedir();
  println(`${COLORS.yellow}${COLORS.bold}Path Options:${COLORS.reset}`);
  println(`${COLORS.dim}+----------------------------------------------------------------+${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.cyan}Relative:${COLORS.reset}  ${COLORS.green}my-app${COLORS.reset}           -> ${COLORS.dim}${path.join(cwd, 'my-app')}${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.cyan}Home:${COLORS.reset}      ${COLORS.green}~/projects/app${COLORS.reset}   -> ${COLORS.dim}${path.join(home, 'projects/app')}${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.cyan}Absolute:${COLORS.reset}  ${COLORS.green}${IS_WINDOWS ? 'C:\\projects' : '/opt/projects'}${COLORS.reset}    -> ${COLORS.dim}${IS_WINDOWS ? 'C:\\projects' : '/opt/projects'}${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.cyan}Parent:${COLORS.reset}    ${COLORS.green}../sibling${COLORS.reset}       -> ${COLORS.dim}${path.resolve(cwd, '../sibling')}${COLORS.reset}`);
  println(`${COLORS.dim}+----------------------------------------------------------------+${COLORS.reset}`);
  println('');
};

let activeSpinner = null;

const spinner = (text) => {
  const frames = ['|', '/', '-', '\\'];
  let i = 0;
  const id = setInterval(() => {
    print(`\r${COLORS.cyan}${frames[i++ % frames.length]}${COLORS.reset} ${text}`);
  }, 100);
  const stop = () => {
    clearInterval(id);
    print('\r' + ' '.repeat(text.length + 4) + '\r');
    activeSpinner = null;
  };
  activeSpinner = stop;
  return stop;
};

// Clean up spinner on Ctrl+C
process.on('SIGINT', () => {
  if (activeSpinner) activeSpinner();
  println(`\n${COLORS.yellow}Cancelled.${COLORS.reset}`);
  process.exit(130);
});

// ============================================================================
// Package.json handling
// ============================================================================

/**
 * Modify package.json for the new project
 */
const updatePackageJson = (targetDir, projectName, cleanName) => {
  const pkgPath = path.join(targetDir, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    // Update for new project
    pkg.name = cleanName;
    pkg.version = '0.1.0';
    pkg.description = `${projectName} - A Lamdera application`;

    // Remove CLI-specific fields
    delete pkg.bin;
    delete pkg.files;
    delete pkg.repository;
    delete pkg.homepage;
    delete pkg.bugs;
    delete pkg.keywords;

    // Keep devDependencies (elm-review, etc.) but remove publishing stuff

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  } catch (err) {
    // Non-fatal - project will still work
    println(`${COLORS.yellow}!${COLORS.reset} Could not update package.json: ${err.message}`);
  }
};

// ============================================================================
// Main
// ============================================================================

const main = async () => {
  const cwd = process.cwd();

  printBanner();

  // -------------------------------------------------------------------------
  // Check prerequisites
  // -------------------------------------------------------------------------

  if (!commandExists('git')) {
    println(`${COLORS.red}X${COLORS.reset} Git is required but not installed.`);
    println(`${COLORS.yellow}  Install: https://git-scm.com/downloads${COLORS.reset}`);
    process.exit(1);
  }

  if (!commandExists('lamdera')) {
    println(`${COLORS.yellow}!${COLORS.reset} Lamdera CLI not found - you'll need it to run your project`);
    println(`${COLORS.dim}  Install: https://lamdera.com/start${COLORS.reset}`);
    println('');
  }

  // -------------------------------------------------------------------------
  // Step 1: Project Name
  // -------------------------------------------------------------------------

  println(`${COLORS.yellow}${COLORS.bold}Step 1/2: Project Name${COLORS.reset}`);
  println(`${COLORS.dim}This will be used for the folder name${COLORS.reset}`);
  println('');

  const argName = process.argv[2];
  let projectName = argName;

  if (!projectName) {
    projectName = await prompt(`${COLORS.cyan}?${COLORS.reset} Project name: `);
    if (!projectName || !projectName.trim()) {
      println(`${COLORS.red}X${COLORS.reset} Project name cannot be empty`);
      process.exit(1);
    }
    projectName = projectName.trim();
  } else {
    println(`${COLORS.cyan}?${COLORS.reset} Project name: ${COLORS.green}${projectName}${COLORS.reset} ${COLORS.dim}(from argument)${COLORS.reset}`);
  }

  const cleanName = cleanProjectName(projectName);
  if (cleanName !== projectName) {
    println(`${COLORS.dim}  Normalized to: ${cleanName}${COLORS.reset}`);
  }

  if (!cleanName) {
    println(`${COLORS.red}X${COLORS.reset} Invalid project name`);
    process.exit(1);
  }

  // Windows has a 260 character path limit
  if (IS_WINDOWS && cleanName.length > 50) {
    println(`${COLORS.yellow}!${COLORS.reset} Long project name may cause path issues on Windows`);
  }

  // -------------------------------------------------------------------------
  // Step 2: Location
  // -------------------------------------------------------------------------

  println('');
  println(`${COLORS.yellow}${COLORS.bold}Step 2/2: Project Location${COLORS.reset}`);
  println('');
  printFolderHelp(cwd);

  const defaultPath = path.join(cwd, '..', cleanName);
  println(`${COLORS.dim}Default: ${defaultPath}${COLORS.reset}`);
  println('');

  const customPath = await prompt(`${COLORS.cyan}?${COLORS.reset} Path ${COLORS.dim}(Enter for default)${COLORS.reset}: `);
  const target = resolveTargetPath(customPath, defaultPath, cwd);

  // -------------------------------------------------------------------------
  // Safety checks
  // -------------------------------------------------------------------------

  // Don't allow creating inside the starter-project repo itself
  const scriptDir = path.resolve(__dirname, '..');
  const relToScript = path.relative(scriptDir, target);
  const isInsideScript = !relToScript.startsWith('..') && !path.isAbsolute(relToScript);

  if (isInsideScript && fs.existsSync(path.join(scriptDir, 'elm.json'))) {
    println(`${COLORS.red}X${COLORS.reset} Cannot create project inside the starter-project repo`);
    println(`${COLORS.yellow}  Try: ${path.resolve(scriptDir, '..', cleanName)}${COLORS.reset}`);
    process.exit(1);
  }

  // Check if directory exists and has content
  if (fs.existsSync(target)) {
    const files = fs.readdirSync(target);
    if (files.length > 0) {
      println('');
      println(`${COLORS.yellow}!${COLORS.reset} Directory exists and is not empty: ${target}`);
      const confirm = await prompt(`${COLORS.cyan}?${COLORS.reset} Continue anyway? ${COLORS.dim}(y/N)${COLORS.reset}: `);
      if (!/^y(es)?$/i.test(confirm.trim())) {
        println(`${COLORS.yellow}Cancelled.${COLORS.reset}`);
        process.exit(0);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------

  println('');
  println(`${COLORS.cyan}${COLORS.bold}--------------------------------------------------${COLORS.reset}`);
  println(`${COLORS.green}${COLORS.bold}Creating: ${projectName}${COLORS.reset}`);
  println(`${COLORS.green}Path:     ${target}${COLORS.reset}`);
  println(`${COLORS.cyan}${COLORS.bold}--------------------------------------------------${COLORS.reset}`);
  println('');

  // -------------------------------------------------------------------------
  // Create target directory
  // -------------------------------------------------------------------------

  fs.mkdirSync(target, { recursive: true });

  // -------------------------------------------------------------------------
  // Determine source: local repo or clone from GitHub
  // -------------------------------------------------------------------------

  let sourceDir;
  let tempDir = null;

  // Check if we're running from a local clone (has src/ and elm.json)
  const localRepoRoot = path.resolve(__dirname, '..');
  const isLocalRepo = fs.existsSync(path.join(localRepoRoot, 'src')) &&
                      fs.existsSync(path.join(localRepoRoot, 'elm.json'));

  if (isLocalRepo) {
    println(`${COLORS.blue}>${COLORS.reset} Using local starter-project...`);
    sourceDir = localRepoRoot;
  } else {
    // Clone from GitHub to temp directory
    println(`${COLORS.blue}>${COLORS.reset} Downloading from GitHub...`);
    tempDir = path.join(os.tmpdir(), `create-lamdera-app-${Date.now()}`);

    const stopSpinner = spinner('Cloning repository...');
    try {
      run(`git clone --depth 1 "${REPO_URL}" "${tempDir}"`, { silent: true });
      stopSpinner();
      println(`${COLORS.green}+${COLORS.reset} Downloaded starter template`);
    } catch (err) {
      stopSpinner();
      println(`${COLORS.red}X${COLORS.reset} Failed to clone repository`);
      println(`${COLORS.dim}  ${err.message || err}${COLORS.reset}`);
      process.exit(1);
    }
    sourceDir = tempDir;
  }

  // -------------------------------------------------------------------------
  // Copy project files (excluding CLI-related stuff)
  // -------------------------------------------------------------------------

  println(`${COLORS.blue}>${COLORS.reset} Copying project files...`);

  const excludeSet = new Set(EXCLUDE_PATTERNS);

  // Copy files using pure Node.js (works on all platforms)
  for (const item of fs.readdirSync(sourceDir)) {
    if (!excludeSet.has(item)) {
      copyRecursive(
        path.join(sourceDir, item),
        path.join(target, item),
        excludeSet
      );
    }
  }
  println(`${COLORS.green}+${COLORS.reset} Project files copied`);

  // -------------------------------------------------------------------------
  // Update package.json for new project
  // -------------------------------------------------------------------------

  updatePackageJson(target, projectName, cleanName);

  // -------------------------------------------------------------------------
  // Initialize git repository
  // -------------------------------------------------------------------------

  println(`${COLORS.blue}>${COLORS.reset} Initializing git repository...`);
  run('git init', { silent: true, cwd: target });
  println(`${COLORS.green}+${COLORS.reset} Git initialized`);

  // -------------------------------------------------------------------------
  // Set up submodules
  // -------------------------------------------------------------------------

  println(`${COLORS.blue}>${COLORS.reset} Setting up dependencies...`);

  for (const sub of SUBMODULES) {
    const subPath = path.join(target, sub.name);

    // Remove if copied from source (we want fresh submodule)
    if (fs.existsSync(subPath)) {
      removeDir(subPath);
    }

    try {
      run(`git submodule add "${sub.url}" "${sub.name}"`, { silent: true, cwd: target });
      println(`${COLORS.green}+${COLORS.reset} Added ${sub.name}`);
    } catch (err) {
      println(`${COLORS.yellow}!${COLORS.reset} ${sub.name}: ${err.message || 'setup failed'}`);
    }
  }

  // Initialize submodules
  try {
    run('git submodule update --init --recursive', { silent: true, cwd: target });
  } catch (err) {
    println(`${COLORS.yellow}!${COLORS.reset} Submodule init: ${err.message || 'failed'}`);
  }

  // -------------------------------------------------------------------------
  // Create initial commit
  // -------------------------------------------------------------------------

  println(`${COLORS.blue}>${COLORS.reset} Creating initial commit...`);
  try {
    run('git add -A', { silent: true, cwd: target });
    run('git commit -m "Initial commit from create-lamdera-app"', { silent: true, cwd: target });
    println(`${COLORS.green}+${COLORS.reset} Initial commit created`);
  } catch (err) {
    println(`${COLORS.yellow}!${COLORS.reset} Commit skipped: ${err.message || 'check git config'}`);
  }

  // -------------------------------------------------------------------------
  // Cleanup temp directory
  // -------------------------------------------------------------------------

  if (tempDir) {
    removeDir(tempDir);
  }

  // -------------------------------------------------------------------------
  // Success!
  // -------------------------------------------------------------------------

  println('');
  println(`${COLORS.green}${COLORS.bold}+----------------------------------------------------------------+${COLORS.reset}`);
  println(`${COLORS.green}${COLORS.bold}|${COLORS.reset}  ${COLORS.green}${COLORS.bold}SUCCESS!${COLORS.reset} Project ${COLORS.cyan}${projectName}${COLORS.reset} created!`);
  println(`${COLORS.green}${COLORS.bold}+----------------------------------------------------------------+${COLORS.reset}`);
  println('');
  println(`${COLORS.yellow}${COLORS.bold}Next steps:${COLORS.reset}`);
  println('');
  println(`   ${COLORS.cyan}1.${COLORS.reset} cd "${target}"`);
  println(`   ${COLORS.cyan}2.${COLORS.reset} ${IS_WINDOWS ? '.\\compile.ps1' : './compile.sh'}`);
  println(`   ${COLORS.cyan}3.${COLORS.reset} lamdera live`);
  println('');
  println(`${COLORS.dim}+----------------------------------------------------------------+${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.yellow}Test login:${COLORS.reset} ${COLORS.bold}sys@admin.com${COLORS.reset} / ${COLORS.bold}admin${COLORS.reset}`);
  println(`${COLORS.dim}|${COLORS.reset} ${COLORS.yellow}AI docs:${COLORS.reset}    Open ${COLORS.cyan}CLAUDE.md${COLORS.reset} for development guide`);
  println(`${COLORS.dim}+----------------------------------------------------------------+${COLORS.reset}`);
  println('');
  println(`${COLORS.magenta}Happy coding!${COLORS.reset}`);
  println('');
};

// ============================================================================
// Entry Point
// ============================================================================

main().catch((err) => {
  println(`${COLORS.red}X${COLORS.reset} Error: ${err?.message || err}`);
  if (process.env.DEBUG) {
    console.error(err);
  }
  process.exit(1);
});
