"""
RAG (Retrieval-Augmented Generation) Pipeline

Orchestrates the full RAG workflow:
1. Embed user query
2. Search Qdrant for relevant chunks
3. Generate response with Gemini using retrieved context
4. Format response with citations
"""

import logging
from typing import Optional
from dataclasses import dataclass

from app.services.gemini_client import gemini_client
from app.services.qdrant_client import qdrant_store

logger = logging.getLogger(__name__)


@dataclass
class Source:
    """Source citation for a response"""

    chapter: str
    heading: str
    url: str


@dataclass
class RAGResponse:
    """Response from RAG pipeline with citations"""

    response: str
    sources: list[Source]


class RAGService:
    """RAG pipeline for textbook chatbot"""

    def __init__(self):
        """Initialize RAG service with Gemini and Qdrant clients"""
        self.gemini = gemini_client
        self.qdrant = qdrant_store
        self.max_context_chunks = 5

    async def generate_response(
        self,
        query: str,
        conversation_history: Optional[list[dict]] = None,
        selected_text: Optional[str] = None,
        source_chapter: Optional[str] = None,
    ) -> RAGResponse:
        """
        Generate response using RAG pipeline

        Args:
            query: User's question
            conversation_history: Optional list of previous messages
            selected_text: Optional selected text for contextual help
            source_chapter: Optional chapter to prioritize in search

        Returns:
            RAGResponse with answer and sources
        """
        try:
            # Step 1: Generate query embedding
            logger.info(f"Processing query: {query[:100]}...")
            query_embedding = await self.gemini.generate_embedding(query)

            # Step 2: Search Qdrant for relevant chunks
            search_results = await self.qdrant.search(
                query_vector=query_embedding,
                limit=self.max_context_chunks,
                chapter_filter=source_chapter,  # Prioritize source chapter if provided
            )

            if not search_results:
                # No relevant context found
                return self._out_of_scope_response()

            # Step 3: Extract context and sources
            context_texts = []
            sources = []
            seen_sources = set()  # Deduplicate sources

            for result in search_results:
                payload = result["payload"]
                score = result["score"]

                # Only include high-confidence results (score > 0.5)
                if score < 0.5:
                    continue

                # Add context
                chapter = payload.get("chapter", "")
                heading = payload.get("heading", "")
                content = payload.get("content", "")
                context_texts.append(f"[{chapter} - {heading}]\n{content}")

                # Add source (deduplicated by URL)
                url = payload.get("url", "")
                if url not in seen_sources:
                    sources.append(
                        Source(
                            chapter=payload.get("title", chapter),
                            heading=heading,
                            url=url,
                        )
                    )
                    seen_sources.add(url)

            # Step 4: Construct context
            context = "\n\n---\n\n".join(context_texts)

            # Add selected text to context if provided
            if selected_text:
                context = f"Selected text from user:\n{selected_text}\n\n---\n\n{context}"

            # Step 5: Generate response with Gemini
            prompt = self._construct_prompt(query, context, conversation_history)
            response_text = await self.gemini.generate_response(prompt)

            logger.info(f"Generated response with {len(sources)} sources")

            return RAGResponse(response=response_text, sources=sources)

        except Exception as e:
            logger.error(f"RAG pipeline failed: {str(e)}")
            return self._error_response()

    def _construct_prompt(
        self,
        query: str,
        context: str,
        conversation_history: Optional[list[dict]] = None,
    ) -> str:
        """Construct prompt for Gemini with context and history"""

        # Base system instruction
        system_instruction = """You are a helpful teaching assistant for the Physical AI & Humanoid Robotics textbook.

Your role:
- Answer questions based ONLY on the provided textbook context
- Be clear, educational, and encourage learning
- If the question is outside the textbook scope, politely indicate this
- Use examples from the context when helpful
- Keep responses concise but thorough

Context from textbook:
"""

        prompt = f"{system_instruction}\n{context}\n\n"

        # Add conversation history if provided
        if conversation_history:
            prompt += "Previous conversation:\n"
            for msg in conversation_history[-3:]:  # Last 3 messages for context
                role = msg.get("role", "user")
                content = msg.get("content", "")
                prompt += f"{role.capitalize()}: {content}\n"
            prompt += "\n"

        # Add current query
        prompt += f"User question: {query}\n\nAssistant:"

        return prompt

    def _out_of_scope_response(self) -> RAGResponse:
        """Return response for out-of-scope questions"""
        response = """I apologize, but I couldn't find relevant information about that topic in the Physical AI & Humanoid Robotics textbook.

This textbook covers:
- Physical AI fundamentals
- ROS 2 development
- Simulation with Gazebo and Unity
- NVIDIA Isaac platform
- Humanoid robotics
- Vision-Language-Action models

If your question relates to these topics, could you rephrase it? Otherwise, I recommend consulting additional resources for topics outside the textbook scope."""

        return RAGResponse(response=response, sources=[])

    def _error_response(self) -> RAGResponse:
        """Return response for system errors"""
        response = """I apologize, but I encountered an error while processing your request.

This could be due to:
- Temporary API rate limits
- Service connectivity issues
- Unexpected input format

Please try again in a moment. If the issue persists, please contact support."""

        return RAGResponse(response=response, sources=[])


# Global RAG service instance
rag_service = RAGService()
