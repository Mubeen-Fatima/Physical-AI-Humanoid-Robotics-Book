/**
 * ChatWidget Component
 *
 * Floating chatbot widget with toggle button and chat panel
 * Integrates with RAG backend for textbook Q&A
 */

import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import styles from './ChatWidget.module.css';

export default function ChatWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.chatWidget}>
      {/* Floating Chat Button */}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        title={isOpen ? 'Close chat' : 'Ask a question'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Panel (conditionally rendered) */}
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
}
