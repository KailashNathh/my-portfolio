# 🚀 Deployment Guide - Vercel

This guide will help you deploy your portfolio to **Vercel** with both frontend and backend working seamlessly.

## 📋 Prerequisites

- ✅ GitHub account (to push code)
- ✅ Vercel account (free at vercel.com)
- ✅ Gmail account with App Password
- ✅ Git installed on your machine

---

## 🔧 Step 1: Prepare Your Code for Deployment

### 1.1 Remove Local Server Folder (Optional)
Since we're using Vercel's serverless functions, the `/server` folder isn't needed:

```bash
# You can delete this folder (optional)
rm -r server
```

### 1.2 Ensure `.env` is in `.gitignore`
```bash
echo ".env" >> .gitignore
```

### 1.3 Create `.env.local` (Local Development)
```bash
# Development only - don't commit
VITE_API_URL=http://localhost:5000
```

---

## 📤 Step 2: Push Code to GitHub

### 2.1 Initialize Git Repository
```bash
cd d:\Claud_Project
git init
git add .
git commit -m "Initial commit: Portfolio with email system"
```

### 2.2 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create new repository: `my-portfolio`
3. Copy the repository URL

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Authorize GitHub and select `my-portfolio`

### 3.2 Configure Project Settings
1. **Framework Preset**: Select **"Vite"**
2. **Root Directory**: Leave as `.` (root)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.3 Add Environment Variables ⚠️ IMPORTANT
Click **"Environment Variables"** and add:

```
KEY: EMAIL_USER
VALUE: kailashnathac@gmail.com

KEY: EMAIL_PASSWORD  
VALUE: your-16-character-gmail-app-password
```

**How to get Gmail App Password:**
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already)
3. Search for **"App passwords"**
4. Select **Mail** → **Windows Computer** (or your device)
5. Copy the 16-character password → Paste in Vercel

### 3.4 Deploy
Click **"Deploy"** and wait for the build to complete ✅

---

## ✅ Step 4: Verify Deployment

After deployment, Vercel gives you:
- **Frontend URL**: `https://my-portfolio.vercel.app`
- **API URL**: `https://my-portfolio.vercel.app/api`

### Test Form Submission:
1. Go to your portfolio URL
2. Scroll to Contact section
3. Fill and submit the form
4. Check your email (`kailashnathac@gmail.com`)

### Test API Directly:
```bash
curl -X POST https://your-portfolio.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "from_name": "Test User",
    "from_email": "test@example.com",
    "subject": "Test",
    "message": "Testing deployment"
  }'
```

---

## 🔄 Step 5: Make Updates

After deployment, any changes are easy:

### Update Code:
```bash
# Make changes locally
git add .
git commit -m "Update: Fixed contact form"
git push origin main
```

Vercel automatically rebuilds and deploys! 🚀

---

## 🆘 Troubleshooting

### ❌ "Failed to send email on Vercel"
**Solution:**
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` environment variables are set
- Check Gmail allows "Less secure apps" is enabled (no longer available)
- Use Gmail App Password (16 characters) instead
- Ensure 2-Step Verification is enabled on your Gmail account

### ❌ "API endpoint returns 404"
**Solution:**
- Check `api/send-email.js` exists in project root
- Verify `vercel.json` is configured correctly
- Check `VITE_API_URL=/api` in Vercel environment

### ❌ "CORS errors"
**Solution:**
- CORS headers are set in `api/send-email.js`
- Should work automatically on Vercel
- For local dev, ensure backend runs on separate port

### ❌ "Build fails on Vercel"
**Solution:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `node_modules` is in `.gitignore`

---

## 📊 Monitoring & Analytics

### View Logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Functions"** tab to see API logs
4. Check for errors in email sending

### Monitor Performance:
- Vercel provides analytics automatically
- Track API response times
- Monitor function execution

---

## 🔐 Security Best Practices

✅ **DO:**
- Use Gmail App Password (not your actual password)
- Never commit `.env` file to Git
- Keep environment variables secret in Vercel dashboard
- Use HTTPS (Vercel provides this by default)

❌ **DON'T:**
- Don't hardcode credentials in code
- Don't share `.env` file
- Don't use your Gmail main password
- Don't push API keys to GitHub

---

## 📈 Next Steps

After successful deployment:

### Add Custom Domain:
1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

### Add Analytics:
```bash
npm install @vercel/analytics @vercel/web-vitals
```

### Enable Caching:
Update `vercel.json` for better performance

### Setup Monitoring:
Use Vercel's built-in error tracking

---

## 🎉 You're Live!

Your portfolio is now deployed and accessible worldwide! 

**Your portfolio URL:** `https://your-portfolio.vercel.app`

Share it with anyone interested in hiring or collaborating! 🚀
