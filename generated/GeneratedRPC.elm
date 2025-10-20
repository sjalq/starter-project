module GeneratedRPC exposing ( handleGeneratedEndpoints, generatedEndpointNames )

{-|
@docs handleGeneratedEndpoints, generatedEndpointNames
-}


import LamderaRPC
import Types


handleGeneratedEndpoints :
    rawReq
    -> LamderaRPC.HttpRequest
    -> Types.BackendModel
    -> ( LamderaRPC.RPCResult, Types.BackendModel, Cmd Types.BackendMsg )
handleGeneratedEndpoints rawReq =
    \args ->
        \model ->
            ( LamderaRPC.failWith
                LamderaRPC.StatusBadRequest
                "Generated @rpc endpoints require JSON codec implementation"
            , model
            , Cmd.none
            )


generatedEndpointNames : List String
generatedEndpointNames =
    [ "Endpoints_Demo_greetUser"
    , "Endpoints_Demo_multiply"
    , "Endpoints_Example_calculateSum"
    ]