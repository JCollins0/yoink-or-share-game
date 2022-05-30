export const SEND_CHAT_PROTOCOL = 'chat:send';

export type SharedProtocol = 'test:hello' | 'chat:send';

export type ClientProtocol = SharedProtocol;

export type ServerProtocol = SharedProtocol;
