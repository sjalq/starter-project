module Clone exposing (run)

import BackendTask exposing (BackendTask)
import BackendTask.Custom
import Cli.Option as Option
import Cli.OptionsParser as OptionsParser
import Cli.Program as Program
import FatalError exposing (FatalError)
import Json.Decode as Decode
import Json.Encode as Encode
import Pages.Script as Script exposing (Script)


type alias CliOptions =
    { name : String
    , path : Maybe String
    }


run : Script
run =
    Script.withCliOptions program
        (\opts ->
            let
                cleanName =
                    opts.name
                        |> String.toLower
                        |> String.map
                            (\c ->
                                if Char.isAlphaNum c || c == '-' then
                                    c

                                else
                                    '-'
                            )

                backendDefault : BackendTask FatalError String
                backendDefault =
                    BackendTask.Custom.run "defaultTarget"
                        (Encode.string cleanName)
                        Decode.string
                        |> BackendTask.allowFatal

                backendClone : String -> BackendTask FatalError ()
                backendClone target =
                    BackendTask.Custom.run "cloneTo"
                        (Encode.object
                            [ ( "target", Encode.string target )
                            , ( "cleanName", Encode.string cleanName )
                            ]
                        )
                        (Decode.succeed ())
                        |> BackendTask.allowFatal
            in
            case opts.path of
                Just provided ->
                    backendClone provided

                Nothing ->
                    backendDefault
                        |> BackendTask.andThen backendClone
        )


program : Program.Config CliOptions
program =
    Program.config
        |> Program.add
            (OptionsParser.build CliOptions
                |> OptionsParser.with
                    (Option.requiredPositionalArg "name")
                |> OptionsParser.with
                    (Option.optionalKeywordArg "path")
            )
