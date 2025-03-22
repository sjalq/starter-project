module Fusion.Generated.Lamdera exposing ( build_SessionId, patch_SessionId, patcher_SessionId, toValue_SessionId )

{-|
@docs build_SessionId, patch_SessionId, patcher_SessionId, toValue_SessionId
-}


import Fusion
import Fusion.Patch
import Lamdera


build_SessionId : Fusion.Value -> Result Fusion.Patch.Error Lamdera.SessionId
build_SessionId value =
    Fusion.Patch.build_String value


patch_SessionId :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Lamdera.SessionId
    -> Result Fusion.Patch.Error Lamdera.SessionId
patch_SessionId options patch value =
    Fusion.Patch.patch_String options patch value


patcher_SessionId : Fusion.Patch.Patcher Lamdera.SessionId
patcher_SessionId =
    { patch = patch_SessionId
    , build = build_SessionId
    , toValue = toValue_SessionId
    }


toValue_SessionId : Lamdera.SessionId -> Fusion.Value
toValue_SessionId value =
    Fusion.VString value