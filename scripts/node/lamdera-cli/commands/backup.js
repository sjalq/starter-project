/**
 * Backup command - Downloads BackendModel from a Lamdera instance
 *
 * Usage:
 *   node scripts/node/lamdera-cli/index.js backup
 *   node scripts/node/lamdera-cli/index.js backup --env prod
 *   node scripts/node/lamdera-cli/index.js backup -o ./backups/model.bin
 */

import { promises as fs } from 'fs';
import path from 'path';
import { loadConfig, getEnvConfig } from '../lib/config.js';

// ============================================================================
// Constants
// ============================================================================

const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Build request options for getModel endpoint
 */
const buildGetModelRequest = (envConfig) => ({
  url: `${envConfig.url}/_r/getModel`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-lamdera-model-key': envConfig.modelKey
    },
    body: JSON.stringify({})
  }
});

/**
 * Generate default backup filename with timestamp
 */
const generateBackupFilename = (envName) => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `backup-${envName}-${timestamp}.bin`;
};

/**
 * Format bytes for human display
 */
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ============================================================================
// Effectful Functions
// ============================================================================

/**
 * Fetch model from getModel endpoint
 */
const fetchModel = async (envConfig) => {
  const { url, options } = buildGetModelRequest(envConfig);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        return { ok: false, error: 'Unauthorized - check your modelKey in config' };
      }
      return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data = await response.arrayBuffer();
    return { ok: true, value: Buffer.from(data) };

  } catch (err) {
    if (err.cause?.code === 'ECONNREFUSED') {
      return { ok: false, error: `Connection refused - is the server running at ${envConfig.url}?` };
    }
    return { ok: false, error: err.message };
  }
};

/**
 * Save buffer to file
 */
const saveToFile = async (buffer, filePath) => {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, buffer);
};

// ============================================================================
// Command
// ============================================================================

export const backupCommand = async (options) => {
  const config = loadConfig();
  const envResult = getEnvConfig(options.env, config);

  if (!envResult.ok) {
    console.error(`${RED}Error: ${envResult.error}${RESET}`);
    process.exit(1);
  }

  const envConfig = envResult.value;
  const envName = envConfig.name;

  console.log(`${CYAN}📦 Backing up model from ${BOLD}${envName}${RESET}${CYAN}...${RESET}`);
  console.log(`${DIM}   ${envConfig.url}${RESET}\n`);

  // Fetch model
  const result = await fetchModel(envConfig);

  if (!result.ok) {
    console.error(`${RED}✗ Failed: ${result.error}${RESET}`);
    process.exit(1);
  }

  // Determine output path
  const outputPath = options.output || path.join('backups', generateBackupFilename(envName));

  // Save to file
  try {
    await saveToFile(result.value, outputPath);
    console.log(`${GREEN}✓ Backup saved${RESET}`);
    console.log(`${DIM}  File: ${outputPath}${RESET}`);
    console.log(`${DIM}  Size: ${formatBytes(result.value.length)}${RESET}`);
  } catch (err) {
    console.error(`${RED}✗ Failed to save: ${err.message}${RESET}`);
    process.exit(1);
  }
};
