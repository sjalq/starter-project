module Fusion.Generated.TypeDict.Auth.Common exposing ( typeDict, type_PendingAuth, type_SessionId, type_UserInfo )

{-|
@docs typeDict, type_PendingAuth, type_SessionId, type_UserInfo
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List a )
typeDict =
    Dict.fromList
        [ ( "UserInfo", ( type_UserInfo, [] ) )
        , ( "SessionId", ( type_SessionId, [] ) )
        , ( "PendingAuth", ( type_PendingAuth, [] ) )
        ]


type_PendingAuth : Fusion.Type
type_PendingAuth =
    Fusion.TRecord
        [ ( "created", Fusion.TNamed [ "Time" ] "Posix" [] Nothing )
        , ( "sessionId"
          , Fusion.TNamed [ "Auth", "Common" ] "SessionId" [] Nothing
          )
        , ( "state"
          , Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
          )
        ]


type_SessionId : Fusion.Type
type_SessionId =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)


type_UserInfo : Fusion.Type
type_UserInfo =
    Fusion.TRecord
        [ ( "email"
          , Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)
          )
        , ( "name"
          , Fusion.TNamed
                [ "Maybe" ]
                "Maybe"
                [ Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString) ]
                (Just
                     (Fusion.TMaybe
                          (Fusion.TNamed
                               [ "String" ]
                               "String"
                               []
                               (Just Fusion.TString)
                          )
                     )
                )
          )
        , ( "username"
          , Fusion.TNamed
                [ "Maybe" ]
                "Maybe"
                [ Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString) ]
                (Just
                     (Fusion.TMaybe
                          (Fusion.TNamed
                               [ "String" ]
                               "String"
                               []
                               (Just Fusion.TString)
                          )
                     )
                )
          )
        ]