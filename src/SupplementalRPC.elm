module SupplementalRPC exposing (..)

import Json.Encode as Encode
import LamderaRPC exposing (..)



{-
   Lamdera RPC helpers
-}


stringifyHttpRequest : HttpRequest -> String
stringifyHttpRequest request =
    let
        encodeBody : HttpBody -> Encode.Value
        encodeBody body =
            case body of
                BodyBytes bytes ->
                    bytes |> Encode.list Encode.int

                BodyJson jsonValue ->
                    jsonValue

                BodyString str ->
                    Encode.string str

        encodedRequest =
            Encode.object
                [ ( "sessionId", Encode.string request.sessionId )
                , ( "endpoint", Encode.string request.endpoint )
                , ( "requestId", Encode.string request.requestId )
                , ( "headers", Encode.dict identity Encode.string request.headers )
                , ( "body", encodeBody request.body )
                ]
    in
    Encode.encode 0 encodedRequest


stringifyRPCResult : RPCResult -> String
stringifyRPCResult result =
    let
        encodeResult : RPCResult -> Encode.Value
        encodeResult r =
            case r of
                ResultBytes bytes ->
                    Encode.object
                        [ ( "type", Encode.string "bytes" )
                        , ( "data", Encode.list Encode.int bytes )
                        ]

                ResultJson jsonValue ->
                    Encode.object
                        [ ( "type", Encode.string "json" )
                        , ( "data", jsonValue )
                        ]

                ResultString str ->
                    Encode.object
                        [ ( "type", Encode.string "string" )
                        , ( "data", Encode.string str )
                        ]

                ResultRaw statusCode statusText headers body ->
                    Encode.object
                        [ ( "type", Encode.string "raw" )
                        , ( "statusCode", Encode.int statusCode )
                        , ( "statusText", Encode.string statusText )
                        , ( "headers", Encode.list encodeHeader headers )
                        , ( "body", encodeHttpBody body )
                        ]
    in
    Encode.encode 0 (encodeResult result)


encodeHeader : HttpHeader -> Encode.Value
encodeHeader ( name, value ) =
    Encode.object
        [ ( "name", Encode.string name )
        , ( "value", Encode.string value )
        ]


encodeHttpBody : HttpBody -> Encode.Value
encodeHttpBody body =
    case body of
        BodyBytes bytes ->
            Encode.object
                [ ( "type", Encode.string "bytes" )
                , ( "data", Encode.list Encode.int bytes )
                ]

        BodyJson jsonValue ->
            Encode.object
                [ ( "type", Encode.string "json" )
                , ( "data", jsonValue )
                ]

        BodyString str ->
            Encode.object
                [ ( "type", Encode.string "string" )
                , ( "data", Encode.string str )
                ]


encodeRPCCallAndResult : LamderaRPC.HttpRequest -> LamderaRPC.RPCResult -> String
encodeRPCCallAndResult args result =
    Encode.encode 0
        (Encode.object
            [ ( "request", stringifyHttpRequest args |> Encode.string )
            , ( "result", stringifyRPCResult result |> Encode.string )
            ]
        )
