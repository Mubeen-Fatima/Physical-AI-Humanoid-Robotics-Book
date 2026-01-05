"""Pydantic models for chat API requests and responses."""

from pydantic import BaseModel, Field
from typing import Optional


class ChatSource(BaseModel):
    """Source citation for chatbot response."""

    chapter: str = Field(..., description="Chapter identifier (e.g., '02-ros2/chapter-05')")
    heading: str = Field(..., description="Section heading within chapter")
    url: str = Field(..., description="URL to the specific chapter section")


class ChatRequest(BaseModel):
    """Request model for general chat endpoint."""

    message: str = Field(..., min_length=1, description="User's question or message")
    conversation_id: Optional[str] = Field(
        None, description="UUID v4 for conversation tracking (optional)"
    )


class ChatSelectedRequest(BaseModel):
    """Request model for selected text chat endpoint."""

    message: str = Field(..., min_length=1, description="User's question about selected text")
    selected_text: str = Field(..., min_length=1, description="Text selected by user")
    source_chapter: str = Field(
        ..., description="Chapter where text was selected (e.g., '02-ros2/chapter-05')"
    )
    conversation_id: Optional[str] = Field(
        None, description="UUID v4 for conversation tracking (optional)"
    )


class ChatResponse(BaseModel):
    """Response model for chat endpoints."""

    response: str = Field(..., description="Chatbot's generated response")
    sources: list[ChatSource] = Field(
        default_factory=list, description="Source citations for the response"
    )
    conversation_id: str = Field(..., description="UUID v4 for conversation tracking")
