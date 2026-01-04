# Feature Specification: Physical AI & Humanoid Robotics Textbook

**Feature Branch**: `001-physical-ai-textbook`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description: "Docusaurus book + RAG chatbot teaching Physical AI and Humanoid Robotics with 26 chapters, landing page, and free-tier backend"

## Clarifications

### Session 2026-01-02

- Q: How should chat conversation history be persisted? → A: Session-only (browser memory) - conversation lost on page refresh
- Q: How should the chatbot handle backend failures? → A: Retry once with exponential backoff (2s delay), then show error message
- Q: How should Gemini's 15 RPM rate limit be handled? → A: Client-side rate limit tracking - warn user before hitting limit, queue excess requests
- Q: What level of detail should hardware tier options display? → A: Brief spec comparison (CPU/RAM/GPU listed per tier) with external links
- Q: How should Qdrant's 1GB storage limit be monitored? → A: Backend logs warning at 80% capacity, error at 95% - manual monitoring

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Interactive Textbook Content (Priority: P1)

Learners visit the website to study Physical AI and Humanoid Robotics through structured chapters with hands-on code examples. They navigate through 26 chapters organized into 7 parts, from foundations to a capstone project.

**Why this priority**: Core value proposition - delivering educational content is the primary purpose. Without this, the product has no value.

**Independent Test**: Can be fully tested by navigating to deployed site, clicking through chapters, viewing content with code examples, and verifying all 26 chapters render correctly with proper formatting.

**Acceptance Scenarios**:

1. **Given** a learner lands on the website, **When** they click "Start Reading", **Then** they see the preface and can navigate to Chapter 1
2. **Given** a learner is reading Chapter 5 (ROS 2), **When** they scroll down, **Then** they see learning objectives, prerequisites, core concepts, hands-on tutorial, and exercises sections
3. **Given** a learner views a code example, **When** they read the code block, **Then** it includes syntax highlighting and is properly formatted
4. **Given** a learner finishes a chapter, **When** they click "Next", **Then** they navigate to the subsequent chapter in sequence

---

### User Story 2 - Ask Questions via RAG Chatbot (Priority: P2)

Learners interact with a chatbot that answers questions based on textbook content, providing contextual help with chapter citations.

**Why this priority**: Significantly enhances learning experience but book content must exist first. Enables active learning and instant clarification.

**Independent Test**: Can be tested by opening chatbot, asking questions about topics covered in chapters, and verifying responses cite specific chapters/sections from the book.

**Acceptance Scenarios**:

1. **Given** a learner is reading any chapter, **When** they click the floating chatbot button, **Then** a chat panel opens
2. **Given** the chat panel is open, **When** a learner asks "What is ROS 2?", **Then** the chatbot responds with an answer and cites the relevant chapter
3. **Given** a learner has an active conversation, **When** they ask a follow-up question, **Then** the chatbot maintains context and provides coherent responses
4. **Given** a learner asks about content not in the book, **When** the chatbot processes the query, **Then** it politely indicates the topic is outside the textbook scope

---

### User Story 3 - Get Contextual Help on Selected Text (Priority: P3)

Learners select text passages they don't understand and ask the chatbot for clarification specific to that selection.

**Why this priority**: Adds convenience but requires both book content and chatbot infrastructure. Nice-to-have feature that improves UX.

**Independent Test**: Can be tested by selecting text in any chapter, seeing "Ask about this" tooltip, clicking it, and verifying chatbot opens with context about the selected text.

**Acceptance Scenarios**:

1. **Given** a learner is reading a chapter, **When** they select a text passage, **Then** an "Ask about this" tooltip appears
2. **Given** the tooltip is visible, **When** the learner clicks it, **Then** the chatbot opens with the selected text and source chapter pre-filled
3. **Given** the chatbot has the selection context, **When** the learner asks "Explain this", **Then** the response focuses on the selected passage

---

### User Story 4 - Discover Course Value via Landing Page (Priority: P1)

Prospective learners visit the landing page to understand what the course offers, see the learning path, and decide to start reading.

**Why this priority**: First impression and conversion point. Must exist for users to discover and enter the learning journey.

