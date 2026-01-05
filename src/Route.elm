module Route exposing (defaultLogsParams, fromUrl, toString)

import Types exposing (AdminLogsUrlParams, AdminRoute(..), Route(..))
import Url exposing (Url, percentEncode)
import Url.Parser as Parser exposing ((</>), (<?>), Parser, oneOf, s)
import Url.Parser.Query as Query


defaultLogsParams : AdminLogsUrlParams
defaultLogsParams =
    { page = 0
    , pageSize = 100
    , search = ""
    }


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Default Parser.top
        , Parser.map (Admin AdminDefault) (s "admin")
        , Parser.map (\params -> Admin (AdminLogs params))
            (s "admin" </> s "logs" <?> logsQueryParser)
        , Parser.map (Admin AdminFetchModel) (s "admin" </> s "fetch-model")

        --, Parser.map (Admin AdminFusion) (s "admin" </> s "fusion")
        , Parser.map Examples (s "examples")
        ]


logsQueryParser : Query.Parser AdminLogsUrlParams
logsQueryParser =
    Query.map3 AdminLogsUrlParams
        (Query.int "page" |> Query.map (Maybe.withDefault 0))
        (Query.int "size" |> Query.map (Maybe.withDefault 100))
        (Query.string "q" |> Query.map (Maybe.withDefault ""))


fromUrl : Url -> Route
fromUrl url =
    Parser.parse parser url
        |> Maybe.withDefault NotFound


toString : Route -> String
toString route =
    case route of
        Default ->
            "/"

        Admin AdminDefault ->
            "/admin"

        Admin (AdminLogs params) ->
            "/admin/logs" ++ logsParamsToQuery params

        Admin AdminFetchModel ->
            "/admin/fetch-model"

        Examples ->
            "/examples"

        NotFound ->
            "/not-found"


logsParamsToQuery : AdminLogsUrlParams -> String
logsParamsToQuery params =
    let
        queryParts =
            [ if params.page > 0 then
                Just ("page=" ++ String.fromInt params.page)

              else
                Nothing
            , if params.pageSize /= 100 then
                Just ("size=" ++ String.fromInt params.pageSize)

              else
                Nothing
            , if not (String.isEmpty params.search) then
                Just ("q=" ++ percentEncode params.search)

              else
                Nothing
            ]
                |> List.filterMap identity
    in
    if List.isEmpty queryParts then
        ""

    else
        "?" ++ String.join "&" queryParts
