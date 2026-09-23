# LLM Build Tools

## Elm Function Generator

`gen-elm-functions.cjs` creates a cheat sheet of all Elm functions in the project to help LLMs understand available code.

### Usage

```bash
# Run from project root
node LLMBuildTools/gen-elm-functions.cjs

# Exclude directories (replaces the defaults below)
node LLMBuildTools/gen-elm-functions.cjs --exclude src/SomeDir --exclude src/AnotherDir

# Print a summary
node LLMBuildTools/gen-elm-functions.cjs -v
```

Generates `.cursor/rules/elm-functions.mdc` with all function signatures organized by module. The build scripts (`compile.sh`, `compile.js`, `compile.ps1`) run it automatically.

### Default Exclusions
- `src/Evergreen`
