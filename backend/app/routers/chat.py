"""Chat API router for handling chatbot requests."""

from fastapi import APIRouter, HTTPException, status
from backend.app.models.chat import ChatRequest, ChatResponse, ChatSelectedRequest, ChatSource
from backend.app.services.rag import rag_service
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

        # Call RAG service
        rag_response = await rag_service.generate_response(
            query=request.message,
            conversation_history=None,  # TODO: Add session-based history storage
        )

        # Convert sources to ChatSource format
        sources = [
            ChatSource(
                chapter=source.chapter,
                heading=source.heading,
                url=source.url,
            )
            for source in rag_response.sources
        ]

        return ChatResponse(
            response=rag_response.response,
            sources=sources,
            conversation_id=conv_id,
        )

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporarily unavailable. Please try again.",
        ) from e


@router.post("/chat/selected", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat_selected(request: ChatSelectedRequest) -> ChatResponse:
    """
    Contextual help endpoint for selected text.

    Args:
        request: ChatSelectedRequest with message, selected_text,
                 source_chapter, and optional conversation_id

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

        # Call RAG service with selected text context
        rag_response = await rag_service.generate_response(
            query=request.message,
            conversation_history=None,
            selected_text=request.selected_text,
            source_chapter=request.source_chapter,
        )

        # Convert sources to ChatSource format
        sources = [
            ChatSource(
                chapter=source.chapter,
                heading=source.heading,
                url=source.url,
            )
            for source in rag_response.sources
        ]

        return ChatResponse(
            response=rag_response.response,
            sources=sources,
            conversation_id=conv_id,
        )

    except Exception as e:
        logger.error(f"Error in chat/selected endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporarily unavailable. Please try again.",
        ) from e
