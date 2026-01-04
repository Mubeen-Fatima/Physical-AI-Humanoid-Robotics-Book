# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `001-physical-ai-textbook` | **Date**: 2026-01-02 | **Spec**: [spec.md](spec.md)
**Input**: Docusaurus book + RAG chatbot teaching Physical AI and Humanoid Robotics with 26 chapters, landing page, and free-tier backend

## Summary

Build an educational platform combining a Docusaurus-based static textbook (26 chapters across 7 parts) with a RAG-powered chatbot for interactive learning. The platform delivers Physical AI and Humanoid Robotics content through MDX chapters with runnable code examples, complemented by an AI assistant that answers questions with chapter citations. The system operates entirely on free-tier services (GitHub Pages, Vercel, Gemini, Qdrant).

**Technical Approach**:
- Frontend: Docusaurus 3.x static site with TypeScript, custom landing page matching Agent Factory reference quality
- Backend: FastAPI + Gemini 1.5 Flash for RAG, Qdrant Cloud for vector embeddings
- Deployment: GitHub Pages (book) + Vercel (backend API)
- Key Innovation: Client-side rate limiting and retry logic to work within Gemini's 15 RPM free tier

## Technical Context

**Language/Version**:
- Frontend: TypeScript 5.x, Node.js 20 LTS
- Backend: Python 3.11+

**Primary Dependencies**:
- Frontend: `@docusaurus/core` 3.x, `react` 18.x, `@docusaurus/preset-classic`
- Backend: `fastapi`, `uvicorn`, `google-generativeai` (Gemini SDK), `qdrant-client`, `pydantic`

**Storage**:
- Vector Store: Qdrant Cloud (1GB free tier) for MDX chunk embeddings
- Session State: Browser memory only (no persistence across page refreshes per clarification)

**Testing**:
- Frontend: Jest/Vitest for components, Playwright for E2E
- Backend: pytest for API endpoints, contract tests for Gemini/Qdrant integrations

**Target Platform**:
- Book: Static HTML/CSS/JS bundle → GitHub Pages (Chrome, Firefox, Safari latest)
- Backend: Python ASGI app → Vercel serverless functions

**Project Type**: Web application (frontend + backend)

**Performance Goals**:
- Landing page load: <3 seconds (Lighthouse > 90)
- Chatbot response: <3 seconds including RAG retrieval + Gemini generation
- Chapter navigation: <1 second

**Constraints**:
- Free-tier limits: Gemini 15 RPM / 1M tokens per day, Qdrant 1GB storage
- Static site only (no SSR per constitution)
- Backend and book deploy separately
- Session-only chat history (no cross-session persistence)

**Scale/Scope**:
- Content: 26 chapters, ~500-1000 words each + code examples
- Vector embeddings: ~200-300 chunks (chunked by h2 headings)
- Expected users: 100-1000 concurrent readers (free tier sufficient)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. Practical First** | All code examples runnable and tested | ✅ PASS | Chapter template requires tested code blocks |
| **II. Progressive Learning** | 26 chapters build incrementally | ✅ PASS | Part 1→7 structure ensures progression |
| **III. Accuracy & Currency** | ROS 2 Humble/Iron, Isaac Sim 2023.1.0+, Python 3.11+ | ✅ PASS | Versions specified in constitution |
| **IV. Accessibility** | No assumed knowledge, define terms | ✅ PASS | Glossary + term definitions required |
| **V. Quality Standards** | Match Agent Factory reference | ✅ PASS | Landing page design mirrors reference |
| **VI. AI-Enhanced Learning** | RAG chatbot cites chapters | ✅ PASS | FR-014 requires chapter citations |
| **Tech Stack - Book** | Docusaurus + GitHub Pages (static only) | ✅ PASS | No SSR, static build |
| **Tech Stack - Backend** | FastAPI + Python 3.11+ | ✅ PASS | User plan specifies FastAPI |
| **Tech Stack - AI** | OpenAI Agents SDK / ChatKit | ⚠️ MODIFIED | User plan uses Gemini instead (free tier) |
| **Tech Stack - Vector** | Qdrant Cloud (free tier) | ✅ PASS | Matches constitution |
| **Tech Stack - Testing** | pytest, Jest/Vitest | ✅ PASS | Specified in dependencies |
| **Code Quality** | Black, Flake8, MyPy, type hints | ✅ PASS | Python backend will enforce |
| **Performance** | Lighthouse > 90 | ✅ PASS | SC-002 targets <3s load |
| **Free-Tier Compliance** | Stay within limits | ✅ PASS | FR-030 + monitoring at 80%/95% |

