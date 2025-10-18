#!/usr/bin/env node

/**
 * Scans Elm source files for @rpc annotations and extracts endpoint information
 *
 * Looks for patterns like:
 *   {-| @rpc -}
 *   myFunction : SessionId -> BackendModel -> Request -> ( Result String Response, BackendModel, Cmd BackendMsg )
 *
 * Generates endpoint config as JSON for elm-codegen to consume
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const OUTPUT_FILE = path.join(__dirname, 'endpoints.json');

/**
 * Recursively find all .elm files in a directory
 */
function findElmFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findElmFiles(filePath, fileList);
        } else if (file.endsWith('.elm')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Extract module name from file path
 * e.g., /path/to/src/Endpoints/Example/Price.elm -> Endpoints.Example.Price
 */
function getModuleName(filePath) {
    const relativePath = path.relative(SRC_DIR, filePath);
    const withoutExt = relativePath.replace(/\.elm$/, '');
    return withoutExt.replace(/\//g, '.');
}

/**
 * Generate endpoint name from module and function
 * e.g., Endpoints.Example.Price + getPrice -> Endpoints_Example_Price_getPrice
 */
function generateEndpointName(moduleName, functionName) {
    return moduleName.replace(/\./g, '_') + '_' + functionName;
}

/**
 * Parse a type signature to extract parameter types and output type
 *
 * Format: functionName : SessionId -> BackendModel -> Param1 -> Param2 -> ( Result String Output, BackendModel, Cmd BackendMsg )
 */
function parseTypeSignature(signature) {
    // Remove the function name and colon
    const typePartMatch = signature.match(/:\s*(.+)/);
    if (!typePartMatch) return null;

    const typePart = typePartMatch[1].trim();

    // Split by -> but be careful of parentheses
    const parts = [];
    let current = '';
    let parenDepth = 0;

    for (let i = 0; i < typePart.length; i++) {
        const char = typePart[i];

        if (char === '(') parenDepth++;
        if (char === ')') parenDepth--;

        if (char === '-' && typePart[i + 1] === '>' && parenDepth === 0) {
            parts.push(current.trim());
            current = '';
            i++; // Skip the '>'
        } else {
            current += char;
        }
    }

    if (current.trim()) {
        parts.push(current.trim());
    }

    // Filter out SessionId and BackendModel, and the return type (last one)
    if (parts.length < 3) return null; // Must have at least SessionId, BackendModel, and return type

    const paramTypes = parts.slice(2, -1).filter(p =>
        p !== 'SessionId' &&
        p !== 'BackendModel' &&
        p.trim().length > 0
    );

    // Extract output type from Result String OutputType
    const returnType = parts[parts.length - 1];
    const resultMatch = returnType.match(/Result\s+\w+\s+(\w+)/);
    const outputType = resultMatch ? resultMatch[1] : 'String';

    return {
        paramTypes,
        outputType
    };
}

/**
 * Scan a single Elm file for @rpc annotations
 */
function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const endpoints = [];

    const moduleName = getModuleName(filePath);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Look for @rpc annotation (must be on its own line, not in description)
        if (line === '{-| @rpc' || line === '@rpc') {
            // Find the next non-comment, non-empty line (the type signature)
            let signatureLine = '';
            let functionName = '';

            for (let j = i + 1; j < lines.length; j++) {
                const nextLine = lines[j].trim();

                // Skip empty lines and doc comment endings
                if (nextLine === '' || nextLine === '-}') continue;

                // Found the type signature
                if (nextLine.includes(':')) {
                    signatureLine = nextLine;

                    // Extract function name (before the colon)
                    const match = signatureLine.match(/^(\w+)\s*:/);
                    if (match) {
                        functionName = match[1];
                    }
                    break;
                }
            }

            if (functionName && signatureLine) {
                const parsed = parseTypeSignature(signatureLine);

                if (parsed) {
                    const endpointName = generateEndpointName(moduleName, functionName);

                    endpoints.push({
                        name: endpointName,
                        moduleName: moduleName,
                        functionName: functionName,
                        paramTypes: parsed.paramTypes,
                        outputType: parsed.outputType,
                        sourceFile: path.relative(path.join(__dirname, '..'), filePath)
                    });

                    console.log(`✓ Found RPC endpoint: ${endpointName} in ${moduleName}.${functionName}`);
                }
            }
        }
    }

    return endpoints;
}

/**
 * Main execution
 */
function main() {
    console.log('🔍 Scanning for @rpc annotations...\n');

    const elmFiles = findElmFiles(SRC_DIR);
    const allEndpoints = [];

    elmFiles.forEach(filePath => {
        const endpoints = scanFile(filePath);
        allEndpoints.push(...endpoints);
    });

    console.log(`\n📝 Found ${allEndpoints.length} RPC endpoint(s)`);

    // Write to JSON file for elm-codegen to read
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allEndpoints, null, 2));
    console.log(`✅ Written to ${path.relative(path.join(__dirname, '..'), OUTPUT_FILE)}`);

    // Also output for elm-codegen to consume via flags
    if (allEndpoints.length === 0) {
        console.log('\n⚠️  No @rpc endpoints found. Add {-| @rpc -} annotations to your functions.');
    }
}

main();
