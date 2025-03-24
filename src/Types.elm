module Types exposing (..)

import Auth.Common
import Browser exposing (UrlRequest)
import Browser.Navigation exposing (Key)
import Dict exposing (Dict)
import Http
import Lamdera
import Url exposing (Url)
import Fusion.Patch
import Fusion



{- Represents a currently connection to a Lamdera client -}


type alias ConnectionId =
    Lamdera.ClientId



{- Represents the browser cookie Lamdera uses to identify a browser -}


type alias BrowserCookie =
    Lamdera.SessionId


type Route
    = Default
    | Admin AdminRoute
    | FileUpload
    | NotFound


type AdminRoute
    = AdminDefault
    | AdminLogs
    | AdminFetchModel
    | AdminFusion


type alias AdminPageModel =
    { logs : List String
    , isAuthenticated : Bool
    , remoteUrl : String
    }


type alias FileUploadModel =
    { selectedFile : Maybe String
    , uploadStatus : UploadStatus
    }


type UploadStatus
    = NotStarted
    | UploadingInProgress Float  -- Progress percentage
    | FileUploaded String  -- URL of uploaded file
    | FileUploadFailed String


type alias FrontendModel =
    { key : Key
    , currentRoute : Route
    , adminPage : AdminPageModel
    , authFlow : Auth.Common.Flow
    , authRedirectBaseUrl : Url
    , login : LoginState
    , currentUser : Maybe UserFrontend
    , pendingAuth : Bool
    , fusionState : Fusion.Value
    , fileUpload : FileUploadModel
    }


type alias BackendModel =
    { logs : List String
    , pendingAuths : Dict Lamdera.SessionId Auth.Common.PendingAuth
    , sessions : Dict Lamdera.SessionId Auth.Common.UserInfo
    , users : Dict Email User
    , pollingJobs : Dict PollingToken (PollingStatus PollData)
    }


type FrontendMsg
    = UrlClicked UrlRequest
    | UrlChanged Url
    | UrlRequested UrlRequest
    | NoOpFrontendMsg
    | DirectToBackend ToBackend
    --- Admin
    | Admin_RemoteUrlChanged String
    | GoogleSigninRequested
    | Auth0SigninRequested
    | Logout
    --- Fusion
    | Admin_FusionPatch Fusion.Patch.Patch
    | Admin_FusionQuery Fusion.Query
    --- File Upload
    | FileSelected String
    | UploadRequested
    | UploadProgress Float
    | UploadComplete String
    | UploadFailed String


type ToBackend
    = NoOpToBackend
    | Admin_FetchLogs
    | Admin_ClearLogs
    | Admin_FetchRemoteModel String
    | AuthToBackend Auth.Common.ToBackend
    | GetUserToBackend
    | LoggedOut
    --- Fusion
    | Fusion_PersistPatch Fusion.Patch.Patch
    | Fusion_Query Fusion.Query
    --- File Upload
    | InitiateUpload String
    | UploadChunk String Int String  -- filename, chunk number, base64 data


type BackendMsg
    = NoOpBackendMsg
    | Log String
    | GotRemoteModel (Result Http.Error BackendModel)
    | AuthBackendMsg Auth.Common.BackendMsg
    | GotJobTime PollingToken Int
      -- example to show polling mechanism
    | GotCryptoPriceResult PollingToken (Result Http.Error String)
    | StoreTaskResult PollingToken (Result String String)


type ToFrontend
    = NoOpToFrontend
    | Admin_Logs_ToFrontend (List String)
    | AuthToFrontend Auth.Common.ToFrontend
    | AuthSuccess Auth.Common.UserInfo
    | UserInfoMsg (Maybe Auth.Common.UserInfo)
    | UserDataToFrontend UserFrontend
    | Admin_FusionResponse Fusion.Value
    --- File Upload
    | FileUploadInitiated String  -- Upload URL
    | FileUploadProgress Float
    | FileUploadComplete String
    | FileUploadError String


type alias Email =
    String


type alias User =
    { email : Email
    }


type alias UserFrontend =
    { email : Email
    , isSysAdmin : Bool
    , role : String
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
