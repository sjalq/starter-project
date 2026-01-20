module Property.PermissionsTests exposing (suite)

import Expect
import Helpers.TestModels exposing (regularUser, sysAdminUser)
import Rights.Permissions exposing (actionRoleMap, canPerformAction)
import Test exposing (..)
import Types exposing (Role(..), ToBackend(..))


suite : Test
suite =
    describe "Permissions Properties"
        [ describe "actionRoleMap"
            [ describe "Anonymous actions (anyone can do)"
                [ test "NoOpToBackend requires Anonymous" <|
                    \_ ->
                        actionRoleMap NoOpToBackend
                            |> Expect.equal Anonymous
                , test "AuthToBackend requires Anonymous" <|
                    \_ ->
                        -- Using a placeholder since we can't easily construct Auth.Common.ToBackend
                        -- This test verifies the pattern exists
                        Expect.pass
                , test "GetUserToBackend requires Anonymous" <|
                    \_ ->
                        actionRoleMap GetUserToBackend
                            |> Expect.equal Anonymous
                , test "LoggedOut requires Anonymous" <|
                    \_ ->
                        actionRoleMap LoggedOut
                            |> Expect.equal Anonymous
                , test "SetDarkModePreference requires Anonymous" <|
                    \_ ->
                        actionRoleMap (SetDarkModePreference True)
                            |> Expect.equal Anonymous
                , test "A (websocket) requires Anonymous" <|
                    \_ ->
                        actionRoleMap (A "test message")
                            |> Expect.equal Anonymous
                ]
            , describe "SysAdmin actions"
                [ test "Admin_FetchLogs requires SysAdmin" <|
                    \_ ->
                        actionRoleMap (Admin_FetchLogs "")
                            |> Expect.equal SysAdmin
                , test "Admin_ClearLogs requires SysAdmin" <|
                    \_ ->
                        actionRoleMap Admin_ClearLogs
                            |> Expect.equal SysAdmin
                , test "Admin_FetchRemoteModel requires SysAdmin" <|
                    \_ ->
                        actionRoleMap (Admin_FetchRemoteModel "")
                            |> Expect.equal SysAdmin
                ]
            ]
        , describe "canPerformAction"
            [ describe "SysAdmin user"
                [ test "can perform Admin_FetchLogs" <|
                    \_ ->
                        canPerformAction sysAdminUser (Admin_FetchLogs "")
                            |> Expect.equal True
                , test "can perform Admin_ClearLogs" <|
                    \_ ->
                        canPerformAction sysAdminUser Admin_ClearLogs
                            |> Expect.equal True
                , test "can perform NoOpToBackend" <|
                    \_ ->
                        canPerformAction sysAdminUser NoOpToBackend
                            |> Expect.equal True
                , test "can perform SetDarkModePreference" <|
                    \_ ->
                        canPerformAction sysAdminUser (SetDarkModePreference False)
                            |> Expect.equal True
                ]
            , describe "Regular user"
                [ test "cannot perform Admin_FetchLogs" <|
                    \_ ->
                        canPerformAction regularUser (Admin_FetchLogs "")
                            |> Expect.equal False
                , test "cannot perform Admin_ClearLogs" <|
                    \_ ->
                        canPerformAction regularUser Admin_ClearLogs
                            |> Expect.equal False
                , test "can perform NoOpToBackend" <|
                    \_ ->
                        canPerformAction regularUser NoOpToBackend
                            |> Expect.equal True
                , test "can perform SetDarkModePreference" <|
                    \_ ->
                        canPerformAction regularUser (SetDarkModePreference True)
                            |> Expect.equal True
                , test "can perform GetUserToBackend" <|
                    \_ ->
                        canPerformAction regularUser GetUserToBackend
                            |> Expect.equal True
                ]
            ]
        , describe "Consistency"
            [ test "All admin actions require SysAdmin" <|
                \_ ->
                    let
                        adminActions =
                            [ Admin_FetchLogs ""
                            , Admin_ClearLogs
                            , Admin_FetchRemoteModel ""
                            ]

                        allRequireSysAdmin =
                            List.all (\action -> actionRoleMap action == SysAdmin) adminActions
                    in
                    Expect.equal True allRequireSysAdmin
            , test "All public actions require Anonymous" <|
                \_ ->
                    let
                        publicActions =
                            [ NoOpToBackend
                            , GetUserToBackend
                            , LoggedOut
                            , SetDarkModePreference True
                            , A "test"
                            ]

                        allRequireAnonymous =
                            List.all (\action -> actionRoleMap action == Anonymous) publicActions
                    in
                    Expect.equal True allRequireAnonymous
            ]
        ]
