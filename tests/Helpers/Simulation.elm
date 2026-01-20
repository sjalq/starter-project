module Helpers.Simulation exposing
    ( config
    , defaultDomain
    , start
    , testUrl
    )

{-| Helpers for program testing with lamdera/program-test.

This module provides utilities for setting up simulated Lamdera applications
for integration testing.

-}

import Backend
import Effect.Subscription as Subscription
import Effect.Test as Test
import Frontend
import Time
import Types exposing (..)
import Url exposing (Url)


{-| The default domain URL for tests.
-}
defaultDomain : Url
defaultDomain =
    { protocol = Url.Http
    , host = "localhost"
    , port_ = Just 8000
    , path = "/"
    , query = Nothing
    , fragment = Nothing
    }


{-| Create a test path (just the path portion, not full URL).
-}
testUrl : String -> String
testUrl path =
    path


{-| Frontend app configuration for testing.
-}
frontendApp : Test.FrontendApp ToBackend FrontendMsg FrontendModel ToFrontend
frontendApp =
    { init = Frontend.initWithAuth
    , onUrlRequest = UrlClicked
    , onUrlChange = UrlChanged
    , update = Frontend.update
    , updateFromBackend = Frontend.updateFromBackend
    , subscriptions = \_ -> Subscription.none
    , view = Frontend.view
    }


{-| Backend app configuration for testing.
-}
backendApp : Test.BackendApp ToBackend ToFrontend BackendMsg BackendModel
backendApp =
    { init = Backend.init
    , update = Backend.update
    , updateFromFrontend = Backend.updateFromFrontendCheckingRights
    , subscriptions = Backend.subscriptions
    }


{-| The test configuration for the app.
-}
config : Test.Config ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel
config =
    { frontendApp = frontendApp
    , backendApp = backendApp
    , handleHttpRequest = \_ -> Test.NetworkErrorResponse
    , handlePortToJs = \_ -> Nothing
    , handleFileUpload = \_ -> Test.UnhandledFileUpload
    , handleMultipleFilesUpload = \_ -> Test.UnhandledMultiFileUpload
    , domain = defaultDomain
    }


{-| Start a test with the given name and actions.
-}
start :
    String
    -> List (Test.Action ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel)
    -> Test.EndToEndTest ToBackend FrontendMsg FrontendModel ToFrontend BackendMsg BackendModel
start testName actions =
    Test.start testName (Time.millisToPosix 0) config actions
