/**
 * Logs command - fetch and tail logs from Lamdera backend
 *
 * Supports resumable tail mode via state persistence.
 */

import { getEnvConfig } from '../lib/config.js';
import { fetchLogs, formatLogEntry, RESET, DIM, BOLD } from '../lib/api.js';
import { getLastIndex, atomicUpdateLastIndex } from '../lib/state.js';

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Filter logs to only those we haven't seen
 * @param {array} logs
 * @param {number|null} lastIndex
 * @returns {array}
 */
const filterNewLogs = (logs, lastIndex) =>
  lastIndex === null
    ? logs
    : logs.filter(log => log.index >= lastIndex);

/**
 * Get the highest index from logs
 * @param {array} logs
 * @returns {number|null}
 */
const getMaxIndex = (logs) =>
  logs.length === 0
    ? null
    : Math.max(...logs.map(l => l.index));

/**
 * Print logs to stdout
 * @param {array} logs
 * @param {boolean} useColor
 */
const printLogs = (logs, useColor) => {
  logs.forEach(entry => console.log(formatLogEntry(entry, useColor)));
};

/**
 * Sleep for ms milliseconds
 * @param {number} ms
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// Command Handlers
// ============================================================================

/**
 * Fetch and display recent logs (non-follow mode)
 * @param {object} envConfig
 * @param {object} options
 */
const fetchRecentLogs = async (envConfig, { limit, level, useColor }) => {
  const result = await fetchLogs(envConfig, { limit, level });

  if (!result.ok) {
    console.error(`❌ ${result.error}`);
    process.exit(1);
  }

  const { logs, nextIndex } = result.value;

  if (logs.length === 0) {
    console.log(`${DIM}No logs found${RESET}`);
    return;
  }

  console.log(`${DIM}─── Showing ${logs.length} logs (next index: ${nextIndex}) ───${RESET}\n`);
  printLogs(logs, useColor);
  console.log(`\n${DIM}─── End of logs ───${RESET}`);
};

/**
 * Tail logs continuously (follow mode) with state persistence
 * @param {object} envConfig
 * @param {object} options
 */
const tailLogs = async (envConfig, { level, interval, useColor, resume }) => {
  // Get initial index - either from saved state (resume) or start fresh
  let currentIndex = resume
    ? getLastIndex(envConfig.name)
    : null;

  const resumeInfo = currentIndex !== null
    ? ` (resuming from index ${currentIndex})`
    : '';

  console.log(`${DIM}─── Tailing logs${resumeInfo} (Ctrl+C to stop) ───${RESET}\n`);

  // Handle graceful shutdown
  const shutdown = () => {
    console.log(`\n${DIM}─── Stopped tailing ───${RESET}`);
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  let isFirstFetch = currentIndex === null;
  let consecutiveErrors = 0;
  const MAX_CONSECUTIVE_ERRORS = 5;

  // Main polling loop
  while (true) {
    const fetchOptions = { level };

    // First fetch: get last N for context. Subsequent: get since last index
    if (isFirstFetch) {
      fetchOptions.limit = 20;
    } else if (currentIndex !== null) {
      fetchOptions.since = currentIndex;
    }

    const result = await fetchLogs(envConfig, fetchOptions);

    if (!result.ok) {
      consecutiveErrors++;
      console.error(`${DIM}⚠️  ${result.error}${consecutiveErrors < MAX_CONSECUTIVE_ERRORS ? ' - retrying...' : ''}${RESET}`);

      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
        console.error(`❌ Too many consecutive errors, stopping.`);
        process.exit(1);
      }

      await sleep(interval);
      continue;
    }

    // Reset error counter on success
    consecutiveErrors = 0;

    const { logs, nextIndex } = result.value;

    // Filter and display new logs
    const newLogs = isFirstFetch ? logs : filterNewLogs(logs, currentIndex);

    if (newLogs.length > 0) {
      printLogs(newLogs, useColor);
    }

    // Update index tracking
    if (nextIndex > 0) {
      currentIndex = nextIndex;

      // Persist state for resumability
      atomicUpdateLastIndex(envConfig.name, currentIndex);
    }

    isFirstFetch = false;
    await sleep(interval);
  }
};

// ============================================================================
// Main Command
// ============================================================================

/**
 * Execute the logs command
 * @param {object} options
 */
export const logsCommand = async (options) => {
  const {
    env,
    limit = 50,
    level,
    follow = false,
    interval = 2000,
    noColor = false,
    resume = false
  } = options;

  // Load environment config
  const envResult = getEnvConfig(env);
  if (!envResult.ok) {
    console.error(`❌ ${envResult.error}`);
    process.exit(1);
  }

  const envConfig = envResult.value;
  const useColor = !noColor && process.stdout.isTTY;

  // Header
  console.log(`📡 Connecting to ${BOLD}${envConfig.name}${RESET} (${envConfig.url})`);
  if (level) console.log(`🔍 Filtering: level >= ${level.toUpperCase()}`);
  if (follow && resume) console.log(`🔄 Resume mode enabled`);
  console.log('');

  // Execute appropriate mode
  if (follow) {
    await tailLogs(envConfig, { level, interval, useColor, resume });
  } else {
    await fetchRecentLogs(envConfig, { limit, level, useColor });
  }
};
