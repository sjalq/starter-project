module Fusion.Generated.TypeDict.Basics exposing ( typeDict, type_Bool )

{-|
@docs typeDict, type_Bool
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List a )
typeDict =
    Dict.fromList [ ( "Bool", ( type_Bool, [] ) ) ]


type_Bool : Fusion.Type
type_Bool =
    Fusion.TCustom "Bool" [] [ ( "True", [] ), ( "False", [] ) ]