module Components.Header exposing (..)

import Html exposing (Html, div, h1, p, text)
import Html.Attributes as Attr
import Theme


type alias HeaderConfig =
    { title : String
    , subtitle : Maybe String
    , colors : Theme.Colors
    , size : HeaderSize
    }


type HeaderSize
    = Large
    | Medium
    | Small


view : HeaderConfig -> Html msg
view config =
    let
        titleClasses =
            case config.size of
                Large ->
                    "text-2xl md:text-4xl font-bold mb-2 md:mb-2"

                Medium ->
                    "text-xl md:text-3xl font-bold mb-3 md:mb-4"

                Small ->
                    "text-lg md:text-xl font-semibold mb-2"

        titleElement =
            h1
                [ Attr.class titleClasses
                , Attr.style "color" config.colors.accent
                ]
                [ text config.title ]

        subtitleElement =
            case config.subtitle of
                Just subtitle ->
                    let
                        subtitleClasses =
                            case config.size of
                                Large ->
                                    "mb-6 md:mb-8 text-sm md:text-base"

                                Medium ->
                                    "mb-3 md:mb-4 text-sm md:text-base"

                                Small ->
                                    "mb-2 text-sm"
                    in
                    [ p
                        [ Attr.class subtitleClasses
                        , Attr.style "color" config.colors.primaryText
                        ]
                        [ text subtitle ]
                    ]

                Nothing ->
                    []
    in
    div []
        (titleElement :: subtitleElement)


pageHeader : Theme.Colors -> String -> Maybe String -> Html msg
pageHeader colors title subtitle =
    view
        { title = title
        , subtitle = subtitle
        , colors = colors
        , size = Large
        }


sectionHeader : Theme.Colors -> String -> Html msg
sectionHeader colors title =
    view
        { title = title
        , subtitle = Nothing
        , colors = colors
        , size = Medium
        }


cardHeader : Theme.Colors -> String -> Html msg
cardHeader colors title =
    view
        { title = title
        , subtitle = Nothing
        , colors = colors
        , size = Small
        }
