module Components.EmailPasswordAuth exposing (..)

import Components.EmailPasswordForm
import Html exposing (Html)
import Theme
import Types exposing (..)


type alias Model =
    EmailPasswordFormModel


type alias Config msg =
    { model : Model
    , colors : Theme.Colors
    , onAuthMsg : EmailPasswordAuthMsg -> msg
    , show : Bool
    }


init : Model
init =
    { email = ""
    , password = ""
    , confirmPassword = ""
    , name = ""
    , isSignupMode = False
    , error = Nothing
    }


update : EmailPasswordAuthMsg -> Model -> ( Model, Cmd EmailPasswordAuthToBackend )
update msg model =
    case msg of
        EmailPasswordFormMsg formMsg ->
            ( updateForm formMsg model, Cmd.none )

        EmailPasswordLoginRequested email password ->
            ( model, Cmd.none )

        -- This will be handled by parent
        EmailPasswordSignupRequested email password maybeName ->
            ( model, Cmd.none )



-- This will be handled by parent


updateForm : EmailPasswordFormMsg -> Model -> Model
updateForm msg model =
    case msg of
        EmailPasswordFormEmailChanged email ->
            { model | email = email, error = Nothing }

        EmailPasswordFormPasswordChanged password ->
            { model | password = password, error = Nothing }

        EmailPasswordFormConfirmPasswordChanged confirmPassword ->
            { model | confirmPassword = confirmPassword, error = Nothing }

        EmailPasswordFormNameChanged name ->
            { model | name = name, error = Nothing }

        EmailPasswordFormToggleMode ->
            { model | isSignupMode = not model.isSignupMode, error = Nothing }

        EmailPasswordFormSubmit ->
            validateAndGetSubmitModel model


validateAndGetSubmitModel : Model -> Model
validateAndGetSubmitModel model =
    if String.isEmpty (String.trim model.email) || String.isEmpty (String.trim model.password) then
        { model | error = Just "Please fill in all required fields" }

    else if model.isSignupMode && model.password /= model.confirmPassword then
        { model | error = Just "Passwords do not match" }

    else
        model



-- Valid, parent will handle submission


view : Config msg -> Html msg
view config =
    if config.show then
        Components.EmailPasswordForm.view
            { formModel = config.model
            , colors = config.colors
            , onEmailChange = EmailPasswordFormEmailChanged >> EmailPasswordFormMsg >> config.onAuthMsg
            , onPasswordChange = EmailPasswordFormPasswordChanged >> EmailPasswordFormMsg >> config.onAuthMsg
            , onConfirmPasswordChange = EmailPasswordFormConfirmPasswordChanged >> EmailPasswordFormMsg >> config.onAuthMsg
            , onNameChange = EmailPasswordFormNameChanged >> EmailPasswordFormMsg >> config.onAuthMsg
            , onToggleMode = EmailPasswordFormToggleMode |> EmailPasswordFormMsg |> config.onAuthMsg
            , onSubmit = EmailPasswordFormSubmit |> EmailPasswordFormMsg |> config.onAuthMsg
            }

    else
        Html.text ""
