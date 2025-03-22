module Supplemental exposing (..)

import Env
import Http
import Json.Decode as Decode
import Json.Decode.Pipeline as Pipeline
import Json.Encode as Encode
import Process
import Task
import Time



{-
   HTTP helpers
-}


addProxy : String -> String
addProxy url =
    if Env.mode == Env.Development then
        "http://localhost:8001/" ++ url

    else
        url


responseStringToResult : Http.Response body -> Result Http.Error body
responseStringToResult response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata _ ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ _ body ->
            Ok body


handleHttpResponse : (body -> Result Http.Error value) -> Http.Response body -> Result Http.Error value
handleHttpResponse decoder response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata _ ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ _ body ->
            decoder body


responseToString : Http.Response body -> String
responseToString response =
    case response of
        Http.BadUrl_ url ->
            "Bad URL: " ++ url

        Http.Timeout_ ->
            "Request timed out"

        Http.NetworkError_ ->
            "Network error"

        Http.BadStatus_ metadata _ ->
            "Bad status: " ++ String.fromInt metadata.statusCode ++ " " ++ metadata.statusText

        Http.GoodStatus_ metadata _ ->
            "Good status: " ++ String.fromInt metadata.statusCode ++ " " ++ metadata.statusText


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        Http.BadUrl url ->
            "Bad URL: " ++ url

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus statusCode ->
            "Bad status: " ++ String.fromInt statusCode

        Http.BadBody message ->
            "Bad body: " ++ message


handleJsonResponse : Decode.Decoder a -> Http.Response String -> Result Http.Error a
handleJsonResponse decoder response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata _ ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ _ body ->
            case Decode.decodeString decoder body of
                Ok value ->
                    Ok value

                Err err ->
                    Err (Http.BadBody (Decode.errorToString err))



{-
   Logging
-}


log noop logMsg ( model, cmd ) =
    let
        _ =
            Debug.log "Log: " logMsg

        logSize =
            Env.logSize |> String.toInt |> Maybe.withDefault 2000

        -- x =
        --     Time.now
        model_ =
            { model | logs = logMsg :: model.logs |> List.take logSize }

        extraCmd =
            sendSlackMessage Env.slackApiToken Env.slackChannel logMsg
                |> Task.attempt (\_ -> noop)
    in
    ( model_, Cmd.batch [ cmd, extraCmd ] )


rpcLog noop logMsg ( rpcResponse, model, cmds ) =
    let
        ( newModel, newCmd ) =
            log noop logMsg ( model, cmds )
    in
    ( rpcResponse, newModel, newCmd )



{-
   Message triggers
-}


performNow : msg -> Cmd msg
performNow msg =
    Task.perform (\_ -> msg) (Task.succeed ())


getTime : (Time.Posix -> msg) -> Cmd msg
getTime msg =
    Task.perform msg Time.now


waitThenPerform : Float -> msg -> Cmd msg
waitThenPerform ms msg =
    Task.perform (\_ -> msg) (Process.sleep ms)



{-
   Simple Decoders
-}


at_ : String -> Decode.Decoder a -> Decode.Decoder a
at_ path decoder =
    Decode.at (String.split "." path) decoder


requiredAt_ : String -> Decode.Decoder a -> Decode.Decoder (a -> b) -> Decode.Decoder b
requiredAt_ path decoder =
    Pipeline.requiredAt (String.split "." path) decoder


optionalAt_ : String -> Decode.Decoder a -> a -> Decode.Decoder (a -> b) -> Decode.Decoder b
optionalAt_ path valDecoder fallback decoder =
    Pipeline.optionalAt (String.split "." path) valDecoder fallback decoder



{-
   Slack Integration
-}


slackApiUrl : String
slackApiUrl =
    "https://slack.com/api/chat.postMessage"


