# Dark Mode Feature Checklist

- [x] Add `darkMode : Bool` field to `User` record in `Types.elm`.
- [x] Add `darkMode : Bool` field to `FrontendModel` record in `Types.elm`.
- [x] Add `ToggleDarkMode` constructor to `FrontendMsg` in `Types.elm`.
- [x] Add `SetDarkModePreference Bool` constructor to `ToBackend` in `Types.elm`.
- [x] Handle `SetDarkModePreference` in `backendUpdate` in `Backend.elm` to update the user's preference.
- [x] Handle `ToggleDarkMode` in `frontendUpdate` in `Frontend.elm` to toggle frontend state and send `SetDarkModePreference`.
- [x] Update frontend initialization (`init` or login flow) to load the user's dark mode preference into `FrontendModel`.
- [x] Add a UI element (e.g., button/toggle) in `PageFrame.elm` to trigger `ToggleDarkMode`.
- [x] Apply conditional styling in `PageFrame.elm` (and potentially other views) based on `FrontendModel.darkMode`.
- [x] Run `./compile.sh` to ensure everything compiles. 