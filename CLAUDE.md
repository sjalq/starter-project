At the start of each session, make sure you read the .cursor/*.mdc files so you know how to operate this project. Please note, you can do compiler checks with ./compile.sh

## Property-Based Testing

This Lamdera project uses property-based tests with elm-explorations/test. Since Lamdera uses lamdera/codecs which is incompatible with standard elm-test, you must use the Lamdera compiler.

### Running Tests

```bash
cd tests
elm-test --compiler lamdera
```

This tells elm-test to use the lamdera compiler instead of the standard elm compiler, allowing it to properly compile lamdera/codecs and other Lamdera-specific packages.

### Test Structure

Tests should be organized in `tests/tests/` directory:

```elm
module Tests exposing (..)

import Test exposing (Test)
import YourTestModule

suite : Test
suite =
    Test.describe "All Tests"
        [ YourTestModule.suite
        ]
```

### elm.json Configuration

The `tests/elm.json` must include:
- `"type": "application"` (not "package")
- Source directories: `["../src", "../auth/src", "tests"]`
- All dependencies from main elm.json
- `"elm-explorations/test": "2.2.0"` in direct dependencies

### Example Property-Based Test

```elm
module ExampleTests exposing (..)

import Expect
import Fuzz exposing (Fuzzer)
import Test exposing (..)

suite : Test
suite =
    describe "Example Property Tests"
        [ fuzz Fuzz.int "reversing twice returns original" <|
            \num ->
                num
                    |> negate
                    |> negate
                    |> Expect.equal num
        ]
```