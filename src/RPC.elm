module RPC exposing (..)

import Dict
import Env
import Http
import Lamdera exposing (SessionId)
import Lamdera.Json as Json
import Lamdera.Wire3 as Wire3
import LamderaRPC exposing (..)
import Logger
import Supplemental exposing (..)
import Types exposing (..)


lamdera_handleEndpoints :
    a
    -> LamderaRPC.HttpRequest
    -> BackendModel
    -> ( LamderaRPC.RPCResult, BackendModel, Cmd BackendMsg )
lamdera_handleEndpoints rawReq args model =
    case args.endpoint of
        "getModel" ->
            getModel args model

        "getLogs" ->
            LamderaRPC.handleEndpointJson getLogs args model

        _ ->
            let
                rpcFailure =
                    LamderaRPC.failWith LamderaRPC.StatusBadRequest <| "Unknown endpoint " ++ args.endpoint
            in
            ( rpcFailure, model, Cmd.none )


{-| Get the entire BackendModel as Wire3-encoded bytes
Requires x-lamdera-model-key header for authentication
-}
getModel : LamderaRPC.HttpRequest -> BackendModel -> ( LamderaRPC.RPCResult, BackendModel, Cmd msg )
getModel args model =
    case args.headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                let
                    encodedBytes =
                        Wire3.bytesEncode (Types.w3_encode_BackendModel model)
                            |> Wire3.intListFromBytes
                in
                ( LamderaRPC.ResultBytes encodedBytes, model, Cmd.none )

            else
                ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Invalid model key", model, Cmd.none )

        Nothing ->
            ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Missing x-lamdera-model-key header", model, Cmd.none )


{-| Get logs as JSON
Requires x-lamdera-model-key header for authentication
-}
getLogs : SessionId -> BackendModel -> Dict.Dict String String -> Json.Value -> ( Result Http.Error Json.Value, BackendModel, Cmd msg )
getLogs _ model headers _ =
    case headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                let
                    logEntries =
                        Logger.toList model.logState

                    logsJson =
                        Logger.encodeLogEntries logEntries
                in
                ( Ok logsJson, model, Cmd.none )

            else
                ( Http.BadStatus 401 |> Err, model, Cmd.none )

        Nothing ->
            ( Http.BadStatus 401 |> Err, model, Cmd.none )
