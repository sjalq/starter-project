# The Lamdera Guide for AIs

## Core Concepts

One of Lamdera's most powerful features is that if your code compiles, it typically works correctly. This is due to Elm's extremely strict typing system, which allows you to model your application's features by starting with the types that represent your domain. This will cause compiler errors in all the places where you need to add functionality. If you were to look at the files in the src/ directory, you would see the red ones are the ones that don't compile, and they would serve as a guide to the places where you need to add functionality.

## Key Types in Lamdera Applications

### 1. Backend Model
The Backend Model serves as your database, representing persistent data. Best practices for Backend Models include:
- Keep the structure flat and simple
- Use Dictionaries with String keys for collections
- Include the key as a field in record types
- Model relationships between types using Dictionary keys as references
- Think of each Dictionary as a table in a traditional database

### 2. Frontend Model
The Frontend Model lives in the browser and should be designed independently from the Backend Model. Key considerations:
- Keep it as flat as possible
- May contain different versions of backend types
  - Example: A User record might exclude sensitive fields like passwords
  - May combine data that exists in separate backend collections
- Should represent the UI state effectively

### 3. Message Types

#### Frontend Messages
- Represent state changes in the browser
- Handle user interactions and environmental events
- Drive the frontend update cycle

#### ToBackend Messages
- Communication from browser to Lamdera backend
- Represent requests for data or actions

#### ToFrontend Messages
- Communication from backend to frontend
- Typically carry responses or push notifications

#### Backend Messages
- Handle external events on the backend
- Examples:
  - HTTP response handling
  - Time-based events
  - System notifications

### 4. Routes and Pages
Routes are a crucial part of Lamdera applications, representing distinct views or features. When implementing new functionality:

#### Route Definition
- New features typically require a new Route variant in the Route type
- Routes should be descriptive and follow the existing naming pattern
- Consider route parameters for dynamic content (e.g., `UserProfile String`)
- Routes correspond to the url path and can be used to represent appropriate state in the URL

#### Page Organization
- Each top level route should correspond to a dedicated page module in the Pages/ directory
- Pages should be self-contained with their own view and init functions, but updates should be in the Frontend.elm file
- Use discretion here as some system might need their own update function and sub model, but generally pages do not. But be smart about it.
- Shared components can live in a Components/ directory

#### Best Practices
- Always add new features as new routes unless explicitly asked otherwise
- Update the navigation/menu system when adding routes
- Consider access control and permissions for new routes

Example Structure:
```elm
-- Route.elm
type Route
    = Home
    | UserProfile String
    | Settings
    | NewFeature  -- Add new routes here

-- Pages/NewFeature.elm
module Pages.NewFeature exposing (..)

type alias Model = { ... }
type Msg = ... 

init : Model -> ( Model, Cmd Msg )
view : Model -> Html Msg
```

## General Guidelines & Style

This section outlines general interaction patterns and coding style preferences.

-   **Communication:** Respond with minimal explanation; focus on writing code.
-   **Simplicity:** Aim for simple, robust, and generic code, avoiding over-simplification. Simpler code is almost always more robust and more generic.
-   **Comments:** Avoid comments; use descriptive variable names instead. The only exception is using comment separators (e.g., `-- MY TYPE GROUP`) for grouping related types in `Types.elm`.
-   **Imports:** When importing modules, prefer `exposing (..)` unless there's a specific, compelling reason to list specific functions or types.
-   **File Structure:** Ignore the `/Evergreen/` folder and its subfolders completely.
-   **JS/CSS:** Do not inject JavaScript into tags or CSS styles, as this is not possible in Elm. Use Elm's built-in HTML/CSS capabilities via `elm/html` and related packages. Avoid separate CSS files.
-   **README:** Do not generate a `README.md` file unless explicitly asked.

## Feature Development Workflow

### Feature Checklist

**Before starting implementation (Phase 1):**

