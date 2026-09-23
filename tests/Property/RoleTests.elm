module Property.RoleTests exposing (suite)

import Expect
import Fuzzers.DomainFuzzers exposing (roleFuzzer)
import Rights.Role exposing (roleHasAccess, roleToString)
import Test exposing (..)
import Types exposing (Role(..))


rank : Role -> Int
rank role =
    case role of
        SysAdmin ->
            2

        UserRole ->
            1

        Anonymous ->
            0


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
            , fuzz2 roleFuzzer roleFuzzer "matches the hierarchy SysAdmin > UserRole > Anonymous" <|
                \userRole requiredRole ->
                    roleHasAccess userRole requiredRole
                        |> Expect.equal (rank userRole >= rank requiredRole)
            ]
        , describe "roleToString"
            [ test "maps every role to a distinct label" <|
                \_ ->
                    List.map roleToString [ SysAdmin, UserRole, Anonymous ]
                        |> Expect.equalLists [ "SysAdmin", "User", "Anonymous" ]
            ]
        ]
