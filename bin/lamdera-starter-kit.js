#!/usr/bin/env node

/**
 * lamdera-starter-kit
 *
 * CLI tool to scaffold new Lamdera projects with auth, WebSockets, program-test, and more.
 * Works on Windows, macOS, and Linux.
 *
 * Usage:
 *   npx lamdera-starter-kit my-project        # Creates ./my-project
 *   npx lamdera-starter-kit .                 # Init in current directory
 *   npx lamdera-starter-kit my-project -y     # Non-interactive (for LLMs/scripts)
 *   npx lamdera-starter-kit my-project --json # JSON output for automation
 */

const { execSync, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

// ============================================================================
// Configuration
// ============================================================================

const REPO_URL = 'https://github.com/sjalq/starter-project.git';
const IS_WINDOWS = process.platform === 'win32';
const KIT_VERSION = require('../package.json').version;

// Only files tracked by git in the template are copied, so untracked and
// ignored files (secrets, local state, build output) can never ship.
// These tracked paths are maintainer-only and are also skipped. Each entry is
// relative to the template root and matches that file or everything under it.
const EXCLUDE_PATHS = [
  '.gitmodules', // recreated by `git submodule add`
  '.github', // template CI, tests the scaffolder itself
  '.claude',
  'bin',
  'clone.sh',
  'clone.ps1',
  'LICENSE', // the new project is the user's own
  'package-lock.json',
  'auth', // submodule
  'lamdera-websocket-package', // submodule
  'tools', // submodule
];

// Submodules to set up in new project, pinned to the commit the template uses
const SUBMODULES = [
  { path: 'auth', url: 'https://github.com/sjalq/auth.git' },
  { path: 'lamdera-websocket-package', url: 'https://github.com/sjalq/lamdera-websocket.git' },
  // Generates tests/Protocol.elm and tests/ProtocolWireProof.elm; rerun it after
  // changing ToBackend/ToFrontend: node tools/wire-extractor/bin/wire-extractor.js
  { path: 'tools/wire-extractor', url: 'https://github.com/sjalq/wire-extractor.git' },
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

// Run git without a shell (no quoting issues on any OS) and return stdout.
const git = (args, cwd) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const isExcluded = (relPath) =>
  EXCLUDE_PATHS.some((excluded) => relPath === excluded || relPath.startsWith(`${excluded}/`));

// Tracked entries of the template, from its git index. Submodule gitlinks
// (mode 160000) are returned separately with the commit they are pinned to.
const listTrackedEntries = (sourceDir) => {
  const entries = git(['ls-files', '--stage', '-z'], sourceDir)
    .split('\0')
    .filter(Boolean)
    .map((line) => {
      const [meta, relPath] = line.split('\t');
      const [mode, sha] = meta.split(' ');
      return { mode, sha, relPath };
    });
  return {
    files: entries.filter((e) => e.mode !== '160000').map((e) => e.relPath),
    submoduleShas: new Map(entries.filter((e) => e.mode === '160000').map((e) => [e.relPath, e.sha])),
  };
};

const remoteTagExists = (repoUrl, tag) => {
  try {
    return git(['ls-remote', '--tags', repoUrl, `refs/tags/${tag}`]).trim() !== '';
  } catch {
    return false;
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
  println(`${COLORS.cyan}${COLORS.bold}lamdera-starter-kit${COLORS.reset}`);
  println(`${COLORS.dim}Lamdera Starter with Auth, WebSockets, Program-Test & More${COLORS.reset}`);
  println('');
};

const printHelp = () => {
  println(`
${COLORS.cyan}${COLORS.bold}lamdera-starter-kit${COLORS.reset} - Scaffold production-ready Lamdera apps

${COLORS.yellow}USAGE${COLORS.reset}
  npx lamdera-starter-kit <project-name>   Create in ./project-name
  npx lamdera-starter-kit .                Init in current directory
  npx lamdera-starter-kit                  Interactive mode

${COLORS.yellow}OPTIONS${COLORS.reset}
  -y, --yes      Non-interactive; error instead of prompting
  --json         Output JSON (for LLMs/scripts); implies --quiet, never prompts
  -q, --quiet    Suppress decorative output
  -v, --verbose  Show detailed output
  -h, --help     Show this help

${COLORS.yellow}EXAMPLES${COLORS.reset}
  ${COLORS.dim}# Create new project${COLORS.reset}
  npx lamdera-starter-kit my-app

  ${COLORS.dim}# Init in current empty directory${COLORS.reset}
  mkdir my-app && cd my-app
  npx lamdera-starter-kit .

  ${COLORS.dim}# Non-interactive for scripts/LLMs${COLORS.reset}
  npx lamdera-starter-kit my-app -y

  ${COLORS.dim}# JSON output for automation${COLORS.reset}
  npx lamdera-starter-kit my-app --json
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

// Temp clone of the template, removed on every exit path (see process 'exit')
let tempDirToClean = null;

const cleanupTempDir = () => {
  if (tempDirToClean) {
    try {
      fs.rmSync(tempDirToClean, { recursive: true, force: true });
    } catch {
      // Best effort: the OS temp dir is cleaned eventually anyway
    }
    tempDirToClean = null;
  }
};

process.on('exit', cleanupTempDir);

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

    delete pkg.author;
    delete pkg.license;
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
// Rebranding the generated project
// ============================================================================

// Template README sections worth keeping in a generated project, in template order
const README_SECTIONS = [
  'Prerequisites',
  'Everyday commands',
  'Configuration',
  'Project layout',
  'Wire protocol freeze',
  'Operations',
  'Working with AI assistants',
];

// Split markdown into `## ` sections keyed by heading, ignoring headings in code fences
const splitReadmeSections = (markdown) => {
  const sections = new Map();
  let current = null;
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const heading = !inFence && /^## (.+?)\s*$/.exec(line);
    if (heading) {
      current = { heading: heading[1], lines: [line] };
      sections.set(current.heading, current);
    } else if (current) {
      current.lines.push(line);
    }
  }
  return sections;
};

const buildProjectReadme = (templateReadme, projectName) => {
  const sections = splitReadmeSections(templateReadme);
  const kept = README_SECTIONS
    .filter((heading) => sections.has(heading))
    .map((heading) => sections.get(heading).lines.join('\n').trimEnd());
  return [
    `# ${projectName}`,
    'A Lamdera application created with [lamdera-starter-kit](https://github.com/sjalq/starter-project).',
    ...kept,
  ].join('\n\n') + '\n';
};

const escapeElmString = (text) => text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const escapeHtmlAttr = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Apply `transform` to a copied file; warn (never fail) when its pattern is gone
const patchFile = (targetDir, relPath, transform) => {
  const filePath = path.join(targetDir, relPath);
  try {
    const before = fs.readFileSync(filePath, 'utf8');
    const after = transform(before);
    if (after === null || after === before) {
      warn(`Could not rebrand ${relPath}: expected pattern not found`);
      return;
    }
    fs.writeFileSync(filePath, after);
    verbose(`Rebranded ${relPath}`);
  } catch (err) {
    warn(`Could not rebrand ${relPath}: ${err.message}`);
  }
};

// Only files the scaffolder copied are touched, never the user's own files
const rebrandProject = (sourceDir, targetDir, projectName, copiedFiles) => {
  const copied = new Set(copiedFiles);

  if (copied.has('README.md')) {
    patchFile(targetDir, 'README.md', () =>
      buildProjectReadme(fs.readFileSync(path.join(sourceDir, 'README.md'), 'utf8'), projectName));
  }

  const pageFrame = 'src/Pages/PageFrame.elm';
  if (copied.has(pageFrame)) {
    patchFile(targetDir, pageFrame, (text) => {
      const pattern = /(^appName =\r?\n)    "Lamdera Starter Kit"/m;
      return pattern.test(text)
        ? text.replace(pattern, (_, head) => `${head}    "${escapeElmString(projectName)}"`)
        : null;
    });
  }

  if (copied.has('head.html')) {
    patchFile(targetDir, 'head.html', (text) => {
      const phrase = 'A Lamdera application built with lamdera-starter-kit';
      return text.includes(phrase) ? text.replace(phrase, () => escapeHtmlAttr(projectName)) : null;
    });
  }
};

// Stage exactly these paths, in batches that stay well under OS argument limits
const gitAddPaths = (paths, cwd) => {
  const BATCH_SIZE = 200;
  for (let i = 0; i < paths.length; i += BATCH_SIZE) {
    git(['add', '--', ...paths.slice(i, i + BATCH_SIZE)], cwd);
  }
};

// True when the repo's index already differs from HEAD (or has entries before the first commit)
const hasStagedChanges = (cwd) => {
  try {
    git(['rev-parse', '--verify', '--quiet', 'HEAD'], cwd);
  } catch {
    return git(['ls-files', '--cached'], cwd).trim() !== '';
  }
  try {
    git(['diff', '--cached', '--quiet'], cwd);
    return false;
  } catch {
    return true;
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
    return { error: 'Project name required in non-interactive mode. Usage: npx lamdera-starter-kit <name> -y' };
  }

  if (flags.json) {
    return { error: 'Project name required with --json. Usage: npx lamdera-starter-kit <name> --json' };
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

  // Submodule paths are never deleted or overwritten: abort instead
  const existingSubmodulePaths = SUBMODULES
    .map((sub) => sub.path)
    .filter((subPath) => fs.existsSync(path.join(targetDir, subPath)));
  if (existingSubmodulePaths.length > 0) {
    error(
      `Target already contains ${existingSubmodulePaths.join(', ')}, which the starter kit adds as git submodules. ` +
      'Move or remove them first; nothing was changed.'
    );
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  // Check if target exists and has content
  if (fs.existsSync(targetDir) && !isDirEmpty(targetDir)) {
    if (flags.yes || flags.json) {
      // Non-interactive and JSON modes: error on non-empty directory (safe default)
      error(`Directory not empty: ${targetDir}. Remove contents or choose different name.`);
      if (outputMode.json) {
        outputJson();
      }
      process.exit(1);
    } else {
      // Interactive: prompt for confirmation
      warn(`Directory exists and is not empty: ${targetDir}`);
      const confirm = await prompt(`${COLORS.cyan}?${COLORS.reset} Continue? Existing files are kept, missing template files are added. ${COLORS.dim}(y/N)${COLORS.reset}: `);
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
    tempDir = path.join(os.tmpdir(), `lamdera-starter-kit-${Date.now()}`);
    tempDirToClean = tempDir;

    // Use the template matching this CLI's version when it has been tagged
    const tag = `v${KIT_VERSION}`;
    const cloneArgs = ['clone', '--depth', '1'];
    if (remoteTagExists(REPO_URL, tag)) {
      verbose(`Using template tag ${tag}`);
      cloneArgs.push('--branch', tag);
    } else {
      verbose(`Tag ${tag} not found on ${REPO_URL}, using the default branch`);
    }

    const stopSpinner = spinner('Cloning repository...');
    try {
      git([...cloneArgs, REPO_URL, tempDir]);
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
  verbose(`Excluding: ${EXCLUDE_PATHS.join(', ')}`);

  let tracked;
  try {
    tracked = listTrackedEntries(sourceDir);
  } catch (err) {
    error(`Could not list template files with git: ${err.message || err}`);
    if (outputMode.json) {
      outputJson();
    }
    process.exit(1);
  }

  const copiedFiles = [];
  let skippedCount = 0;

  for (const relPath of tracked.files.filter((f) => !isExcluded(f))) {
    const srcPath = path.join(sourceDir, relPath);
    const destPath = path.join(targetDir, relPath);
    if (!fs.existsSync(srcPath)) {
      verbose(`Skipped (missing in working tree): ${relPath}`);
      skippedCount++;
      continue;
    }
    // Never overwrite a file that already exists in the target
    if (fs.existsSync(destPath)) {
      verbose(`Skipped (exists): ${relPath}`);
      skippedCount++;
      continue;
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    copiedFiles.push(relPath);
  }
  verbose(`Copied ${copiedFiles.length} files, skipped ${skippedCount}`);
  success('Project files copied');

  // -------------------------------------------------------------------------
  // Update package.json
  // -------------------------------------------------------------------------

  // Only the copies made above are rewritten; an existing package.json is the user's own
  if (copiedFiles.includes('package.json')) {
    updatePackageJson(targetDir, projectName, cleanName);
  }
  rebrandProject(sourceDir, targetDir, projectName, copiedFiles);

  // -------------------------------------------------------------------------
  // Initialize git repository
  // -------------------------------------------------------------------------

  const hasGit = fs.existsSync(path.join(targetDir, '.git'));
  // A commit would sweep up whatever the user had already staged, so skip it then
  const hadStagedChanges = hasGit && hasStagedChanges(targetDir);

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
    const subPath = path.join(targetDir, sub.path);
    const pinnedSha = tracked.submoduleShas.get(sub.path);
    verbose(`Submodule ${sub.path}: ${sub.url} @ ${pinnedSha || 'default branch'}`);

    try {
      git(['submodule', 'add', sub.url, sub.path], targetDir);
      if (pinnedSha) {
        git(['checkout', '--quiet', pinnedSha], subPath);
        git(['add', sub.path], targetDir);
      } else {
        warn(`${sub.path}: template has no pinned commit, using the latest`);
      }
      success(`Added ${sub.path}`);
    } catch (err) {
      warn(`${sub.path}: ${err.message || 'setup failed'}`);
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
    // Stage only what the scaffolder created, never unrelated files in the target
    const scaffoldedPaths = [
      ...copiedFiles,
      ...['.gitmodules', ...SUBMODULES.map((sub) => sub.path)]
        .filter((relPath) => fs.existsSync(path.join(targetDir, relPath))),
    ];
    verbose(`Staging ${scaffoldedPaths.length} scaffolded paths`);
    gitAddPaths(scaffoldedPaths, targetDir);
    if (hadStagedChanges) {
      warn('Commit skipped: the repository already had staged changes. Scaffolded files are staged; commit when ready.');
    } else {
      verbose('Running: git commit');
      git(['commit', '--quiet', '-m', 'Initial commit from lamdera-starter-kit'], targetDir);
      success('Initial commit created');
    }
  } catch (err) {
    warn(`Commit skipped: ${err.message || 'check git config'}`);
  }

  // -------------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------------

  cleanupTempDir();

  // -------------------------------------------------------------------------
  // Success output
  // -------------------------------------------------------------------------

  const nextSteps = [
    initInPlace ? null : `cd "${targetDir}"`,
    'npm install',
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
    println(`${COLORS.dim}Dev login (local only): admin@example.com / admin${COLORS.reset}`);
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
