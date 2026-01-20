module Logger exposing
    ( LogEntry
    , LogLevel(..)
    , LogState
    , Msg(..)
    , init
    , addLog
    , addLogWithTime
    , updateTimestamp
    , getRecent
    , getSinceIndex
    , getSinceTimestamp
    , getRange
    , toList
    , size
    , nextIndex
    , log
    , logInfo
    , logWarn
    , logError
    , logDebug
    , logWithCmd
    , logInfoWithCmd
    , handleMsg
    , encodeLogEntry
    , encodeLogEntries
    , decodeLogEntry
    , decodeLogEntries
    , levelToString
    , levelFromString
    )

{-| High-quality logging module for Lamdera applications.

Provides structured logging with:

  - Monotonic indices for reliable "tail" functionality
  - Timestamps for human-readable log viewing
  - Log levels for filtering and categorization
  - Efficient querying (since index, since timestamp, recent N)

## Basic Usage

    -- In your BackendModel
    type alias BackendModel =
        { logState : Logger.LogState
        , ...
        }

    -- Initialize
    init =
        { logState = Logger.init 2000
        , ...
        }

    -- Log something (in update function)
    ( model, cmd )
        |> Logger.logInfo "User logged in" GotLogTime

    -- Handle timestamp callback
    GotLogTime loggerMsg ->
        ( { model | logState = Logger.handleMsg loggerMsg model.logState }
        , Cmd.none
        )

-}

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Task
import Time



-- TYPES


{-| A single log entry with all metadata.
-}
type alias LogEntry =
    { index : Int
    , timestamp : Int -- Unix milliseconds, 0 if pending
    , level : LogLevel
    , message : String
    }


{-| Log severity levels, ordered from least to most severe.
-}
type LogLevel
    = Debug
    | Info
    | Warn
    | Error


{-| Internal state for the logging system.
Maintains a bounded buffer of log entries with monotonic indexing.
-}
type alias LogState =
    { entries : List LogEntry
    , nextIndex : Int
    , maxEntries : Int
    }


{-| Messages for async timestamp updates.
-}
type Msg
    = GotTimestamp Int Int -- index, timestamp



-- INITIALIZATION


{-| Initialize a new log state with the specified maximum entries.

    Logger.init 2000 -- Keep last 2000 log entries

-}
init : Int -> LogState
init maxEntries =
    { entries = []
    , nextIndex = 0
    , maxEntries = max 1 maxEntries -- At least 1 entry
    }



-- ADDING LOGS


{-| Add a log entry without a timestamp (timestamp = 0).
Use this when you'll update the timestamp later via Cmd.

Returns the created entry and the new state.

-}
addLog : LogLevel -> String -> LogState -> ( LogEntry, LogState )
addLog level message state =
    addLogWithTime level message 0 state


{-| Add a log entry with a known timestamp.
Use this when you already have Time.Posix available.

    addLogWithTime Info "Started" (Time.posixToMillis time) state

-}
addLogWithTime : LogLevel -> String -> Int -> LogState -> ( LogEntry, LogState )
addLogWithTime level message timestamp state =
    let
        entry =
            { index = state.nextIndex
            , timestamp = timestamp
            , level = level
            , message = message
            }

        newEntries =
            entry :: state.entries |> List.take state.maxEntries
    in
    ( entry
    , { state
        | entries = newEntries
        , nextIndex = state.nextIndex + 1
      }
    )


{-| Update the timestamp of a log entry by index.
Called when the async Time.now task completes.
-}
updateTimestamp : Int -> Int -> LogState -> LogState
updateTimestamp index timestamp state =
    { state
        | entries =
            List.map
                (\entry ->
                    if entry.index == index then
                        { entry | timestamp = timestamp }

                    else
                        entry
                )
                state.entries
    }



-- QUERYING


{-| Get the N most recent log entries, newest first.

    getRecent 50 state -- Last 50 logs

-}
getRecent : Int -> LogState -> List LogEntry
getRecent n state =
    List.take n state.entries


{-| Get all log entries since (and including) the given index.
Returns entries in chronological order (oldest first).

    getSinceIndex 1000 state -- All logs with index >= 1000

-}
getSinceIndex : Int -> LogState -> List LogEntry
getSinceIndex minIndex state =
    state.entries
        |> List.filter (\e -> e.index >= minIndex)
        |> List.reverse


{-| Get all log entries since the given timestamp (inclusive).
Returns entries in chronological order (oldest first).

    getSinceTimestamp 1699900000000 state -- Logs since that time

-}
getSinceTimestamp : Int -> LogState -> List LogEntry
getSinceTimestamp minTimestamp state =
    state.entries
        |> List.filter (\e -> e.timestamp >= minTimestamp)
        |> List.reverse


{-| Get log entries in an index range [fromIndex, toIndex].
Returns entries in chronological order (oldest first).
-}
getRange : Int -> Int -> LogState -> List LogEntry
getRange fromIndex toIndex state =
    state.entries
        |> List.filter (\e -> e.index >= fromIndex && e.index <= toIndex)
        |> List.reverse


{-| Get all log entries in chronological order (oldest first).
-}
toList : LogState -> List LogEntry
toList state =
    List.reverse state.entries


{-| Get the current number of stored log entries.
-}
size : LogState -> Int
size state =
    List.length state.entries


{-| Get the next index that will be assigned.
Useful for CLI to know where to start tailing from.
-}
nextIndex : LogState -> Int
nextIndex state =
    state.nextIndex



