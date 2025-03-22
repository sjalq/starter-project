module Fusion.Generated.TypeDict.Types exposing
    ( typeDict, type_BackendModel, type_Email, type_PollData, type_PollingStatus, type_PollingToken
    , type_User
    )

{-|
@docs typeDict, type_BackendModel, type_Email, type_PollData, type_PollingStatus, type_PollingToken
@docs type_User
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List String )
typeDict =
    Dict.fromList
        [ ( "PollData", ( type_PollData, [] ) )
        , ( "PollingStatus", ( type_PollingStatus, [ "a" ] ) )
        , ( "PollingToken", ( type_PollingToken, [] ) )
        , ( "User", ( type_User, [] ) )
        , ( "Email", ( type_Email, [] ) )
        , ( "BackendModel", ( type_BackendModel, [] ) )
        ]


type_BackendModel : Fusion.Type
type_BackendModel =
    Fusion.TRecord
        [ ( "logs"
          , Fusion.TNamed
                [ "List" ]
                "List"
                [ Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString) ]
                (Just
                     (Fusion.TList
                          (Fusion.TNamed
                               [ "String" ]
                               "String"
                               []
                               (Just Fusion.TString)
                          )
                     )
                )
          )
        , ( "pendingAuths"
          , Fusion.TNamed
                [ "Dict" ]
                "Dict"
                [ Fusion.TNamed [ "Lamdera" ] "SessionId" [] Nothing
                , Fusion.TNamed [ "Auth", "Common" ] "PendingAuth" [] Nothing
                ]
                (Just
                     (Fusion.TDict
                          (Fusion.TNamed [ "Lamdera" ] "SessionId" [] Nothing)
                          (Fusion.TNamed
                               [ "Auth", "Common" ]
                               "PendingAuth"
                               []
                               Nothing
                          )
                     )
                )
          )
        , ( "sessions"
          , Fusion.TNamed
                [ "Dict" ]
                "Dict"
                [ Fusion.TNamed [ "Lamdera" ] "SessionId" [] Nothing
                , Fusion.TNamed [ "Auth", "Common" ] "UserInfo" [] Nothing
                ]
                (Just
                     (Fusion.TDict
                          (Fusion.TNamed [ "Lamdera" ] "SessionId" [] Nothing)
                          (Fusion.TNamed
                               [ "Auth", "Common" ]
                               "UserInfo"
                               []
                               Nothing
                          )
                     )
                )
          )
        , ( "users"
          , Fusion.TNamed
                [ "Dict" ]
                "Dict"
                [ Fusion.TNamed [ "Types" ] "Email" [] Nothing
                , Fusion.TNamed [ "Types" ] "User" [] Nothing
                ]
                (Just
                     (Fusion.TDict
                          (Fusion.TNamed [ "Types" ] "Email" [] Nothing)
                          (Fusion.TNamed [ "Types" ] "User" [] Nothing)
                     )
                )
          )
        , ( "pollingJobs"
          , Fusion.TNamed
                [ "Dict" ]
                "Dict"
                [ Fusion.TNamed [ "Types" ] "PollingToken" [] Nothing
                , Fusion.TNamed
                    [ "Types" ]
                    "PollingStatus"
                    [ Fusion.TNamed [ "Types" ] "PollData" [] Nothing ]
                    Nothing
                ]
                (Just
                     (Fusion.TDict
                          (Fusion.TNamed [ "Types" ] "PollingToken" [] Nothing)
                          (Fusion.TNamed
                               [ "Types" ]
                               "PollingStatus"
                               [ Fusion.TNamed [ "Types" ] "PollData" [] Nothing
                               ]
                               Nothing
                          )
                     )
                )
          )
        ]


type_Email : Fusion.Type
type_Email =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)


type_PollData : Fusion.Type
type_PollData =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)


type_PollingStatus : Fusion.Type
type_PollingStatus =
    Fusion.TCustom
        "PollingStatus"
        [ "a" ]
        [ ( "Busy", [] )
        , ( "BusyWithTime"
          , [ Fusion.TNamed [ "Basics" ] "Int" [] (Just Fusion.TInt) ]
          )
        , ( "Ready"
          , [ Fusion.TNamed
                [ "Result" ]
                "Result"
                [ Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
                , Fusion.TVar "a"
                ]
                (Just
                   (Fusion.TResult
                      (Fusion.TNamed
                         [ "String" ]
                         "String"
                         []
                         (Just Fusion.TString)
                      )
                      (Fusion.TVar "a")
                   )
                )
            ]
          )
        ]


type_PollingToken : Fusion.Type
type_PollingToken =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)


type_User : Fusion.Type
type_User =
    Fusion.TRecord [ ( "email", Fusion.TNamed [ "Types" ] "Email" [] Nothing ) ]