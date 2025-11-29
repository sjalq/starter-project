/**
 * Property-based tests for config module
 *
 * Only meaningful properties - no tautologies!
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fc from 'fast-check';

import { getEnvConfig, listEnvironments } from '../lib/config.js';

// ============================================================================
// Arbitraries (Generators)
// ============================================================================

const envNameArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/);

const envConfigArb = fc.record({
  url: fc.webUrl(),
  modelKey: fc.string({ minLength: 1, maxLength: 100 })
});

const configArb = fc.record({
  environments: fc.dictionary(envNameArb, envConfigArb, { minKeys: 1, maxKeys: 5 }),
  defaultEnv: envNameArb
}).map(cfg => ({
  ...cfg,
  defaultEnv: Object.keys(cfg.environments)[0]
}));

// ============================================================================
// getEnvConfig - error handling & fallback behavior
// ============================================================================

describe('getEnvConfig', () => {
  it('property: non-existent env returns error with available options listed', () => {
    fc.assert(
      fc.property(configArb, (config) => {
        const result = getEnvConfig('definitely_nonexistent_xyz_123', config);

        assert.strictEqual(result.ok, false);

        // Error should help user by listing what IS available
        const availableEnvs = Object.keys(config.environments);
        const mentionsAvailable = availableEnvs.some(env => result.error.includes(env));
        assert.ok(mentionsAvailable, 'Error should list available environments');
      })
    );
  });

  it('property: undefined envName falls back to defaultEnv (not crash)', () => {
    fc.assert(
      fc.property(configArb, (config) => {
        const result = getEnvConfig(undefined, config);

        // Should not crash, should use default
        assert.strictEqual(result.ok, true);
        assert.strictEqual(result.value.name, config.defaultEnv);
      })
    );
  });

  it('property: result type is consistent (ok=true has value, ok=false has error)', () => {
    fc.assert(
      fc.property(
        configArb,
        fc.oneof(envNameArb, fc.constant('nonexistent_env')),
        (config, envName) => {
          const result = getEnvConfig(envName, config);

          if (result.ok) {
            assert.ok('value' in result, 'ok=true must have value');
            assert.ok(!('error' in result), 'ok=true must not have error');
          } else {
            assert.ok('error' in result, 'ok=false must have error');
            assert.ok(!('value' in result), 'ok=false must not have value');
          }
        }
      )
    );
  });
});

// ============================================================================
// listEnvironments - invariants
// ============================================================================

describe('listEnvironments', () => {
  it('property: exactly one environment is marked as default', () => {
    fc.assert(
      fc.property(configArb, (config) => {
        const result = listEnvironments(config);
        const defaultCount = result.filter(e => e.isDefault).length;

        // This catches bugs where multiple or zero defaults are marked
        assert.strictEqual(defaultCount, 1, 'Must have exactly one default');
      })
    );
  });

  it('property: default matches config.defaultEnv', () => {
    fc.assert(
      fc.property(configArb, (config) => {
        const result = listEnvironments(config);
        const defaultEnv = result.find(e => e.isDefault);

        assert.strictEqual(defaultEnv.name, config.defaultEnv);
      })
    );
  });

  it('property: no duplicate environment names', () => {
    fc.assert(
      fc.property(configArb, (config) => {
        const result = listEnvironments(config);
        const names = result.map(e => e.name);
        const uniqueNames = new Set(names);

        assert.strictEqual(names.length, uniqueNames.size, 'Duplicate env names!');
      })
    );
  });
});
