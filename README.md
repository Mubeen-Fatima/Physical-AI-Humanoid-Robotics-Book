# Physical AI & Humanoid Robotics Textbook

**From Digital Intelligence to Embodied Robots**

An interactive educational platform combining a Docusaurus-based static textbook with a RAG-powered chatbot for learning Physical AI and Humanoid Robotics.

## 🎯 Project Overview

This project delivers 26 chapters across 7 parts, covering:

1. **Foundations of Physical AI** (Chapters 1-4)
2. **ROS 2 Fundamentals** (Chapters 5-9)
3. **Simulation** - Gazebo & Unity (Chapters 10-13)
4. **NVIDIA Isaac Platform** (Chapters 14-18)
5. **Humanoid Development** (Chapters 19-22)
6. **Vision-Language-Action Models** (Chapters 23-25)
7. **Capstone Project** (Chapter 26)

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Docusaurus 3.x + TypeScript + React 18 |
| **Backend** | FastAPI + Python 3.11+ |
| **LLM** | Gemini 1.5 Flash (free tier) |
| **Embeddings** | Gemini text-embedding-004 |
| **Vector Store** | Qdrant Cloud (free tier) |
| **Hosting** | GitHub Pages (book) + Vercel (backend) |

### Project Structure

```
physical-ai-textbook/
├── apps/learn-app/           # Docusaurus frontend
│   ├── docs/                 # 26 chapters in MDX
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Landing page
│   │   └── css/              # Styling
│   ├── static/               # Assets
│   ├── docusaurus.config.ts
│   └── sidebars.ts
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── routers/          # API endpoints
│   │   ├── services/         # Business logic
│   │   ├── models/           # Pydantic schemas
│   │   ├── config.py         # Configuration
│   │   └── main.py           # FastAPI app
│   ├── scripts/              # Utility scripts
│   └── tests/                # Test suite
│
├── specs/                    # Feature specifications
├── history/                  # PHRs and ADRs
├── .specify/                 # SpecKit Plus
└── package.json              # Root workspace config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: >= 8.0.0
- **Python**: >= 3.11
- **uv**: Python package manager (recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/robotics_book.git
cd robotics_book
```

2. **Install frontend dependencies**

```bash
pnpm install
```

3. **Install backend dependencies**

```bash
cd backend
uv sync
# Or with pip:
pip install -e ".[dev]"
```

### Environment Configuration

1. **Frontend** (`.env.local` in `apps/learn-app/`)

```env
BACKEND_URL=http://localhost:8000
```

2. **Backend** (`.env` in `backend/`)

```env
GEMINI_API_KEY=your_google_ai_studio_key
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:3000
```

### Running Development Servers

**Frontend (Docusaurus)**

```bash
pnpm dev
# Runs on http://localhost:3000
```

**Backend (FastAPI)**

```bash
cd backend
uv run fastapi dev app/main.py
# Or with uvicorn:
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

## 📊 Implementation Status

### ✅ Completed Phases

- **Phase 1: Setup** (T001-T008) - Project initialization complete
- **Phase 2: Foundational** (T009-T015) - Core infrastructure ready

### 🚧 Next Steps

**To install dependencies (T016-T017):**

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend
uv sync
```

**Then proceed with:**

- **Phase 3**: Landing Page (US4) - 10 tasks
- **Phase 4**: Book Content (US1) - 13 tasks
- **Phase 5**: RAG Chatbot (US2) - 18 tasks

See `specs/001-physical-ai-textbook/tasks.md` for full task breakdown.

## 📖 API Endpoints

### Health Check

```
GET  /          # Basic health check
GET  /health    # Detailed health status
```

### Chat Endpoints (Coming in Phase 5)

```
POST /api/chat              # General chatbot query
POST /api/chat/selected     # Contextual help for selected text
```

## 🎨 Key Features

- **26 Interactive Chapters** with hands-on code examples
- **RAG-Powered Chatbot** answering questions with chapter citations
- **Custom Landing Page** matching Agent Factory design standards
- **Text Selection Help** for contextual explanations
- **Free-Tier Deployment** with no cost overruns
- **Client-Side Rate Limiting** for Gemini API (15 RPM)
- **Storage Monitoring** for Qdrant (1GB limit)

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests (when added)
cd apps/learn-app
pnpm test
```

## 📝 Development Workflow

This project follows **Spec-Driven Development** (SDD):

1. **Specification** → `specs/001-physical-ai-textbook/spec.md`
2. **Architecture Plan** → `specs/001-physical-ai-textbook/plan.md`
3. **Task Breakdown** → `specs/001-physical-ai-textbook/tasks.md`
4. **Implementation** → Phase-by-phase execution
5. **Prompt History** → `history/prompts/001-physical-ai-textbook/`

## 📚 Documentation

- **Constitution**: `.specify/memory/constitution.md`
- **Spec**: `specs/001-physical-ai-textbook/spec.md`
- **Plan**: `specs/001-physical-ai-textbook/plan.md`
- **Tasks**: `specs/001-physical-ai-textbook/tasks.md`

## 🤝 Contributing

See `specs/001-physical-ai-textbook/tasks.md` for implementation priorities.

## 📄 License

MIT License - Copyright © 2026 Panaversity

## 🔗 Links

- **Panaversity**: [https://panaversity.org](https://panaversity.org)
- **Agent Factory Reference**: [https://agentfactory.panaversity.org](https://agentfactory.panaversity.org)

---

**Built with ❤️ using SpecKit Plus**
