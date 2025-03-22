module Fusion.Generated.TypeDict.Maybe exposing ( typeDict, type_Maybe )

{-|
@docs typeDict, type_Maybe
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List String )
typeDict =
    Dict.fromList [ ( "Maybe", ( type_Maybe, [ "a" ] ) ) ]


type_Maybe : Fusion.Type
type_Maybe =
    Fusion.TCustom
        "Maybe"
        [ "a" ]
        [ ( "Just", [ Fusion.TVar "a" ] ), ( "Nothing", [] ) ]