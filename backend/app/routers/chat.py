"""Chat API router for handling chatbot requests."""

from fastapi import APIRouter, HTTPException, status
from backend.app.models.chat import ChatRequest, ChatResponse, ChatSelectedRequest
import logging
import uuid

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    General chatbot endpoint with RAG retrieval.

    Args:
        request: ChatRequest with message and optional conversation_id

    Returns:
        ChatResponse with generated response, sources, and conversation_id

    Raises:
        HTTPException: On service errors
    """
    try:
        # Generate or use existing conversation ID
        conv_id = request.conversation_id or str(uuid.uuid4())

        logger.info(f"Chat request: {request.message[:50]}... | conv_id: {conv_id}")

        # TODO: Implement RAG pipeline (will be added in Phase 5 - User Story 2)
        # For now, return a placeholder response
        return ChatResponse(
            response="Chatbot functionality will be implemented in Phase 5 (User Story 2).",
            sources=[],
            conversation_id=conv_id,
        )

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process chat request",
        ) from e


@router.post("/chat/selected", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat_selected(request: ChatSelectedRequest) -> ChatResponse:
    """
    Contextual help endpoint for selected text.

    Args:
        request: ChatSelectedRequest with message, selected_text, source_chapter, and optional conversation_id

    Returns:
        ChatResponse with targeted explanation, sources, and conversation_id

    Raises:
        HTTPException: On service errors
    """
    try:
        # Generate or use existing conversation ID
        conv_id = request.conversation_id or str(uuid.uuid4())

        logger.info(
            f"Selected text request: {request.message[:50]}... | "
            f"chapter: {request.source_chapter} | conv_id: {conv_id}"
        )

        # TODO: Implement selected text RAG (will be added in Phase 6 - User Story 3)
        # For now, return a placeholder response
        return ChatResponse(
            response="Selected text functionality will be implemented in Phase 6 (User Story 3).",
            sources=[],
            conversation_id=conv_id,
        )

    except Exception as e:
        logger.error(f"Error in chat/selected endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process selected text request",
        ) from e
