# Deployment Guide

This guide walks you through deploying the Physical AI & Humanoid Robotics Textbook to production.

## Architecture

- **Frontend**: Docusaurus static site → GitHub Pages
- **Backend**: FastAPI application → Vercel
- **Vector Store**: Qdrant Cloud (free tier)
- **LLM**: Gemini 1.5 Flash (free tier)

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier)
- Qdrant Cloud account (free tier, 1GB storage)
- Google AI Studio API key (free tier, 15 RPM)

---

## Backend Deployment (Vercel)

### Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend/`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

### Step 2: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `your_api_key_from_google_ai_studio` | Get from https://aistudio.google.com |
| `QDRANT_URL` | `https://your-cluster.qdrant.io` | Your Qdrant Cloud cluster URL |
| `QDRANT_API_KEY` | `your_qdrant_api_key` | From Qdrant Cloud dashboard |
| `CORS_ORIGINS` | `https://your-username.github.io` | Your GitHub Pages URL (comma-separated if multiple) |

### Step 3: Deploy Backend

1. Click "Deploy" in Vercel dashboard
2. Wait for build to complete (~1-2 minutes)
3. Note your deployment URL: `https://your-app-name.vercel.app`
4. Test health endpoint: `https://your-app-name.vercel.app/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "service": "physical-ai-backend"
}
```

### Step 4: Verify Backend Endpoints

Test chat endpoint:
```bash
curl -X POST https://your-app-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is Physical AI?",
    "conversation_id": null
  }'
```

If you get a CORS error, that's expected (frontend origin not yet set). If you get a 200 response, backend is working!

---

## Frontend Deployment (GitHub Pages)

### Step 1: Update Backend URL

1. Edit `apps/learn-app/.env.local`:
```env
BACKEND_URL=https://your-app-name.vercel.app
```

2. Commit and push:
```bash
git add apps/learn-app/.env.local
git commit -m "Configure production backend URL"
git push origin main
```

### Step 2: Configure GitHub Pages

1. Go to your repository → Settings → Pages
2. Under "Source", select:
   - **Source**: GitHub Actions
3. Save

### Step 3: Trigger Deployment

The GitHub Actions workflow (`.github/workflows/deploy-book.yml`) triggers automatically on push to `main` branch.

1. Monitor deployment: Repository → Actions tab
2. Wait for "Deploy Docusaurus Book to GitHub Pages" workflow to complete (~3-5 minutes)
3. Access your site: `https://your-username.github.io/robotics_book/`

### Step 4: Update CORS Origins

Now that you have the GitHub Pages URL, update Vercel CORS:

1. Go to Vercel project → Settings → Environment Variables
2. Update `CORS_ORIGINS` to: `https://your-username.github.io`
3. Redeploy backend: Deployments → Click "..." → Redeploy

---

## Initial Data Seeding

After both frontend and backend are deployed, populate the vector database with chapter embeddings.

### Step 1: Run Ingestion Script Locally

```bash
cd backend
uv run python scripts/ingest.py
```

**Expected Output**:
```
Parsing MDX chapters from: /path/to/apps/learn-app/docs
Found 5 chapters to process
Processing batch 1/1 (5 chapters)...
✓ Generated 23 embeddings
✓ Uploaded 23 chunks to Qdrant
Storage usage: 0.12% (1.2 MB / 1 GB)

Ingestion complete!
- Total chunks: 23
- Storage used: 1.2 MB / 1 GB
- Collection: physical-ai-chapters
```

### Step 2: Verify Vector Store

Test search functionality:
```bash
curl -X POST https://your-app-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about ROS 2 navigation",
    "conversation_id": null
  }'
```

**Expected**: Response with chapter citations

---

## Verification Checklist

### Backend (Vercel)

- [ ] Health endpoint returns 200: `GET /health`
- [ ] Chat endpoint accepts POST requests: `POST /api/chat`
- [ ] Selected text endpoint works: `POST /api/chat/selected`
- [ ] CORS allows GitHub Pages origin
- [ ] Environment variables configured (GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY)

### Frontend (GitHub Pages)

- [ ] Landing page loads: `https://your-username.github.io/robotics_book/`
- [ ] Chapter navigation works (Preface → Chapter 1)
- [ ] Code syntax highlighting renders correctly
- [ ] Floating chat button appears on all pages
- [ ] Chat widget connects to backend successfully

### RAG Chatbot

