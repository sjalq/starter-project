import { LamderaWebSocket } from './lamdera-ws.js';

const WS_URL = 'ws://localhost:8000/_w';

// Main execution - now EXACTLY like normal WebSocket usage!
function main() {
    console.log('🚀 Starting Lamdera WebSocket client...');
    
    // Create WebSocket exactly like normal WebSocket!
    const ws = new LamderaWebSocket(WS_URL);
    
    console.log(`🍪 Session ID: ${ws.sessionId}`);
    
    // Standard WebSocket event handlers - identical to normal WebSocket
    ws.onopen = function(event) {
        console.log('✅ Connected to Lamdera WebSocket');
        
        // Send messages exactly like normal WebSocket
        ws.send('Hello from Node.js!');
        console.log('📤 Sent: "Hello from Node.js!"');
    };

    ws.onmessage = function(event) {
        // Receive messages exactly like normal WebSocket
        console.log(`📥 Received: "${event.data}"`);
    };

    ws.onclose = function(event) {
        console.log('❌ WebSocket connection closed');
    };

    ws.onerror = function(event) {
        console.error('❌ WebSocket error:', event);
    };

    // Send periodic test messages (exactly like normal WebSocket)
    setInterval(() => {
        if (ws.readyState === ws.OPEN) {  // Use WebSocket constants
            const timestamp = new Date().toISOString();
            const message = `Ping at ${timestamp}`;
            
            ws.send(message);
            console.log(`📤 Sent: "${message}"`);
        }
    }, 5000);
}

main(); 