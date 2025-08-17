# 🚀 Netlify Deployment Setup Guide

## Quick Fix for Blank Page Issue

The blank page issue is likely due to missing environment variables. Here's how to fix it:

### 1. Set Environment Variables in Netlify

Go to your Netlify site dashboard → **Site Settings** → **Environment Variables** and add:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon public** key → Use as `VITE_SUPABASE_ANON_KEY`

### 3. Redeploy Your Site

After adding environment variables:
1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

## Demo Mode (No Supabase Required)

If you don't want to set up Supabase yet, the app will run in **Demo Mode**:
- ✅ Landing page works perfectly
- ✅ All forms work with simulated responses
- ✅ Photo gallery shows beautiful demo photos
- ⚠️ Yellow banner indicates demo mode
- ❌ No real data persistence

## Full Functionality Setup

For complete functionality, you need:

### 1. Supabase Project Setup
```sql
-- Create tables (run in Supabase SQL editor)
-- See database-schema.sql for complete setup
```

### 2. Storage Bucket
```sql
-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('wedding-photos', 'wedding-photos', false);
```

### 3. Row Level Security
```sql
-- Enable RLS and create policies
-- See database-schema.sql for complete policies
```

## Build Settings

Netlify should auto-detect these, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

## Troubleshooting

### Still seeing blank page?
1. Check Netlify build logs for errors
2. Verify environment variables are set correctly
3. Try redeploying
4. Check browser console for JavaScript errors

### Demo mode not showing?
1. Clear browser cache
2. Check if environment variables are accidentally set to placeholder values
3. Verify app is loading JavaScript files correctly

### Need help?
- Check the main README.md for detailed setup instructions
- Review Netlify build logs for specific error messages
- Ensure all dependencies are correctly listed in package.json

---

🎉 **Once environment variables are set, your Wedding Planner app will be fully functional!**