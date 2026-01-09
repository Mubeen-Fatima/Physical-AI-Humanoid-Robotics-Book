/**
 * TextSelectionHandler Component
 *
 * Detects text selection and shows "Ask about this" tooltip
 * Opens chat with selected text context when clicked
 */

import React, { useState, useEffect, useRef } from 'react';
import { sendSelectedTextQuery } from './api';
import styles from './ChatWidget.module.css';

interface TextSelectionHandlerProps {
  onOpenChatWithSelection: (text: string, chapter: string) => void;
}

interface TooltipPosition {
  x: number;
  y: number;
}

export default function TextSelectionHandler({
  onOpenChatWithSelection,
}: TextSelectionHandlerProps): JSX.Element {
  const [selectedText, setSelectedText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const [sourceChapter, setSourceChapter] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0 && text.length <= 500) {
        // Get selection rectangle for tooltip positioning
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          // Position tooltip above selection
          setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY - 10,
          });
          setSelectedText(text);

          // Try to determine source chapter from URL or DOM
          const chapter = getCurrentChapter();
          setSourceChapter(chapter);
        }
      } else {
        // Clear tooltip if selection is empty or too long
        setTooltipPosition(null);
        setSelectedText('');
      }
    };

    // Listen for selection changes
    document.addEventListener('selectionchange', handleSelection);
    document.addEventListener('mouseup', handleSelection);

    return () => {
      document.removeEventListener('selectionchange', handleSelection);
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  // Click outside tooltip to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        const selection = window.getSelection();
        if (!selection?.toString().trim()) {
          setTooltipPosition(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentChapter = (): string => {
    // Extract chapter from URL path
    const path = window.location.pathname;
    const match = path.match(/\/docs\/([^/]+\/[^/]+)/);
    if (match) {
      return match[1].replace(/\/$/, ''); // Remove trailing slash
    }

    // Fallback: try to find chapter from article header
    const article = document.querySelector('article');
    if (article) {
      const heading = article.querySelector('h1');
      if (heading) {
        return heading.textContent || 'unknown';
      }
    }

    return 'unknown';
  };

  const handleTooltipClick = () => {
    if (selectedText && sourceChapter) {
      onOpenChatWithSelection(selectedText, sourceChapter);
      setTooltipPosition(null); // Hide tooltip
      window.getSelection()?.removeAllRanges(); // Clear selection
    }
  };

  if (!tooltipPosition || !selectedText) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={styles.selectionTooltip}
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
      onClick={handleTooltipClick}
    >
      <span className={styles.tooltipIcon}>💬</span>
      <span className={styles.tooltipText}>Ask about this</span>
    </div>
  );
}
