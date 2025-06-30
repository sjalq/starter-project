# Lamdera Starter Project

## Claude's Favorite Lamdera Playground 🤖

This starter project makes Claude absolutely *giddy* at how fast it can nearly oneshot complex full-stack features in Lamdera. It's like giving a race car driver a perfectly tuned Formula 1 instead of a rusty bicycle.

### What We Built (And Got Slightly Carried Away With)

We might have been a bit... thorough... in our infrastructure setup:

- **Auth That Actually Works**: Auth0 + Google signin because we're tired of reinventing this wheel
- **RPC System**: JSON endpoints that handle the boring HTTP stuff for you
- **Polling Jobs**: For long-running tasks that need progress updates
- **Admin Dashboard**: Because sometimes you need to peek under the hood
- **Rights/Permissions**: Role-based access that's actually usable
- **Task Chains**: Clean async operations without the usual headaches
- **Proper Logging**: Slack integration so you know what's happening

### Example Features (And Why We Bothered)

**Dark Mode Toggle** - Because every app needs dark mode or users revolt
- Complete implementation checklist in `docs/`
- Shows full frontend ↔ backend state sync
- Proves the type system catches everything (unlike your bugs)

**Crypto Price Fetcher** - The most overengineered "Hello World" ever
- Fetches ETH price, converts to ZAR, waits dramatically, gets OpenAI to roast the price
- Demonstrates task chains, HTTP calls, delays, and API integration
- Exists purely to show off how clean async code can be

**Authentication Flow** - Because "trust me bro" isn't a security model
- Google + Auth0 integration with proper session handling
- Role-based permissions that actually work
- Admin tools for managing users (and banning the inevitable trolls)

### Why Claude Loves This Setup

The secret sauce isn't the code (though it's pretty decent) - it's that Claude can actually understand and extend this architecture without having an existential crisis:

- **Types Tell Stories**: Everything's in `Types.elm` so Claude knows exactly what exists
- **Patterns Everywhere**: Consistent message flows, task chains, and RPC patterns
- **Working Examples**: Claude can copy-paste-modify instead of inventing from scratch
- **Clear Structure**: Pages/, Components/, auth/, fusion/ - even an AI can navigate this
- **Compiler as Co-pilot**: Red squiggles guide Claude to every spot that needs attention

### Quick Start (If You're Human)

```bash
# Pray the dependencies work
./compile.sh

# Cross your fingers
lamdera live
```

### Adding Features (The Claude Way)

1. Describe what you want to Claude
2. Watch it add types to `Types.elm` 
3. Marvel as it follows compiler errors like breadcrumbs
4. Occasionally fix the one thing it missed
5. Pretend you could have done it that fast yourself

The real magic is that Claude knows this codebase well enough to nearly oneshot complex features. It's like having a senior developer who never gets tired, never argues about code style, and doesn't steal your lunch from the office fridge.

### Fair Warning

This starter comes with more infrastructure than your typical "Hello World" needs. We got a bit enthusiastic and built the kitchen sink. It's like getting a Swiss Army knife when you asked for a bottle opener.

But hey, now you can skip all the tedious setup work and jump straight to building the interesting parts of your app! 