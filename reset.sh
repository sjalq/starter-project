rm -rf ~/.elm 
rm -rf ./elm-stuff
yes | lamdera reset
yes | LDEBUG=1 lamdera live 