module Types exposing (AdminLogsUrlParams, AdminPageModel, AdminRoute(..), BackendModel, BackendMsg(..), BrowserCookie, ConnectionId, Email, EmailPasswordAuthMsg(..), EmailPasswordAuthResult(..), EmailPasswordAuthToBackend(..), EmailPasswordCredentials, EmailPasswordFormModel, EmailPasswordFormMsg(..), FrontendModel, FrontendMsg(..), LoginState(..), PollData, PollingStatus(..), PollingToken, Preferences, Role(..), Route(..), ToBackend(..), ToFrontend(..), User, UserFrontend, defaultPreferences)

import Auth.Common
import Browser exposing (UrlRequest)
import Dict exposing (Dict)
import Effect.Browser.Navigation
import Lamdera
import Logger
import Url exposing (Url)


{-| A single browser tab connected to the Lamdera backend
-}
type alias ConnectionId =
    Lamdera.ClientId


{-| The session cookie Lamdera uses to identify a browser
-}
type alias BrowserCookie =
    Lamdera.SessionId


type Route
    = Default
    | Admin AdminRoute
    | Examples
    | NotFound


type AdminRoute
    = AdminDefault
    | AdminLogs AdminLogsUrlParams


type alias AdminLogsUrlParams =
    { page : Int
    , pageSize : Int
    , search : String
    }


type alias AdminPageModel =
    { logs : List Logger.LogEntry
    }


type alias FrontendModel =
    { key : Effect.Browser.Navigation.Key
    , currentRoute : Route
    , adminPage : AdminPageModel
    , authFlow : Auth.Common.Flow
    , authRedirectBaseUrl : Url
    , login : LoginState
    , currentUser : Maybe UserFrontend
    , pendingAuth : Bool
    , preferences : Preferences
    , emailPasswordForm : EmailPasswordFormModel
    , profileDropdownOpen : Bool
    , loginModalOpen : Bool
    , portFeedback : Maybe String
    }


type alias EmailPasswordFormModel =
    { email : String
    , password : String
    , confirmPassword : String
    , name : String
    , isSignupMode : Bool
    , error : Maybe String
    }


type alias BackendModel =
    { logState : Logger.LogState
    , pendingAuths : Dict Lamdera.SessionId Auth.Common.PendingAuth
    , sessions : Dict Lamdera.SessionId Auth.Common.UserInfo
    , users : Dict Email User
    , emailPasswordCredentials : Dict Email EmailPasswordCredentials
    , pollingJobs : Dict PollingToken (PollingStatus PollData)
    }


type alias EmailPasswordCredentials =
    { email : String
    , passwordHash : String
    , passwordSalt : String
    , createdAt : Int
    }


type EmailPasswordAuthMsg
    = EmailPasswordFormMsg EmailPasswordFormMsg


type EmailPasswordFormMsg
    = EmailPasswordFormEmailChanged String
    | EmailPasswordFormPasswordChanged String
    | EmailPasswordFormConfirmPasswordChanged String
    | EmailPasswordFormNameChanged String
    | EmailPasswordFormToggleMode
    | EmailPasswordFormSubmit


type EmailPasswordAuthToBackend
    = EmailPasswordLoginToBackend String String
    | EmailPasswordSignupToBackend String String (Maybe String)


type EmailPasswordAuthResult
    = EmailPasswordSignupWithHash BrowserCookie ConnectionId Email (Maybe String) String String


type FrontendMsg
    = UrlClicked UrlRequest
    | UrlChanged Url
    | NoOpFrontendMsg
    | DirectToBackend ToBackend
    | Admin_LogsNavigate AdminLogsUrlParams
    | Auth0SigninRequested
    | EmailPasswordAuthMsg EmailPasswordAuthMsg
    | Logout
    | ToggleDarkMode
    | ToggleProfileDropdown
    | ToggleLoginModal
    | CloseLoginModal
    | EmailPasswordAuthError String
    | ConsoleLogClicked
    | ConsoleLogReceived String
    | CopyToClipboard String
    | ClipboardResult (Result String String)


type ToBackend
    = A String -- WebSocket message from JS (guaranteed tag 0)
    | Admin_ClearLogs
    | Admin_FetchLogs String -- Search query parameter
    | AuthToBackend Auth.Common.ToBackend
    | EmailPasswordAuthToBackend EmailPasswordAuthToBackend
    | GetUserToBackend
    | LoggedOut
    | NoOpToBackend
    | SetDarkModePreference Bool


type BackendMsg
    = NoOpBackendMsg
    | GotLogTime Logger.Msg
    | AuthBackendMsg Auth.Common.BackendMsg
    | EmailPasswordAuthResult EmailPasswordAuthResult
    | GotJobTime PollingToken Int
    | StoreTaskResult PollingToken (Result String String)


type ToFrontend
    = A0 String -- WebSocket message to JS (guaranteed tag 0, '0' < 'A' so A0 < Admin...)
    | Admin_Logs_ToFrontend (List Logger.LogEntry)
    | AuthSuccess Auth.Common.UserInfo
    | AuthToFrontend Auth.Common.ToFrontend
    | NoOpToFrontend
    | PermissionDenied ToBackend
    | UserDataToFrontend UserFrontend
    | UserInfoMsg (Maybe Auth.Common.UserInfo)


type alias Email =
    String


type alias User =
    { email : Email
    , name : Maybe String
    , preferences : Preferences
    }


type alias UserFrontend =
    { email : Email
    , isSysAdmin : Bool
    , role : String
    , preferences : Preferences
    }


type LoginState
    = NotLogged Bool
    | LoginTokenSent
    | LoggedIn Auth.Common.UserInfo



-- Role types


type Role
    = SysAdmin
    | UserRole
    | Anonymous



-- Polling types


type alias PollingToken =
    String


type PollingStatus a
    = Busy
    | BusyWithTime Int
    | Ready (Result String a)


type alias PollData =
    String



-- USER RELATED TYPES


type alias Preferences =
    { darkMode : Bool
    }


defaultPreferences : Preferences
defaultPreferences =
    { darkMode = True
    }
