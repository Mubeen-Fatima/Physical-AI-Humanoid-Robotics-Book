"""FastAPI application entry point with CORS middleware."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from backend.app.config import settings
from backend.app.routers import chat

# Configure logging
logging.basicConfig(
    level=settings.log_level,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Physical AI Textbook API",
    description="RAG-powered chatbot backend for Physical AI & Humanoid Robotics textbook",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api", tags=["chat"])


@app.get("/")
async def root() -> dict[str, str]:
    """Health check endpoint."""
    return {"status": "ok", "message": "Physical AI Textbook API is running"}


@app.get("/health")
async def health() -> dict[str, str]:
    """Detailed health check endpoint."""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "physical-ai-backend",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
