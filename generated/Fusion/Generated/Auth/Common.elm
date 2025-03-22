module Fusion.Generated.Auth.Common exposing
    ( build_PendingAuth, build_SessionId, build_UserInfo, patch_PendingAuth, patch_SessionId, patch_UserInfo
    , patcher_PendingAuth, patcher_SessionId, patcher_UserInfo, toValue_PendingAuth, toValue_SessionId, toValue_UserInfo
    )

{-|
@docs build_PendingAuth, build_SessionId, build_UserInfo, patch_PendingAuth, patch_SessionId, patch_UserInfo
@docs patcher_PendingAuth, patcher_SessionId, patcher_UserInfo, toValue_PendingAuth, toValue_SessionId, toValue_UserInfo
-}


import Auth.Common
import Dict
import Fusion
import Fusion.Generated.Maybe
import Fusion.Patch


build_PendingAuth :
    Fusion.Value -> Result Fusion.Patch.Error Auth.Common.PendingAuth
build_PendingAuth value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map3
                 (\created sessionId state ->
                      { created = created
                      , sessionId = sessionId
                      , state = state
                      }
                 )
                 (Result.andThen
                      Fusion.Patch.build_Posix
                      (build_RecordUnpack "created")
                 )
                 (Result.andThen
                      build_SessionId
                      (build_RecordUnpack "sessionId")
                 )
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "state")
                 )
        )
        value


build_SessionId :
    Fusion.Value -> Result Fusion.Patch.Error Auth.Common.SessionId
build_SessionId value =
    Fusion.Patch.build_String value


build_UserInfo : Fusion.Value -> Result Fusion.Patch.Error Auth.Common.UserInfo
build_UserInfo value =
    Fusion.Patch.build_Record
        (\build_RecordUnpack ->
             Result.map3
                 (\email name username ->
                      { email = email, name = name, username = username }
                 )
                 (Result.andThen
                      Fusion.Patch.build_String
                      (build_RecordUnpack "email")
                 )
                 (Result.andThen
                      (Fusion.Generated.Maybe.build_Maybe
                           Fusion.Patch.patcher_String
                      )
                      (build_RecordUnpack "name")
                 )
                 (Result.andThen
                      (Fusion.Generated.Maybe.build_Maybe
                           Fusion.Patch.patcher_String
                      )
                      (build_RecordUnpack "username")
                 )
        )
        value


patch_PendingAuth :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Auth.Common.PendingAuth
    -> Result Fusion.Patch.Error Auth.Common.PendingAuth
patch_PendingAuth options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "created" ->
                     Result.map
                         (\created -> { acc | created = created })
                         (Fusion.Patch.patch_Posix
                              options
                              fieldPatch
                              acc.created
                         )

                 "sessionId" ->
                     Result.map
                         (\sessionId -> { acc | sessionId = sessionId })
                         (patch_SessionId options fieldPatch acc.sessionId)

                 "state" ->
                     Result.map
                         (\state -> { acc | state = state })
                         (Fusion.Patch.patch_String options fieldPatch acc.state
                         )

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patch_SessionId :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Auth.Common.SessionId
    -> Result Fusion.Patch.Error Auth.Common.SessionId
patch_SessionId options patch value =
    Fusion.Patch.patch_String options patch value


patch_UserInfo :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Auth.Common.UserInfo
    -> Result Fusion.Patch.Error Auth.Common.UserInfo
patch_UserInfo options patch value =
    Fusion.Patch.patch_Record
        (\fieldName fieldPatch acc ->
             case fieldName of
                 "email" ->
                     Result.map
                         (\email -> { acc | email = email })
                         (Fusion.Patch.patch_String options fieldPatch acc.email
                         )

                 "name" ->
                     Result.map
                         (\name -> { acc | name = name })
                         ((Fusion.Generated.Maybe.patch_Maybe
                               Fusion.Patch.patcher_String
                          )
                              options
                              fieldPatch
                              acc.name
                         )

                 "username" ->
                     Result.map
                         (\username -> { acc | username = username })
                         ((Fusion.Generated.Maybe.patch_Maybe
                               Fusion.Patch.patcher_String
                          )
                              options
                              fieldPatch
                              acc.username
                         )

                 _ ->
                     Result.Err (Fusion.Patch.UnexpectedField fieldName)
        )
        patch
        value


patcher_PendingAuth : Fusion.Patch.Patcher Auth.Common.PendingAuth
patcher_PendingAuth =
    { patch = patch_PendingAuth
    , build = build_PendingAuth
    , toValue = toValue_PendingAuth
    }


patcher_SessionId : Fusion.Patch.Patcher Auth.Common.SessionId
patcher_SessionId =
    { patch = patch_SessionId
    , build = build_SessionId
    , toValue = toValue_SessionId
    }


patcher_UserInfo : Fusion.Patch.Patcher Auth.Common.UserInfo
patcher_UserInfo =
    { patch = patch_UserInfo
    , build = build_UserInfo
    , toValue = toValue_UserInfo
    }


toValue_PendingAuth : Auth.Common.PendingAuth -> Fusion.Value
toValue_PendingAuth value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "created", Fusion.Patch.toValue_Posix value.created )
             , ( "sessionId", toValue_SessionId value.sessionId )
             , ( "state", Fusion.VString value.state )
             ]
        )


toValue_SessionId : Auth.Common.SessionId -> Fusion.Value
toValue_SessionId value =
    Fusion.VString value


toValue_UserInfo : Auth.Common.UserInfo -> Fusion.Value
toValue_UserInfo value =
    Fusion.VRecord
        (Dict.fromList
             [ ( "email", Fusion.VString value.email )
             , ( "name"
               , (Fusion.Generated.Maybe.toValue_Maybe
                      Fusion.Patch.patcher_String
                 )
                     value.name
               )
             , ( "username"
               , (Fusion.Generated.Maybe.toValue_Maybe
                      Fusion.Patch.patcher_String
                 )
                     value.username
               )
             ]
        )