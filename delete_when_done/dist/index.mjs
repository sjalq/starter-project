const generateSessionId = () => {
    const randomNum = Math.floor(Math.random() * 990000) + 10000;
    return randomNum.toString().padEnd(40, 'c04b8f7b594cdeedebc2a8029b82943b0a620815');
};

const createSessionCookie = (sessionId = generateSessionId()) => `sid=${sessionId}`;

const extractSessionFromCookie = (cookieString) => {
    const match = cookieString.match(/sid=([^;]+)/);
    return match ? match[1] : null;
};

const getBrowserCookie = () => {
    if (typeof document !== 'undefined' && document.cookie) {
        return document.cookie;
    }
    return null;
};

const encodeMessage = (message, duVariant = 0x01) => {
    const messageBuffer = Buffer.from(message, 'utf8');
    const length = messageBuffer.length;
    
    if (length > 255) {
        throw new Error(`Message too long (${length} bytes). Varint encoding not yet implemented.`);
    }
    
    return Buffer.concat([
        Buffer.from([duVariant]),
        Buffer.from([length]),
        messageBuffer
    ]);
};

const decodeMessage = (buffer, expectedDuVariant = 0x01) => {
    if (buffer.length < 2) return null;
    if (buffer.readUInt8(0) !== expectedDuVariant) return null;
    
    const length = buffer.readUInt8(1);
    if (buffer.length < 2 + length) return null;
    
    return buffer.slice(2, 2 + length).toString('utf8');
};

const createTransportMessage = (sessionId, message, duVariant = 0x01) => {
    const encoded = encodeMessage(message, duVariant);
    return JSON.stringify({
        t: 'ToBackend',
        s: sessionId,
        c: sessionId,
        b: encoded.toString('base64')
    });
};

const parseTransportMessage = (data, expectedDuVariant = 0x01) => {
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

const bufferToHex = (buffer) => 
    Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');

const getWebSocketImpl = async () => {
    if (typeof window !== 'undefined' && window.WebSocket) {
        return window.WebSocket;
    }
    
    try {
        const ws = await import('ws');
        return ws.default || ws;
    } catch (e) {
        throw new Error('WebSocket implementation not available. Install "ws" package for Node.js environments.');
    }
};

class LamderaWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    constructor(url, protocols = [], options = {}) {
        this.url = url;
        this.protocols = protocols;
        
        this.duVariant = options.duVariant || 0x01;
        
        if (options.cookie) {
            this.sessionId = extractSessionFromCookie(options.cookie) || generateSessionId();
            this.cookie = options.cookie;
        } else if (options.sessionId) {
            this.sessionId = options.sessionId;
            this.cookie = createSessionCookie(this.sessionId);
        } else {
            this.sessionId = generateSessionId();
            this.cookie = createSessionCookie(this.sessionId);
        }
        
        this.readyState = LamderaWebSocket.CONNECTING;
        this.bufferedAmount = 0;
        this.extensions = '';
        this.protocol = '';
        
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        
        this._ws = null;
        this._messageQueue = [];
        this._isReady = false;
        
        this._initWebSocket();
    }
    
    async _initWebSocket() {
        try {
            const WebSocketImpl = await getWebSocketImpl();
            
            const wsOptions = (typeof window === 'undefined') 
                ? { headers: { 'Cookie': this.cookie } }
                : undefined;
                
            this._ws = new WebSocketImpl(this.url, this.protocols, wsOptions);
            
            this._ws.onopen = (event) => {
                this.readyState = LamderaWebSocket.OPEN;
                this._isReady = true;
                
                while (this._messageQueue.length > 0) {
                    const message = this._messageQueue.shift();
                    this._ws.send(message);
                }
                
                if (this.onopen) this.onopen(event);
            };
            
            this._ws.onmessage = (event) => {
                const parsed = parseTransportMessage(event.data, this.duVariant);
                
                if (parsed.type === 'message' && this.onmessage) {
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
            };
            
            this._ws.onclose = (event) => {
                this.readyState = LamderaWebSocket.CLOSED;
                if (this.onclose) this.onclose(event);
            };
            
            this._ws.onerror = (event) => {
                if (this.onerror) this.onerror(event);
            };
            
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
    
    send(data) {
        if (this.readyState === LamderaWebSocket.CONNECTING) {
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
            this.readyState = LamderaWebSocket.CLOSED;
        }
    }
    
    get CONNECTING() { return LamderaWebSocket.CONNECTING; }
    get OPEN() { return LamderaWebSocket.OPEN; }
    get CLOSING() { return LamderaWebSocket.CLOSING; }
    get CLOSED() { return LamderaWebSocket.CLOSED; }
}

const createLamderaWebSocket = async (url, sessionId = generateSessionId()) => {
    return new LamderaWebSocket(url, [], { sessionId });
};

export {
LamderaWebSocket,
    generateSessionId,
    createSessionCookie,
    extractSessionFromCookie,
    getBrowserCookie,
    encodeMessage,
    decodeMessage,
    createTransportMessage,
    parseTransportMessage,
    bufferToHex,
    createLamderaWebSocket
}; 