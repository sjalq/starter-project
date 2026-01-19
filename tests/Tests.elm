module Tests exposing (suite)

import CodegenTests
import Program.AdminAccessTests
import Program.AuthFlowTests
import Program.DarkModeTests
import Program.NavigationTests
import Program.PageContentTests
import Property.LoggerTests
import Property.PermissionsTests
import Property.RoleTests
import Property.RouteTests
import Property.ThemeTests
import Test exposing (Test)
import Wire3FirstConstructorProof
import Wire3SortProof


suite : Test
suite =
    Test.describe "All Tests"
        [ Test.describe "Property Tests"
            [ Property.RouteTests.suite
            , Property.RoleTests.suite
            , Property.PermissionsTests.suite
            , Property.LoggerTests.suite
            , Property.ThemeTests.suite
            ]
        , Test.describe "Program Tests"
            [ Program.NavigationTests.suite
            , Program.DarkModeTests.suite
            , Program.AdminAccessTests.suite
            , Program.AuthFlowTests.suite
            , Program.PageContentTests.suite
            ]
        , Test.describe "Codegen Tests"
            [ CodegenTests.suite
            ]
        , Test.describe "Wire3 Proofs"
            [ Wire3FirstConstructorProof.suite
            , Wire3SortProof.suite
            ]
        ]
