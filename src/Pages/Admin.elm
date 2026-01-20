module Pages.Admin exposing (..)

import Env
import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick, onInput)
import Lamdera
import Logger
import Route
import Theme
import Time
import Types exposing (..)



-- import Fusion.Editor
-- import Fusion.Generated.TypeDict
-- import Fusion.Generated.TypeDict.Types


init : FrontendModel -> AdminRoute -> ( FrontendModel, Cmd FrontendMsg )
init model adminRoute =
    -- Check if user is logged in and has admin privileges
    case model.currentUser of
        Just user ->
            if user.isSysAdmin then
                -- Allow admin access
                case adminRoute of
                    AdminLogs params ->
                        ( model, Lamdera.sendToBackend (Admin_FetchLogs params.search) )

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
        , viewTab (AdminLogs Route.defaultLogsParams) model colors "Logs"
        , viewTab AdminFetchModel model colors "Fetch Model"

        -- , viewTab AdminFusion model "Fusion"
        ]


viewTab : AdminRoute -> FrontendModel -> Theme.Colors -> String -> Html FrontendMsg
viewTab tab model colors label =
    let
        isActive =
            case ( tab, model.currentRoute ) of
                ( AdminDefault, Admin AdminDefault ) ->
                    True

                ( AdminLogs _, Admin (AdminLogs _) ) ->
                    True

                ( AdminFetchModel, Admin AdminFetchModel ) ->
                    True

                _ ->
                    False

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
            Route.toString (Admin tab)
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

        Admin (AdminLogs params) ->
            viewLogsTab model colors params

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


viewLogsTab : FrontendModel -> Theme.Colors -> AdminLogsUrlParams -> Html FrontendMsg
viewLogsTab model colors params =
    let
        -- Logs come pre-filtered from backend, already sorted newest first
        logs =
            model.adminPage.logs

        totalLogs =
            List.length logs

        -- Paginate
        startIndex =
            params.page * params.pageSize

        paginatedLogs =
            logs
                |> List.drop startIndex
                |> List.take params.pageSize

        totalPages =
            ceiling (toFloat totalLogs / toFloat params.pageSize)

        -- Navigation helper
        navigateTo newParams =
            Admin_LogsNavigate newParams
    in
    div [ Attr.class "p-4 rounded-lg shadow", Attr.style "background-color" colors.secondaryBg ]
        [ div [ Attr.class "flex justify-between items-center mb-4" ]
            [ h2 [ Attr.class "text-xl font-bold", Attr.style "color" colors.primaryText ] [ text "System Logs" ]
            , div [ Attr.class "flex items-center gap-4" ]
                [ div [ Attr.class "flex items-center gap-2" ]
                    [ label [ Attr.style "color" colors.primaryText ] [ text "Per page:" ]
                    , select
                        [ onInput (\v -> navigateTo { params | pageSize = String.toInt v |> Maybe.withDefault 100, page = 0 })
                        , Attr.class "px-2 py-1 rounded border"
                        , Attr.style "background-color" colors.primaryBg
                        , Attr.style "color" colors.primaryText
                        , Attr.style "border-color" colors.border
                        ]
                        [ option [ Attr.value "50", Attr.selected (params.pageSize == 50) ] [ text "50" ]
                        , option [ Attr.value "100", Attr.selected (params.pageSize == 100) ] [ text "100" ]
                        , option [ Attr.value "250", Attr.selected (params.pageSize == 250) ] [ text "250" ]
                        , option [ Attr.value "500", Attr.selected (params.pageSize == 500) ] [ text "500" ]
                        ]
                    ]
                , button
                    [ onClick (DirectToBackend Admin_ClearLogs)
                    , Attr.class "px-3 py-1 rounded"
                    , Attr.style "background-color" colors.dangerBg
                    , Attr.style "color" colors.buttonText
                    ]
                    [ text "Clear Logs" ]
                ]
            ]
        , div [ Attr.class "mb-4" ]
            [ input
                [ Attr.type_ "text"
                , Attr.placeholder "Search logs..."
                , Attr.value params.search
                , onInput (\v -> navigateTo { params | search = v, page = 0 })
                , Attr.class "w-full px-3 py-2 rounded border"
                , Attr.style "background-color" colors.primaryBg
                , Attr.style "color" colors.primaryText
                , Attr.style "border-color" colors.border
                ]
                []
            ]
        , div [ Attr.class "flex justify-between items-center mb-2", Attr.style "color" colors.secondaryText ]
            [ span [] [ text ("Showing " ++ String.fromInt (startIndex + 1) ++ "-" ++ String.fromInt (min (startIndex + params.pageSize) totalLogs) ++ " of " ++ String.fromInt totalLogs) ]
            , viewPagination colors params totalPages navigateTo
            ]
        , div [ Attr.class "bg-black text-gray-200 font-mono p-4 rounded space-y-1 text-sm overflow-x-auto", Attr.style "color" "#e2e8f0" ]
            (paginatedLogs
                |> List.map viewLogEntry
            )
        , if totalPages > 1 then
            div [ Attr.class "flex justify-center mt-4" ]
                [ viewPagination colors params totalPages navigateTo ]

          else
            text ""
        ]


