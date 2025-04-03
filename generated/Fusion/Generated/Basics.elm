module Fusion.Generated.Basics exposing ( build_Bool, patch_Bool, patcher_Bool, toValue_Bool )

{-|
@docs build_Bool, patch_Bool, patcher_Bool, toValue_Bool
-}


import Fusion
import Fusion.Patch


build_Bool : Fusion.Value -> Result Fusion.Patch.Error Basics.Bool
build_Bool value =
    Fusion.Patch.build_Custom
        (\name params ->
             case ( name, params ) of
                 ( "True", [] ) ->
                     Result.Ok Basics.True

                 ( "False", [] ) ->
                     Result.Ok Basics.False

                 _ ->
                     Result.Err
                         (Fusion.Patch.WrongType "buildCustom last branch")
        )
        value


patch_Bool :
    { force : Bool }
    -> Fusion.Patch.Patch
    -> Basics.Bool
    -> Result Fusion.Patch.Error Basics.Bool
patch_Bool options patch value =
    let
        isCorrectVariant expected =
            case ( value, expected ) of
                ( Basics.True, "True" ) ->
                    True

                ( Basics.False, "False" ) ->
                    True

                _ ->
                    False
    in
    case ( value, patch, options.force ) of
        ( Basics.True, Fusion.Patch.PCustomSame "True" [], _ ) ->
            Result.Ok Basics.True

        ( _, Fusion.Patch.PCustomSame "True" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "True" [], _ ) ->
            Result.Ok Basics.True

        ( Basics.False, Fusion.Patch.PCustomSame "False" [], _ ) ->
            Result.Ok Basics.False

        ( _, Fusion.Patch.PCustomSame "False" _, False ) ->
            Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomSame "False" [], _ ) ->
            Result.Ok Basics.False

        ( _, Fusion.Patch.PCustomSame _ _, _ ) ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.wrongSame")

        ( _, Fusion.Patch.PCustomChange expectedVariant "True" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Basics.True

            else
                Result.Err Fusion.Patch.Conflict

        ( _, Fusion.Patch.PCustomChange expectedVariant "False" [], _ ) ->
            if options.force || isCorrectVariant expectedVariant then
                Result.Ok Basics.False

            else
                Result.Err Fusion.Patch.Conflict

        _ ->
            Result.Err (Fusion.Patch.WrongType "patchCustom.lastBranch")


patcher_Bool : Fusion.Patch.Patcher Basics.Bool
patcher_Bool =
    { patch = patch_Bool, build = build_Bool, toValue = toValue_Bool }


toValue_Bool : Basics.Bool -> Fusion.Value
toValue_Bool value =
    case value of
        Basics.True ->
            Fusion.VCustom "True" []

        Basics.False ->
            Fusion.VCustom "False" []