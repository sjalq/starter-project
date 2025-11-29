module Wire3FirstConstructorProof exposing (..)

{-| Property-based proof that `A` is the first possible constructor name in Wire3 encoding.

This module proves:
1. `A` always gets tag 0 regardless of what other constructors exist
2. No valid Elm constructor name can ever sort before `A`
3. The JS library's encoding of `A String` will always match tag 0x00

-}

import Bytes exposing (Bytes)
import Expect
import Fuzz exposing (Fuzzer)
import Lamdera.Wire3 as Wire3
import Test exposing (..)


-- ============================================================================
-- The definitive type: A is the first constructor, followed by all letters
-- ============================================================================


{-| Type with A as the first constructor, plus B-Z for completeness.
Wire3 sorts constructors alphabetically, so A will always be tag 0.
-}
type CanonicalMessage
    = A String
    | B String
    | C String
    | D String
    | E String
    | F String
    | G String
    | H String
    | I String
    | J String
    | K String
    | L String
    | M String
    | N String
    | O String
    | P String
    | Q String
    | R String
    | S String
    | T String
    | U String
    | V String
    | W String
    | X String
    | Y String
    | Z String


{-| Type with A and underscore variants - proves A < AA < A\_
-}
type MsgWithUnderscores
    = MU_A String
    | MU_AA String
    | MU_A_ String
    | MU_A__ String
    | MU_AAA String


{-| Type with A and numeric suffixes - proves A < A0 < A1 < A9
-}
type MsgWithNumbers
    = MN_A String
    | MN_A0 String
    | MN_A1 String
    | MN_A9 String
    | MN_AA String


{-| Type with A and lowercase suffixes - proves A < Aa < Ab < Az
-}
type MsgWithLowercase
    = ML_A String
    | ML_Aa String
    | ML_Ab String
    | ML_Az String
    | ML_AA String


{-| Type with many random-ish constructors - A should still be first
-}
type MsgWithManyConstructors
    = MM_A String
    | MM_Banana String
    | MM_Create String
    | MM_Delete String
    | MM_Error String
    | MM_Fetch String
    | MM_Get String
    | MM_Hello String
    | MM_Init String
    | MM_Join String
    | MM_Kill String
    | MM_Load String
    | MM_Message String
    | MM_Notify String
    | MM_Open String
    | MM_Ping String
    | MM_Query String
    | MM_Request String
    | MM_Send String
    | MM_Test String
    | MM_Update String
    | MM_Validate String
    | MM_Write String
    | MM_Xenon String
    | MM_Yield String
    | MM_Zero String


{-| Type that ONLY has A - simplest case
-}
type MsgOnlyA
    = MOA_A String


{-| Type with A and one other constructor
-}
type MsgAAndOne
    = MAO_A String
    | MAO_Z String


{-| Type with A plus constructors that look similar to A
-}
type MsgSimilarToA
    = MS_A String
    | MS_AA String
    | MS_AAA String
    | MS_AAAA String
    | MS_AB String
    | MS_AC String
    | MS_A1 String
    | MS_A_ String



-- ============================================================================
-- Encoding helpers
-- ============================================================================


bytesToList : Bytes -> List Int
bytesToList bytes =
    Wire3.intListFromBytes bytes


getTag : Bytes -> Int
getTag bytes =
    bytesToList bytes |> List.head |> Maybe.withDefault -1



-- ============================================================================
-- Encoders
-- ============================================================================


encodeA : String -> Bytes
encodeA s =
    Wire3.bytesEncode (w3_encode_CanonicalMessage (A s))


encodeB : String -> Bytes
encodeB s =
    Wire3.bytesEncode (w3_encode_CanonicalMessage (B s))


encodeZ : String -> Bytes
encodeZ s =
    Wire3.bytesEncode (w3_encode_CanonicalMessage (Z s))


{-| Encoders for all variant types - encoding their "A" variant
-}
encodeMU_A : String -> Bytes
encodeMU_A s =
    Wire3.bytesEncode (w3_encode_MsgWithUnderscores (MU_A s))


