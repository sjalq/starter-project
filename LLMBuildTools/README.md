# LLM Build Tools

## Elm Function Generator

`gen-elm-functions.js` creates a cheat sheet of all Elm functions in the project to help LLMs understand available code.

### Usage

```bash
# Run from project root
node LLMBuildTools/gen-elm-functions.js

# Exclude additional directories
node LLMBuildTools/gen-elm-functions.js --exclude src/SomeDir --exclude src/AnotherDir
```

Generates `.cursor/rules/elm-functions.mdc` with all function signatures organized by module.

### Default Exclusions
- `src/Fusion`
- `src/Evergreen` 
- `src/generated` 