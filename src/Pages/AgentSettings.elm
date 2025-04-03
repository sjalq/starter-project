module Pages.AgentSettings exposing (Model, init, view, defaultEndpoint)

import Browser.Dom
import Dict exposing (Dict)
import Html exposing (Html, button, div, h1, h2, input, label, li, p, select, span, text, ul)
import Html.Attributes as Attr exposing (class, disabled, placeholder, selected, type_, value)
import Html.Events exposing (onClick, onInput)
import Maybe.Extra
import Set exposing (Set)
import Task
import Time
import Types exposing (AgentConfigId, AgentConfigView, AgentProvider(..), AgentSettingsPageModel, FrontendMsg(..))


type alias Model =
    { agentConfigs : Dict AgentConfigId AgentConfigView
    , pageModel : AgentSettingsPageModel
    , apiKeyInput : String
    }


init : Dict AgentConfigId AgentConfigView -> AgentSettingsPageModel -> Model
init agentConfigs pageModel =
    { agentConfigs = agentConfigs
    , pageModel = pageModel
    , apiKeyInput = ""
    }


findConfig : Model -> Maybe AgentConfigId -> Maybe AgentConfigView
findConfig model maybeId =
    case maybeId of
        Nothing ->
            Just
                { id = "new-agent"
                , name = ""
                , provider = OpenAI
                , endpoint = defaultEndpoint OpenAI
                }

        Just id ->
            Dict.get id model.agentConfigs


-- View now produces Html FrontendMsg
view : Model -> Html FrontendMsg
view model =
    div [ Attr.class "container mx-auto px-4 py-8" ]
        [ h1 [ Attr.class "text-3xl font-bold mb-4" ] [ text "AI Agent Settings" ]
        , div [ Attr.class "space-y-6" ]
            [ viewAgentList model
            , viewEditForm model
            ]
        ]


viewAgentList : Model -> Html FrontendMsg
viewAgentList model =
    div [ Attr.class "p-4 bg-white rounded-lg shadow" ]
        [ div [ Attr.class "flex justify-between items-center mb-4" ]
            [ h2 [ Attr.class "text-xl font-bold" ] [ text "Configured Agents" ]
            , button [ onClick (AgentSettings_EditConfig Nothing), Attr.class "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" ] [ text "Add New Agent" ]
            ]
        , if Dict.isEmpty model.agentConfigs then
            p [ Attr.class "text-gray-500" ] [ text "No agents configured yet." ]
          else
            ul [ Attr.class "space-y-3" ] (List.map viewAgentListItem (Dict.values model.agentConfigs))
        ]


viewAgentListItem : AgentConfigView -> Html FrontendMsg
viewAgentListItem config =
    li [ Attr.class "p-3 border border-gray-200 rounded-md flex items-center justify-between" ]
        [ span [ Attr.class "text-gray-700 text-sm" ] [ text (config.name ++ " (" ++ providerToString config.provider ++ ") - " ++ config.endpoint) ]
        , div [ Attr.class "flex space-x-2" ]
            [ button [ onClick (AgentSettings_EditConfig (Just config.id)), Attr.class "bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs" ] [ text "Edit" ]
            , button [ onClick (AgentSettings_DeleteConfig config.id), Attr.class "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" ] [ text "Delete" ]
            ]
        ]


