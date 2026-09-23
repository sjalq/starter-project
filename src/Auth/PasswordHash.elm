module Auth.PasswordHash exposing (HashedPassword, PlainPassword, hashPassword, verifyPassword)

{-| Salted SHA-256 password hashing.

This is deliberately simple so the starter runs without native code. A single
SHA-256 round is fast to brute force, so replace it with a slow, memory-hard
KDF (Argon2, scrypt or bcrypt, e.g. behind an HTTP service) before storing
real users' passwords.

-}

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
