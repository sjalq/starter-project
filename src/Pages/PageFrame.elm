module Pages.PageFrame exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Pages.Admin
import Pages.Default
import Route exposing (..)
import Types exposing (..)

-- Helper for dark mode styling

darkModeStyles : Preferences -> List ( String, String )
darkModeStyles preferences =
    if preferences.darkMode then
        [ ( "background-color", "#1a202c" ) -- Dark background
        , ( "color", "#e2e8f0" ) -- Light text
        ]
    else
        [ ( "background-color", "#ffffff" ) -- White background
        , ( "color", "#1a202c" ) -- Dark text
        ]


viewTabs : FrontendModel -> Html FrontendMsg
viewTabs model =
    div [ Attr.class "flex justify-between mb-5 px-4 items-center" ] -- Added items-center
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
            -- Dark Mode Toggle Button
            [ button
                [ onClick ToggleDarkMode
                , Attr.class "mr-4 px-2 py-1 rounded"
                , Attr.style "border" "1px solid currentColor" -- Use current text color for border
                ]
                [ text (if model.preferences.darkMode then
                            "☀️"
                       else
                            "🌙"
                       )
                ]

            -- Existing Login/Logout section
            , case model.login of
                LoggedIn userInfo ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2", Attr.style "color" (if model.preferences.darkMode then "#a0aec0" else "#4a5568") ] -- Adjusted text color
                            [ text userInfo.email ]
                        , button
                            [ onClick Logout
                            , Attr.class "px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            ]
                            [ text "Logout" ]
                        ]

                LoginTokenSent ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2 animate-pulse", Attr.style "color" (if model.preferences.darkMode then "#a0aec0" else "#4a5568") ]
                            [ text "Authenticating..." ]
                        ]

                NotLogged pendingAuth ->
                    if pendingAuth then
                        button
                            [ Attr.disabled True
                            , Attr.class "px-4 py-1 bg-blue-400 text-white rounded cursor-wait"
                            ]
                            [ text "Authenticating..." ]
                    else
                        button
                            [ onClick Auth0SigninRequested
                            , Attr.class "px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            ]
                            [ text "Login" ]

                JustArrived ->
                    button
                        [ onClick Auth0SigninRequested
                        , Attr.class "px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        ]
                        [ text "Login" ]
            ]
        ]


viewTab : String -> Route -> Route -> Preferences -> Html FrontendMsg
viewTab label page currentPage preferences =
    let
        isDark =
            preferences.darkMode
        
        bgColor =
            if page == currentPage then
                if isDark then
                    "#4a5568" -- Slightly lighter dark for active tab
                else
                    "#e2e8f0" -- Light gray for active tab
            else if isDark then
                "#2d3748" -- Dark background for inactive tab
            else
                "#ffffff" -- White for inactive tab

        textColor =
            if isDark then
                "#e2e8f0" -- Light text
            else
                "#1a202c" -- Dark text
    in
    a
        [ Attr.href (Route.toString page)
        , Attr.class "px-4 py-2 mx-2 border cursor-pointer rounded"
        , Attr.style "background-color" bgColor
        , Attr.style "color" textColor
        , Attr.style "border-color" (if isDark then "#4a5568" else "#cbd5e0")
        ]
        [ text label ]


viewCurrentPage : FrontendModel -> Html FrontendMsg
viewCurrentPage model =
    -- Apply dark mode styles to the main content container
    div [ Attr.style "min-height" "calc(100vh - 100px)" -- Example height, adjust as needed
        , Attr.styles (darkModeStyles model.preferences)
        , Attr.class "p-4" -- Added padding
        ]
        [ case model.currentRoute of
            Default ->
                Pages.Default.view model

            Admin _ ->
                Pages.Admin.view model

            NotFound ->
                viewNotFoundPage
        ]


viewNotFoundPage : Html FrontendMsg
viewNotFoundPage =
    div [ Attr.class "text-center p-4" ]
        [ h1 [] [ text "404 - Page Not Found" ]
        ]
