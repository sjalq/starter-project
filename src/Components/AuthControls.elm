module Components.AuthControls exposing (..)

import Html exposing (Html, button, div, span, text)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Theme
import Types exposing (..)


type alias AuthControlsConfig msg =
    { login : LoginState
    , colors : Theme.Colors
    , onToggleDarkMode : msg
    , onLogin : msg
    , onLogout : msg
    , isDarkMode : Bool
    }


view : AuthControlsConfig msg -> Html msg
view config =
    div 
        [ Attr.class "flex items-stretch flex-shrink-0" 
        , Attr.style "border-radius" "9999px"
        , Attr.style "overflow" "hidden"
        , Attr.style "border" ("1px solid " ++ config.colors.border)
        , Attr.style "background-color" config.colors.secondaryBg
        , Attr.style "transition" "all 0.3s ease"
        , Attr.style "height" "44px"
        ]
        [ darkModeToggle config
        , authSection config
        ]


darkModeToggle : AuthControlsConfig msg -> Html msg
darkModeToggle config =
    button
        [ onClick config.onToggleDarkMode
        , Attr.class "px-3 touch-manipulation flex items-center justify-center"
        , Attr.style "background-color" config.colors.secondaryBg
        , Attr.style "color" config.colors.primaryText
        , Attr.style "transition" "all 0.3s ease"
        , Attr.style "border-right" ("1px solid " ++ config.colors.border)
        , Attr.style "height" "100%"
        , Attr.style "min-width" "44px"
        ]
        [ text (if config.isDarkMode then "☀️" else "🌙") ]


authSection : AuthControlsConfig msg -> Html msg
authSection config =
    let
        baseButtonStyles =
            [ Attr.class "px-4 touch-manipulation text-sm flex items-center justify-center"
            , Attr.style "transition" "all 0.3s ease"
            , Attr.style "height" "100%"
            , Attr.style "border" "none"
            ]
        
        loginButtonStyles =
            baseButtonStyles ++
            [ Attr.style "background-color" "#38a169"
            , Attr.style "color" "#ffffff"
            ]
            
        logoutButtonStyles =
            baseButtonStyles ++
            [ Attr.style "background-color" config.colors.dangerBg
            , Attr.style "color" "#ffffff"
            ]
            
        loadingStyles =
            baseButtonStyles ++
            [ Attr.style "background-color" config.colors.secondaryBg
            , Attr.style "color" config.colors.primaryText
            , Attr.style "opacity" "0.7"
            ]
    in
    case config.login of
        LoggedIn userInfo ->
            div 
                [ Attr.class "relative group"
                , Attr.style "transition" "all 0.3s ease"
                ]
                [ button
                    (logoutButtonStyles ++ [ onClick config.onLogout ])
                    [ text "Logout" ]
                , div 
                    [ Attr.class "absolute right-0 top-full mt-2 px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100"
                    , Attr.style "background-color" config.colors.primaryBg
                    , Attr.style "color" config.colors.primaryText
                    , Attr.style "border" ("1px solid " ++ config.colors.border)
                    , Attr.style "min-width" "max-content"
                    , Attr.style "z-index" "10"
                    , Attr.style "transform" "translateY(-5px)"
                    , Attr.style "transition" "all 0.3s ease"
                    , Attr.style "pointer-events" "none"
                    ]
                    [ div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2" ] [ text "👤" ]
                        , text userInfo.email
                        ]
                    ]
                ]

        LoginTokenSent ->
            div (loadingStyles ++ [ Attr.class "animate-pulse" ])
                [ text "Authenticating..." ]

        NotLogged pendingAuth ->
            if pendingAuth then
                button
                    (loadingStyles ++ 
                    [ Attr.disabled True
                    , Attr.class "cursor-wait"
                    , Attr.style "opacity" "0.7"
                    ])
                    [ text "Authenticating..." ]
            else
                button
                    (loginButtonStyles ++ [ onClick config.onLogin ])
                    [ text "Login" ]

        JustArrived ->
            button
                (loginButtonStyles ++ [ onClick config.onLogin ])
                [ text "Login" ]