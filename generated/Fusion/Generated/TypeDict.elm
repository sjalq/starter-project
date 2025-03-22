module Fusion.Generated.TypeDict exposing ( typeDict )

{-|
@docs typeDict
-}


import Dict
import Fusion
import Fusion.Generated.TypeDict.Auth.Common
import Fusion.Generated.TypeDict.Lamdera
import Fusion.Generated.TypeDict.Maybe
import Fusion.Generated.TypeDict.Result
import Fusion.Generated.TypeDict.Types


typeDict :
    Dict.Dict (List String) (Dict.Dict String ( Fusion.Type, List String ))
typeDict =
    Dict.fromList
        [ ( [ "TypeDict", "Auth", "Common" ]
          , Fusion.Generated.TypeDict.Auth.Common.typeDict
          )
        , ( [ "TypeDict", "Lamdera" ]
          , Fusion.Generated.TypeDict.Lamdera.typeDict
          )
        , ( [ "TypeDict", "Maybe" ], Fusion.Generated.TypeDict.Maybe.typeDict )
        , ( [ "TypeDict", "Result" ]
          , Fusion.Generated.TypeDict.Result.typeDict
          )
        , ( [ "TypeDict", "Types" ], Fusion.Generated.TypeDict.Types.typeDict )
        ]