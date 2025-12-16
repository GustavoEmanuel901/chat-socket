import { useSocket } from './hooks/useSockets';
import { JoinForm } from './components/Join/JoinForm';
import { ChatHeader } from './components/Chat/ChatHeader';
import { ChatMessages } from './components/Chat/ChatMessages';
import { ChatInput } from './components/Chat/ChatInput';

export default function App() {
  const {
    isConnected,
    currentUser,
    messages,
    joinRoom,
    sendMessage,
    rooms
  } = useSocket();

  if (!isConnected) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Conectando ao servidor...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <JoinForm onJoin={joinRoom} rooms={rooms} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
      <ChatHeader user={currentUser} />
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
