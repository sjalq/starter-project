# 🚀 The Ultimate Lamdera Starter Project

*Because building Lamdera apps from scratch is like assembling IKEA furniture without instructions - technically possible, but why would you do that to yourself?*

## What This Actually Is

A **production-ready** Lamdera starter that includes literally everything you need to build serious applications. This isn't just "Hello World" - it's a complete ecosystem with authentication, real-time features, external integrations, and enough examples to make your head spin (in a good way).

## 🎯 What You Get (The Real Deal)

### 🔐 Authentication & Authorization
- **Auth0 & Google OAuth** - Complete integration, not just demos
- **Role-Based Permissions** - SysAdmin, UserRole, Anonymous with granular controls
- **Session Management** - Persistent login across browser sessions
- **User Preferences** - Dark mode, settings, the works

### 🌐 External Integrations & APIs
- **Pure Functional WebSocket Library** - Drop-in WebSocket replacement with Lamdera wire format
- **RPC System** - Complete HTTP endpoint framework with async operations
- **External API Examples** - Crypto prices, Slack notifications, OpenAI integration
- **Task Chains** - Elegant async operation handling
- **Polling System** - Long-running background jobs

### 🔌 JavaScript Interop Done Right
- **Port System** - Console logging, clipboard, with error handling
- **elm-pkg-js Standard** - Clean JavaScript integration pattern
- **External WebSocket Client** - Node.js examples for external systems

### 🛠️ Developer Experience
- **Complete Admin Panel** - Logs, system monitoring
- **Environment Configuration** - Dev/prod modes with API key management
- **Utility Library** - HTTP helpers, JSON decoders, date formatting
- **LLM-Friendly Structure** - Organized for AI-assisted development

### 📦 External WebSocket Integration
- **Example of how to connect WebSockets in JS/TS to Lamdera**

## 🚀 Quick Start

**🎯 Easy Setup - Just like `wrangler init`!**

```bash
# 1. Clone this repository
git clone https://github.com/sjalq/starter-project.git
cd starter-project

# 2. Run the interactive setup
./clone.sh

# The script will prompt you for:
# - Project name (e.g., "my-awesome-project")  
# - Location relative to your home directory (e.g., "projects/my-app")
# - Automatically sets up submodules and git repo
# - Changes your working directory to the new project!

# 3. You're now in your new project directory, just run:
lamdera live

# Visit http://localhost:8000 and prepare to be amazed
```

**🚀 One-liner for the impatient:**
```bash
git clone https://github.com/sjalq/starter-project.git && cd starter-project && ./clone.sh my-project
```

