module Pages.PageFrame exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Pages.Admin
import Pages.Default
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
    div [ Attr.class "flex justify-between mb-5 px-4 items-center" ]
        [ div [ Attr.class "flex" ]
            (viewTab "Default" Default model.currentRoute model.preferences
                :: (case model.currentUser of
                        Just user ->
                            if user.isSysAdmin then
                                [ viewTab "Admin" (Admin AdminDefault) model.currentRoute model.preferences ]

                            else
                                []

                        Nothing ->
                            []
                   )
            )
        , viewPillControl model
        ]


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
                    [ Attr.class "absolute right-0 top-full mt-1 px-3 py-2 rounded hidden group-hover:block"
                    , Attr.style "background-color" colors.primaryBg
                    , Attr.style "color" colors.primaryText
                    , Attr.style "border" ("1px solid " ++ colors.border)
                    , Attr.style "min-width" "max-content"
                    , Attr.style "z-index" "10"
                    ]
                    [ text userInfo.email ]
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
        
        isActive =
            page == currentPage
        
        colors =
            Theme.getColors isDark
        
        bgColor =
            if isActive then
                colors.secondaryBg
            else
                colors.primaryBg

        textColor =
            colors.primaryText
    in
    a
        [ Attr.href (Route.toString page)
        , Attr.class "px-4 py-2 mx-2 border cursor-pointer rounded"
        , Attr.style "background-color" bgColor
        , Attr.style "color" textColor
        , Attr.style "border-color" colors.border
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
        , Attr.style "min-height" "calc(100vh - 100px)"
        ]
        [ case model.currentRoute of
            Default ->
                Pages.Default.view model colors

            Admin _ ->
                Pages.Admin.view model colors

            NotFound ->
                viewNotFoundPage colors
        ]


viewNotFoundPage : Theme.Colors -> Html FrontendMsg -- Accept colors
viewNotFoundPage colors =
    div [ Attr.class "text-center p-4", Attr.style "color" colors.primaryText ] -- Use theme color
        [ h1 [] [ text "404 - Page Not Found" ]
        ]
