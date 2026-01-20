module AsyncRPC exposing (Config, handlePollingResult, handleTaskChain)

import Dict
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Lamdera exposing (SessionId)
import LamderaRPC exposing (Headers)
import Supplemental exposing (httpErrorToString)
import Task
import Time
import Types exposing (..)



{-
   Async RPC Task Chain Handler with Time Tracking
-}


type alias Config a =
    { taskChain : Task.Task Http.Error a
    , resultEncoder : a -> String
    }


handleTaskChain : SessionId -> BackendModel -> Headers -> Encode.Value -> Config a -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
handleTaskChain _ model _ _ config =
    let
        token =
            String.fromInt (Dict.size model.pollingJobs)

        updatedModel =
            { model | pollingJobs = Dict.insert token Busy model.pollingJobs }

        -- Main task to execute the task chain
        mainCmd =
            Task.attempt (handleTaskResult token config.resultEncoder) config.taskChain

        -- Secondary task to get the current timestamp
        timeCmd =
            Time.now
                |> Task.map Time.posixToMillis
                |> Task.attempt (handleTimeResult token)

        response =
            Encode.object [ ( "token", Encode.string token ) ]
    in
    ( Ok response, updatedModel, Cmd.batch [ mainCmd, timeCmd ] )


handleTaskResult : PollingToken -> (a -> String) -> Result Http.Error a -> BackendMsg
handleTaskResult token encoder result =
    case result of
        Ok data ->
            -- Encode the result using the provided encoder and store it in the polling jobs
            let
                encodedData =
                    encoder data
            in
            StoreTaskResult token (Ok encodedData)

        Err err ->
            -- Store the error message in the polling jobs
            StoreTaskResult token (Err (httpErrorToString err))


handleTimeResult : PollingToken -> Result x Int -> BackendMsg
handleTimeResult token result =
    case result of
        Ok timestamp ->
            GotJobTime token timestamp

        Err _ ->
            -- If time fetch fails, just ignore
            NoOpBackendMsg


handlePollingResult : SessionId -> BackendModel -> Headers -> Encode.Value -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
handlePollingResult _ model _ json =
    case Decode.decodeValue (Decode.field "token" Decode.string) json of
        Ok token ->
            case Dict.get token model.pollingJobs of
                Just Busy ->
                    ( Ok (Encode.object [ ( "status", Encode.string "busy" ) ]), model, Cmd.none )

                Just (BusyWithTime timestamp) ->
                    ( Ok
                        (Encode.object
                            [ ( "status", Encode.string "busy" )
                            , ( "time", Encode.int timestamp )
                            ]
                        )
                    , model
                    , Cmd.none
                    )

                Just (Ready (Ok data)) ->
                    ( Ok (Encode.object [ ( "status", Encode.string "ready" ), ( "data", Encode.string data ) ]), model, Cmd.none )

                Just (Ready (Err err)) ->
                    ( Ok (Encode.object [ ( "status", Encode.string "error" ), ( "data", Encode.string err ) ]), model, Cmd.none )

                Nothing ->
                    ( Err (Http.BadBody "Invalid polling token"), model, Cmd.none )

        Err _ ->
            ( Err (Http.BadBody "Missing token in request"), model, Cmd.none )
