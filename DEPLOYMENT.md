# 🚀 Deployment Guide

This guide will help you deploy your portfolio to various platforms.

## Deployment Options

- [Vercel](#vercel-recommended) - Recommended
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)

---

## Vercel (Recommended ⭐)

Vercel is optimized for Next.js and Vite projects. Deployment is instant and automatic.

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Visit Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Import Project"
   - Select your portfolio repository

3. **Configure**
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**
   - Go to Settings → Environment Variables
   - Add `VITE_GITHUB_TOKEN` (optional, for higher API limits)
   - Add `VITE_GITHUB_USERNAME=anandjadhav42004`

5. **Deploy**
   - Click "Deploy"
   - Your site will be live in seconds!

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your domain registrar's DNS settings
4. Vercel will provide DNS records

---

## Netlify

### Steps:

1. **Connect GitHub**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node version: 18.x or higher

3. **Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add your environment variables

4. **Deploy**
   - Netlify will automatically deploy on push!

---

## GitHub Pages

### Steps:

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     // ... other config
     base: '/portfolio/', // or your repo name
   })
   ```

2. **Create GitHub Action Workflow**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root

---

## Custom Server

### Using Node + Express

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create server.js**
   ```javascript
   import express from 'express'
   import path from 'path'
   
   const app = express()
   const __dirname = path.resolve()
   
   app.use(express.static(path.join(__dirname, 'dist')))
   
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
   })
   
   const PORT = process.env.PORT || 3000
   app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`)
   })
   ```

3. **Deploy**
   - Push to your server
   - Run: `npm install && npm run build && node server.js`

### Using Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/portfolio/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=0 /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and Run

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Performance Optimization for Deployment

### 1. Enable Compression
Most hosts enable gzip by default. Verify with:
```bash
curl -I https://yourdomain.com
```

Look for `Content-Encoding: gzip`

### 2. Add Caching Headers
For static files, cache for 1 year:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Use CDN
- Vercel has built-in CDN
- Netlify has built-in CDN
- For custom servers, use Cloudflare

### 4. Monitor Performance
- Google PageSpeed Insights
- WebPageTest
- GTmetrix

---

## SSL/HTTPS

- **Vercel**: Automatic (Let's Encrypt)
- **Netlify**: Automatic (Let's Encrypt)
- **GitHub Pages**: Automatic
- **Custom Server**: Use Certbot or your host's SSL provider

---

## Environment Variables for Different Platforms

### Vercel
```
VITE_GITHUB_TOKEN=your_token
VITE_GITHUB_USERNAME=anandjadhav42004
```

### Netlify
Same as above in Site Settings → Build & Deploy → Environment

### Environment File
Create `.env.production`:
```
VITE_GITHUB_TOKEN=your_token
VITE_GITHUB_USERNAME=anandjadhav42004
```

---

## Troubleshooting

### Blank Page on Load
- Check browser console for errors
- Verify `base` path in vite.config.ts

### Images Not Loading
- Check public folder
- Verify relative paths
- Use absolute paths from public folder

### Styles Not Applied
- Clear browser cache
- Check CSS bundle in dist folder
- Verify Tailwind purge settings

### GitHub API Not Working
- Verify GitHub token if used
- Check rate limits: https://api.github.com/rate_limit
- GitHub API requires PAT for higher limits

### Build Fails on Vercel/Netlify
- Check Node version (needs 16+)
- Verify environment variables
- Check build logs for errors

---

## Tips for Success

1. **Always test locally first**
   ```bash
   npm run build
   npm run preview
   ```

2. **Use meaningful commit messages**
   ```bash
   git commit -m "Update portfolio with new projects"
   ```

3. **Set up auto-deploy**
   - Most platforms auto-deploy on push
   - Verify in Settings

4. **Monitor your site**
   - Set up uptime monitoring
   - Use error tracking (Sentry, etc.)

5. **Regular updates**
   - Update dependencies monthly
   - Keep portfolio content fresh

---

## Quick Deployment Checklist

- [ ] Update portfolio data in `src/data/portfolio.ts`
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Push to GitHub
- [ ] Deploy on Vercel/Netlify
- [ ] Test on production
- [ ] Set up custom domain
- [ ] Enable analytics
- [ ] Monitor performance

---

**You're all set! 🎉 Your portfolio is now live!**
