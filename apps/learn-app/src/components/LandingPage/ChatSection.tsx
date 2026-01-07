import React, { useState } from 'react';
import styles from './ChatSection.module.css';

export default function ChatSection(): JSX.Element {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    // TODO: Implement actual chat API call
    console.log('Sending message:', input);
    setInput('');
    setIsLoading(false);
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
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
