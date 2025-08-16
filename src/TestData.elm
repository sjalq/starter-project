module TestData exposing (initializeTestData)

import Auth.Common
import Auth.PasswordHash
import Dict exposing (Dict)
import Types exposing (..)


{-| Default test users for development and demo purposes
-}
defaultUsers : Dict Email User
defaultUsers =
    Dict.fromList
        [ ( "sys@admin.com"
          , { email = "sys@admin.com"
            , name = Just "System Administrator"
            , preferences = { darkMode = True }
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
        [ ( "sys@admin.com"
          , { email = "sys@admin.com"
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
