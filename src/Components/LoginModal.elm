module Components.LoginModal exposing (..)

import Components.EmailPasswordForm
import Html exposing (Html, button, div, h2, hr, img, p, text)
import Html.Attributes as Attr
import Html.Events exposing (onClick, stopPropagationOn)
import Json.Decode as Decode
import Theme
import Types exposing (..)


type alias Config msg =
    { isOpen : Bool
    , colors : Theme.Colors
    , emailPasswordForm : EmailPasswordFormModel
    , onClose : msg
    , onAuth0Login : msg
    , onEmailPasswordMsg : EmailPasswordAuthMsg -> msg
    , onNoOp : msg
    , isAuthenticating : Bool
    }


view : Config msg -> Html msg
view config =
    if config.isOpen then
        div
            [ Attr.class "fixed inset-0 z-50 flex items-center justify-center"
            , Attr.style "background-color" "rgba(0, 0, 0, 0.5)"
            , onClick config.onClose
            ]
            [ div
                [ Attr.class "relative max-w-md w-full mx-4"
                , Attr.style "background-color" config.colors.primaryBg
                , Attr.style "border-radius" "12px"
                , Attr.style "border" ("1px solid " ++ config.colors.border)
                , Attr.style "box-shadow" "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                , Attr.style "max-height" "90vh"
                , Attr.style "overflow-y" "auto"
                , stopPropagationOn "click" (Decode.succeed ( config.onNoOp, True )) -- Prevent modal close when clicking inside
                ]
                [ -- Modal Header
                  div
                    [ Attr.class "p-6 pb-4" ]
                    [ div
                        [ Attr.class "flex items-center justify-between" ]
                        [ h2
                            [ Attr.class "text-xl font-semibold"
                            , Attr.style "color" config.colors.primaryText
                            ]
                            [ text "Sign In" ]
                        , button
                            [ onClick config.onClose
                            , Attr.class "text-gray-400 hover:text-gray-600 transition-colors"
                            , Attr.style "font-size" "24px"
                            , Attr.style "line-height" "1"
                            , Attr.style "background" "none"
                            , Attr.style "border" "none"
                            , Attr.style "cursor" "pointer"
                            ]
                            [ text "×" ]
                        ]
                    ]
                , -- Email/Password Form
                  div
                    [ Attr.class "px-6 pb-4" ]
                    [ Components.EmailPasswordForm.view
                        { formModel = config.emailPasswordForm
                        , colors = config.colors
                        , onEmailChange = EmailPasswordFormEmailChanged >> EmailPasswordFormMsg >> config.onEmailPasswordMsg
                        , onPasswordChange = EmailPasswordFormPasswordChanged >> EmailPasswordFormMsg >> config.onEmailPasswordMsg
                        , onConfirmPasswordChange = EmailPasswordFormConfirmPasswordChanged >> EmailPasswordFormMsg >> config.onEmailPasswordMsg
                        , onNameChange = EmailPasswordFormNameChanged >> EmailPasswordFormMsg >> config.onEmailPasswordMsg
                        , onToggleMode = EmailPasswordFormToggleMode |> EmailPasswordFormMsg |> config.onEmailPasswordMsg
                        , onSubmit = EmailPasswordFormSubmit |> EmailPasswordFormMsg |> config.onEmailPasswordMsg
                        }
                    ]
                , -- Divider
                  div
                    [ Attr.class "px-6 py-4" ]
                    [ div
                        [ Attr.class "relative" ]
                        [ hr
                            [ Attr.style "border-color" config.colors.border ]
                            []
                        , div
                            [ Attr.class "absolute inset-0 flex justify-center"
                            , Attr.style "top" "-10px"
                            ]
                            [ div
                                [ Attr.class "px-3 text-sm"
                                , Attr.style "background-color" config.colors.primaryBg
                                , Attr.style "color" config.colors.secondaryText
                                ]
                                [ text "or" ]
                            ]
                        ]
                    ]
                , -- OAuth Options
                  div
                    [ Attr.class "px-6 pb-6" ]
                    [ p
                        [ Attr.class "text-sm mb-4"
                        , Attr.style "color" config.colors.secondaryText
                        ]
                        [ text "Sign in with your social account" ]
                    , div
                        [ Attr.class "space-y-3" ]
                        [ oauthButtonWithIcon config "Continue with Google" config.onAuth0Login config.colors.secondaryBg "/public/google-logo.svg"
                        ]
                    ]
                ]
            ]

    else
        text ""


oauthButton : Config msg -> String -> msg -> String -> Html msg
oauthButton config label onClickMsg backgroundColor =
    let
        buttonText =
            if config.isAuthenticating then
                "Authenticating..."

            else
                label

        opacity =
            if config.isAuthenticating then
                "0.7"

            else
                "1"

        cursor =
            if config.isAuthenticating then
                "not-allowed"

            else
                "pointer"
    in
    button
        [ onClick
            (if config.isAuthenticating then
                config.onNoOp

             else
                onClickMsg
            )
        , Attr.class "w-full flex items-center justify-center px-4 py-3 rounded-lg transition-all font-medium"
        , Attr.style "background-color" backgroundColor
        , Attr.style "color" "#ffffff"
        , Attr.style "border" "none"
        , Attr.style "cursor" cursor
        , Attr.style "opacity" opacity
        , Attr.style "hover:opacity" "0.9"
        , Attr.disabled config.isAuthenticating
        ]
        [ text buttonText ]


oauthButtonWithIcon : Config msg -> String -> msg -> String -> String -> Html msg
oauthButtonWithIcon config label onClickMsg backgroundColor iconSrc =
    let
        buttonText =
            if config.isAuthenticating then
                "Authenticating..."

            else
                label

        opacity =
            if config.isAuthenticating then
                "0.7"

            else
                "1"

        cursor =
            if config.isAuthenticating then
                "not-allowed"

            else
                "pointer"

        -- Use primary text color for better contrast with secondaryBg
        textColor =
            config.colors.primaryText

        borderStyle =
            "1px solid " ++ config.colors.border
    in
    button
        [ onClick
            (if config.isAuthenticating then
                config.onNoOp

             else
                onClickMsg
            )
        , Attr.class "w-full flex items-center justify-center px-4 py-3 rounded-lg transition-all font-medium"
        , Attr.style "background-color" backgroundColor
        , Attr.style "color" textColor
        , Attr.style "border" borderStyle
        , Attr.style "cursor" cursor
        , Attr.style "opacity" opacity
        , Attr.style "hover:opacity" "0.95"
        , Attr.disabled config.isAuthenticating
        ]
        [ div
            [ Attr.class "flex items-center justify-center space-x-2" ]
            [ if not config.isAuthenticating then
                img
                    [ Attr.src iconSrc
                    , Attr.style "width" "18px"
                    , Attr.style "height" "18px"
                    , Attr.alt "Google logo"
                    ]
                    []

              else
                text ""
            , text buttonText
            ]
        ]
