import { Injectable, Logger } from '@nestjs/common';
import { Message, User } from '../entities/message.entity';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private messages: Message[] = [];
  private users: Map<string, User> = new Map();
  private rooms: Set<string> = new Set();

  addMessage(message: Message): Message {
    this.messages.push(message);
    this.logger.log(`New message from ${message.sender}: ${message.content}`);
    return message;
  }

  addUser(userId: string, user: User): void {
    this.users.set(userId, user);
    this.logger.log(`User joined: ${user.username} (${userId})`);
  }

  removeUser(socketId: string): User | null {
    for (const [userId, user] of this.users.entries()) {
      if (user.socketId === socketId) {
        this.users.delete(userId);
        this.logger.log(`User left: ${user.username}`);
        return user;
      }
    }
    return null;
  }

  getUser(socketId: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.socketId === socketId);
  }

  getUsers(): User[] {
    return Array.from(this.users.values());
  }

  getMessages(room?: string): Message[] {
    if (!room) return this.messages;
    return this.messages.filter(msg => msg.room === room);
  }

  getUsersInRoom(room: string): User[] {
    return this.getUsers().filter(user => user.room === room);
  }

  addRoom(room: string) {
    this.rooms.add(room);
  }

  removeRoomIfEmpty(room: string) {
    const users = this.getUsersInRoom(room);
    if (users.length === 0) {
      this.rooms.delete(room);
    }
  }

  getRooms(): string[] {
    return Array.from(this.rooms);
  }
}