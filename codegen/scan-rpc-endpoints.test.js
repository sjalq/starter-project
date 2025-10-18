#!/usr/bin/env node

/**
 * Tests for the RPC endpoint scanner
 * Run with: node codegen/scan-rpc-endpoints.test.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple test framework
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${name}`);
        console.log(`  ${error.message}`);
        testsFailed++;
    }
}

function assertEquals(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${message}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
    }
}

function assertTrue(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Test fixtures directory
const FIXTURES_DIR = path.join(__dirname, 'test-fixtures');

// Setup: Create test fixtures
function setup() {
    if (!fs.existsSync(FIXTURES_DIR)) {
        fs.mkdirSync(FIXTURES_DIR, { recursive: true });
    }

    // Test file 1: Simple RPC endpoint
    fs.writeFileSync(
        path.join(FIXTURES_DIR, 'SimpleEndpoint.elm'),
        `module SimpleEndpoint exposing (..)

import Lamdera exposing (SessionId)
import Types exposing (..)

{-| @rpc
-}
simpleFunc : SessionId -> BackendModel -> String -> ( Result String Int, BackendModel, Cmd BackendMsg )
simpleFunc sid model param =
    ( Ok 42, model, Cmd.none )
`
    );

    // Test file 2: Multiple parameters
    fs.writeFileSync(
        path.join(FIXTURES_DIR, 'MultiParam.elm'),
        `module MultiParam exposing (..)

import Lamdera exposing (SessionId)
import Types exposing (..)

{-| @rpc
-}
multiParamFunc : SessionId -> BackendModel -> String -> Int -> Bool -> ( Result String Response, BackendModel, Cmd BackendMsg )
multiParamFunc sid model str num bool =
    ( Ok response, model, Cmd.none )
`
    );

    // Test file 3: No RPC annotation (should be ignored)
    fs.writeFileSync(
        path.join(FIXTURES_DIR, 'NoAnnotation.elm'),
        `module NoAnnotation exposing (..)

regularFunction : Int -> String
regularFunction x =
    String.fromInt x
`
    );

    // Test file 4: Multiple RPC endpoints in one file
    fs.writeFileSync(
        path.join(FIXTURES_DIR, 'Multiple.elm'),
        `module Multiple exposing (..)

import Lamdera exposing (SessionId)
import Types exposing (..)

{-| @rpc
-}
firstFunc : SessionId -> BackendModel -> Input1 -> ( Result String Output1, BackendModel, Cmd BackendMsg )
firstFunc sid model input =
    ( Ok output, model, Cmd.none )

{-| @rpc
-}
secondFunc : SessionId -> BackendModel -> Input2 -> ( Result String Output2, BackendModel, Cmd BackendMsg )
secondFunc sid model input =
    ( Ok output, model, Cmd.none )
`
    );

    // Test file 5: Nested module path
    const nestedDir = path.join(FIXTURES_DIR, 'Deeply', 'Nested');
    fs.mkdirSync(nestedDir, { recursive: true });
    fs.writeFileSync(
        path.join(nestedDir, 'Function.elm'),
        `module Deeply.Nested.Function exposing (..)

import Lamdera exposing (SessionId)
import Types exposing (..)

{-| @rpc
-}
deepFunc : SessionId -> BackendModel -> Request -> ( Result String Response, BackendModel, Cmd BackendMsg )
deepFunc sid model req =
    ( Ok resp, model, Cmd.none )
`
    );
}

// Teardown: Remove test fixtures
function teardown() {
    if (fs.existsSync(FIXTURES_DIR)) {
        fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
    }
}

// Helper to run scanner on fixtures
function scanFixtures() {
    const scannerPath = path.join(__dirname, 'scan-rpc-endpoints.js');
    const originalSrcDir = path.join(__dirname, '..', 'src');
    const fixturesDir = FIXTURES_DIR;

    // Temporarily modify the scanner to point to fixtures
    const scannerContent = fs.readFileSync(scannerPath, 'utf-8');
    const modifiedScanner = scannerContent.replace(
        "const SRC_DIR = path.join(__dirname, '..', 'src');",
        `const SRC_DIR = '${fixturesDir}';`
    );

    const tempScanner = path.join(__dirname, 'temp-scanner.js');
    fs.writeFileSync(tempScanner, modifiedScanner);

    try {
        execSync(`node ${tempScanner}`, { stdio: 'pipe' });
        const result = JSON.parse(fs.readFileSync(path.join(__dirname, 'endpoints.json'), 'utf-8'));
        return result;
    } finally {
        fs.unlinkSync(tempScanner);
    }
}

// Run tests
console.log('🧪 Running RPC Scanner Tests\n');

setup();

try {
    test('Scanner finds simple RPC endpoint', () => {
        const endpoints = scanFixtures();
        const simple = endpoints.find(e => e.functionName === 'simpleFunc');

        assertTrue(simple !== undefined, 'Should find simpleFunc');
        assertEquals(simple.moduleName, 'SimpleEndpoint', 'Module name should be SimpleEndpoint');
        assertEquals(simple.name, 'SimpleEndpoint_simpleFunc', 'Endpoint name should be SimpleEndpoint_simpleFunc');
        assertEquals(simple.paramTypes, ['String'], 'Should have one String parameter');
        assertEquals(simple.outputType, 'Int', 'Output type should be Int');
    });

    test('Scanner handles multiple parameters', () => {
        const endpoints = scanFixtures();
        const multi = endpoints.find(e => e.functionName === 'multiParamFunc');

        assertTrue(multi !== undefined, 'Should find multiParamFunc');
        assertEquals(multi.paramTypes, ['String', 'Int', 'Bool'], 'Should have three parameters');
    });

    test('Scanner ignores functions without @rpc annotation', () => {
        const endpoints = scanFixtures();
        const regular = endpoints.find(e => e.functionName === 'regularFunction');

        assertTrue(regular === undefined, 'Should not find regularFunction');
    });

    test('Scanner finds multiple endpoints in same file', () => {
        const endpoints = scanFixtures();
        const first = endpoints.find(e => e.functionName === 'firstFunc');
        const second = endpoints.find(e => e.functionName === 'secondFunc');

        assertTrue(first !== undefined, 'Should find firstFunc');
        assertTrue(second !== undefined, 'Should find secondFunc');
        assertEquals(first.moduleName, 'Multiple', 'Both should be in Multiple module');
        assertEquals(second.moduleName, 'Multiple', 'Both should be in Multiple module');
    });

    test('Scanner handles nested module paths correctly', () => {
        const endpoints = scanFixtures();
        const deep = endpoints.find(e => e.functionName === 'deepFunc');

        assertTrue(deep !== undefined, 'Should find deepFunc');
        assertEquals(deep.moduleName, 'Deeply.Nested.Function', 'Module name should preserve dots');
        assertEquals(deep.name, 'Deeply_Nested_Function_deepFunc', 'Endpoint name should use underscores');
    });

    test('Scanner filters out SessionId and BackendModel from parameters', () => {
        const endpoints = scanFixtures();
        const simple = endpoints.find(e => e.functionName === 'simpleFunc');

        assertTrue(simple !== undefined, 'Should find simpleFunc');
        assertTrue(!simple.paramTypes.includes('SessionId'), 'Should not include SessionId');
        assertTrue(!simple.paramTypes.includes('BackendModel'), 'Should not include BackendModel');
    });

    test('Scanner produces valid JSON output', () => {
        const outputPath = path.join(__dirname, 'endpoints.json');
        assertTrue(fs.existsSync(outputPath), 'Should create endpoints.json');

        const content = fs.readFileSync(outputPath, 'utf-8');
        let parsed;

        try {
            parsed = JSON.parse(content);
        } catch (e) {
            throw new Error('Output should be valid JSON');
        }

        assertTrue(Array.isArray(parsed), 'Output should be an array');
    });

} finally {
    teardown();
}

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);
console.log(`${'='.repeat(50)}\n`);

process.exit(testsFailed > 0 ? 1 : 0);
