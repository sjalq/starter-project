module Fusion.Generated.Maybe exposing ( build_Maybe, patch_Maybe, patcher_Maybe, toValue_Maybe )

{-|
@docs build_Maybe, patch_Maybe, patcher_Maybe, toValue_Maybe
-}


import Fusion
import Fusion.Patch


build_Maybe :
    Fusion.Patch.Patcher a
    -> Fusion.Value
    -> Result Fusion.Patch.Error (Maybe.Maybe a)
build_Maybe aPatcher value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "Just", [ patch0 ] ) ->
                     Result.map Maybe.Just (aPatcher.build patch0)

                 ( "Nothing", [] ) ->
                     Result.Ok Maybe.Nothing

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


patch_Maybe :
    Fusion.Patch.Patcher a
    -> { force : Bool }
    -> Fusion.Patch.Patch
    -> Maybe.Maybe a
    -> Result Fusion.Patch.Error (Maybe.Maybe a)
patch_Maybe aPatcher options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Maybe.Just _, "Just" ) ->
                    True

                ( Maybe.Nothing, "Nothing" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Maybe.Just arg0, Fusion.Patch.PCustomSame "Just" [ patch0 ], _ ) ->
            Result.map
                Maybe.Just
                (Fusion.Patch.maybeApply aPatcher options patch0 arg0)

        ( _, Fusion.Patch.PCustomSame "Just" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Just" [ (Just patch0) ], _ ) ->
            Result.map
                Maybe.Just
                (Fusion.Patch.buildFromPatch aPatcher.build patch0)

        ( _, Fusion.Patch.PCustomSame "Just" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( Maybe.Nothing, Fusion.Patch.PCustomSame "Nothing" [], _ ) ->
            Result.Ok Maybe.Nothing

        ( _, Fusion.Patch.PCustomSame "Nothing" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Nothing" [], _ ) ->
            Result.Ok Maybe.Nothing

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "Just" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Maybe.Just (aPatcher.build arg0)

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "Nothing" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Maybe.Nothing

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patcher_Maybe : Fusion.Patch.Patcher a -> Fusion.Patch.Patcher (Maybe.Maybe a)
patcher_Maybe aPatcher =
    { patch = patch_Maybe aPatcher
    , build = build_Maybe aPatcher
    , toValue = toValue_Maybe aPatcher
    }


toValue_Maybe : Fusion.Patch.Patcher a -> Maybe.Maybe a -> Fusion.Value
toValue_Maybe aPatcher value =
    case value of
        Maybe.Just arg0 ->
            Fusion.VCustom "Just" [ aPatcher.toValue arg0 ]

        Maybe.Nothing ->
            Fusion.VCustom "Nothing" []