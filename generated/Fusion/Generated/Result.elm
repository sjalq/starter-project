module Fusion.Generated.Result exposing ( build_Result, patch_Result, patcher_Result, toValue_Result )

{-|
@docs build_Result, patch_Result, patcher_Result, toValue_Result
-}


import Fusion
import Fusion.Patch


build_Result :
    Fusion.Patch.Patcher error
    -> Fusion.Patch.Patcher value
    -> Fusion.Value
    -> Result Fusion.Patch.Error (Result.Result error value)
build_Result errorPatcher valuePatcher value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "Ok", [ patch0 ] ) ->
                     Result.map Result.Ok (valuePatcher.build patch0)

                 ( "Err", [ patch0 ] ) ->
                     Result.map Result.Err (errorPatcher.build patch0)

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


patch_Result :
    Fusion.Patch.Patcher error
    -> Fusion.Patch.Patcher value
    -> { force : Bool }
    -> Fusion.Patch.Patch
    -> Result.Result error value
    -> Result Fusion.Patch.Error (Result.Result error value)
patch_Result errorPatcher valuePatcher options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Result.Ok _, "Ok" ) ->
                    True

                ( Result.Err _, "Err" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Result.Ok arg0, Fusion.Patch.PCustomSame "Ok" [ patch0 ], _ ) ->
            Result.map
                Result.Ok
                (Fusion.Patch.maybeApply valuePatcher options patch0 arg0)

        ( _, Fusion.Patch.PCustomSame "Ok" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Ok" [ (Just patch0) ], _ ) ->
            Result.map
                Result.Ok
                (Fusion.Patch.buildFromPatch valuePatcher.build patch0)

        ( _, Fusion.Patch.PCustomSame "Ok" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( Result.Err arg0, Fusion.Patch.PCustomSame "Err" [ patch0 ], _ ) ->
            Result.map
                Result.Err
                (Fusion.Patch.maybeApply errorPatcher options patch0 arg0)

        ( _, Fusion.Patch.PCustomSame "Err" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "Err" [ (Just patch0) ], _ ) ->
            Result.map
                Result.Err
                (Fusion.Patch.buildFromPatch errorPatcher.build patch0)

        ( _, Fusion.Patch.PCustomSame "Err" _, _ ) ->
            Result.Err Fusion.Patch.CouldNotBuildValueFromPatch

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "Ok" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Result.Ok (valuePatcher.build arg0)

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "Err" [ arg0 ], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.map Result.Err (errorPatcher.build arg0)

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patcher_Result :
    Fusion.Patch.Patcher error
    -> Fusion.Patch.Patcher value
    -> Fusion.Patch.Patcher (Result.Result error value)
patcher_Result errorPatcher valuePatcher =
    { patch = patch_Result errorPatcher valuePatcher
    , build = build_Result errorPatcher valuePatcher
    , toValue = toValue_Result errorPatcher valuePatcher
    }


toValue_Result :
    Fusion.Patch.Patcher error
    -> Fusion.Patch.Patcher value
    -> Result.Result error value
    -> Fusion.Value
toValue_Result errorPatcher valuePatcher value =
    case value of
        Result.Ok arg0 ->
            Fusion.VCustom "Ok" [ valuePatcher.toValue arg0 ]

        Result.Err arg0 ->
            Fusion.VCustom "Err" [ errorPatcher.toValue arg0 ]