**GATE RESULT**: ✅ PASS with one acceptable modification (Gemini vs OpenAI for cost reasons)

**Modification Justification**:
- **Deviation**: Using Gemini 1.5 Flash instead of OpenAI Agents SDK
- **Rationale**: Gemini offers 15 RPM and 1M tokens/day free tier vs OpenAI's paid-only API
- **Constitution Alignment**: "Free-tier deployment" is a constitutional constraint (line 150); Gemini better satisfies this
- **Acceptable**: Constitution lists "OpenAI Agents SDK / ChatKit" as preference, not absolute requirement

## Project Structure

### Documentation (this feature)

```text
specs/001-physical-ai-textbook/
├── plan.md              # This file
├── research.md          # Phase 0: Technology research (will be created)
├── data-model.md        # Phase 1: Entity schemas (will be created)
├── quickstart.md        # Phase 1: Setup guide (will be created)
├── contracts/           # Phase 1: API schemas (will be created)
│   ├── chat.yaml        # POST /api/chat OpenAPI spec
│   └── chat-selected.yaml  # POST /api/chat/selected OpenAPI spec
└── tasks.md             # Phase 2: /sp.tasks output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
physical-ai-textbook/
├── apps/
│   └── learn-app/                  # Docusaurus application
│       ├── docs/                   # 26 chapters in MDX
│       │   ├── preface.mdx
│       │   ├── 01-foundations/     # Chapters 1-4
│       │   ├── 02-ros2/            # Chapters 5-9
│       │   ├── 03-simulation/      # Chapters 10-13
│       │   ├── 04-isaac/           # Chapters 14-18
│       │   ├── 05-humanoid/        # Chapters 19-22
│       │   ├── 06-vla/             # Chapters 23-25
│       │   └── 07-capstone/        # Chapter 26
│       ├── src/
│       │   ├── components/
│       │   │   ├── ChatWidget/     # Floating chatbot UI
│       │   │   │   ├── index.tsx
│       │   │   │   ├── ChatPanel.tsx
│       │   │   │   ├── MessageList.tsx
│       │   │   │   ├── TextSelectionHandler.tsx
│       │   │   │   └── RateLimiter.ts  # Client-side 15 RPM tracking
│       │   │   ├── LandingPage/    # Custom homepage components
│       │   │   │   ├── Hero.tsx
│       │   │   │   ├── ValueCards.tsx
│       │   │   │   ├── ComparisonTable.tsx
│       │   │   │   ├── LearningPath.tsx
│       │   │   │   └── HardwareTiers.tsx
│       │   │   └── CodeBlock/      # Syntax-highlighted, runnable code
│       │   ├── pages/
│       │   │   └── index.tsx       # Landing page assembly
│       │   ├── theme/              # Docusaurus theme customization
│       │   └── css/
│       │       └── custom.css      # Agent Factory-aligned styles
│       ├── static/
│       │   ├── img/
│       │   │   ├── book-cover.png
│       │   │   └── diagrams/
│       │   └── code/               # Downloadable code examples
│       ├── docusaurus.config.ts
│       ├── sidebars.ts
│       └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app + CORS + Vercel adapter
│   │   ├── routers/
│   │   │   └── chat.py             # POST /api/chat, /api/chat/selected
│   │   ├── services/
│   │   │   ├── rag.py              # RAG pipeline: embed → search → generate
│   │   │   ├── gemini_client.py    # Gemini API wrapper with retry logic
│   │   │   ├── qdrant_client.py    # Vector store operations + monitoring
│   │   │   └── mdx_parser.py       # Parse MDX, chunk by h2 headings
│   │   ├── models/
│   │   │   ├── chat.py             # Pydantic models for requests/responses
│   │   │   └── vector.py           # VectorChunk schema
│   │   └── config.py               # Env var loading (GEMINI_API_KEY, etc.)
│   ├── scripts/
│   │   └── ingest.py               # One-time: parse docs/ → embed → Qdrant
│   ├── tests/
│   │   ├── test_chat_api.py
│   │   ├── test_rag_service.py
│   │   └── test_gemini_integration.py
│   ├── requirements.txt
│   ├── pyproject.toml              # Black, Flake8, MyPy config
│   └── vercel.json                 # Vercel deployment config
│
├── .github/
│   └── workflows/
│       ├── deploy-book.yml         # Build Docusaurus → GitHub Pages
│       └── deploy-backend.yml      # Deploy FastAPI → Vercel
│
├── .specify/                       # SpecKit Plus (existing)
├── specs/                          # Feature specs (existing)
├── history/                        # PHRs and ADRs (existing)
├── CLAUDE.md                       # Project instructions (existing)
├── package.json                    # Root workspace config (pnpm)
└── README.md
```

