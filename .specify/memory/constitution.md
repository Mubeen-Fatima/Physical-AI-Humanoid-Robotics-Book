# Physical AI & Humanoid Robotics Constitution

**Tagline:** *From Digital Intelligence to Embodied Robots*
**Reference Standard:** [Agent Factory](https://agentfactory.panaversity.org/) — match its quality and design patterns

## Core Principles

### I. Practical First (NON-NEGOTIABLE)
Every concept must be grounded in working code or simulation. No theoretical-only content.
- All code examples must be runnable and tested
- Simulations must be reproducible on standard hardware
- Provide complete setup instructions including environment configuration
- Include troubleshooting sections for common issues

### II. Progressive Learning
Content builds systematically from fundamentals to advanced applications.
- Start simple, build complexity incrementally
- Each chapter builds on previous chapters' knowledge
- Clear prerequisites stated at chapter start
- Culminate in integrated capstone project
- Learning objectives → Concepts → Hands-on → Exercises in every chapter

### III. Accuracy & Currency (NON-NEGOTIABLE)
All technical content reflects current production standards.
- ROS 2 Humble/Iron (not ROS 1)
- NVIDIA Isaac Sim 2023.1.0+
- Python 3.11+
- Update version references quarterly
- Flag deprecated approaches explicitly

### IV. Accessibility
No assumed robotics knowledge; define terms immediately.
- Define technical terms on first use
- Include glossary for quick reference
- Visual diagrams for complex concepts
- Real-world analogies where helpful
- Multiple learning modalities (text, code, diagrams, video references)

### V. Quality Standards
Match Agent Factory reference implementation quality.
- Professional documentation formatting
- Consistent code style (Black, Flake8, MyPy)
- Complete type hints in all Python code
- Comprehensive docstrings (Google style)
- Visual design aligned with reference site

### VI. AI-Enhanced Learning
RAG chatbot provides accurate, contextual answers from book content.
- Chatbot answers must cite specific chapters/sections
- Vector embeddings updated with each content change
- Personalization adapts to user background level
- Track user progress and suggest next topics

## Technology Stack (NON-NEGOTIABLE)

### Book Platform
- **Framework:** Docusaurus (latest stable)
- **Hosting:** GitHub Pages (static only, no SSR)
- **Content:** MDX for interactive components
- **Styling:** Custom theme matching Agent Factory

### Backend Services
- **API:** FastAPI (Python 3.11+)
- **Database:** Neon Serverless Postgres (Free Tier)
- **Vector Store:** Qdrant Cloud (Free Tier)
- **AI:** OpenAI Agents SDK / ChatKit
- **Auth (Bonus):** Better-Auth

### Development Tools
- **Spec-Driven:** SpecKit Plus (.specify/)
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Testing:** pytest, Jest/Vitest

## Project Structure

```
physical-ai-textbook/
├── apps/learn-app/          # Docusaurus site
│   ├── docs/                # Book chapters (MDX)
│   │   ├── part-01/         # Foundations
│   │   ├── part-02/         # ROS 2 Fundamentals
│   │   ├── part-03/         # Simulation
│   │   ├── part-04/         # NVIDIA Isaac
│   │   ├── part-05/         # Humanoid Development
│   │   ├── part-06/         # Vision-Language-Action
│   │   └── part-07/         # Capstone Project
│   ├── src/
│   │   ├── pages/index.tsx  # Custom landing page
│   │   └── components/      # Interactive components
│   └── static/
│       ├── img/             # Book cover, diagrams
│       └── code/            # Downloadable code examples
├── backend/                 # FastAPI RAG backend
│   └── app/
│       ├── main.py
│       ├── routers/
│       ├── services/
│       └── models/
├── .specify/                # Spec-Kit Plus
│   ├── memory/
│   │   └── constitution.md
│   └── templates/
├── specs/                   # Feature specifications
├── history/                 # PHRs and ADRs
│   ├── prompts/
│   └── adr/
├── CLAUDE.md
└── package.json
```

## Book Structure (26 Chapters)

| Part | Topic | Chapters | Focus |
|------|-------|----------|-------|
| 1 | Foundations of Physical AI | 1-4 | AI → Embodied AI transition |
| 2 | ROS 2 Fundamentals | 5-9 | Nodes, Topics, Services, Actions |
| 3 | Simulation (Gazebo/Unity) | 10-13 | Virtual environments |
| 4 | NVIDIA Isaac Platform | 14-18 | Isaac Sim, Gym, Cortex |
| 5 | Humanoid Development | 19-22 | Bipedal locomotion, manipulation |
| 6 | Vision-Language-Action | 23-25 | VLA models, RT-X, OpenVLA |
| 7 | Capstone Project | 26 | Integrated humanoid assistant |

## Content Quality Gates

### Per Chapter Requirements
- [ ] Learning objectives clearly stated
- [ ] All code examples tested and runnable
- [ ] Exercises with solution guides
- [ ] Visual diagrams for key concepts
- [ ] Links to external resources
- [ ] Estimated completion time provided

### Code Quality
- [ ] All Python code passes Black, Flake8, MyPy
- [ ] Type hints on all functions
- [ ] Docstrings (Google style)
- [ ] Unit tests for utilities
- [ ] Integration tests for ROS 2 nodes

### RAG Chatbot
- [ ] Answers cite specific chapters
- [ ] Accuracy validated against content
- [ ] Handles out-of-scope questions gracefully
- [ ] Response time < 3 seconds

## Constraints

### Technical Limits
- Stay within free tiers (Neon, Qdrant)
- Static site deployment only (no SSR)
- Backend deploys separately from book
- Support Chrome, Firefox, Safari latest versions

### Scope Boundaries
- **In Scope:** Software simulation, ROS 2, Isaac Sim, VLA models
- **Out of Scope:** Hardware assembly, electrical engineering, custom firmware

## Bonus Features (Optional)

| Feature | Points | Key Requirement |
|---------|--------|-----------------|
| Subagents & Skills | +50 | Reusable Claude Code intelligence |
| Auth + User Profile | +50 | Capture background at signup |
| Personalization | +50 | Adapt content to user level |
| Urdu Translation | +50 | Per-chapter translation button |

## Development Workflow

### Spec-Driven Process
1. Feature specification (specs/<feature>/spec.md)
2. Architecture plan (specs/<feature>/plan.md)
3. Task breakdown (specs/<feature>/tasks.md)
4. Implementation (Red-Green-Refactor)
5. PHR creation after each session
6. ADR for significant decisions

### Review Gates
- [ ] Code review by second developer
- [ ] Technical accuracy review
- [ ] Accessibility check (WCAG 2.1 AA)
- [ ] Performance validation (Lighthouse > 90)

## Governance

This constitution supersedes all other practices. Amendments require:
1. Documented rationale
2. Impact analysis
3. Migration plan if needed
4. Team approval

All development must verify compliance with these principles. Complexity beyond these standards must be explicitly justified in an ADR.

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01