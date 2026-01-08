"""Qdrant vector store client with storage monitoring."""

import logging
from typing import Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from qdrant_client.http import models

from backend.app.config import settings

logger = logging.getLogger(__name__)


class QdrantVectorStore:
    """Wrapper for Qdrant Cloud with storage monitoring."""

    def __init__(self, url: Optional[str] = None, api_key: Optional[str] = None) -> None:
        """Initialize Qdrant client."""
        self.client = QdrantClient(
            url=url or settings.qdrant_url,
            api_key=api_key or settings.qdrant_api_key,
        )
        self.collection_name = "textbook_chunks"
        self.vector_size = 768  # Gemini text-embedding-004 dimension
        self.storage_limit_gb = 1.0  # Free tier limit
        self.warning_threshold = 0.8  # 80%
        self.error_threshold = 0.95  # 95%

    async def create_collection_if_not_exists(self) -> None:
        """Create collection if it doesn't exist."""
        try:
            collections = await asyncio.to_thread(self.client.get_collections)
            collection_names = [c.name for c in collections.collections]

            if self.collection_name not in collection_names:
                logger.info(f"Creating collection: {self.collection_name}")
                await asyncio.to_thread(
                    self.client.create_collection,
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE),
                )
                logger.info(f"Collection created: {self.collection_name}")
            else:
                logger.info(f"Collection already exists: {self.collection_name}")

        except Exception as e:
            logger.error(f"Failed to create collection: {str(e)}")
            raise

    async def check_storage_usage(self) -> None:
        """Monitor storage usage and log warnings/errors at thresholds."""
        try:
            collection_info = await asyncio.to_thread(
                self.client.get_collection, collection_name=self.collection_name
            )
            # Estimate storage (rough approximation)
            point_count = collection_info.points_count
            estimated_mb = (point_count * self.vector_size * 4) / (1024 * 1024)  # 4 bytes per float
            estimated_gb = estimated_mb / 1024
            usage_percent = (estimated_gb / self.storage_limit_gb) * 100

            logger.info(
                f"Storage usage: {estimated_gb:.3f}GB / {self.storage_limit_gb}GB "
                f"({usage_percent:.1f}%) | Points: {point_count}"
            )

            if usage_percent >= self.error_threshold * 100:
                logger.error(
                    f"CRITICAL: Storage usage at {usage_percent:.1f}% "
                    f"(threshold: {self.error_threshold * 100}%)"
                )
            elif usage_percent >= self.warning_threshold * 100:
                logger.warning(
                    f"WARNING: Storage usage at {usage_percent:.1f}% "
                    f"(threshold: {self.warning_threshold * 100}%)"
                )

        except Exception as e:
            logger.error(f"Failed to check storage usage: {str(e)}")

    async def search(
        self,
        query_vector: list[float],
        limit: int = 5,
        chapter_filter: Optional[str] = None,
    ) -> list[dict]:
        """
        Search for similar vectors in Qdrant.

        Args:
            query_vector: Query embedding vector
            limit: Number of results to return (default 5)
            chapter_filter: Optional chapter reference to filter results

        Returns:
            List of search results with payload and score
        """
        try:
            # Build filter if chapter specified
            query_filter = None
            if chapter_filter:
                query_filter = Filter(
                    must=[
                        FieldCondition(
                            key="chapter_ref",
                            match=MatchValue(value=chapter_filter),
                        )
                    ]
                )

            results = await asyncio.to_thread(
                self.client.search,
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit,
                query_filter=query_filter,
            )

            logger.info(f"Search returned {len(results)} results")
            return [{"payload": r.payload, "score": r.score} for r in results]

        except Exception as e:
            logger.error(f"Search failed: {str(e)}")
            raise

    async def upsert_chunks(self, chunks: list[dict]) -> None:
        """
        Insert or update vector chunks in Qdrant.

        Args:
            chunks: List of chunk dicts with id, vector, and payload
        """
        try:
            points = [
                PointStruct(
                    id=chunk["id"],
                    vector=chunk["vector"],
                    payload=chunk["payload"],
                )
                for chunk in chunks
            ]

            await asyncio.to_thread(
                self.client.upsert,
                collection_name=self.collection_name,
                points=points,
            )

            logger.info(f"Upserted {len(chunks)} chunks to Qdrant")
            await self.check_storage_usage()

        except Exception as e:
            logger.error(f"Upsert failed: {str(e)}")
            raise

    async def collection_exists(self, collection_name: str) -> bool:
        """Check if a collection exists."""
        try:
            collections = await asyncio.to_thread(self.client.get_collections)
            return collection_name in [c.name for c in collections.collections]
        except Exception as e:
            logger.error(f"Failed to check collection existence: {str(e)}")
            return False

    async def delete_collection(self, collection_name: str) -> None:
        """Delete a collection."""
        try:
            await asyncio.to_thread(self.client.delete_collection, collection_name=collection_name)
            logger.info(f"Deleted collection: {collection_name}")
        except Exception as e:
            logger.error(f"Failed to delete collection: {str(e)}")
            raise

    async def create_collection(self, collection_name: str, vector_dim: int) -> None:
        """Create a new collection."""
        try:
            await asyncio.to_thread(
                self.client.create_collection,
                collection_name=collection_name,
                vectors_config=VectorParams(size=vector_dim, distance=Distance.COSINE),
            )
            logger.info(f"Created collection: {collection_name}")
        except Exception as e:
            logger.error(f"Failed to create collection: {str(e)}")
            raise

    async def upsert_points(self, collection_name: str, points: list[dict]) -> None:
        """Upsert points to a collection."""
        try:
            point_structs = [
                PointStruct(
                    id=point["id"],
                    vector=point["vector"],
                    payload=point["payload"],
                )
                for point in points
            ]

            await asyncio.to_thread(
                self.client.upsert,
                collection_name=collection_name,
                points=point_structs,
            )
            logger.debug(f"Upserted {len(points)} points to {collection_name}")
        except Exception as e:
            logger.error(f"Failed to upsert points: {str(e)}")
            raise

    async def get_storage_usage(self) -> dict:
        """Get storage usage information."""
        try:
            collection_info = await asyncio.to_thread(
                self.client.get_collection, collection_name=self.collection_name
            )
            point_count = collection_info.points_count
            # Estimate bytes (rough approximation)
            estimated_bytes = point_count * self.vector_size * 4  # 4 bytes per float
            return {"usage_bytes": estimated_bytes, "point_count": point_count}
        except Exception as e:
            logger.error(f"Failed to get storage usage: {str(e)}")
            return {"usage_bytes": 0, "point_count": 0}


# Import asyncio for to_thread usage
import asyncio

# Global client instance
qdrant_store = QdrantVectorStore()
