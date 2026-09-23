module Helpers.TestModels exposing
    ( emptyBackendModel
    , regularUser
    , sysAdminUser
    )

import Dict
import Logger
import Types exposing (BackendModel, Preferences, User)



-- USER BUILDERS


regularUser : User
regularUser =
    { email = "user@example.com"
    , name = Just "Regular User"
    , preferences = defaultPreferences
    }


sysAdminUser : User
sysAdminUser =
    { email = "admin@example.com"
    , name = Just "System Administrator"
    , preferences = defaultPreferences
    }


defaultPreferences : Preferences
defaultPreferences =
    { darkMode = True }



-- BACKEND MODEL BUILDERS


emptyBackendModel : BackendModel
emptyBackendModel =
    { logState = Logger.init 100
    , pendingAuths = Dict.empty
    , sessions = Dict.empty
    , users = Dict.empty
    , emailPasswordCredentials = Dict.empty
    , pollingJobs = Dict.empty
    }
