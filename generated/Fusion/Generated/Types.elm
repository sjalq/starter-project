module Fusion.Generated.Types exposing
    ( build_AgentConfig, build_AgentConfigId, build_AgentId, build_AgentProvider, build_BackendModel, build_BrowserCookie
    , build_ChatMessage, build_Email, build_MessageSender, build_PollData, build_PollingStatus, build_PollingToken, build_User
    , build_UserAgentConfigs, patch_AgentConfig, patch_AgentConfigId, patch_AgentId, patch_AgentProvider, patch_BackendModel, patch_BrowserCookie
    , patch_ChatMessage, patch_Email, patch_MessageSender, patch_PollData, patch_PollingStatus, patch_PollingToken, patch_User
    , patch_UserAgentConfigs, patcher_AgentConfig, patcher_AgentConfigId, patcher_AgentId, patcher_AgentProvider, patcher_BackendModel, patcher_BrowserCookie
    , patcher_ChatMessage, patcher_Email, patcher_MessageSender, patcher_PollData, patcher_PollingStatus, patcher_PollingToken, patcher_User
    , patcher_UserAgentConfigs, toValue_AgentConfig, toValue_AgentConfigId, toValue_AgentId, toValue_AgentProvider, toValue_BackendModel, toValue_BrowserCookie
    , toValue_ChatMessage, toValue_Email, toValue_MessageSender, toValue_PollData, toValue_PollingStatus, toValue_PollingToken, toValue_User
    , toValue_UserAgentConfigs
    )

{-|
@docs build_AgentConfig, build_AgentConfigId, build_AgentId, build_AgentProvider, build_BackendModel, build_BrowserCookie
@docs build_ChatMessage, build_Email, build_MessageSender, build_PollData, build_PollingStatus, build_PollingToken
@docs build_User, build_UserAgentConfigs, patch_AgentConfig, patch_AgentConfigId, patch_AgentId, patch_AgentProvider
@docs patch_BackendModel, patch_BrowserCookie, patch_ChatMessage, patch_Email, patch_MessageSender, patch_PollData
@docs patch_PollingStatus, patch_PollingToken, patch_User, patch_UserAgentConfigs, patcher_AgentConfig, patcher_AgentConfigId
@docs patcher_AgentId, patcher_AgentProvider, patcher_BackendModel, patcher_BrowserCookie, patcher_ChatMessage, patcher_Email
@docs patcher_MessageSender, patcher_PollData, patcher_PollingStatus, patcher_PollingToken, patcher_User, patcher_UserAgentConfigs
@docs toValue_AgentConfig, toValue_AgentConfigId, toValue_AgentId, toValue_AgentProvider, toValue_BackendModel, toValue_BrowserCookie
@docs toValue_ChatMessage, toValue_Email, toValue_MessageSender, toValue_PollData, toValue_PollingStatus, toValue_PollingToken
@docs toValue_User, toValue_UserAgentConfigs
-}


import Dict
import Fusion
import Fusion.Generated.Auth.Common
import Fusion.Generated.Lamdera
import Fusion.Generated.Maybe
import Fusion.Generated.Result
import Fusion.Patch
import Result.Extra
import Types


build_AgentConfig : Fusion.Value -> Result Fusion.Patch.Error Types.AgentConfig
build_AgentConfig value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map5
                 (\id name provider endpoint apiKey ->
                      { id = id
                      , name = name
                      , provider = provider
                      , endpoint = endpoint
                      , apiKey = apiKey
                      }
                 )
                 (Result.andThen build_AgentConfigId (build_RecordUnpack "id"))
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "name")
                 )
                 (Result.andThen
                      build_AgentProvider
                      (build_RecordUnpack "provider")
                 )
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "endpoint")
                 )
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "apiKey")
                 )
        )
        value


build_AgentConfigId :
    Fusion.Value -> Result Fusion.Patch.Error Types.AgentConfigId
build_AgentConfigId value =
    Fusion.Patch.build_String value


build_AgentId : Fusion.Value -> Result Fusion.Patch.Error Types.AgentId
build_AgentId value =
    Fusion.Patch.build_String value


build_AgentProvider :
    Fusion.Value -> Result Fusion.Patch.Error Types.AgentProvider
