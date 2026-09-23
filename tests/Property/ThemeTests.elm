module Property.ThemeTests exposing (suite)

import Expect
import Fuzz
import Test exposing (..)
import Theme exposing (Colors, darkColors, lightColors)


{-| Foreground/background pairs that render as text in the UI.
-}
textPairs : List ( String, Colors -> String, Colors -> String )
textPairs =
    [ ( "primaryText on primaryBg", .primaryText, .primaryBg )
    , ( "primaryText on secondaryBg", .primaryText, .secondaryBg )
    , ( "secondaryText on primaryBg", .secondaryText, .primaryBg )
    , ( "secondaryText on secondaryBg", .secondaryText, .secondaryBg )
    , ( "accentText on primaryBg", .accentText, .primaryBg )
    , ( "accentText on secondaryBg", .accentText, .secondaryBg )
    , ( "buttonText on buttonBg", .buttonText, .buttonBg )
    , ( "buttonText on dangerBg", .buttonText, .dangerBg )
    , ( "dangerText on secondaryBg", .dangerText, .secondaryBg )
    , ( "headerText on headerBg", .headerText, .headerBg )
    , ( "activeTabText on headerBg", .activeTabText, .headerBg )
    , ( "inactiveTabText on headerBg", .inactiveTabText, .headerBg )
    ]


suite : Test
suite =
    describe "Theme Properties"
        [ describe "getColors"
            [ test "True returns darkColors" <|
                \_ ->
                    Expect.equal (Theme.getColors True) darkColors
            , test "False returns lightColors" <|
                \_ ->
                    Expect.equal (Theme.getColors False) lightColors
            ]
        , describe "WCAG AA contrast (at least 4.5:1)"
            (List.concatMap
                (\( modeName, colors ) ->
                    List.map
                        (\( pairName, foreground, background ) ->
                            test (modeName ++ ": " ++ pairName) <|
                                \_ ->
                                    case contrastRatio (foreground colors) (background colors) of
                                        Just ratio ->
                                            ratio |> Expect.atLeast 4.5

                                        Nothing ->
                                            Expect.fail ("Not a #RRGGBB colour: " ++ foreground colors ++ " / " ++ background colors)
                        )
                        textPairs
                )
                [ ( "light", lightColors ), ( "dark", darkColors ) ]
            )
        , describe "Colour format"
            [ fuzz Fuzz.bool "every colour is #RRGGBB or rgba(...)" <|
                \isDarkMode ->
                    let
                        colors =
                            Theme.getColors isDarkMode

                        isValid colour =
                            relativeLuminance colour /= Nothing || String.startsWith "rgba(" colour
                    in
                    [ colors.primaryBg, colors.primaryText, colors.secondaryBg, colors.secondaryText, colors.accent, colors.accentText, colors.border, colors.buttonBg, colors.buttonText, colors.buttonHoverBg, colors.dangerBg, colors.dangerHoverBg, colors.dangerText, colors.headerBg, colors.headerBorder, colors.headerText, colors.activeTabText, colors.inactiveTabText, colors.successBg ]
                        |> List.filter (not << isValid)
                        |> Expect.equalLists []
            ]
        ]


contrastRatio : String -> String -> Maybe Float
contrastRatio a b =
    Maybe.map2
        (\la lb -> (max la lb + 0.05) / (min la lb + 0.05))
        (relativeLuminance a)
        (relativeLuminance b)


relativeLuminance : String -> Maybe Float
relativeLuminance colour =
    let
        channel start =
            colour
                |> String.slice start (start + 2)
                |> String.toList
                |> List.foldl (\c acc -> Maybe.map2 (\hex value -> value * 16 + hex) (hexDigit c) acc) (Just 0)
                |> Maybe.map (\value -> linearize (toFloat value / 255))

        linearize c =
            if c <= 0.03928 then
                c / 12.92

            else
                ((c + 0.055) / 1.055) ^ 2.4
    in
    if String.startsWith "#" colour && String.length colour == 7 then
        Maybe.map3 (\r g b -> 0.2126 * r + 0.7152 * g + 0.0722 * b) (channel 1) (channel 3) (channel 5)

    else
        Nothing


hexDigit : Char -> Maybe Int
hexDigit c =
    String.indexes (String.fromChar (Char.toUpper c)) "0123456789ABCDEF"
        |> List.head
