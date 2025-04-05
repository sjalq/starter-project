module Pages.Admin exposing (..)

import Env
import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick)
import Lamdera
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


view : FrontendModel -> Html FrontendMsg
view model =
    -- Check if user is logged in and has admin permissions
    case model.currentUser of
        Just user ->
            if user.isSysAdmin then
                div [ Attr.class "bg-gray-100 min-h-screen" ]
                    [ div [ Attr.class "container mx-auto px-4 py-8" ]
                        [ h1 [ Attr.class "text-3xl font-bold mb-4" ]
                            [ text "Admin Page" ]
                        , viewTabs model
                        , viewTabContent model
                        ]
                    ]

            else
                viewNoAccess model

        _ ->
            viewLogin model


viewNoAccess : FrontendModel -> Html FrontendMsg
viewNoAccess _ =
    div [ Attr.class "min-h-screen flex items-center justify-center bg-gray-100" ]
        [ div [ Attr.class "bg-white p-8 rounded-lg shadow-md w-96" ]
            [ h2 [ Attr.class "text-2xl font-bold mb-4" ] [ text "Access Denied" ]
            , p [ Attr.class "text-red-600 mb-4" ]
                [ text "Your account does not have administrative privileges." ]
            , button
                [ onClick Logout
                , Attr.class "w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
                ]
                [ text "Logout" ]
            , a
                [ Attr.href "/"
                , Attr.class "block text-center text-blue-500 hover:underline"
                ]
                [ text "Return to Home" ]
            ]
        ]


viewTabs : FrontendModel -> Html FrontendMsg
viewTabs model =
    div [ Attr.class "flex border-b border-gray-200 mb-4" ]
        [ viewTab AdminDefault model "Default"
        , viewTab AdminLogs model "Logs"
        , viewTab AdminFetchModel model "Fetch Model"
        -- , viewTab AdminFusion model "Fusion"
        ]


viewTab : AdminRoute -> FrontendModel -> String -> Html FrontendMsg
viewTab tab model label =
    let
        activeClass =
            if Admin tab == model.currentRoute then
                "border-b-2 border-blue-500 text-blue-600"

            else
                "text-gray-600"

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
        , Attr.class ("py-2 px-4 " ++ activeClass)
        ]
        [ text label ]


viewTabContent : FrontendModel -> Html FrontendMsg
viewTabContent model =
    case model.currentRoute of
        Admin AdminDefault ->
            viewDefaultTab model

        Admin AdminLogs ->
            viewLogsTab model

        Admin AdminFetchModel ->
            viewFetchModelTab model

        -- Admin AdminFusion ->
        --     viewFusionTab model

        _ ->
            text "Not found"


viewDefaultTab : FrontendModel -> Html FrontendMsg
viewDefaultTab _ =
    div [ Attr.class "p-4 bg-white rounded-lg shadow" ]
        [ h2 [ Attr.class "text-xl font-bold mb-4" ] [ text "Default Admin" ]
        , div [] [ text "Default admin content" ]
        ]


viewLogsTab : FrontendModel -> Html FrontendMsg
viewLogsTab model =
    div [ Attr.class "p-4 bg-white rounded-lg shadow" ]
        [ div [ Attr.class "flex justify-between items-center mb-4" ]
            [ h2 [ Attr.class "text-xl font-bold" ] [ text "System Logs" ]
            , button
                [ onClick (DirectToBackend Admin_ClearLogs)
                , Attr.class "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                ]
                [ text "Clear Logs" ]
            ]
        , div [ Attr.class "bg-black text-yellow-100 font-mono p-4 rounded space-y-1" ]
            (model.adminPage.logs
                |> List.reverse
                |> List.indexedMap viewLogEntry
            )
        ]


viewFetchModelTab : FrontendModel -> Html FrontendMsg
viewFetchModelTab model =
    div [ Attr.class "p-4 bg-white rounded-lg shadow" ]
        [ h2 [ Attr.class "text-xl font-bold mb-4" ] [ text "Fetch Model" ]
        , div []
            [ div [ Attr.class "mb-4" ]
                [ label [ Attr.class "block text-gray-700 text-sm font-bold mb-2" ]
                    [ text "Remote URL" ]
                , input
                    [ Attr.type_ "text"
                    , Attr.placeholder "Enter remote URL"
                    , Attr.value model.adminPage.remoteUrl
                    , Html.Events.onInput Admin_RemoteUrlChanged
                    , Attr.class "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ]
                    []
                ]
            , button
                [ onClick (DirectToBackend (Admin_FetchRemoteModel model.adminPage.remoteUrl))
                , Attr.class "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                ]
                [ text "Fetch Model" ]
            ]
        ]


-- viewFusionTab : FrontendModel -> Html FrontendMsg
-- viewFusionTab model =
--     div [ Attr.class "p-4 bg-black text-white" ]
--         [ h2 [ Attr.class "text-xl font-bold mb-4" ] [ text "Fusion Editor" ]
        -- , Fusion.Editor.value
        --     { typeDict = Fusion.Generated.TypeDict.typeDict
        --     , type_ = Just Fusion.Generated.TypeDict.Types.type_BackendModel
        --     , editMsg = Admin_FusionPatch
        --     , queryMsg = Admin_FusionQuery
        --     }
        --     model.fusionState
--         ]


viewLogEntry : Int -> String -> Html FrontendMsg
viewLogEntry index log =
    div []
        [ span [ Attr.class "pr-2" ] [ text (String.fromInt index) ]
        , span [ Attr.class "text-green-200" ] [ text log ]
        ]


viewLogin : FrontendModel -> Html FrontendMsg
viewLogin _ =
    div [ Attr.class "min-h-screen flex items-center justify-center bg-gray-100" ]
        [ div [ Attr.class "bg-white p-8 rounded-lg shadow-md w-96" ]
            [ h2 [ Attr.class "text-2xl font-bold mb-4" ] [ text "Admin Login Required" ]
            , p [ Attr.class "text-gray-600 mb-4" ]
                [ text "Please log in to access the admin area." ]
            , button
                [ onClick Auth0SigninRequested
                , Attr.class "w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
                ]
                [ text "Login" ]
            , a
                [ Attr.href "/"
                , Attr.class "block text-center text-blue-500 hover:underline"
                ]
                [ text "Return to Home" ]
            ]
        ]
