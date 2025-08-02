module Auth.EmailPasswordAuth exposing (..)

import Auth.Common
import Auth.PasswordHash exposing (HashedPassword, generateHashedPassword, verifyPassword)
import Dict exposing (Dict)
import Lamdera
import Random
import Types exposing (..)


-- TYPES


type alias EmailPasswordCredentials =
    { email : String
    , passwordHash : String
    , passwordSalt : String
    , createdAt : Int
    }


type alias FormModel =
    { email : String
    , password : String
    , confirmPassword : String
    , name : String
    , isSignupMode : Bool
    , error : Maybe String
    }


type FormMsg
    = EmailChanged String
    | PasswordChanged String
    | ConfirmPasswordChanged String
    | NameChanged String
    | ToggleMode
    | Submit


type BackendAuthMsg
    = LoginRequested String String
    | SignupRequested String String (Maybe String)
    | SignupWithHash String String (Maybe String) String String


-- INITIAL VALUES


initFormModel : FormModel
initFormModel =
    { email = ""
    , password = ""
    , confirmPassword = ""
    , name = ""
    , isSignupMode = False
    , error = Nothing
    }


-- FORM UPDATE


updateForm : FormMsg -> FormModel -> FormModel
updateForm msg model =
    case msg of
        EmailChanged email ->
            { model | email = email, error = Nothing }

        PasswordChanged password ->
            { model | password = password, error = Nothing }

        ConfirmPasswordChanged confirmPassword ->
            { model | confirmPassword = confirmPassword, error = Nothing }

        NameChanged name ->
            { model | name = name, error = Nothing }

        ToggleMode ->
            { model | isSignupMode = not model.isSignupMode, error = Nothing }

        Submit ->
            validateAndSubmit model


validateAndSubmit : FormModel -> FormModel
validateAndSubmit model =
    if String.isEmpty (String.trim model.email) || String.isEmpty (String.trim model.password) then
        { model | error = Just "Please fill in all required fields" }
    else if model.isSignupMode && model.password /= model.confirmPassword then
        { model | error = Just "Passwords do not match" }
    else
        model -- Form is valid, submission will be handled by parent


-- BACKEND OPERATIONS


handleLogin : BrowserCookie -> ConnectionId -> String -> String -> Dict String EmailPasswordCredentials -> BackendModel -> ( BackendModel, Cmd BackendMsg )
handleLogin browserCookie connectionId email password credentials model =
    case Dict.get email credentials of
        Just creds ->
            let
                hashedPassword = { hash = creds.passwordHash, salt = creds.passwordSalt }
            in
            if verifyPassword password hashedPassword then
                let
                    userInfo = { email = email, name = Nothing, username = Nothing, picture = Nothing }
                    newSessions = Dict.insert browserCookie userInfo model.sessions
                in
                ( { model | sessions = newSessions }
                , Lamdera.sendToFrontend connectionId (AuthSuccess userInfo)
                )
            else
                ( model
                , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
                )

        Nothing ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "Invalid email or password")))
            )


handleSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> Dict String EmailPasswordCredentials -> BackendModel -> ( BackendModel, Cmd BackendMsg )
handleSignup browserCookie connectionId email password maybeName credentials model =
    case Dict.get email credentials of
        Just _ ->
            ( model
            , Lamdera.sendToFrontend connectionId (AuthToFrontend (Auth.Common.AuthError (Auth.Common.ErrAuthString "User already exists")))
            )

        Nothing ->
            let
                saltGenerator = Random.int 100000000 999999999 |> Random.map String.fromInt
                cmd = Random.generate (\salt -> 
                    EmailPasswordAuthResult (SignupWithHash browserCookie connectionId email password maybeName salt (Auth.PasswordHash.hashPassword salt password).hash)
                ) saltGenerator
            in
            ( model, cmd )


completeSignup : BrowserCookie -> ConnectionId -> String -> String -> Maybe String -> String -> String -> Dict String EmailPasswordCredentials -> BackendModel -> ( BackendModel, Cmd BackendMsg )
completeSignup browserCookie connectionId email password maybeName salt hash credentials model =
    let
        newCredentials =
            { email = email
            , passwordHash = hash
            , passwordSalt = salt  
            , createdAt = 0 -- You might want to add timestamp here
            }
        
        updatedCredentials = Dict.insert email newCredentials credentials
        userInfo = { email = email, name = maybeName, username = Nothing, picture = Nothing }
        newSessions = Dict.insert browserCookie userInfo model.sessions
    in
    ( { model | sessions = newSessions }
    , Lamdera.sendToFrontend connectionId (AuthSuccess userInfo)
    )