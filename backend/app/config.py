"""Configuration module for loading environment variables."""

from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Gemini API Configuration
    gemini_api_key: str

    # Qdrant Configuration
    qdrant_url: str
    qdrant_api_key: str

    # Logging
    log_level: str = "INFO"

    # CORS Configuration
    cors_origins: str = "http://localhost:3000"

    # Docs Directory (for ingestion)
    docs_dir: str = str(Path(__file__).parent.parent.parent / "apps" / "learn-app" / "docs")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def GEMINI_API_KEY(self) -> str:
        """Alias for gemini_api_key (for compatibility)."""
        return self.gemini_api_key

    @property
    def QDRANT_URL(self) -> str:
        """Alias for qdrant_url (for compatibility)."""
        return self.qdrant_url

    @property
    def QDRANT_API_KEY(self) -> str:
        """Alias for qdrant_api_key (for compatibility)."""
        return self.qdrant_api_key

    @property
    def DOCS_DIR(self) -> Path:
        """Return docs directory as Path object."""
        return Path(self.docs_dir)


# Global settings instance
settings = Settings()
