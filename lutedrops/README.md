# 🎓 LuteDrops

**Free stuff drops at Pacific Lutheran University.**  
Built for the PLU hackathon by a Lute, for the Lutes.

---

## What is LuteDrops?

LuteDrops is a PWA (installable mobile app) where PLU students can post free stuff — leftover food, textbooks, event tickets, sports gear — and other students get pinged based on their preferences.

Every drop shows:
- **Who's hosting** (name + star rating)
- **What they're giving away**
- **Where on campus** to get it
- **When** it's available

Hosts build a credibility reputation through star ratings from other students.

---

## Features

- 📦 **Drop Feed** — Browse all active drops, filter by category, search by host or location
- 🔔 **Ping Preferences** — Choose which categories notify you (Food, Study, Events, etc.)
- ⭐ **Host Ratings** — Rate hosts after a drop. Top hosts build trust over time
- 👤 **Profile Page** — Your drop history, badges, rating, and editable bio
- 📱 **PWA** — Installs on iPhone and Android like a native app

---

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — makes it installable on phones
- Deployed via [GitHub Pages](https://pages.github.com/)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lutedrops.git
cd lutedrops
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173/lutedrops/](http://localhost:5173/lutedrops/)

---

## Deploying to GitHub Pages

### First time setup

1. Go to your GitHub repo → **Settings → Pages**
2. Set source branch to `gh-pages`

### Deploy

```bash
npm run deploy
```

Your app will be live at:
```
https://YOUR_USERNAME.github.io/lutedrops/
```

---

## Installing on Your Phone

### iPhone
1. Open the live URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**

### Android
1. Open the live URL in **Chrome**
2. Tap the **3-dot menu**
3. Tap **"Add to Home Screen"** (Chrome may auto-prompt)

---

## Project Structure

```
lutedrops/
├── public/
│   ├── icon-192.png       ← App icon (add your own)
│   └── icon-512.png       ← App icon large (add your own)
├── src/
│   ├── App.jsx            ← Main app + routing
│   ├── data.js            ← Shared constants + sample data
│   ├── components.jsx     ← Shared UI (Stars, Avatar, Toast, etc.)
│   ├── DropCard.jsx       ← Individual drop card
│   ├── PostModal.jsx      ← New drop form
│   ├── ProfilePage.jsx    ← User profile + edit
│   ├── main.jsx           ← Entry point
│   └── index.css          ← Global reset
├── index.html
├── vite.config.js
└── package.json
```

---

## Adding App Icons

Add two square PNG images to the `/public` folder:
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

You can generate them at [favicon.io](https://favicon.io) or use any PLU-themed image.

---

## Future Ideas

- 🔥 Firebase backend so drops sync between users in real time
- 🗺️ Campus map view showing where drops are located
- 🏆 Leaderboard of top-rated hosts
- 🔐 PLU email login (only real Lutes can post)

---

*Go Lutes! 🎓*
