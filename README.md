# create-lamdera-app 🚀

> The ultimate Lamdera starter — production-ready with auth, WebSockets, and everything you need to ship.

## Quick Start

```bash
npx create-lamdera-app
```

That's it! The CLI will guide you through:
1. **Project name** — what to call your new app
2. **Location** — where to create it (supports `~/`, relative, and absolute paths)

Then just:
```bash
cd your-project
./compile.sh
lamdera live
```

### One-liner (if you know what you want)

```bash
npx create-lamdera-app my-awesome-project
```

---

## What's Included 📦

### 🔐 Authentication & Authorization
- **Auth0 & Google OAuth** — complete integration, not just demos
- **Role-based permissions** — SysAdmin, UserRole, Anonymous with granular controls
- **Session management** — persistent login across browser sessions
- **Test account** — `sys@admin.com` / `admin` (SysAdmin access)

### 🌐 WebSockets & External APIs
- **Pure functional WebSocket library** — drop-in replacement with Lamdera wire format
- **RPC system** — complete HTTP endpoint framework with async operations
- **External API examples** — crypto prices, Slack notifications, OpenAI integration
- **Task chains** — elegant async operation handling (railway programming)

### 🔌 JavaScript Interop
- **Port system** — console logging, clipboard, with error handling
- **elm-pkg-js standard** — clean JavaScript integration pattern
- **External WebSocket client** — Node.js examples for external systems

### 🛠️ Developer Experience
- **Complete admin panel** — logs, system monitoring
- **Environment configuration** — dev/prod modes with API key management
- **Utility library** — HTTP helpers, JSON decoders, date formatting
- **LLM-friendly structure** — organized for AI-assisted development (see `CLAUDE.md`)

---

## Project Structure

```
your-project/
├── src/
│   ├── Frontend.elm          # Browser-side controller
│   ├── Backend.elm           # Server-side controller
│   ├── Types.elm             # All application types
│   ├── Theme.elm             # Complete theming system
│   ├── Pages/                # Route-based pages
│   ├── Components/           # Reusable UI components
│   ├── Rights/               # Auth & permissions
│   └── Ports/                # JavaScript interop
├── auth/                     # Auth submodule
├── lamdera-websocket-package/# WebSocket submodule
├── elm.json                  # Elm dependencies
├── compile.sh                # Build script
└── CLAUDE.md                 # AI development guide
```

---

## Prerequisites

- **Node.js** (v14+) — for the CLI
- **Git** — for version control and submodules
- **Lamdera CLI** — `npm install -g lamdera`

---

## Development

After creating your project:

```bash
cd your-project
./compile.sh       # Build the project
lamdera live       # Start dev server at http://localhost:8000
```

### Test Credentials

| Field | Value |
|-------|-------|
| Email | `sys@admin.com` |
| Password | `admin` |
| Role | System Administrator |

⚠️ **Remove or change these before deploying to production!**

---

## Learn More

- **AI Guide**: Check `CLAUDE.md` for LLM-friendly patterns
- **Examples**: Browse the `/examples` page for interactive demos
- **Admin Panel**: Explore `/admin` for system management tools

---

## Alternative Install Methods

### From local clone

```bash
git clone https://github.com/sjalq/starter-project.git
cd starter-project
./clone.sh
```

### Manual setup

```bash
git clone --recurse-submodules https://github.com/sjalq/starter-project.git my-project
cd my-project
rm -rf .git && git init
git submodule update --init --recursive
lamdera live
```

---

## License

MIT

---

*Built with ❤️ and an unhealthy obsession with type safety*
