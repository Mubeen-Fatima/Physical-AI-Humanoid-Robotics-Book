"""
MDX Parser Service

Parses MDX files from the Docusaurus book, chunks content by h2 headings,
and extracts metadata for RAG vector storage.
"""

import re
from pathlib import Path
from typing import List
from dataclasses import dataclass


@dataclass
class ChunkMetadata:
    """Metadata for a content chunk"""

    chapter: str  # e.g., "01-foundations/chapter-01"
    title: str  # Chapter title
    heading: str  # Section heading (h2)
    part: str  # Part name, e.g., "Part 1: Foundations"
    url: str  # Relative URL to the section
    chunk_index: int  # Index within the chapter


@dataclass
class ParsedChunk:
    """A chunk of content with metadata"""

    content: str
    metadata: ChunkMetadata


class MDXParser:
    """Parse MDX files and chunk by h2 headings"""

    def __init__(self, docs_dir: Path):
        """
        Initialize parser with docs directory

        Args:
            docs_dir: Path to apps/learn-app/docs directory
        """
        self.docs_dir = Path(docs_dir)
        if not self.docs_dir.exists():
            raise ValueError(f"Docs directory does not exist: {docs_dir}")

    def parse_file(self, file_path: Path) -> List[ParsedChunk]:
        """
        Parse a single MDX file into chunks

        Args:
            file_path: Path to MDX file

        Returns:
            List of ParsedChunk objects
        """
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract chapter metadata
        chapter_title = self._extract_title(content)
        relative_path = file_path.relative_to(self.docs_dir)
        chapter_slug = str(relative_path.with_suffix("")).replace("\\", "/")
        part_name = self._get_part_name(chapter_slug)

        # Split by h2 headings
        chunks = self._chunk_by_h2(content)

        parsed_chunks = []
        for i, (heading, chunk_content) in enumerate(chunks):
            # Clean content (remove MDX front matter, excess whitespace)
            cleaned_content = self._clean_content(chunk_content)

            if not cleaned_content.strip():
                continue  # Skip empty chunks

            # Create URL with anchor
            url = f"/docs/{chapter_slug}"
            if heading != chapter_title:
                # Add anchor for h2 headings
                anchor = self._slugify(heading)
                url = f"{url}#{anchor}"

            metadata = ChunkMetadata(
                chapter=chapter_slug,
                title=chapter_title,
                heading=heading,
                part=part_name,
                url=url,
                chunk_index=i,
            )

            parsed_chunks.append(ParsedChunk(content=cleaned_content, metadata=metadata))

        return parsed_chunks

    def parse_all_chapters(self) -> List[ParsedChunk]:
        """
        Parse all MDX files in the docs directory

        Returns:
            List of all ParsedChunk objects across all chapters
        """
        all_chunks = []

        # Find all .mdx files
        for mdx_file in self.docs_dir.rglob("*.mdx"):
            try:
                chunks = self.parse_file(mdx_file)
                all_chunks.extend(chunks)
            except Exception as e:
                print(f"Warning: Failed to parse {mdx_file}: {e}")

        return all_chunks

    def _extract_title(self, content: str) -> str:
        """Extract chapter title from h1 heading"""
        match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
        if match:
            return match.group(1).strip()
        return "Untitled"

    def _chunk_by_h2(self, content: str) -> List[tuple[str, str]]:
        """
        Split content by h2 (##) headings

        Returns:
            List of (heading, content) tuples
        """
        # Split by h2 headings
        sections = re.split(r"^##\s+(.+)$", content, flags=re.MULTILINE)

        # First section is before any h2 (includes h1 and intro)
        chunks = []
        if sections[0].strip():
            title = self._extract_title(sections[0])
            chunks.append((title, sections[0]))

        # Process h2 sections (every odd index is heading, even is content)
        for i in range(1, len(sections), 2):
            if i + 1 < len(sections):
                heading = sections[i].strip()
                section_content = sections[i + 1]
                chunks.append((heading, section_content))

        return chunks

    def _clean_content(self, content: str) -> str:
        """
        Clean MDX content for embedding

        - Remove front matter
        - Remove import statements
        - Remove excessive whitespace
        - Keep code blocks intact
        """
        # Remove front matter (YAML between ---)
        content = re.sub(r"^---\n.*?\n---\n", "", content, flags=re.DOTALL)

        # Remove import statements
        content = re.sub(r"^import\s+.+$", "", content, flags=re.MULTILINE)

        # Normalize whitespace (but keep code blocks)
        lines = content.split("\n")
        cleaned_lines = []
        for line in lines:
            stripped = line.strip()
            if stripped:
                cleaned_lines.append(line)

        return "\n".join(cleaned_lines)

    def _get_part_name(self, chapter_slug: str) -> str:
        """Map chapter slug to part name"""
        part_mapping = {
            "preface": "Preface",
            "foundations": "Part 1: Foundations",
            "01-foundations": "Part 1: Foundations",
            "ros2": "Part 2: ROS 2 Fundamentals",
            "02-ros2": "Part 2: ROS 2 Fundamentals",
            "simulation": "Part 3: Simulation",
            "03-simulation": "Part 3: Simulation",
            "isaac": "Part 4: NVIDIA Isaac",
            "04-isaac": "Part 4: NVIDIA Isaac",
            "humanoid": "Part 5: Humanoid Development",
            "05-humanoid": "Part 5: Humanoid Development",
            "vla": "Part 6: Vision-Language-Action Models",
            "06-vla": "Part 6: Vision-Language-Action Models",
            "capstone": "Part 7: Capstone Project",
            "07-capstone": "Part 7: Capstone Project",
        }

        for key, value in part_mapping.items():
            if key in chapter_slug:
                return value

        return "Unknown Part"

    def _slugify(self, text: str) -> str:
        """Convert heading to URL-friendly slug"""
        # Lowercase and replace spaces with hyphens
        slug = text.lower()
        slug = re.sub(r"[^\w\s-]", "", slug)
        slug = re.sub(r"[-\s]+", "-", slug)
        return slug.strip("-")