**Alternative: Manual Setup (if you know what you're doing)**
```bash
git clone --recurse-submodules https://github.com/sjalq/starter-project.git
cd starter-project
git submodule update --init --recursive
lamdera live
```

## 🗺️ Navigation Guide

1. **Home** - Welcome page with navigation
2. **Examples** - Live demos of ports, clipboard, console logging
3. **Admin** - Full admin panel (requires SysAdmin role)
   - View system logs
   - Fetch remote models
   - System monitoring

## 🏗️ Architecture (The Good Stuff)

```
src/
├── Components/           # Reusable UI components
│   ├── Button.elm       # Type-safe button variants
│   ├── Card.elm         # Flexible card layouts  
│   ├── Header.elm       # Page headers with theming
│   ├── Tab.elm          # Navigation tabs
│   └── AuthControls.elm # Login/logout with dark mode toggle
├── Pages/               # Route-based pages
│   ├── Default.elm      # Landing page
│   ├── Examples.elm     # Live feature demos
│   ├── Admin.elm        # Admin dashboard
│   └── PageFrame.elm    # Layout and navigation
├── Auth/                # Authentication system
├── Rights/              # Authorization and permissions
│   ├── Auth0.elm        # OAuth integration
│   ├── Permissions.elm  # Role-based access control
│   ├── Role.elm         # User role definitions
│   └── User.elm         # User management
├── Ports/               # JavaScript interop
│   ├── ConsoleLogger.elm # Debug logging
│   └── Clipboard.elm    # Copy/paste functionality
├── EndpointExample/     # External API examples
│   └── Price.elm        # Crypto price + OpenAI integration
├── AsyncRPC.elm         # Async operation framework
├── LamderaRPC.elm       # HTTP endpoint system
├── Supplemental.elm     # Utility functions
├── Theme.elm            # Complete theming system
├── Types.elm            # All application types
├── Frontend.elm         # Browser-side controller
└── Backend.elm          # Server-side controller

external_integration_examples/
├── lamdera-ws.js        # Pure functional WebSocket library
├── main.js              # WebSocket client example
└── example-usage.js     # Advanced usage patterns

lamdera-websocket-package/
└── (Git submodule - published NPM package reference)
```

## 🔥 Live Examples You Can Try Right Now

### Port Integration
- **Console Logging** - Send messages from Elm to browser console
- **Clipboard Integration** - Copy text with one click
- **Error Handling** - Proper JavaScript error propagation

### RPC Examples
- **Standard RPC Endpoints** - Synchronous request/response patterns (`getLogs`, `getModel`)
- **Long-Running RPC with Polling** - Async operations that return immediately with a token, check back for results (`getPrice`, `getPriceResult`)
- **External API Integration** - Crypto prices, OpenAI, Slack notifications
- **Error Handling** - Proper HTTP error propagation and logging

### Task Chain Examples (Railway Programming)
- **Pure Functional Composition** - Chain async operations with `Task.andThen`
- **Error Propagation** - Automatic error handling through the entire chain
- **Real Example**: `fetchEthPriceInZar` - Fetches crypto price → waits → fetches exchange rate → calls OpenAI → returns result
- **Logging Integration** - Slack notifications at each step without breaking the chain

### Essential Supplemental Functions
- **HTTP Helpers** - `handleJsonResponse`, `httpErrorToString`, `addProxy` for CORS
- **Task Utilities** - `performNow`, `waitThenPerform`, `getTime` for message scheduling  
- **Formatting** - `formatFloat`, `formatPrice`, `formatPercent`, `formatDate`
- **JSON Decoders** - `at_`, `requiredAt_`, `optionalAt_` for nested data
- **Time Constants** - `second`, `minute`, `hour`, `day`, `week` for readable delays

### WebSocket Magic
```javascript
// Use exactly like normal WebSocket - but with Lamdera compatibility!
const ws = new LamderaWebSocket('ws://localhost:8000/_w');
ws.onmessage = (event) => console.log('Got:', event.data);
ws.send('Hello Lamdera!');
```

### Authentication Flow
- **OAuth Login** - Google and Auth0 integration
- **Role-Based Access** - Different permissions for different users
- **Persistent Sessions** - Stay logged in across browser restarts

## 🧠 For the Technical Minds

### Message Patterns
- **Task Chains** - Elegant async operation composition
- **Message Ricochets** - When you need stateful intermediate steps
- **Pure Functions** - Functional programming at its finest

### External Integration
- **WebSocket Wire Format** - Transparent Lamdera protocol handling
- **HTTP Proxy** - Development CORS handling
- **Environment Configuration** - Seamless dev/prod transitions

### Type Safety
- **Complete Type Coverage** - From frontend to backend
- **Role-Based Permissions** - Compile-time authorization checks
- **Theme Safety** - No more CSS color bugs

## 💡 Why This Exists

*"Example isn't a way to learn, it's the only way to learn"*
-you know who

Because every time someone builds a serious Lamdera app, they need working examples of how to:
1. ✅ Build authentication (working example included)
2. ✅ Create component libraries (working example included)  
3. ✅ Set up external API integration (working example included)
4. ✅ Handle WebSocket communication (working example included)
5. ✅ Build admin panels (working example included)
6. ✅ Configure development environments (working example included)
7. ✅ Write utility functions (working example included)
8. ❌ Question their life choices (this one's still on you)

## 🚦 Getting Started

### Prerequisites
- **Lamdera CLI** installed (`npm install -g lamdera`)
- **Git** for version control

### Step-by-Step Setup

1. **Clone and Create Your Project**
   ```bash
   git clone https://github.com/sjalq/starter-project.git
   cd starter-project
   ./clone.sh
   # Interactive setup will guide you through naming and location
   # Script automatically changes to your new project directory
   ```

2. **Configure Authentication** (Optional but recommended)
   - Edit `src/Env.elm` with your Auth0 credentials
   - Or use the **default test admin account**:
     - **Email**: `sys@admin.com`
     - **Password**: `admin`
     - **Role**: System Administrator (full access)

3. **Build and Run**
   ```bash
   ./compile.sh
   lamdera live
   ```

4. **Explore the Features**
   - **Home**: Basic navigation and theming
   - **Examples**: Live demos of ports, clipboard, console logging  
   - **Admin**: Full admin panel (requires SysAdmin role)
   - **OAuth Login**: Test authentication flow

5. **Try External Integration**
   ```bash
   cd external_integration_examples
   npm install && npm start
   ```

6. **Start Building**: You now have a complete foundation - customize away!

## 🔐 Test Credentials

For immediate testing and development, a default admin user is pre-configured:

| Field | Value |
|-------|-------|
| **Email** | `sys@admin.com` |
| **Password** | `admin` |
| **Role** | System Administrator |
| **Access** | Full admin panel, all features |

**🚨 Security Note**: Change or remove this test user before deploying to production!

## 🎓 Learn More

- **AI Guide**: Check `docs/The_Lamdera_guide_for_AIs.md` for LLM-friendly patterns
- **Examples**: Browse the `/examples` page for interactive demos
- **WebSocket Package**: See `external_integration_examples/` for Node.js integration
- **Admin Panel**: Explore `/admin` for system management tools

## 🌟 The Bottom Line

This isn't just a starter project - it's a complete application framework that handles all the boring stuff so you can focus on building amazing features. With authentication, theming, external integrations, admin tools, and a complete component library, you're not starting from scratch - you're starting from the finish line.

---

*Built with ❤️, an unhealthy obsession with type safety, and way too much coffee*

**Ready to build something awesome? This starter has your back.** 