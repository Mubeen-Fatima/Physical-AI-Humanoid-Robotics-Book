# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/001-physical-ai-textbook/`
**Prerequisites**: plan.md, spec.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `apps/learn-app/`
- **Backend**: `backend/`
- Monorepo with separate deployment cycles

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create root package.json with pnpm workspace configuration
- [X] T002 [P] Initialize Docusaurus app in apps/learn-app/ with TypeScript
- [X] T003 [P] Initialize FastAPI backend in backend/ with Python 3.11+
- [X] T004 [P] Setup backend pyproject.toml with Black, Flake8, MyPy configs
- [X] T005 [P] Create .gitignore for Node.js and Python artifacts
- [X] T006 Create .env.example files for frontend and backend with required variables
- [X] T007 [P] Setup apps/learn-app/docusaurus.config.ts with site metadata
- [X] T008 [P] Create apps/learn-app/sidebars.ts for chapter navigation structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Create backend/app/config.py for environment variable loading (GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY)
- [X] T010 [P] Create backend/app/models/chat.py with Pydantic models (ChatRequest, ChatResponse, ChatSource)
- [X] T011 [P] Create backend/app/models/vector.py with VectorChunk schema
- [X] T012 Create backend/app/main.py with FastAPI app initialization and CORS middleware
- [X] T013 [P] Setup backend/app/routers/chat.py with router skeleton for /api/chat endpoints
- [X] T014 [P] Create backend/app/services/gemini_client.py with Gemini API wrapper and retry logic (2s exponential backoff)
- [X] T015 [P] Create backend/app/services/qdrant_client.py with vector store operations and storage monitoring (80%/95% warnings)
- [X] T016 Install pnpm dependencies in apps/learn-app/ (@docusaurus/core, react, typescript)
- [X] T017 Install Python dependencies in backend/ (fastapi, uvicorn, google-generativeai, qdrant-client, pydantic, python-dotenv)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 4 - Discover Course Value via Landing Page (Priority: P1) 🎯 MVP

**Goal**: Prospective learners can visit the landing page to understand course offerings and decide to start reading

**Independent Test**: Visit landing page URL and verify all sections (hero, value cards, comparison table, learning path, hardware tiers) are visible and functional

### Implementation for User Story 4

- [X] T018 [P] [US4] Create apps/learn-app/src/components/LandingPage/Hero.tsx with title, tagline, book cover, and CTAs
- [X] T019 [P] [US4] Create apps/learn-app/src/components/LandingPage/ValueCards.tsx with 4 cards (ROS 2, Simulation, Isaac AI, Humanoids)
- [X] T020 [P] [US4] Create apps/learn-app/src/components/LandingPage/ComparisonTable.tsx contrasting Digital AI vs Physical AI
- [X] T021 [P] [US4] Create apps/learn-app/src/components/LandingPage/LearningPath.tsx visualizing module progression
- [X] T022 [P] [US4] Create apps/learn-app/src/components/LandingPage/HardwareTiers.tsx with Economy/Standard/Cloud options
- [X] T023 [US4] Create apps/learn-app/src/pages/index.tsx assembling all landing page components
- [X] T024 [US4] Create apps/learn-app/src/css/custom.css with Agent Factory-aligned styling
- [X] T025 [US4] Add placeholder book cover image to apps/learn-app/static/img/book-cover.png
- [X] T026 [US4] Configure "Start Reading" CTA to navigate to /docs/preface
- [X] T027 [US4] Configure "Panaversity" CTA to open external link in new tab

**Checkpoint**: Landing page fully functional and visually matches Agent Factory reference standard

---

## Phase 4: User Story 1 - Read Interactive Textbook Content (Priority: P1) 🎯 MVP

**Goal**: Learners can navigate through 26 chapters with hands-on code examples and proper formatting

**Independent Test**: Navigate to deployed site, click through chapters, view content with code examples, verify all 26 chapters render correctly

### Implementation for User Story 1

