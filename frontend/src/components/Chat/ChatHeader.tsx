import type { User } from '../../types/chat';

export function ChatHeader({ user }: { user: User }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">
        {user.username} — {user.room || 'Sala Principal'}
      </h1>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Sair
      </button>
    </div>
  );
}
