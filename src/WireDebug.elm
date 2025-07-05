module WireDebug exposing (..)

import Types exposing (..)


-- Simple debug helpers to understand the encoding pattern
debugToFrontendConstructorIndex : ToFrontend -> String
debugToFrontendConstructorIndex msg =
    case msg of
        NoOpToFrontend -> "Index 0: NoOpToFrontend"
        WS_Send _ -> "Index 1: WS_Outgoing"
        Admin_Logs_ToFrontend _ -> "Index 2: Admin_Logs_ToFrontend"
        AuthToFrontend _ -> "Index 3: AuthToFrontend"
        AuthSuccess _ -> "Index 4: AuthSuccess"
        UserInfoMsg _ -> "Index 5: UserInfoMsg"
        UserDataToFrontend _ -> "Index 6: UserDataToFrontend"
        PermissionDenied _ -> "Index 7: PermissionDenied"


-- Test WS_Outgoing specifically
wsOutgoingInfo : String -> String
wsOutgoingInfo str =
    "WS_Outgoing \"" ++ str ++ "\" would encode as: constructor index 1 + string length " 
    ++ String.fromInt (String.length str) ++ " + UTF-8 bytes of \"" ++ str ++ "\"" 