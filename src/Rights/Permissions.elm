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

        Admin_FetchLogs ->
            SysAdmin

        Admin_ClearLogs ->
            SysAdmin

        Admin_FetchRemoteModel _ ->
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

        -- Allow anyone to set their own preference
        A00_WebSocketReceive _ ->
            Anonymous



-- Allow anyone to send websocket messages
-- Fusion_PersistPatch _ ->
--     SysAdmin
-- Fusion_Query _ ->
--     SysAdmin


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
    case Dict.get browserCookie model.sessions of
        Just userInfo ->
            case Dict.get userInfo.email model.users of
                Just user ->
                    canPerformAction user action

                Nothing ->
                    False

        Nothing ->
            -- Only anonymous actions allowed without session
            actionRoleMap action == Anonymous
