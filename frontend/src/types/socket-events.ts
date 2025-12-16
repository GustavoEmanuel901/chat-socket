import type { Message, User } from "./chat";

// socket-events.ts
export interface ServerToClientEvents {
  rooms: (rooms: string[]) => void;
  userData: (user: User) => void;
  message: (message: Message) => void;
  previousMessages: (messages: Message[]) => void;
}

export interface ClientToServerEvents {
  join: (data: { username: string; room: string }) => void;
  message: (data: Omit<Message, 'timestamp'>) => void;
}
