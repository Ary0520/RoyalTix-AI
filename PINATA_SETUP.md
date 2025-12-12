# 📌 Pinata IPFS Setup Guide

## Why You Need Pinata

Currently, your NFT images aren't showing in Story Explorer because we're using **fake IPFS URIs**. To make images visible, we need to upload them to **real IPFS** using Pinata.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Pinata Account
1. Go to https://pinata.cloud/
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key
1. Go to https://app.pinata.cloud/keys
2. Click "New Key"
3. Give it a name like "RoyalTix AI"
4. Copy the JWT token (starts with `eyJ...`)

### Step 3: Add to Environment
1. Open your `.env.local` file
2. Add your JWT:
```env
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_jwt_here
```

### Step 4: Test
1. Restart your dev server: `npm run dev`
2. Go to `/test-story` and run the test
3. Your images will now show in Story Explorer! 🎉

## 🆓 Free Tier Limits
- 1GB storage
- 100 requests/month
- Perfect for hackathon demos!

## 🔄 Fallback Behavior
If Pinata isn't configured:
- ✅ Blockchain registration still works
- ✅ IP assets are still created
- ❌ Images won't show in explorer (but still work in your app)

## 🎯 Result
With Pinata configured, your NFTs will show beautiful images in Story Explorer, making your demo much more impressive! 🖼️✨