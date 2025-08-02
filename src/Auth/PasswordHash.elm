module Auth.PasswordHash exposing (..)

import Crypto.Hash
import Random


type alias HashedPassword =
    { hash : String
    , salt : String
    }


type alias PlainPassword = 
    String


generateSalt : Random.Generator String
generateSalt =
    Random.int 100000000 999999999
        |> Random.map String.fromInt


hashPassword : String -> PlainPassword -> HashedPassword
hashPassword salt password =
    let
        combined = salt ++ password
        hash = Crypto.Hash.sha256 combined
    in
    { hash = hash, salt = salt }


verifyPassword : PlainPassword -> HashedPassword -> Bool
verifyPassword plainPassword hashedPassword =
    let
        combined = hashedPassword.salt ++ plainPassword
        computedHash = Crypto.Hash.sha256 combined
    in
    computedHash == hashedPassword.hash


generateHashedPassword : PlainPassword -> Random.Generator HashedPassword
generateHashedPassword password =
    generateSalt
        |> Random.map (\salt -> hashPassword salt password)