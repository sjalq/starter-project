module Wire3SortTest exposing
    ( TestSort(..)
    , encodeAA
    , encodeA_
    , aaBytes
    , a_Bytes
    , sortOrderResult
    , proofTest
    )

{-| Test to prove the actual sort order of Wire3 constructor encoding.

If AA < A_, then AA gets tag 0 and A_ gets tag 1.
If A_ < AA, then A_ gets tag 0 and AA gets tag 1.

The Lamdera compiler auto-generates w3_encode_TestSort.
We just encode both variants and inspect which tag each gets.

-}

import Bytes exposing (Bytes)
import Lamdera.Wire3 as Wire3


{-| Test type with both constructors.
Lamdera's Wire3 will sort these alphabetically and assign tags.
-}
type TestSort
    = AA
    | A_


{-| Encode AA using the Lamdera-generated encoder
-}
encodeAA : Bytes
encodeAA =
    Wire3.bytesEncode (w3_encode_TestSort AA)


{-| Encode A_ using the Lamdera-generated encoder
-}
encodeA_ : Bytes
encodeA_ =
    Wire3.bytesEncode (w3_encode_TestSort A_)


{-| Get the raw bytes as a list of ints for inspection
-}
bytesToList : Bytes -> List Int
bytesToList bytes =
    Wire3.intListFromBytes bytes


{-| The definitive test:
- If AA sorts first: encodeAA = [0], encodeA_ = [1]
- If A_ sorts first: encodeAA = [1], encodeA_ = [0]
-}
aaBytes : List Int
aaBytes =
    bytesToList encodeAA


a_Bytes : List Int
a_Bytes =
    bytesToList encodeA_


{-| Human readable result
-}
sortOrderResult : String
sortOrderResult =
    let
        aaTag =
            List.head aaBytes |> Maybe.withDefault -1

        a_Tag =
            List.head a_Bytes |> Maybe.withDefault -1
    in
    if aaTag == 0 && a_Tag == 1 then
        "PROVEN: AA < A_ (AA is tag 0, A_ is tag 1)"

    else if aaTag == 1 && a_Tag == 0 then
        "PROVEN: A_ < AA (A_ is tag 0, AA is tag 1)"

    else
        "UNEXPECTED: AA tag=" ++ String.fromInt aaTag ++ ", A_ tag=" ++ String.fromInt a_Tag


{-| Returns True if A_ < AA (A_ is tag 0), False if AA < A_
-}
proofTest : Bool
proofTest =
    case ( aaBytes, a_Bytes ) of
        ( [ 1 ], [ 0 ] ) ->
            -- A_ < AA confirmed
            True

        ( [ 0 ], [ 1 ] ) ->
            -- AA < A_ confirmed
            False

        _ ->
            -- Something unexpected
            False