sendSlackMessage : String -> String -> String -> Task.Task Http.Error ()
sendSlackMessage token channel message =
    let
        body =
            Encode.object
                [ ( "channel", Encode.string channel )
                , ( "text", Encode.string message )
                ]

        headers =
            [ Http.header "Authorization" ("Bearer " ++ token)
            ]

        _ =
            Debug.log "sendSlackMessage__" ()
    in
    Http.task
        { method = "POST"
        , headers = headers
        , url = addProxy slackApiUrl
        , body = Http.jsonBody body
        , resolver = Http.stringResolver (handleHttpResponse (always (Ok ())))
        , timeout = Nothing
        }



{-
   Float to display string helpers
-}


type FloatString
    = Float String
    | NaN
    | Infinity


formatFloat : Int -> Float -> FloatString
formatFloat decimals value =
    let
        factor =
            10 ^ decimals |> toFloat

        roundedValue =
            (round (value * factor) |> toFloat) / factor

        paddedValue =
            String.fromFloat roundedValue

        split =
            String.split "." paddedValue
    in
    case ( isNaN value, isInfinite value, split ) of
        ( True, _, _ ) ->
            NaN

        ( _, True, _ ) ->
            Infinity

        ( _, _, [ intPart ] ) ->
            (if decimals == 0 then
                intPart

             else
                intPart ++ "." ++ String.repeat decimals "0"
            )
                |> Float

        ( _, _, [ intPart, decPart ] ) ->
            (if String.length decPart < decimals then
                intPart ++ "." ++ decPart ++ String.repeat (decimals - String.length decPart) "0"

             else
                intPart ++ "." ++ String.left decimals decPart
            )
                |> Float

        _ ->
            NaN


formatPrice : String -> Float -> String
formatPrice currency price =
    case formatFloat 2 price of
        Float formattedPrice ->
            if (currency |> String.length) > 1 then
                formattedPrice ++ " " ++ currency

            else
                currency ++ " " ++ formattedPrice

        _ ->
            "N/A"


formatPercent : Float -> String
formatPercent percent =
    case formatFloat 1 percent of
        Float formattedPercent ->
            (if percent > 0 then
                "+" ++ formattedPercent

             else
                formattedPercent
            )
                ++ "%"

        _ ->
            "N/A"


formatPercentWithoutSign : Float -> String
formatPercentWithoutSign percent =
    case formatFloat 1 percent of
        Float formattedPercent ->
            formattedPercent ++ "%"

        _ ->
            "N/A"



{-
   Basic dates
-}


monthToString : Time.Month -> String
monthToString month =
    case month of
        Time.Jan ->
            "January"

        Time.Feb ->
            "February"

        Time.Mar ->
            "March"

        Time.Apr ->
            "April"

        Time.May ->
            "May"

        Time.Jun ->
            "June"

        Time.Jul ->
            "July"

        Time.Aug ->
            "August"

        Time.Sep ->
            "September"

        Time.Oct ->
            "October"

        Time.Nov ->
            "November"

        Time.Dec ->
            "December"


monthToInt : Time.Month -> number
monthToInt month =
    case month of
        Time.Jan ->
            1

        Time.Feb ->
            2

        Time.Mar ->
            3

        Time.Apr ->
            4

        Time.May ->
            5

        Time.Jun ->
            6

        Time.Jul ->
            7

        Time.Aug ->
            8

        Time.Sep ->
            9

        Time.Oct ->
            10

        Time.Nov ->
            11

        Time.Dec ->
            12


formatDate : Time.Posix -> String
formatDate time =
    let
        year_ =
            String.fromInt (Time.toYear Time.utc time)

        month_ =
            String.padLeft 2 '0' (String.fromInt (Time.toMonth Time.utc time |> monthToInt))

        day_ =
            String.padLeft 2 '0' (String.fromInt (Time.toDay Time.utc time))
    in
    year_ ++ "-" ++ month_ ++ "-" ++ day_


second : number
second =
    1000


minute : number
minute =
    60 * second


hour : number
hour =
    60 * minute


day : number
day =
    24 * hour


week : number
week =
    7 * day
