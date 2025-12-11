# Color Token Dashboard

A React application for visualizing and analyzing color token matching data with 620 colors.

## Features

- 🎨 Visual representation of all 620 colors
- ✅ 85 Exact matches
- ≈ 323 Similar matches  
- ✗ 212 Unmatched colors
- 🔍 Real-time search and filtering
- 📊 Sort by usage, distance, family, or hex code
- 🏷️ Quick tab navigation
- 📱 Responsive design

## Quick Start

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager

### One-Click Installation & Run

**Windows (PowerShell):**
```powershell
npm install && npm run dev
```

**Mac/Linux (Terminal):**
```bash
npm install && npm run dev
```

The app will automatically open at `http://localhost:5173`

## Detailed Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite (fast build tool)
- Development dependencies

### 2. Run Development Server

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot-reload enabled.

### 3. Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts (press Enter to accept defaults).

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"

That's it! Vercel auto-detects Vite and deploys instantly.

### Method 3: Deploy from VS Code

1. **Install Vercel Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search "Vercel"
   - Install the official Vercel extension

2. **Deploy:**
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Vercel: Deploy"
   - Follow the prompts

## Project Structure

```
color-dashboard-app/
├── src/
│   ├── App.jsx              # Main dashboard component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── colorData.json       # All 620 colors data
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm start` | Alias for `npm run dev` |

## Customization

### Change Port

Edit `package.json`:
```json
"scripts": {
  "dev": "vite --port 3000"
}
```

### Add Custom Styling

Edit `src/index.css` or add styles directly in `App.jsx`.

### Modify Color Data

Edit `src/colorData.json` to update the color dataset.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Vercel Deployment Issues

Make sure you have a `vercel.json` (optional) or let Vercel auto-detect settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Build time:** ~5-10 seconds
- **First load:** <1 second
- **All 620 colors:** Instant filtering and sorting
- **Bundle size:** ~150KB gzipped

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (10x faster than Webpack)
- **CSS-in-JS** - Inline styles for simplicity
- **No external UI libraries** - Lightweight & fast

## License

MIT License - Free to use and modify

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Vite documentation: https://vitejs.dev
3. Review Vercel documentation: https://vercel.com/docs

---

Built with ❤️ using React + Vite