0.  Create a feature checklist document in the `docs/` folder named `feature-<feature_name>.md`.
    *   List verifiable and concrete TODO items required to complete the new feature.
    *   Ensure the TODOs follow logically.
    *   **Crucially:** Update this checklist by ticking off items (`- [x] Item`) as you implement the feature.

### Phase 1: Type Design
1. Start with the Backend Model
   - Define your persistent data structures
   - Plan your collections and relationships

2. Design the Frontend Model
   - Fill in the Routes in the Route.elm file
   - Consider UI requirements
   - Define view-specific data structures

3. Define Message Types
   - Map out the complete communication flow
   - Design all necessary messages between components

### Phase 2: Implementation
4. Build Frontend with Mock Data
   - Add the frontend to either the correct existing page or add a new one, adding it to the Route system.
   - Create UI components
   - Implement frontend logic
   - Use hardcoded data for testing
   - Remember the to add the relevant changes to the PageFrame.elm file
   - **Note:** After this step, the code should at least compile

5. Wire Up Backend Communication
   - Implement ToBackend messages
   - Set up backend request handling
   - **Note:** After this step, the code should likely compile

6. Implement Backend Logic
   - This is where the actual functions are written
   - They will typically be Task Chains but occasionally Message Ricochets
   - Handle data persistence
   - Implement business logic

7. Complete Frontend Integration
   - Handle ToFrontend messages
   - Create necessary frontend functions
     - Initially implemented with mock data in step 4
     - Now updated to work with real backend data
   - Update UI based on backend responses
   - Polish error handling
   - **Note:** After this step, the code should at least compile

8. Update the Fusion Generated Types and Compile
   - Always use the `./compile.sh` script to:
     - Generate fusion types
     - Compile all necessary files
     - Verify that your code compiles correctly
   - Run this script after completing your feature to ensure everything works properly

### Diagram of the Workflow
```mermaid
sequenceDiagram
    participant FE as Frontend
    participant BE as Backend
    
    Note over FE, BE: Phase 1: Type Design
    
    Note over BE: 1. Start with Backend Model
    Note over FE: 2. Design Frontend Model
    Note over FE, BE: 3. Define Message Types
    
    Note over FE, BE: Phase 2: Implementation
    
    Note over FE: 4. Build Frontend with Mock Data
    Note right of FE: Code Should Compile
    
    FE->>BE: 5. Wire Up Backend Communication
    Note right of FE: Code Should Compile
    
    Note over BE: 6. Implement Backend Logic
    
    BE->>FE: 7. Complete Frontend Integration
    Note right of FE: Code Should Compile

    FE->>BE: 8. Update Fusion Generated Types
    Note over BE: Types Should Be Updated
```


## Message Patterns

### Message Ricochets vs Task Chains

When implementing processes that involve multiple external interactions (HTTP calls, time delays, etc.), you should strongly prefer using Task chains. Message ricochets should only be used when specific functional requirements or reliability concerns make them absolutely necessary.

#### Task Chains (Preferred Approach)
A task chain describes the entire process in a sequence of `Task.andThen` / `Task.map` functions. All external interactions are described as tasks, resolving in a single message when the entire chain completes. This approach provides cleaner code, better error handling, and simpler state management.

**Real Example from the Codebase:**
```elm
-- From src/EndpointExample/Price.elm
fetchEthPriceInZar : Task Http.Error String
fetchEthPriceInZar =
    let
        log message =
            sendSlackMessage Env.slackApiToken Env.slackChannel message
                |> Task.map (\_ -> ())
                |> Task.onError (\_ -> Task.succeed ())
    in
    log "Starting to fetch ETH price"
        |> Task.andThen (\_ -> fetchEthPrice)
        |> Task.andThen (\ethPrice -> 
            log ("ETH price fetched: " ++ String.fromFloat ethPrice ++ " USD")
                |> Task.map (\_ -> ethPrice))
        |> Task.andThen (\ethPrice ->
            fetchZarRate
                |> Task.map (\zarRate -> { ethPrice = ethPrice, zarRate = zarRate }))
        |> Task.andThen (\data ->
            let
                finalPrice = data.ethPrice * data.zarRate
            in
            log ("Final price calculated: " ++ String.fromFloat finalPrice ++ " ZAR")
                |> Task.map (\_ -> finalPrice))
```