viewPagination : Theme.Colors -> AdminLogsUrlParams -> Int -> (AdminLogsUrlParams -> FrontendMsg) -> Html FrontendMsg
viewPagination colors params totalPages navigateTo =
    let
        currentPage =
            params.page

        pageButton page label_ isDisabled =
            button
                [ onClick (navigateTo { params | page = page })
                , Attr.disabled isDisabled
                , Attr.class "px-3 py-1 rounded mx-1"
                , Attr.style "background-color"
                    (if page == currentPage then
                        colors.accent

                     else if isDisabled then
                        colors.border

                     else
                        colors.buttonBg
                    )
                , Attr.style "color"
                    (if isDisabled then
                        colors.secondaryText

                     else
                        colors.buttonText
                    )
                , Attr.style "cursor"
                    (if isDisabled then
                        "not-allowed"

                     else
                        "pointer"
                    )
                ]
                [ text label_ ]
    in
    div [ Attr.class "flex items-center" ]
        [ pageButton 0 "<<" (currentPage == 0)
        , pageButton (max 0 (currentPage - 1)) "<" (currentPage == 0)
        , span [ Attr.class "px-3", Attr.style "color" colors.primaryText ]
            [ text (String.fromInt (currentPage + 1) ++ " / " ++ String.fromInt (max 1 totalPages)) ]
        , pageButton (min (totalPages - 1) (currentPage + 1)) ">" (currentPage >= totalPages - 1)
        , pageButton (totalPages - 1) ">>" (currentPage >= totalPages - 1)
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


viewLogEntry : Logger.LogEntry -> Html FrontendMsg
viewLogEntry entry =
    let
        levelColor =
            case entry.level of
                Logger.Debug ->
                    "#718096"

                Logger.Info ->
                    "#4299e1"

                Logger.Warn ->
                    "#ecc94b"

                Logger.Error ->
                    "#fc8181"

        levelText =
            Logger.levelToString entry.level

        timestamp =
            if entry.timestamp > 0 then
                formatTimestamp entry.timestamp

            else
                "..."
    in
    div [ Attr.class "flex gap-2 py-0.5" ]
        [ span [ Attr.class "text-gray-600 w-12 text-right shrink-0" ]
            [ text (String.fromInt entry.index) ]
        , span [ Attr.class "text-gray-500 w-20 shrink-0" ]
            [ text timestamp ]
        , span
            [ Attr.class "w-14 shrink-0 font-semibold"
            , Attr.style "color" levelColor
            ]
            [ text levelText ]
        , span [ Attr.style "color" "#e2e8f0" ]
            [ text entry.message ]
        ]


{-| Format a Unix timestamp (milliseconds) to HH:MM:SS
-}
formatTimestamp : Int -> String
formatTimestamp millis =
    let
        posix =
            Time.millisToPosix millis

        hours =
            Time.toHour Time.utc posix |> String.fromInt |> String.padLeft 2 '0'

        minutes =
            Time.toMinute Time.utc posix |> String.fromInt |> String.padLeft 2 '0'

        seconds =
            Time.toSecond Time.utc posix |> String.fromInt |> String.padLeft 2 '0'
    in
    hours ++ ":" ++ minutes ++ ":" ++ seconds


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
