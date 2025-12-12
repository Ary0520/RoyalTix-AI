# 🚀 Deployment Guide

This guide covers deploying RoyalTix AI to various platforms.

## 🌐 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Quick Deploy

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Environment Variables**
   Add these in your Vercel dashboard:
   ```
   NEXT_PUBLIC_STORY_RPC_URL=https://aeneid.storyrpc.io
   STORY_PRIVATE_KEY=your_wallet_private_key
   STORY_NFT_CONTRACT_ADDRESS=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc
   HF_TOKEN=your_hugging_face_token
   GROQ_API_KEY=your_groq_api_key
   PINATA_JWT=your_pinata_jwt_token
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## 🐳 Docker

### Build Docker Image

```bash
# Build the image
docker build -t royaltix-ai .

# Run the container
docker run -p 3000:3000 --env-file .env.local royaltix-ai
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
```

## ☁️ Other Platforms

### Netlify

1. Build command: `npm run build`
2. Publish directory: `out`
3. Add environment variables in Netlify dashboard

### Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### AWS Amplify

1. Connect your repository
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## 🔒 Security Considerations

### Environment Variables

- **Never commit** `.env.local` to version control
- Use different keys for development and production
- Rotate API keys regularly
- Use Vercel's environment variable encryption

### Private Keys

- Store private keys securely (use Vercel's encrypted env vars)
- Consider using a dedicated wallet for the application
- Monitor wallet balance and transactions

### API Rate Limits

- Implement rate limiting for API endpoints
- Monitor usage of external APIs (Hugging Face, Groq, Pinata)
- Set up alerts for unusual activity

## 📊 Monitoring

### Analytics

- Add Google Analytics or similar
- Monitor user interactions
- Track content creation and marketplace activity

### Error Tracking

- Integrate Sentry or similar service
- Monitor API failures
- Track blockchain transaction failures

### Performance

- Use Vercel Analytics
- Monitor Core Web Vitals
- Optimize images and assets

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Verify API keys are valid

3. **Blockchain Issues**
   - Check wallet has testnet tokens
   - Verify RPC URL is correct
   - Monitor transaction status

### Support

- Check GitHub Issues
- Review deployment logs
- Test locally first

---

**Ready to deploy? Let's get RoyalTix AI live! 🚀**