**Structure Decision**: Web application pattern (Option 2) with separated frontend (`apps/learn-app/`) and backend (`backend/`). Chose monorepo approach with pnpm workspace to share TypeScript types between frontend and potential future admin tools. Backend is separate Python project to maintain independent deployment cycles (Vercel for API, GitHub Actions for book).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Using Gemini instead of OpenAI | Free-tier requirement (constitutional constraint) | OpenAI has no free tier; Gemini provides 15 RPM + 1M tokens/day at no cost |

**Justification**: The constitution mandates "Stay within free tiers" (line 150). Gemini 1.5 Flash satisfies this while OpenAI Agents SDK does not. This is a simplification (lower cost) rather than added complexity.

## Implementation Phases

### Phase 0: Research & Technology Validation

**Prerequisites**: Constitution check passed

**Objectives**:
- Validate Gemini 1.5 Flash API capabilities for RAG use case
- Confirm Qdrant free tier (1GB) sufficient for ~300 chunks
- Verify Docusaurus 3.x supports custom React components for chatbot
- Research MDX parsing libraries compatible with Docusaurus
- Validate Vercel serverless functions support FastAPI via adapter

**Deliverable**: `research.md` containing:
1. **Gemini API Research**
   - Decision: Gemini 1.5 Flash for generation, text-embedding-004 for embeddings
   - Rationale: Free tier (15 RPM, 1M tokens/day), supports both tasks
   - Integration: `google-generativeai` Python SDK
   - Rate Limit Handling: Client-side tracking + 2s exponential backoff (per clarifications)

2. **Qdrant Storage Estimation**
   - Decision: Qdrant Cloud free tier (1GB) sufficient
   - Calculation: 26 chapters × ~10 chunks/chapter × ~1KB/embedding = ~260KB (well under 1GB)
   - Monitoring: Log warnings at 80% (800MB), errors at 95% (950MB) per FR-027

3. **Docusaurus + React Integration**
   - Decision: Use Docusaurus 3.x `@docusaurus/theme-classic` with swizzled components
   - Chat Widget: Custom React component injected via theme customization
   - Text Selection: Browser Selection API + custom tooltip component

4. **MDX Parsing Strategy**
   - Decision: Use `remark` + `mdast` (Docusaurus dependencies) for server-side parsing
   - Chunking: Split on h2 (`##`) headings, preserve code blocks intact
   - Metadata: Extract chapter title, part, heading hierarchy for citations

5. **FastAPI on Vercel**
   - Decision: Use Vercel adapter (`vercel-asgi` or manual ASGI wrapper)
   - Cold Start: <1s for lightweight FastAPI app
   - Limitations: No persistent connections (acceptable for stateless RAG API)

**Research Tasks** (to be executed):
- [ ] Test Gemini API rate limits with sample requests
- [ ] Verify Qdrant free tier signup and storage monitoring APIs
- [ ] Build proof-of-concept Docusaurus + floating React component
- [ ] Parse sample MDX file, validate h2 chunking preserves context
- [ ] Deploy hello-world FastAPI to Vercel, measure cold start

**Output Path**: `specs/001-physical-ai-textbook/research.md`

### Phase 1: Design & Contracts

**Prerequisites**: `research.md` complete with all decisions validated

**Objectives**:
- Define data models for chat entities (per spec Key Entities)
- Create OpenAPI contracts for `/api/chat` and `/api/chat/selected`
- Document project setup (quickstart guide)
- Update agent context with new technologies (Gemini, Qdrant)

**Deliverables**:

1. **`data-model.md`**: Entity schemas for:
   - **Chapter** (MDX metadata): title, number, part, slug, filepath
   - **Part** (grouping): number, name, chapter_count, description
   - **ChatMessage** (request/response): message, conversation_id, timestamp, selected_text?, source_chapter?
   - **VectorChunk** (Qdrant payload): chapter_ref, heading, content, embedding_vector
   - **ConversationContext** (in-memory only): messages[], created_at, last_updated

2. **`contracts/chat.yaml`**: OpenAPI 3.1 schema for `/api/chat`
   ```yaml
   POST /api/chat:
     request:
       message: string (required)
       conversation_id: string (optional, UUID v4)
     response:
       response: string
       sources: [{ chapter: string, heading: string, url: string }]
       conversation_id: string
   ```