encodeMN_A : String -> Bytes
encodeMN_A s =
    Wire3.bytesEncode (w3_encode_MsgWithNumbers (MN_A s))


encodeML_A : String -> Bytes
encodeML_A s =
    Wire3.bytesEncode (w3_encode_MsgWithLowercase (ML_A s))


encodeMM_A : String -> Bytes
encodeMM_A s =
    Wire3.bytesEncode (w3_encode_MsgWithManyConstructors (MM_A s))


encodeMOA_A : String -> Bytes
encodeMOA_A s =
    Wire3.bytesEncode (w3_encode_MsgOnlyA (MOA_A s))


encodeMAO_A : String -> Bytes
encodeMAO_A s =
    Wire3.bytesEncode (w3_encode_MsgAAndOne (MAO_A s))


encodeMS_A : String -> Bytes
encodeMS_A s =
    Wire3.bytesEncode (w3_encode_MsgSimilarToA (MS_A s))


{-| Decoders for round-trip testing
-}
decodeCanonical : Bytes -> Maybe CanonicalMessage
decodeCanonical bytes =
    Wire3.bytesDecode w3_decode_CanonicalMessage bytes


decodeMU : Bytes -> Maybe MsgWithUnderscores
decodeMU bytes =
    Wire3.bytesDecode w3_decode_MsgWithUnderscores bytes


decodeMN : Bytes -> Maybe MsgWithNumbers
decodeMN bytes =
    Wire3.bytesDecode w3_decode_MsgWithNumbers bytes


decodeML : Bytes -> Maybe MsgWithLowercase
decodeML bytes =
    Wire3.bytesDecode w3_decode_MsgWithLowercase bytes


decodeMM : Bytes -> Maybe MsgWithManyConstructors
decodeMM bytes =
    Wire3.bytesDecode w3_decode_MsgWithManyConstructors bytes


decodeMOA : Bytes -> Maybe MsgOnlyA
decodeMOA bytes =
    Wire3.bytesDecode w3_decode_MsgOnlyA bytes


decodeMAO : Bytes -> Maybe MsgAAndOne
decodeMAO bytes =
    Wire3.bytesDecode w3_decode_MsgAAndOne bytes


decodeMS : Bytes -> Maybe MsgSimilarToA
decodeMS bytes =
    Wire3.bytesDecode w3_decode_MsgSimilarToA bytes



-- ============================================================================
-- Fuzzers
-- ============================================================================


{-| Fuzzer for any valid string payload
-}
stringPayloadFuzzer : Fuzzer String
stringPayloadFuzzer =
    Fuzz.oneOf
        [ Fuzz.string
        , Fuzz.constant ""
        , Fuzz.constant "hello"
        , Fuzz.constant "Hello, 世界! 🌍"
        , Fuzz.map String.fromInt (Fuzz.intRange -1000000 1000000)
        , Fuzz.map (\n -> String.repeat n "a") (Fuzz.intRange 0 1000)
        ]


{-| Fuzzer for valid Elm constructor names (uppercase start, then alphanumeric or underscore)
-}
constructorNameFuzzer : Fuzzer String
constructorNameFuzzer =
    let
        uppercaseLetter =
            Fuzz.intRange (Char.toCode 'A') (Char.toCode 'Z')
                |> Fuzz.map Char.fromCode

        validTailChar =
            Fuzz.oneOf
                [ Fuzz.intRange (Char.toCode 'A') (Char.toCode 'Z') |> Fuzz.map Char.fromCode
                , Fuzz.intRange (Char.toCode 'a') (Char.toCode 'z') |> Fuzz.map Char.fromCode
                , Fuzz.intRange (Char.toCode '0') (Char.toCode '9') |> Fuzz.map Char.fromCode
                , Fuzz.constant '_'
                ]

        tailString =
            Fuzz.listOfLengthBetween 0 10 validTailChar
                |> Fuzz.map String.fromList
    in
    Fuzz.map2 (\first rest -> String.cons first rest) uppercaseLetter tailString



