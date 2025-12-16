export class Message {
  id: string;
  content: string;
  sender: string;
  senderId: string;
  timestamp: Date;
  type: 'message' | 'join' | 'leave';
  room?: string;
}

export class User {
  id: string;
  username: string;
  socketId: string;
  room: string;
  joinedAt: Date;
}