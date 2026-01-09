# Deployment Guide for Render

This guide walks you through deploying the Physical AI & Humanoid Robotics Textbook backend to Render (instead of Vercel) and the frontend to GitHub Pages.

## Why Render?

- **Free Tier**: 750 hours/month of free compute
- **Python Native**: Better support for FastAPI than Vercel
- **No Cold Starts**: Web services stay warm (vs Vercel's serverless)
- **Simple Deployment**: Git-based automatic deploys

---

## Prerequisites

Before starting, ensure you have:

- [x] GitHub account with repository access
- [x] Render account (sign up at https://render.com - free)
- [x] Google AI Studio API key (https://aistudio.google.com)
- [x] Qdrant Cloud account (https://qdrant.tech - free tier)

---

## Part 1: Backend Deployment to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign up with GitHub (recommended for easy repo linking)
4. Authorize Render to access your GitHub repositories

### Step 2: Create Web Service

1. From Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository:
   - Select "Physical-AI-Humanoid-Robotics-Book" repository
   - Grant Render access if prompted
3. Configure the service:

**Basic Settings**:
```
Name: physical-ai-backend
Region: Oregon (US West) or closest to your users
Branch: main
Root Directory: backend
```

**Build & Deploy**:
```
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Instance Type**:
```
Plan: Free (750 hours/month)
```

4. Click "Advanced" to add environment variables

### Step 3: Configure Environment Variables

Add the following environment variables (click "Add Environment Variable"):

| Key | Value | Where to Get It |
|-----|-------|-----------------|
| `PYTHON_VERSION` | `3.11.0` | Fixed value |
| `GEMINI_API_KEY` | `your_api_key_here` | https://aistudio.google.com/app/apikey |
| `QDRANT_URL` | `https://your-cluster.qdrant.io` | Qdrant Cloud dashboard |
| `QDRANT_API_KEY` | `your_qdrant_key` | Qdrant Cloud dashboard → API Keys |
| `CORS_ORIGINS` | `https://mubeen-fatima.github.io` | Your GitHub Pages URL |
| `LOG_LEVEL` | `INFO` | Fixed value |

**Important**: Keep API keys secure! Never commit them to Git.

### Step 4: Deploy Backend

1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Install dependencies from `requirements.txt`
   - Start the FastAPI server
   - Assign you a public URL
3. Wait 2-3 minutes for first deployment
4. Note your backend URL: `https://your-app-name.onrender.com`

### Step 5: Verify Backend Deployment

Once deployed, test your backend:

**Health Check**:
```bash
curl https://your-app-name.onrender.com/health
```

**Expected Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "service": "physical-ai-backend"
}
```

**Test Chat Endpoint**:
```bash
curl -X POST https://your-app-name.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is Physical AI?",
    "conversation_id": null
  }'
```

**Expected**: JSON response with answer and sources

---

## Part 2: Frontend Deployment to GitHub Pages

### Step 1: Update Backend URL

1. Copy your Render URL: `https://your-app-name.onrender.com`
2. Create `.env.local` in `apps/learn-app/`:

```bash
# Navigate to frontend directory
cd apps/learn-app

# Create .env.local file
cat > .env.local << EOF
# Backend API URL (Render deployment)
BACKEND_URL=https://your-app-name.onrender.com
EOF
```

**Replace** `your-app-name` with your actual Render service name!

### Step 2: Update CORS in Render

1. Go back to Render dashboard
2. Select your `physical-ai-backend` service
3. Go to "Environment"
4. Update `CORS_ORIGINS` to match your GitHub Pages URL:
   ```
   https://mubeen-fatima.github.io
   ```
5. Click "Save Changes"
6. Service will automatically redeploy (~1 minute)

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Pages**
3. Under "Source", select:
   - **Source**: GitHub Actions
4. Click "Save"

### Step 4: Trigger Deployment

The GitHub Actions workflow (`.github/workflows/deploy-book.yml`) triggers automatically when you push to `main`.

**Option A: Push Your .env.local** (Not Recommended - Contains URLs)
```bash
# DON'T commit .env.local - it's in .gitignore
```

**Option B: Update .env.local.example** (Recommended)
```bash
# Edit .env.local.example with your Render URL
nano apps/learn-app/.env.local.example

# Then create .env.local locally based on it
cp apps/learn-app/.env.local.example apps/learn-app/.env.local
# Edit .env.local with actual URL

# Commit the example file
git add apps/learn-app/.env.local.example
git commit -m "Update backend URL example for Render"
git push origin main
```

**Option C: Trigger Workflow Manually**
1. Go to GitHub repository → Actions
2. Select "Deploy Docusaurus Book to GitHub Pages"
3. Click "Run workflow" → "Run workflow"

### Step 5: Monitor Deployment

1. Go to: **Repository** → **Actions** tab
2. Click on the running workflow
3. Monitor build progress (~3-5 minutes)
4. Look for:
   - ✅ Build Docusaurus site
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

### Step 6: Access Your Site

Once deployment completes (green checkmark):

1. Your site is live at: `https://mubeen-fatima.github.io/robotics_book/`
2. Test navigation:
   - Landing page loads
   - Click "Start Reading" → Preface appears
   - Click "Panaversity" → Opens in new tab
3. Test chatbot:
   - Click floating chat button (💬)
   - Send a message
   - Verify response appears with citations

---

## Part 3: Initial Data Seeding

After both deployments are live, populate the vector database with chapter embeddings.

### Step 1: Run Ingestion Script Locally

```bash
# Navigate to backend directory
cd backend

# Ensure environment variables are set
export GEMINI_API_KEY="your_api_key"
export QDRANT_URL="https://your-cluster.qdrant.io"
export QDRANT_API_KEY="your_qdrant_key"

# Run ingestion script
python scripts/ingest.py
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
- Collection: textbook_chunks
```

### Step 2: Verify Vector Database

Test that RAG retrieval works:

```bash
curl -X POST https://your-app-name.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain sensor fusion in Physical AI",
    "conversation_id": null
  }'
```

**Expected**: Response includes citations from Chapter 1 or 4 (depending on content)

---

## Troubleshooting

### Issue: Backend Returns 500 Error

**Cause**: Missing environment variables or Qdrant connection failure

**Solution**:
1. Check Render logs:
   - Dashboard → Your Service → "Logs"
   - Look for errors like "GEMINI_API_KEY not found"
2. Verify all environment variables are set correctly
3. Test Qdrant connection:
   ```python
   from qdrant_client import QdrantClient
   client = QdrantClient(url="your_url", api_key="your_key")
   print(client.get_collections())
   ```

### Issue: CORS Error in Browser Console

**Symptom**: Chat widget shows "Failed to get response"

**Solution**:
1. Open browser DevTools (F12) → Console
2. Look for error: `blocked by CORS policy`
3. Fix CORS_ORIGINS in Render:
   - Must exactly match your GitHub Pages URL
   - No trailing slashes
   - Include `https://`
4. Redeploy backend after changing CORS

### Issue: GitHub Pages 404 Error

**Cause**: Base URL misconfiguration or deployment failure

**Solution**:
1. Check `docusaurus.config.ts` has correct `baseUrl`:
   ```typescript
   baseUrl: '/robotics_book/',
   ```
2. Verify GitHub Pages is enabled (Settings → Pages)
3. Check Actions tab for deployment errors
4. Rebuild: Actions → Re-run workflow

### Issue: Chatbot Returns No Sources

**Cause**: Vector database not populated

**Solution**:
1. Run ingestion script again (Step 1 of Part 3)
2. Verify Qdrant collection exists:
   ```bash
   # In Python
   from qdrant_client import QdrantClient
   client = QdrantClient(url="...", api_key="...")
   info = client.get_collection("textbook_chunks")
   print(f"Points: {info.points_count}")  # Should be > 0
   ```

### Issue: Render Service Spins Down

**Symptom**: First request takes 30+ seconds

**Explanation**: Render free tier spins down after 15 minutes of inactivity

**Solutions**:
- **Option A**: Upgrade to paid plan ($7/month for always-on)
- **Option B**: Use a ping service (e.g., UptimeRobot) to keep it warm
- **Option C**: Accept cold starts (only first request is slow)

---

## Monitoring & Maintenance

### Check Backend Health

Add this to your browser bookmarks for quick checks:
```
https://your-app-name.onrender.com/health
```

### Monitor Qdrant Storage

Run this periodically to check vector database usage:

```bash
cd backend
python -c "
from app.services.qdrant_client import QdrantVectorStore
qdrant = QdrantVectorStore()
usage = qdrant.get_storage_usage()
print(f'Storage: {usage[\"usage_bytes\"] / 1024 / 1024:.2f} MB / 1024 MB')
print(f'Points: {usage[\"point_count\"]}')
"
```

**Thresholds**:
- ⚠️ Warning at 800 MB (80%)
- 🚨 Critical at 950 MB (95%)

### Monitor Gemini API Usage

1. Visit: https://aistudio.google.com/app/apikey
2. Check "Usage" section
3. Free tier: 15 requests/minute, 1M tokens/day
4. Client-side rate limiter prevents overages

### View Render Logs

For debugging:
1. Render Dashboard → Your Service
2. Click "Logs" tab
3. Filter by log level (Info, Warning, Error)
4. Look for patterns in errors

---

## Updating Your Deployment

### Backend Changes

1. Make code changes in `backend/`
2. Commit and push to GitHub:
   ```bash
   git add backend/
   git commit -m "Update backend: [description]"
   git push origin main
   ```
3. Render auto-deploys within 2-3 minutes
4. Monitor deployment in Render dashboard

### Frontend Changes

1. Make code changes in `apps/learn-app/`
2. Test locally: `npm run build` (ensure no errors)
3. Commit and push:
   ```bash
   git add apps/learn-app/
   git commit -m "Update frontend: [description]"
   git push origin main
   ```
4. GitHub Actions auto-deploys within 3-5 minutes
5. Monitor in Actions tab

### Content Changes (New Chapters)

1. Add new MDX files to `apps/learn-app/docs/`
2. Update `sidebars.ts` if needed
3. Push changes (triggers GitHub Pages rebuild)
4. **Important**: Re-run ingestion script to add new embeddings:
   ```bash
   cd backend
   python scripts/ingest.py
   ```

---

## Cost Breakdown (All Free Tier)

| Service | Free Tier Limit | Estimated Usage | Cost if Exceeded |
|---------|----------------|-----------------|------------------|
| **Render** | 750 hours/month | ~720 hours/month | $7/month for always-on |
| **GitHub Pages** | 100 GB bandwidth/month | <1 GB/month | Contact GitHub |
| **Gemini API** | 15 RPM, 1M tokens/day | ~10K tokens/day | Paid tier available |
| **Qdrant Cloud** | 1 GB storage | <10 MB | $25/month for 2 GB |

**Total Monthly Cost**: $0 (within free tiers) ✅

---

## Deployment Checklist

Use this checklist for your deployment:

### Backend (Render)
- [ ] Render account created
- [ ] Web service created and connected to GitHub
- [ ] Environment variables configured (6 total)
- [ ] Service deployed successfully
- [ ] Health endpoint returns 200: `curl /health`
- [ ] Chat endpoint accepts requests: `curl POST /api/chat`

### Frontend (GitHub Pages)
- [ ] `.env.local` created with Render URL
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] GitHub Actions workflow triggered
- [ ] Deployment completed successfully
- [ ] Site accessible at GitHub Pages URL
- [ ] Landing page loads correctly
- [ ] Chapter navigation works

### Integration
- [ ] CORS_ORIGINS updated with GitHub Pages URL
- [ ] Backend redeployed after CORS update
- [ ] Chat widget connects to backend
- [ ] Messages sent successfully
- [ ] Responses received with sources

### Data Seeding
- [ ] Ingestion script executed successfully
- [ ] Qdrant collection populated (>0 points)
- [ ] Vector search returns relevant results
- [ ] Chatbot citations link to correct chapters

### Testing
- [ ] All 5 user stories tested manually
- [ ] Rate limiting works (15 RPM warning appears)
- [ ] Text selection tooltip functional
- [ ] Panaversity link opens correctly
- [ ] No console errors in browser DevTools

---

## Quick Reference: URLs

After deployment, bookmark these:

| Service | URL | Purpose |
|---------|-----|---------|
| **Live Site** | `https://mubeen-fatima.github.io/robotics_book/` | Public textbook |
| **Backend API** | `https://your-app-name.onrender.com` | API base URL |
| **Health Check** | `https://your-app-name.onrender.com/health` | Status monitoring |
| **API Docs** | `https://your-app-name.onrender.com/docs` | FastAPI Swagger UI |
| **Render Dashboard** | `https://dashboard.render.com` | Manage backend |
| **GitHub Actions** | `https://github.com/your-username/repo/actions` | Monitor deployments |
| **Qdrant Dashboard** | `https://cloud.qdrant.io` | Vector database |
| **Gemini Studio** | `https://aistudio.google.com` | API key & usage |

---

## Support

If you encounter issues:

1. **Check Logs**:
   - Render: Dashboard → Logs
   - GitHub: Actions → Workflow run → Job logs

2. **Common Issues**: See Troubleshooting section above

3. **Documentation**:
   - [Render Docs](https://render.com/docs)
   - [GitHub Pages Docs](https://docs.github.com/en/pages)
   - [Qdrant Docs](https://qdrant.tech/documentation/)

4. **Get Help**:
   - Open issue in GitHub repository
   - Email: info@panaversity.org

---

## Next Steps

After successful deployment:

1. ✅ Test all features with the checklist above
2. ✅ Share your site URL with users
3. ✅ Monitor usage and performance
4. ✅ Add remaining chapters (6-26) following CHAPTER_TEMPLATE.md
5. ✅ Re-run ingestion script after adding content

**Congratulations! Your Physical AI Textbook is now live! 🎉🤖**