- [X] T028 [US1] Create apps/learn-app/docs/preface.mdx with introduction to Physical AI and book structure
- [X] T029 [P] [US1] Create apps/learn-app/docs/01-foundations/ directory with placeholder for Chapters 1-4
- [X] T030 [P] [US1] Create apps/learn-app/docs/02-ros2/ directory with placeholder for Chapters 5-9
- [X] T031 [P] [US1] Create apps/learn-app/docs/03-simulation/ directory with placeholder for Chapters 10-13
- [X] T032 [P] [US1] Create apps/learn-app/docs/04-isaac/ directory with placeholder for Chapters 14-18
- [X] T033 [P] [US1] Create apps/learn-app/docs/05-humanoid/ directory with placeholder for Chapters 19-22
- [X] T034 [P] [US1] Create apps/learn-app/docs/06-vla/ directory with placeholder for Chapters 23-25
- [X] T035 [P] [US1] Create apps/learn-app/docs/07-capstone/ directory with placeholder for Chapter 26
- [X] T036 [US1] Create sample chapter apps/learn-app/docs/01-foundations/chapter-01.mdx with learning objectives, prerequisites, concepts, hands-on tutorial, summary, and exercises sections
- [X] T037 [US1] Add syntax-highlighted code example to sample chapter with Python/ROS 2 code
- [X] T038 [US1] Configure apps/learn-app/sidebars.ts to organize 26 chapters into 7 parts with navigation
- [X] T039 [US1] Test chapter navigation (previous/next buttons) between preface and Chapter 1
- [X] T040 [US1] Verify code syntax highlighting renders correctly in Docusaurus

**Checkpoint**: Book structure complete with navigable chapters and code examples

---

## Phase 5: User Story 2 - Ask Questions via RAG Chatbot (Priority: P2)

**Goal**: Learners can interact with chatbot for contextual help with chapter citations

**Independent Test**: Open chatbot, ask questions about topics in chapters, verify responses cite specific chapters/sections

### Implementation for User Story 2

- [X] T041 [US2] Create backend/app/services/mdx_parser.py to parse MDX, chunk by h2 headings, extract metadata
- [X] T042 [US2] Create backend/scripts/ingest.py to parse docs/ directory, generate embeddings, upload to Qdrant
- [X] T043 [US2] Implement POST /api/chat endpoint in backend/app/routers/chat.py accepting message and conversation_id
- [X] T044 [US2] Create backend/app/services/rag.py with RAG pipeline (embed query → search Qdrant top 5 → generate with Gemini → return with citations)
- [X] T045 [US2] Integrate gemini_client.py for embeddings (text-embedding-004) in rag.py
- [X] T046 [US2] Integrate gemini_client.py for response generation (Gemini 1.5 Flash) in rag.py
- [X] T047 [US2] Integrate qdrant_client.py for vector search in rag.py
- [X] T048 [US2] Format response with source citations (chapter, heading, URL) in ChatResponse model
- [X] T049 [US2] Add error handling for out-of-scope questions (FR-018) in rag.py
- [X] T050 [P] [US2] Create apps/learn-app/src/components/ChatWidget/index.tsx with floating button UI
- [X] T051 [P] [US2] Create apps/learn-app/src/components/ChatWidget/ChatPanel.tsx with chat interface
- [X] T052 [P] [US2] Create apps/learn-app/src/components/ChatWidget/MessageList.tsx to display conversation history
- [X] T053 [US2] Create apps/learn-app/src/components/ChatWidget/RateLimiter.ts for client-side 15 RPM tracking and queuing
- [X] T054 [US2] Implement API call to POST /api/chat from ChatPanel.tsx with retry logic (2s exponential backoff)
- [X] T055 [US2] Store conversation context in browser memory (session-only, no persistence)
- [X] T056 [US2] Render source citations as clickable links to chapters in MessageList.tsx
- [X] T057 [US2] Add rate limit warning UI when approaching 14/15 requests per minute
- [X] T058 [US2] Inject ChatWidget component into all Docusaurus pages via theme customization

**Checkpoint**: Chatbot fully functional with RAG, citations, and rate limiting

---

## Phase 6: User Story 3 - Get Contextual Help on Selected Text (Priority: P3)

**Goal**: Learners can select text passages and ask chatbot for targeted clarification

**Independent Test**: Select text in chapter, see "Ask about this" tooltip, click it, verify chatbot opens with context

