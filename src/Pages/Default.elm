module Pages.Default exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Theme
import Types exposing (..)


init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( model, Cmd.none )


view : FrontendModel -> Theme.Colors -> Html FrontendMsg
view model colors =
    div [ Attr.style "background-color" colors.primaryBg, Attr.class "min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 py-8" ]
            [ h1 [ Attr.class "text-3xl font-bold mb-4", Attr.style "color" colors.primaryText ]
                [ text "Default Page" ]
            ]
        ]
