/**
 * API client for Lamdera RPC endpoints
 *
 * Pure functions for fetching and formatting log data.
 */

// ============================================================================
// Constants
// ============================================================================

export const LEVEL_COLORS = Object.freeze({
  DEBUG: '\x1b[90m',   // Gray
  INFO: '\x1b[36m',    // Cyan
  WARN: '\x1b[33m',    // Yellow
  ERROR: '\x1b[31m',   // Red
});

export const RESET = '\x1b[0m';
export const DIM = '\x1b[2m';
export const BOLD = '\x1b[1m';

// ============================================================================
// Pure Functions - Data Transformation
// ============================================================================

/**
 * Parse a log entry from API response
 * @param {object} entry - Raw entry { i, t, l, m } or string
 * @returns {object} - Parsed entry { index, timestamp, level, message }
 */
export const parseLogEntry = (entry) =>
  typeof entry === 'string'
    ? { index: 0, timestamp: 0, level: 'INFO', message: entry }
    : { index: entry.i, timestamp: entry.t, level: entry.l, message: entry.m };

/**
 * Parse API response (handles both old array format and new object format)
 * @param {object|array} data - API response
 * @returns {{logs: array, nextIndex: number}}
 */
export const parseApiResponse = (data) =>
  Array.isArray(data)
    ? { logs: data.map(parseLogEntry), nextIndex: data.length }
    : { logs: (data.logs || []).map(parseLogEntry), nextIndex: data.nextIndex || 0 };

/**
 * Format timestamp for display
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string}
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp || timestamp === 0) return '...'.padStart(8);

  const date = new Date(timestamp);
  const pad = (n) => n.toString().padStart(2, '0');

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

/**
 * Format a log entry for terminal display
 * @param {object} entry - Parsed log entry
 * @param {boolean} useColor - Whether to use ANSI colors
 * @returns {string}
 */
export const formatLogEntry = (entry, useColor = true) => {
  const idx = entry.index.toString().padStart(6);
  const time = formatTimestamp(entry.timestamp);
  const level = entry.level.padEnd(5);
  const msg = entry.message;

  if (!useColor) {
    return `${idx} ${time} ${level} ${msg}`;
  }

  const levelColor = LEVEL_COLORS[entry.level] || '';
  return `${DIM}${idx}${RESET} ${DIM}${time}${RESET} ${levelColor}${BOLD}${level}${RESET} ${msg}`;
};

// ============================================================================
// Pure Functions - Request Building
// ============================================================================

/**
 * Build request options for fetch
 * @param {object} envConfig - { url, modelKey }
 * @param {object} queryOptions - { since, sinceTime, level, limit }
 * @returns {{url: string, options: object}}
 */
export const buildFetchRequest = (envConfig, queryOptions = {}) => {
  const body = {};

  if (queryOptions.since !== undefined) body.since = queryOptions.since;
  if (queryOptions.sinceTime !== undefined) body.sinceTime = queryOptions.sinceTime;
  if (queryOptions.level) body.level = queryOptions.level.toUpperCase();
  if (queryOptions.limit !== undefined) body.limit = queryOptions.limit;

  return {
    url: `${envConfig.url}/_r/getLogs`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lamdera-model-key': envConfig.modelKey
      },
      body: JSON.stringify(body)
    }
  };
};

/**
 * Classify HTTP error
 * @param {Response} response
 * @returns {string}
 */
const classifyHttpError = (response) => {
  const errorMap = {
    401: 'Unauthorized - check your modelKey in config',
    403: 'Forbidden - access denied',
    404: 'Not found - is the getLogs endpoint available?',
    500: 'Server error - check Lamdera backend logs'
  };
  return errorMap[response.status] || `HTTP ${response.status}: ${response.statusText}`;
};

/**
 * Classify network error
 * @param {Error} err
 * @param {string} url
 * @returns {string}
 */
const classifyNetworkError = (err, url) => {
  if (err.cause?.code === 'ECONNREFUSED') {
    return `Connection refused - is the server running at ${url}?`;
  }
  if (err.cause?.code === 'ENOTFOUND') {
    return `Host not found - check the URL: ${url}`;
  }
  if (err.name === 'AbortError') {
    return 'Request timed out';
  }
  return err.message;
};

// ============================================================================
// Effectful Functions
// ============================================================================

/**
 * Fetch logs from the getLogs RPC endpoint
 * @param {object} envConfig - { url, modelKey }
 * @param {object} options - { since, sinceTime, level, limit }
 * @returns {Promise<{ok: true, value: {logs: array, nextIndex: number}} | {ok: false, error: string}>}
 */
export const fetchLogs = async (envConfig, options = {}) => {
  const { url, options: fetchOptions } = buildFetchRequest(envConfig, options);

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      return { ok: false, error: classifyHttpError(response) };
    }

    const data = await response.json();
    return { ok: true, value: parseApiResponse(data) };

  } catch (err) {
    return { ok: false, error: classifyNetworkError(err, envConfig.url) };
  }
};
