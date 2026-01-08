"""
Ingestion Script

Parse MDX chapters, generate embeddings, and upload to Qdrant vector store.
Run this script after content updates to refresh the RAG knowledge base.

Usage:
    python backend/scripts/ingest.py
"""

import sys
import asyncio
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.services.mdx_parser import MDXParser
from app.services.gemini_client import GeminiClient
from app.services.qdrant_client import QdrantVectorStore
from app.config import settings


async def main():
    """Main ingestion pipeline"""
    print("🚀 Starting ingestion pipeline...")
    print(f"📚 Docs directory: {settings.DOCS_DIR}")
    print(f"🔌 Qdrant URL: {settings.QDRANT_URL}")
    print()

    # Initialize services
    parser = MDXParser(settings.DOCS_DIR)
    gemini = GeminiClient()
    qdrant = QdrantVectorStore()

    # Step 1: Parse all chapters
    print("📖 Parsing MDX files...")
    chunks = parser.parse_all_chapters()
    print(f"✅ Parsed {len(chunks)} chunks from MDX files")
    print()

    # Step 2: Create or recreate collection
    collection_name = "textbook_chunks"
    print(f"🗄️  Setting up Qdrant collection: {collection_name}")

    # Check if collection exists
    if await qdrant.collection_exists(collection_name):
        print("⚠️  Collection already exists. Deleting old data...")
        await qdrant.delete_collection(collection_name)

    # Create collection with proper embedding dimensions
    embedding_dim = 768  # Gemini text-embedding-004 dimension
    await qdrant.create_collection(collection_name, embedding_dim)
    print(f"✅ Collection created with dimension {embedding_dim}")
    print()

    # Step 3: Generate embeddings and upload
    print("🧠 Generating embeddings and uploading to Qdrant...")
    print("⏳ This may take several minutes depending on content volume...")
    print()

    batch_size = 10  # Process in batches to avoid rate limits
    uploaded_count = 0

    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        batch_texts = [chunk.content for chunk in batch]

        # Generate embeddings for batch
        embeddings = await gemini.embed_batch(batch_texts)

        # Prepare points for Qdrant
        points = []
        for j, (chunk, embedding) in enumerate(zip(batch, embeddings)):
            point_id = i + j
            payload = {
                "chapter": chunk.metadata.chapter,
                "title": chunk.metadata.title,
                "heading": chunk.metadata.heading,
                "part": chunk.metadata.part,
                "url": chunk.metadata.url,
                "chunk_index": chunk.metadata.chunk_index,
                "content": chunk.content[:500],  # Store preview only
            }
            points.append({"id": point_id, "vector": embedding, "payload": payload})

        # Upload batch
        await qdrant.upsert_points(collection_name, points)
        uploaded_count += len(points)
        print(f"   ✓ Uploaded batch {i // batch_size + 1}: {uploaded_count}/{len(chunks)} chunks")

        # Respect rate limits (15 RPM for free tier)
        await asyncio.sleep(0.5)  # Small delay between batches

    print()
    print(f"✅ Ingestion complete! {uploaded_count} chunks uploaded to Qdrant")

    # Step 4: Verify storage
    storage_info = await qdrant.get_storage_usage()
    storage_mb = storage_info.get("usage_bytes", 0) / (1024 * 1024)
    storage_limit_mb = 1024  # 1GB free tier
    usage_percent = (storage_mb / storage_limit_mb) * 100

    print()
    print("📊 Storage Status:")
    print(f"   Storage used: {storage_mb:.2f} MB / {storage_limit_mb} MB ({usage_percent:.1f}%)")

    if usage_percent > 95:
        print("   ⚠️  WARNING: Storage usage above 95%!")
    elif usage_percent > 80:
        print("   ⚠️  Warning: Storage usage above 80%")
    else:
        print("   ✅ Storage usage healthy")

    print()
    print("🎉 Ingestion pipeline completed successfully!")
    print()
    print("Next steps:")
    print("  1. Start the backend: uvicorn app.main:app --reload")
    print("  2. Test the chatbot in the frontend")
    print("  3. Ask questions about the textbook content!")


if __name__ == "__main__":
    asyncio.run(main())
