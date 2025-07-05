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
import Components.Header
import Components.Tab
import Components.AuthControls


viewTabs : FrontendModel -> Html FrontendMsg
viewTabs model =
    let
        isDark =
            model.preferences.darkMode
        
        colors =
            Theme.getColors isDark
        
        baseTabs =
            [ { label = "Home", href = Route.toString Default, isActive = model.currentRoute == Default, colors = colors }
            , { label = "Examples", href = Route.toString Examples, isActive = model.currentRoute == Examples, colors = colors }
            ]
        
        adminTabs =
            case model.currentUser of
                Just user ->
                    if user.isSysAdmin then
                        [ { label = "Admin", href = Route.toString (Admin AdminDefault), isActive = model.currentRoute == (Admin AdminDefault), colors = colors } ]
                    else
                        []
                Nothing ->
                    []
        
        allTabs = baseTabs ++ adminTabs
    in
    div 
        [ Attr.class "relative py-4 md:py-8 px-4 border-b"
        , Theme.headerBg isDark
        , Attr.style "border-color" colors.headerBorder
        ] 
        [ div [ Attr.class "container mx-auto" ]
            [ div [ Attr.class "flex flex-col lg:flex-row lg:items-center lg:justify-between" ]
                [ div [ Attr.class "text-center lg:text-left mb-4 lg:mb-0" ]
                    [ Components.Header.view 
                        { title = "Starter Project Dashboard"
                        , subtitle = Just "Your starting point"
                        , colors = colors
                        , size = Components.Header.Large
                        }
                    ]
                , viewAccountControls model
                ]
            , div [ Attr.class "text-center" ]
                [ Components.Tab.tabBar colors allTabs ]
            ]
        ]


viewAccountControls : FrontendModel -> Html FrontendMsg
viewAccountControls model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
    in
    div 
        [ Attr.class "flex justify-center lg:justify-end" ]
        [ Components.AuthControls.view 
            { login = model.login
            , colors = colors
            , onToggleDarkMode = ToggleDarkMode
            , onLogin = Auth0SigninRequested
            , onLogout = Logout
            , isDarkMode = isDark
            }
        ]


viewCurrentPage : FrontendModel -> Html FrontendMsg
viewCurrentPage model =
    let
        isDark = model.preferences.darkMode
        colors = Theme.getColors isDark
    in
    div
        [ Attr.class "px-4 md:px-6 pt-4 md:pt-8 pb-4"
        , Attr.style "min-height" "calc(100vh - 160px)"
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
