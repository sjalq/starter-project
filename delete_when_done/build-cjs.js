const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src', 'index.js');
const distFile = path.join(__dirname, 'dist', 'index.js');
const srcDts = path.join(__dirname, 'src', 'index.d.ts');
const distDts = path.join(__dirname, 'dist', 'index.d.ts');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

const content = fs.readFileSync(srcFile, 'utf8');
fs.writeFileSync(distFile, content);

if (fs.existsSync(srcDts)) {
    const dtsContent = fs.readFileSync(srcDts, 'utf8');
    fs.writeFileSync(distDts, dtsContent);
}

console.log('Built CommonJS version'); 