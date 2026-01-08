/**
 * Type definitions for ChatWidget components
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  timestamp: Date;
}

export interface ChatSource {
  chapter: string;
  heading: string;
  url: string;
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  response: string;
  sources: ChatSource[];
  conversation_id: string;
}

export interface ChatSelectedRequest extends ChatRequest {
  selected_text: string;
  source_chapter: string;
}

export interface ConversationContext {
  messages: ChatMessage[];
  conversation_id: string;
  created_at: Date;
}
