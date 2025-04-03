# Feature Checklist: AI Agent Configuration

## Phase 1: Type Design

- [ ] Define Backend Model types (`AgentProvider`, `AgentConfig`, `UserAgentConfigs`) in `src/Types.elm`.
- [ ] Define Frontend Model types (`AgentConfigView`) in `src/Types.elm`.
- [ ] Define Message types (`FrontendMsg`, `ToBackendMsg`, `ToFrontendMsg`) variants related to agent config management in `src/Types.elm`.
- [ ] Add `AgentSettings` variant to `Route` type in `src/Route.elm`.

## Phase 2: Implementation

### Frontend (Mock Data)
- [ ] Create `src/Pages/AgentSettings.elm` with basic `init` and `view` functions.
- [ ] Integrate `AgentSettings` route into `Frontend.elm` (init, update, view, subscriptions).
- [ ] Update `PageFrame.elm` to include navigation to the Agent Settings page.
- [ ] Build UI layout in `src/Pages/AgentSettings.elm`:
    - [ ] List existing `AgentConfigView`s.
    - [ ] Form/modal for adding/editing an `AgentConfigView` (fields: name, provider, endpoint, API key).
    - [ ] Buttons for saving and deleting.
- [ ] Populate UI with mock data.
- [ ] Implement `FrontendMsg` handling in `Frontend.elm` for UI interactions (typing, button clicks).

### Backend Communication Wiring
- [ ] Implement sending relevant `ToBackendMsg` from `Frontend.elm` based on user actions (`RequestAgentConfigs`, `SaveAgentConfig`, `DeleteAgentConfig`).
- [ ] Implement handling `ToFrontendMsg` in `Frontend.elm` update to receive data from the backend (`ReceiveAgentConfigs`).

### Backend Logic
- [ ] Implement `ToBackendMsg` handlers in `Backend.elm` update:
    - [ ] `RequestAgentConfigs`: Fetch configs for the requesting user.
    - [ ] `SaveAgentConfig`: Save/update agent config (ensure user isolation). Pre-populate with default providers on first load for a user.
    - [ ] `DeleteAgentConfig`: Delete agent config (ensure user isolation).
- [ ] Pre-populate `UserAgentConfigs` with default providers (OpenAI, Anthropic, Google Gemini) when a user's config is first accessed or saved if empty.
- [ ] Ensure user data isolation for `AgentConfig` access.

### Frontend Integration
- [ ] Replace mock data in `src/Pages/AgentSettings.elm` and `Frontend.elm` with data received from the backend via `ToFrontendMsg`.
- [ ] Display loading/error states appropriately.

### Finalization
- [ ] Run `./generate_and_compile.sh` and fix any compiler errors.
- [ ] Test thoroughly. 