3. **`contracts/chat-selected.yaml`**: OpenAPI schema for `/api/chat/selected`
   ```yaml
   POST /api/chat/selected:
     request:
       message: string (required)
       selected_text: string (required)
       source_chapter: string (required, e.g., "02-ros2/chapter-05")
       conversation_id: string (optional)
     response:
       response: string
       sources: [{ chapter: string, heading: string, url: string }]
       conversation_id: string
   ```

4. **`quickstart.md`**: Setup guide with:
   - Prerequisites: Node.js 20, Python 3.11+, pnpm, uv (Python package manager)
   - Clone repo, install dependencies (`pnpm install`, `uv sync`)
   - Get API keys: Gemini (Google AI Studio), Qdrant Cloud
   - Set environment variables (`.env.local` for frontend, `.env` for backend)
   - Run dev servers: `pnpm dev` (Docusaurus on :3000), `uv run fastapi dev` (backend on :8000)
   - Ingest sample chapter: `uv run python backend/scripts/ingest.py`
   - Test chatbot: Open localhost:3000, click chat button, ask "What is ROS 2?"

5. **Agent Context Update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`
   - Add technologies: Docusaurus, Gemini API, Qdrant, FastAPI, MDX parsing
   - Preserve manual additions between `<!-- AGENT_CONTEXT_START -->` and `<!-- AGENT_CONTEXT_END -->`

**Output Paths**:
- `specs/001-physical-ai-textbook/data-model.md`
- `specs/001-physical-ai-textbook/contracts/chat.yaml`
- `specs/001-physical-ai-textbook/contracts/chat-selected.yaml`
- `specs/001-physical-ai-textbook/quickstart.md`
- `.specify/memory/agent-claude.md` (updated)

### Phase 2: Task Breakdown

**NOT EXECUTED BY `/sp.plan`** - This phase is handled by the `/sp.tasks` command.

After Phase 1 completes, user should run `/sp.tasks` to generate `tasks.md` with:
- Dependency-ordered implementation tasks
- Red-Green-Refactor test cases
- Acceptance criteria per task
- Estimated effort and prerequisites

## API Contracts (Summary)

**Endpoint 1**: `POST /api/chat`
- **Purpose**: General chatbot query with RAG retrieval
- **Input**: `{ message: string, conversation_id?: string }`
- **Output**: `{ response: string, sources: Source[], conversation_id: string }`
- **Behavior**: Embed query → search Qdrant (top 5) → generate with Gemini → return with chapter citations

**Endpoint 2**: `POST /api/chat/selected`
- **Purpose**: Contextual help for selected text
- **Input**: `{ message: string, selected_text: string, source_chapter: string, conversation_id?: string }`
- **Output**: `{ response: string, sources: Source[], conversation_id: string }`
- **Behavior**: Prioritize chunks from `source_chapter` → include `selected_text` in prompt → generate targeted explanation

**Error Handling** (per clarifications):
- Retry once with 2s exponential backoff on Gemini/Qdrant failures
- Return 503 with user-friendly message after retry exhaustion
- Client-side rate limiter warns at 14/15 requests per minute, queues 16th+ request

## Key Dependencies

**Frontend**:
- `@docusaurus/core` (latest 3.x): Static site generator
- `@docusaurus/preset-classic`: Default theme + plugins
- `react` 18.x: Component library for chatbot widget
- `typescript` 5.x: Type safety
- `@docusaurus/module-type-aliases`: TypeScript support

**Backend**:
- `fastapi`: Web framework for `/api/chat` endpoints
- `uvicorn[standard]`: ASGI server
- `google-generativeai`: Gemini API client (embeddings + generation)
- `qdrant-client`: Vector database operations
- `pydantic`: Request/response validation
- `python-dotenv`: Environment variable loading

**Development**:
- `pnpm`: Monorepo package manager (frontend)
- `uv`: Fast Python package manager (backend)
- `pytest`: Python testing framework
- `jest` / `vitest`: JavaScript testing
- `black`, `flake8`, `mypy`: Python code quality (per constitution)

## Environment Variables

**Frontend** (`.env.local` in `apps/learn-app/`):
```env
BACKEND_URL=http://localhost:8000          # Dev: local backend
# BACKEND_URL=https://your-app.vercel.app # Prod: Vercel deployment
```

**Backend** (`.env` in `backend/`):
```env
GEMINI_API_KEY=your_google_ai_studio_key   # Get from https://aistudio.google.com
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key
LOG_LEVEL=INFO                             # DEBUG for development
CORS_ORIGINS=http://localhost:3000,https://your-book-url.github.io
```

**Deployment Secrets** (GitHub Actions, Vercel):
- `GEMINI_API_KEY`: Set in Vercel environment variables
- `QDRANT_URL` + `QDRANT_API_KEY`: Set in Vercel
- `GH_PAGES_DEPLOY_TOKEN`: GitHub Actions secret for Pages deployment

## Deployment Strategy

**Book** (GitHub Pages):
1. GitHub Action triggers on push to `main`
2. Install Node.js 20, pnpm
3. Build Docusaurus: `pnpm build` (output: `apps/learn-app/build/`)
4. Deploy to `gh-pages` branch
5. GitHub Pages serves static site at `https://username.github.io/robotics_book/`

