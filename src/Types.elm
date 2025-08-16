module Types exposing (AdminPageModel, AdminRoute(..), BackendModel, BackendMsg(..), BrowserCookie, ConnectionId, Email, EmailPasswordAuthMsg(..), EmailPasswordAuthResult(..), EmailPasswordAuthToBackend(..), EmailPasswordCredentials, EmailPasswordFormModel, EmailPasswordFormMsg(..), FrontendModel, FrontendMsg(..), LoginState(..), PollData, PollingStatus(..), PollingToken, Preferences, Role(..), Route(..), ToBackend(..), ToFrontend(..), User, UserFrontend)

import Auth.Common
import Browser exposing (UrlRequest)
import Browser.Navigation exposing (Key)
import Dict exposing (Dict)
import Http
import Lamdera
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
    | AdminLogs
    | AdminFetchModel



-- | AdminFusion


type alias AdminPageModel =
    { logs : List String
    , isAuthenticated : Bool
    , remoteUrl : String
    }


type alias FrontendModel =
    { key : Key
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
    { logs : List String
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
    = NoOpToBackend
    | A00_WebSocketReceive String
      -- Admin
    | Admin_FetchLogs
    | Admin_ClearLogs
    | Admin_FetchRemoteModel String
    | AuthToBackend Auth.Common.ToBackend
    | EmailPasswordAuthToBackend EmailPasswordAuthToBackend
    | GetUserToBackend
    | LoggedOut
    | SetDarkModePreference Bool



--- Fusion
-- | Fusion_PersistPatch Fusion.Patch.Patch
-- | Fusion_Query Fusion.Query


type BackendMsg
    = NoOpBackendMsg
    | Log String
    | GotRemoteModel (Result Http.Error BackendModel)
    | AuthBackendMsg Auth.Common.BackendMsg
    | EmailPasswordAuthResult EmailPasswordAuthResult
    | GotJobTime PollingToken Int
      -- example to show polling mechanism
    | GotCryptoPriceResult PollingToken (Result Http.Error String)
    | StoreTaskResult PollingToken (Result String String)


type ToFrontend
    = NoOpToFrontend
    | A00_WebSocketSend String
      -- Admin page
    | Admin_Logs_ToFrontend (List String)
    | AuthToFrontend Auth.Common.ToFrontend
    | AuthSuccess Auth.Common.UserInfo
    | UserInfoMsg (Maybe Auth.Common.UserInfo)
    | UserDataToFrontend UserFrontend
    | PermissionDenied ToBackend



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