build_AgentProvider value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "OpenAI", [] ) ->
                     Result.Ok Types.OpenAI

                 ( "Anthropic", [] ) ->
                     Result.Ok Types.Anthropic

                 ( "GoogleGemini", [] ) ->
                     Result.Ok Types.GoogleGemini

                 ( "OtherProvider", [ patch0 ] ) ->
                     Result.map
                         Types.OtherProvider
                         (Fusion.Patch.build_String patch0)

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


build_BackendModel :
    Fusion.Value -> Result Fusion.Patch.Error Types.BackendModel
build_BackendModel value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.Ok
                 (\logs pendingAuths sessions users pollingJobs userAgentConfigs chatHistories ->
                      { logs = logs
                      , pendingAuths = pendingAuths
                      , sessions = sessions
                      , users = users
                      , pollingJobs = pollingJobs
                      , userAgentConfigs = userAgentConfigs
                      , chatHistories = chatHistories
                      }
                 ) |> Result.Extra.andMap
                              (Result.andThen
                                       (Fusion.Patch.build_List
                                                Fusion.Patch.patcher_String
                                       )
                                       (build_RecordUnpack "logs")
                              ) |> Result.Extra.andMap
                                           (Result.andThen
                                                    (Fusion.Patch.build_Dict
                                                             Fusion.Generated.Lamdera.patcher_SessionId
                                                             Fusion.Generated.Auth.Common.patcher_PendingAuth
                                                    )
                                                    (build_RecordUnpack
                                                             "pendingAuths"
                                                    )
                                           ) |> Result.Extra.andMap
                                                        (Result.andThen
                                                                 (Fusion.Patch.build_Dict
                                                                          Fusion.Generated.Lamdera.patcher_SessionId
                                                                          Fusion.Generated.Auth.Common.patcher_UserInfo
                                                                 )
                                                                 (build_RecordUnpack
                                                                          "sessions"
                                                                 )
                                                        ) |> Result.Extra.andMap
                                                                     (Result.andThen
                                                                              (Fusion.Patch.build_Dict
                                                                                       patcher_Email
                                                                                       patcher_User
                                                                              )
                                                                              (build_RecordUnpack
                                                                                       "users"
                                                                              )
                                                                     ) |> Result.Extra.andMap
                                                                                  (Result.andThen
                                                                                           (Fusion.Patch.build_Dict
                                                                                                    patcher_PollingToken
                                                                                                    (patcher_PollingStatus
                                                                                                             patcher_PollData
                                                                                                    )
                                                                                           )
                                                                                           (build_RecordUnpack
                                                                                                    "pollingJobs"
                                                                                           )
                                                                                  ) |> Result.Extra.andMap
                                                                                               (Result.andThen
                                                                                                        (Fusion.Patch.build_Dict
                                                                                                                 patcher_Email
                                                                                                                 patcher_UserAgentConfigs
                                                                                                        )
                                                                                                        (build_RecordUnpack
                                                                                                                 "userAgentConfigs"
                                                                                                        )
                                                                                               ) |> Result.Extra.andMap
                                                                                                            (Result.andThen
                                                                                                                     (Fusion.Patch.build_Dict
                                                                                                                              patcher_BrowserCookie
                                                                                                                              (Fusion.Patch.patcher_List
                                                                                                                                       patcher_ChatMessage
                                                                                                                              )
                                                                                                                     )
                                                                                                                     (build_RecordUnpack
                                                                                                                              "chatHistories"
                                                                                                                     )
                                                                                                            )
        )
        value


build_BrowserCookie :
    Fusion.Value -> Result Fusion.Patch.Error Types.BrowserCookie
build_BrowserCookie value =
    Fusion.Generated.Lamdera.build_SessionId value


build_ChatMessage : Fusion.Value -> Result Fusion.Patch.Error Types.ChatMessage
build_ChatMessage value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map2
                 (\sender text -> { sender = sender, text = text })
                 (Result.andThen
                      build_MessageSender
                      (build_RecordUnpack "sender")
                 )
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "text")
                 )
        )
        value


build_Email : Fusion.Value -> Result Fusion.Patch.Error Types.Email
build_Email value =
    Fusion.Patch.build_String value


build_MessageSender :
    Fusion.Value -> Result Fusion.Patch.Error Types.MessageSender
build_MessageSender value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "UserSender", [] ) ->
                     Result.Ok Types.UserSender

                 ( "AgentSender", [ patch0 ] ) ->
                     Result.map Types.AgentSender (build_AgentId patch0)

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


