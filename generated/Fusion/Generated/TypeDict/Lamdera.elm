module Fusion.Generated.TypeDict.Lamdera exposing ( typeDict, type_SessionId )

{-|
@docs typeDict, type_SessionId
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List a )
typeDict =
    Dict.fromList [ ( "SessionId", ( type_SessionId, [] ) ) ]


type_SessionId : Fusion.Type
type_SessionId =
    Fusion.TNamed [ "String" ] "String" [] (Just Fusion.TString)