module SignatureParser exposing (ParsedSignature, parseSignature)

{-| Parse Elm function signatures for RPC endpoint generation

Expects signatures of the form:
functionName : SessionId -> BackendModel -> Param1 -> Param2 -> ... -> ( Result String OutputType, BackendModel, Cmd BackendMsg )

-}


type alias ParsedSignature =
    { functionName : String
    , paramTypes : List String
    , outputType : String
    }


{-| Parse a function signature line

Examples:

    parseSignature "myFunc : SessionId -> BackendModel -> String -> ( Result String Int, BackendModel, Cmd BackendMsg )"
    --> Just { functionName = "myFunc", paramTypes = ["String"], outputType = "Int" }

    parseSignature "myFunc : SessionId -> BackendModel -> String -> Int -> Bool -> ( Result String Output, BackendModel, Cmd BackendMsg )"
    --> Just { functionName = "myFunc", paramTypes = ["String", "Int", "Bool"], outputType = "Output" }

    parseSignature "myFunc : SessionId -> BackendModel -> ( Result String Output, BackendModel, Cmd BackendMsg )"
    --> Nothing  -- No parameters

-}
parseSignature : String -> Maybe ParsedSignature
parseSignature line =
    let
        -- Remove leading/trailing whitespace
        trimmed =
            String.trim line

        -- Split on : to separate function name from signature
        parts =
            String.split ":" trimmed

        functionName =
            parts
                |> List.head
                |> Maybe.map String.trim
                |> Maybe.withDefault ""

        typeSignature =
            parts
                |> List.drop 1
                |> String.join ":"
                |> String.trim
    in
    case ( functionName, parseTypeSignature typeSignature ) of
        ( name, Just { params, output } ) ->
            if String.isEmpty name || List.isEmpty params then
                Nothing

            else
                Just
                    { functionName = name
                    , paramTypes = params
                    , outputType = output
                    }

        _ ->
            Nothing


{-| Parse the type signature part (after the :)
-}
parseTypeSignature : String -> Maybe { params : List String, output : String }
parseTypeSignature signature =
    let
        -- Split on ->
        segments =
            String.split "->" signature
                |> List.map String.trim

        -- First two should be SessionId and BackendModel
        -- Then come the parameters
        -- Last is the Result tuple
        withoutSessionId =
            List.drop 1 segments

        withoutBackendModel =
            List.drop 1 withoutSessionId

        -- Find the Result tuple (starts with parenthesis)
        ( paramSegments, resultSegment ) =
            splitBeforeTuple withoutBackendModel

        outputType =
            extractOutputType resultSegment
    in
    case outputType of
        Just output ->
            Just
                { params = paramSegments
                , output = output
                }

        Nothing ->
            Nothing


{-| Split list before the first element that starts with (
-}
splitBeforeTuple : List String -> ( List String, String )
splitBeforeTuple segments =
    let
        go remaining acc =
            case remaining of
                [] ->
                    ( List.reverse acc, "" )

                head :: tail ->
                    if String.startsWith "(" head then
                        ( List.reverse acc, String.join " -> " (head :: tail) )

                    else
                        go tail (head :: acc)
    in
    go segments []


{-| Extract output type from Result tuple

    extractOutputType "( Result String UserProfile, BackendModel, Cmd BackendMsg )"
    --> Just "UserProfile"

-}
extractOutputType : String -> Maybe String
extractOutputType tuple =
    let
        -- Remove parentheses and whitespace
        cleaned =
            tuple
                |> String.replace "(" ""
                |> String.replace ")" ""
                |> String.trim

        -- Split on comma to get tuple parts
        parts =
            String.split "," cleaned
                |> List.map String.trim

        -- First part should be "Result String OutputType"
        resultPart =
            List.head parts
                |> Maybe.withDefault ""

        -- Split on spaces and take the third element (after "Result" and "String")
        words =
            String.words resultPart
    in
    case words of
        [ "Result", _, outputType ] ->
            Just outputType

        _ ->
            Nothing