- [ ] Chat widget opens and closes
- [ ] Sending a message gets a response
- [ ] Responses include chapter citations
- [ ] Citations link to correct chapters
- [ ] Rate limit warning appears at 14/15 RPM
- [ ] Text selection shows "Ask about this" tooltip
- [ ] Selected text context pre-fills chat input

### Free-Tier Limits

- [ ] Gemini: Monitor requests stay under 15 RPM
- [ ] Qdrant: Storage usage < 1 GB (check with script)
- [ ] GitHub Pages: Bandwidth acceptable for expected traffic
- [ ] Vercel: Function invocations within free tier

---

## Monitoring

### Qdrant Storage Usage

Run monitoring script:
```bash
cd backend
uv run python -c "
from app.services.qdrant_client import QdrantVectorStore
qdrant = QdrantVectorStore()
usage = qdrant.get_storage_usage()
print(f'Storage: {usage['used_mb']:.2f} MB / {usage['total_mb']} MB ({usage['percentage']:.1f}%)')
"
```

**Thresholds**:
- ⚠️ Warning at 80% (800 MB)
- 🚨 Error at 95% (950 MB)

### Gemini API Usage

Check usage at: https://aistudio.google.com/app/apikey

- Free tier: 15 RPM, 1M tokens/day
- Client-side rate limiter queues excess requests
- Monitor for 429 (rate limit exceeded) errors in browser console

---

## Troubleshooting

### CORS Errors

**Symptom**: Chat widget shows "Failed to get response" error

**Solution**:
1. Check Vercel environment variable `CORS_ORIGINS` matches GitHub Pages URL exactly
2. Ensure no trailing slashes in URLs
3. Redeploy backend after changing CORS_ORIGINS

### Chat Widget Not Appearing

**Symptom**: No floating chat button on pages

**Solution**:
1. Check `apps/learn-app/src/theme/Root.tsx` exists and imports ChatWidget
2. Clear browser cache and hard refresh
3. Check browser console for JavaScript errors

### Chatbot Responses Empty

**Symptom**: Chatbot responds but with no citations or content

**Solution**:
1. Verify vector database has embeddings: Run ingestion script
2. Check Qdrant dashboard for collection `physical-ai-chapters`
3. Test Gemini API key is valid

### Deployment Fails

**GitHub Actions failure**:
- Check workflow logs in Actions tab
- Verify Node.js version is 20
- Ensure `npm ci` can install dependencies

**Vercel deployment failure**:
- Check Vercel deployment logs
- Verify `vercel.json` is valid
- Ensure Python 3.11+ runtime specified

---

## Updating After Changes

### Content Changes (Chapters)

1. Push changes to `apps/learn-app/docs/**/*.mdx`
2. GitHub Actions rebuilds automatically
3. Re-run ingestion script to update embeddings:
```bash
cd backend
uv run python scripts/ingest.py
```

### Code Changes (Chatbot)

**Frontend changes**:
- Push to `apps/learn-app/src/` → Auto-deploys via GitHub Actions

**Backend changes**:
- Push to `backend/app/` → Auto-deploys via Vercel

---

## Cost Monitoring

All services are free tier:

| Service | Limit | Cost if Exceeded |
|---------|-------|------------------|
| GitHub Pages | 100 GB bandwidth/month | Contact GitHub |
| Vercel | 100 GB bandwidth/month, 100 hrs serverless execution | $20/month Pro plan |
| Gemini API | 15 RPM, 1M tokens/day | Paid tier available |
| Qdrant Cloud | 1 GB storage | $25/month for 2 GB |

**Mitigation**:
- Client-side rate limiting prevents Gemini overuse
- Storage monitoring prevents Qdrant limit breaches
- Static site minimizes GitHub Pages bandwidth

---

## Support

For deployment issues:

1. Check this guide's troubleshooting section
2. Review deployment logs (GitHub Actions / Vercel)
3. Consult service documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [GitHub Pages Docs](https://docs.github.com/en/pages)
   - [Qdrant Cloud Docs](https://qdrant.tech/documentation/cloud/)
4. Open an issue in the repository

---

## Summary

**Deployment Order**:
1. ✅ Backend → Vercel (get URL)
2. ✅ Frontend → GitHub Pages (with backend URL)
3. ✅ Seed vector database (run ingestion)
4. ✅ Verify all features work
5. ✅ Monitor usage stays within free tiers

**Estimated Time**: 30-45 minutes for first deployment
