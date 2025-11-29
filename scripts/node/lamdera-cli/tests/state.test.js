/**
 * Property-based tests for state module
 *
 * Only meaningful properties - no tautologies!
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fc from 'fast-check';

import { getLastIndex, updateLastIndex } from '../lib/state.js';

// ============================================================================
// Arbitraries (Generators)
// ============================================================================

const envNameArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/);

const envStateArb = fc.record({
  lastIndex: fc.nat(),
  updatedAt: fc.nat()
});

const stateArb = fc.record({
  environments: fc.dictionary(envNameArb, envStateArb, { maxKeys: 5 })
});

const nonEmptyStateArb = fc.record({
  environments: fc.dictionary(envNameArb, envStateArb, { minKeys: 1, maxKeys: 5 })
});

// ============================================================================
// updateLastIndex - immutability (critical for resumability!)
// ============================================================================

describe('updateLastIndex immutability', () => {
  it('property: original state object is never mutated', () => {
    fc.assert(
      fc.property(nonEmptyStateArb, envNameArb, fc.nat(), (state, envName, newIndex) => {
        // Deep clone to compare against
        const originalEnvs = JSON.parse(JSON.stringify(state.environments));

        updateLastIndex(envName, newIndex, state);

        // Original must be completely unchanged - catches accidental mutation
        assert.deepStrictEqual(state.environments, originalEnvs,
          'Original state was mutated!');
      })
    );
  });

  it('property: updating env A does not affect env B values', () => {
    fc.assert(
      fc.property(nonEmptyStateArb, fc.nat(), (state, newIndex) => {
        const envNames = Object.keys(state.environments);
        if (envNames.length < 2) return; // Need at least 2 envs

        const [envA, envB] = envNames;
        const originalBIndex = state.environments[envB].lastIndex;

        const result = updateLastIndex(envA, newIndex, state);

        // Env B must have same lastIndex (not just exist)
        assert.strictEqual(result.environments[envB].lastIndex, originalBIndex,
          'Updating env A corrupted env B!');
      })
    );
  });
});

// ============================================================================
// Round-trip properties (the real contract)
// ============================================================================

describe('get/update round-trips', () => {
  it('property: getLastIndex retrieves what updateLastIndex stored', () => {
    fc.assert(
      fc.property(stateArb, envNameArb, fc.nat(), (state, envName, newIndex) => {
        const updatedState = updateLastIndex(envName, newIndex, state);
        const retrieved = getLastIndex(envName, updatedState);

        // This is THE core contract - if this breaks, resumability is broken
        assert.strictEqual(retrieved, newIndex);
      })
    );
  });

  it('property: sequential updates keep only the latest value', () => {
    fc.assert(
      fc.property(
        stateArb,
        envNameArb,
        fc.array(fc.nat(), { minLength: 2, maxLength: 10 }),
        (state, envName, indices) => {
          const finalIndex = indices[indices.length - 1];

          const finalState = indices.reduce(
            (s, idx) => updateLastIndex(envName, idx, s),
            state
          );

          // Only final value should persist - no "stale read" bugs
          assert.strictEqual(getLastIndex(envName, finalState), finalIndex);
        }
      )
    );
  });

  it('property: multiple environments are fully independent', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(envNameArb, fc.nat()), { minLength: 2, maxLength: 5 }),
        (envUpdates) => {
          // Ensure unique env names
          const uniqueEnvs = new Map(envUpdates);
          if (uniqueEnvs.size < 2) return;

          // Apply all updates
          let state = { environments: {} };
          for (const [env, idx] of uniqueEnvs) {
            state = updateLastIndex(env, idx, state);
          }

          // Each env should have exactly its own value
          for (const [env, expectedIdx] of uniqueEnvs) {
            assert.strictEqual(getLastIndex(env, state), expectedIdx,
              `Environment ${env} has wrong value`);
          }
        }
      )
    );
  });
});

// ============================================================================
// Edge case: updatedAt timestamp sanity
// ============================================================================

describe('timestamp behavior', () => {
  it('property: updatedAt is within reasonable bounds (not in the past)', () => {
    fc.assert(
      fc.property(stateArb, envNameArb, fc.nat(), (state, envName, newIndex) => {
        const before = Date.now();
        const result = updateLastIndex(envName, newIndex, state);
        const after = Date.now();

        const updatedAt = result.environments[envName].updatedAt;

        // Catches clock skew bugs or accidentally using seconds instead of ms
        assert.ok(updatedAt >= before && updatedAt <= after,
          `updatedAt ${updatedAt} not in range [${before}, ${after}]`);
      })
    );
  });
});