-- BACKEND UPDATE PATTERN HELPERS


{-| Log a message and fire a Cmd to get the timestamp.
Fits the Lamdera Backend update pattern.

    update msg model =
        case msg of
            SomeEvent ->
                ( model, Cmd.none )
                    |> Logger.log Info "Event occurred" GotLogTime

            GotLogTime loggerMsg ->
                ( { model | logState = Logger.handleMsg loggerMsg model.logState }
                , Cmd.none
                )

-}
log :
    LogLevel
    -> String
    -> (Msg -> msg)
    -> ( { a | logState : LogState }, Cmd msg )
    -> ( { a | logState : LogState }, Cmd msg )
log level message toMsg ( model, cmd ) =
    let
        ( entry, newLogState ) =
            addLog level message model.logState

        timestampCmd =
            Time.now
                |> Task.perform
                    (\time ->
                        toMsg (GotTimestamp entry.index (Time.posixToMillis time))
                    )

        _ =
            Debug.log (levelToString level) message
    in
    ( { model | logState = newLogState }
    , Cmd.batch [ cmd, timestampCmd ]
    )


{-| Convenience: Log at Info level.
-}
logInfo :
    String
    -> (Msg -> msg)
    -> ( { a | logState : LogState }, Cmd msg )
    -> ( { a | logState : LogState }, Cmd msg )
logInfo =
    log Info


{-| Convenience: Log at Warn level.
-}
logWarn :
    String
    -> (Msg -> msg)
    -> ( { a | logState : LogState }, Cmd msg )
    -> ( { a | logState : LogState }, Cmd msg )
logWarn =
    log Warn


{-| Convenience: Log at Error level.
-}
logError :
    String
    -> (Msg -> msg)
    -> ( { a | logState : LogState }, Cmd msg )
    -> ( { a | logState : LogState }, Cmd msg )
logError =
    log Error


{-| Convenience: Log at Debug level.
-}
logDebug :
    String
    -> (Msg -> msg)
    -> ( { a | logState : LogState }, Cmd msg )
    -> ( { a | logState : LogState }, Cmd msg )
logDebug =
    log Debug


{-| Log a message and return the new state with a Cmd.
Useful when you don't have a model+cmd tuple pattern.

    let
        ( newLogState, logCmd ) =
            Logger.logWithCmd Info "Message" model.logState
    in
    ( { model | logState = newLogState }, Cmd.map GotLogTime logCmd )

-}
logWithCmd : LogLevel -> String -> LogState -> ( LogState, Cmd Msg )
logWithCmd level message state =
    let
        ( entry, newLogState ) =
            addLog level message state

        timestampCmd =
            Time.now
                |> Task.perform
                    (\time ->
                        GotTimestamp entry.index (Time.posixToMillis time)
                    )

        _ =
            Debug.log (levelToString level) message
    in
    ( newLogState, timestampCmd )


{-| Convenience: Log at Info level returning state and cmd.
-}
logInfoWithCmd : String -> LogState -> ( LogState, Cmd Msg )
logInfoWithCmd =
    logWithCmd Info


{-| Handle Logger messages (timestamp updates).
Call this in your Backend update function.
-}
handleMsg : Msg -> LogState -> LogState
handleMsg msg state =
    case msg of
        GotTimestamp index timestamp ->
            updateTimestamp index timestamp state



-- JSON ENCODING/DECODING


{-| Encode a single log entry to JSON.
-}
encodeLogEntry : LogEntry -> Encode.Value
encodeLogEntry entry =
    Encode.object
        [ ( "i", Encode.int entry.index )
        , ( "t", Encode.int entry.timestamp )
        , ( "l", Encode.string (levelToString entry.level) )
        , ( "m", Encode.string entry.message )
        ]


{-| Encode a list of log entries to JSON.
-}
encodeLogEntries : List LogEntry -> Encode.Value
encodeLogEntries entries =
    Encode.list encodeLogEntry entries


{-| Decode a single log entry from JSON.
-}
decodeLogEntry : Decoder LogEntry
decodeLogEntry =
    Decode.map4 LogEntry
        (Decode.field "i" Decode.int)
        (Decode.field "t" Decode.int)
        (Decode.field "l" (Decode.string |> Decode.andThen decodeLevelHelper))
        (Decode.field "m" Decode.string)


decodeLevelHelper : String -> Decoder LogLevel
decodeLevelHelper str =
    case levelFromString str of
        Just level ->
            Decode.succeed level

        Nothing ->
            Decode.fail ("Unknown log level: " ++ str)


{-| Decode a list of log entries from JSON.
-}
decodeLogEntries : Decoder (List LogEntry)
decodeLogEntries =
    Decode.list decodeLogEntry



-- LOG LEVEL UTILITIES


{-| Convert LogLevel to string for display/serialization.
-}
levelToString : LogLevel -> String
levelToString level =
    case level of
        Debug ->
            "DEBUG"

        Info ->
            "INFO"

        Warn ->
            "WARN"

        Error ->
            "ERROR"


{-| Parse a string into a LogLevel.
-}
levelFromString : String -> Maybe LogLevel
levelFromString str =
    case String.toUpper str of
        "DEBUG" ->
            Just Debug

        "INFO" ->
            Just Info

        "WARN" ->
            Just Warn

        "ERROR" ->
            Just Error

        _ ->
            Nothing
