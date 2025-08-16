module EndpointExample.Price exposing (fetchEthPriceInZar, getPrice, getPriceResult)

import AsyncRPC
import Env
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Lamdera exposing (SessionId)
import LamderaRPC exposing (Headers)
import Process
import Supplemental exposing (..)
import Task exposing (Task)
import Types exposing (..)



-- Fetches both ETH price and ZAR rate, multiplies them and returns result through polling


getPrice : SessionId -> BackendModel -> Headers -> Encode.Value -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
getPrice sessionId model headers json =
    let
        config =
            { taskChain = fetchEthPriceInZar
            , resultEncoder = identity
            }
    in
    AsyncRPC.handleTaskChain sessionId model headers json config



-- Generic polling result handler


getPriceResult : SessionId -> BackendModel -> Headers -> Encode.Value -> ( Result Http.Error Encode.Value, BackendModel, Cmd BackendMsg )
getPriceResult sessionId model headers json =
    AsyncRPC.handlePollingResult sessionId model headers json



-- Fetches ETH price and ZAR rate in a single task chain with logging, and gets an ETH joke from OpenAI


fetchEthPriceInZar : Task Http.Error String
fetchEthPriceInZar =
    let
        log message =
            sendSlackMessage Env.slackApiToken Env.slackChannel message
                |> Task.map (\_ -> ())
                |> Task.onError (\_ -> Task.succeed ())
    in
    log "Starting to fetch ETH price"
        |> Task.andThen (\_ -> fetchEthPrice)
        |> Task.andThen
            (\ethPrice ->
                log ("ETH price fetched: " ++ String.fromFloat ethPrice ++ " USD")
                    |> Task.map (\_ -> ethPrice)
            )
        |> Task.andThen
            (\ethPrice ->
                log "Starting 1-minute delay between API calls"
                    |> Task.map (\_ -> ethPrice)
            )
        |> Task.andThen
            (\ethPrice ->
                Process.sleep (10 * second)
                    |> Task.map (\_ -> ethPrice)
            )
        |> Task.andThen
            (\ethPrice ->
                log "Delay finished, fetching ZAR rate"
                    |> Task.map (\_ -> ethPrice)
            )
        |> Task.andThen
            (\ethPrice ->
                fetchZarRate
                    |> Task.map (\zarRate -> { ethPrice = ethPrice, zarRate = zarRate })
            )
        |> Task.andThen
            (\data ->
                let
                    finalPrice =
                        data.ethPrice * data.zarRate
                in
                log ("ZAR rate fetched: " ++ String.fromFloat data.zarRate ++ ", final price: " ++ String.fromFloat finalPrice ++ " ZAR")
                    |> Task.map (\_ -> { price = finalPrice, ethPrice = data.ethPrice, zarRate = data.zarRate })
            )
        |> Task.andThen
            (\priceData ->
                log "Fetching joke about ETH price from OpenAI"
                    |> Task.map (\_ -> priceData)
            )
        |> Task.andThen
            (\priceData ->
                fetchJokeAboutEthPrice priceData.price
                    |> Task.map (\joke -> { price = priceData.price, joke = joke })
            )
        |> Task.andThen
            (\result ->
                log ("Got joke: " ++ result.joke)
                    |> Task.map (\_ -> result)
            )
        |> Task.map
            (\result ->
                Encode.object
                    [ ( "price", Encode.float result.price )
                    , ( "joke", Encode.string result.joke )
                    ]
                    |> Encode.encode 0
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



-- Fetches ZAR/USD rate from Exchange Rates API


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



-- Fetches a joke about ETH price in ZAR from OpenAI


fetchJokeAboutEthPrice : Float -> Task Http.Error String
fetchJokeAboutEthPrice price =
    let
        prompt =
            "Tell me a short, funny joke about the price of Ethereum being " ++ String.fromFloat price ++ " South African Rand (ZAR). Make it ONE short sentence only."

        requestBody =
            Encode.object
                [ ( "model", Encode.string "gpt-3.5-turbo" )
                , ( "messages"
                  , Encode.list
                        (\msg -> Encode.object msg)
                        [ [ ( "role", Encode.string "system" )
                          , ( "content", Encode.string "You are a helpful assistant that creates short, funny jokes." )
                          ]
                        , [ ( "role", Encode.string "user" )
                          , ( "content", Encode.string prompt )
                          ]
                        ]
                  )
                ]
    in
    if String.isEmpty Env.openAiApiKey then
        Task.succeed "Ethereum price is so high in Rands, even my wallet is crying in two languages!"

    else
        Http.task
            { method = "POST"
            , headers =
                [ Http.header "Authorization" ("Bearer " ++ Env.openAiApiKey)
                ]
            , url = addProxy "https://api.openai.com/v1/chat/completions"
            , body = Http.jsonBody requestBody
            , resolver = Http.stringResolver <| handleHttpResponse openAiResponseDecoder
            , timeout = Nothing
            }



-- Decoder for OpenAI's response


openAiResponseDecoder : String -> Result Http.Error String
openAiResponseDecoder responseBody =
    let
        decoder =
            Decode.field "choices"
                (Decode.index 0
                    (Decode.field "message"
                        (Decode.field "content" Decode.string)
                    )
                )
    in
    case Decode.decodeString decoder responseBody of
        Ok content ->
            Ok (String.trim content)

        Err err ->
            Err (Http.BadBody (Decode.errorToString err))