**Independent Test**: Can be tested by visiting the landing page URL and verifying all sections (hero, value cards, comparison table, learning path, hardware tiers) are visible and functional.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** the page loads, **Then** they see the hero section with title, tagline, book cover, and "Start Reading" CTA
2. **Given** a visitor scrolls down, **When** they view value cards, **Then** they see 4 cards highlighting ROS 2, Simulation, Isaac AI, and Humanoids
3. **Given** a visitor views the comparison section, **When** they read the table, **Then** they understand differences between Digital AI and Physical AI
4. **Given** a visitor sees the hardware tiers, **When** they review options, **Then** they see Economy ($700), Standard, and Cloud options with details
5. **Given** a visitor clicks "Start Reading", **When** the navigation completes, **Then** they land on the preface or first chapter

---

### User Story 5 - Link to Panaversity (Priority: P3)

Visitors can navigate to the Panaversity website to learn more about the educational program behind the textbook.

**Why this priority**: Branding and referral, but not critical to core learning experience.

**Independent Test**: Can be tested by clicking the "Panaversity" CTA on landing page and verifying it opens the correct external link.

**Acceptance Scenarios**:

1. **Given** a visitor is on the landing page, **When** they click the "Panaversity" button, **Then** they navigate to the Panaversity website in a new tab

---

### Edge Cases

- What happens when a learner asks the chatbot about a chapter that doesn't exist yet?
- How does the system handle chatbot requests when the backend is unavailable or rate-limited (Gemini 15 RPM limit)?
- What happens when a learner selects text that spans multiple sections or includes code blocks?
- How does the landing page display on mobile devices with limited screen width?
- What happens if vector embeddings for new chapters aren't indexed yet?
- How does the system behave when Qdrant storage approaches the 1GB free tier limit?
- What happens when a user's conversation history grows very long?

## Requirements *(mandatory)*

### Functional Requirements

#### Book Platform

- **FR-001**: System MUST display 26 chapters organized into 7 parts (Foundations, ROS 2, Simulation, Isaac, Humanoid, VLA, Capstone)
- **FR-002**: Each chapter MUST include learning objectives, prerequisites, core concepts, hands-on tutorial, summary, and exercises sections
- **FR-003**: System MUST support MDX format for interactive components within chapters
- **FR-004**: System MUST provide navigation between chapters (previous/next)
- **FR-005**: System MUST render code examples with syntax highlighting
- **FR-006**: System MUST display a preface page before Chapter 1

#### Landing Page

- **FR-007**: Landing page MUST include hero section with title, tagline, book cover image, and two CTAs ("Start Reading", "Panaversity")
- **FR-008**: Landing page MUST display 4 value cards highlighting ROS 2, Simulation, Isaac AI, and Humanoids
- **FR-009**: Landing page MUST show a comparison table contrasting Digital AI vs Physical AI
- **FR-010**: Landing page MUST visualize the learning path showing module progression
- **FR-011**: Landing page MUST present hardware tier options (Economy $700, Standard, Cloud) with brief spec comparison (CPU/RAM/GPU) and external resource links for each tier

#### RAG Chatbot

- **FR-012**: System MUST provide a floating chatbot button accessible from all book pages
- **FR-013**: Chatbot MUST answer questions using content from the textbook chapters
- **FR-014**: Chatbot responses MUST cite specific chapters or sections as sources
- **FR-015**: Chatbot MUST maintain conversation context within a browser session (in-memory only, no persistence across page refreshes)
- **FR-016**: Chatbot MUST handle "Ask about this" requests for selected text with source chapter context
- **FR-017**: System MUST display source citations as clickable links to relevant chapters
- **FR-018**: Chatbot MUST gracefully indicate when questions are outside textbook scope
- **FR-019**: Chatbot MUST retry failed backend requests once with 2-second exponential backoff before displaying error message to user
- **FR-020**: Chatbot MUST track Gemini API rate limits client-side (15 requests per minute), warn users approaching limit, and queue excess requests for automatic retry

#### Backend Services

- **FR-021**: Backend MUST provide POST `/api/chat` endpoint accepting message and optional conversation_id
- **FR-022**: Backend MUST provide POST `/api/chat/selected` endpoint accepting message, selected_text, and source_chapter
- **FR-023**: Backend MUST parse MDX content, chunk by h2 headings, generate embeddings, and store in vector database
- **FR-024**: Backend MUST retrieve top 5 relevant chunks from vector store for each query
- **FR-025**: Backend MUST use retrieved chunks to generate contextual responses via LLM
- **FR-026**: Backend MUST return responses with source chapter/section information
- **FR-027**: Backend MUST log warning when Qdrant storage reaches 80% of 1GB limit and error at 95% for manual monitoring

