/**
 * Configuration loader for Lamdera CLI
 *
 * Pure functions for loading and querying configuration.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_CONFIG = Object.freeze({
  environments: {
    local: {
      url: 'http://localhost:8000',
      modelKey: '1234567890'
    }
  },
  defaultEnv: 'local'
});

const CONFIG_FILENAME = '.lamdera-cli.json';

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Find config file by walking up directory tree
 * @param {string} startDir - Directory to start searching from
 * @returns {string|null} - Path to config file or null
 */
const findConfigFile = (startDir = process.cwd()) => {
  const walkUp = (dir) => {
    if (dir === resolve('/')) return null;

    const configPath = resolve(dir, CONFIG_FILENAME);
    return existsSync(configPath)
      ? configPath
      : walkUp(dirname(dir));
  };

  const found = walkUp(startDir);
  if (found) return found;

  // Fallback: check project root (relative to this script)
  const projectConfig = resolve(__dirname, '../../../..', CONFIG_FILENAME);
  return existsSync(projectConfig) ? projectConfig : null;
};

/**
 * Parse config file content safely
 * @param {string} content - JSON string
 * @returns {{ok: true, value: object} | {ok: false, error: string}}
 */
const parseConfig = (content) => {
  try {
    return { ok: true, value: JSON.parse(content) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

/**
 * Merge user config with defaults
 * @param {object} userConfig - User's config
 * @returns {object} - Merged config
 */
const mergeWithDefaults = (userConfig) => ({
  ...DEFAULT_CONFIG,
  ...userConfig,
  environments: {
    ...DEFAULT_CONFIG.environments,
    ...(userConfig.environments || {})
  }
});

/**
 * Read file safely
 * @param {string} path - File path
 * @returns {{ok: true, value: string} | {ok: false, error: string}}
 */
const readFileSafe = (path) => {
  try {
    return { ok: true, value: readFileSync(path, 'utf-8') };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

// ============================================================================
// Exports
// ============================================================================

/**
 * Load configuration from file or return defaults
 * @returns {object} - Configuration object
 */
export const loadConfig = () => {
  const configPath = findConfigFile();

  if (!configPath) {
    return { ...DEFAULT_CONFIG, _configPath: null };
  }

  const readResult = readFileSafe(configPath);
  if (!readResult.ok) {
    console.error(`⚠️  Error reading ${configPath}: ${readResult.error}`);
    return { ...DEFAULT_CONFIG, _configPath: null };
  }

  const parseResult = parseConfig(readResult.value);
  if (!parseResult.ok) {
    console.error(`⚠️  Error parsing ${configPath}: ${parseResult.error}`);
    return { ...DEFAULT_CONFIG, _configPath: null };
  }

  return {
    ...mergeWithDefaults(parseResult.value),
    _configPath: configPath
  };
};

/**
 * Get environment configuration
 * @param {string|undefined} envName - Environment name
 * @param {object|null} config - Optional pre-loaded config
 * @returns {{ok: true, value: object} | {ok: false, error: string}}
 */
export const getEnvConfig = (envName, config = null) => {
  const cfg = config || loadConfig();
  const env = envName || cfg.defaultEnv || 'local';

  if (!cfg.environments[env]) {
    const available = Object.keys(cfg.environments).join(', ');
    return { ok: false, error: `Unknown environment: "${env}". Available: ${available}` };
  }

  return {
    ok: true,
    value: { name: env, ...cfg.environments[env] }
  };
};

/**
 * List available environments
 * @param {object|null} config - Optional pre-loaded config
 * @returns {Array<{name: string, url: string, isDefault: boolean}>}
 */
export const listEnvironments = (config = null) => {
  const cfg = config || loadConfig();
  return Object.entries(cfg.environments).map(([name, env]) => ({
    name,
    url: env.url,
    isDefault: name === cfg.defaultEnv
  }));
};
