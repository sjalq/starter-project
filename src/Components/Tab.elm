module Components.Tab exposing (..)

import Html exposing (Html, a, div, text)
import Html.Attributes as Attr
import Theme


type alias TabConfig =
    { label : String
    , href : String
    , isActive : Bool
    , colors : Theme.Colors
    }


view : TabConfig -> Html msg
view config =
    a
        [ Attr.href config.href
        , Attr.class "px-4 py-3 md:px-3 md:py-2 text-base md:text-lg font-medium transition-colors duration-200 touch-manipulation min-h-[44px] md:min-h-[36px] flex items-center"
        , Attr.style "color"
            (if config.isActive then
                config.colors.activeTabText

             else
                config.colors.inactiveTabText
            )
        , Attr.style "border-bottom"
            (if config.isActive then
                "2px solid " ++ config.colors.activeTabText

             else
                "none"
            )
        , Attr.style "text-decoration" "none"
        ]
        [ text config.label ]


tabBar : Theme.Colors -> List TabConfig -> Html msg
tabBar colors tabs =
    div [ Attr.class "flex flex-wrap justify-center gap-2 md:gap-8 mt-4 px-2 md:px-0" ]
        (List.map view tabs)
