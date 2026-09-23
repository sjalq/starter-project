module Rights.Permissions exposing (actionRoleMap, canPerformAction, sessionCanPerformAction)

import Dict
import Rights.Role as Role
import Rights.User exposing (getUserRole)
import Types exposing (BackendModel, BrowserCookie, Role(..), ToBackend(..), User)


{-| Maps ToBackend messages to the minimum role required to perform them
-}
actionRoleMap : ToBackend -> Role
actionRoleMap msg =
    case msg of
        NoOpToBackend ->
            Anonymous

        Admin_FetchLogs _ ->
            SysAdmin

        Admin_ClearLogs ->
            SysAdmin

        AuthToBackend _ ->
            Anonymous

        EmailPasswordAuthToBackend _ ->
            Anonymous

        GetUserToBackend ->
            Anonymous

        LoggedOut ->
            Anonymous

        SetDarkModePreference _ ->
            Anonymous

        A _ ->
            Anonymous


{-| Checks if a user has permission to perform a specific backend action
-}
canPerformAction : User -> ToBackend -> Bool
canPerformAction user action =
    let
        userRole =
            getUserRole user

        requiredRole =
            actionRoleMap action
    in
    Role.roleHasAccess userRole requiredRole


{-| Get user from session and check if they can perform an action
-}
sessionCanPerformAction : BackendModel -> BrowserCookie -> ToBackend -> Bool
sessionCanPerformAction model browserCookie action =
    if actionRoleMap action == Anonymous then
        True

    else
        case Dict.get browserCookie model.sessions |> Maybe.andThen (\userInfo -> Dict.get userInfo.email model.users) of
            Just user ->
                canPerformAction user action

            Nothing ->
                False
