module Theme exposing (..)

import Html exposing (Attribute)
import Html.Attributes


type alias Colors =
    { primaryBg : String
    , primaryText : String
    , secondaryBg : String
    , secondaryText : String
    , accent : String
    , border : String
    , buttonBg : String
    , buttonText : String
    , buttonHoverBg : String
    , dangerBg : String
    , dangerHoverBg : String
    , headerBg : String
    , headerBorder : String
    , headerText : String
    , activeTabText : String
    , inactiveTabText : String
    }


lightColors : Colors
lightColors =
    { primaryBg = "#ffffff"
    , primaryText = "#1a202c" -- Gray 900
    , secondaryBg = "#e2e8f0" -- Gray 200
    , secondaryText = "#4a5568" -- Gray 600
    , accent = "#4299e1" -- Blue 400
    , border = "#cbd5e0" -- Gray 400
    , buttonBg = "#3182ce" -- Blue 600
    , buttonText = "#ffffff"
    , buttonHoverBg = "#2b6cb0" -- Blue 700
    , dangerBg = "#e53e3e" -- Red 600
    , dangerHoverBg = "#c53030" -- Red 700
    , headerBg = "#f7fafc" -- Gray 100
    , headerBorder = "#e2e8f0" -- Gray 200
    , headerText = "#4a5568" -- Gray 600
    , activeTabText = "#4299e1" -- Blue 500
    , inactiveTabText = "#718096" -- Gray 500
    }


darkColors : Colors
darkColors =
    { primaryBg = "#1a202c" -- Gray 900
    , primaryText = "#e2e8f0" -- Gray 200
    , secondaryBg = "#2d3748" -- Gray 800
    , secondaryText = "#a0aec0" -- Gray 400
    , accent = "#63b3ed" -- Blue 300
    , border = "#4a5568" -- Gray 600
    , buttonBg = "#4299e1" -- Blue 400
    , buttonText = "#1a202c" -- Gray 900
    , buttonHoverBg = "#3182ce" -- Blue 500
    , dangerBg = "#f56565" -- Red 400
    , dangerHoverBg = "#e53e3e" -- Red 500
    , headerBg = "#0d1829" -- Dark blue/gray
    , headerBorder = "#2d3748" -- Gray 800
    , headerText = "#a0aec0" -- Gray 400
    , activeTabText = "#4299e1" -- Blue 400
    , inactiveTabText = "#a0aec0" -- Gray 400
    }


getColors : Bool -> Colors
getColors isDarkMode =
    if isDarkMode then
        darkColors

    else
        lightColors


-- Helper to apply theme colors as style attributes

primaryBg : Bool -> Attribute msg
primaryBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).primaryBg


primaryText : Bool -> Attribute msg
primaryText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).primaryText


primaryBorder : Bool -> Attribute msg
primaryBorder isDarkMode =
    Html.Attributes.style "border-color" (getColors isDarkMode).border


secondaryBg : Bool -> Attribute msg
secondaryBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).secondaryBg


secondaryText : Bool -> Attribute msg
secondaryText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).secondaryText


accent : Bool -> Attribute msg
accent isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).accent


buttonBg : Bool -> Attribute msg
buttonBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).buttonBg


buttonText : Bool -> Attribute msg
buttonText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).buttonText


buttonHoverBg : Bool -> Attribute msg
buttonHoverBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).buttonHoverBg


dangerBg : Bool -> Attribute msg
dangerBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).dangerBg


dangerHoverBg : Bool -> Attribute msg
dangerHoverBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).dangerHoverBg


headerBg : Bool -> Attribute msg
headerBg isDarkMode =
    Html.Attributes.style "background-color" (getColors isDarkMode).headerBg


headerBorder : Bool -> Attribute msg
headerBorder isDarkMode =
    Html.Attributes.style "border-color" (getColors isDarkMode).headerBorder


headerText : Bool -> Attribute msg
headerText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).headerText


activeTabText : Bool -> Attribute msg
activeTabText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).activeTabText


inactiveTabText : Bool -> Attribute msg
inactiveTabText isDarkMode =
    Html.Attributes.style "color" (getColors isDarkMode).inactiveTabText 