build_PollData : Fusion.Value -> Result Fusion.Patch.Error Types.PollData
build_PollData value =
    Fusion.Patch.build_String value


build_PollingStatus :
    Fusion.Patch.Patcher a
    -> Fusion.Value
    -> Result Fusion.Patch.Error (Types.PollingStatus a)
build_PollingStatus aPatcher value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "Busy", [] ) ->
                     Result.Ok Types.Busy

                 ( "BusyWithTime", [ patch0 ] ) ->
                     Result.map
                         Types.BusyWithTime
                         (Fusion.Patch.build_Int patch0)

                 ( "Ready", [ patch0 ] ) ->
                     Result.map
                         Types.Ready
                         ((Fusion.Generated.Result.build_Result
                               Fusion.Patch.patcher_String
                               aPatcher
                          )
                              patch0
                         )

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


build_PollingToken :
    Fusion.Value -> Result Fusion.Patch.Error Types.PollingToken
build_PollingToken value =
    Fusion.Patch.build_String value


build_User : Fusion.Value -> Result Fusion.Patch.Error Types.User
build_User value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map
                 (\email -> { email = email })
                 (Result.andThen build_Email (build_RecordUnpack "email"))
        )
        value


build_UserAgentConfigs :
    Fusion.Value -> Result Fusion.Patch.Error Types.UserAgentConfigs
build_UserAgentConfigs value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map2
                 (\configs defaultId ->
                      { configs = configs, defaultId = defaultId }
                 )
                 (Result.andThen
                      (Fusion.Patch.build_Dict
                           patcher_AgentConfigId
                           patcher_AgentConfig
                      )
                      (build_RecordUnpack "configs")
                 )
                 (Result.andThen
                      (Fusion.Generated.Maybe.build_Maybe patcher_AgentConfigId)
                      (build_RecordUnpack "defaultId")
                 )
        )
        value


patch_AgentConfig :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.AgentConfig
    -> Result Fusion.Patch.Error Types.AgentConfig
patch_AgentConfig options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "id" ->
                     Result.map
                         (\id -> { acc | id = id })
                         (patch_AgentConfigId options fieldPatch acc.id)

                 "name" ->
                     Result.map
                         (\name -> { acc | name = name })
                         (Fusion.Patch.patch_String options fieldPatch acc.name)

                 "provider" ->
                     Result.map
                         (\provider -> { acc | provider = provider })
                         (patch_AgentProvider options fieldPatch acc.provider)

                 "endpoint" ->
                     Result.map
                         (\endpoint -> { acc | endpoint = endpoint })
                         (Fusion.Patch.patch_String
                              options
                              fieldPatch
                              acc.endpoint
                         )

                 "apiKey" ->
                     Result.map
                         (\apiKey -> { acc | apiKey = apiKey })
                         (Fusion.Patch.patch_String
                              options
                              fieldPatch
                              acc.apiKey
                         )

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patch_AgentConfigId :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.AgentConfigId
    -> Result Fusion.Patch.Error Types.AgentConfigId
patch_AgentConfigId options patch value =
    Fusion.Patch.patch_String options patch value


patch_AgentId :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.AgentId
    -> Result Fusion.Patch.Error Types.AgentId
patch_AgentId options patch value =
    Fusion.Patch.patch_String options patch value


patch_AgentProvider :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.AgentProvider
    -> Result Fusion.Patch.Error Types.AgentProvider
