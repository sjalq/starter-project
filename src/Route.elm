module Route exposing (..)

import Types exposing (AdminRoute(..), Route(..))
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s)


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Default Parser.top
        , Parser.map (Admin AdminDefault) (s "admin")
        , Parser.map (Admin AdminLogs) (s "admin" </> s "logs")
        , Parser.map (Admin AdminFetchModel) (s "admin" </> s "fetch-model")
        , Parser.map (Admin AdminFusion) (s "admin" </> s "fusion")
        ]


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

        Admin AdminLogs ->
            "/admin/logs"

        Admin AdminFetchModel ->
            "/admin/fetch-model"

        Admin AdminFusion ->
            "/admin/fusion"

        NotFound ->
            "/not-found"
