import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import type { Message, User } from '../types/chat';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../types/socket-events';

export function useSocket() {
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | null
  >(null);

  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    const s = io(
      'http://localhost:3001',
      { transports: ['websocket'] }
    );

    s.on('connect', () => setIsConnected(true));
    s.on('disconnect', () => setIsConnected(false));

    s.on('rooms', setRooms);
    s.on('userData', setCurrentUser);
    s.on('previousMessages', setMessages);
    s.on('message', msg =>
      setMessages(prev => [...prev, msg])
    );

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    socket?.emit('join', { username, room });
  };

  const sendMessage = (content: string) => {
    if (!currentUser) return;

    socket?.emit('message', {
      content,
      sender: currentUser.username,
      room: currentUser.room,
    });
  };

  return {
    isConnected,
    currentUser,
    messages,
    rooms,
    joinRoom,
    sendMessage,
  };
}
