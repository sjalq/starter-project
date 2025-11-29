module Wire3SortProof exposing (..)

{-| Definitive proof test for Wire3 constructor sort order.
-}

import Expect
import Test exposing (..)
import Wire3SortTest exposing (..)


suite : Test
suite =
    describe "Wire3 Constructor Sort Order Proof"
        [ test "Prove which constructor gets tag 0" <|
            \_ ->
                let
                    _ =
                        Debug.log "AA bytes" aaBytes

                    _ =
                        Debug.log "A_ bytes" a_Bytes

                    _ =
                        Debug.log "RESULT" sortOrderResult
                in
                -- This test will ALWAYS pass but will print the proof
                Expect.pass
        , test "AA should have tag 0 if AA < A_" <|
            \_ ->
                -- Based on byte comparison: 'A' (0x41) < '_' (0x5F)
                -- So "AA" should sort before "A_"
                -- Meaning AA gets tag 0
                Expect.equal aaBytes [ 0 ]
        , test "A_ should have tag 1 if AA < A_" <|
            \_ ->
                Expect.equal a_Bytes [ 1 ]
        , test "sortOrderResult confirms AA < A_" <|
            \_ ->
                Expect.equal sortOrderResult "PROVEN: AA < A_ (AA is tag 0, A_ is tag 1)"
        ]
