module Rights.User exposing (createUser, getUserRole, insertUser, isSysAdmin)

import Auth.Common
import Dict exposing (Dict)
import Env
import Types exposing (BackendModel, Email, Role(..), User, defaultAgentConfigs)


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


createUser : Auth.Common.UserInfo -> User
createUser userInfo =
    { email = userInfo.email
    }


insertUser : Email -> User -> BackendModel -> BackendModel
insertUser email newUser model =
    -- Create new user record
    let
        updatedUsers = 
            Dict.insert email newUser model.users
            
        -- Add default agent configs for the new user
        updatedAgentConfigs = 
            Dict.insert email defaultAgentConfigs model.userAgentConfigs
    in
    { model | users = updatedUsers, userAgentConfigs = updatedAgentConfigs }
