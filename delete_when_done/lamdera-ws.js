/**
 * Pure Functional Lamdera WebSocket Library
 * 
 * Provides a WebSocket class that works exactly like normal WebSocket
 * but handles Lamdera's wire format transparently.
 * 
 * Wire Format:
 * - Byte 0: DU variant index (0x01 for WS messages by default)
 * - Byte 1+: String length encoding (varint/multi-byte)
 * - Remaining: UTF-8 message data
 */

// Pure functions for session management
export const generateSessionId = () => {
    const randomNum = Math.floor(Math.random() * 990000) + 10000;
    return randomNum.toString().padEnd(40, 'c04b8f7b594cdeedebc2a8029b82943b0a620815');
};

export const createSessionCookie = (sessionId = generateSessionId()) => `sid=${sessionId}`;

// Pure functions for message encoding/decoding
export const encodeMessage = (message, duVariant = 0x01) => {
    const messageBuffer = Buffer.from(message, 'utf8');
    const length = messageBuffer.length;
    
    // For now, use 1-byte length (will extend to varint later)
    if (length > 255) {
        throw new Error(`Message too long (${length} bytes). Varint encoding not yet implemented.`);
    }
    
    return Buffer.concat([
        Buffer.from([duVariant]),    // DU variant index (parameterized)
        Buffer.from([length]),       // String length (TODO: make varint)
        messageBuffer                // UTF-8 message data
    ]);
};

export const decodeMessage = (buffer, expectedDuVariant = 0x01) => {
    if (buffer.length < 2) return null;
    
    // Check DU variant index
    if (buffer.readUInt8(0) !== expectedDuVariant) return null;
    
    // Read length (for now assume 1 byte, TODO: implement varint)
    const length = buffer.readUInt8(1);
    if (buffer.length < 2 + length) return null;
    
    // Extract message
    return buffer.slice(2, 2 + length).toString('utf8');
};

// Pure functions for transport format
export const createTransportMessage = (sessionId, message, duVariant = 0x01) => {
    const encoded = encodeMessage(message, duVariant);
    return JSON.stringify({
        t: 'ToBackend',
        s: sessionId,
        c: sessionId,
        b: encoded.toString('base64')
    });
};

export const parseTransportMessage = (data, expectedDuVariant = 0x01) => {
    try {
        const parsed = JSON.parse(data.toString('utf8'));
        
        if (parsed.b) {
            const binaryData = Buffer.from(parsed.b, 'base64');
            const message = decodeMessage(binaryData, expectedDuVariant);
            
            if (message !== null) {
                return {
                    type: 'message',
                    data: message,
                    sessionId: parsed.s,
                    connectionId: parsed.c
                };
            }
        }
        
        return {
            type: 'protocol',
            data: parsed,
            sessionId: parsed.s,
            connectionId: parsed.c
        };
        
    } catch (e) {
        return {
            type: 'error',
            error: e.message,
            rawData: data
        };
    }
};

// Utility function
export const bufferToHex = (buffer) => 
    Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');

// WebSocket class that works exactly like normal WebSocket
export class LamderaWebSocket {
    // WebSocket constants (exactly like real WebSocket)
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    constructor(url, protocols = [], options = {}) {
        this.url = url;
        this.protocols = protocols;
        
        // Advanced options with simple defaults
        this.duVariant = options.duVariant || 0x01;
        this.sessionId = options.sessionId || generateSessionId();
        
        // WebSocket interface properties
        this.readyState = LamderaWebSocket.CONNECTING;
        this.bufferedAmount = 0;
        this.extensions = '';
        this.protocol = '';
        
        // Event handlers (exactly like WebSocket)
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        
        // Internal state
        this._ws = null;
        this._messageQueue = [];
        this._isReady = false;
        
        // Initialize WebSocket asynchronously
        this._initWebSocket();
    }
    
    async _initWebSocket() {
        try {
            // Handle both browser and Node.js environments
            const WebSocketImpl = (typeof window !== 'undefined') 
                ? window.WebSocket 
                : (await import('ws')).default;
            
            // Create actual WebSocket with session cookie
            const wsOptions = (typeof window === 'undefined') 
                ? { headers: { 'Cookie': createSessionCookie(this.sessionId) } }
                : undefined;
                
            this._ws = new WebSocketImpl(this.url, this.protocols, wsOptions);
            
            // Forward WebSocket events
            this._ws.onopen = (event) => {
                this.readyState = LamderaWebSocket.OPEN;
                this._isReady = true;
                
                // Send any queued messages
                while (this._messageQueue.length > 0) {
                    const message = this._messageQueue.shift();
                    this._ws.send(message);
                }
                
                if (this.onopen) this.onopen(event);
            };
            
            this._ws.onmessage = (event) => {
                const parsed = parseTransportMessage(event.data, this.duVariant);
                
                if (parsed.type === 'message' && this.onmessage) {
                    // Create standard MessageEvent-like object
                    this.onmessage({
                        data: parsed.data,
                        type: 'message',
                        target: this,
                        origin: event.origin || '',
                        lastEventId: '',
                        source: null,
                        ports: []
                    });
                }
                // Protocol messages are handled silently
            };
            
            this._ws.onclose = (event) => {
                this.readyState = LamderaWebSocket.CLOSED;
                if (this.onclose) this.onclose(event);
            };
            
            this._ws.onerror = (event) => {
                if (this.onerror) this.onerror(event);
            };
            
            // Sync readyState with underlying WebSocket
            const syncReadyState = () => {
                if (this._ws) {
                    this.readyState = this._ws.readyState;
                    this.bufferedAmount = this._ws.bufferedAmount || 0;
                }
                if (this.readyState !== LamderaWebSocket.CLOSED) {
                    setTimeout(syncReadyState, 100);
                }
            };
            syncReadyState();
            
        } catch (error) {
            this.readyState = LamderaWebSocket.CLOSED;
            if (this.onerror) {
                this.onerror({ 
                    type: 'error', 
                    error, 
                    target: this 
                });
            }
        }
    }
    
    // WebSocket methods (exactly like real WebSocket)
    send(data) {
        if (this.readyState === LamderaWebSocket.CONNECTING) {
            // Queue message until connection is ready
            const transportMessage = createTransportMessage(this.sessionId, data, this.duVariant);
            this._messageQueue.push(transportMessage);
            return;
        }
        
        if (this.readyState !== LamderaWebSocket.OPEN) {
            throw new Error(`WebSocket is not open: readyState ${this.readyState}`);
        }
        
        const transportMessage = createTransportMessage(this.sessionId, data, this.duVariant);
        this._ws.send(transportMessage);
    }
    
    close(code, reason) {
        this.readyState = LamderaWebSocket.CLOSING;
        if (this._ws) {
            this._ws.close(code, reason);
        } else {
            // If WebSocket isn't ready yet, mark as closed
            this.readyState = LamderaWebSocket.CLOSED;
        }
    }
    
    // Make constants available on instances too (like real WebSocket)
    get CONNECTING() { return LamderaWebSocket.CONNECTING; }
    get OPEN() { return LamderaWebSocket.OPEN; }
    get CLOSING() { return LamderaWebSocket.CLOSING; }
    get CLOSED() { return LamderaWebSocket.CLOSED; }
}

// Legacy function for backwards compatibility
export const createLamderaWebSocket = async (url, sessionId = generateSessionId()) => {
    return new LamderaWebSocket(url);
};

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LamderaWebSocket,
        generateSessionId,
        createSessionCookie,
        encodeMessage,
        decodeMessage,
        createTransportMessage,
        parseTransportMessage,
        bufferToHex,
        createLamderaWebSocket
    };
} 