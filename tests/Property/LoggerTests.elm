module Property.LoggerTests exposing (suite)

import Expect
import Fuzz exposing (Fuzzer)
import Fuzzers.DomainFuzzers exposing (logLevelFuzzer)
import Json.Decode as Decode
import Logger exposing (..)
import Test exposing (..)


suite : Test
suite =
    describe "Logger Properties"
        [ describe "init"
            [ fuzz (Fuzz.intRange 1 100) "creates empty state with correct maxEntries" <|
                \maxEntries ->
                    let
                        state =
                            Logger.init maxEntries
                    in
                    Expect.all
                        [ \_ -> Expect.equal (Logger.size state) 0
                        , \_ -> Expect.equal (Logger.nextIndex state) 0
                        ]
                        ()
            , test "minimum maxEntries is 1" <|
                \_ ->
                    let
                        state =
                            Logger.init 0

                        ( _, afterLog ) =
                            Logger.addLog Info "test" state
                    in
                    Logger.size afterLog
                        |> Expect.atMost 1
            ]
        , describe "addLog"
            [ fuzz2 logLevelFuzzer Fuzz.string "increases nextIndex by 1" <|
                \level message ->
                    let
                        state =
                            Logger.init 100

                        prevIndex =
                            Logger.nextIndex state

                        ( _, newState ) =
                            Logger.addLog level message state
                    in
                    Logger.nextIndex newState
                        |> Expect.equal (prevIndex + 1)
            , fuzz2 logLevelFuzzer Fuzz.string "increases size by 1 (when under capacity)" <|
                \level message ->
                    let
                        state =
                            Logger.init 100

                        prevSize =
                            Logger.size state

                        ( _, newState ) =
                            Logger.addLog level message state
                    in
                    Logger.size newState
                        |> Expect.equal (prevSize + 1)
            , fuzz2 logLevelFuzzer Fuzz.string "entry has correct level and message" <|
                \level message ->
                    let
                        state =
                            Logger.init 100

                        ( entry, _ ) =
                            Logger.addLog level message state
                    in
                    Expect.all
                        [ \e -> Expect.equal e.level level
                        , \e -> Expect.equal e.message message
                        , \e -> Expect.equal e.index 0
                        , \e -> Expect.equal e.timestamp 0
                        ]
                        entry
            ]
        , describe "Capacity bounds"
            [ fuzz (Fuzz.intRange 1 50) "size never exceeds maxEntries" <|
                \maxEntries ->
                    let
                        state =
                            Logger.init maxEntries

                        addMany n s =
                            if n <= 0 then
                                s

                            else
                                let
                                    ( _, s2 ) =
                                        Logger.addLog Info ("Msg " ++ String.fromInt n) s
                                in
                                addMany (n - 1) s2

                        finalState =
                            addMany (maxEntries + 10) state
                    in
                    Logger.size finalState
                        |> Expect.atMost maxEntries
            , test "oldest entries are removed when at capacity" <|
                \_ ->
                    let
                        state =
                            Logger.init 3

                        ( _, s1 ) =
                            Logger.addLog Info "First" state

                        ( _, s2 ) =
                            Logger.addLog Info "Second" s1

                        ( _, s3 ) =
                            Logger.addLog Info "Third" s2

                        ( _, s4 ) =
                            Logger.addLog Info "Fourth" s3

                        messages =
                            Logger.toList s4 |> List.map .message
                    in
                    Expect.all
                        [ \_ -> Expect.equal (Logger.size s4) 3
                        , \_ -> Expect.equal (List.member "First" messages) False
                        , \_ -> Expect.equal (List.member "Second" messages) True
                        , \_ -> Expect.equal (List.member "Third" messages) True
                        , \_ -> Expect.equal (List.member "Fourth" messages) True
                        ]
                        ()
            ]
        , describe "getRecent"
            [ fuzz2 (Fuzz.intRange 0 20) (Fuzz.intRange 1 100) "returns at most N entries" <|
                \n maxEntries ->
                    let
                        state =
                            Logger.init maxEntries

                        ( _, s1 ) =
                            Logger.addLog Info "Msg1" state

                        ( _, s2 ) =
                            Logger.addLog Info "Msg2" s1

                        ( _, s3 ) =
                            Logger.addLog Info "Msg3" s2
                    in
                    Logger.getRecent n s3
                        |> List.length
                        |> Expect.atMost (max 0 n)
            , test "returns newest first" <|
                \_ ->
                    let
                        state =
                            Logger.init 100

                        ( _, s1 ) =
                            Logger.addLog Info "First" state

                        ( _, s2 ) =
                            Logger.addLog Info "Second" s1

                        ( _, s3 ) =
                            Logger.addLog Info "Third" s2

                        recent =
                            Logger.getRecent 3 s3
                    in
                    recent
                        |> List.map .message
                        |> Expect.equal [ "Third", "Second", "First" ]
            ]
        , describe "toList"
            [ test "returns oldest first (chronological order)" <|
                \_ ->
                    let
                        state =
                            Logger.init 100

                        ( _, s1 ) =
                            Logger.addLog Info "First" state

                        ( _, s2 ) =
                            Logger.addLog Info "Second" s1

                        ( _, s3 ) =
                            Logger.addLog Info "Third" s2
                    in
                    Logger.toList s3
                        |> List.map .message
                        |> Expect.equal [ "First", "Second", "Third" ]
            , test "indices are monotonically increasing" <|
                \_ ->
                    let
                        state =
                            Logger.init 100

                        ( _, s1 ) =
                            Logger.addLog Info "A" state

                        ( _, s2 ) =
                            Logger.addLog Info "B" s1

                        ( _, s3 ) =
                            Logger.addLog Info "C" s2

                        indices =
                            Logger.toList s3 |> List.map .index
                    in
                    Expect.equal indices [ 0, 1, 2 ]
            ]
        , describe "levelToString / levelFromString round-trip"
            [ fuzz logLevelFuzzer "level survives round-trip" <|
                \level ->
                    level
                        |> Logger.levelToString
                        |> Logger.levelFromString
                        |> Expect.equal (Just level)
            , test "Debug round-trips" <|
                \_ ->
                    Logger.levelFromString "DEBUG"
                        |> Expect.equal (Just Debug)
            , test "Info round-trips" <|
                \_ ->
                    Logger.levelFromString "INFO"
                        |> Expect.equal (Just Info)
            , test "Warn round-trips" <|
                \_ ->
                    Logger.levelFromString "WARN"
                        |> Expect.equal (Just Warn)
            , test "Error round-trips" <|
                \_ ->
                    Logger.levelFromString "ERROR"
                        |> Expect.equal (Just Error)
            , test "unknown level returns Nothing" <|
                \_ ->
                    Logger.levelFromString "UNKNOWN"
                        |> Expect.equal Nothing
            , test "case insensitive parsing" <|
                \_ ->
                    Expect.all
                        [ \_ -> Logger.levelFromString "debug" |> Expect.equal (Just Debug)
                        , \_ -> Logger.levelFromString "Info" |> Expect.equal (Just Info)
                        , \_ -> Logger.levelFromString "warn" |> Expect.equal (Just Warn)
                        , \_ -> Logger.levelFromString "error" |> Expect.equal (Just Error)
                        ]
                        ()
            ]
        , describe "JSON encoding/decoding"
            [ fuzz2 logLevelFuzzer Fuzz.string "LogEntry survives JSON round-trip" <|
                \level message ->
                    let
                        state =
                            Logger.init 100

                        ( entry, _ ) =
                            Logger.addLogWithTime level message 1234567890 state

                        encoded =
                            Logger.encodeLogEntry entry

                        decoded =
                            Decode.decodeValue Logger.decodeLogEntry encoded
                    in
                    case decoded of
                        Ok decodedEntry ->
                            Expect.all
                                [ \e -> Expect.equal e.index entry.index
                                , \e -> Expect.equal e.timestamp entry.timestamp
                                , \e -> Expect.equal e.level entry.level
                                , \e -> Expect.equal e.message entry.message
                                ]
                                decodedEntry

                        Err err ->
                            Expect.fail (Decode.errorToString err)
            ]
        , describe "getSinceIndex"
            [ test "returns entries with index >= minIndex" <|
                \_ ->
                    let
                        state =
                            Logger.init 100

                        ( _, s1 ) =
                            Logger.addLog Info "0" state

                        ( _, s2 ) =
                            Logger.addLog Info "1" s1

                        ( _, s3 ) =
                            Logger.addLog Info "2" s2

                        ( _, s4 ) =
                            Logger.addLog Info "3" s3

                        result =
                            Logger.getSinceIndex 2 s4
                    in
                    result
                        |> List.map .index
                        |> Expect.equal [ 2, 3 ]
            ]
        , describe "getRange"
            [ test "returns entries in range [from, to]" <|
                \_ ->
                    let
                        state =
                            Logger.init 100

                        ( _, s1 ) =
                            Logger.addLog Info "0" state

                        ( _, s2 ) =
                            Logger.addLog Info "1" s1

                        ( _, s3 ) =
                            Logger.addLog Info "2" s2

                        ( _, s4 ) =
                            Logger.addLog Info "3" s3

                        ( _, s5 ) =
                            Logger.addLog Info "4" s4

                        result =
                            Logger.getRange 1 3 s5
                    in
                    result
                        |> List.map .index
                        |> Expect.equal [ 1, 2, 3 ]
            ]
        ]