#### Deployment

- **FR-028**: Book website MUST be deployable as static site to GitHub Pages
- **FR-029**: Backend MUST be deployable to free-tier hosting (Vercel or Render)
- **FR-030**: System MUST operate within free tier limits: Gemini (15 RPM, 1M tokens/day), Qdrant (1GB), Neon (0.5GB if auth added)

### Key Entities

- **Chapter**: Represents a single learning unit with title, number, part assignment, learning objectives, prerequisites, content sections (concepts, tutorial, exercises), and MDX source
- **Part**: Groups related chapters (7 parts total: Foundations, ROS 2 Fundamentals, Simulation, NVIDIA Isaac, Humanoid Development, VLA, Capstone)
- **ChatMessage**: User question or chatbot response with timestamp, conversation_id, optional selected_text, and source_chapter
- **VectorChunk**: Embedded text chunk from book content with chapter reference, heading, content text, and embedding vector
- **ConversationContext**: Collection of messages belonging to a single browser session (stored in memory only, reset on page refresh)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 26 chapters are accessible and render correctly with proper formatting, code highlighting, and navigation
- **SC-002**: Landing page includes all 5 required sections (hero, value cards, comparison, learning path, hardware tiers) and loads in under 3 seconds
- **SC-003**: Chatbot responds to questions about book content within 3 seconds and cites specific chapter sources
- **SC-004**: Selected text "Ask about this" feature successfully opens chatbot with context for any text selection
- **SC-005**: System operates within free tier limits with no cost overruns during normal usage
- **SC-006**: Book website successfully deploys to GitHub Pages with public access
- **SC-007**: Backend successfully deploys to Vercel or Render with public API endpoints
- **SC-008**: 90% of chatbot answers about in-scope topics accurately reflect textbook content
- **SC-009**: Landing page design quality visually matches Agent Factory reference standard

## Assumptions *(optional)*

- Gemini API free tier (15 RPM, 1M tokens/day) is sufficient for expected user traffic during initial launch
- Qdrant Cloud 1GB storage is adequate for vector embeddings of 26 chapters
- GitHub Pages bandwidth and storage limits will not be exceeded by textbook content and assets
- Vercel or Render free tier supports expected backend API request volume
- Users have modern browsers (Chrome, Firefox, Safari latest versions)
- All 26 chapters will be authored in MDX format following the defined template structure
- Book cover image and diagrams will be provided as static assets
- Panaversity website URL is available for the CTA link

## Dependencies *(optional)*

- Gemini API access and valid API key
- Qdrant Cloud account and cluster setup
- GitHub repository with Pages enabled
- Vercel or Render account for backend deployment
- Docusaurus framework and its dependencies
- FastAPI framework and Python 3.11+ runtime
- MDX content for all 26 chapters (content creation is prerequisite)
- Book cover and visual assets (diagrams, images)

## Scope Boundaries *(optional)*

### In Scope

- Static educational content delivery via Docusaurus
- RAG-based chatbot for answering questions about textbook content
- Landing page with defined sections
- Free-tier deployment and hosting
- 26 chapters covering Physical AI and Humanoid Robotics
- Text-based learning with code examples
- Basic conversation context maintenance

### Out of Scope

- User authentication and profiles (marked as bonus feature)
- Content personalization based on user level (marked as bonus feature)
- Urdu translation (marked as bonus feature)
- Subagents and reusable Claude Code skills (marked as bonus feature)
- Video content hosting or streaming
- Interactive simulations or sandboxes within the browser
- User progress tracking across sessions
- Certificate or completion badges
- Community forums or user-generated content
- Real-time collaboration features
- Mobile native applications
- Hardware integration or robot control
- Live instructor support or tutoring

## Notes *(optional)*

This specification focuses on the core MVP: delivering educational content via a static book website enhanced with an AI chatbot. The architecture prioritizes free-tier services to minimize costs while providing full functionality.

The bonus features (authentication, personalization, Urdu translation, subagents) are explicitly excluded from this specification and would require separate feature specs if pursued.

The chatbot's effectiveness depends heavily on the quality of the MDX chapter content. Content creation is a dependency but not part of this feature's technical implementation scope.

Success hinges on operating within strict free-tier limits, requiring careful monitoring of API usage (Gemini RPM), storage (Qdrant 1GB), and bandwidth (GitHub Pages, Vercel/Render).
