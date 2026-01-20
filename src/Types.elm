module Types exposing (AdminLogsUrlParams, AdminPageModel, AdminRoute(..), BackendModel, BackendMsg(..), BrowserCookie, ConnectionId, Email, EmailPasswordAuthMsg(..), EmailPasswordAuthResult(..), EmailPasswordAuthToBackend(..), EmailPasswordCredentials, EmailPasswordFormModel, EmailPasswordFormMsg(..), FrontendModel, FrontendMsg(..), LoginState(..), PollData, PollingStatus(..), PollingToken, Preferences, Role(..), Route(..), ToBackend(..), ToFrontend(..), User, UserFrontend)

import Auth.Common
import Browser exposing (UrlRequest)
import Dict exposing (Dict)
import Effect.Browser.Navigation
import Http
import Lamdera
import Logger
import Url exposing (Url)



{- Represents a currently connection to a Lamdera client -}


type alias ConnectionId =
    Lamdera.ClientId



{- Represents the browser cookie Lamdera uses to identify a browser -}


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
    | AdminFetchModel



-- | AdminFusion


type alias AdminLogsUrlParams =
    { page : Int
    , pageSize : Int
    , search : String
    }


type alias AdminPageModel =
    { logs : List Logger.LogEntry
    , isAuthenticated : Bool
    , remoteUrl : String
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

    -- , fusionState : Fusion.Value
    , preferences : Preferences
    , emailPasswordForm : EmailPasswordFormModel
    , profileDropdownOpen : Bool
    , loginModalOpen : Bool
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
    | EmailPasswordLoginRequested String String
    | EmailPasswordSignupRequested String String (Maybe String)


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
    = EmailPasswordSignupWithHash BrowserCookie ConnectionId String String (Maybe String) String String


type FrontendMsg
    = UrlClicked UrlRequest
    | UrlChanged Url
    | UrlRequested UrlRequest
    | NoOpFrontendMsg
    | DirectToBackend ToBackend
      --- Admin
    | Admin_RemoteUrlChanged String
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



--- Fusion
-- | Admin_FusionPatch Fusion.Patch.Patch
-- | Admin_FusionQuery Fusion.Query


type ToBackend
    = A String -- WebSocket message from JS (guaranteed tag 0)
    | Admin_ClearLogs
    | Admin_FetchLogs String -- Search query parameter
    | Admin_FetchRemoteModel String
    | AuthToBackend Auth.Common.ToBackend
    | EmailPasswordAuthToBackend EmailPasswordAuthToBackend
    | GetUserToBackend
    | LoggedOut
    | NoOpToBackend
    | SetDarkModePreference Bool



--- Fusion
-- | Fusion_PersistPatch Fusion.Patch.Patch
-- | Fusion_Query Fusion.Query


type BackendMsg
    = NoOpBackendMsg
    | GotLogTime Logger.Msg
    | GotRemoteModel (Result Http.Error BackendModel)
    | AuthBackendMsg Auth.Common.BackendMsg
    | EmailPasswordAuthResult EmailPasswordAuthResult
    | GotJobTime PollingToken Int
      -- example to show polling mechanism
    | GotCryptoPriceResult PollingToken (Result Http.Error String)
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



-- | Admin_FusionResponse Fusion.Value


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
    = JustArrived
    | NotLogged Bool
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