viewEditForm : Model -> Html FrontendMsg
viewEditForm model =
    case model.pageModel.editingConfig of
        Nothing ->
            Html.text ""

        Just config ->
            div [ Attr.class "p-4 bg-white rounded-lg shadow space-y-4" ]
                [ h2 [ Attr.class "text-xl font-bold mb-4" ] [ text (if config.id == "new-agent" then "Add New Agent" else "Edit Agent: " ++ config.name) ]
                , viewFormInput "Configuration Name" (Just config.name) model.apiKeyInput "text" "" AgentSettings_UpdateName
                , viewFormSelect "Provider" config.provider (List.map (\p -> ( providerToString p, p )) allProviders) AgentSettings_UpdateProvider
                , viewFormInput "API Endpoint URL" (Just config.endpoint) model.apiKeyInput "text" "" AgentSettings_UpdateEndpoint
                , viewFormInput "API Key" Nothing model.apiKeyInput "password" "Will not be shown again" AgentSettings_UpdateApiKey
                , div [ Attr.class "flex space-x-3 pt-2" ]
                    [ button
                        [ onClick (AgentSettings_SaveConfig model.apiKeyInput)
                        , classList
                            [ ( "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", not (isSaveDisabled config model.apiKeyInput) )
                            , ( "bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed", isSaveDisabled config model.apiKeyInput )
                            ]
                        , disabled (isSaveDisabled config model.apiKeyInput)
                        ]
                        [ text "Save Configuration" ]
                    , button [ onClick AgentSettings_CancelEdit, Attr.class "bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" ] [ text "Cancel" ]
                    ]
                , Maybe.map (\err -> p [ Attr.class "text-sm text-red-600 mt-1" ] [ text err ]) model.pageModel.error |> Maybe.withDefault (text "")
                ]


-- Helper produces Html FrontendMsg
viewFormInput : String -> Maybe String -> String -> String -> String -> (String -> FrontendMsg) -> Html FrontendMsg
viewFormInput labelText maybeValue apiKeyInputValue inputType placeholderText msgConstructor =
    div [ Attr.class "mb-4" ]
        [ label [ Attr.class "block text-gray-700 text-sm font-bold mb-2" ] [ text labelText ]
        , input
            [ Attr.type_ inputType
            , Attr.placeholder placeholderText
            , Attr.value
                (case maybeValue of
                    Nothing -> apiKeyInputValue
                    Just val -> val
                )
            , onInput msgConstructor -- Expects String -> FrontendMsg
            , Attr.class "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ]
            []
        ]

-- Helper produces Html FrontendMsg
viewFormSelect : String -> AgentProvider -> List (String, AgentProvider) -> (AgentProvider -> FrontendMsg) -> Html FrontendMsg
viewFormSelect labelText selectedValue options msgConstructor =
    div [ Attr.class "mb-4" ]
        [ label [ Attr.class "block text-gray-700 text-sm font-bold mb-2" ] [ text labelText ]
        , select
            [ onInput (stringToProvider >> msgConstructor)
            , Attr.class "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            ]
            (List.map (providerOptionHtml selectedValue) options)
        ]


-- Helper uses generic msg type variable, but context implies FrontendMsg
classList : List ( String, Bool ) -> Html.Attribute FrontendMsg
classList classes =
    Attr.class (String.join " " (List.filterMap (\( cls, condition ) -> if condition then Just cls else Nothing) classes))


-- Helper uses generic msg type variable, but context implies FrontendMsg
providerOptionHtml : AgentProvider -> (String, AgentProvider) -> Html FrontendMsg
providerOptionHtml currentSelection (optionText, providerValue) =
    Html.option
        [ value optionText
        , selected (providerValue == currentSelection)
        ]
        [ text optionText ]


allProviders : List AgentProvider
allProviders =
    [ OpenAI, Anthropic, GoogleGemini, OtherProvider "Custom" ]


providerToString : AgentProvider -> String
providerToString provider =
    case provider of
        OpenAI -> "OpenAI"
        Anthropic -> "Anthropic"
        GoogleGemini -> "Google Gemini"
        OtherProvider name -> name


stringToProvider : String -> AgentProvider
stringToProvider str =
    case str of
        "OpenAI" -> OpenAI
        "Anthropic" -> Anthropic
        "Google Gemini" -> GoogleGemini
        name -> OtherProvider name


defaultEndpoint : AgentProvider -> String
defaultEndpoint provider =
    case provider of
        OpenAI -> "https://api.openai.com/v1/chat/completions"
        Anthropic -> "https://api.anthropic.com/v1/messages"
        GoogleGemini -> "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
        OtherProvider _ -> ""


isSaveDisabled : AgentConfigView -> String -> Bool
isSaveDisabled config apiKeyInput =
    let
        isNewConfig =
            config.id == "new-agent"
        apiKeyCheck =
            if isNewConfig then
                String.isEmpty apiKeyInput
            else
                False
    in
    String.isEmpty config.name
        || String.isEmpty config.endpoint
        || apiKeyCheck

