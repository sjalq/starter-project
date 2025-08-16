module ReviewConfig exposing (config)

{-| Do not rename the ReviewConfig module or the config function, because
`elm-review` will look for these.

To add packages that contain rules, add them to this review project using

    `elm install author/packagename`

when inside the directory containing this file.

-}

import Docs.ReviewAtDocs
import NoConfusingPrefixOperator
import NoDebug.Log
import NoDebug.TodoOrToString
import NoExposingEverything
import NoImportingEverything
import NoMissingTypeAnnotation
import NoMissingTypeAnnotationInLetIn
import NoMissingTypeExpose
import NoPrematureLetComputation
import NoSimpleLetBody
import NoUnused.CustomTypeConstructorArgs
import NoUnused.CustomTypeConstructors
import NoUnused.Dependencies
import NoUnused.Exports
import NoUnused.Parameters
import NoUnused.Patterns
import NoUnused.Variables
import Review.Rule as Rule exposing (Rule)
import Simplify


config : List Rule
config =
    let
        -- Common directories and files to ignore
        ignoreDirs = [ "auth/", "src/Evergreen/" ]
        ignoreFiles = [ "src/RPC.elm", "src/LamderaRPC.elm" ]
        
        -- Helper to apply ignore patterns to a rule
        applyIgnores rule =
            rule
                |> Rule.ignoreErrorsForDirectories ignoreDirs
                |> Rule.ignoreErrorsForFiles ignoreFiles
    in
    [ Docs.ReviewAtDocs.rule |> applyIgnores
    , NoConfusingPrefixOperator.rule |> applyIgnores
    , NoDebug.Log.rule 
        |> Rule.ignoreErrorsForDirectories ("tests/" :: ignoreDirs)
        |> Rule.ignoreErrorsForFiles ignoreFiles
    , NoDebug.TodoOrToString.rule
        |> Rule.ignoreErrorsForDirectories ("tests/" :: ignoreDirs)
        |> Rule.ignoreErrorsForFiles ignoreFiles
    , NoExposingEverything.rule |> applyIgnores
    , NoImportingEverything.rule [] |> applyIgnores
    , NoMissingTypeAnnotation.rule |> applyIgnores
    , NoMissingTypeAnnotationInLetIn.rule |> applyIgnores
    , NoMissingTypeExpose.rule |> applyIgnores
    , NoSimpleLetBody.rule |> applyIgnores
    , NoPrematureLetComputation.rule |> applyIgnores
    -- Removed NoUnused.CustomTypeConstructors.rule to keep NoOp messages for Evergreen migrations
    , NoUnused.CustomTypeConstructorArgs.rule |> applyIgnores
    , NoUnused.Dependencies.rule |> applyIgnores
    , NoUnused.Exports.rule |> applyIgnores
    , NoUnused.Parameters.rule |> applyIgnores
    , NoUnused.Patterns.rule |> applyIgnores
    , NoUnused.Variables.rule |> applyIgnores
    , Simplify.rule Simplify.defaults |> applyIgnores
    ]
