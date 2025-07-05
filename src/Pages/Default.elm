module Pages.Default exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as HE
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
                [ text "Welcome to the Starter Project" ]
            , p [ Attr.class "mb-4", Attr.style "color" colors.primaryText ]
                [ text "This is the default home page." ]
            , div [ Attr.class "mt-8" ]
                [ a 
                    [ Attr.href "/examples"
                    , Attr.class "inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    ]
                    [ text "View Examples →" ]
                ]
            ]
        ]
