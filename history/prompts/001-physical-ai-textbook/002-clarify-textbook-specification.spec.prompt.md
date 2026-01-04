---
id: 002
title: Clarify Physical AI Textbook Specification
stage: spec
date: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-physical-ai-textbook
branch: 001-physical-ai-textbook
user: claude-code
command: /sp.clarify
labels: ["clarification", "specification", "physical-ai", "rag-chatbot", "free-tier-constraints"]
links:
  spec: specs/001-physical-ai-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-physical-ai-textbook/spec.md
tests:
  - Specification ambiguity scan (5 high-impact areas identified)
---

## Prompt

User invoked `/sp.clarify` with no additional arguments.

System performed structured ambiguity & coverage scan across 10 taxonomy categories:
- Functional Scope & Behavior
- Domain & Data Model
- Interaction & UX Flow
- Non-Functional Quality Attributes
- Integration & External Dependencies
- Edge Cases & Failure Handling
- Constraints & Tradeoffs
- Terminology & Consistency
- Completion Signals
- Misc / Placeholders

Identified 5 high-impact clarifications needed before planning phase.

## Response snapshot

**Clarification Questions Asked & Answered (5 of 5):**

1. **Chat History Persistence**
   - Question: How should chat conversation history be persisted?
   - Options: A) Session-only (browser memory), B) Browser localStorage, C) Database persistence
   - Answer: **A - Session-only (browser memory)** - conversation lost on page refresh
   - Reasoning: Aligns with static-site constraint, MVP focus, avoids privacy/storage complexity

2. **Backend Failure Handling**
   - Question: How should the chatbot handle backend failures?
   - Options: A) Immediate error, B) Retry with backoff + error, C) Offline queue
   - Answer: **B - Retry once with exponential backoff (2s delay), then show error message**
   - Reasoning: Best UX without requiring queue infrastructure, balances reliability with simplicity

3. **Gemini Rate Limiting (15 RPM)**
   - Question: How should Gemini's 15 RPM rate limit be handled?
   - Options: A) No client limiting, B) Client-side tracking + queue, C) Backend priority queue
   - Answer: **B - Client-side rate limit tracking** - warn user before hitting limit, queue excess requests
   - Reasoning: Prevents wasted backend calls, immediate user feedback, simple browser implementation

4. **Hardware Tier Detail Level**
   - Question: What level of detail should hardware tier options display?
   - Options: A) Brief spec comparison, B) Price-only, C) Detailed build guide
   - Answer: **A - Brief spec comparison (CPU/RAM/GPU listed per tier) with external links**
   - Reasoning: Scannable decision-making info without overwhelming landing page, links enable deep research

5. **Qdrant Storage Monitoring (1GB Limit)**
   - Question: How should Qdrant's 1GB storage limit be monitored?
   - Options: A) No monitoring, B) Warning thresholds + logging, C) Automated dashboard + archival
   - Answer: **B - Backend logs warning at 80% capacity, error at 95%** - manual monitoring
   - Reasoning: Proactive prevention without dashboard complexity, 80% gives action time before hard limit

**Specification Updates:**

- Added `## Clarifications` section with Session 2026-01-02 subsection
- Updated FR-015: Clarified session-only persistence (no page refresh persistence)
- Added FR-019: Retry logic with 2s exponential backoff
- Added FR-020: Client-side rate limit tracking (15 RPM) with queue
- Updated FR-011: Hardware tiers now include CPU/RAM/GPU specs + external links
- Added FR-027: Qdrant storage monitoring (80% warn, 95% error)
- Updated ConversationContext entity: Explicitly noted in-memory only, reset on refresh
- Renumbered deployment requirements to FR-028, FR-029, FR-030 (3 new FRs added)

**Sections Touched:**
- Clarifications (new section)
- Functional Requirements → RAG Chatbot (FR-015, FR-019, FR-020)
- Functional Requirements → Landing Page (FR-011)
- Functional Requirements → Backend Services (FR-027)
- Functional Requirements → Deployment (renumbered)
- Key Entities → ConversationContext

## Outcome

- ✅ Impact: Resolved 5 critical ambiguities affecting reliability, UX, and free-tier compliance
- 🧪 Tests: All clarifications integrated and validated in specification
- 📁 Files: Updated spec.md with Clarifications section and 5 new/modified functional requirements
- 🔁 Next prompts: `/sp.plan` to create architectural design
- 🧠 Reflection: Session-only state and proactive monitoring align well with static-site MVP constraints; retry logic and rate limiting will be critical for free-tier success

## Evaluation notes (flywheel)

- Failure modes observed: None - all clarifications answered and integrated successfully
- Graders run and results (PASS/FAIL): Clarification workflow - PASS (5/5 questions answered, spec updated)
- Prompt variant (if applicable): Standard /sp.clarify workflow with interactive Q&A
- Next experiment (smallest change to try): Proceed to /sp.plan for architectural decisions and design artifacts
