#!/usr/bin/env node

// Recover from lamdera/Elm package cache corruption, then restart the dev server.
// Keep in step with reset.sh and reset.ps1.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function run(command, description, ignoreErrors = false, env = process.env) {
  console.log(description);
  try {
    execSync(command, { stdio: 'inherit', shell: true, env });
  } catch (error) {
    if (!ignoreErrors) {
      console.error(`Failed: ${description}`);
      process.exit(1);
    }
  }
}

function removeDir(dir, description) {
  console.log(description);
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error(`Failed to remove ${dir}: ${error.message}`);
  }
}

const isWindows = process.platform === 'win32';

// Elm keeps its package cache in %APPDATA%\elm on Windows and ~/.elm elsewhere
const elmDir = isWindows
  ? path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'elm')
  : path.join(os.homedir(), '.elm');
const elmDirLabel = isWindows ? '%APPDATA%\\elm' : '~/.elm';

console.log(
  `Resetting: deletes ${elmDirLabel} (global Elm/Lamdera package cache, re-downloaded on next build) and ./elm-stuff, runs 'lamdera reset', then starts 'lamdera live' with LDEBUG=1.`
);

// Remove the Elm package cache
removeDir(elmDir, `Removing ${elmDirLabel} directory...`);

// Remove elm-stuff directory
const elmStuffDir = path.join(__dirname, 'elm-stuff');
removeDir(elmStuffDir, 'Removing ./elm-stuff directory...');

// Reset Lamdera
run('echo y | lamdera reset', 'Resetting Lamdera...', true);

// Run Lamdera live with debug
console.log('\nStarting Lamdera live with debug mode...');
const debugEnv = { ...process.env, LDEBUG: '1' };
run(isWindows ? 'echo y | lamdera live' : 'yes | lamdera live', 'Starting Lamdera live...', true, debugEnv);
