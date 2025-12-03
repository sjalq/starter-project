#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

function run(command, description) {
  console.log(description);
  try {
    execSync(command, { stdio: 'inherit', cwd: __dirname });
  } catch (error) {
    console.error(`Failed: ${description}`);
    process.exit(1);
  }
}

// Generating Elm function documentation
run(
  'node LLMBuildTools/gen-elm-functions.cjs --exclude src/Fusion --exclude src/Evergreen --exclude src/generated',
  'Generating Elm function documentation...'
);

// Scanning for @rpc annotations
run(
  'node codegen/scan-rpc-endpoints.js',
  'Scanning for @rpc annotations...'
);

// Generating RPC endpoints with elm-codegen
const scriptsPath = path.join(__dirname, 'scripts');
const currentPath = process.env.PATH || '';
const newPath = `${scriptsPath}${path.delimiter}${currentPath}`;
process.env.PATH = newPath;

run(
  'elm-codegen run --flags-from codegen/endpoints.json',
  'Generating RPC endpoints with elm-codegen...'
);

// Running tests
run(
  'elm-test-rs --compiler lamdera',
  'Running tests...'
);

// Compiling Lamdera
run(
  'lamdera make src/Backend.elm src/Frontend.elm src/RPC.elm',
  'Compiling Lamdera...'
);

console.log('\n✅ Build completed successfully!');
