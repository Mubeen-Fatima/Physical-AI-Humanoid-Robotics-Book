/**
 * ChatPanel Component
 *
 * Main chat interface with message history, input, and rate limit warnings
 */

import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import { sendChatMessage, sendSelectedTextQuery } from './api';
import { ChatMessage, ConversationContext } from './types';
import { rateLimiter } from './RateLimiter';
import styles from './ChatWidget.module.css';

interface ChatPanelProps {
  onClose: () => void;
  selectedText?: string;
  sourceChapter?: string;
}

export default function ChatPanel({
  onClose,
  selectedText,
  sourceChapter,
}: ChatPanelProps): JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [requestCount, setRequestCount] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [contextText, setContextText] = useState<string | undefined>(undefined);
  const [contextChapter, setContextChapter] = useState<string | undefined>(undefined);

  // Handle selected text context
  useEffect(() => {
    if (selectedText && sourceChapter) {
      setContextText(selectedText);
      setContextChapter(sourceChapter);
      setInput(`Can you explain: "${selectedText.substring(0, 100)}${selectedText.length > 100 ? '...' : ''}"`);
    }
  }, [selectedText, sourceChapter]);

  // Load conversation from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem('chatConversation');
    if (stored) {
      try {
        const context: ConversationContext = JSON.parse(stored);
        setMessages(
          context.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
        setConversationId(context.conversation_id);
      } catch (e) {
        console.error('Failed to load conversation:', e);
      }
    }
  }, []);

  // Save conversation to session storage
  useEffect(() => {
    if (messages.length > 0) {
      const context: ConversationContext = {
        messages,
        conversation_id: conversationId,
        created_at: new Date(),
      };
      sessionStorage.setItem('chatConversation', JSON.stringify(context));
    }
  }, [messages, conversationId]);

  // Update rate limit status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount(rateLimiter.getRequestCount());
      setQueueLength(rateLimiter.getQueueLength());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      let response;

      // Use selected text endpoint if context is available
      if (contextText && contextChapter) {
        response = await sendSelectedTextQuery({
          message: userMessage.content,
          selected_text: contextText,
          source_chapter: contextChapter,
          conversation_id: conversationId || undefined,
        });
        // Clear context after use
        setContextText(undefined);
        setContextChapter(undefined);
      } else {
        response = await sendChatMessage({
          message: userMessage.content,
          conversation_id: conversationId || undefined,
        });
      }

      // Update conversation ID
      if (!conversationId) {
        setConversationId(response.conversation_id);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        sources: response.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(
        'Failed to get response. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearConversation = () => {
    if (confirm('Clear conversation history?')) {
      setMessages([]);
      setConversationId('');
      sessionStorage.removeItem('chatConversation');
    }
  };

  // Rate limit warnings
  const showWarning = rateLimiter.isApproachingLimit();
  const showError = rateLimiter.isLimitExceeded();

  return (
    <div className={styles.chatPanel}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <h3>Textbook Assistant</h3>
        <div className={styles.headerActions}>
          {messages.length > 0 && (
            <button
              className={styles.clearButton}
              onClick={handleClearConversation}
              title="Clear conversation"
            >
              🗑️
            </button>
          )}
          <button
            className={styles.closeButton}
            onClick={onClose}
            title="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Rate Limit Warning */}
      {showWarning && (
        <div
          className={`${styles.rateLimitBanner} ${
            showError ? styles.rateLimitError : styles.rateLimitWarning
          }`}
        >
          {showError ? (
            <>
              ⏱️ Rate limit reached ({requestCount}/15 requests per minute).
              {queueLength > 0 && ` ${queueLength} queued.`}
            </>
          ) : (
            <>
              ⚠️ Approaching rate limit ({requestCount}/15 requests per minute)
            </>
          )}
        </div>
      )}

      {/* Messages */}
      <div className={styles.messagesContainer}>
        <MessageList messages={messages} />
      </div>

      {/* Error Message */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Input Area */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.textInput}
          placeholder="Ask about the textbook..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          rows={2}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? '⏳' : '📤'} {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