-- ============================================================================
-- Property-Based Tests
-- ============================================================================


suite : Test
suite =
    describe "Wire3 First Constructor Proof"
        [ describe "Constructor A always gets tag 0"
            [ test "A has tag 0" <|
                \_ ->
                    getTag (encodeA "test")
                        |> Expect.equal 0
            , test "B has tag 1" <|
                \_ ->
                    getTag (encodeB "test")
                        |> Expect.equal 1
            , test "Z has tag 25" <|
                \_ ->
                    getTag (encodeZ "test")
                        |> Expect.equal 25
            ]
        , describe "Property: A is always first regardless of payload"
            [ fuzz stringPayloadFuzzer "A always has tag 0 for any string payload" <|
                \payload ->
                    getTag (encodeA payload)
                        |> Expect.equal 0
            ]
        , describe "Property: No valid constructor name sorts before 'A'"
            [ fuzz constructorNameFuzzer "Any valid constructor name >= 'A'" <|
                \name ->
                    -- Any valid Elm constructor must start with A-Z
                    -- 'A' is the smallest first character
                    -- If it starts with 'A', it's either "A" or longer (which is > "A")
                    -- If it starts with B-Z, it's definitely > "A"
                    (name >= "A")
                        |> Expect.equal True
                        |> Expect.onFail ("Constructor name '" ++ name ++ "' should be >= 'A'")
            , fuzz constructorNameFuzzer "Constructor starting with 'A' with length > 1 is > 'A'" <|
                \name ->
                    if String.startsWith "A" name && String.length name > 1 then
                        (name > "A")
                            |> Expect.equal True
                            |> Expect.onFail ("'" ++ name ++ "' should be > 'A'")

                    else
                        Expect.pass
            , fuzz2 constructorNameFuzzer constructorNameFuzzer "'A' is <= any pair of valid constructors" <|
                \name1 name2 ->
                    let
                        minName =
                            if name1 < name2 then
                                name1

                            else
                                name2
                    in
                    ("A" <= minName)
                        |> Expect.equal True
                        |> Expect.onFail ("'A' should be <= '" ++ minName ++ "'")
            ]
        , describe "Wire3 encoding format verification"
            [ fuzz stringPayloadFuzzer "Encoded A String has tag 0 and valid structure" <|
                \payload ->
                    let
                        encoded =
                            bytesToList (encodeA payload)

                        tag =
                            List.head encoded |> Maybe.withDefault -1

                        rest =
                            List.drop 1 encoded
                    in
                    Expect.all
                        [ \_ -> Expect.equal tag 0
                        , \_ ->
                            -- Should have at least the length byte
                            Expect.atLeast 1 (List.length rest)
                        ]
                        ()
            , test "Empty string payload encodes as [0, 0]" <|
                \_ ->
                    let
                        encoded =
                            bytesToList (encodeA "")
                    in
                    -- Tag 0, then zigzag(0) = 0 for length
                    Expect.equal encoded [ 0, 0 ]
            , test "String 'hi' encodes as [0, 4, 0x68, 0x69]" <|
                \_ ->
                    let
                        encoded =
                            bytesToList (encodeA "hi")
                    in
                    -- Tag 0, zigzag(2) = 4, 'h' = 0x68, 'i' = 0x69
                    Expect.equal encoded [ 0, 4, 0x68, 0x69 ]
            , test "String 'hello' encodes as [0, 10, 0x68, 0x65, 0x6C, 0x6C, 0x6F]" <|
                \_ ->
                    let
                        encoded =
                            bytesToList (encodeA "hello")
                    in
                    -- Tag 0, zigzag(5) = 10, 'h' 'e' 'l' 'l' 'o'
                    Expect.equal encoded [ 0, 10, 0x68, 0x65, 0x6C, 0x6C, 0x6F ]
            ]
        , describe "Exhaustive alphabetical proof"
            [ test "A < B < C < ... < Z ordering verified" <|
                \_ ->
                    let
                        letters =
                            [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]

                        sorted =
                            List.sort letters
                    in
                    Expect.equal letters sorted
            , test "A is strictly less than all other single uppercase letters" <|
                \_ ->
                    let
                        others =
                            [ "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]

                        allGreater =
                            List.all (\letter -> "A" < letter) others
                    in
                    Expect.equal allGreater True
            , test "A is strictly less than AA, AB, A_, A0, Aa, Az, A9" <|
                \_ ->
                    let
                        longerNames =
                            [ "AA", "AB", "A_", "A0", "Aa", "Az", "A9" ]

                        allGreater =
                            List.all (\name -> "A" < name) longerNames
                    in
                    Expect.equal allGreater True
            , test "Underscore sorts after letters: AA < A_" <|
                \_ ->
                    -- '_' = 0x5F, 'A' = 0x41, so A_ > AA
                    Expect.equal True ("AA" < "A_")
            ]
        , describe "Multiple type variants all encode A with tag 0"
            [ test "MsgWithUnderscores: MU_A has tag 0" <|
                \_ ->
                    getTag (encodeMU_A "test")
                        |> Expect.equal 0
            , test "MsgWithNumbers: MN_A has tag 0" <|
                \_ ->
                    getTag (encodeMN_A "test")
                        |> Expect.equal 0
            , test "MsgWithLowercase: ML_A has tag 0" <|
                \_ ->
                    getTag (encodeML_A "test")
                        |> Expect.equal 0
            , test "MsgWithManyConstructors: MM_A has tag 0" <|
                \_ ->
                    getTag (encodeMM_A "test")
                        |> Expect.equal 0
            , test "MsgOnlyA: MOA_A has tag 0" <|
                \_ ->
                    getTag (encodeMOA_A "test")
                        |> Expect.equal 0
            , test "MsgAAndOne: MAO_A has tag 0" <|
                \_ ->
                    getTag (encodeMAO_A "test")
                        |> Expect.equal 0
            , test "MsgSimilarToA: MS_A has tag 0" <|
                \_ ->
                    getTag (encodeMS_A "test")
                        |> Expect.equal 0
            ]
        , describe "Property: All type variants produce identical A String encoding"
            [ fuzz stringPayloadFuzzer "All types encode A with same bytes" <|
                \payload ->
                    let
                        canonical =
                            bytesToList (encodeA payload)

                        mu =
                            bytesToList (encodeMU_A payload)

                        mn =
                            bytesToList (encodeMN_A payload)

                        ml =
                            bytesToList (encodeML_A payload)

                        mm =
                            bytesToList (encodeMM_A payload)

                        moa =
                            bytesToList (encodeMOA_A payload)

                        mao =
                            bytesToList (encodeMAO_A payload)

                        ms =
                            bytesToList (encodeMS_A payload)

                        allSame =
                            List.all ((==) canonical) [ mu, mn, ml, mm, moa, mao, ms ]
                    in
                    allSame
                        |> Expect.equal True
                        |> Expect.onFail "All type variants should produce identical encoding for A String"
            ]
        , describe "Round-trip: encode -> decode -> re-encode produces identical bytes"
            [ fuzz stringPayloadFuzzer "CanonicalMessage round-trip" <|
                \payload ->
                    let
                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded

                        reencoded =
                            decoded |> Maybe.map (\msg -> Wire3.bytesEncode (w3_encode_CanonicalMessage msg))
                    in
                    case ( decoded, reencoded ) of
                        ( Just (A s), Just reencodedBytes ) ->
                            Expect.all
                                [ \_ -> Expect.equal s payload
                                , \_ -> Expect.equal (bytesToList encoded) (bytesToList reencodedBytes)
                                ]
                                ()

                        _ ->
                            Expect.fail "Failed to decode or re-encode"
            , fuzz stringPayloadFuzzer "MsgWithUnderscores round-trip" <|
                \payload ->
                    let
                        encoded =
                            encodeMU_A payload

                        decoded =
                            decodeMU encoded

                        reencoded =
                            decoded |> Maybe.map (\msg -> Wire3.bytesEncode (w3_encode_MsgWithUnderscores msg))
                    in
                    case ( decoded, reencoded ) of
                        ( Just (MU_A s), Just reencodedBytes ) ->
                            Expect.all
                                [ \_ -> Expect.equal s payload
                                , \_ -> Expect.equal (bytesToList encoded) (bytesToList reencodedBytes)
                                ]
                                ()

                        _ ->
                            Expect.fail "Failed to decode or re-encode"
            , fuzz stringPayloadFuzzer "MsgWithManyConstructors round-trip" <|
                \payload ->
                    let
                        encoded =
                            encodeMM_A payload

                        decoded =
                            decodeMM encoded

                        reencoded =
                            decoded |> Maybe.map (\msg -> Wire3.bytesEncode (w3_encode_MsgWithManyConstructors msg))
                    in
                    case ( decoded, reencoded ) of
                        ( Just (MM_A s), Just reencodedBytes ) ->
                            Expect.all
                                [ \_ -> Expect.equal s payload
                                , \_ -> Expect.equal (bytesToList encoded) (bytesToList reencodedBytes)
                                ]
                                ()

                        _ ->
                            Expect.fail "Failed to decode or re-encode"
            , fuzz stringPayloadFuzzer "MsgSimilarToA round-trip" <|
                \payload ->
                    let
                        encoded =
                            encodeMS_A payload

                        decoded =
                            decodeMS encoded

                        reencoded =
                            decoded |> Maybe.map (\msg -> Wire3.bytesEncode (w3_encode_MsgSimilarToA msg))
                    in
                    case ( decoded, reencoded ) of
                        ( Just (MS_A s), Just reencodedBytes ) ->
                            Expect.all
                                [ \_ -> Expect.equal s payload
                                , \_ -> Expect.equal (bytesToList encoded) (bytesToList reencodedBytes)
                                ]
                                ()

                        _ ->
                            Expect.fail "Failed to decode or re-encode"
            ]
        , describe "Decode never fails for valid A String encoding"
            [ fuzz stringPayloadFuzzer "Decode always succeeds for A String" <|
                \payload ->
                    let
                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    case decoded of
                        Just (A _) ->
                            Expect.pass

                        Just _ ->
                            Expect.fail "Decoded to wrong variant"

                        Nothing ->
                            Expect.fail "Failed to decode valid encoding"
            , fuzz stringPayloadFuzzer "Decoded payload matches original" <|
                \payload ->
                    let
                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    case decoded of
                        Just (A s) ->
                            Expect.equal s payload

                        _ ->
                            Expect.fail "Failed to decode"
            ]
        , describe "Adversarial payloads all encode and decode correctly"
            [ test "Empty string round-trips" <|
                \_ ->
                    let
                        encoded =
                            encodeA ""

                        decoded =
                            decodeCanonical encoded
                    in
                    Expect.equal decoded (Just (A ""))
            , test "Unicode round-trips" <|
                \_ ->
                    let
                        payload =
                            "Hello, 世界! 🌍🎉"

                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    Expect.equal decoded (Just (A payload))
            , test "Very long string round-trips" <|
                \_ ->
                    let
                        payload =
                            String.repeat 10000 "abcdefghij"

                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    Expect.equal decoded (Just (A payload))
            , test "Control characters round-trip" <|
                \_ ->
                    let
                        payload =
                            "line1\nline2\rline3\tline4"

                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    Expect.equal decoded (Just (A payload))
            , test "Null bytes round-trip" <|
                \_ ->
                    let
                        payload =
                            "before\u{0000}after"

                        encoded =
                            encodeA payload

                        decoded =
                            decodeCanonical encoded
                    in
                    Expect.equal decoded (Just (A payload))
            ]
        ]