### Implementation for User Story 3

- [X] T059 [US3] Implement POST /api/chat/selected endpoint in backend/app/routers/chat.py accepting message, selected_text, source_chapter
- [X] T060 [US3] Modify rag.py to prioritize chunks from source_chapter when selected_text is provided
- [X] T061 [US3] Include selected_text in Gemini prompt for targeted explanation in rag.py
- [X] T062 [P] [US3] Create apps/learn-app/src/components/ChatWidget/TextSelectionHandler.tsx using Browser Selection API
- [X] T063 [US3] Show "Ask about this" tooltip on text selection in TextSelectionHandler.tsx
- [X] T064 [US3] On tooltip click, open ChatPanel with selected text and source chapter pre-filled
- [X] T065 [US3] Send selection context to POST /api/chat/selected endpoint from ChatPanel.tsx
- [X] T066 [US3] Handle multi-section text selection edge case (warn user or auto-trim)

**Checkpoint**: Text selection feature fully integrated with chatbot

---

## Phase 7: User Story 5 - Link to Panaversity (Priority: P3)

**Goal**: Visitors can navigate to Panaversity website from landing page

**Independent Test**: Click "Panaversity" CTA and verify external link opens in new tab

### Implementation for User Story 5

- [X] T067 [US5] Update Hero.tsx "Panaversity" button with href to Panaversity URL and target="_blank"
- [X] T068 [US5] Add rel="noopener noreferrer" for security to external link

**Checkpoint**: Panaversity link functional

---

## Phase 8: Deployment & DevOps

**Purpose**: Deploy book to GitHub Pages and backend to Vercel

- [ ] T069 Create .github/workflows/deploy-book.yml for Docusaurus build and GitHub Pages deployment
- [ ] T070 [P] Create backend/vercel.json with Vercel ASGI adapter configuration
- [ ] T071 Configure GitHub Actions to build apps/learn-app/ on push to main
- [ ] T072 Configure Vercel to deploy backend/ with environment variables (GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY)
- [ ] T073 Update apps/learn-app/.env.local with production BACKEND_URL from Vercel
- [ ] T074 Test GitHub Pages deployment and verify static site accessibility
- [ ] T075 Test Vercel backend deployment and verify /api/chat endpoint responds
- [ ] T076 Run backend/scripts/ingest.py in production to populate Qdrant with chapter embeddings
- [ ] T077 Verify CORS configuration allows frontend origin in backend/app/main.py

**Checkpoint**: Full production deployment complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements across all user stories

- [ ] T078 [P] Add README.md with project overview, architecture diagram, and quickstart
- [ ] T079 [P] Run Black, Flake8, MyPy on backend code and fix any violations
- [ ] T080 [P] Add type hints to all backend Python functions
- [ ] T081 [P] Add Google-style docstrings to all backend services
- [ ] T082 Test landing page Lighthouse performance score (target >90)
- [ ] T083 Test chatbot response time with sample queries (target <3s p95)
- [ ] T084 Verify Qdrant storage usage is under 1GB (run monitoring check)
- [ ] T085 Verify Gemini API usage tracking and rate limiting works correctly
- [ ] T086 [P] Create chapter template documentation for content authors
- [ ] T087 Add robots.txt and sitemap.xml to apps/learn-app/static/
- [ ] T088 Verify all 5 success criteria from spec.md (SC-001 through SC-009)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 4 (Landing) - P1: Independent, can start after Foundational
  - User Story 1 (Content) - P1: Independent, can start after Foundational
  - User Story 2 (Chatbot) - P2: Requires User Story 1 content to exist for RAG
  - User Story 3 (Selection) - P3: Requires User Story 1 content AND User Story 2 chatbot
  - User Story 5 (Panaversity) - P3: Independent, just updates Landing page
- **Deployment (Phase 8)**: Depends on User Stories 1, 2, 4 (MVP scope)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 4 (Landing - P1)**: Can start after Foundational - No dependencies
- **User Story 1 (Content - P1)**: Can start after Foundational - No dependencies
- **User Story 2 (Chatbot - P2)**: Requires User Story 1 (needs chapters to index)
- **User Story 3 (Selection - P3)**: Requires User Story 1 AND User Story 2
- **User Story 5 (Panaversity - P3)**: Independent - just updates Landing page

