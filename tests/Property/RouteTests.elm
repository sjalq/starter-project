module Property.RouteTests exposing (suite)

import Expect
import Fuzz exposing (Fuzzer)
import Fuzzers.DomainFuzzers exposing (adminLogsParamsFuzzer, routeFuzzer)
import Route exposing (defaultLogsParams, fromUrl, toString)
import Test exposing (..)
import Types exposing (AdminLogsUrlParams, AdminRoute(..), Route(..))
import Url exposing (Url)


suite : Test
suite =
    describe "Route Properties"
        [ describe "toString"
            [ fuzz routeFuzzer "produces paths starting with /" <|
                \route ->
                    Route.toString route
                        |> String.startsWith "/"
                        |> Expect.equal True
            , test "Default route produces /" <|
                \_ ->
                    Route.toString Default
                        |> Expect.equal "/"
            , test "Admin default produces /admin" <|
                \_ ->
                    Route.toString (Admin AdminDefault)
                        |> Expect.equal "/admin"
            , test "Examples produces /examples" <|
                \_ ->
                    Route.toString Examples
                        |> Expect.equal "/examples"
            , test "NotFound produces /not-found" <|
                \_ ->
                    Route.toString NotFound
                        |> Expect.equal "/not-found"
            ]
        , describe "fromUrl"
            [ test "parses / as Default" <|
                \_ ->
                    makeUrl "/"
                        |> Route.fromUrl
                        |> Expect.equal Default
            , test "parses /admin as Admin AdminDefault" <|
                \_ ->
                    makeUrl "/admin"
                        |> Route.fromUrl
                        |> Expect.equal (Admin AdminDefault)
            , test "parses /examples as Examples" <|
                \_ ->
                    makeUrl "/examples"
                        |> Route.fromUrl
                        |> Expect.equal Examples
            , test "parses unknown paths as NotFound" <|
                \_ ->
                    makeUrl "/unknown-path"
                        |> Route.fromUrl
                        |> Expect.equal NotFound
            ]
        , describe "Round-trip"
            [ test "Default survives round-trip" <|
                \_ ->
                    expectRouteRoundTrip Default
            , test "Admin AdminDefault survives round-trip" <|
                \_ ->
                    expectRouteRoundTrip (Admin AdminDefault)
            , test "Admin AdminFetchModel survives round-trip" <|
                \_ ->
                    expectRouteRoundTrip (Admin AdminFetchModel)
            , test "Examples survives round-trip" <|
                \_ ->
                    expectRouteRoundTrip Examples
            , fuzz adminLogsParamsFuzzer "AdminLogs params survive round-trip" <|
                \params ->
                    let
                        route =
                            Admin (AdminLogs params)

                        path =
                            Route.toString route

                        url =
                            makeUrl path
                    in
                    case Route.fromUrl url of
                        Admin (AdminLogs resultParams) ->
                            Expect.all
                                [ \_ -> Expect.equal resultParams.page params.page
                                , \_ -> Expect.equal resultParams.pageSize params.pageSize
                                , \_ -> Expect.equal resultParams.search params.search
                                ]
                                ()

                        other ->
                            Expect.fail ("Expected AdminLogs route, got: " ++ Debug.toString other)
            ]
        , describe "defaultLogsParams"
            [ test "has sensible defaults" <|
                \_ ->
                    Expect.all
                        [ \p -> Expect.equal p.page 0
                        , \p -> Expect.equal p.pageSize 100
                        , \p -> Expect.equal p.search ""
                        ]
                        defaultLogsParams
            , test "produces minimal query string" <|
                \_ ->
                    Route.toString (Admin (AdminLogs defaultLogsParams))
                        |> Expect.equal "/admin/logs"
            ]
        ]


makeUrl : String -> Url
makeUrl pathWithQuery =
    let
        ( pathPart, queryPart ) =
            case String.split "?" pathWithQuery of
                [ p, q ] ->
                    ( p, Just q )

                [ p ] ->
                    ( p, Nothing )

                _ ->
                    ( pathWithQuery, Nothing )
    in
    { protocol = Url.Http
    , host = "localhost"
    , port_ = Just 8000
    , path = pathPart
    , query = queryPart
    , fragment = Nothing
    }


expectRouteRoundTrip : Route -> Expect.Expectation
expectRouteRoundTrip route =
    let
        path =
            Route.toString route

        url =
            makeUrl path

        result =
            Route.fromUrl url
    in
    Expect.equal route result
