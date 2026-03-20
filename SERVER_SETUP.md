# 🚀 Local Email System Setup Guide

This project now uses a **local Node.js backend** with **Nodemailer** to handle email sending locally.

## 📋 Prerequisites

- Gmail account
- Node.js installed (v16+)

## 🔧 Configuration

### Step 1: Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords** (appears after 2FA is enabled)
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character password - **copy this**

### Step 2: Update `.env` Files

**File: `server/.env`**
```
EMAIL_USER=kailashnathac@gmail.com
EMAIL_PASSWORD=your-16-char-app-password-here
PORT=5000
```

**File: `.env` (root)**
```
VITE_API_URL=http://localhost:5000
```

## 🎯 How to Run

### Development Mode (Frontend + Backend)

Run both frontend and backend simultaneously:
```bash
npm run dev:all
```

This will start:
- ✅ Frontend on `http://localhost:5173`
- ✅ Backend on `http://localhost:5000`

### Individual Commands

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run dev:server
```

**Backend production:**
```bash
cd server && npm start
```

## 📧 How It Works

1. User fills out the contact form on your portfolio
2. Form data is sent to `http://localhost:5000/api/send-email`
3. Backend server receives the request
4. Nodemailer sends email via Gmail SMTP
5. Email arrives at `kailashnathac@gmail.com` with sender's info

## ✅ Email Features

The received email will contain:
- **Sender Name** and **Email Address** (clearly shown)
- **Subject** (what they entered)
- **Message** (their complete message)
- Professional HTML formatting

## 🔍 Troubleshooting

**"Failed to send message"**
- Check `.env` file has correct Gmail credentials
- Verify Gmail app password is correct
- Ensure 2-Step Verification is enabled on your Gmail account

**"Cannot POST /api/send-email"**
- Backend server is not running
- Run `npm run dev:all` to start both frontend and backend

**Server won't start**
- Check if port 5000 is already in use
- Change `PORT` in `server/.env` to another port (e.g., 5001)

## 📁 Project Structure

```
📦 Claud_Project
├── 📂 src/
│   └── components/
│       └── Contact.jsx          (Updated - uses local API)
├── 📂 server/                   (NEW - Backend server)
│   ├── server.js               (Express + Nodemailer)
│   ├── package.json
│   └── .env                    (Gmail credentials)
├── .env                        (Frontend config)
└── package.json               (Updated scripts)
```

## 🎉 You're All Set!

Your local email system is ready to use. All emails will be received at `kailashnathac@gmail.com` with full sender information.
