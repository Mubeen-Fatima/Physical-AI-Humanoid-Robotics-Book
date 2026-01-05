"""Pydantic model for vector chunks stored in Qdrant."""

from pydantic import BaseModel, Field


class VectorChunk(BaseModel):
    """Embedded text chunk from book content."""

    chapter_ref: str = Field(..., description="Chapter identifier (e.g., '02-ros2/chapter-05')")
    heading: str = Field(..., description="Section heading (h2) from MDX")
    content: str = Field(..., description="Text content of the chunk")
    embedding: list[float] = Field(..., description="Embedding vector from Gemini")
    url: str = Field(..., description="URL path to the chapter section")

    class Config:
        """Pydantic configuration."""

        json_schema_extra = {
            "example": {
                "chapter_ref": "02-ros2/chapter-05",
                "heading": "Understanding ROS 2 Nodes",
                "content": "ROS 2 nodes are the fundamental building blocks...",
                "embedding": [0.1, 0.2, 0.3],  # Truncated for example
                "url": "/docs/02-ros2/chapter-05#understanding-ros-2-nodes",
            }
        }
