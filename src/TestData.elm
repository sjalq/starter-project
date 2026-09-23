module TestData exposing (initializeTestData)

import Auth.Common
import Auth.PasswordHash
import Dict exposing (Dict)
import Env
import Types exposing (..)


{-| Demo SysAdmin account, seeded only when Env.mode is Development
-}
defaultUsers : Dict Email User
defaultUsers =
    Dict.fromList
        [ ( Env.sysAdminEmail
          , { email = Env.sysAdminEmail
            , name = Just "System Administrator"
            , preferences = defaultPreferences
            }
          )
        ]


{-| Default email/password credentials for test users
-}
defaultEmailPasswordCredentials : Dict Email EmailPasswordCredentials
defaultEmailPasswordCredentials =
    let
        -- Hash for password "admin"
        adminHash =
            Auth.PasswordHash.hashPassword "salt123" "admin"
    in
    Dict.fromList
        [ ( Env.sysAdminEmail
          , { email = Env.sysAdminEmail
            , passwordHash = adminHash.hash
            , passwordSalt = "salt123"
            , createdAt = 0
            }
          )
        ]


{-| Default auth sessions for test users (useful for testing)
-}
defaultSessions : Dict BrowserCookie Auth.Common.UserInfo
defaultSessions =
    Dict.empty


{-| Initialize backend model with test data
-}
initializeTestData : BackendModel -> BackendModel
initializeTestData model =
    { model
        | users = Dict.union defaultUsers model.users
        , emailPasswordCredentials = Dict.union defaultEmailPasswordCredentials model.emailPasswordCredentials
        , sessions = Dict.union defaultSessions model.sessions
    }
