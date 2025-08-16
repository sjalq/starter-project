module Pages.Admin exposing (..)

import Env
import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Lamdera
import Theme
import Types exposing (..)



-- import Fusion.Editor
-- import Fusion.Generated.TypeDict
-- import Fusion.Generated.TypeDict.Types


init : FrontendModel -> AdminRoute -> ( FrontendModel, Cmd FrontendMsg )
init model adminRoute =
    if Env.stillTesting == "1" then
        -- Testing mode, allow admin access
        ( { model
            | adminPage =
                { isAuthenticated = True
                , logs = model.adminPage.logs
                , remoteUrl = ""
                }
          }
        , case adminRoute of
            AdminLogs ->
                Lamdera.sendToBackend Admin_FetchLogs

            _ ->
                Cmd.none
        )

    else
        -- Check if user is logged in and has admin privileges
        case model.currentUser of
            Just user ->
                if user.isSysAdmin then
                    -- Allow admin access
                    case adminRoute of
                        AdminLogs ->
                            ( model, Lamdera.sendToBackend Admin_FetchLogs )

                        _ ->
                            ( model, Cmd.none )

                else
                    -- Logged in but not admin
                    ( model, Cmd.none )

            _ ->
                -- Not logged in or user data not yet loaded
                ( model, Cmd.none )


view : FrontendModel -> Theme.Colors -> Html FrontendMsg
view model colors =
    -- Check if user is logged in and has admin permissions
    case model.currentUser of
        Just user ->
            if user.isSysAdmin then
                div [ Attr.style "background-color" colors.primaryBg, Attr.class "min-h-screen" ]
                    [ div [ Attr.class "container mx-auto px-4 py-8" ]
                        [ h1 [ Attr.class "text-3xl font-bold mb-4", Attr.style "color" colors.primaryText ]
                            [ text "Admin Page" ]
                        , viewTabs model colors
                        , viewTabContent model colors
                        ]
                    ]

            else
                viewNoAccess model colors

        _ ->
            viewLogin model colors


viewNoAccess : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewNoAccess _ colors =
    div [ Attr.class "min-h-screen flex items-center justify-center", Attr.style "background-color" colors.primaryBg ]
        [ div [ Attr.class "p-8 rounded-lg shadow-md w-96", Attr.style "background-color" colors.secondaryBg ]
            [ h2 [ Attr.class "text-2xl font-bold mb-4", Attr.style "color" colors.primaryText ] [ text "Access Denied" ]
            , p [ Attr.class "mb-4", Attr.style "color" colors.dangerBg ]
                [ text "Your account does not have administrative privileges." ]
            , button
                [ onClick Logout
                , Attr.class "w-full py-2 px-4 rounded mb-2"
                , Attr.style "background-color" colors.buttonBg
                , Attr.style "color" colors.buttonText
                ]
                [ text "Logout" ]
            , a
                [ Attr.href "/"
                , Attr.class "block text-center hover:underline"
                , Attr.style "color" colors.accent
                ]
                [ text "Return to Home" ]
            ]
        ]


viewTabs : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewTabs model colors =
    div [ Attr.class "flex border-b mb-4", Attr.style "border-color" colors.border ]
        [ viewTab AdminDefault model colors "Default"
        , viewTab AdminLogs model colors "Logs"
        , viewTab AdminFetchModel model colors "Fetch Model"

        -- , viewTab AdminFusion model "Fusion"
        ]


viewTab : AdminRoute -> FrontendModel -> Theme.Colors -> String -> Html FrontendMsg
viewTab tab model colors label =
    let
        isActive =
            Admin tab == model.currentRoute

        activeClasses =
            if isActive then
                "border-b-2"

            else
                ""

        activeBorderStyle =
            if isActive then
                Attr.style "border-color" colors.accent

            else
                Attr.style "border-color" "transparent"

        textColorStyle =
            if isActive then
                Attr.style "color" colors.accent

            else
                Attr.style "color" colors.secondaryText

        route =
            case tab of
                AdminDefault ->
                    "/admin"

                AdminLogs ->
                    "/admin/logs"

                AdminFetchModel ->
                    "/admin/fetch-model"

        -- AdminFusion ->
        --     "/admin/fusion"
    in
    a
        [ Attr.href route
        , Attr.class ("py-2 px-4 " ++ activeClasses)
        , activeBorderStyle
        , textColorStyle
        ]
        [ text label ]


viewTabContent : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewTabContent model colors =
    case model.currentRoute of
        Admin AdminDefault ->
            viewDefaultTab model colors

        Admin AdminLogs ->
            viewLogsTab model colors

        Admin AdminFetchModel ->
            viewFetchModelTab model colors

        -- Admin AdminFusion ->
        --     viewFusionTab model
        _ ->
            text "Not found"


