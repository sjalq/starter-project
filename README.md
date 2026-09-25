# lamdera-starter-kit

A production-minded starting point for [Lamdera](https://lamdera.com) apps: authentication, role-based permissions, an HTTP RPC layer, structured logging, an admin area and a full program-test suite, wired together and passing CI.

```bash
git clone --recursive https://github.com/sjalq/starter-project.git my-app
cd my-app
git remote rename origin template   # pull future template fixes with: git pull template master
npm install
./compile.sh
lamdera live
```

Open <http://localhost:8000> and sign in with the development account `admin@example.com` / `admin` (seeded locally only).

## Live on the sjalq.app box

This `lam` branch deploys to the self-hosted Lamdera box, where apps live at `https://<name>.sjalq.app`. From a shell on the box (a harness agent's shell works):

```bash
lam login                       # once per machine; a human approves the printed URL
git clone -b lam --recursive https://github.com/sjalq/starter-project.git ~/workspace/<name>
cd ~/workspace/<name> && npm install
node scripts/node/new-app.js <name> [--team <team>]
```

`new-app.js` creates the project on the box, makes your account its SysAdmin (`sysAdminEmail`) with a fresh `modelKey` (also saved to the gitignored `.lamdera-cli.json`), renames the kit, sets the `lamdera` git remote to `lamdera-git@127.0.0.1:<name>.git`, compiles, commits and runs `lam deploy`. It prints the live URL. Re-running it is safe.

After that the loop is: change code, `./compile.sh`, commit, `lam deploy`.

- **Sign-in:** new projects start with the box's shared Auth0 application (wildcard callbacks on `*.sjalq.app`), so "Continue with Google" works on the first deploy. Sign in with your own Google account to become SysAdmin and reach `/admin`. Email/password signup works too.
- **Config:** production values are set with `lam api agentApply` `set_env` ops (secret unless `"public": true`) and apply on the next `lam deploy`. With no code change, deploy with `git commit --allow-empty -m "Apply config" && lam deploy` (a deploy without a new commit pushes nothing). If a deploy stops with MISSING PRODUCTION CONFIG, set the keys it names.
- **Type changes:** `lam deploy` writes `src/Evergreen/Migrate/V<n>.elm` and stops. Implement the `Unimplemented` parts, carrying every field forward, commit, deploy again.
- **Logs:** `lam api agentLogs '{"project":"<name>"}'` (the box's process log), or `/admin/logs` and `node scripts/node/lamdera-cli/index.js logs --env prod` (the app's own log).
- **Everything else** (teams, invites, deleting, tokens): <https://lmd.sjalq.app/llm_guide.md>.

## What you get

```
Authentication    Email/password accounts plus Auth0 (Google) OAuth
                  Signup refuses emails that already belong to an account
Authorization     SysAdmin / User / Anonymous roles, one permission table
                  (Rights/Permissions.elm) checked for every ToBackend message
Admin area        /admin: searchable, paginated backend logs for SysAdmins
HTTP RPC          /_r/<endpoint> JSON, string and bytes endpoints (RPC.elm),
                  async task-chain + polling pattern (AsyncRPC.elm)
Model backup      /_r/getModel and /_r/setModel behind a shared secret header
Logging           Logger.elm: in-memory ring buffer for the admin UI, mirrored
                  to Lamdera's disk-backed production log
Ports             elm-pkg-js examples (console logger, clipboard) wired through
                  Effect so program tests can simulate them
Theming           Light and dark themes, contrast checked against WCAG AA
Testing           lamdera/program-test end-to-end tests, property tests and
                  a visual snapshot viewer
Tooling           CI workflow, elm-review config, lamdera-cli for logs/backups
```

## Prerequisites

- [Lamdera](https://lamdera.com/start) 1.4 or newer
- [elm-test-rs](https://github.com/mpizenberg/elm-test-rs) (the standard `elm-test` cannot compile Lamdera codecs)
- Node.js 18 or newer and Git

## Everyday commands

```
./compile.sh               Regenerate the function index, run tests, compile
                           (compile.ps1 on Windows, or: npm run build)
lamdera live               Dev server on http://localhost:8000
npm install                Install elm-review and other dev tools (once)
npm test                   Run the Elm test suite
npm run review             Run elm-review
npm run test:cli           Test lamdera-cli (run `npm ci --prefix scripts/node/lamdera-cli` once)
./scripts/run-test-viewer.sh
                           Build the snapshot viewer, serve it on http://localhost:8888/viewer.html
./reset.sh                 Clear the Elm/Lamdera caches and restart lamdera live
                           (wipes ~/.elm for every project; use when the compiler cache is corrupt)
```

## Configuration

Local development uses the defaults in `src/Env.elm`. Set production values with `set_env` (see "Live on the sjalq.app box"):

```
modelKey              Secret for /_r/getModel, /_r/setModel and /_r/getLogs.
                      The development default is refused in Production.
sysAdminEmail         The account with this email gets the SysAdmin role.
auth0AppClientId      Auth0 application credentials. Leave the tenant empty
auth0AppClientSecret  to hide the "Continue with Google" button.
auth0AppTenant
slackApiToken         Optional Slack logging for the task-chain example.
slackChannel
logSize               In-memory log entries kept for the admin page.
```

The demo SysAdmin account is only seeded when `Env.mode` is `Development`, and password signup refuses `sysAdminEmail`. In Production the SysAdmin signs in through Auth0 with that email. Restrict your Auth0 tenant to verified-email connections (the login button requests Google), since roles are granted by email. Without Auth0, seed the account yourself by restoring a model that contains it with `/_r/setModel`.

Email/password signup trims and lowercases emails and requires passwords of at least 8 characters, on the backend as well as in the form.

Password hashing in `src/Auth/PasswordHash.elm` is a single salted SHA-256 round so the template runs without native code. Replace it with a slow KDF before storing real users' passwords.

## Project layout

```
src/
  Frontend.elm, Backend.elm   Lamdera entry points
  Types.elm                   All shared types
  Route.elm                   URL parsing and printing
  Pages/                      One module per top-level route
  Components/                 Reusable view components
  Rights/                     Roles, permissions, Auth0 configuration
  Auth/                       Email/password login and password hashing
  RPC.elm, LamderaRPC.elm     HTTP endpoints under /_r/
  AsyncRPC.elm                Polling pattern for long-running endpoints
  EndpointExample/Price.elm   Example task chain (ETH price in ZAR)
  Logger.elm                  Structured logging
  Ports/, elm-pkg-js/         Port modules and their JavaScript
tests/
  Program/                    End-to-end program tests
  Property/                   Property and unit tests
  TestViewer.elm              Visual snapshot viewer
scripts/node/lamdera-cli/     Fetch logs and back up the BackendModel
scripts/node/lamdera-logs.mjs Read Lamdera's production log file
LLMBuildTools/                Generates .cursor/rules/elm-functions.mdc
auth/                         Auth library, vendored from lamdera/auth
lamdera-websocket-package/    JavaScript WebSocket client for Lamdera (submodule)
```

## Operations

- Admin UI: sign in as the SysAdmin and open `/admin/logs`.
- Logs and backups from the command line: run `npm ci --prefix scripts/node/lamdera-cli` once, copy `.lamdera-cli.example.json` to `.lamdera-cli.json` (gitignored), fill in your model keys, then:

  ```bash
  node scripts/node/lamdera-cli/index.js logs --env prod --follow
  node scripts/node/lamdera-cli/index.js backup --env prod
  ```

- Production log file: see [LAMDERA-LOGS.md](LAMDERA-LOGS.md).

## Working with AI assistants

[CLAUDE.md](CLAUDE.md) and `.cursor/rules/` describe the architecture, conventions and test commands for coding agents. `compile.sh` keeps `.cursor/rules/elm-functions.mdc`, an index of every function in `src/`, up to date.

## License

[MIT](LICENSE)
