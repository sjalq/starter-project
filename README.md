# Lamdera WebSocket

Pure functional WebSocket library for Lamdera with transparent wire format handling.

## Installation

```bash
npm install lamdera-websocket
```

For Node.js environments, also install the ws package:
```bash
npm install ws
```

## Usage

### Basic Usage

```javascript
import { LamderaWebSocket } from 'lamdera-websocket';

const ws = new LamderaWebSocket('wss://your-lamdera-app.com');

ws.onopen = () => {
    console.log('Connected to Lamdera');
    ws.send('Hello Lamdera!');
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);
};

ws.onclose = () => {
    console.log('Disconnected');
};
```

### TypeScript Usage

```typescript
import { LamderaWebSocket, LamderaWebSocketOptions } from 'lamdera-websocket';

const options: LamderaWebSocketOptions = {
    sessionId: 'custom-session-id',
    duVariant: 0x01
};

const ws = new LamderaWebSocket('wss://your-app.com', [], options);
```

### Advanced Usage

```javascript
import { 
    LamderaWebSocket,
    generateSessionId,
    createSessionCookie,
    extractSessionFromCookie,
    getBrowserCookie,
    encodeMessage,
    decodeMessage
} from 'lamdera-websocket';

// Generate custom session
const sessionId = generateSessionId();
const cookie = createSessionCookie(sessionId);

// Extract session from existing cookie
const existingCookie = 'sid=12345; other=value';
const extractedSession = extractSessionFromCookie(existingCookie);

// Get browser cookie (browser only)
const browserCookie = getBrowserCookie();

// Create WebSocket with existing cookie
const ws = new LamderaWebSocket('wss://app.com', [], { 
    cookie: 'sid=existing-session' 
});

// Manual encoding/decoding
const encoded = encodeMessage('test message');
const decoded = decodeMessage(encoded);
```

## API Reference

### LamderaWebSocket

Drop-in replacement for native WebSocket with Lamdera wire format support.

**Constructor:**
- `url`: WebSocket URL
- `protocols`: Optional protocols array
- `options`: Optional configuration object
  - `sessionId`: Custom session ID
  - `cookie`: Full cookie string (extracts session ID automatically)
  - `duVariant`: Custom DU variant (default: 0x01)

**Methods:**
- `send(data)`: Send message
- `close(code?, reason?)`: Close connection

**Properties:**
- `readyState`: Connection state
- `onopen`, `onmessage`, `onclose`, `onerror`: Event handlers

### Utility Functions

- `generateSessionId()`: Generate random session ID
- `createSessionCookie(sessionId?)`: Create session cookie
- `extractSessionFromCookie(cookieString)`: Extract session ID from cookie string
- `getBrowserCookie()`: Get browser's document.cookie (browser only)
- `encodeMessage(message, duVariant?)`: Encode to Lamdera format
- `decodeMessage(buffer, expectedDuVariant?)`: Decode from Lamdera format

## Environment Support

- **Browser**: Uses native WebSocket
- **Node.js**: Uses 'ws' package (install separately)

## Wire Format

Handles Lamdera's binary wire format transparently:
- Byte 0: DU variant index
- Byte 1+: String length encoding
- Remaining: UTF-8 message data

## License

MIT 