patch_AgentProvider options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Types.OpenAI, "OpenAI" ) ->
                    True

                ( Types.Anthropic, "Anthropic" ) ->
                    True

                ( Types.GoogleGemini, "GoogleGemini" ) ->
                    True

                ( Types.OtherProvider _, "OtherProvider" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Types.OpenAI, Fusion.Patch.PCustomSame "OpenAI" [], _ ) ->
            Result.Ok Types.OpenAI

        ( _, Fusion.Patch.PCustomSame "OpenAI" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "OpenAI" [], _ ) ->
            Result.Ok Types.OpenAI

        ( Types.Anthropic, Fusion.Patch.PCustomSame "Anthropic" [], _ ) ->
            Result.Ok Types.Anthropic

        ( _, Fusion.Patch.PCustomSame "Anthropic" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Anthropic" [], _ ) ->
            Result.Ok Types.Anthropic

        ( Types.GoogleGemini, Fusion.Patch.PCustomSame "GoogleGemini" [], _ ) ->
            Result.Ok Types.GoogleGemini

        ( _, Fusion.Patch.PCustomSame "GoogleGemini" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "GoogleGemini" [], _ ) ->
            Result.Ok Types.GoogleGemini

        ( Types.OtherProvider arg0, Fusion.Patch.PCustomSame "OtherProvider" [ patch0 ], _ ) ->
            Result.map
                Types.OtherProvider
                (Fusion.Patch.maybeApply
                     Fusion.Patch.patcher_String
                     options
                     patch0
                     arg0
                )

        ( _, Fusion.Patch.PCustomSame "OtherProvider" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "OtherProvider" [ (Just patch0) ], _ ) ->
            Result.map
                Types.OtherProvider
                (Fusion.Patch.buildFromPatch Fusion.Patch.build_String patch0)

        ( _, Fusion.Patch.PCustomSame "OtherProvider" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "OpenAI" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Types.OpenAI

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "Anthropic" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Types.Anthropic

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "GoogleGemini" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Types.GoogleGemini

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "OtherProvider" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Types.OtherProvider (Fusion.Patch.build_String arg0)

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patch_BackendModel :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.BackendModel
    -> Result Fusion.Patch.Error Types.BackendModel
patch_BackendModel options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "logs" ->
                     Result.map
                         (\logs -> { acc | logs = logs })
                         (Fusion.Patch.patch_List
                              Fusion.Patch.patcher_String
                              options
                              fieldPatch
                              acc.logs
                         )

                 "pendingAuths" ->
                     Result.map
                         (\pendingAuths -> { acc | pendingAuths = pendingAuths }
                         )
                         (Fusion.Patch.patch_Dict
                              Fusion.Generated.Lamdera.patcher_SessionId
                              Fusion.Generated.Auth.Common.patcher_PendingAuth
                              options
                              fieldPatch
                              acc.pendingAuths
                         )

                 "sessions" ->
                     Result.map
                         (\sessions -> { acc | sessions = sessions })
                         (Fusion.Patch.patch_Dict
                              Fusion.Generated.Lamdera.patcher_SessionId
                              Fusion.Generated.Auth.Common.patcher_UserInfo
                              options
                              fieldPatch
                              acc.sessions
                         )

                 "users" ->
                     Result.map
                         (\users -> { acc | users = users })
                         (Fusion.Patch.patch_Dict
                              patcher_Email
                              patcher_User
                              options
                              fieldPatch
                              acc.users
                         )

                 "pollingJobs" ->
                     Result.map
                         (\pollingJobs -> { acc | pollingJobs = pollingJobs })
                         (Fusion.Patch.patch_Dict
                              patcher_PollingToken
                              (patcher_PollingStatus patcher_PollData)
                              options
                              fieldPatch
                              acc.pollingJobs
                         )

                 "userAgentConfigs" ->
                     Result.map
                         (\userAgentConfigs ->
                              { acc | userAgentConfigs = userAgentConfigs }
                         )
                         (Fusion.Patch.patch_Dict
                              patcher_Email
                              patcher_UserAgentConfigs
                              options
                              fieldPatch
                              acc.userAgentConfigs
                         )

                 "chatHistories" ->
                     Result.map
                         (\chatHistories ->
                              { acc | chatHistories = chatHistories }
                         )
                         (Fusion.Patch.patch_Dict
                              patcher_BrowserCookie
                              (Fusion.Patch.patcher_List patcher_ChatMessage)
                              options
                              fieldPatch
                              acc.chatHistories
                         )

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patch_BrowserCookie :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.BrowserCookie
    -> Result Fusion.Patch.Error Types.BrowserCookie
patch_BrowserCookie options patch value =
    Fusion.Generated.Lamdera.patch_SessionId options patch value


patch_ChatMessage :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.ChatMessage
    -> Result Fusion.Patch.Error Types.ChatMessage
patch_ChatMessage options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "sender" ->
                     Result.map
                         (\sender -> { acc | sender = sender })
                         (patch_MessageSender options fieldPatch acc.sender)

                 "text" ->
                     Result.map
                         (\text -> { acc | text = text })
                         (Fusion.Patch.patch_String options fieldPatch acc.text)

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patch_Email :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.Email
    -> Result Fusion.Patch.Error Types.Email
patch_Email options patch value =
    Fusion.Patch.patch_String options patch value


patch_MessageSender :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.MessageSender
    -> Result Fusion.Patch.Error Types.MessageSender
patch_MessageSender options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Types.UserSender, "UserSender" ) ->
                    True

                ( Types.AgentSender _, "AgentSender" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Types.UserSender, Fusion.Patch.PCustomSame "UserSender" [], _ ) ->
            Result.Ok Types.UserSender

        ( _, Fusion.Patch.PCustomSame "UserSender" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "UserSender" [], _ ) ->
            Result.Ok Types.UserSender

        ( Types.AgentSender arg0, Fusion.Patch.PCustomSame "AgentSender" [ patch0 ], _ ) ->
            Result.map
                Types.AgentSender
                (Fusion.Patch.maybeApply patcher_AgentId options patch0 arg0)

        ( _, Fusion.Patch.PCustomSame "AgentSender" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "AgentSender" [ (Just patch0) ], _ ) ->
            Result.map
                Types.AgentSender
                (Fusion.Patch.buildFromPatch build_AgentId patch0)

        ( _, Fusion.Patch.PCustomSame "AgentSender" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "UserSender" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Types.UserSender

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "AgentSender" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Types.AgentSender (build_AgentId arg0)

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patch_PollData :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.PollData
    -> Result Fusion.Patch.Error Types.PollData
patch_PollData options patch value =
    Fusion.Patch.patch_String options patch value


patch_PollingStatus :
    Fusion.Patch.Patcher a
    -> { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.PollingStatus a
    -> Result Fusion.Patch.Error (Types.PollingStatus a)
patch_PollingStatus aPatcher options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Types.Busy, "Busy" ) ->
                    True

                ( Types.BusyWithTime _, "BusyWithTime" ) ->
                    True

                ( Types.Ready _, "Ready" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Types.Busy, Fusion.Patch.PCustomSame "Busy" [], _ ) ->
            Result.Ok Types.Busy

        ( _, Fusion.Patch.PCustomSame "Busy" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Busy" [], _ ) ->
            Result.Ok Types.Busy

        ( Types.BusyWithTime arg0, Fusion.Patch.PCustomSame "BusyWithTime" [ patch0 ], _ ) ->
            Result.map
                Types.BusyWithTime
                (Fusion.Patch.maybeApply
                     Fusion.Patch.patcher_Int
                     options
                     patch0
                     arg0
                )

        ( _, Fusion.Patch.PCustomSame "BusyWithTime" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "BusyWithTime" [ (Just patch0) ], _ ) ->
            Result.map
                Types.BusyWithTime
                (Fusion.Patch.buildFromPatch Fusion.Patch.build_Int patch0)

        ( _, Fusion.Patch.PCustomSame "BusyWithTime" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( Types.Ready arg0, Fusion.Patch.PCustomSame "Ready" [ patch0 ], _ ) ->
            Result.map
                Types.Ready
                (Fusion.Patch.maybeApply
                     (Fusion.Generated.Result.patcher_Result
                          Fusion.Patch.patcher_String
                          aPatcher
                     )
                     options
                     patch0
                     arg0
                )

        ( _, Fusion.Patch.PCustomSame "Ready" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Ready" [ (Just patch0) ], _ ) ->
            Result.map
                Types.Ready
                (Fusion.Patch.buildFromPatch
                     (Fusion.Generated.Result.build_Result
                          Fusion.Patch.patcher_String
                          aPatcher
                     )
                     patch0
                )

        ( _, Fusion.Patch.PCustomSame "Ready" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "Busy" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Types.Busy

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "BusyWithTime" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Types.BusyWithTime (Fusion.Patch.build_Int arg0)

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "Ready" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map
                    Types.Ready
                    ((Fusion.Generated.Result.build_Result
                          Fusion.Patch.patcher_String
                          aPatcher
                     )
                         arg0
                    )

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patch_PollingToken :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.PollingToken
    -> Result Fusion.Patch.Error Types.PollingToken
patch_PollingToken options patch value =
    Fusion.Patch.patch_String options patch value


patch_User :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.User
    -> Result Fusion.Patch.Error Types.User
patch_User options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "email" ->
                     Result.map
                         (\email -> { acc | email = email })
                         (patch_Email options fieldPatch acc.email)

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patch_UserAgentConfigs :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Types.UserAgentConfigs
    -> Result Fusion.Patch.Error Types.UserAgentConfigs
patch_UserAgentConfigs options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "configs" ->
                     Result.map
                         (\configs -> { acc | configs = configs })
                         (Fusion.Patch.patch_Dict
                              patcher_AgentConfigId
                              patcher_AgentConfig
                              options
                              fieldPatch
                              acc.configs
                         )

                 "defaultId" ->
                     Result.map
                         (\defaultId -> { acc | defaultId = defaultId })
                         ((Fusion.Generated.Maybe.patch_Maybe
                               patcher_AgentConfigId
                          )
                              options
                              fieldPatch
                              acc.defaultId
                         )

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patcher_AgentConfig : Fusion.Patch.Patcher Types.AgentConfig
patcher_AgentConfig =
    { patch = patch_AgentConfig
    , build = build_AgentConfig
    , toValue = toValue_AgentConfig
    }


patcher_AgentConfigId : Fusion.Patch.Patcher Types.AgentConfigId
patcher_AgentConfigId =
    { patch = patch_AgentConfigId
    , build = build_AgentConfigId
    , toValue = toValue_AgentConfigId
    }


patcher_AgentId : Fusion.Patch.Patcher Types.AgentId
patcher_AgentId =
    { patch = patch_AgentId, build = build_AgentId, toValue = toValue_AgentId }


patcher_AgentProvider : Fusion.Patch.Patcher Types.AgentProvider
patcher_AgentProvider =
    { patch = patch_AgentProvider
    , build = build_AgentProvider
    , toValue = toValue_AgentProvider
    }


patcher_BackendModel : Fusion.Patch.Patcher Types.BackendModel
patcher_BackendModel =
    { patch = patch_BackendModel
    , build = build_BackendModel
    , toValue = toValue_BackendModel
    }


patcher_BrowserCookie : Fusion.Patch.Patcher Types.BrowserCookie
patcher_BrowserCookie =
    { patch = patch_BrowserCookie
    , build = build_BrowserCookie
    , toValue = toValue_BrowserCookie
    }


patcher_ChatMessage : Fusion.Patch.Patcher Types.ChatMessage
patcher_ChatMessage =
    { patch = patch_ChatMessage
    , build = build_ChatMessage
    , toValue = toValue_ChatMessage
    }


patcher_Email : Fusion.Patch.Patcher Types.Email
patcher_Email =
    { patch = patch_Email, build = build_Email, toValue = toValue_Email }


patcher_MessageSender : Fusion.Patch.Patcher Types.MessageSender
patcher_MessageSender =
    { patch = patch_MessageSender
    , build = build_MessageSender
    , toValue = toValue_MessageSender
    }


patcher_PollData : Fusion.Patch.Patcher Types.PollData
patcher_PollData =
    { patch = patch_PollData
    , build = build_PollData
    , toValue = toValue_PollData
    }


patcher_PollingStatus :
    Fusion.Patch.Patcher a -> Fusion.Patch.Patcher (Types.PollingStatus a)
patcher_PollingStatus aPatcher =
    { patch = patch_PollingStatus aPatcher
    , build = build_PollingStatus aPatcher
    , toValue = toValue_PollingStatus aPatcher
    }


patcher_PollingToken : Fusion.Patch.Patcher Types.PollingToken
patcher_PollingToken =
    { patch = patch_PollingToken
    , build = build_PollingToken
    , toValue = toValue_PollingToken
    }


patcher_User : Fusion.Patch.Patcher Types.User
patcher_User =
    { patch = patch_User, build = build_User, toValue = toValue_User }


patcher_UserAgentConfigs : Fusion.Patch.Patcher Types.UserAgentConfigs
patcher_UserAgentConfigs =
    { patch = patch_UserAgentConfigs
    , build = build_UserAgentConfigs
    , toValue = toValue_UserAgentConfigs
    }


toValue_AgentConfig : Types.AgentConfig -> Fusion.Value
toValue_AgentConfig value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "id", toValue_AgentConfigId value.id )
             , ( "name", Fusion.VString value.name )
             , ( "provider", toValue_AgentProvider value.provider )
             , ( "endpoint", Fusion.VString value.endpoint )
             , ( "apiKey", Fusion.VString value.apiKey )
             ]
        )


toValue_AgentConfigId : Types.AgentConfigId -> Fusion.Value
toValue_AgentConfigId value =
    Fusion.VString value


toValue_AgentId : Types.AgentId -> Fusion.Value
toValue_AgentId value =
    Fusion.VString value


toValue_AgentProvider : Types.AgentProvider -> Fusion.Value
toValue_AgentProvider value =
    case value of
        Types.OpenAI ->
            Fusion.VCustom "OpenAI" []

        Types.Anthropic ->
            Fusion.VCustom "Anthropic" []

        Types.GoogleGemini ->
            Fusion.VCustom "GoogleGemini" []

        Types.OtherProvider arg0 ->
            Fusion.VCustom "OtherProvider" [ Fusion.VString arg0 ]


toValue_BackendModel : Types.BackendModel -> Fusion.Value
toValue_BackendModel value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "logs"
               , Fusion.Patch.toValue_List
                     Fusion.Patch.patcher_String
                     value.logs
               )
             , ( "pendingAuths"
               , Fusion.Patch.toValue_Dict
                     Fusion.Generated.Lamdera.patcher_SessionId
                     Fusion.Generated.Auth.Common.patcher_PendingAuth
                     value.pendingAuths
               )
             , ( "sessions"
               , Fusion.Patch.toValue_Dict
                     Fusion.Generated.Lamdera.patcher_SessionId
                     Fusion.Generated.Auth.Common.patcher_UserInfo
                     value.sessions
               )
             , ( "users"
               , Fusion.Patch.toValue_Dict
                     patcher_Email
                     patcher_User
                     value.users
               )
             , ( "pollingJobs"
               , Fusion.Patch.toValue_Dict
                     patcher_PollingToken
                     (patcher_PollingStatus patcher_PollData)
                     value.pollingJobs
               )
             , ( "userAgentConfigs"
               , Fusion.Patch.toValue_Dict
                     patcher_Email
                     patcher_UserAgentConfigs
                     value.userAgentConfigs
               )
             , ( "chatHistories"
               , Fusion.Patch.toValue_Dict
                     patcher_BrowserCookie
                     (Fusion.Patch.patcher_List patcher_ChatMessage)
                     value.chatHistories
               )
             ]
        )


