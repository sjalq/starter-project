module Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)

import Auth.Common
import Dict
import Env
import Types exposing (BackendModel, Email, Preferences, Role(..), User)


isSysAdmin : User -> Bool
isSysAdmin user =
    -- Check if email is admin or sysAdmin email
    user.email == Env.sysAdminEmail


getUserRole : User -> Role
getUserRole user =
    if isSysAdmin user then
        SysAdmin

    else
        UserRole


createUser : Auth.Common.UserInfo -> Preferences -> User
createUser userInfo initialPreferences =
    { email = userInfo.email
    , name = userInfo.name
    , preferences = initialPreferences
    }


insertUser : Email -> User -> BackendModel -> BackendModel
insertUser email newUser model =
    { model | users = Dict.insert email newUser model.users }
