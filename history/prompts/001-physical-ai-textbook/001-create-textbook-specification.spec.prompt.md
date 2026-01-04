---
id: 001
title: Create Physical AI Textbook Specification
stage: spec
date: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-physical-ai-textbook
branch: 001-physical-ai-textbook
user: claude-code
command: /sp.specify
labels: ["specification", "physical-ai", "robotics", "textbook", "rag-chatbot", "docusaurus"]
links:
  spec: specs/001-physical-ai-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - specs/001-physical-ai-textbook/spec.md
  - specs/001-physical-ai-textbook/checklists/requirements.md
tests:
  - Specification quality checklist validation (all items passed)
---

## Prompt

User invoked `/sp.specify` with the following feature description:

```
# Specification: Physical AI & Humanoid Robotics Textbook

## Overview

Docusaurus book + RAG chatbot teaching Physical AI and Humanoid Robotics.

---

## Feature 1: Book Website

### Landing Page (Match Agent Factory style)

- **Hero**: Title, tagline, book cover, CTAs ("Start Reading", "Panaversity")
- **Value Cards**: 🤖 ROS 2 | 🎮 Simulation | 🧠 Isaac AI | 🦾 Humanoids
- **Comparison**: Digital AI vs Physical AI table
- **Learning Path**: Visual module progression
- **Hardware Tiers**: Economy ($700) | Standard | Cloud

### Content Structure

```
docs/
├── preface.mdx
├── 01-foundations/        # 4 chapters
├── 02-ros2/               # 5 chapters
├── 03-simulation/         # 4 chapters
├── 04-isaac/              # 5 chapters
├── 05-humanoid/           # 4 chapters
├── 06-vla/                # 3 chapters
└── 07-capstone/           # 1 chapter
```

### Chapter Format

```mdx
# Title
> Learning Objectives
## Prerequisites
## Core Concepts (with code examples)
## Hands-On Tutorial
## Summary & Exercises
```

---

## Feature 2: RAG Chatbot

### Architecture

```
Docusaurus → FastAPI → Qdrant (vectors) + Gemini (generation)
```

### Free Resources

| Service | Free Tier | Usage |
|---------|-----------|-------|
| Gemini API | 15 RPM, 1M tokens/day | Chat generation |
| Qdrant Cloud | 1GB, 1 cluster | Vector storage |
| Neon Postgres | 0.5GB | User data (bonus) |
| GitHub Pages | Unlimited | Book hosting |
| Vercel/Render | Hobby tier | Backend hosting |

### API Endpoints

```
POST /api/chat
  → { message, conversation_id? }
  ← { response, sources[] }

POST /api/chat/selected
  → { message, selected_text, source_chapter }
  ← { response, sources[] }
```

### RAG Pipeline

**Ingest**: Parse MDX → Chunk by h2 → Embed (Gemini) → Store in Qdrant

**Query**: Embed question → Search Qdrant (top 5) → Prompt Gemini → Return with sources

### Chatbot UI

- Floating button (bottom-right)
- Chat panel with message history
- "Ask about this" tooltip on text selection
- Source citations linking to chapters

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Book | Docusaurus → GitHub Pages |
| Backend | FastAPI → Vercel/Render |
| LLM | Google Gemini (free tier) |
| Embeddings | Gemini text-embedding-004 |
| Vectors | Qdrant Cloud (free) |
| Database | Neon Postgres (free) |

---

## Acceptance Criteria

- [ ] Landing page with all sections
- [ ] 26 chapters with code examples
- [ ] Chatbot answers from book content
- [ ] Selected text "ask about this" works
- [ ] Deployed: book (GitHub Pages) + backend (Vercel/Render)

---

## Bonus Features (Later)

| Feature | Points | Stack |
|---------|--------|-------|
| Subagents & Skills | +50 | Claude Code |
| Auth + Profile | +50 | Better-Auth + Neon |
| Personalization | +50 | Gemini rewrite |
| Urdu Translation | +50 | Gemini translate |

---

*Version 1.1 — Gemini + Free Resources*
```

Prior to this, the user invoked `/sp.constitution` to establish project principles.

## Response snapshot

**Workflow executed**:

1. Generated short name: `physical-ai-textbook`
2. Checked for existing branches and specs (none found)
3. Created branch `001-physical-ai-textbook` and initialized spec directory
4. Analyzed feature description and created comprehensive specification with:
   - 5 prioritized user stories (P1: Read content & Landing page, P2: RAG chatbot, P3: Selected text help & Panaversity link)
   - 27 functional requirements across Book Platform, Landing Page, RAG Chatbot, Backend Services, and Deployment
   - 5 key entities (Chapter, Part, ChatMessage, VectorChunk, ConversationContext)
   - 9 measurable success criteria (load time < 3s, 90% accuracy, all 26 chapters accessible, etc.)
   - 7 edge cases addressing free-tier constraints and missing content
   - Clear scope boundaries excluding bonus features
5. Created specification quality checklist and validated:
   - ✅ All content quality items passed
   - ✅ All requirement completeness items passed
   - ✅ All feature readiness items passed
   - ✅ No [NEEDS CLARIFICATION] markers needed (made informed guesses based on context)
6. Status: **READY FOR PLANNING**

**Key decisions**:
- Prioritized user stories to enable independent testing and MVP viability
- Made informed assumptions about free-tier sufficiency rather than requesting clarifications
- Focused specification on WHAT users need (educational outcomes) without prescribing HOW to implement
- Explicitly documented dependencies and assumptions for free-tier services
- Separated in-scope core features from out-of-scope bonus features

## Outcome

- ✅ Impact: Created complete, validated specification for Physical AI textbook platform with RAG chatbot
- 🧪 Tests: Specification quality checklist validation completed (all 12 items passed)
- 📁 Files: Created spec.md (228 lines), requirements.md checklist (67 lines), updated constitution.md
- 🔁 Next prompts: `/sp.clarify` (optional if any questions arise) or `/sp.plan` to create architectural plan
- 🧠 Reflection: Successfully balanced detail with technology-agnosticism; user stories properly prioritized for independent testing; avoided over-clarification by making reasonable assumptions

## Evaluation notes (flywheel)

- Failure modes observed: None - specification workflow completed successfully
- Graders run and results (PASS/FAIL): Specification Quality Checklist - PASS (12/12 items)
- Prompt variant (if applicable): Standard /sp.specify workflow
- Next experiment (smallest change to try): Proceed to /sp.plan to generate architectural decisions and design artifacts
