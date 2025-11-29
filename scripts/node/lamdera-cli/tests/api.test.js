/**
 * Property-based tests for API module
 *
 * Only meaningful properties - no tautologies!
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fc from 'fast-check';

import {
  parseLogEntry,
  parseApiResponse,
  formatTimestamp,
  formatLogEntry,
  buildFetchRequest
} from '../lib/api.js';

// ============================================================================
// Arbitraries (Generators)
// ============================================================================

const logLevelArb = fc.constantFrom('DEBUG', 'INFO', 'WARN', 'ERROR');

const rawLogEntryArb = fc.record({
  i: fc.nat(),
  t: fc.nat(),
  l: logLevelArb,
  m: fc.string()
});

const parsedLogEntryArb = fc.record({
  index: fc.nat(),
  timestamp: fc.nat(),
  level: logLevelArb,
  message: fc.string()
});

// ModelKey should be realistic (API keys are typically 16+ alphanumeric chars)
const modelKeyArb = fc.stringOf(fc.constantFrom(
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
), { minLength: 16, maxLength: 64 });

const envConfigArb = fc.record({
  url: fc.webUrl(),
  modelKey: modelKeyArb
});

// ============================================================================
// formatTimestamp - validates edge cases & format correctness
// ============================================================================

describe('formatTimestamp', () => {
  it('property: HH:MM:SS components are in valid ranges', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 2000000000000 }),
        (ts) => {
          const result = formatTimestamp(ts);
          const [h, m, s] = result.split(':').map(Number);

          // These catch real bugs: overflow, timezone issues, off-by-one
          assert.ok(h >= 0 && h <= 23, `Hour ${h} out of range`);
          assert.ok(m >= 0 && m <= 59, `Minute ${m} out of range`);
          assert.ok(s >= 0 && s <= 59, `Second ${s} out of range`);
        }
      )
    );
  });

  it('property: output is always exactly 8 characters (padding correctness)', () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constant(0), fc.nat()),
        (ts) => {
          const result = formatTimestamp(ts);
          assert.strictEqual(result.length, 8);
        }
      )
    );
  });

  it('property: same timestamp always produces same output (deterministic)', () => {
    fc.assert(
      fc.property(fc.nat(), (ts) => {
        const result1 = formatTimestamp(ts);
        const result2 = formatTimestamp(ts);
        assert.strictEqual(result1, result2);
      })
    );
  });
});

// ============================================================================
// formatLogEntry - format correctness & color safety
// ============================================================================

describe('formatLogEntry', () => {
  it('property: no-color output contains no ANSI escape codes', () => {
    fc.assert(
      fc.property(parsedLogEntryArb, (entry) => {
        const result = formatLogEntry(entry, false);
        // ANSI codes would break piping to files, grep, etc.
        assert.ok(!result.includes('\x1b['), 'Found ANSI code in no-color output');
      })
    );
  });

  it('property: message content is never truncated or mangled', () => {
    fc.assert(
      fc.property(parsedLogEntryArb, (entry) => {
        const result = formatLogEntry(entry, false);
        assert.ok(result.includes(entry.message), 'Message was truncated');
      })
    );
  });

  it('property: colored and non-colored contain same semantic content', () => {
    fc.assert(
      fc.property(parsedLogEntryArb, (entry) => {
        const colored = formatLogEntry(entry, true);
        const plain = formatLogEntry(entry, false);

        // Strip ANSI codes from colored version
        const stripped = colored.replace(/\x1b\[[0-9;]*m/g, '');

        // Should have same content
        assert.strictEqual(stripped, plain);
      })
    );
  });
});

// ============================================================================
// buildFetchRequest - request validity & security
// ============================================================================

describe('buildFetchRequest', () => {
  it('property: body is always valid JSON (won\'t crash server)', () => {
    fc.assert(
      fc.property(
        envConfigArb,
        fc.record({
          since: fc.option(fc.nat(), { nil: undefined }),
          level: fc.option(logLevelArb, { nil: undefined }),
          limit: fc.option(fc.nat(), { nil: undefined })
        }),
        (env, opts) => {
          const result = buildFetchRequest(env, opts);
          // Must not throw
          JSON.parse(result.options.body);
        }
      )
    );
  });

  it('property: level is always uppercased (API contract)', () => {
    fc.assert(
      fc.property(
        envConfigArb,
        fc.record({ level: fc.stringOf(fc.constantFrom('d', 'e', 'b', 'u', 'g', 'i', 'n', 'f', 'o', 'w', 'a', 'r', 'E', 'R', 'O'), { minLength: 1, maxLength: 5 }) }),
        (env, opts) => {
          const result = buildFetchRequest(env, opts);
          const body = JSON.parse(result.options.body);

          if (body.level) {
            assert.strictEqual(body.level, body.level.toUpperCase());
          }
        }
      )
    );
  });

  it('property: modelKey is never exposed in URL (security)', () => {
    fc.assert(
      fc.property(envConfigArb, (env) => {
        const result = buildFetchRequest(env, {});
        assert.ok(!result.url.includes(env.modelKey), 'modelKey leaked to URL!');
      })
    );
  });
});

// ============================================================================
// parseApiResponse - handles both formats consistently
// ============================================================================

describe('parseApiResponse', () => {
  it('property: array and object formats produce equivalent results', () => {
    fc.assert(
      fc.property(fc.array(rawLogEntryArb), (logs) => {
        // Same data in two formats
        const arrayFormat = logs;
        const objectFormat = { logs, nextIndex: logs.length };

        const fromArray = parseApiResponse(arrayFormat);
        const fromObject = parseApiResponse(objectFormat);

        // Should parse to same logs
        assert.strictEqual(fromArray.logs.length, fromObject.logs.length);

        fromArray.logs.forEach((log, i) => {
          assert.deepStrictEqual(log, fromObject.logs[i]);
        });
      })
    );
  });
});
