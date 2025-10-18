module GeneratedRPC exposing ( handleGeneratedEndpoints, generatedEndpointNames )

{-|
@docs handleGeneratedEndpoints, generatedEndpointNames
-}


import Endpoints.Demo
import Endpoints.Example
import LamderaRPC


handleGeneratedEndpoints : rawReq -> args -> model -> handleEndpointJson
handleGeneratedEndpoints rawReq =
    \args ->
        \model ->
            if (==) args.endpoint "Endpoints_Demo_greetUser" then
                LamderaRPC.handleEndpointJson
                    Endpoints.Demo.greetUser
                    args
                    model

            else if (==) args.endpoint "Endpoints_Demo_multiply" then
                LamderaRPC.handleEndpointJson Endpoints.Demo.multiply args model

            else if (==) args.endpoint "Endpoints_Example_calculateSum" then
                LamderaRPC.handleEndpointJson
                    Endpoints.Example.calculateSum
                    args
                    model

            else
                ( LamderaRPC.failWith
                    LamderaRPC.StatusBadRequest
                    ((++) "Unknown endpoint: " args.endpoint)
                , model
                , Platform.Cmd.none
                )


generatedEndpointNames : List String
generatedEndpointNames =
    [ "Endpoints_Demo_greetUser"
    , "Endpoints_Demo_multiply"
    , "Endpoints_Example_calculateSum"
    ]