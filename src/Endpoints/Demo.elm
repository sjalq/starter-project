module Endpoints.Demo exposing (..)

{-| Demo endpoints showing the automatic RPC generation

Just add @rpc annotation and boom - instant RPC endpoint!
-}

import Lamdera exposing (SessionId)
import Types exposing (..)


{-| @rpc
Greets a user by name
-}
greetUser : SessionId -> BackendModel -> String -> ( Result String String, BackendModel, Cmd BackendMsg )
greetUser sessionId model userName =
    ( Ok ("Hello, " ++ userName ++ "!")
    , model
    , Cmd.none
    )


{-| @rpc
Multiplies two numbers
-}
multiply : SessionId -> BackendModel -> Int -> Int -> ( Result String Int, BackendModel, Cmd BackendMsg )
multiply sessionId model a b =
    ( Ok (a * b)
    , model
    , Cmd.none
    )
