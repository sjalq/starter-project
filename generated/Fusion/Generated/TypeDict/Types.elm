module Fusion.Generated.TypeDict.Types exposing
    ( typeDict, type_AgentConfig, type_AgentConfigId, type_AgentProvider, type_BackendModel, type_Email
    , type_PollData, type_PollingStatus, type_PollingToken, type_User, type_UserAgentConfigs
    )

{-|
@docs typeDict, type_AgentConfig, type_AgentConfigId, type_AgentProvider, type_BackendModel, type_Email
@docs type_PollData, type_PollingStatus, type_PollingToken, type_User, type_UserAgentConfigs
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List String )
typeDict =
    Dict.fromList
        [ ( "AgentProvider", ( type_AgentProvider, [] ) )
        , ( "AgentConfig", ( type_AgentConfig, [] ) )
        , ( "AgentConfigId", ( type_AgentConfigId, [] ) )
        , ( "UserAgentConfigs", ( type_UserAgentConfigs, [] ) )
        , ( "PollData", ( type_PollData, [] ) )
        , ( "PollingStatus", ( type_PollingStatus, [ "a" ] ) )
        , ( "PollingToken", ( type_PollingToken, [] ) )
        , ( "User", ( type_User, [] ) )
        , ( "Email", ( type_Email, [] ) )
        , ( "BackendModel", ( type_BackendModel, [] ) )
        ]


type_AgentConfig : Fusion.Type
type_AgentConfig =
    Fusion.TRecord
        [ ( "id", Fusion.TNamed [ "Types" ] "AgentConfigId" [] Nothing )
        , ( "name"
          , Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
          )
        , ( "provider", Fusion.TNamed [ "Types" ] "AgentProvider" [] Nothing )
        , ( "endpoint"
          , Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
          )
        , ( "apiKey"
          , Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
          )
        ]


type_AgentConfigId : Fusion.Type
type_AgentConfigId =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)


type_AgentProvider : Fusion.Type
type_AgentProvider =
    Fusion.TCustom
        "AgentProvider"
        []
        [ ( "OpenAI", [] )
        , ( "Anthropic", [] )
        , ( "GoogleGemini", [] )
        , ( "OtherProvider"
          , [ Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString) ]
          )
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
        , ( "userAgentConfigs"
          , Fusion.TNamed
                [ "Dict" ]
                "Dict"
                [ Fusion.TNamed [ "Types" ] "Email" [] Nothing
                , Fusion.TNamed [ "Types" ] "UserAgentConfigs" [] Nothing
                ]
                (Just
                     (Fusion.TDict
                          (Fusion.TNamed [ "Types" ] "Email" [] Nothing)
                          (Fusion.TNamed
                               [ "Types" ]
                               "UserAgentConfigs"
                               []
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


type_UserAgentConfigs : Fusion.Type
type_UserAgentConfigs =
    Fusion.TNamed
        [ "Dict" ]
        "Dict"
        [ Fusion.TNamed [ "Types" ] "AgentConfigId" [] Nothing
        , Fusion.TNamed [ "Types" ] "AgentConfig" [] Nothing
        ]
        (Just
             (Fusion.TDict
                  (Fusion.TNamed [ "Types" ] "AgentConfigId" [] Nothing)
                  (Fusion.TNamed [ "Types" ] "AgentConfig" [] Nothing)
             )
        )