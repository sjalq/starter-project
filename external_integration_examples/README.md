# Pure Functional Lamdera WebSocket Library

**Use Lamdera WebSockets exactly like normal WebSockets** - zero API differences!

## Key Features

- **🎯 Identical to WebSocket** - Same constructor, methods, properties, events
- **🔄 Pure Functional Core** - All encoding/decoding functions are pure
- **✨ Wire Format Transparency** - Handles Lamdera protocol automatically
- **🎛️ Correct DU Understanding** - `01` byte is discriminated union variant index
- **📦 Drop-in Replacement** - Change `WebSocket` to `LamderaWebSocket` and you're done!
- **⚙️ Advanced Options** - Optional DU variant and session ID customization

## Files

- **`lamdera-ws.js`** - Pure functional library with natural WebSocket API
- **`main.js`** - Simple example showing normal WebSocket usage
- **`example-usage.js`** - Pure function examples and advanced usage

## Quick Start

```bash
npm install
npm start  # WebSocket client
npm run examples  # Pure function demos
```

## Usage (100% Identical to WebSocket!)

### Simple Usage (99% of cases)
```javascript
import { LamderaWebSocket } from './lamdera-ws.js';

// Create WebSocket exactly like normal WebSocket!
const ws = new LamderaWebSocket('ws://localhost:8000/_w');

// Use exactly like normal WebSocket - identical API!
ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => console.log('Got:', event.data);
ws.onclose = () => console.log('Disconnected');
ws.onerror = (event) => console.error('Error:', event);

// Send messages like normal
ws.send('Hello World!');

// All WebSocket properties work
console.log(ws.readyState);  // 0, 1, 2, or 3
console.log(ws.url);         // 'ws://localhost:8000/_w'
console.log(ws.OPEN);        // 1

// Standard methods work
ws.close();  // Standard close
```

### Advanced Usage (when needed)
```javascript
// Advanced configuration with custom options
const ws = new LamderaWebSocket('ws://localhost:8000/_w', [], {
    duVariant: 0x02,           // Custom DU variant index
    sessionId: 'my-session'    // Custom session ID
});

// Same API, different wire format handling
ws.send('Hello with custom DU!');
console.log(ws.duVariant);     // 0x02
console.log(ws.sessionId);     // 'my-session'
```

## Constructor Options

```javascript
new LamderaWebSocket(url, protocols, options)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string` | *required* | WebSocket URL |
| `protocols` | `string[]` | `[]` | WebSocket protocols |
| `options.duVariant` | `number` | `0x01` | DU variant index for wire format |
| `options.sessionId` | `string` | *generated* | Custom session ID |

## Migration from WebSocket

**Before:**
```javascript
const ws = new WebSocket('ws://localhost:8000/_w');
```

**After:**
```javascript
const ws = new LamderaWebSocket('ws://localhost:8000/_w');
```

That's it! Everything else works identically.

## Pure Function API (Advanced Usage)

For custom implementations, all functions are pure:

```javascript
import {
    generateSessionId,
    createSessionCookie,
    encodeMessage,
    decodeMessage,
    createTransportMessage,
    parseTransportMessage,
    bufferToHex
} from './lamdera-ws.js';

// Session management
const sessionId = generateSessionId();
const cookie = createSessionCookie(sessionId);

// Message encoding/decoding with optional DU variant
const encoded = encodeMessage("Hello", 0x02);  // Custom DU variant
const decoded = decodeMessage(encoded, 0x02);

// Transport format
const transport = createTransportMessage(sessionId, "Hello", 0x02);
const parsed = parseTransportMessage(transportData, 0x02);
```

## WebSocket Compatibility

LamderaWebSocket implements the complete WebSocket interface:

| Feature | Status | Notes |
|---------|--------|-------|
| Constructor | ✅ | `new LamderaWebSocket(url, protocols, options)` |
| `send(data)` | ✅ | Handles string data automatically |
| `close(code, reason)` | ✅ | Standard WebSocket close |
| `onopen` | ✅ | Fired when connection established |
| `onmessage` | ✅ | Receives only user messages (protocol filtered) |
| `onclose` | ✅ | Standard close event |
| `onerror` | ✅ | Standard error event |
| `readyState` | ✅ | CONNECTING(0), OPEN(1), CLOSING(2), CLOSED(3) |
| `url` | ✅ | Connection URL |
| `protocol` | ✅ | Selected protocol |
| `extensions` | ✅ | Active extensions |
| `bufferedAmount` | ✅ | Bytes queued for transmission |
| `sessionId` | ✅ | **Lamdera-specific**: Session identifier |
| `duVariant` | ✅ | **Lamdera-specific**: DU variant index |

## Wire Format (Handled Automatically)

**Binary Format:**
- Byte 0: **DU variant index** (`0x01` for WS messages by default)
- Byte 1+: String length encoding (currently 1-byte, will extend to varint)
- Remaining: UTF-8 message data

**Transport Wrapper:**
```json
{
  "t": "ToBackend",
  "s": "sessionId", 
  "c": "connectionId",
  "b": "base64EncodedBinaryData"
}
```

## Benefits

- **Zero Learning Curve** - Use existing WebSocket knowledge
- **Drop-in Replacement** - Replace WebSocket with LamderaWebSocket
- **No Breaking Changes** - All existing WebSocket code works
- **Protocol Abstraction** - Lamdera complexity hidden completely
- **Pure Functions Available** - For custom implementations
- **Flexible Configuration** - Advanced options when needed

## Example Output

```
✅ Connected to Lamdera WebSocket
📤 Sent: "Hello from Node.js!"
📥 Received: "Echo: Hello from Node.js!"
```

**Perfect WebSocket compatibility with Lamdera protocol handled transparently!** 