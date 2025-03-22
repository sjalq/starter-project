module Pages.Default exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Types exposing (..)


init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( model, Cmd.none )


view : FrontendModel -> Html FrontendMsg
view model =
    div [ Attr.class "bg-gray-100 min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 py-8" ]
            [ h1 [ Attr.class "text-3xl font-bold mb-4" ]
                [ text "Default Page" ]
            ]
        ]
