module Components.Card exposing (..)

import Html exposing (Html, div, h2, text)
import Html.Attributes as Attr
import Theme


type alias CardConfig =
    { title : Maybe String
    , colors : Theme.Colors
    , padding : String
    , rounded : Bool
    }


view : CardConfig -> List (Html msg) -> Html msg
view config children =
    let
        baseClasses =
            "bg-gray-100 dark:bg-gray-800"

        paddingClass =
            getPaddingClass config.padding

        roundedClass =
            if config.rounded then
                "rounded-lg"

            else
                ""

        cardContent =
            case config.title of
                Just title ->
                    h2
                        [ Attr.class "text-lg md:text-xl font-semibold mb-3 md:mb-4"
                        , Attr.style "color" config.colors.primaryText
                        ]
                        [ text title ]
                        :: children

                Nothing ->
                    children
    in
    div
        [ Attr.class (baseClasses ++ " " ++ paddingClass ++ " " ++ roundedClass)
        , Attr.style "background-color" config.colors.secondaryBg
        ]
        cardContent


getPaddingClass : String -> String
getPaddingClass padding =
    case padding of
        "4" ->
            "p-4 md:p-4"

        "6" ->
            "p-4 md:p-6"

        "8" ->
            "p-6 md:p-8"

        _ ->
            "p-4 md:p-6"


simple : Theme.Colors -> List (Html msg) -> Html msg
simple colors children =
    view
        { title = Nothing
        , colors = colors
        , padding = "6"
        , rounded = True
        }
        children


withTitle : Theme.Colors -> String -> List (Html msg) -> Html msg
withTitle colors title children =
    view
        { title = Just title
        , colors = colors
        , padding = "6"
        , rounded = True
        }
        children


compact : Theme.Colors -> List (Html msg) -> Html msg
compact colors children =
    view
        { title = Nothing
        , colors = colors
        , padding = "4"
        , rounded = True
        }
        children
