# lamdera-starter-kit 🚀

> Production-ready Lamdera starter with auth, WebSockets, program-test, and everything you need to ship.

## Quick Start

```bash
npx lamdera-starter-kit my-app
cd my-app
./compile.sh
lamdera live
```

Open http://localhost:8000 — you're running!

---

## Installation Options

### Interactive (human-friendly)
```bash
npx lamdera-starter-kit
# Prompts for project name
```

### Direct (script-friendly)
```bash
npx lamdera-starter-kit my-app
```

### Non-interactive (CI/automation)
```bash
npx lamdera-starter-kit my-app -y
```

### JSON output (LLM/automation)
```bash
npx lamdera-starter-kit my-app --json
```

Returns structured JSON:
```json
{
  "success": true,
  "path": "/path/to/my-app",
  "projectName": "my-app",
  "nextSteps": ["cd \"/path/to/my-app\"", "./compile.sh", "lamdera live"],
  "errors": [],
  "warnings": []
}
```

### Init in current directory
```bash
mkdir my-app && cd my-app
npx lamdera-starter-kit .
```

---

## CLI Reference

```
npx lamdera-starter-kit [project-name] [options]

Arguments:
  project-name    Name for new project (creates ./project-name)
  .               Initialize in current directory

Options:
  -y, --yes       Non-interactive mode (no prompts, fails if dir not empty)
  --json          Output JSON instead of human text (implies --quiet)
  -q, --quiet     Suppress decorative output
  -v, --verbose   Show detailed progress
  -h, --help      Show help
```

---

## What's Included 📦

### 🔐 Authentication & Authorization
- **Email/Password + Google OAuth** — complete integration
- **Role-based permissions** — SysAdmin, UserRole, Anonymous with granular controls
- **Session management** — persistent login across browser sessions
- **Test account** — `sys@admin.com` / `admin` (SysAdmin access)

### 🧪 Testing Infrastructure
- **lamdera/program-test** — full end-to-end testing framework
- **Property-based tests** — fuzz testing with elm-explorations/test
- **Visual test viewer** — see rendered UI snapshots in browser
- **298 tests included** — routes, permissions, auth flows, themes, and more

### 🌐 WebSockets & External APIs
- **Pure functional WebSocket library** — drop-in with Lamdera wire format
- **RPC system** — HTTP endpoint framework with async operations
- **External API examples** — crypto prices, Slack, OpenAI integration

### 🔌 JavaScript Interop
- **Port system** — console logging, clipboard, error handling
- **elm-pkg-js standard** — clean JavaScript integration

### 🛠️ Developer Experience
- **Admin panel** — logs, system monitoring at `/admin`
- **Environment config** — dev/prod modes with API key management
- **CLAUDE.md** — comprehensive LLM development guide
- **Hot reload** — `lamdera live` watches for changes

---

## Project Structure

```
my-app/
├── src/
│   ├── Frontend.elm          # Browser-side app
│   ├── Backend.elm           # Server-side app
│   ├── Types.elm             # All application types
│   ├── Route.elm             # URL routing
│   ├── Pages/                # Route-based pages
│   ├── Components/           # Reusable UI components
│   ├── Rights/               # Auth & permissions
│   └── RPC.elm               # HTTP endpoints
├── tests/
│   ├── Program/              # End-to-end tests
│   ├── Property/             # Property-based tests
│   └── Helpers/              # Test utilities
├── auth/                     # Auth submodule
├── lamdera-websocket-package/# WebSocket submodule
├── compile.sh                # Build + test script
├── CLAUDE.md                 # LLM development guide
└── elm.json                  # Dependencies
```

---

## Prerequisites

- **Node.js** (v14+)
- **Git**
- **Lamdera CLI** — install from https://lamdera.com/start

---

## Development Commands

```bash
./compile.sh              # Build + run tests
lamdera live              # Dev server at http://localhost:8000
elm-test-rs --compiler lamdera "tests/**/*.elm"  # Run tests only
```

### Test Credentials

| Field | Value |
|-------|-------|
| Email | `sys@admin.com` |
| Password | `admin` |
| Role | System Administrator |

⚠️ **Change these before production!**

---

## For LLM Agents

This starter is optimized for AI-assisted development:

1. **Read `CLAUDE.md`** — contains architecture, patterns, and conventions
2. **Use `--json` flag** — get structured output for parsing
3. **Run `./compile.sh`** — validates changes (tests + type checking)
4. **Check `/admin`** — inspect logs via RPC endpoints

Example agent workflow:
```bash
# Create project
npx lamdera-starter-kit my-app --json

# Verify setup
cd my-app && ./compile.sh

# Read development guide
cat CLAUDE.md
```

---

## Learn More

- **LLM Guide**: `CLAUDE.md` for AI development patterns
- **Examples**: `/examples` page for interactive demos
- **Admin Panel**: `/admin` for logs and monitoring
- **Tests**: `tests/` directory for testing patterns

---

## License

MIT

---

*Built with ❤️ and type safety*
