const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src', 'index.js');
const distFile = path.join(__dirname, 'dist', 'index.mjs');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

let content = fs.readFileSync(srcFile, 'utf8');

// Replace module.exports with export
const moduleExportsRegex = /module\.exports = \{([\s\S]*?)\};/;
const match = content.match(moduleExportsRegex);

if (match) {
    const exportContent = match[1].trim();
    content = content.replace(moduleExportsRegex, `export {\n${exportContent}\n};`);
} else {
    console.warn('Could not find module.exports pattern');
}

fs.writeFileSync(distFile, content);

console.log('Built ESM version'); 