import { useState } from 'react';

interface Props {
  rooms: string[];
  onJoin: (username: string, room: string) => void;
}

export function JoinForm({ rooms, onJoin }: Props) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Entrar no Chat</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Seu nome"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {/* Lista de salas */}
      {rooms.length > 0 && (
        <select
          className="w-full p-2 border rounded"
          onChange={e => setRoom(e.target.value)}
          value={room}
        >
          <option value="">Selecione uma sala</option>
          {rooms.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      )}

      {/* Criar nova sala */}
      <input
        className="w-full p-2 border rounded"
        placeholder="Ou digite o nome da sala"
        value={room}
        onChange={e => setRoom(e.target.value)}
      />

      <button
        disabled={!username || !room}
        onClick={() => onJoin(username, room)}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        Entrar
      </button>
    </div>
  );
}
