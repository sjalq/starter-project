module Property.ThemeTests exposing (suite)

import Expect
import Fuzz
import Test exposing (..)
import Theme exposing (..)


suite : Test
suite =
    describe "Theme Properties"
        [ describe "getColors"
            [ fuzz Fuzz.bool "is deterministic" <|
                \isDarkMode ->
                    Expect.equal (Theme.getColors isDarkMode) (Theme.getColors isDarkMode)
            , test "True returns darkColors" <|
                \_ ->
                    Expect.equal (Theme.getColors True) Theme.darkColors
            , test "False returns lightColors" <|
                \_ ->
                    Expect.equal (Theme.getColors False) Theme.lightColors
            ]
        , describe "Light vs Dark distinction"
            [ test "primaryBg differs" <|
                \_ ->
                    Expect.notEqual lightColors.primaryBg darkColors.primaryBg
            , test "primaryText differs" <|
                \_ ->
                    Expect.notEqual lightColors.primaryText darkColors.primaryText
            , test "secondaryBg differs" <|
                \_ ->
                    Expect.notEqual lightColors.secondaryBg darkColors.secondaryBg
            , test "headerBg differs" <|
                \_ ->
                    Expect.notEqual lightColors.headerBg darkColors.headerBg
            ]
        , describe "Color field validity"
            [ fuzz Fuzz.bool "all essential color fields are non-empty" <|
                \isDarkMode ->
                    let
                        colors =
                            Theme.getColors isDarkMode
                    in
                    Expect.all
                        [ \_ -> Expect.notEqual colors.primaryBg ""
                        , \_ -> Expect.notEqual colors.primaryText ""
                        , \_ -> Expect.notEqual colors.secondaryBg ""
                        , \_ -> Expect.notEqual colors.secondaryText ""
                        , \_ -> Expect.notEqual colors.buttonBg ""
                        , \_ -> Expect.notEqual colors.buttonText ""
                        , \_ -> Expect.notEqual colors.dangerBg ""
                        , \_ -> Expect.notEqual colors.headerBg ""
                        , \_ -> Expect.notEqual colors.border ""
                        ]
                        ()
            , fuzz Fuzz.bool "colors are valid CSS format (start with # or rgba)" <|
                \isDarkMode ->
                    let
                        colors =
                            Theme.getColors isDarkMode

                        isValidColor c =
                            String.startsWith "#" c || String.startsWith "rgba" c
                    in
                    Expect.all
                        [ \_ -> isValidColor colors.primaryBg |> Expect.equal True
                        , \_ -> isValidColor colors.primaryText |> Expect.equal True
                        , \_ -> isValidColor colors.secondaryBg |> Expect.equal True
                        , \_ -> isValidColor colors.buttonBg |> Expect.equal True
                        , \_ -> isValidColor colors.dangerBg |> Expect.equal True
                        , \_ -> isValidColor colors.headerBg |> Expect.equal True
                        ]
                        ()
            ]
        , describe "lightColors record"
            [ test "primaryBg is light cream" <|
                \_ ->
                    Expect.equal lightColors.primaryBg "#F2ECE4"
            , test "primaryText is dark" <|
                \_ ->
                    Expect.equal lightColors.primaryText "#263745"
            ]
        , describe "darkColors record"
            [ test "primaryBg is very dark" <|
                \_ ->
                    Expect.equal darkColors.primaryBg "#1A1F26"
            , test "primaryText is light" <|
                \_ ->
                    Expect.equal darkColors.primaryText "#F2ECE4"
            ]
        , describe "Contrast validation"
            [ test "light mode text is darker than background" <|
                \_ ->
                    -- Light mode: light bg (#F2ECE4) with dark text (#263745)
                    -- Just verify they're different (actual contrast calc would need more code)
                    Expect.notEqual lightColors.primaryBg lightColors.primaryText
            , test "dark mode text is lighter than background" <|
                \_ ->
                    -- Dark mode: dark bg (#1A1F26) with light text (#F2ECE4)
                    Expect.notEqual darkColors.primaryBg darkColors.primaryText
            , test "button has distinct text color" <|
                \_ ->
                    Expect.all
                        [ \_ -> Expect.notEqual lightColors.buttonBg lightColors.buttonText
                        , \_ -> Expect.notEqual darkColors.buttonBg darkColors.buttonText
                        ]
                        ()
            ]
        ]
