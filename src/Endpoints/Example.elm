module Endpoints.Example exposing (calculateSum)

import Http
import Lamdera exposing (SessionId)
import Types exposing (..)


{-| @rpc
-}
calculateSum : SessionId -> BackendModel -> SumRequest -> ( Result String SumResponse, BackendModel, Cmd BackendMsg )
calculateSum sessionId model request =
    let
        sum =
            request.a + request.b

        response =
            { result = sum }
    in
    ( Ok response, model, Cmd.none )


{-| Input type for calculateSum endpoint
-}
type alias SumRequest =
    { a : Int
    , b : Int
    }


{-| Output type for calculateSum endpoint
-}
type alias SumResponse =
    { result : Int
    }
