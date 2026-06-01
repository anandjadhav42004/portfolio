# 🚀 Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Install & Run (2 min)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:3000

## Step 2: Customize Your Info (2 min)

Edit `src/data/portfolio.ts` and update:

```typescript
export const portfolioData = {
  name: 'Your Name',  // Change this
  title: 'Your Title',  // Change this
  subtitle: 'AI Enthusiast | Your Skills',  // Change this
  bio: 'Your bio here...',  // Change this
  email: 'your@email.com',  // Change this
  phone: '+91 XXXXXXXXXX',  // Change this
  location: 'Your City, Country',  // Change this
  github: 'yourgithubusername',  // Change this
  linkedin: 'yourlinkedin',  // Change this
  twitter: 'yourtwitter',  // Change this
}
```

## Step 3: Update Your Data (1 min)

Still in `src/data/portfolio.ts`:

### Add Your Skills
```typescript
export const skills = {
  frontend: [
    { name: 'React', level: 90 },  // Update level (0-100)
    // Add your skills here
  ],
  // Update other categories
}
```

### Add Your Projects
```typescript
export const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'What your project does',
    image: 'https://image-url.com/image.jpg',  // Add image URL
    tags: ['React', 'Node.js'],  // Add tags
    github: 'https://github.com/yourgithub/project',
    live: 'https://your-project.com',
  },
  // Add more projects
]
```

## Configuration Checklist

- [ ] Updated portfolio name and title
- [ ] Updated bio and description
- [ ] Updated email and phone
- [ ] Updated social media links
- [ ] Added your skills
- [ ] Added your projects
- [ ] Updated certifications
- [ ] Updated experience

## File Locations

| What to Update | Where |
|---|---|
| Personal Info | `src/data/portfolio.ts` (lines 1-12) |
| Skills | `src/data/portfolio.ts` (lines 14-50) |
| Projects | `src/data/portfolio.ts` (lines 52-85) |
| Certifications | `src/data/portfolio.ts` (lines 87-110) |
| Experience | `src/data/portfolio.ts` (lines 112-138) |

## Add Images to Projects

1. Use high-quality images
2. Recommended size: 500x300px
3. Use hosting services:
   - Imgbb.com (free)
   - Unsplash (free stock photos)
   - Your own CDN

Example:
```typescript
image: 'https://imgbb.com/your-image-url'
```

## Customizing Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'neon-blue': '#00d4ff',      // Main color
  'neon-purple': '#b026ff',    // Accent
  'neon-cyan': '#00ffff',      // Highlight
  'neon-pink': '#ff006e',      // Extra accent
}
```

## Common Customizations

### Change Navbar Color
Edit `src/components/Navbar.tsx` and modify the className colors

### Change Hero Title Text
Edit `src/components/Hero.tsx`:
```typescript
const roles = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
]
```

### Update Social Icons
Edit `src/components/Hero.tsx` or `src/components/Contact.tsx`:
```typescript
[
  { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub' },
  // Add your social links
]
```

## Environment Setup (GitHub API - Optional)

To auto-fetch your GitHub repositories:

1. Create `.env.local` (copy from `.env.example`)
2. Add your GitHub username:
   ```
   VITE_GITHUB_USERNAME=yourgithubusername
   ```

For higher API limits, add a GitHub token:
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Create a token with `public_repo` scope
3. Add to `.env.local`:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   ```

## Building for Production

```bash
# Build the project
npm run build

# Test the production build
npm run preview
```

## Deploy (Choose One)

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
1. Push to GitHub
2. Connect your repo on netlify.com
3. Auto-deploy!

### Option 3: GitHub Pages
1. Push to GitHub
2. Enable Pages in Settings
3. Site published!

See `DEPLOYMENT.md` for detailed instructions.

## Troubleshooting

### Port 3000 is busy?
```bash
npm run dev -- --port 3001
```

### Changes not showing?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

### GitHub repos not showing?
- Check GitHub username in `.env.local`
- Check browser console for API errors
- GitHub API might be rate limited

### Build fails?
```bash
# Clear and reinstall
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. ✅ Customize your portfolio
2. ✅ Test on mobile
3. ✅ Deploy to Vercel/Netlify
4. ✅ Set up custom domain
5. ✅ Add Google Analytics
6. ✅ Share with recruiters!

## Tips for Better Results

- Use **professional photos** for projects
- Write **clear descriptions** for each project
- Keep **skills list updated**
- Add **real project links**
- Test on **mobile devices**
- Use **high-quality images**

## Documentation

- Full guide: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- Tech stack info: See `package.json`

---

**That's it! Your portfolio is ready! 🎉**

Need help? Check the issues on GitHub or review the full README.md
