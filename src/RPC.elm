module RPC exposing (..)

import Dict
import EndpointExample.Price
import Env
import Http
import Json.Encode as Encode
import Lamdera exposing (SessionId)
import Lamdera.Wire exposing (bytesDecode)
import LamderaRPC exposing (..)
import Supplemental exposing (..)
import SupplementalRPC exposing (..)
import Task
import Types exposing (..)
import Url


lamdera_handleEndpoints :
    a
    -> LamderaRPC.HttpRequest
    -> BackendModel
    -> ( LamderaRPC.RPCResult, BackendModel, Cmd BackendMsg )
lamdera_handleEndpoints rawReq args model =
    let
        ( result, newModel, cmds ) =
            case args.endpoint of
                "getModel" ->
                    LamderaRPC.handleEndpointJson getLogs args model

                "getLogs" ->
                    LamderaRPC.handleEndpointJson getLogs args model

                -- Example of long running process : Crypto Price Endpoints
                -- Necessary since Lamdera needs to respond immediately and can
                -- only provide the result after the asyncrounous calls to external
                -- services have been completed.
                "getPrice" ->
                    LamderaRPC.handleEndpointJson EndpointExample.Price.getPrice args model

                "getPriceResult" ->
                    LamderaRPC.handleEndpointJson EndpointExample.Price.getPriceResult args model

                _ ->
                    let
                        rpcFailure =
                            LamderaRPC.failWith LamderaRPC.StatusBadRequest <| "Unknown endpoint " ++ args.endpoint
                    in
                    ( rpcFailure, model, performNow (Log (encodeRPCCallAndResult args rpcFailure)) )
    in
    -- do not waste log space with logging the logs or the model requests
    case args.endpoint of
        "getModel" ->
            ( result, newModel, cmds )

        "getLogs" ->
            ( result, newModel, cmds )

        _ ->
            ( result, newModel, cmds ) |> rpcLog (encodeRPCCallAndResult args result)


getLogs _ model headers _ =
    case headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                ( Encode.list Encode.string model.logs |> Ok, model, Cmd.none )

            else
                ( Http.BadStatus 401 |> Err, model, Cmd.none )

        Nothing ->
            ( Http.BadStatus 401 |> Err, model, Cmd.none )



{-
   Expose the model via an endpoint
   VERY useful for getting live data into your local env.
-}


getModel : HttpRequest -> SessionId -> BackendModel -> Dict.Dict String String -> input -> ( Result Http.Error BackendModel, BackendModel, Cmd msg )
getModel _ _ model headers _ =
    case headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                ( model |> Ok, model, Cmd.none )

            else
                ( Http.BadStatus 401 |> Err, model, Cmd.none )

        Nothing ->
            ( Http.BadStatus 401 |> Err, model, Cmd.none )


makeModelImportUrl : String -> Maybe String
makeModelImportUrl remoteLamderaUrl =
    Url.fromString remoteLamderaUrl
        |> Maybe.map (\url -> { url | path = "/_r/getModel/" } |> Url.toString)


fetchImportedModel : String -> String -> Task.Task Http.Error BackendModel
fetchImportedModel remoteLamderaUrl modelKey =
    case makeModelImportUrl remoteLamderaUrl of
        Just url ->
            Http.task
                { method = "POST"
                , headers =
                    [ Http.header "Content-Type" "application/octet-stream"
                    , Http.header "x-lamdera-model-key" modelKey
                    ]
                , url = url |> addProxy
                , body = Http.emptyBody
                , resolver =
                    Http.bytesResolver <|
                        \response ->
                            case response of
                                Http.GoodStatus_ _ body ->
                                    case bytesDecode Types.w3_decode_BackendModel body of
                                        Just model ->
                                            Ok model

                                        Nothing ->
                                            Err (Http.BadBody "Bytes decode failed")

                                Http.BadStatus_ meta _ ->
                                    Err (Http.BadStatus meta.statusCode)

                                Http.NetworkError_ ->
                                    Err Http.NetworkError

                                Http.Timeout_ ->
                                    Err Http.Timeout

                                Http.BadUrl_ url_ ->
                                    Err (Http.BadUrl url_)
                , timeout = Nothing
                }

        Nothing ->
            Task.fail (Http.BadUrl "Remote Url Encoding Failed")



{-
   Because of the difference in function signatures, we need a seperate rpcLog
-}


rpcLog =
    Supplemental.rpcLog NoOpBackendMsg
