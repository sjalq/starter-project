module Components.AuthControls exposing (..)

import Auth.Common
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
    , onToggleDropdown : msg
    , isDarkMode : Bool
    , isDropdownOpen : Bool
    }


type alias ProfileDropdownConfig msg =
    { userInfo : Auth.Common.UserInfo
    , colors : Theme.Colors
    , isDarkMode : Bool
    , isOpen : Bool
    , onToggleDropdown : msg
    , onToggleDarkMode : msg
    , onLogout : msg
    }


view : AuthControlsConfig msg -> Html msg
view config =
    case config.login of
        LoggedIn userInfo ->
            profileDropdown
                { userInfo = userInfo
                , colors = config.colors
                , isDarkMode = config.isDarkMode
                , isOpen = config.isDropdownOpen
                , onToggleDropdown = config.onToggleDropdown
                , onToggleDarkMode = config.onToggleDarkMode
                , onLogout = config.onLogout
                }

        _ ->
            -- Non-logged in states use the login button
            loginButton config


profileDropdown : ProfileDropdownConfig msg -> Html msg
profileDropdown config =
    div
        [ Attr.class "relative"
        ]
        [ -- Profile Button
          button
            [ onClick config.onToggleDropdown
            , Attr.class "rounded-lg transition-all"
            , Attr.style "background-color" "transparent"
            , Attr.style "hover:opacity" "0.8"
            ]
            [ -- Profile Icon
              div
                [ Attr.class "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium overflow-hidden relative"
                , Attr.style "background-color" config.colors.accent
                , Attr.style "color" "#ffffff"
                ]
                [ -- Show initials as background
                  div
                    [ Attr.class "absolute inset-0 flex items-center justify-center"
                    ]
                    [ text (getInitials config.userInfo) ]
                , -- Overlay image if available
                  case config.userInfo.picture of
                    Just pictureUrl ->
                        Html.img
                            [ Attr.src pictureUrl
                            , Attr.class "absolute inset-0 w-full h-full object-cover"
                            , Attr.alt "Profile"
                            , Attr.style "background-color" config.colors.accent
                            , Attr.attribute "referrerpolicy" "no-referrer"
                            , Attr.attribute "crossorigin" "anonymous"
                            ]
                            []

                    Nothing ->
                        text ""
                ]
            ]
        , -- Dropdown Menu
          if config.isOpen then
            div
                [ Attr.class "absolute top-full left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:transform-none rounded-lg shadow-lg overflow-hidden z-50 mt-2"
                , Attr.style "background-color" config.colors.primaryBg
                , Attr.style "border" ("1px solid " ++ config.colors.border)
                , Attr.style "min-width" "280px"
                ]
                [ -- User Info Section
                  div
                    [ Attr.class "px-4 py-3"
                    , Attr.style "border-bottom" ("1px solid " ++ config.colors.border)
                    ]
                    [ div
                        [ Attr.class "font-medium"
                        , Attr.style "color" config.colors.primaryText
                        ]
                        [ text (Maybe.withDefault config.userInfo.email config.userInfo.name) ]
                    , div
                        [ Attr.class "text-sm mt-1"
                        , Attr.style "color" config.colors.secondaryText
                        ]
                        [ text config.userInfo.email ]
                    ]
                , -- Theme Toggle
                  button
                    [ onClick config.onToggleDarkMode
                    , Attr.class "w-full px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity"
                    , Attr.style "background-color" "transparent"
                    , Attr.style "color" config.colors.primaryText
                    , Attr.style "border-bottom" ("1px solid " ++ config.colors.border)
                    ]
                    [ span [] [ text "Theme" ]
                    , span []
                        [ text
                            (if config.isDarkMode then
                                "🌙 Dark"

                             else
                                "☀️ Light"
                            )
                        ]
                    ]
                , -- Logout Button
                  button
                    [ onClick config.onLogout
                    , Attr.class "w-full px-4 py-3 flex items-center hover:opacity-80 transition-opacity"
                    , Attr.style "background-color" "transparent"
                    , Attr.style "color" config.colors.dangerText
                    ]
                    [ text "Logout" ]
                ]

          else
            text ""
        ]


loginButton : AuthControlsConfig msg -> Html msg
loginButton config =
    let
        baseButtonStyles =
            [ Attr.class "px-4 py-2 rounded-lg transition-all text-sm font-medium"
            ]

        loginButtonStyles =
            baseButtonStyles
                ++ [ Attr.style "background-color" config.colors.buttonBg
                   , Attr.style "color" config.colors.buttonText
                   , Attr.style "hover:opacity" "0.9"
                   ]

        loadingStyles =
            baseButtonStyles
                ++ [ Attr.style "background-color" config.colors.secondaryBg
                   , Attr.style "color" config.colors.primaryText
                   , Attr.style "opacity" "0.7"
                   , Attr.style "cursor" "wait"
                   ]
    in
    case config.login of
        LoginTokenSent ->
            button
                (loadingStyles ++ [ Attr.disabled True, Attr.class "animate-pulse" ])
                [ text "Authenticating..." ]

        NotLogged pendingAuth ->
            if pendingAuth then
                button
                    (loadingStyles ++ [ Attr.disabled True ])
                    [ text "Authenticating..." ]

            else
                button
                    (loginButtonStyles ++ [ onClick config.onLogin ])
                    [ text "Login" ]

        JustArrived ->
            button
                (loginButtonStyles ++ [ onClick config.onLogin ])
                [ text "Login" ]

        LoggedIn _ ->
            -- This shouldn't happen as we handle LoggedIn in the main view
            text ""


getInitials : Auth.Common.UserInfo -> String
getInitials userInfo =
    case userInfo.name of
        Just name ->
            name
                |> String.words
                |> List.map (String.left 1)
                |> List.take 2
                |> String.concat
                |> String.toUpper

        Nothing ->
            userInfo.email
                |> String.left 1
                |> String.toUpper
