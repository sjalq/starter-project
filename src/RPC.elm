module RPC exposing (..)

import Dict
import EndpointExample.Price
import Env
import Http
import Lamdera exposing (SessionId)
import Lamdera.Json as Json
import Lamdera.Wire3 as Wire3
import LamderaRPC
import Logger
import SupplementalRPC exposing (..)
import Types exposing (..)


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
                    LamderaRPC.handleEndpoint getModel args model

                "setModel" ->
                    LamderaRPC.handleEndpoint setModel args model

                "getLogs" ->
                    LamderaRPC.handleEndpointJson getLogs args model

                -- Example of long running process : Crypto Price Endpoints
                -- Necessary since Lamdera needs to respond immediately and can
                -- only provide the result after the asynchronous calls to external
                -- services have been completed.
                "getPrice" ->
                    LamderaRPC.handleEndpointJson EndpointExample.Price.getPrice args model

                "getPriceResult" ->
                    LamderaRPC.handleEndpointJson EndpointExample.Price.getPriceResult args model

                _ ->
                    let
                        rpcFailure =
                            LamderaRPC.failWith LamderaRPC.StatusNotFound <| "Unknown endpoint: " ++ args.endpoint
                    in
                    ( rpcFailure, model, Cmd.none )
    in
    -- do not waste log space with logging the logs or the model requests
    case args.endpoint of
        "getModel" ->
            ( result, newModel, cmds )

        "setModel" ->
            ( result, newModel, cmds )

        "getLogs" ->
            ( result, newModel, cmds )

        _ ->
            ( result, newModel, cmds ) |> rpcLog (encodeRPCCallAndResult args result)


{-| True when the request carries the configured `x-lamdera-model-key`.

The development default key is refused in Production, so a forgotten
dashboard setting cannot expose the whole BackendModel.

-}
isAuthorized : Dict.Dict String String -> Bool
isAuthorized headers =
    let
        keyIsUsable =
            not (String.isEmpty Env.modelKey)
                && (Env.mode == Env.Development || Env.modelKey /= developmentModelKey)
    in
    keyIsUsable && Dict.get "x-lamdera-model-key" headers == Just Env.modelKey


developmentModelKey : String
developmentModelKey =
    "1234567890"


{-| Get logs as JSON
Requires x-lamdera-model-key header for authentication
-}
getLogs : SessionId -> BackendModel -> Dict.Dict String String -> Json.Value -> ( Result Http.Error Json.Value, BackendModel, Cmd msg )
getLogs _ model headers _ =
    if isAuthorized headers then
        ( Ok (Logger.encodeLogEntries (Logger.toList model.logState)), model, Cmd.none )

    else
        ( Http.BadStatus 401 |> Err, model, Cmd.none )


{-| Get the entire BackendModel as Wire3-encoded bytes
Requires x-lamdera-model-key header for authentication
-}
getModel : SessionId -> BackendModel -> LamderaRPC.HttpRequest -> ( LamderaRPC.RPCResult, BackendModel, Cmd msg )
getModel _ model request =
    if isAuthorized request.headers then
        ( LamderaRPC.ResultBytes <| Wire3.intListFromBytes <| Wire3.bytesEncode <| Types.w3_encode_BackendModel model
        , model
        , Cmd.none
        )

    else
        ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized", model, Cmd.none )


{-| Set the entire BackendModel from Wire3-encoded bytes
Requires x-lamdera-model-key header for authentication
-}
setModel : SessionId -> BackendModel -> LamderaRPC.HttpRequest -> ( LamderaRPC.RPCResult, BackendModel, Cmd msg )
setModel _ currentModel request =
    if isAuthorized request.headers then
        case request.body of
            LamderaRPC.BodyBytes intList ->
                case Wire3.bytesDecode Types.w3_decode_BackendModel (Wire3.intListToBytes intList) of
                    Just newModel ->
                        ( LamderaRPC.ResultString "Model updated successfully", newModel, Cmd.none )

                    Nothing ->
                        ( LamderaRPC.failWith LamderaRPC.StatusBadRequest "Failed to decode model", currentModel, Cmd.none )

            _ ->
                ( LamderaRPC.failWith LamderaRPC.StatusBadRequest "Expected bytes body", currentModel, Cmd.none )

    else
        ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized", currentModel, Cmd.none )


{-| Because of the difference in function signatures, we need a separate rpcLog
-}
rpcLog :
    String
    -> ( LamderaRPC.RPCResult, BackendModel, Cmd BackendMsg )
    -> ( LamderaRPC.RPCResult, BackendModel, Cmd BackendMsg )
rpcLog message ( result, model, cmd ) =
    let
        ( newLogState, logCmd ) =
            Logger.logInfoWithCmd message model.logState
    in
    ( result
    , { model | logState = newLogState }
    , Cmd.batch [ cmd, Cmd.map (\msg -> GotLogTime msg) logCmd ]
    )
