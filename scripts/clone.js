#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const COLORS = {
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
  bold: '\x1b[1m',
  nc: '\x1b[0m',
};

const println = (msg = '') => process.stdout.write(msg + '\n');

const prompt = async (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question(question, resolve));
  rl.close();
  return answer;
};

const cleanProjectName = (name) => name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();

const expandHome = (p) => (p.startsWith('~') ? path.join(process.env.HOME || process.env.USERPROFILE || '', p.slice(1)) : p);

const resolveTargetPath = (inputPath, defaultPath) => {
  if (!inputPath || inputPath.trim() === '') return path.resolve(defaultPath);
  const expanded = expandHome(inputPath.trim());
  if (path.isAbsolute(expanded)) return path.normalize(expanded);
  return path.resolve(process.cwd(), expanded);
};

const run = (cmd, silent = false) => {
  execSync(cmd, { stdio: silent ? 'ignore' : 'inherit' });
};

(async () => {
  println(`${COLORS.blue}${COLORS.bold}🚀 Lamdera Starter Project Setup${COLORS.nc}`);
  println('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  println('');

  const argName = process.argv[2];
  let projectName = argName;
  if (!projectName) {
    projectName = await prompt(`${COLORS.yellow}What would you like to name your project?${COLORS.nc}\nProject name: `);
    if (!projectName) {
      println(`${COLORS.red}❌ Project name cannot be empty${COLORS.nc}`);
      process.exit(1);
    }
  }

  const cleanName = cleanProjectName(projectName);
  const origCwd = process.env.EP_ORIG_CWD || process.cwd();
  const repoRoot = path.resolve(__dirname, '..');
  const defaultSuggestion = path.resolve(origCwd, '..', cleanName);

  println('');
  println(`${COLORS.yellow}Where would you like to create your project? ${COLORS.blue}(absolute, ~, or relative)${COLORS.nc}`);
  println(`${COLORS.blue}Default: ${defaultSuggestion}${COLORS.nc}`);
  const customPath = await prompt('Project path (press Enter for default): ');

  const target = resolveTargetPath(customPath, defaultSuggestion);

  const relToRepo = path.relative(repoRoot, target);
  const isInsideRepo = relToRepo === '' || (!relToRepo.startsWith('..') && !path.isAbsolute(relToRepo));
  if (isInsideRepo) {
    println(`${COLORS.red}❌ Refusing to create inside the starter-project repo.${COLORS.nc}`);
    println(`${COLORS.yellow}Pick a directory outside, e.g.: ${path.resolve(repoRoot, '..', cleanName)}${COLORS.nc}`);
    process.exit(1);
  }

  if (fs.existsSync(target)) {
    const overwrite = await prompt(`${COLORS.red}⚠️  Directory '${target}' already exists!${COLORS.nc}\nContinue anyway? This may overwrite existing files. (y/N): `);
    if (!/^y(es)?$/i.test(overwrite.trim())) {
      println(`${COLORS.yellow}Cancelled.${COLORS.nc}`);
      process.exit(1);
    }
  }

  println('');
  println(`${COLORS.green}${COLORS.bold}📋 Creating '${projectName}' at: ${target}${COLORS.nc}`);
  println('');

  fs.mkdirSync(target, { recursive: true });

  println(`${COLORS.blue}📋 Copying project files...${COLORS.nc}`);
  // repoRoot already set above
  // Prefer rsync if available; fallback to tar pipe (portable)
  let hasRsync = true;
  try {
    execSync('rsync --version', { stdio: 'ignore' });
  } catch (_) {
    hasRsync = false;
  }
  if (hasRsync) {
    run(`rsync -a --exclude ".git" --exclude ".gitmodules" --exclude "clone.sh" --exclude "clone.ps1" --exclude "scripts" "${repoRoot}/" "${target}/"`);
  } else {
    // Fallback copy excluding .git and this script
    run(`bash -c 'shopt -s dotglob; \ 
      mkdir -p "${target}" && \ 
      for f in "${repoRoot}"/*; do \ 
        base="$(basename "$f")"; \ 
        if [ "$base" != ".git" ] && [ "$base" != ".gitmodules" ] && [ "$base" != "clone.sh" ] && [ "$base" != "clone.ps1" ] && [ "$base" != "scripts" ]; then \ 
          cp -R "$f" "${target}/"; \ 
        fi; \ 
      done'`);
  }

  // Initialize git repo
  println(`${COLORS.blue}🔧 Initializing git repository...${COLORS.nc}`);
  run(`bash -c 'cd "${target}" && git init'`, true);

  println(`${COLORS.blue}📦 Copying auth and websocket dependencies...${COLORS.nc}`);
  // Copy auth and lamdera-websocket directly instead of submodules
  if (fs.existsSync(path.join(repoRoot, 'auth'))) {
    run(`cp -R "${repoRoot}/auth" "${target}/auth"`);
  }
  if (fs.existsSync(path.join(repoRoot, 'lamdera-websocket-package'))) {
    run(`cp -R "${repoRoot}/lamdera-websocket-package" "${target}/lamdera-websocket-package"`);
  }

  println(`${COLORS.blue}💾 Creating initial commit...${COLORS.nc}`);
  try {
    run(`bash -c 'cd "${target}" && git add . && git commit -m "Initial commit from starter project with submodules"'`, true);
  } catch (_) {
    // ignore if commit fails (e.g., user has different git config)
  }

  println('');
  println(`${COLORS.green}${COLORS.bold}✅ Success! Project '${projectName}' created!${COLORS.nc}`);
  println(`${COLORS.green}   📁 Location: ${target}${COLORS.nc}`);
  println('');
  println(`${COLORS.yellow}${COLORS.bold}🚀 Next steps:${COLORS.nc}`);
  println(`${COLORS.blue}1.${COLORS.nc} cd "${target}"`);
  println(`${COLORS.blue}2.${COLORS.nc} ./compile.sh`);
  println(`${COLORS.blue}3.${COLORS.nc} lamdera live`);
  println(`${COLORS.blue}4.${COLORS.nc} Test login with: ${COLORS.bold}sys@admin.com${COLORS.nc} / ${COLORS.bold}admin${COLORS.nc}`);
  println('');
  println(`${COLORS.green}Happy coding! 🎉${COLORS.nc}`);

  // Print machine-readable target path for wrapper to optionally use
  println(`__TARGET__=${target}`);
})().catch((err) => {
  console.error(`${COLORS.red}❌ Error: ${err?.message || err}${COLORS.nc}`);
  process.exit(1);
});

