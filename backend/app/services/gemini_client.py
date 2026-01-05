"""Gemini API client wrapper with retry logic and rate limiting."""

import asyncio
import logging
from typing import Optional
import google.generativeai as genai

from backend.app.config import settings

logger = logging.getLogger(__name__)

# Configure Gemini API
genai.configure(api_key=settings.gemini_api_key)


class GeminiClient:
    """Wrapper for Gemini API with retry logic and exponential backoff."""

    def __init__(self) -> None:
        """Initialize Gemini client with models."""
        self.embedding_model = "models/text-embedding-004"
        self.generation_model = genai.GenerativeModel("gemini-1.5-flash")
        self.max_retries = 1
        self.retry_delay = 2.0  # seconds

    async def generate_embedding(self, text: str) -> list[float]:
        """
        Generate embedding vector for given text.

        Args:
            text: Input text to embed

        Returns:
            List of floats representing the embedding vector

        Raises:
            Exception: If embedding generation fails after retries
        """
        for attempt in range(self.max_retries + 1):
            try:
                logger.debug(f"Generating embedding (attempt {attempt + 1})")
                result = genai.embed_content(
                    model=self.embedding_model,
                    content=text,
                    task_type="retrieval_document",
                )
                logger.debug(f"Embedding generated successfully ({len(result['embedding'])} dims)")
                return result["embedding"]

            except Exception as e:
                if attempt < self.max_retries:
                    logger.warning(
                        f"Embedding generation failed (attempt {attempt + 1}): {str(e)}. "
                        f"Retrying in {self.retry_delay}s..."
                    )
                    await asyncio.sleep(self.retry_delay)
                else:
                    logger.error(f"Embedding generation failed after {self.max_retries + 1} attempts")
                    raise

        # This should never be reached due to raise in except block
        raise RuntimeError("Unexpected code path in generate_embedding")

    async def generate_response(
        self, prompt: str, context: Optional[str] = None
    ) -> str:
        """
        Generate response using Gemini 1.5 Flash.

        Args:
            prompt: User's question or prompt
            context: Optional context from RAG retrieval

        Returns:
            Generated response text

        Raises:
            Exception: If generation fails after retries
        """
        for attempt in range(self.max_retries + 1):
            try:
                logger.debug(f"Generating response (attempt {attempt + 1})")

                # Construct full prompt with context if provided
                full_prompt = prompt
                if context:
                    full_prompt = f"""Context from textbook:
{context}

User question: {prompt}

Please answer the question based on the context provided. If the question cannot be answered from the context, politely indicate that the topic is outside the textbook scope."""

                response = await asyncio.to_thread(
                    self.generation_model.generate_content, full_prompt
                )

                logger.debug("Response generated successfully")
                return response.text

            except Exception as e:
                if attempt < self.max_retries:
                    logger.warning(
                        f"Response generation failed (attempt {attempt + 1}): {str(e)}. "
                        f"Retrying in {self.retry_delay}s..."
                    )
                    await asyncio.sleep(self.retry_delay)
                else:
                    logger.error(f"Response generation failed after {self.max_retries + 1} attempts")
                    raise

        # This should never be reached due to raise in except block
        raise RuntimeError("Unexpected code path in generate_response")


# Global client instance
gemini_client = GeminiClient()
