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
        , div [ Attr.class "flex items-center" ]
            [ button
                [ onClick ToggleDarkMode
                , Attr.class "mr-4 px-2 py-1 rounded border"
                , Theme.primaryBorder isDark
                , Theme.primaryText isDark
                ]
                [ text (if isDark then
                            "☀️"
                       else
                            "🌙"
                       )
                ]

            , case model.login of
                LoggedIn userInfo ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2", Attr.style "color" colors.secondaryText ]
                            [ text userInfo.email ]
                        , button
                            [ onClick Logout
                            , Attr.class "px-4 py-1 rounded"
                            , Attr.style "background-color" colors.dangerBg
                            , Attr.style "color" colors.buttonText
                            ]
                            [ text "Logout" ]
                        ]

                LoginTokenSent ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2 animate-pulse", Attr.style "color" colors.secondaryText ]
                            [ text "Authenticating..." ]
                        ]

                NotLogged pendingAuth ->
                    if pendingAuth then
                        button
                            [ Attr.disabled True
                            , Attr.class "px-4 py-1 rounded cursor-wait"
                             , Attr.style "background-color" colors.buttonBg
                             , Attr.style "color" colors.buttonText
                            , Attr.style "opacity" "0.7"
                            ]
                            [ text "Authenticating..." ]
                    else
                        button
                            [ onClick Auth0SigninRequested
                            , Attr.class "px-4 py-1 rounded"
                            , Attr.style "background-color" colors.buttonBg
                            , Attr.style "color" colors.buttonText
                            ]
                            [ text "Login" ]

                JustArrived ->
                    button
                        [ onClick Auth0SigninRequested
                        , Attr.class "px-4 py-1 rounded"
                        , Attr.style "background-color" colors.buttonBg
                        , Attr.style "color" colors.buttonText
                        ]
                        [ text "Login" ]
            ]
        ]


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
