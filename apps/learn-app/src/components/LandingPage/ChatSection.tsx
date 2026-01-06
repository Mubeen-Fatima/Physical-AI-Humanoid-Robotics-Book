import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatSection.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatSection(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thanks for your question! I'm here to help you learn about Physical AI and Robotics. You asked: "${userMessage.content}"`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
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

  return (
    <section className={styles.chatSection}>
      <div className="container">
        <div className={styles.chatContainer}>
          <h2 className={styles.chatTitle}>
            💬 Ask Questions About the Textbook
          </h2>
          <p className={styles.chatSubtitle}>
            Get instant answers about ROS 2, Isaac, Humanoid Robotics, and more
          </p>

          {/* Chat Widget */}
          <div className={styles.chatWidget}>
            {/* Messages Area */}
            {messages.length > 0 && (
              <div className={styles.messagesArea}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.role === 'user'
                        ? styles.messageUser
                        : styles.messageAssistant
                    }`}
                  >
                    <div className={styles.messageBubble}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Box */}
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="Ask anything about Physical AI, ROS 2, Isaac, or Humanoid Robotics..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Questions */}
          {messages.length === 0 && (
            <div className={styles.quickQuestions}>
              <p className={styles.quickQuestionsTitle}>Try asking:</p>
              <div className={styles.quickQuestionsList}>
                <button
                  className={styles.quickQuestionButton}
                  onClick={() =>
                    setInput('What is Physical AI and how is it different from traditional AI?')
                  }
                >
                  What is Physical AI?
                </button>
                <button
                  className={styles.quickQuestionButton}
                  onClick={() => setInput('How do I get started with ROS 2?')}
                >
                  Getting started with ROS 2
                </button>
                <button
                  className={styles.quickQuestionButton}
                  onClick={() =>
                    setInput('What hardware do I need for humanoid robotics?')
                  }
                >
                  Hardware requirements
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