**Benefits of Task Chains:**
- Clear, linear flow of operations
- Unified error handling
- No intermediate model updates needed
- Easier to reason about and maintain
- Better performance due to fewer model updates
- Simpler testing as the entire process is contained

#### Message Ricochets (Use Only When Necessary)
A message ricochet is when each step in a process triggers a message, which might update the model and then trigger another external process, resulting in another message, and so forth. This creates a "ping-pong" effect between your application and external services. While more complex and harder to maintain, there are specific scenarios where this pattern is necessary.

**Example of a Message Ricochet:**
```elm
-- This is a conceptual example of a message ricochet pattern
update msg model =
    case msg of
        FetchEthPrice ->
            ( model
            , Http.get 
                { url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
                , expect = Http.expectJson GotEthPrice decoder
                }
            )
        
        GotEthPrice (Ok price) ->
            ( { model | ethPrice = price }
            , Http.get 
                { url = "https://api.exchangerate.com/v1/latest/USD"
                , expect = Http.expectJson GotZarRate decoder
                }
            )
        
        GotZarRate (Ok rate) ->
            ( { model | finalPrice = model.ethPrice * rate }
            , fetchJoke model.finalPrice
            )
```

#### When to Use Each Pattern

**Default to Task Chains Unless:**
- You have a specific requirement that absolutely necessitates intermediate state persistence
- The process MUST be interruptible and resumable
- You need to show detailed progress updates to users
- The flow requires complex branching based on intermediate results
- You need a detailed audit trail of each step

**Best Practice:**
Even when you need some of the benefits of message ricochets, consider using a hybrid approach:
1. Start with a task chain as the primary implementation
2. Add strategic persistence points only where absolutely necessary
3. Use Slack (or similar) logging for process visibility instead of model persistence
4. Only fall back to a full message ricochet pattern if the hybrid approach proves insufficient

Remember: Task chains should be your default choice. Only deviate from this when you have a clear, compelling reason that makes message ricochets necessary for your specific use case.

## Task Chain Pattern Example

Here's a concrete example of a Task Chain pattern from the codebase that demonstrates fetching an ETH price and converting it to ZAR:

```elm
fetchEthPriceInZar : Task Http.Error String
fetchEthPriceInZar =
    let
        log message =
            sendSlackMessage Env.slackApiToken Env.slackChannel message
                |> Task.map (\_ -> ())
                |> Task.onError (\_ -> Task.succeed ())
    in
    log "Starting to fetch ETH price"
        |> Task.andThen (\_ -> fetchEthPrice)
        |> Task.andThen (\ethPrice -> 
            log ("ETH price fetched: " ++ String.fromFloat ethPrice ++ " USD")
                |> Task.map (\_ -> ethPrice))
        |> Task.andThen (\ethPrice ->
            fetchZarRate
                |> Task.map (\zarRate -> { ethPrice = ethPrice, zarRate = zarRate }))
        |> Task.andThen (\data ->
            let
                finalPrice = data.ethPrice * data.zarRate
            in
            log ("Final price calculated: " ++ String.fromFloat finalPrice ++ " ZAR")
                |> Task.map (\_ -> finalPrice))
```

This pattern shows:
- Clear sequential flow of operations
- Error handling through Task results
- Data passing between steps
- Integrated logging
- Final transformation of the data

The Task Chain pattern is particularly useful for:
- Complex API calls
- Multi-step data transformations
- Operations requiring intermediate logging
- Processes with potential failure points
- Sequential operations that depend on previous results

## The Perils of Ports: A Warning

