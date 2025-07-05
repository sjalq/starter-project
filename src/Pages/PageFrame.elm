module Pages.PageFrame exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Pages.Admin
import Pages.Default
import Pages.Examples
import Route exposing (..)
import Theme -- Import the new Theme module
import Types exposing (..)

-- Remove darkModeStyles function


viewTabs : FrontendModel -> Html FrontendMsg
viewTabs model =
    let
        isDark =
            model.preferences.darkMode
        
        colors =
            Theme.getColors isDark
    in
    div 
        [ Attr.class "text-center py-8 px-4 border-b"
        , Theme.headerBg isDark
        , Attr.style "border-color" colors.headerBorder
        ] 
        [ div [ Attr.class "container mx-auto" ]
            [ h1 
                [ Attr.class "text-4xl font-bold mb-2"
                , Attr.style "color" colors.accent
                ] 
                [ text "Starter Project Dashboard" ]
            , p 
                [ Attr.class "mb-8"
                , Theme.headerText isDark
                ] 
                [ text "Your starting point" ]
            , div [ Attr.class "flex justify-center space-x-8 mt-4" ]
                ([ viewTab "Home" Default model.currentRoute model.preferences
                 , viewTab "Examples" Examples model.currentRoute model.preferences
                 ] ++
                    (case model.currentUser of
                        Just user ->
                            if user.isSysAdmin then
                                [ viewTab "Admin" (Admin AdminDefault) model.currentRoute model.preferences ]
                            else
                                []
                        Nothing ->
                            []
                    )
                )
            ]
        , viewAccountControls model
        ]


viewAccountControls : FrontendModel -> Html FrontendMsg
viewAccountControls model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
    in
    div 
        [ Attr.class "absolute top-6 right-6 flex items-center" ]
        [ viewPillControl model ]


viewPillControl : FrontendModel -> Html FrontendMsg
viewPillControl model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
    in
    div 
        [ Attr.class "flex items-center" 
        , Attr.style "border-radius" "9999px"
        , Attr.style "overflow" "hidden"
        , Attr.style "border" ("1px solid " ++ colors.border)
        , Attr.style "background-color" colors.secondaryBg
        , Attr.style "transition" "all 0.3s ease"
        ]
        [ button
            [ onClick ToggleDarkMode
            , Attr.class "px-3 py-2"
            , Attr.style "background-color" colors.secondaryBg
            , Attr.style "color" colors.primaryText
            , Attr.style "transition" "all 0.3s ease"
            , Attr.style "border-right" ("1px solid " ++ colors.border)
            ]
            [ text (if isDark then "☀️" else "🌙") ]
        , viewAuthSection model
        ]


viewAuthSection : FrontendModel -> Html FrontendMsg
viewAuthSection model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
        
        loginButtonStyles =
            [ Attr.class "px-4 py-2"
            , Attr.style "transition" "all 0.3s ease"
            , Attr.style "background-color" "#38a169" -- Green color
            , Attr.style "color" "#ffffff"
            ]
            
        logoutButtonStyles =
            [ Attr.class "px-4 py-2"
            , Attr.style "transition" "all 0.3s ease"
            , Attr.style "background-color" colors.dangerBg
            , Attr.style "color" "#ffffff"
            ]
            
        loadingStyles =
            [ Attr.class "px-4 py-2"
            , Attr.style "transition" "all 0.3s ease"
            , Attr.style "background-color" colors.secondaryBg
            , Attr.style "color" colors.primaryText
            ]
        
        userEmail = 
            case model.login of
                LoggedIn info -> Just info.email
                _ -> Nothing
    in
    case model.login of
        LoggedIn userInfo ->
            div 
                [ Attr.class "relative group"
                , Attr.style "transition" "all 0.3s ease"
                ]
                [ button
                    (logoutButtonStyles ++ [ onClick Logout ])
                    [ text "Logout" ]
                , div 
                    [ Attr.class "absolute right-0 top-full mt-2 px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100"
                    , Attr.style "background-color" colors.primaryBg
                    , Attr.style "color" colors.primaryText
                    , Attr.style "border" ("1px solid " ++ colors.border)
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
                    (loginButtonStyles ++ [ onClick Auth0SigninRequested ])
                    [ text "Login" ]

        JustArrived ->
            button
                (loginButtonStyles ++ [ onClick Auth0SigninRequested ])
                [ text "Login" ]


viewTab : String -> Route -> Route -> Preferences -> Html FrontendMsg
viewTab label page currentPage preferences =
    let
        isDark =
            preferences.darkMode
        
        colors =
            Theme.getColors isDark
            
        isActive =
            page == currentPage
    in
    a
        [ Attr.href (Route.toString page)
        , Attr.class "px-3 py-2 text-lg font-medium transition-colors duration-200"
        , Attr.style "color" (if isActive then colors.activeTabText else colors.inactiveTabText)
        , Attr.style "border-bottom" (if isActive then "2px solid " ++ colors.activeTabText else "none")
        , Attr.style "text-decoration" "none"
        ]
        [ text label ]


viewCurrentPage : FrontendModel -> Html FrontendMsg
viewCurrentPage model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
    in
    div
        [ Attr.class "px-4 pt-8 pb-4"
        , Attr.style "min-height" "calc(100vh - 200px)"
        , Attr.style "background-color" colors.primaryBg
        ]
        [ case model.currentRoute of
            Default ->
                Pages.Default.view model colors

            Admin _ ->
                Pages.Admin.view model colors

            Examples ->
                Pages.Examples.view model colors

            NotFound ->
                viewNotFoundPage colors
        ]


viewNotFoundPage : Theme.Colors -> Html FrontendMsg -- Accept colors
viewNotFoundPage colors =
    div [ Attr.class "text-center p-4", Attr.style "color" colors.primaryText ] -- Use theme color
        [ h1 [] [ text "404 - Page Not Found" ]
        ]
