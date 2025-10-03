#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const http = require('http');
const puppeteer = require('puppeteer');

const PORT = 8000;
const MODEL_KEY = '1234567890';

// Kill existing lamdera processes
function killExisting() {
  try {
    execSync('pkill -9 lamdera', { stdio: 'ignore' });
    console.log('✓ Killed existing lamdera processes');
  } catch (e) {
    // No processes to kill
  }
}

// Start lamdera instance
function startLamdera(port) {
  return spawn('lamdera', ['live', '--port', port.toString()], {
    cwd: process.cwd(),
    stdio: 'pipe'
  });
}

// Wait for server to be ready
async function waitForServer(port, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}`, () => resolve());
        req.on('error', reject);
        req.setTimeout(1000);
      });
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error(`Server on port ${port} didn't start in time`);
}

// RPC call helper - direct HTTP endpoint access
function rpcCall(port, endpoint, bodyData = null) {
  return new Promise((resolve, reject) => {
    let data;
    if (bodyData && endpoint === 'setModel') {
      // For setModel, send as raw bytes (convert int array to Buffer)
      data = Buffer.from(bodyData);
    } else if (bodyData) {
      data = Buffer.from(JSON.stringify(bodyData));
    } else {
      data = Buffer.alloc(0);
    }

    const options = {
      hostname: 'localhost',
      port: port,
      path: `/_r/${endpoint}/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-lamdera-model-key': MODEL_KEY,
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let rawData = [];
      res.on('data', chunk => rawData.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(rawData);
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(buffer.toString());
            resolve(result);
          } catch (e) {
            resolve(buffer);
          }
        } else {
          const responseText = buffer.toString();
          reject(new Error(`HTTP ${res.statusCode}: ${responseText.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Add test log to server
async function addTestLog(port, log) {
  // This would require a custom endpoint or we can just verify getModel/setModel works
  // For now, we'll just use the model export/import mechanism
}

async function main() {
  const processes = [];
  let browser = null;

  try {
    console.log('🧪 RPC End-to-End Property Test\n');

    // Step 1: Kill existing processes
    killExisting();
    await new Promise(r => setTimeout(r, 1000));

    // Step 2: Start instance
    console.log(`Starting Lamdera on port ${PORT}...`);
    const proc = startLamdera(PORT);
    processes.push(proc);

    // Step 3: Wait for ready
    console.log('Waiting for server...');
    await waitForServer(PORT);
    console.log('✓ Server ready');

    // Step 3.5: Launch headless browser to initialize backend
    console.log('Launching headless browser...');
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`);
    await new Promise(r => setTimeout(r, 2000)); // Wait for Lamdera to init
    console.log('✓ Browser connected\n');

    // Step 4: Get model
    console.log('Test 1: Fetching model...');
    const model1 = await rpcCall(PORT, 'getModel');
    if (!Array.isArray(model1)) {
      console.error('Response:', JSON.stringify(model1).substring(0, 200));
      throw new Error(`getModel failed: expected array, got ${typeof model1}`);
    }
    console.log(`✓ Retrieved model (${model1.length} bytes)\n`);

    // Step 5: Set same model back
    console.log('Test 2: Setting model...');
    await rpcCall(PORT, 'setModel', model1);
    console.log('✓ Model set\n');

    // Step 6: Get model again and verify
    console.log('Test 3: Verifying round-trip...');
    const model2 = await rpcCall(PORT, 'getModel');

    // Step 7: Compare
    if (JSON.stringify(model1) === JSON.stringify(model2)) {
      console.log('✓ Models match!\n');
      console.log('✅ PASS: Round-trip property holds');
      console.log('   Property: getModel(setModel(M)) = M');
      console.log(`   ${model1.length} bytes verified`);
      return 0;
    } else {
      console.log('\n❌ FAIL: Models differ');
      console.log(`  Before: ${model1.length} bytes`);
      console.log(`  After: ${model2.length} bytes`);
      return 1;
    }

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    return 1;
  } finally {
    // Cleanup
    console.log('\nCleaning up...');
    if (browser) {
      try {
        await browser.close();
        console.log('✓ Browser closed');
      } catch (e) {}
    }
    processes.forEach(p => {
      try { p.kill(); } catch (e) {}
    });
    killExisting();
    console.log('✓ Cleanup complete');
  }
}

main().then(code => process.exit(code));
