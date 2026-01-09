/**
 * ChatWidget Component
 *
 * Floating chatbot widget with toggle button and chat panel
 * Integrates with RAG backend for textbook Q&A
 * Supports text selection for contextual help
 */

import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import TextSelectionHandler from './TextSelectionHandler';
import styles from './ChatWidget.module.css';

export default function ChatWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState<string | undefined>(undefined);
  const [sourceChapter, setSourceChapter] = useState<string | undefined>(undefined);

  const handleOpenChatWithSelection = (text: string, chapter: string) => {
    setSelectedText(text);
    setSourceChapter(chapter);
    setIsOpen(true);

    // Clear selection context after opening (will be used once)
    setTimeout(() => {
      setSelectedText(undefined);
      setSourceChapter(undefined);
    }, 100);
  };

  return (
    <div className={styles.chatWidget}>
      {/* Text Selection Handler */}
      <TextSelectionHandler onOpenChatWithSelection={handleOpenChatWithSelection} />

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
      {isOpen && (
        <ChatPanel
          onClose={() => setIsOpen(false)}
          selectedText={selectedText}
          sourceChapter={sourceChapter}
        />
      )}
    </div>
  );
}
