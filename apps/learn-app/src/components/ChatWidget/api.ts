/**
 * API client for chat endpoints with retry logic
 */

import { ChatRequest, ChatResponse, ChatSelectedRequest } from './types';
import { rateLimiter } from './RateLimiter';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 2000;

/**
 * Delay utility for retry logic
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Send a chat message with retry logic
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  return rateLimiter.execute(async () => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: ChatResponse = await response.json();
        return data;
      } catch (error) {
        lastError = error as Error;
        console.error(`Chat API attempt ${attempt + 1} failed:`, error);

        if (attempt < MAX_RETRIES) {
          console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
          await delay(RETRY_DELAY_MS);
        }
      }
    }

    throw new Error(
      `Failed to send chat message after ${MAX_RETRIES + 1} attempts: ${
        lastError?.message || 'Unknown error'
      }`
    );
  });
}

/**
 * Send a selected text query with retry logic
 */
export async function sendSelectedTextQuery(
  request: ChatSelectedRequest
): Promise<ChatResponse> {
  return rateLimiter.execute(async () => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/selected`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: ChatResponse = await response.json();
        return data;
      } catch (error) {
        lastError = error as Error;
        console.error(
          `Selected text API attempt ${attempt + 1} failed:`,
          error
        );

        if (attempt < MAX_RETRIES) {
          console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
          await delay(RETRY_DELAY_MS);
        }
      }
    }

    throw new Error(
      `Failed to send selected text query after ${
        MAX_RETRIES + 1
      } attempts: ${lastError?.message || 'Unknown error'}`
    );
  });
}
