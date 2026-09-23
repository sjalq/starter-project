#!/usr/bin/env node

// Build the project: regenerate the Elm function cheat sheet, run tests, compile.
// Keep in step with compile.sh and compile.ps1.

const { execSync } = require('child_process');

function run(command, description) {
  console.log(description);
  try {
    execSync(command, { stdio: 'inherit', cwd: __dirname });
  } catch (error) {
    console.error(`Failed: ${description}`);
    process.exit(1);
  }
}

run(
  'node LLMBuildTools/gen-elm-functions.cjs --exclude src/Evergreen',
  'Generating Elm function documentation...'
);

run('elm-test-rs --compiler lamdera', 'Running tests...');

run(
  'lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm --output=/dev/null',
  'Compiling Lamdera...'
);

console.log('Build completed successfully!');
