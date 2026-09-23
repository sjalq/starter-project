module Theme exposing (..)

import Html exposing (Attribute)
import Html.Attributes


type alias Colors =
    { primaryBg : String
    , primaryText : String
    , secondaryBg : String
    , secondaryText : String
    , accent : String
    , accentText : String
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
    { primaryBg = "#F2ECE4" -- Light cream
    , primaryText = "#263745" -- Dark blue-grey
    , secondaryBg = "#FFFFFF" -- White
    , secondaryText = "#4A5568" -- Grey for secondary text
    , accent = "#CFB793" -- Warm beige/gold, for fills and borders
    , accentText = "#7A5F30" -- Dark gold, readable on light backgrounds
    , border = "rgba(0, 0, 0, 0.15)" -- Semi-transparent black
    , buttonBg = "#CFB793" -- Warm beige/gold
    , buttonText = "#263745" -- Dark blue-grey
    , buttonHoverBg = "#BEA682" -- Darker beige
    , dangerBg = "#FC8181" -- Soft red, readable with dark button text
    , dangerHoverBg = "#F56565" -- Stronger red
    , dangerText = "#B91C1C" -- Deep red, readable on light backgrounds
    , headerBg = "#FFFFFF" -- White
    , headerBorder = "#D9D9D9" -- Light grey
    , headerText = "#263745" -- Dark blue-grey
    , activeTabText = "#7A5F30" -- Dark gold
    , inactiveTabText = "#5F6B7A" -- Slate grey
    , successBg = "#48bb78" -- Green
    }


darkColors : Colors
darkColors =
    { primaryBg = "#1A1F26" -- Very dark blue-grey
    , primaryText = "#F2ECE4" -- Light cream
    , secondaryBg = "#263745" -- Dark blue-grey
    , secondaryText = "#CFB793" -- Warm beige/gold
    , accent = "#E8D5BB" -- Lighter warm beige
    , accentText = "#E8D5BB" -- Lighter warm beige
    , border = "rgba(207, 183, 147, 0.3)" -- Semi-transparent warm beige
    , buttonBg = "#CFB793" -- Warm beige/gold
    , buttonText = "#1A1F26" -- Very dark blue-grey
    , buttonHoverBg = "#E8D5BB" -- Lighter warm beige
    , dangerBg = "#E57373" -- Softer red for dark backgrounds
    , dangerHoverBg = "#EF5350" -- Brighter red on hover
    , dangerText = "#F49B93" -- Light red, readable on dark backgrounds
    , headerBg = "#263745" -- Dark blue-grey
    , headerBorder = "#2F3D4D" -- Slightly lighter blue-grey
    , headerText = "#F2ECE4" -- Light cream
    , activeTabText = "#E8D5BB" -- Lighter warm beige
    , inactiveTabText = "#AAB6C4" -- Light slate grey
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
    Html.Attributes.style "color" (getColors isDarkMode).accentText


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
