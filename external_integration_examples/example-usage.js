/**
 * Pure Functional Lamdera WebSocket Library Examples
 * 
 * Demonstrates the new LamderaWebSocket class that works exactly like
 * normal WebSocket but handles Lamdera's wire format transparently.
 */

import {
    LamderaWebSocket,
    generateSessionId,
    createSessionCookie,
    encodeMessage,
    decodeMessage,
    createTransportMessage,
    parseTransportMessage,
    bufferToHex
} from './lamdera-ws.js';

console.log('🔬 Pure Functional Lamdera WebSocket Examples\n');

// Example 1: Pure session management
console.log('1️⃣ Session Management:');
const sessionId = generateSessionId();
const sessionCookie = createSessionCookie(sessionId);
console.log(`   Session ID: ${sessionId}`);
console.log(`   Cookie: ${sessionCookie}\n`);

// Example 2: Pure message encoding/decoding  
console.log('2️⃣ Message Encoding/Decoding:');
const testMessage = 'Hello Lamdera!';

// Pure functions - no side effects
const encoded = encodeMessage(testMessage);
const decoded = decodeMessage(encoded);

console.log(`   Original: "${testMessage}"`);
console.log(`   Encoded: ${bufferToHex(encoded)}`);
console.log(`   Format: [DU:${encoded[0].toString(16)}] [length:${encoded[1]}] [data...]`);
console.log(`   Decoded: "${decoded}"`);
console.log(`   Success: ${decoded === testMessage}\n`);

// Example 3: Advanced encoding with custom DU variant
console.log('3️⃣ Custom DU Variant Encoding:');
const customEncoded = encodeMessage(testMessage, 0x02);  // Custom DU variant
const customDecoded = decodeMessage(customEncoded, 0x02);
console.log(`   Custom DU variant: 0x02`);
console.log(`   Encoded: ${bufferToHex(customEncoded)}`);
console.log(`   Decoded: "${customDecoded}"`);
console.log(`   Success: ${customDecoded === testMessage}\n`);

// Example 4: Transport message creation (pure)
console.log('4️⃣ Transport Message Creation:');
const transportMessage = createTransportMessage(sessionId, 'Test transport');
const parsed = JSON.parse(transportMessage);
console.log(`   Transport JSON:`, parsed);
console.log(`   Type: ${parsed.t}`);
console.log(`   Session: ${parsed.s}`);
console.log(`   Base64 data: ${parsed.b}\n`);

// Example 5: Parsing transport messages (pure)
console.log('5️⃣ Transport Message Parsing:');
const sampleMessage = JSON.stringify({
    t: 'ToFrontend',
    s: sessionId,
    c: 'connection123',
    b: Buffer.concat([
        Buffer.from([0x01]), // DU variant index
        Buffer.from([0x05]), // Length: 5  
        Buffer.from('Hello', 'utf8')
    ]).toString('base64')
});

const parsedResult = parseTransportMessage(Buffer.from(sampleMessage));
console.log(`   Parsed result:`, parsedResult);
console.log(`   Type: ${parsedResult.type}`);
console.log(`   Message: "${parsedResult.data}"`);

// Example 6: Simple WebSocket usage (99% of cases)
console.log('\n6️⃣ Simple WebSocket Usage (99% of cases):');
console.log(`
   // Simple - just like normal WebSocket!
   const ws = new LamderaWebSocket('ws://localhost:8000/_w');
   
   // All standard WebSocket API works identically
   ws.onopen = () => console.log('Connected');
   ws.onmessage = (event) => console.log('Got:', event.data);
   ws.send('Hello World!');
`);

// Example 7: Advanced WebSocket usage (when needed)
console.log('7️⃣ Advanced WebSocket Usage (when needed):');
console.log(`
   // Advanced - with custom options
   const ws = new LamderaWebSocket('ws://localhost:8000/_w', [], {
       duVariant: 0x02,           // Custom DU variant
       sessionId: 'my-session'    // Custom session ID
   });
   
   // Same API, different wire format handling
   ws.send('Hello with custom DU!');
`);

// Example 8: WebSocket constants and properties
console.log('8️⃣ WebSocket Compatibility:');
const ws = new LamderaWebSocket('ws://example.com');
console.log(`   Constants: CONNECTING=${ws.CONNECTING}, OPEN=${ws.OPEN}, CLOSING=${ws.CLOSING}, CLOSED=${ws.CLOSED}`);
console.log(`   Initial readyState: ${ws.readyState}`);
console.log(`   URL: ${ws.url}`);
console.log(`   Session ID: ${ws.sessionId}`);
console.log(`   DU Variant: 0x${ws.duVariant.toString(16)}`);
console.log(`   Protocol: "${ws.protocol}"`);
console.log(`   Extensions: "${ws.extensions}"`);
console.log(`   BufferedAmount: ${ws.bufferedAmount}`);

// Example 9: Advanced WebSocket with options
console.log('\n9️⃣ Advanced WebSocket Configuration:');
const advancedWs = new LamderaWebSocket('ws://example.com', [], {
    duVariant: 0x03,
    sessionId: 'advanced-session-123'
});
console.log(`   Advanced Session ID: ${advancedWs.sessionId}`);
console.log(`   Advanced DU Variant: 0x${advancedWs.duVariant.toString(16)}`);

// Example 10: Error handling
console.log('\n🔟 Error Handling:');
try {
    // Test length limit (will be relaxed when varint is implemented)
    const longMessage = 'x'.repeat(256);
    encodeMessage(longMessage);
} catch (error) {
    console.log(`   ✅ Caught expected error: ${error.message}`);
}

// Test invalid DU variant
const invalidBuffer = Buffer.from([0x02, 0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f]); 
const invalidResult = decodeMessage(invalidBuffer, 0x01);  // Expecting 0x01, got 0x02
console.log(`   ✅ Invalid DU variant result: ${invalidResult}`);

// Test valid DU variant
const validResult = decodeMessage(invalidBuffer, 0x02);  // Expecting 0x02, got 0x02
console.log(`   ✅ Valid DU variant result: "${validResult}"`);

console.log('\n✨ WebSocket class examples completed!'); 