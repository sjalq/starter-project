module Pages.PageFrame exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Pages.Admin
import Pages.Default
import Pages.AgentSettings
import Route exposing (..)
import Types exposing (..)


viewTabs : FrontendModel -> Html FrontendMsg
viewTabs model =
    div [ Attr.class "flex justify-between mb-5 px-4" ]
        [ div [ Attr.class "flex" ]
            (viewTab "Default" Default model.currentRoute
                :: viewTab "Agent Settings" AgentSettings model.currentRoute
                :: (case model.currentUser of
                        Just user ->
                            if user.isSysAdmin then
                                [ viewTab "Admin" (Admin AdminDefault) model.currentRoute ]

                            else
                                []

                        Nothing ->
                            []
                   )
            )
        , div [ Attr.class "flex items-center" ]
            [ case model.login of
                LoggedIn userInfo ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2 text-gray-600" ]
                            [ text userInfo.email ]
                        , button
                            [ onClick Logout
                            , Attr.class "px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            ]
                            [ text "Logout" ]
                        ]

                LoginTokenSent ->
                    div [ Attr.class "flex items-center" ]
                        [ span [ Attr.class "mr-2 text-gray-600 animate-pulse" ]
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


viewTab : String -> Route -> Route -> Html FrontendMsg
viewTab label page currentPage =
    a
        [ Attr.href (Route.toString page)
        , Attr.classList
            [ ( "px-4 py-2 mx-2 border cursor-pointer", True )
            , ( "bg-gray-300", page == currentPage )
            , ( "bg-white", page /= currentPage )
            ]
        ]
        [ text label ]


viewCurrentPage : FrontendModel -> Html FrontendMsg
viewCurrentPage model =
    case model.currentRoute of
        Default ->
            Pages.Default.view model

        Admin _ ->
            Pages.Admin.view model

        AgentSettings ->
            Html.map identity (Pages.AgentSettings.view (agentSettingsSubModel model))

        NotFound ->
            viewNotFoundPage


viewNotFoundPage : Html FrontendMsg
viewNotFoundPage =
    div [ Attr.class "text-center p-4" ]
        [ text "404 - Page Not Found" ]


-- Helper Functions needed by PageFrame (copied from Frontend.elm)

-- Helper to create the sub-model for the AgentSettings page
agentSettingsSubModel : FrontendModel -> Pages.AgentSettings.Model
agentSettingsSubModel model =
    Pages.AgentSettings.init model.agentConfigs model.agentSettingsPage
