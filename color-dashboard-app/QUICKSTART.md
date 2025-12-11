# 🚀 QUICK START GUIDE

## One-Click Setup & Run

### Windows Users
1. Double-click `setup.bat`
2. Wait for installation
3. App opens automatically at http://localhost:5173

### Mac/Linux Users
1. Open Terminal in this folder
2. Run: `./setup.sh`
3. App opens automatically at http://localhost:5173

**OR simply run:**
```bash
npm install && npm run dev
```

---

## Deploy to Vercel (3 Steps)

### Option 1: Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub + Vercel (No CLI)
1. Push code to GitHub
2. Go to vercel.com → Import Project
3. Select your repo → Deploy
   
**Done! Live in 30 seconds.**

---

## Common Commands

| Action | Command |
|--------|---------|
| Install | `npm install` |
| Run Dev Server | `npm run dev` |
| Build Production | `npm run build` |
| Deploy | `vercel --prod` |

---

## Need Help?

- **Port already in use?** Close other apps or change port in package.json
- **npm not found?** Install Node.js from https://nodejs.org
- **Build errors?** Delete `node_modules` and run `npm install` again

---

**Pro Tip:** VS Code users can press `Ctrl+~` to open terminal, then run `npm run dev`
