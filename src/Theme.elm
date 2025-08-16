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
    , dangerText : String
    , headerBg : String
    , headerBorder : String
    , headerText : String
    , activeTabText : String
    , inactiveTabText : String
    , successBg : String
    }


lightColors : Colors
lightColors =
    { primaryBg = "#F2ECE4" -- Light cream (Sakeliga tertiary)
    , primaryText = "#263745" -- Dark blue-grey (Sakeliga secondary)
    , secondaryBg = "#FFFFFF" -- White
    , secondaryText = "#4A5568" -- Grey for secondary text
    , accent = "#CFB793" -- Warm beige/gold (Sakeliga primary)
    , border = "rgba(0, 0, 0, 0.15)" -- Semi-transparent black (lighter than original)
    , buttonBg = "#CFB793" -- Warm beige/gold (Sakeliga primary)
    , buttonText = "#263745" -- Dark blue-grey
    , buttonHoverBg = "#BEA682" -- Darker beige (Sakeliga hover)
    , dangerBg = "#FF0000" -- Red (Sakeliga red)
    , dangerHoverBg = "#CC0000" -- Darker red
    , dangerText = "#FF0000" -- Red
    , headerBg = "#FFFFFF" -- White
    , headerBorder = "#D9D9D9" -- Grey (Sakeliga grey)
    , headerText = "#263745" -- Dark blue-grey
    , activeTabText = "#CFB793" -- Warm beige/gold
    , inactiveTabText = "#B3B3B3" -- Dark grey
    , successBg = "#48bb78" -- Green (keeping original for consistency)
    }


darkColors : Colors
darkColors =
    { primaryBg = "#1A1F26" -- Very dark blue-grey
    , primaryText = "#F2ECE4" -- Light cream (from light mode tertiary)
    , secondaryBg = "#263745" -- Dark blue-grey (Sakeliga secondary)
    , secondaryText = "#CFB793" -- Warm beige/gold (Sakeliga primary)
    , accent = "#E8D5BB" -- Lighter warm beige
    , border = "rgba(207, 183, 147, 0.3)" -- Semi-transparent warm beige
    , buttonBg = "#CFB793" -- Warm beige/gold
    , buttonText = "#1A1F26" -- Very dark blue-grey
    , buttonHoverBg = "#E8D5BB" -- Lighter warm beige
    , dangerBg = "#E57373" -- Softer red for dark backgrounds
    , dangerHoverBg = "#EF5350" -- Brighter red on hover
    , dangerText = "#E57373" -- Softer red
    , headerBg = "#263745" -- Dark blue-grey
    , headerBorder = "#2F3D4D" -- Slightly lighter blue-grey
    , headerText = "#F2ECE4" -- Light cream
    , activeTabText = "#E8D5BB" -- Lighter warm beige
    , inactiveTabText = "#8B9AAB" -- Muted blue-grey
    , successBg = "#4CAF50" -- Green
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