### Within Each User Story

- Landing page components can be built in parallel (all marked [P])
- Chapter directories can be created in parallel (all marked [P])
- Backend models and services can be built in parallel where marked [P]
- Chatbot UI components can be built in parallel (all marked [P])

### Parallel Opportunities

- **Setup (Phase 1)**: T002, T003, T004, T005, T007, T008 can run in parallel
- **Foundational (Phase 2)**: T010-T011, T013-T015 can run in parallel after T009
- **US4 (Landing)**: T018-T022 can run in parallel
- **US1 (Content)**: T029-T035 can run in parallel after T028
- **US2 (Chatbot)**: T050-T052 (frontend components) can run in parallel
- **User Stories 4 and 1**: Can be worked on in parallel by different team members

---

## Parallel Example: User Story 4 (Landing Page)

```bash
# Launch all landing page components together:
Task: "Create Hero.tsx in apps/learn-app/src/components/LandingPage/Hero.tsx"
Task: "Create ValueCards.tsx in apps/learn-app/src/components/LandingPage/ValueCards.tsx"
Task: "Create ComparisonTable.tsx in apps/learn-app/src/components/LandingPage/ComparisonTable.tsx"
Task: "Create LearningPath.tsx in apps/learn-app/src/components/LandingPage/LearningPath.tsx"
Task: "Create HardwareTiers.tsx in apps/learn-app/src/components/LandingPage/HardwareTiers.tsx"
```

## Parallel Example: User Story 1 (Chapter Structure)

```bash
# Launch all chapter directories together after preface:
Task: "Create apps/learn-app/docs/01-foundations/ directory"
Task: "Create apps/learn-app/docs/02-ros2/ directory"
Task: "Create apps/learn-app/docs/03-simulation/ directory"
Task: "Create apps/learn-app/docs/04-isaac/ directory"
Task: "Create apps/learn-app/docs/05-humanoid/ directory"
Task: "Create apps/learn-app/docs/06-vla/ directory"
Task: "Create apps/learn-app/docs/07-capstone/ directory"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 4 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T017) **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 4 - Landing Page (T018-T027)
4. Complete Phase 4: User Story 1 - Book Content (T028-T040)
5. **STOP and VALIDATE**: Test landing page and book navigation independently
6. Deploy MVP with landing page + book content only

### Incremental Delivery

1. MVP: Landing + Content (US4 + US1) → Deploy
2. Add Chatbot (US2) → Test independently → Deploy
3. Add Text Selection (US3) → Test independently → Deploy
4. Add Panaversity link (US5) → Test independently → Deploy
5. Each addition enhances value without breaking previous features

### Parallel Team Strategy

With multiple developers after Foundational phase:

- **Developer A**: User Story 4 (Landing Page) - T018-T027
- **Developer B**: User Story 1 (Book Content) - T028-T040
- **Developer C**: User Story 2 Backend (RAG) - T041-T049

Then merge and continue with frontend integration.

---

## Task Summary

- **Total Tasks**: 88
- **Setup**: 8 tasks
- **Foundational**: 9 tasks (BLOCKING)
- **User Story 4 (Landing - P1)**: 10 tasks
- **User Story 1 (Content - P1)**: 13 tasks
- **User Story 2 (Chatbot - P2)**: 18 tasks
- **User Story 3 (Selection - P3)**: 8 tasks
- **User Story 5 (Panaversity - P3)**: 2 tasks
- **Deployment**: 9 tasks
- **Polish**: 11 tasks

**MVP Scope**: Setup + Foundational + US4 + US1 = **40 tasks**

**Parallel Opportunities**: 34 tasks marked [P] can run concurrently with proper team coordination

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story designed to be independently testable
- Tests NOT included per spec (no TDD requirement mentioned)
- Commit after each task or logical group
- Stop at checkpoints to validate story independently
- Free-tier limits monitored throughout: Gemini 15 RPM, Qdrant 1GB, GitHub Pages bandwidth