viewDefaultTab : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewDefaultTab _ colors =
    div [ Attr.class "p-4 rounded-lg shadow", Attr.style "background-color" colors.secondaryBg ]
        [ h2 [ Attr.class "text-xl font-bold mb-4", Attr.style "color" colors.primaryText ] [ text "Default Admin" ]
        , div [ Attr.style "color" colors.primaryText ] [ text "Default admin content" ]
        ]


viewLogsTab : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewLogsTab model colors =
    div [ Attr.class "p-4 rounded-lg shadow", Attr.style "background-color" colors.secondaryBg ]
        [ div [ Attr.class "flex justify-between items-center mb-4" ]
            [ h2 [ Attr.class "text-xl font-bold", Attr.style "color" colors.primaryText ] [ text "System Logs" ]
            , button
                [ onClick (DirectToBackend Admin_ClearLogs)
                , Attr.class "px-3 py-1 rounded"
                , Attr.style "background-color" colors.dangerBg
                , Attr.style "color" colors.buttonText
                ]
                [ text "Clear Logs" ]
            ]
        , div [ Attr.class "bg-black text-gray-200 font-mono p-4 rounded space-y-1", Attr.style "color" "#e2e8f0" ]
            (model.adminPage.logs
                |> List.reverse
                |> List.indexedMap viewLogEntry
            )
        ]


viewFetchModelTab : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewFetchModelTab model colors =
    div [ Attr.class "p-4 rounded-lg shadow", Attr.style "background-color" colors.secondaryBg ]
        [ h2 [ Attr.class "text-xl font-bold mb-4", Attr.style "color" colors.primaryText ] [ text "Fetch Model" ]
        , div []
            [ div [ Attr.class "mb-4" ]
                [ label [ Attr.class "block text-sm font-bold mb-2", Attr.style "color" colors.primaryText ]
                    [ text "Remote URL" ]
                , input
                    [ Attr.type_ "text"
                    , Attr.placeholder "Enter remote URL"
                    , Attr.value model.adminPage.remoteUrl
                    , Html.Events.onInput Admin_RemoteUrlChanged
                    , Attr.class "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    , Attr.style "color" colors.primaryText
                    , Attr.style "background-color" colors.primaryBg
                    , Attr.style "border-color" colors.border
                    ]
                    []
                ]
            , button
                [ onClick (DirectToBackend (Admin_FetchRemoteModel model.adminPage.remoteUrl))
                , Attr.class "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                , Attr.style "background-color" colors.buttonBg
                , Attr.style "color" colors.buttonText
                ]
                [ text "Fetch Model" ]
            ]
        ]


viewFusionTab : FrontendModel -> Html FrontendMsg
viewFusionTab model =
    div [ Attr.class "p-4 bg-black text-white" ]
        [ h2 [ Attr.class "text-xl font-bold mb-4" ] [ text "Fusion Editor" ]

        -- , Fusion.Editor.value
        --     { typeDict = Fusion.Generated.TypeDict.typeDict
        --     , type_ = Just Fusion.Generated.TypeDict.Types.type_BackendModel
        --     , editMsg = Admin_FusionPatch
        --     , queryMsg = Admin_FusionQuery
        --     }
        --     model.fusionState
        ]


viewLogEntry : Int -> String -> Html FrontendMsg
viewLogEntry index log =
    div []
        [ span [ Attr.class "pr-2" ] [ text (String.fromInt index) ]
        , span [ Attr.style "color" "#a0aec0" ] [ text log ]
        ]


viewLogin : FrontendModel -> Theme.Colors -> Html FrontendMsg
viewLogin _ colors =
    div [ Attr.class "min-h-screen flex items-center justify-center", Attr.style "background-color" colors.primaryBg ]
        [ div [ Attr.class "p-8 rounded-lg shadow-md w-96", Attr.style "background-color" colors.secondaryBg ]
            [ h2 [ Attr.class "text-2xl font-bold mb-4", Attr.style "color" colors.primaryText ] [ text "Admin Login Required" ]
            , p [ Attr.class "mb-4", Attr.style "color" colors.secondaryText ]
                [ text "Please log in to access the admin area." ]
            , button
                [ onClick Auth0SigninRequested
                , Attr.class "w-full py-2 px-4 rounded mb-2"
                , Attr.style "background-color" colors.buttonBg
                , Attr.style "color" colors.buttonText
                ]
                [ text "Login" ]
            , a
                [ Attr.href "/"
                , Attr.class "block text-center hover:underline"
                , Attr.style "color" colors.accent
                ]
                [ text "Return to Home" ]
            ]
        ]
