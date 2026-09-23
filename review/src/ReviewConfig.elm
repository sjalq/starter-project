module ReviewConfig exposing (config)

{-| Do not rename the ReviewConfig module or the config function, because
`elm-review` will look for these.

To add packages that contain rules, add them to this review project using

    `elm install author/packagename`

when inside the directory containing this file.

The NoUnused.Exports/Parameters/CustomTypeConstructors rules are left out on
purpose: the starter ships reusable helpers (Supplemental, Components, Theme)
that a fresh project does not call yet.

-}

import Docs.ReviewAtDocs
import NoConfusingPrefixOperator
import NoDebug.Log
import NoDebug.TodoOrToString
import NoMissingTypeAnnotation
import NoMissingTypeExpose
import NoPrematureLetComputation
import NoSimpleLetBody
import NoUnused.Variables
import Review.Rule as Rule exposing (Rule)
import Simplify


config : List Rule
config =
    let
        -- Submodules, Evergreen migrations and wire-extractor output are not hand-maintained
        ignoreDirs =
            [ "auth/", "lamdera-websocket-package/", "tools/", "src/Evergreen/" ]

        ignoreFiles =
            [ "tests/Protocol.elm", "tests/ProtocolWireProof.elm" ]

        applyIgnores rule =
            rule
                |> Rule.ignoreErrorsForDirectories ignoreDirs
                |> Rule.ignoreErrorsForFiles ignoreFiles
    in
    [ Docs.ReviewAtDocs.rule |> applyIgnores
    , NoConfusingPrefixOperator.rule |> applyIgnores

    -- Logger writes through Debug.log on purpose: Lamdera captures it to the disk-backed production log
    , NoDebug.Log.rule
        |> applyIgnores
        |> Rule.ignoreErrorsForDirectories [ "tests/" ]
        |> Rule.ignoreErrorsForFiles [ "src/Logger.elm" ]
    , NoDebug.TodoOrToString.rule
        |> applyIgnores
        |> Rule.ignoreErrorsForDirectories [ "tests/" ]
    , NoMissingTypeAnnotation.rule |> applyIgnores
    , NoMissingTypeExpose.rule |> applyIgnores
    , NoSimpleLetBody.rule |> applyIgnores
    , NoPrematureLetComputation.rule |> applyIgnores
    , NoUnused.Variables.rule |> applyIgnores
    , Simplify.rule Simplify.defaults |> applyIgnores
    ]
