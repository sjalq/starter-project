module Program.AdminAccessTests exposing (suite)

{-| Program tests for admin access and permissions.
-}

import Dict
import Effect.Lamdera
import Effect.Test as Test
import Helpers.Simulation as Sim
import Test exposing (Test)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text)


suite : Test
suite =
    Test.describe "Admin Access"
        [ Sim.start "anonymous visitor to /admin is asked to log in"
            [ Test.connectFrontend 0
                (Effect.Lamdera.sessionIdFromString "session-admin-anon")
                "/admin"
                { width = 1920, height = 1080 }
                (\frontend ->
                    [ frontend.checkView 100 (Query.has [ text "Admin Login Required" ])
                    , frontend.checkView 100 (Query.hasNot [ text "Overview" ])
                    ]
                )
            ]
            |> Test.toTest
        , Sim.start "backend seeds the demo SysAdmin in development"
            [ Test.checkBackend 0 <|
                \backend ->
                    if Dict.member "admin@example.com" backend.users && Dict.member "admin@example.com" backend.emailPasswordCredentials then
                        Ok ()

                    else
                        Err "Expected admin@example.com to be seeded"
            ]
            |> Test.toTest
        ]
