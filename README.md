# Edmund's FOS Detector - Deployment Instructions

## Quick Setup Guide

### Step 1: Get your OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (it starts with `sk-`)

### Step 2: Deploy to Vercel (Free)

#### Option A: One-Click Deploy (Easiest)
1. Go to https://vercel.com
2. Sign up/login with your GitHub account
3. Click "Add New Project"
4. Import your `fos-detector` repository
5. Add environment variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

#### Option B: Command Line Deploy
```bash
# In the fos-detector directory
npx vercel

# Follow the prompts:
# - Login/signup when asked
# - Select the project settings (accept defaults)
# - When deployment is complete, add your API key:

npx vercel env add OPENAI_API_KEY
# Paste your OpenAI API key when prompted
# Select all environments (Production, Preview, Development)

# Deploy to production:
npx vercel --prod
```

### Step 3: Your App is Live!
After deployment, Vercel will give you a URL like:
- `https://fos-detector.vercel.app`
- Or `https://fos-detector-[username].vercel.app`

Share this link with anyone to use your FOS Detector!

## Local Testing (Optional)
To test locally before deploying:
```bash
# Create .env.local file with your API key
echo "OPENAI_API_KEY=your_key_here" > .env.local

# Run locally
npx vercel dev

# Open http://localhost:3000 in your browser
```

## Troubleshooting
- If "Analysis failed" appears: Check that your OpenAI API key is correct
- If deployment fails: Make sure you're in the fos-detector directory
- If you see CORS errors: The app must be accessed through Vercel, not GitHub Pages

## Costs
- Vercel hosting: Free (includes API functions)
- OpenAI API: Pay-per-use (about $0.002 per analysis with GPT-4o-mini)

## Support
Your FOS Detector is now a full-stack application with:
- Professional dark-themed interface
- Real AI-powered analysis using GPT-4
- Secure API key handling (never exposed to users)
- Instant deployment and sharing capabilities