module Auth.PasswordHash exposing (HashedPassword, PlainPassword, hashPassword, verifyPassword)

import Crypto.Hash


type alias HashedPassword =
    { hash : String
    , salt : String
    }


type alias PlainPassword =
    String


hashPassword : String -> PlainPassword -> HashedPassword
hashPassword salt password =
    let
        combined =
            salt ++ password

        hash =
            Crypto.Hash.sha256 combined
    in
    { hash = hash, salt = salt }


verifyPassword : PlainPassword -> HashedPassword -> Bool
verifyPassword plainPassword hashedPassword =
    let
        combined =
            hashedPassword.salt ++ plainPassword

        computedHash =
            Crypto.Hash.sha256 combined
    in
    computedHash == hashedPassword.hash
