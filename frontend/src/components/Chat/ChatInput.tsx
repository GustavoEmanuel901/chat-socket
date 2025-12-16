import { useState, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';

interface Props {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: Props) {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="relative mt-4">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            width={300}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Botão Emoji */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className="text-2xl hover:scale-110 transition"
          title="Adicionar emoji"
        >
          😀
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Digite uma mensagem..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Botão Enviar */}
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="
                bg-green-600 text-white px-4 py-2 rounded-lg
                transition
                active:scale-95
                hover:bg-green-700
                disabled:opacity-50
            "
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
