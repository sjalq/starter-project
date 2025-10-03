const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
    const args = process.argv.slice(2);
    const excludedDirs = [];
    let verbose = false;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--exclude' && i + 1 < args.length) {
            excludedDirs.push(args[i + 1]);
            i++;
        } else if (args[i] === '-v') {
            verbose = true;
        }
    }

    return {
        excludedDirs: excludedDirs.length > 0 ? excludedDirs : ['src/Fusion', 'src/Evergreen', 'src/generated'],
        verbose
    };
}

function findElmFiles(excludedDirs) {
    try {
        let excludePattern = excludedDirs.map(dir => `-not -path "*/${dir.replace('src/', '')}/*"`).join(' ');
        const output = execSync(`find src -name "*.elm" -type f ${excludePattern}`, { encoding: 'utf8' });
        return output.trim().split('\n').filter(f => f);
    } catch (e) {
        console.error('Error finding elm files:', e.message);
        return [];
    }
}

function parseElmFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let moduleName = '';
    const decls = [];
    let pastImports = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed.startsWith('module ')) {
            moduleName = trimmed.split(' ')[1];
            continue;
        }

        if (trimmed.startsWith('import ')) {
            continue;
        }

        if (trimmed === '' || trimmed.startsWith('--')) {
            if (!pastImports && trimmed === '') {
                pastImports = true;
            }
            continue;
        }

        if (!pastImports) continue;

        // Check if this is a top-level function definition (starts at column 0, no indentation)
        const isTopLevel = line.length > 0 && line[0] !== ' ' && line[0] !== '\t';
        const isFunctionDef = /^[a-z][a-zA-Z0-9_]*(\s+[a-zA-Z0-9_]+)*\s*=/.test(trimmed);
        const isNotType = !trimmed.startsWith('type ') && !trimmed.startsWith('type alias ');

        if (isTopLevel && isFunctionDef && isNotType) {
            const signaturePart = trimmed.split('=')[0].trim();
            decls.push({
                signature: signaturePart,
                startLine: i + 1
            });
        }
    }

    return { moduleName, declarations: decls };
}

function generateMdcFile(excludedDirs, verbose = false) {
    const elmFiles = findElmFiles(excludedDirs);
    const moduleData = new Map();

    elmFiles.forEach(filePath => {
        const { moduleName, declarations } = parseElmFile(filePath);
        if (declarations.length > 0) {
            moduleData.set(filePath, { moduleName, declarations });
        }
    });

    const sortedFiles = Array.from(moduleData.keys()).sort();

    let output = `---
description: This file contains all the existing functions in the project. It is included so that you can find code faster and aren't tempted to reinvent wheels. Always consult the src/Types.elm file to see the structure of the app.
globs: ["**/*.elm"]
alwaysApply: true
---

# Elm Functions Reference

`;

    sortedFiles.forEach(filePath => {
        const { moduleName, declarations } = moduleData.get(filePath);

        output += `## ${filePath}\n`;
        output += `### ${moduleName}\n`;

        declarations.forEach(decl => {
            output += `${decl.startLine} ${decl.signature}\n`;
        });

        output += '\n';
    });

    fs.writeFileSync('.cursor/rules/elm-functions.mdc', output);
    if (verbose) {
        console.log(`Generated .cursor/rules/elm-functions.mdc with ${sortedFiles.length} modules`);
        console.log(`Excluded directories: ${excludedDirs.join(', ')}`);
    }
}

const { excludedDirs, verbose } = parseArgs();
generateMdcFile(excludedDirs, verbose); 