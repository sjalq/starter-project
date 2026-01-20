#!/usr/bin/env node

/**
 * create-lamdera-app
 *
 * CLI tool to scaffold new Lamdera projects with auth, WebSockets, and more.
 * Works on Windows, macOS, and Linux.
 *
 * Usage:
 *   npx create-lamdera-app my-project        # Creates ./my-project
 *   npx create-lamdera-app .                 # Init in current directory
 *   npx create-lamdera-app my-project -y     # Non-interactive (for LLMs/scripts)
 *   npx create-lamdera-app my-project --json # JSON output for automation
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
  'bin',
  'clone.sh',
  'clone.ps1',
  'node_modules',
  'package-lock.json',
  '.npmignore',
  'elm-stuff',
  'auth',
  'lamdera-websocket-package',
];

// Submodules to set up in new project
const SUBMODULES = [
  { name: 'auth', url: 'https://github.com/sjalq/auth.git' },
  { name: 'lamdera-websocket-package', url: 'https://github.com/sjalq/lamdera-websocket.git' },
];

// ============================================================================
// CLI Argument Parsing
// ============================================================================

const parseArgs = (argv) => {
  const args = argv.slice(2);
  const flags = {
    yes: false,
    json: false,
    quiet: false,
    verbose: false,
    help: false,
  };
  let projectArg = null;

  for (const arg of args) {
    if (arg === '-y' || arg === '--yes') {
      flags.yes = true;
    } else if (arg === '--json') {
      flags.json = true;
      flags.quiet = true; // JSON mode implies quiet
    } else if (arg === '-q' || arg === '--quiet') {
      flags.quiet = true;
    } else if (arg === '-v' || arg === '--verbose') {
      flags.verbose = true;
    } else if (arg === '-h' || arg === '--help') {
      flags.help = true;
    } else if (!arg.startsWith('-') && projectArg === null) {
      projectArg = arg;
    }
  }

  return { flags, projectArg };
};

// ============================================================================
// Terminal Colors
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
// Output Helpers (respect quiet/json modes)
// ============================================================================

let outputMode = { quiet: false, json: false, verbose: false };
const jsonOutput = { success: false, path: null, projectName: null, errors: [], warnings: [], nextSteps: [], details: [] };

const println = (msg = '') => {
  if (!outputMode.quiet) {
    process.stdout.write(msg + '\n');
  }
};

const print = (msg = '') => {
  if (!outputMode.quiet) {
    process.stdout.write(msg);
  }
};

const warn = (msg) => {
  if (outputMode.json) {
    jsonOutput.warnings.push(msg);
  } else if (!outputMode.quiet) {
    println(`${COLORS.yellow}!${COLORS.reset} ${msg}`);
  }
};

const error = (msg) => {
  if (outputMode.json) {
    jsonOutput.errors.push(msg);
  } else {
    println(`${COLORS.red}X${COLORS.reset} ${msg}`);
  }
};

const success = (msg) => {
  if (!outputMode.quiet) {
    println(`${COLORS.green}+${COLORS.reset} ${msg}`);
  }
};

const info = (msg) => {
  if (!outputMode.quiet) {
    println(`${COLORS.blue}>${COLORS.reset} ${msg}`);
  }
};

const verbose = (msg) => {
  if (outputMode.json) {
    jsonOutput.details.push(msg);
  } else if (outputMode.verbose) {
    println(`${COLORS.dim}  ${msg}${COLORS.reset}`);
  }
};

const outputJson = () => {
  console.log(JSON.stringify(jsonOutput, null, 2));
};

// ============================================================================
// Utility Functions
// ============================================================================

const prompt = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await new Promise((resolve) => rl.question(question, resolve));
  rl.close();
  return answer;
};

const cleanProjectName = (name) => {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
};

const commandExists = (cmd) => {
  try {
    const checkCmd = IS_WINDOWS ? `where ${cmd}` : `command -v ${cmd}`;
    execSync(checkCmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const run = (cmd, options = {}) => {
  const { silent = false, cwd = process.cwd() } = options;
  execSync(cmd, {
    stdio: silent ? 'ignore' : 'inherit',
    cwd,
    shell: true,
  });
};

const copyRecursive = (src, dest, excludeSet) => {
  const stat = fs.statSync(src);
  const basename = path.basename(src);

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
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
};

const removeDir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const isDirEmpty = (dir) => {
  if (!fs.existsSync(dir)) return true;
  const files = fs.readdirSync(dir);
  // Consider empty if only has .git or nothing
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};

const isProtectedDir = (dir) => {
  const resolved = path.resolve(dir);
  const home = os.homedir();
  // Don't allow init in root, home, or common system dirs
  return resolved === '/' ||
         resolved === home ||
         resolved === '/tmp' ||
         resolved === os.tmpdir() ||
         (IS_WINDOWS && /^[A-Z]:\\?$/i.test(resolved));
};

// ============================================================================
// UI Components
// ============================================================================

const printBanner = () => {
  println('');
  println(`${COLORS.cyan}${COLORS.bold}create-lamdera-app${COLORS.reset}`);
  println(`${COLORS.dim}Lamdera Starter with Auth, WebSockets & More${COLORS.reset}`);
  println('');
};

const printHelp = () => {
  println(`
${COLORS.cyan}${COLORS.bold}create-lamdera-app${COLORS.reset} - Scaffold production-ready Lamdera apps

${COLORS.yellow}USAGE${COLORS.reset}
  npx create-lamdera-app <project-name>   Create in ./project-name
  npx create-lamdera-app .                Init in current directory
  npx create-lamdera-app                  Interactive mode

${COLORS.yellow}OPTIONS${COLORS.reset}
  -y, --yes      Non-interactive mode (use defaults, no prompts)
  --json         Output JSON (for LLMs/scripts)
  -q, --quiet    Suppress decorative output
  -v, --verbose  Show detailed output
  -h, --help     Show this help

${COLORS.yellow}EXAMPLES${COLORS.reset}
  ${COLORS.dim}# Create new project${COLORS.reset}
  npx create-lamdera-app my-app

  ${COLORS.dim}# Init in current empty directory${COLORS.reset}
  mkdir my-app && cd my-app
  npx create-lamdera-app .

  ${COLORS.dim}# Non-interactive for scripts/LLMs${COLORS.reset}
  npx create-lamdera-app my-app -y

  ${COLORS.dim}# JSON output for automation${COLORS.reset}
  npx create-lamdera-app my-app --json
`);
};

let activeSpinner = null;

const spinner = (text) => {
  if (outputMode.quiet) {
    return () => {}; // No-op for quiet mode
  }
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

process.on('SIGINT', () => {
  if (activeSpinner) activeSpinner();
  if (outputMode.json) {
    jsonOutput.errors.push('Cancelled by user');
    outputJson();
  } else {
    println(`\n${COLORS.yellow}Cancelled.${COLORS.reset}`);
  }
  process.exit(130);
});

// ============================================================================
// Package.json handling
// ============================================================================

const updatePackageJson = (targetDir, projectName, cleanName) => {
  const pkgPath = path.join(targetDir, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    pkg.name = cleanName;
    pkg.version = '0.1.0';
    pkg.description = `${projectName} - A Lamdera application`;

    delete pkg.bin;
    delete pkg.files;
    delete pkg.repository;
    delete pkg.homepage;
    delete pkg.bugs;
    delete pkg.keywords;

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  } catch (err) {
    warn(`Could not update package.json: ${err.message}`);
  }
};

// ============================================================================
// Core Logic
// ============================================================================

const resolveProjectTarget = (projectArg, cwd, flags) => {
  // "." means init in current directory
  if (projectArg === '.') {
    const dirName = path.basename(cwd);
    const cleanName = cleanProjectName(dirName);
    if (!cleanName) {
      return { error: 'Current directory name cannot be used as project name' };
    }
    return {
      targetDir: cwd,
      projectName: dirName,
      cleanName,
      initInPlace: true,
    };
  }

  // Named project - create subdirectory
  if (projectArg) {
    const cleanName = cleanProjectName(projectArg);
    if (!cleanName) {
      return { error: `Invalid project name: ${projectArg}` };
    }
    return {
      targetDir: path.join(cwd, cleanName),
      projectName: projectArg,
      cleanName,
      initInPlace: false,
    };
  }

  // No argument - need interactive or error
  if (flags.yes) {
    return { error: 'Project name required in non-interactive mode. Usage: npx create-lamdera-app <name> -y' };
  }

  if (flags.json) {
    return { error: 'Project name required with --json. Usage: npx create-lamdera-app <name> --json' };
  }

  return { needsPrompt: true };
};

// ============================================================================
// Main
// ============================================================================

const main = async () => {
  const cwd = process.cwd();
  const { flags, projectArg } = parseArgs(process.argv);

  // Set output mode
  outputMode = { quiet: flags.quiet || flags.json, json: flags.json, verbose: flags.verbose };

  // Help
  if (flags.help) {
    printHelp();
    process.exit(0);
  }

  // Banner (only in interactive verbose mode)
  if (!flags.quiet && !flags.yes) {
    printBanner();
  }

  // -------------------------------------------------------------------------
  // Check prerequisites
  // -------------------------------------------------------------------------

  if (!commandExists('git')) {
    error('Git is required but not installed. Install: https://git-scm.com/downloads');
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  if (!commandExists('lamdera')) {
    warn('Lamdera CLI not found - install from https://lamdera.com/start');
  }

  // -------------------------------------------------------------------------
  // Resolve project name and target directory
  // -------------------------------------------------------------------------

  let resolution = resolveProjectTarget(projectArg, cwd, flags);

  // Interactive prompt if needed
  if (resolution.needsPrompt) {
    const answer = await prompt(`${COLORS.cyan}?${COLORS.reset} Project name: `);
    const projectName = answer?.trim();

    if (!projectName) {
      error('Project name cannot be empty');
      process.exit(1);
    }

    resolution = resolveProjectTarget(projectName, cwd, flags);
  }

  if (resolution.error) {
    error(resolution.error);
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  const { targetDir, projectName, cleanName, initInPlace } = resolution;

  verbose(`Target directory: ${targetDir}`);
  verbose(`Project name: ${projectName} (clean: ${cleanName})`);
  verbose(`Init in place: ${initInPlace}`);

  // -------------------------------------------------------------------------
  // Safety checks
  // -------------------------------------------------------------------------

  if (isProtectedDir(targetDir)) {
    error(`Cannot create project in ${targetDir} - protected directory`);
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  // Check if inside starter-project repo
  const scriptDir = path.resolve(__dirname, '..');
  const relToScript = path.relative(scriptDir, targetDir);
  const isInsideScript = !relToScript.startsWith('..') && !path.isAbsolute(relToScript);

  if (isInsideScript && fs.existsSync(path.join(scriptDir, 'elm.json'))) {
    error('Cannot create project inside the starter-project repo');
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  // Check if target exists and has content
  if (fs.existsSync(targetDir) && !isDirEmpty(targetDir)) {
    if (flags.yes) {
      // Non-interactive mode: error on non-empty directory (safe default)
      error(`Directory not empty: ${targetDir}. Remove contents or choose different name.`);
      if (outputMode.json) {
        outputJson();
      }
      process.exit(1);
    } else {
      // Interactive: prompt for confirmation
      warn(`Directory exists and is not empty: ${targetDir}`);
      const confirm = await prompt(`${COLORS.cyan}?${COLORS.reset} Continue anyway? ${COLORS.dim}(y/N)${COLORS.reset}: `);
      if (!/^y(es)?$/i.test(confirm.trim())) {
        println(`${COLORS.yellow}Cancelled.${COLORS.reset}`);
        process.exit(0);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Show what we're doing
  // -------------------------------------------------------------------------

  if (initInPlace) {
    info(`Initializing in current directory as "${cleanName}"...`);
  } else {
    info(`Creating ${cleanName} in ${targetDir}...`);
  }

  // -------------------------------------------------------------------------
  // Create target directory
  // -------------------------------------------------------------------------

  fs.mkdirSync(targetDir, { recursive: true });

  // -------------------------------------------------------------------------
  // Determine source: local repo or clone from GitHub
  // -------------------------------------------------------------------------

  let sourceDir;
  let tempDir = null;

  const localRepoRoot = path.resolve(__dirname, '..');
  const isLocalRepo = fs.existsSync(path.join(localRepoRoot, 'src')) &&
                      fs.existsSync(path.join(localRepoRoot, 'elm.json'));

  if (isLocalRepo) {
    info('Using local starter-project...');
    verbose(`Source: ${localRepoRoot}`);
    sourceDir = localRepoRoot;
  } else {
    info('Downloading from GitHub...');
    tempDir = path.join(os.tmpdir(), `create-lamdera-app-${Date.now()}`);

    const stopSpinner = spinner('Cloning repository...');
    try {
      run(`git clone --depth 1 "${REPO_URL}" "${tempDir}"`, { silent: true });
      stopSpinner();
      success('Downloaded starter template');
    } catch (err) {
      stopSpinner();
      error(`Failed to clone repository: ${err.message || err}`);
      if (outputMode.json) {
        outputJson();
      }
      process.exit(1);
    }
    sourceDir = tempDir;
  }

  // -------------------------------------------------------------------------
  // Copy project files
  // -------------------------------------------------------------------------

  info('Copying project files...');
  verbose(`Excluding: ${EXCLUDE_PATTERNS.join(', ')}`);

  const excludeSet = new Set(EXCLUDE_PATTERNS);
  let copiedCount = 0;
  let skippedCount = 0;

  for (const item of fs.readdirSync(sourceDir)) {
    if (!excludeSet.has(item)) {
      const destPath = path.join(targetDir, item);
      // Skip if file already exists in init-in-place mode
      if (initInPlace && fs.existsSync(destPath)) {
        verbose(`Skipped (exists): ${item}`);
        skippedCount++;
        continue;
      }
      verbose(`Copying: ${item}`);
      copyRecursive(
        path.join(sourceDir, item),
        destPath,
        excludeSet
      );
      copiedCount++;
    }
  }
  verbose(`Copied ${copiedCount} items, skipped ${skippedCount}`);
  success('Project files copied');

  // -------------------------------------------------------------------------
  // Update package.json
  // -------------------------------------------------------------------------

  updatePackageJson(targetDir, projectName, cleanName);

  // -------------------------------------------------------------------------
  // Initialize git repository
  // -------------------------------------------------------------------------

  const hasGit = fs.existsSync(path.join(targetDir, '.git'));

  if (!hasGit) {
    info('Initializing git repository...');
    run('git init', { silent: true, cwd: targetDir });
    success('Git initialized');
  } else {
    verbose('Git repository already exists, skipping init');
  }

  // -------------------------------------------------------------------------
  // Set up submodules
  // -------------------------------------------------------------------------

  info('Setting up dependencies...');

  for (const sub of SUBMODULES) {
    const subPath = path.join(targetDir, sub.name);
    verbose(`Submodule ${sub.name}: ${sub.url}`);

    if (fs.existsSync(subPath)) {
      verbose(`Removing existing ${sub.name} directory`);
      removeDir(subPath);
    }

    try {
      run(`git submodule add "${sub.url}" "${sub.name}"`, { silent: true, cwd: targetDir });
      success(`Added ${sub.name}`);
    } catch (err) {
      warn(`${sub.name}: ${err.message || 'setup failed'}`);
    }
  }

  try {
    run('git submodule update --init --recursive', { silent: true, cwd: targetDir });
  } catch (err) {
    warn(`Submodule init: ${err.message || 'failed'}`);
  }

  // -------------------------------------------------------------------------
  // Create initial commit
  // -------------------------------------------------------------------------

  info('Creating initial commit...');
  try {
    verbose('Running: git add -A');
    run('git add -A', { silent: true, cwd: targetDir });
    verbose('Running: git commit');
    run('git commit -m "Initial commit from create-lamdera-app"', { silent: true, cwd: targetDir });
    success('Initial commit created');
  } catch (err) {
    warn(`Commit skipped: ${err.message || 'check git config'}`);
  }

  // -------------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------------

  if (tempDir) {
    removeDir(tempDir);
  }

  // -------------------------------------------------------------------------
  // Success output
  // -------------------------------------------------------------------------

  const nextSteps = [
    initInPlace ? null : `cd "${targetDir}"`,
    IS_WINDOWS ? '.\\compile.ps1' : './compile.sh',
    'lamdera live',
  ].filter(Boolean);

  if (outputMode.json) {
    jsonOutput.success = true;
    jsonOutput.path = targetDir;
    jsonOutput.projectName = cleanName;
    jsonOutput.nextSteps = nextSteps;
    outputJson();
  } else {
    println('');
    println(`${COLORS.green}${COLORS.bold}Success!${COLORS.reset} Created ${COLORS.cyan}${cleanName}${COLORS.reset} at ${targetDir}`);
    println('');
    println(`${COLORS.yellow}Next steps:${COLORS.reset}`);
    nextSteps.forEach((step, i) => {
      println(`  ${COLORS.cyan}${i + 1}.${COLORS.reset} ${step}`);
    });
    println('');
    println(`${COLORS.dim}Test login: sys@admin.com / admin${COLORS.reset}`);
    println(`${COLORS.dim}AI docs: Open CLAUDE.md for development guide${COLORS.reset}`);
    println('');
  }
};

// ============================================================================
// Entry Point
// ============================================================================

main().catch((err) => {
  error(err?.message || String(err));
  if (outputMode.json) {
    outputJson();
  }
  if (process.env.DEBUG) {
    console.error(err);
  }
  process.exit(1);
});
