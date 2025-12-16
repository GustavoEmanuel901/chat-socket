import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { JoinChatDto } from '../dto/join-chat.dto';
import { TypeMessageEnum } from '../enums/type-message.enum';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    client.emit('rooms', this.chatService.getRooms());
  }

  handleDisconnect(client: Socket) {
    const user = this.chatService.removeUser(client.id);

    if (!user) return;

    const room = user.room;

    const leaveMessage = {
      id: Date.now().toString(),
      content: `${user.username} saiu da sala`,
      sender: 'System',
      senderId: 'system',
      timestamp: new Date(),
      type: TypeMessageEnum.Leave,
      room,
    };

    this.chatService.addMessage(leaveMessage);

    this.server.to(room).emit('message', leaveMessage);
    this.server.to(room).emit('users', this.chatService.getUsersInRoom(room));

    this.chatService.removeRoomIfEmpty(room);

    this.server.emit('rooms', this.chatService.getRooms());

    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() joinData: JoinChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const username = joinData.username.trim();
    const room = joinData.room.trim();

    if (!username || !room) {
      client.emit('error', { message: 'Nome e sala são obrigatórios' });
      return;
    }

    // Remove usuário anterior
    const existingUser = this.chatService.getUser(client.id);
    if (existingUser) {
      client.leave(existingUser.room);
      this.chatService.removeUser(client.id);
      this.chatService.removeRoomIfEmpty(existingUser.room);
    }

    const userId = `user_${Date.now()}`;

    const user = {
      id: userId,
      username,
      socketId: client.id,
      room,
      joinedAt: new Date(),
    };

    // Persistência
    this.chatService.addUser(userId, user);
    this.chatService.addRoom(room);

    client.join(room);

    // Mensagem de sistema
    const joinMessage = {
      id: Date.now().toString(),
      content: `${username} entrou na sala`,
      sender: 'System',
      senderId: 'system',
      timestamp: new Date(),
      type: TypeMessageEnum.Join,
      room,
    };

    this.chatService.addMessage(joinMessage);

    this.server.to(room).emit('message', joinMessage);
    this.server.to(room).emit('users', this.chatService.getUsersInRoom(room));

    this.server.emit('rooms', this.chatService.getRooms());

    client.emit('previousMessages', this.chatService.getMessages(room));

    client.emit('userData', {
      userId,
      username,
      room,
    });

    this.logger.log(`${username} joined room ${room}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.chatService.getUser(client.id);

    if (!user) {
      client.emit('error', 'User not found');
      return;
    }

    const message = {
      id: Date.now().toString(),
      content: createMessageDto.content,
      sender: user.username,
      senderId: user.id,
      timestamp: new Date(),
      type: TypeMessageEnum.Message,
      room: user.room,
    };

    this.chatService.addMessage(message);
    this.server.to(user.room).emit('message', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { username: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.chatService.getUser(client.id);
    if (user) {
      client.broadcast.emit('typing', {
        username: user.username,
        isTyping: data.isTyping,
      });
    }
  }
}
