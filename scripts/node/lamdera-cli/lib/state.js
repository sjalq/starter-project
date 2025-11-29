/**
 * State persistence for resumable operations
 *
 * Stores tail state (lastIndex) so CLI can resume after restart.
 * State file: .lamdera-cli.state.json in project root
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// Constants
// ============================================================================

const STATE_FILENAME = '.lamdera-cli.state.json';

const DEFAULT_STATE = Object.freeze({
  environments: {}
});

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Get state file path (in project root)
 * @returns {string}
 */
const getStatePath = () => resolve(__dirname, '../../../..', STATE_FILENAME);

/**
 * Read file safely
 * @param {string} path
 * @returns {{ok: true, value: string} | {ok: false, error: string}}
 */
const readFileSafe = (path) => {
  try {
    return { ok: true, value: readFileSync(path, 'utf-8') };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

/**
 * Write file safely
 * @param {string} path
 * @param {string} content
 * @returns {{ok: true} | {ok: false, error: string}}
 */
const writeFileSafe = (path, content) => {
  try {
    writeFileSync(path, content, 'utf-8');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

/**
 * Parse JSON safely
 * @param {string} content
 * @returns {{ok: true, value: object} | {ok: false, error: string}}
 */
const parseJson = (content) => {
  try {
    return { ok: true, value: JSON.parse(content) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

// ============================================================================
// Exports
// ============================================================================

/**
 * Load state from file
 * @returns {object} - State object (empty default if file doesn't exist)
 */
export const loadState = () => {
  const path = getStatePath();

  if (!existsSync(path)) {
    return { ...DEFAULT_STATE };
  }

  const readResult = readFileSafe(path);
  if (!readResult.ok) {
    return { ...DEFAULT_STATE };
  }

  const parseResult = parseJson(readResult.value);
  if (!parseResult.ok) {
    return { ...DEFAULT_STATE };
  }

  return { ...DEFAULT_STATE, ...parseResult.value };
};

/**
 * Save state to file
 * @param {object} state
 * @returns {{ok: true} | {ok: false, error: string}}
 */
export const saveState = (state) => {
  const path = getStatePath();
  const content = JSON.stringify(state, null, 2);
  return writeFileSafe(path, content);
};

/**
 * Get last index for an environment
 * @param {string} envName
 * @param {object|null} state - Optional pre-loaded state
 * @returns {number|null}
 */
export const getLastIndex = (envName, state = null) => {
  const s = state || loadState();
  return s.environments?.[envName]?.lastIndex ?? null;
};

/**
 * Update last index for an environment (immutable)
 * @param {string} envName
 * @param {number} lastIndex
 * @param {object|null} state - Optional pre-loaded state
 * @returns {object} - New state object
 */
export const updateLastIndex = (envName, lastIndex, state = null) => {
  const s = state || loadState();
  return {
    ...s,
    environments: {
      ...s.environments,
      [envName]: {
        ...(s.environments?.[envName] || {}),
        lastIndex,
        updatedAt: Date.now()
      }
    }
  };
};

/**
 * Get and update last index atomically
 * @param {string} envName
 * @param {number} newIndex
 * @returns {{previousIndex: number|null, saved: boolean}}
 */
export const atomicUpdateLastIndex = (envName, newIndex) => {
  const state = loadState();
  const previousIndex = getLastIndex(envName, state);
  const newState = updateLastIndex(envName, newIndex, state);
  const saveResult = saveState(newState);

  return {
    previousIndex,
    saved: saveResult.ok
  };
};
