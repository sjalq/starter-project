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
        ignoreDirs =
            [ "auth/", "src/Evergreen/" ]

        ignoreFiles =
            [ "src/RPC.elm", "src/LamderaRPC.elm", "src/SupplementalRPC.elm" ]

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

    -- COMMENTED OUT: NoExposingEverything - In a starter project, exposing (..) is often
    -- convenient for prototyping and allows users to easily explore all available functions
    -- , NoExposingEverything.rule |> applyIgnores
    -- REMOVED: NoImportingEverything - Actually WANT to import everything for convenience
    -- , NoImportingEverything.rule [] |> applyIgnores
    , NoMissingTypeAnnotation.rule |> applyIgnores
    , NoMissingTypeAnnotationInLetIn.rule |> applyIgnores
    , NoMissingTypeExpose.rule |> applyIgnores
    , NoSimpleLetBody.rule |> applyIgnores
    , NoPrematureLetComputation.rule |> applyIgnores

    -- COMMENTED OUT: NoUnused rules - This is a starter project with example code
    -- Many functions/types are intentionally provided as examples even if not used
    -- Removing these would delete valuable starter code that users might need
    -- Re-enable these rules in production projects to clean up truly unused code
    -- , NoUnused.CustomTypeConstructors.rule [] -- Already removed for Evergreen NoOp support
    -- , NoUnused.CustomTypeConstructorArgs.rule |> applyIgnores
    -- , NoUnused.Dependencies.rule |> applyIgnores
    -- , NoUnused.Exports.rule |> applyIgnores
    -- , NoUnused.Parameters.rule |> applyIgnores
    -- , NoUnused.Patterns.rule |> applyIgnores
    -- , NoUnused.Variables.rule |> applyIgnores
    -- Keep only the unused imports rule to clean up actual import statements
    , NoUnused.Variables.rule
        |> applyIgnores
        |> Rule.ignoreErrorsForFiles
            [ "src/Components/EmailPasswordAuth.elm" -- Form components that might be used later
            , "src/Components/EmailPasswordForm.elm"
            , "src/Auth/EmailPasswordAuth.elm" -- Auth helpers that are part of the starter kit
            ]
    , Simplify.rule Simplify.defaults |> applyIgnores
    ]
