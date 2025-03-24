module Pages.FileUpload exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onClick, targetValue)
import Json.Decode
import Types exposing (..)

init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( { model | fileUpload = { selectedFile = Nothing, uploadStatus = NotStarted } }
    , Cmd.none
    )

view : FrontendModel -> Html FrontendMsg
view model =
    div [ Attr.class "bg-gray-100 min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 py-8" ]
            [ h1 [ Attr.class "text-3xl font-bold mb-4" ]
                [ text "File Upload" ]
            , div [ Attr.class "bg-white rounded-lg shadow p-6" ]
                [ viewUploadForm model.fileUpload
                ]
            ]
        ]

viewUploadForm : FileUploadModel -> Html FrontendMsg
viewUploadForm model =
    div []
        [ div [ Attr.class "mb-4" ]
            [ label [ Attr.class "block text-gray-700 text-sm font-bold mb-2" ]
                [ text "Select File" ]
            , div [ Attr.class "flex items-center" ]
                [ input
                    [ Attr.type_ "file"
                    , Attr.class "hidden"
                    , Attr.id "file-input"
                    , Html.Events.on "change" (Json.Decode.map FileSelected targetValue)
                    ]
                    []
                , label
                    [ Attr.for "file-input"
                    , Attr.class "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    ]
                    [ text "Choose File" ]
                , div [ Attr.class "ml-3 text-gray-600" ]
                    [ text <| Maybe.withDefault "No file selected" model.selectedFile ]
                ]
            ]
        , viewUploadStatus model.uploadStatus
        , button
            [ onClick UploadRequested
            , Attr.class "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            , Attr.disabled (model.selectedFile == Nothing)
            ]
            [ text "Upload" ]
        ]

viewUploadStatus : UploadStatus -> Html FrontendMsg
viewUploadStatus status =
    case status of
        NotStarted ->
            text ""

        UploadingInProgress progress ->
            div [ Attr.class "mb-4" ]
                [ div [ Attr.class "w-full bg-gray-200 rounded-full h-2.5" ]
                    [ div
                        [ Attr.class "bg-blue-600 h-2.5 rounded-full"
                        , Attr.style "width" (String.fromFloat progress ++ "%")
                        ]
                        []
                    ]
                , div [ Attr.class "text-sm text-gray-600 mt-1" ]
                    [ text (String.fromFloat progress ++ "% uploaded") ]
                ]

        FileUploaded url ->
            div [ Attr.class "mb-4 text-green-600" ]
                [ text "Upload complete! "
                , a [ Attr.href url, Attr.class "underline" ]
                    [ text "View file" ]
                ]

        FileUploadFailed error ->
            div [ Attr.class "mb-4 text-red-600" ]
                [ text ("Upload failed: " ++ error) ] 