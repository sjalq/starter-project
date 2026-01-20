module Fuzzers.DomainFuzzers exposing
    ( adminLogsParamsFuzzer
    , adminRouteFuzzer
    , logLevelFuzzer
    , preferencesFuzzer
    , roleFuzzer
    , routeFuzzer
    , safeSearchStringFuzzer
    )

import Fuzz exposing (Fuzzer)
import Logger
import Types exposing (AdminLogsUrlParams, AdminRoute(..), Preferences, Role(..), Route(..))



-- ROUTE FUZZERS


routeFuzzer : Fuzzer Route
routeFuzzer =
    Fuzz.oneOf
        [ Fuzz.constant Default
        , Fuzz.map Admin adminRouteFuzzer
        , Fuzz.constant Examples
        ]


adminRouteFuzzer : Fuzzer AdminRoute
adminRouteFuzzer =
    Fuzz.oneOf
        [ Fuzz.constant AdminDefault
        , Fuzz.map AdminLogs adminLogsParamsFuzzer
        , Fuzz.constant AdminFetchModel
        ]


adminLogsParamsFuzzer : Fuzzer AdminLogsUrlParams
adminLogsParamsFuzzer =
    Fuzz.map3 AdminLogsUrlParams
        (Fuzz.intRange 0 100)
        (Fuzz.intRange 10 500)
        safeSearchStringFuzzer


safeSearchStringFuzzer : Fuzzer String
safeSearchStringFuzzer =
    Fuzz.oneOf
        [ Fuzz.constant ""
        , Fuzz.constant "error"
        , Fuzz.constant "INFO"
        , Fuzz.constant "warn"
        , Fuzz.map (\n -> "test" ++ String.fromInt n) (Fuzz.intRange 0 100)
        ]



-- ROLE FUZZERS


roleFuzzer : Fuzzer Role
roleFuzzer =
    Fuzz.oneOf
        [ Fuzz.constant SysAdmin
        , Fuzz.constant UserRole
        , Fuzz.constant Anonymous
        ]



-- LOGGER FUZZERS


logLevelFuzzer : Fuzzer Logger.LogLevel
logLevelFuzzer =
    Fuzz.oneOf
        [ Fuzz.constant Logger.Debug
        , Fuzz.constant Logger.Info
        , Fuzz.constant Logger.Warn
        , Fuzz.constant Logger.Error
        ]



-- PREFERENCE FUZZERS


preferencesFuzzer : Fuzzer Preferences
preferencesFuzzer =
    Fuzz.map Preferences Fuzz.bool
