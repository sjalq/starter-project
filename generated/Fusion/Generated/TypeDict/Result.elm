module Fusion.Generated.TypeDict.Result exposing ( typeDict, type_Result )

{-|
@docs typeDict, type_Result
-}


import Dict
import Fusion


typeDict : Dict.Dict String ( Fusion.Type, List String )
typeDict =
    Dict.fromList [ ( "Result", ( type_Result, [ "error", "value" ] ) ) ]


type_Result : Fusion.Type
type_Result =
    Fusion.TCustom
        "Result"
        [ "error", "value" ]
        [ ( "Ok", [ Fusion.TVar "value" ] )
        , ( "Err", [ Fusion.TVar "error" ] )
        ]