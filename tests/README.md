# RPC Property-Based Tests

## Overview

Property-based end-to-end test that verifies the `getModel` and `setModel` RPC endpoints work correctly for backend model export/import.

## Running Tests

```bash
./run-tests.sh
```

This script:
1. Starts Lamdera instance
2. Launches headless Chrome to initialize backend
3. Tests round-trip property: `getModel(setModel(M)) = M`
4. Cleans up browser and processes

## Test Coverage

The test (`scripts/node/test-rpc-e2e.js`) verifies:

### **Round-Trip Property** (Primary Test)
Verifies: `getModel(setModel(M)) = M`

For any backend model M:
1. Fetch model via `getModel` → get bytes B1
2. Send same bytes via `setModel`
3. Fetch again via `getModel` → get bytes B2
4. Assert B1 === B2 (bytewise equality)

This ensures:
- Wire3 encoding/decoding is lossless
- Model can be exported and imported without corruption
- Data integrity through serialization cycle

## Example Output

```
🧪 RPC End-to-End Property Test

Starting Lamdera on port 8000...
Waiting for server...
✓ Server ready
Launching headless browser...
✓ Browser connected

Test 1: Fetching model...
✓ Retrieved model (159 bytes)

Test 2: Setting model...
✓ Model set

Test 3: Verifying round-trip...
✓ Models match!

✅ PASS: Round-trip property holds
   Property: getModel(setModel(M)) = M
   159 bytes verified

Cleaning up...
✓ Browser closed
✓ Killed existing lamdera processes
✓ Cleanup complete
```

## Why This Matters

Verifies that your backend model can be:
- Safely exported from one environment
- Imported to another environment
- Without any data loss or corruption

Critical for:
- Production → Development data sync
- Server migrations
- Backup/restore operations
