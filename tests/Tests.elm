module Tests exposing (suite)

import CodegenTests
import Test exposing (Test)


suite : Test
suite =
    Test.describe "All Tests"
        [ CodegenTests.suite
        ]
