module Rights.Role exposing (roleHasAccess, roleToString)

import Types exposing (Role(..))


roleToString : Role -> String
roleToString role =
    case role of
        SysAdmin ->
            "SysAdmin"

        UserRole ->
            "User"

        Anonymous ->
            "Anonymous"


{-| Checks if a role has sufficient permissions for another role
-}
roleHasAccess : Role -> Role -> Bool
roleHasAccess userRole requiredRole =
    case ( userRole, requiredRole ) of
        ( SysAdmin, _ ) ->
            True

        ( UserRole, UserRole ) ->
            True

        ( UserRole, Anonymous ) ->
            True

        ( Anonymous, Anonymous ) ->
            True

        _ ->
            False
