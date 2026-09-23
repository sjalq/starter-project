module Property.PermissionsTests exposing (suite)

import Auth.Common
import Dict
import Expect
import Helpers.TestModels exposing (emptyBackendModel, regularUser, sysAdminUser)
import Rights.Permissions exposing (actionRoleMap, canPerformAction, sessionCanPerformAction)
import Test exposing (..)
import Types exposing (BackendModel, Role(..), ToBackend(..), User)


publicActions : List ToBackend
publicActions =
    [ NoOpToBackend
    , AuthToBackend Auth.Common.AuthRenewSessionRequested
    , GetUserToBackend
    , LoggedOut
    , SetDarkModePreference True
    , A "websocket message"
    ]


adminActions : List ToBackend
adminActions =
    [ Admin_FetchLogs ""
    , Admin_ClearLogs
    ]


suite : Test
suite =
    describe "Permissions"
        [ describe "actionRoleMap"
            [ test "public actions require Anonymous" <|
                \_ ->
                    List.map actionRoleMap publicActions
                        |> Expect.equalLists (List.map (always Anonymous) publicActions)
            , test "admin actions require SysAdmin" <|
                \_ ->
                    List.map actionRoleMap adminActions
                        |> Expect.equalLists (List.map (always SysAdmin) adminActions)
            ]
        , describe "canPerformAction"
            [ test "SysAdmin can perform every action" <|
                \_ ->
                    List.all (canPerformAction sysAdminUser) (publicActions ++ adminActions)
                        |> Expect.equal True
            , test "regular user can perform public actions" <|
                \_ ->
                    List.all (canPerformAction regularUser) publicActions
                        |> Expect.equal True
            , test "regular user cannot perform admin actions" <|
                \_ ->
                    List.any (canPerformAction regularUser) adminActions
                        |> Expect.equal False
            ]
        , describe "sessionCanPerformAction"
            [ test "anonymous session can perform public actions" <|
                \_ ->
                    List.all (sessionCanPerformAction emptyBackendModel "anonymous-cookie") publicActions
                        |> Expect.equal True
            , test "anonymous session cannot perform admin actions" <|
                \_ ->
                    List.any (sessionCanPerformAction emptyBackendModel "anonymous-cookie") adminActions
                        |> Expect.equal False
            , test "session with no matching user record can still perform public actions" <|
                \_ ->
                    List.all (sessionCanPerformAction (withSessionOnly "orphan-cookie" regularUser) "orphan-cookie") publicActions
                        |> Expect.equal True
            , test "SysAdmin session can perform admin actions" <|
                \_ ->
                    List.all (sessionCanPerformAction (withSession "admin-cookie" sysAdminUser) "admin-cookie") adminActions
                        |> Expect.equal True
            , test "regular user session cannot perform admin actions" <|
                \_ ->
                    List.any (sessionCanPerformAction (withSession "user-cookie" regularUser) "user-cookie") adminActions
                        |> Expect.equal False
            ]
        ]


withSessionOnly : String -> User -> BackendModel
withSessionOnly cookie user =
    { emptyBackendModel
        | sessions =
            Dict.singleton cookie
                { email = user.email, name = user.name, username = Nothing, picture = Nothing }
    }


withSession : String -> User -> BackendModel
withSession cookie user =
    let
        model =
            withSessionOnly cookie user
    in
    { model | users = Dict.singleton user.email user }