toValue_BrowserCookie : Types.BrowserCookie -> Fusion.Value
toValue_BrowserCookie value =
    Fusion.Generated.Lamdera.toValue_SessionId value


toValue_ChatMessage : Types.ChatMessage -> Fusion.Value
toValue_ChatMessage value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "sender", toValue_MessageSender value.sender )
             , ( "text", Fusion.VString value.text )
             ]
        )


toValue_Email : Types.Email -> Fusion.Value
toValue_Email value =
    Fusion.VString value


toValue_MessageSender : Types.MessageSender -> Fusion.Value
toValue_MessageSender value =
    case value of
        Types.UserSender ->
            Fusion.VCustom "UserSender" []

        Types.AgentSender arg0 ->
            Fusion.VCustom "AgentSender" [ toValue_AgentId arg0 ]


toValue_PollData : Types.PollData -> Fusion.Value
toValue_PollData value =
    Fusion.VString value


toValue_PollingStatus :
    Fusion.Patch.Patcher a -> Types.PollingStatus a -> Fusion.Value
toValue_PollingStatus aPatcher value =
    case value of
        Types.Busy ->
            Fusion.VCustom "Busy" []

        Types.BusyWithTime arg0 ->
            Fusion.VCustom "BusyWithTime" [ Fusion.VInt arg0 ]

        Types.Ready arg0 ->
            Fusion.VCustom
                "Ready"
                [ (Fusion.Generated.Result.toValue_Result
                     Fusion.Patch.patcher_String
                     aPatcher
                  )
                    arg0
                ]


toValue_PollingToken : Types.PollingToken -> Fusion.Value
toValue_PollingToken value =
    Fusion.VString value


toValue_User : Types.User -> Fusion.Value
toValue_User value =
    Fusion.VRecord (Dict.fromList [ ( "email", toValue_Email value.email ) ])


toValue_UserAgentConfigs : Types.UserAgentConfigs -> Fusion.Value
toValue_UserAgentConfigs value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "configs"
               , Fusion.Patch.toValue_Dict
                     patcher_AgentConfigId
                     patcher_AgentConfig
                     value.configs
               )
             , ( "defaultId"
               , (Fusion.Generated.Maybe.toValue_Maybe patcher_AgentConfigId)
                     value.defaultId
               )
             ]
        )