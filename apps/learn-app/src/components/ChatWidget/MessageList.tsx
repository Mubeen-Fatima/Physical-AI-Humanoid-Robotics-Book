/**
 * MessageList Component
 *
 * Displays conversation history with user and assistant messages
 * Renders source citations as clickable links
 */

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './types';
import styles from './ChatWidget.module.css';

interface MessageListProps {
  messages: ChatMessage[];
}

export default function MessageList({
  messages,
}: MessageListProps): JSX.Element {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>👋 Hi! I'm your Physical AI textbook assistant.</p>
        <p>Ask me anything about the book content!</p>
      </div>
    );
  }

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.role === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <div className={styles.messageContent}>
            <div className={styles.messageRole}>
              {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
            </div>
            <div className={styles.messageText}>{message.content}</div>

            {/* Render sources if available */}
            {message.sources && message.sources.length > 0 && (
              <div className={styles.sources}>
                <div className={styles.sourcesHeader}>📚 Sources:</div>
                <ul className={styles.sourcesList}>
                  {message.sources.map((source, index) => (
                    <li key={index} className={styles.sourceItem}>
                      <a
                        href={source.url}
                        className={styles.sourceLink}
                        target="_self"
                      >
                        {source.chapter} - {source.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.messageTime}>
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
