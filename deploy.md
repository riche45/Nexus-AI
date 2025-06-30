# 🚀 Deployment Instructions

## Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import your `nexus-ai-hackathon-2025` repository
4. Vercel will auto-detect it's a Vite project
5. Deploy with default settings

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

### Option 3: GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"homepage": "https://your-username.github.io/nexus-ai-hackathon-2025",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## Environment Setup
No environment variables needed for this demo - everything runs client-side!

## Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Demo Features to Highlight
- ✅ Landing page with smooth animations
- ✅ Onboarding flow simulation
- ✅ Interactive dashboard with real-time data
- ✅ AI engine simulation
- ✅ Responsive design
- ✅ Modern React/TypeScript architecture 