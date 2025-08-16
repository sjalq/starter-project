module Components.Button exposing (..)

import Html exposing (Html, button, text)
import Html.Attributes as Attr
import Html.Events as HE
import Theme


type ButtonVariant
    = Primary
    | Secondary
    | Danger
    | Success
    | Loading


type ButtonSize
    = Small
    | Medium
    | Large


type alias ButtonConfig msg =
    { variant : ButtonVariant
    , size : ButtonSize
    , disabled : Bool
    , onClick : Maybe msg
    , colors : Theme.Colors
    }


view : ButtonConfig msg -> String -> Html msg
view config label =
    let
        baseClasses =
            "font-medium rounded transition-colors duration-200 cursor-pointer touch-manipulation"

        sizeClasses =
            case config.size of
                Small ->
                    "px-4 py-3 text-sm md:px-3 md:py-2 min-h-[44px] md:min-h-[36px]"

                Medium ->
                    "px-6 py-3 text-base md:px-4 md:py-2 min-h-[48px] md:min-h-[40px]"

                Large ->
                    "px-8 py-4 text-lg md:px-6 md:py-3 min-h-[52px] md:min-h-[44px]"

        variantStyles =
            case config.variant of
                Primary ->
                    [ Attr.style "background-color" config.colors.buttonBg
                    , Attr.style "color" config.colors.buttonText
                    ]

                Secondary ->
                    [ Attr.style "background-color" config.colors.secondaryBg
                    , Attr.style "color" config.colors.primaryText
                    , Attr.style "border" ("1px solid " ++ config.colors.border)
                    ]

                Danger ->
                    [ Attr.style "background-color" config.colors.dangerBg
                    , Attr.style "color" "#ffffff"
                    ]

                Success ->
                    [ Attr.style "background-color" "#38a169"
                    , Attr.style "color" "#ffffff"
                    ]

                Loading ->
                    [ Attr.style "background-color" config.colors.secondaryBg
                    , Attr.style "color" config.colors.primaryText
                    , Attr.style "opacity" "0.7"
                    ]

        disabledStyles =
            if config.disabled then
                [ Attr.disabled True
                , Attr.style "cursor" "not-allowed"
                , Attr.style "opacity" "0.5"
                ]

            else
                []

        eventHandlers =
            case config.onClick of
                Just handler ->
                    if config.disabled then
                        []

                    else
                        [ HE.onClick handler ]

                Nothing ->
                    []

        allAttributes =
            Attr.class (baseClasses ++ " " ++ sizeClasses)
                :: variantStyles
                ++ disabledStyles
                ++ eventHandlers
    in
    button allAttributes [ text label ]


primary : Theme.Colors -> Maybe msg -> String -> Html msg
primary colors onClick label =
    view
        { variant = Primary
        , size = Medium
        , disabled = False
        , onClick = onClick
        , colors = colors
        }
        label


secondary : Theme.Colors -> Maybe msg -> String -> Html msg
secondary colors onClick label =
    view
        { variant = Secondary
        , size = Medium
        , disabled = False
        , onClick = onClick
        , colors = colors
        }
        label


danger : Theme.Colors -> Maybe msg -> String -> Html msg
danger colors onClick label =
    view
        { variant = Danger
        , size = Medium
        , disabled = False
        , onClick = onClick
        , colors = colors
        }
        label


success : Theme.Colors -> Maybe msg -> String -> Html msg
success colors onClick label =
    view
        { variant = Success
        , size = Medium
        , disabled = False
        , onClick = onClick
        , colors = colors
        }
        label


loading : Theme.Colors -> String -> Html msg
loading colors label =
    view
        { variant = Loading
        , size = Medium
        , disabled = True
        , onClick = Nothing
        , colors = colors
        }
        label
