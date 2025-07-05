module Pages.Default exposing (..)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as HE
import Theme
import Types exposing (..)
import Components.Header
import Components.Button


init : FrontendModel -> ( FrontendModel, Cmd FrontendMsg )
init model =
    ( model, Cmd.none )


view : FrontendModel -> Theme.Colors -> Html FrontendMsg
view model colors =
    div [ Attr.style "background-color" colors.primaryBg, Attr.class "min-h-screen" ]
        [ div [ Attr.class "container mx-auto px-4 md:px-6 py-4 md:py-8" ]
            [ Components.Header.pageHeader colors "Welcome to the Starter Project" (Just "This is the default home page.")
            , div [ Attr.class "mt-6 md:mt-8 text-center md:text-left" ]
                [ a 
                    [ Attr.href "/examples"
                    , Attr.class "inline-block w-full sm:w-auto"
                    ]
                    [ Components.Button.primary colors Nothing "View Examples →" ]
                ]
            ]
        ]
