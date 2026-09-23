module Property.WebSocketWireTests exposing (suite)

{-| The lamdera-websocket JavaScript client hand-encodes `A String` (to the
backend) and decodes `A0 String` (from the backend) as Wire3 constructor tag 0.

Wire3 numbers constructors in alphabetical order, so these tests pin the
invariant that `A` and `A0` stay the first constructors of `ToBackend` and
`ToFrontend`. Adding a constructor that sorts before them breaks the client.

-}

import Expect
import Fuzz
import Lamdera.Wire3 as Wire3
import Test exposing (..)
import Types exposing (ToBackend(..), ToFrontend(..))


suite : Test
suite =
    describe "WebSocket wire format"
        [ fuzz Fuzz.string "ToBackend.A is encoded with constructor tag 0" <|
            \message ->
                Wire3.bytesEncode (Types.w3_encode_ToBackend (A message))
                    |> Wire3.intListFromBytes
                    |> List.head
                    |> Expect.equal (Just 0)
        , fuzz Fuzz.string "ToFrontend.A0 is encoded with constructor tag 0" <|
            \message ->
                Wire3.bytesEncode (Types.w3_encode_ToFrontend (A0 message))
                    |> Wire3.intListFromBytes
                    |> List.head
                    |> Expect.equal (Just 0)
        , fuzz Fuzz.string "ToBackend.A round-trips through Wire3" <|
            \message ->
                Wire3.bytesEncode (Types.w3_encode_ToBackend (A message))
                    |> Wire3.bytesDecode Types.w3_decode_ToBackend
                    |> Expect.equal (Just (A message))
        ]
