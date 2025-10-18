module CodegenTests exposing (suite)

import Expect
import Fuzz
import SignatureParser exposing (ParsedSignature, parseSignature)
import Test exposing (..)


suite : Test
suite =
    describe "RPC Code Generator"
        [ describe "Signature Parsing"
            [ test "parses single parameter signature" <|
                \_ ->
                    let
                        input =
                            "myFunc : SessionId -> BackendModel -> InputType -> ( Result String OutputType, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.all
                                [ \p -> Expect.equal p.functionName "myFunc"
                                , \p -> Expect.equal p.paramTypes [ "InputType" ]
                                , \p -> Expect.equal p.outputType "OutputType"
                                ]
                                parsed

                        Nothing ->
                            Expect.fail "Should parse valid signature"
            , test "parses multiple parameters" <|
                \_ ->
                    let
                        input =
                            "calc : SessionId -> BackendModel -> String -> Int -> Bool -> ( Result String Result, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.equal parsed.paramTypes [ "String", "Int", "Bool" ]

                        Nothing ->
                            Expect.fail "Should parse multiple parameters"
            , test "rejects signature with no parameters" <|
                \_ ->
                    let
                        input =
                            "invalid : SessionId -> BackendModel -> ( Result String Output, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    Expect.equal result Nothing
            , test "extracts function name" <|
                \_ ->
                    let
                        input =
                            "calculateSum : SessionId -> BackendModel -> Int -> ( Result String Int, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.equal parsed.functionName "calculateSum"

                        Nothing ->
                            Expect.fail "Should extract function name"
            , test "extracts output type" <|
                \_ ->
                    let
                        input =
                            "getUser : SessionId -> BackendModel -> UserId -> ( Result String UserProfile, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.equal parsed.outputType "UserProfile"

                        Nothing ->
                            Expect.fail "Should extract output type"
            , fuzz (Fuzz.intRange 1 10) "handles varying parameter counts" <|
                \numParams ->
                    let
                        params =
                            List.range 1 numParams
                                |> List.map (\n -> "Param" ++ String.fromInt n)

                        paramString =
                            String.join " -> " params

                        input =
                            "myFunc : SessionId -> BackendModel -> "
                                ++ paramString
                                ++ " -> ( Result String Output, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.equal (List.length parsed.paramTypes) numParams

                        Nothing ->
                            Expect.fail "Should parse generated signature"
            , fuzz Fuzz.string "preserves custom type names in output" <|
                \typeName ->
                    let
                        -- Make valid Elm type name (uppercase first)
                        validType =
                            if String.isEmpty typeName then
                                "Output"

                            else
                                String.toUpper (String.left 1 typeName)
                                    ++ String.dropLeft 1 typeName
                                    |> String.filter Char.isAlphaNum

                        input =
                            "func : SessionId -> BackendModel -> Input -> ( Result String "
                                ++ validType
                                ++ ", BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    if String.isEmpty validType then
                        Expect.pass

                    else
                        case result of
                            Just parsed ->
                                Expect.equal parsed.outputType validType

                            Nothing ->
                                Expect.pass
            , test "SessionId and BackendModel not in paramTypes" <|
                \_ ->
                    let
                        input =
                            "func : SessionId -> BackendModel -> Param1 -> Param2 -> ( Result String Output, BackendModel, Cmd BackendMsg )"

                        result =
                            parseSignature input
                    in
                    case result of
                        Just parsed ->
                            Expect.all
                                [ \p -> Expect.equal (List.member "SessionId" p) False
                                , \p -> Expect.equal (List.member "BackendModel" p) False
                                ]
                                parsed.paramTypes

                        Nothing ->
                            Expect.fail "Should parse"
            ]
        ]


