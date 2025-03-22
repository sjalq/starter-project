rm -rf ~/.elm ~/dev/git/player-stocks/elm-stuff
rm -rf ./elm-stuff
yes | lamdera reset
yes | LDEBUG=1 lamdera live 