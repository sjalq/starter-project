module Property.RoleTests exposing (suite)

import Expect
import Fuzz exposing (Fuzzer)
import Fuzzers.DomainFuzzers exposing (roleFuzzer)
import Rights.Role exposing (roleHasAccess, roleToString)
import Test exposing (..)
import Types exposing (Role(..))


suite : Test
suite =
    describe "Role Properties"
        [ describe "roleHasAccess"
            [ fuzz roleFuzzer "reflexivity: role always has access to itself" <|
                \role ->
                    roleHasAccess role role
                        |> Expect.equal True
            , fuzz roleFuzzer "SysAdmin has access to all roles" <|
                \requiredRole ->
                    roleHasAccess SysAdmin requiredRole
                        |> Expect.equal True
            , test "UserRole has access to UserRole" <|
                \_ ->
                    roleHasAccess UserRole UserRole
                        |> Expect.equal True
            , test "UserRole has access to Anonymous" <|
                \_ ->
                    roleHasAccess UserRole Anonymous
                        |> Expect.equal True
            , test "UserRole does NOT have access to SysAdmin" <|
                \_ ->
                    roleHasAccess UserRole SysAdmin
                        |> Expect.equal False
            , test "Anonymous has access to Anonymous" <|
                \_ ->
                    roleHasAccess Anonymous Anonymous
                        |> Expect.equal True
            , test "Anonymous does NOT have access to UserRole" <|
                \_ ->
                    roleHasAccess Anonymous UserRole
                        |> Expect.equal False
            , test "Anonymous does NOT have access to SysAdmin" <|
                \_ ->
                    roleHasAccess Anonymous SysAdmin
                        |> Expect.equal False
            ]
        , describe "roleToString"
            [ fuzz2 roleFuzzer roleFuzzer "is injective (different roles -> different strings)" <|
                \role1 role2 ->
                    if role1 == role2 then
                        Expect.equal (roleToString role1) (roleToString role2)

                    else
                        Expect.notEqual (roleToString role1) (roleToString role2)
            , test "SysAdmin -> SysAdmin" <|
                \_ ->
                    roleToString SysAdmin
                        |> Expect.equal "SysAdmin"
            , test "UserRole -> User" <|
                \_ ->
                    roleToString UserRole
                        |> Expect.equal "User"
            , test "Anonymous -> Anonymous" <|
                \_ ->
                    roleToString Anonymous
                        |> Expect.equal "Anonymous"
            ]
        , describe "Role hierarchy"
            [ test "SysAdmin > UserRole > Anonymous" <|
                \_ ->
                    Expect.all
                        [ \_ -> roleHasAccess SysAdmin UserRole |> Expect.equal True
                        , \_ -> roleHasAccess SysAdmin Anonymous |> Expect.equal True
                        , \_ -> roleHasAccess UserRole Anonymous |> Expect.equal True
                        , \_ -> roleHasAccess UserRole SysAdmin |> Expect.equal False
                        , \_ -> roleHasAccess Anonymous SysAdmin |> Expect.equal False
                        , \_ -> roleHasAccess Anonymous UserRole |> Expect.equal False
                        ]
                        ()
            ]
        ]
