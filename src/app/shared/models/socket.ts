export interface ServerToClientEvents {
  'test:hello': () => void;
  'chat:send': (message: string) => void;
}

export interface ClientToServerEvents {
  'test:hello': () => void;
  'chat:send': (message: string) => void;
}
