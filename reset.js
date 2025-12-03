#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function run(command, description, ignoreErrors = false) {
  console.log(description);
  try {
    execSync(command, { stdio: 'inherit', shell: true });
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

// Remove .elm directory
const elmDir = path.join(os.homedir(), '.elm');
removeDir(elmDir, 'Removing ~/.elm directory...');

// Remove elm-stuff directory
const elmStuffDir = path.join(__dirname, 'elm-stuff');
removeDir(elmStuffDir, 'Removing ./elm-stuff directory...');

// Reset Lamdera
run('echo y | lamdera reset', 'Resetting Lamdera...', true);

// Run Lamdera live with debug
console.log('\nStarting Lamdera live with debug mode...');
const isWindows = process.platform === 'win32';
if (isWindows) {
  run('set LDEBUG=1 && echo y | lamdera live', 'Starting Lamdera live...', true);
} else {
  run('yes | LDEBUG=1 lamdera live', 'Starting Lamdera live...', true);
}
