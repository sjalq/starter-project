module EndpointExample.Price exposing (fetchEthPriceInZar, getPrice, getPriceResult)

import AsyncRPC
import Env
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Lamdera exposing (SessionId)
import LamderaRPC exposing (Headers)
import Supplemental exposing (..)
import Task exposing (Task)
import Types exposing (..)



-- Starts the ETH/ZAR task chain and immediately returns a polling token


getPrice : SessionId -> BackendModel -> Headers -> Encode.Value -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
getPrice sessionId model headers json =
    AsyncRPC.handleTaskChain sessionId
        model
        headers
        json
        { taskChain = fetchEthPriceInZar
        , resultEncoder = identity
        }



-- Returns the status or result of a job started by getPrice


getPriceResult : SessionId -> BackendModel -> Headers -> Encode.Value -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
getPriceResult sessionId model headers json =
    AsyncRPC.handlePollingResult sessionId model headers json



-- Fetches the ETH/USD price and USD/ZAR rate in a single task chain, logging each step to Slack when configured


fetchEthPriceInZar : Task Http.Error String
fetchEthPriceInZar =
    let
        log message =
            if String.isEmpty Env.slackApiToken then
                Task.succeed ()

            else
                sendSlackMessage Env.slackApiToken Env.slackChannel message
                    |> Task.map (\_ -> ())
                    |> Task.onError (\_ -> Task.succeed ())
    in
    log "Fetching ETH price"
        |> Task.andThen (\_ -> fetchEthPrice)
        |> Task.andThen
            (\ethUsd ->
                log ("ETH price fetched: " ++ String.fromFloat ethUsd ++ " USD")
                    |> Task.andThen (\_ -> fetchZarRate)
                    |> Task.map (\usdZar -> { ethUsd = ethUsd, usdZar = usdZar })
            )
        |> Task.andThen
            (\rates ->
                let
                    ethZar =
                        rates.ethUsd * rates.usdZar
                in
                log ("Final price calculated: " ++ String.fromFloat ethZar ++ " ZAR")
                    |> Task.map
                        (\_ ->
                            Encode.object
                                [ ( "ethUsd", Encode.float rates.ethUsd )
                                , ( "usdZar", Encode.float rates.usdZar )
                                , ( "ethZar", Encode.float ethZar )
                                ]
                                |> Encode.encode 0
                        )
            )



-- Fetches ETH price from Coingecko API


fetchEthPrice : Task Http.Error Float
fetchEthPrice =
    Http.task
        { method = "GET"
        , headers = []
        , url = addProxy "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        , body = Http.emptyBody
        , resolver =
            Http.stringResolver <|
                handleHttpResponse
                    (Decode.decodeString (Decode.field "ethereum" (Decode.field "usd" Decode.float))
                        >> Result.mapError (\_ -> Http.BadBody "Failed to decode ETH price")
                    )
        , timeout = Just 10000
        }



-- Fetches USD/ZAR rate from Exchange Rates API


fetchZarRate : Task Http.Error Float
fetchZarRate =
    Http.task
        { method = "GET"
        , headers = []
        , url = addProxy "https://open.er-api.com/v6/latest/USD"
        , body = Http.emptyBody
        , resolver =
            Http.stringResolver <|
                handleHttpResponse
                    (Decode.decodeString (Decode.field "rates" (Decode.field "ZAR" Decode.float))
                        >> Result.mapError (\_ -> Http.BadBody "Failed to decode ZAR rate")
                    )
        , timeout = Just 10000
        }