**Backend** (Vercel):
1. Connect GitHub repo to Vercel project
2. Configure build settings: Root = `backend/`, Python runtime
3. Set environment variables (GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY)
4. Deploy on push to `main` → Vercel assigns URL (e.g., `https://robotics-book-api.vercel.app`)
5. Update frontend `BACKEND_URL` with Vercel URL

**Initial Data Seeding**:
- Run `backend/scripts/ingest.py` manually after first deployment to populate Qdrant
- Script parses `apps/learn-app/docs/**/*.mdx` → chunks by h2 → embeds → uploads to Qdrant
- Re-run after significant content changes to refresh embeddings

## Success Metrics (aligned with spec)

- **SC-001**: All 26 chapters accessible, render correctly, proper formatting, code highlighting, navigation
  - **Validation**: Manual review of each chapter, automated Lighthouse audit
- **SC-002**: Landing page loads in <3 seconds with all 5 sections (hero, value cards, comparison, learning path, hardware tiers)
  - **Validation**: Lighthouse performance score > 90, WebPageTest benchmarks
- **SC-003**: Chatbot responds within 3 seconds, cites specific chapter sources
  - **Validation**: End-to-end test with sample queries, p95 latency < 3s
- **SC-004**: Selected text "Ask about this" opens chatbot with context
  - **Validation**: E2E test: select text → click tooltip → verify chatbot opens with selection
- **SC-005**: Operate within free tier limits (no cost overruns)
  - **Validation**: Monitor Gemini usage (15 RPM), Qdrant storage (<1GB), GitHub Pages bandwidth
- **SC-006**: Book deploys to GitHub Pages with public access
  - **Validation**: GitHub Actions build succeeds, site accessible at public URL
- **SC-007**: Backend deploys to Vercel with public API endpoints
  - **Validation**: Vercel deployment succeeds, `/api/chat` returns 200 on health check
- **SC-008**: 90% of chatbot answers about in-scope topics accurately reflect textbook
  - **Validation**: Manual review of 20+ sample queries, compare answers to source chapters
- **SC-009**: Landing page design matches Agent Factory reference standard
  - **Validation**: Visual comparison review, design QA checklist

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Gemini 15 RPM limit exceeded during peak usage | Users see errors | Medium | Client-side rate limiter (FR-020) queues excess requests; warn at 14/15 RPM |
| Qdrant 1GB storage exhausted by embeddings | Chatbot stops working | Low | Monitor at 80%/95% (FR-027); chunking strategy keeps total < 300KB |
| Docusaurus build breaks with custom components | Deployment fails | Low | Use official swizzling API; test builds in CI before merge |
| Vercel cold start >3s impacts chatbot UX | Poor experience | Medium | Optimize FastAPI imports; consider Vercel Edge Functions for critical paths |
| MDX chapter content varies, breaks chunking | Inconsistent RAG | Medium | Enforce chapter template (learning objectives → concepts → tutorial → exercises) |

## Next Steps

1. ✅ **Phase 0**: Execute research tasks → generate `research.md`
2. ✅ **Phase 1**: Create `data-model.md`, OpenAPI contracts, `quickstart.md`, update agent context
3. ⏸️ **Phase 2**: User runs `/sp.tasks` to generate task breakdown → `tasks.md`
4. ⏸️ **Implementation**: Execute tasks in Red-Green-Refactor cycle (handled by `/sp.tasks` + manual dev)

**Command ends here.** User should review Phase 0 research.md and Phase 1 artifacts, then proceed with `/sp.tasks` for implementation planning.

---

*Plan v1.0 | Generated 2026-01-02*
