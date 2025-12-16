import { useEffect, useRef, useState } from 'react';
import type { Message } from '../../types/chat';

export function ChatMessages({ messages }: { messages: Message[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const isAtBottom =
      el.scrollHeight - el.scrollTop <= el.clientHeight + 20;

    setAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages, autoScroll]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto border rounded p-3 space-y-2"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`
            transition-all duration-300 ease-out
            animate-fadeIn
            ${msg.sender === 'System'
              ? 'text-center text-gray-500 italic'
              : ''}
          `}
        >
          {msg.sender !== 'System' && (
            <span className="font-semibold">{msg.sender}:</span>
          )}

          {msg.sender === 'System' ? (
            <div className="text-center text-xs text-gray-400 italic animate-fadeIn">
              {msg.content}
            </div>
          ) : (
            <> {msg.content} </>
          )}

          {msg.sender !== 'System' && (
            <span className="text-xs text-gray-500 ml-2">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
