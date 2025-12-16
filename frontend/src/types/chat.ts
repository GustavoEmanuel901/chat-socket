export interface User {
  username: string;
  room: string;
}

export interface Message {
  sender: string;
  content: string;
  timestamp: string;
  room: string;
}

