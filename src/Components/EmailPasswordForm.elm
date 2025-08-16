module Components.EmailPasswordForm exposing (..)

import Html exposing (Html, a, button, div, form, h3, input, p, text)
import Html.Attributes as Attr
import Html.Events as Events
import Json.Decode as Decode
import Theme
import Types exposing (..)


type alias Config msg =
    { formModel : EmailPasswordFormModel
    , colors : Theme.Colors
    , onEmailChange : String -> msg
    , onPasswordChange : String -> msg
    , onConfirmPasswordChange : String -> msg
    , onNameChange : String -> msg
    , onToggleMode : msg
    , onSubmit : msg
    }


view : Config msg -> Html msg
view config =
    div
        [ Attr.style "width" "100%"
        ]
        [ h3
            [ Attr.style "text-align" "center"
            , Attr.style "color" config.colors.primaryText
            , Attr.style "margin-bottom" "1rem"
            , Attr.style "margin-top" "0"
            , Attr.style "font-size" "1.25rem"
            , Attr.style "font-weight" "600"
            ]
            [ text
                (if config.formModel.isSignupMode then
                    "Create Account"

                 else
                    "Sign In"
                )
            ]
        , form
            [ Events.preventDefaultOn "submit" (Decode.succeed ( config.onSubmit, True ))
            , Attr.style "display" "flex"
            , Attr.style "flex-direction" "column"
            , Attr.style "gap" "1rem"
            ]
            [ if config.formModel.isSignupMode then
                input
                    ([ Attr.type_ "text"
                     , Attr.placeholder "Full Name (optional)"
                     , Attr.value config.formModel.name
                     , Events.onInput config.onNameChange
                     ]
                        ++ inputStyles config.colors
                    )
                    []

              else
                text ""
            , input
                ([ Attr.type_ "email"
                 , Attr.placeholder "Email"
                 , Attr.value config.formModel.email
                 , Events.onInput config.onEmailChange
                 , Attr.required True
                 ]
                    ++ inputStyles config.colors
                )
                []
            , input
                ([ Attr.type_ "password"
                 , Attr.placeholder "Password"
                 , Attr.value config.formModel.password
                 , Events.onInput config.onPasswordChange
                 , Attr.required True
                 ]
                    ++ inputStyles config.colors
                )
                []
            , if config.formModel.isSignupMode then
                input
                    ([ Attr.type_ "password"
                     , Attr.placeholder "Confirm Password"
                     , Attr.value config.formModel.confirmPassword
                     , Events.onInput config.onConfirmPasswordChange
                     , Attr.required True
                     ]
                        ++ inputStyles config.colors
                    )
                    []

              else
                text ""
            , case config.formModel.error of
                Just errorMsg ->
                    p
                        [ Attr.style "color" config.colors.dangerBg
                        , Attr.style "font-size" "0.875rem"
                        , Attr.style "margin" "0"
                        , Attr.style "text-align" "center"
                        ]
                        [ text errorMsg ]

                Nothing ->
                    text ""
            , button
                [ Attr.type_ "submit"
                , Attr.style "padding" "0.75rem"
                , Attr.style "background-color" "#38a169"
                , Attr.style "color" "#ffffff"
                , Attr.style "border" "none"
                , Attr.style "border-radius" "4px"
                , Attr.style "cursor" "pointer"
                ]
                [ text
                    (if config.formModel.isSignupMode then
                        "Sign Up"

                     else
                        "Login"
                    )
                ]
            ]
        , div
            [ Attr.style "text-align" "center"
            , Attr.style "margin-top" "1rem"
            ]
            [ p
                [ Attr.style "color" config.colors.secondaryText ]
                [ text
                    (if config.formModel.isSignupMode then
                        "Already have an account?"

                     else
                        "Don't have an account?"
                    )
                , text " "
                , button
                    [ Events.onClick config.onToggleMode
                    , Attr.type_ "button"
                    , Attr.style "color" "#38a169"
                    , Attr.style "cursor" "pointer"
                    , Attr.style "text-decoration" "underline"
                    , Attr.style "background" "none"
                    , Attr.style "border" "none"
                    , Attr.style "padding" "0"
                    , Attr.style "font" "inherit"
                    ]
                    [ text
                        (if config.formModel.isSignupMode then
                            "Login"

                         else
                            "Sign Up"
                        )
                    ]
                ]
            ]
        ]


inputStyles : Theme.Colors -> List (Html.Attribute msg)
inputStyles colors =
    [ Attr.style "padding" "0.75rem"
    , Attr.style "border" ("1px solid " ++ colors.border)
    , Attr.style "border-radius" "4px"
    , Attr.style "background-color" colors.primaryBg
    , Attr.style "color" colors.primaryText
    , Attr.style "width" "100%"
    ]


buttonStyles : Theme.Colors -> Html.Attribute msg
buttonStyles colors =
    Attr.class "w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
