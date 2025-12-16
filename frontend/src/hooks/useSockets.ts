import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import type { Message, User } from "../types/chat";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/socket-events";

export function useSocket() {
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    const s: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      import.meta.env.SOCKET_URL || "http://localhost:3000",
      { transports: ["websocket"] }
    );

    socketRef.current = s;

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));

    s.on("rooms", setRooms);
    s.on("userData", setCurrentUser);
    s.on("previousMessages", setMessages);
    s.on("message", (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, []);

  const joinRoom = (username: string, room: string) => {
    socketRef?.current?.emit("join", { username, room });
  };

  const sendMessage = (content: string) => {
    if (!currentUser) return;

    socketRef?.current?.emit("message", {
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