Ports are almost always the wrong approach in Lamdera applications and should be avoided. While Elm's port system was designed as an intentional escape hatch to JavaScript, this comes with significant downsides:

- They are lazy and based on the mid dev out there, you're not being "mid" are you!?
- Every port introduces untypable, unverifiable code into your application
- Ports require boilerplate on both Elm and JavaScript sides
- They create implicit dependencies that break Elm's guarantees
- Ports make applications harder to maintain and evolve
- Error handling becomes significantly more complex
- Testing is more difficult and less reliable
- It's lazy, lazy, lazy

### Better Alternatives to Ports

Before reaching for ports, exhaust these alternatives:

1. **Search the Elm Package Registry** for existing pure-Elm solutions:
   ```
   yes | lamdera install <package-name>
   ```
   
   Always use `lamdera install` rather than `elm install` to ensure compatibility with the Lamdera ecosystem.


2. **Browse elm-search.org** to find functions across all published packages that might solve your problem.

3. **Look at existing Elm implementations** in similar domains. The community has often already solved common problems in a pure-Elm way.

For example, there's an elm/file package!

Remember: nearly every JavaScript interop problem has been solved in a typed, reliable way by the Elm ecosystem. Ports should be your absolute last resort after exhausting all other options, and even then, consider carefully whether the functionality is truly necessary.

## Package Searching

- Use **elm-search.org** to find functions across packages
- Check **package.elm-lang.org** for official repositories
- Always use `yes | lamdera install author/package-name` (not `elm install`) (remember the 'yes')
- Prioritize official `elm/*` packages, then well-maintained community packages

## Common Pitfalls

This section highlights common mistakes and specific patterns to follow or avoid.

### Working with Existing Code
-   **Assumption:** When adding new functionality, assume the existing codebase is immaculate at the beginning of the session.
-   **Modification:** Only remove or alter existing code if asked to fix something or if the code is *central* to the improvements being made for the current feature request.
-   **Scope:** Never remove code unrelated to the essential changes needed for the current session of prompts.

### Type Organization
- Types should preferably be defined in Types.elm
- When there are clearly seperatable types, like in a game for instance where the game state and msgs needs to be defined, then you can define them in their own module. 
- When grouping types within `Types.elm`, use comment separators for clarity (e.g., `-- USER RELATED TYPES`).

### CSS Best Practices
- Avoid using separate CSS files
- Use Elm's built-in HTML and CSS functionality through the `elm/html` package
- Leverage Elm's type system for styling by using the `Html.Attributes` and `Html.Events` modules
- Use Elm's CSS-in-Elm approach for type-safe styling

### Lamdera/Elm Specific Patterns
-   **Ports:** Avoid using Ports. They introduce untyped code and complexity. Exhaust pure Elm options first.
-   **`Supplemental.elm`:** Before writing utility functions, especially for things like handling HTTP responses (`handleJsonResponse`), check the `Supplemental.elm` file first.
-   **HTTP Headers:** Avoid explicitly setting `Http.header "Content-Type" "application/json"` in most cases, it is likely already the default.
-   **Logging:** Use the `log` function defined in `Backend.elm` (which likely uses `Supplemental.log NoOpBackendMsg`) for backend logging. Do not use the `Log` Msg constructor directly for this purpose.
-   **`sendToFrontend`:** The pattern `_ = Lamdera.sendToFrontend msg` will **not** work. It discards the command necessary to send the message. Ensure `Lamdera.sendToFrontend` is used correctly within the TEA loop, typically returned as part of the `( model, Cmd msg )` tuple in `update` functions where appropriate.

# Checking the compiled output
- Always use the `./compile.sh` script to check your code compiles and to generate Fusion types:
  ```
  ./compile.sh
  ```
- This script will:
  1. Generate Fusion types using elm-pages
  2. Compile all necessary Lamdera files
  3. Show you a list of errors and warnings that you can fix
- Run this script:
  - At the start of every new feature session
  - When you complete a feature