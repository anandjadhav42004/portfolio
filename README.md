# Anand Jadhav - Full Stack Developer Portfolio

A premium, award-winning portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Features smooth animations, dark theme, responsive design, and GitHub integration.

## 🚀 Features

- ✨ **Modern Design** - Cyberpunk + minimal aesthetic with glassmorphism
- 🎨 **Smooth Animations** - Framer Motion powered transitions and interactions
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🌙 **Dark Mode** - Beautiful dark theme with neon accents
- ⚡ **Performance** - Built with Vite for lightning-fast development and production builds
- 📊 **GitHub Integration** - Auto-fetch repositories and stats using GitHub API
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML
- 🔧 **Easy Customization** - Simple data files and component structure

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── Experience.tsx
│   │   ├── GitHub.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── MouseGlow.tsx
│   │   └── BackgroundParticles.tsx
│   ├── data/
│   │   └── portfolio.ts
│   ├── utils/
│   │   └── animations.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Axios** - HTTP client (optional)

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/anandjadhav42004/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_GITHUB_USERNAME=your_github_username
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

The GitHub token is optional but recommended to avoid API rate limits.

The Anthropic API key for AI features is entered by the user directly in the UI.

### 4. Update Portfolio Data

Edit `src/data/portfolio.ts` with your information:

```typescript
export const portfolioData = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  // ... other details
}
```

### 5. Run Development Server

```bash
npm run dev
```

The portfolio will open at `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and configure it
5. Click Deploy

**Environment Variables on Vercel:**
- Go to Project Settings → Environment Variables
- Add `VITE_GITHUB_TOKEN` (optional)
- Add `VITE_GITHUB_USERNAME`

### Deploying to Netlify

1. Connect your GitHub repository
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Deploy

### Manual Deployment (Any Host)

```bash
npm run build
# Upload the 'dist' folder to your hosting
```

## 🎨 Customization Guide

### Colors & Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  'neon-blue': '#00d4ff',
  'neon-purple': '#b026ff',
  'neon-cyan': '#00ffff',
  'neon-pink': '#ff006e',
}
```

### Fonts

Update font imports in `index.html` and adjust in `tailwind.config.js`.

### Portfolio Content

All content is managed in `src/data/portfolio.ts`. Update:

- Personal information
- Skills and proficiency levels
- Projects
- Certifications
- Experience timeline
- Statistics

### Adding New Sections

1. Create a new component in `src/components/`
2. Import it in `App.tsx`
3. Add to the render order

## 📝 Components Overview

### Hero
Full-screen landing with rotating role title, social links, and CTA buttons.

### About
Personal bio, quick stats, and skill categories overview.

### Skills
Animated progress bars showing proficiency in different technologies.

### Projects
Featured projects with images, descriptions, tech stacks, and links.

### Certifications
Professional certifications and credentials with verify links.

### Experience
Timeline view of internships, hackathons, and freelance work.

### GitHub
Live GitHub repository feed and contribution stats.

### Contact
Contact form with email, phone, and social media integration.

## 🎯 Performance Optimization

- Lazy loading for images
- Code splitting with Vite
- Optimized animations with GPU acceleration
- Minified CSS and JavaScript in production
- WebP image support (where applicable)

## 🔐 Security

- No sensitive data in the repository
- Environment variables for API keys
- Safe external link handling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit PRs.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips for Best Results

1. **High-Quality Images** - Use optimized images for projects
2. **Clear Descriptions** - Write concise, impactful project descriptions
3. **Update Regularly** - Keep your portfolio updated with new projects
4. **Test Responsiveness** - Check on multiple devices
5. **Monitor Performance** - Use lighthouse for optimization

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- --port 3001
```

### GitHub API Rate Limit
- Add a GitHub token in `.env.local` for higher limits
- Token not needed for public data access

### Build Errors
```bash
rm -rf node_modules
npm install
npm run build
```

## 📞 Support

For issues and questions, create an issue on GitHub.

## 🎊 Final Touches

1. Add your favicon to `public/`
2. Update favicon link in `index.html`
3. Add Google Analytics (optional)
4. Set up custom domain (if on Vercel/Netlify)
5. Add SSL certificate (most hosts provide this automatically)

---

**Happy coding! 🚀**

Made with ❤️ and React by [Anand Jadhav](https://github.com/anandjadhav42004)
