module RPC exposing (..)

import Dict
import EndpointExample.Price
import Env
import Http
import Lamdera exposing (SessionId)
import Lamdera.Json as Json
import Lamdera.Wire exposing (bytesDecode)
import Lamdera.Wire3 as Wire3
import LamderaRPC exposing (..)
import Logger
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


{-| Get the entire BackendModel as Wire3-encoded bytes
Requires x-lamdera-model-key header for authentication
-}
getModel : SessionId -> BackendModel -> LamderaRPC.HttpRequest -> ( LamderaRPC.RPCResult, BackendModel, Cmd msg )
getModel _ model request =
    case request.headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                ( LamderaRPC.ResultBytes <| Wire3.intListFromBytes <| Wire3.bytesEncode <| Types.w3_encode_BackendModel model
                , model
                , Cmd.none
                )

            else
                ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized"
                , model
                , Cmd.none
                )

        Nothing ->
            ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized"
            , model
            , Cmd.none
            )


{-| Set the entire BackendModel from Wire3-encoded bytes
Requires x-lamdera-model-key header for authentication
-}
setModel : SessionId -> BackendModel -> LamderaRPC.HttpRequest -> ( LamderaRPC.RPCResult, BackendModel, Cmd msg )
setModel _ currentModel request =
    case request.headers |> Dict.get "x-lamdera-model-key" of
        Just modelKey ->
            if Env.modelKey == modelKey then
                case request.body of
                    LamderaRPC.BodyBytes intList ->
                        case Wire3.bytesDecode Types.w3_decode_BackendModel (Wire3.intListToBytes intList) of
                            Just newModel ->
                                ( LamderaRPC.ResultString "Model updated successfully"
                                , newModel
                                , Cmd.none
                                )

                            Nothing ->
                                ( LamderaRPC.failWith LamderaRPC.StatusBadRequest "Failed to decode model"
                                , currentModel
                                , Cmd.none
                                )

                    _ ->
                        ( LamderaRPC.failWith LamderaRPC.StatusBadRequest "Expected bytes body"
                        , currentModel
                        , Cmd.none
                        )

            else
                ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized"
                , currentModel
                , Cmd.none
                )

        Nothing ->
            ( LamderaRPC.failWith LamderaRPC.StatusUnauthorized "Unauthorized"
            , currentModel
            , Cmd.none
            )


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
