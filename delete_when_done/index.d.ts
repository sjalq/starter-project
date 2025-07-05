interface LamderaWebSocketOptions {
  duVariant?: number;
  sessionId?: string;
  cookie?: string;
}

interface TransportMessage {
  type: 'message' | 'protocol' | 'error';
  data?: string;
  sessionId?: string;
  connectionId?: string;
  error?: string;
  rawData?: any;
}

interface MessageEvent {
  data: string;
  type: string;
  target: LamderaWebSocket;
  origin: string;
  lastEventId: string;
  source: null;
  ports: never[];
}

interface CloseEvent {
  code: number;
  reason: string;
  wasClean: boolean;
}

interface ErrorEvent {
  type: string;
  error?: Error;
  target: LamderaWebSocket;
}

declare class LamderaWebSocket {
  static readonly CONNECTING: 0;
  static readonly OPEN: 1;
  static readonly CLOSING: 2;
  static readonly CLOSED: 3;

  readonly CONNECTING: 0;
  readonly OPEN: 1;
  readonly CLOSING: 2;
  readonly CLOSED: 3;

  url: string;
  protocols: string | string[];
  readyState: number;
  bufferedAmount: number;
  extensions: string;
  protocol: string;

  onopen: ((event: Event) => void) | null;
  onmessage: ((event: MessageEvent) => void) | null;
  onclose: ((event: CloseEvent) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;

  constructor(url: string, protocols?: string | string[], options?: LamderaWebSocketOptions);

  send(data: string): void;
  close(code?: number, reason?: string): void;
}

declare function generateSessionId(): string;
declare function createSessionCookie(sessionId?: string): string;
declare function extractSessionFromCookie(cookieString: string): string | null;
declare function getBrowserCookie(): string | null;
declare function encodeMessage(message: string, duVariant?: number): Buffer;
declare function decodeMessage(buffer: Buffer, expectedDuVariant?: number): string | null;
declare function createTransportMessage(sessionId: string, message: string, duVariant?: number): string;
declare function parseTransportMessage(data: string | Buffer, expectedDuVariant?: number): TransportMessage;
declare function bufferToHex(buffer: Buffer): string;
declare function createLamderaWebSocket(url: string, sessionId?: string): Promise<LamderaWebSocket>;

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
  createLamderaWebSocket,
  LamderaWebSocketOptions,
  TransportMessage,
  MessageEvent,
  CloseEvent,
  ErrorEvent
}; 