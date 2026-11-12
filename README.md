# A Little Dreamy World for Bangaram ❤️🧸

A romantic, mobile-first React + Vite interactive storytelling website built with Framer Motion and CSS art teddy bears.

## ✨ Features

- **9 Interactive Scenes**: Welcome, Apology (typing animation + single-dodge button + happy/crying teddy), Why You're Special (3D glassmorphism cards), Interactive 3D Envelope & Letter, My Promises, Flirty Lines, Polaroid Memories Gallery with Lightbox, The Big Question (playfully dodging NO button), and Grand Finale Hug.
- **100% Frontend-Only**: No backend, database, API keys, or environment variables required.
- **Easy Personalization**: Every message, title, promise, flirt line, and photo caption lives in `src/data/content.js`.
- **Background Music**: Includes a gentle, royalty-free music-box loop in `public/audio/background-music.wav` (starts only on user click).

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (e.g., `http://localhost:5173`) in your browser or test on mobile via `--host`.

### Production Build & Preview

```bash
npm run build
npm run preview
```

---

## 🎨 How to Customize

1. **Edit Messages & Text**
   Open `src/data/content.js` and edit any text, reasons, letter paragraphs, promises, flirty lines, or captions.

2. **Add Your Own Photos**
   - Place your photos inside `public/images/memories/` (for example `memory-1.jpg` through `memory-6.jpg`).
   - Update the `src` paths and `caption` strings in `content.memories.photos` inside `src/data/content.js`.

3. **Replace Background Music**
   - Drop your own royalty-free MP3 file at `public/audio/background-music.mp3` (it will automatically take priority over the bundled `background-music.wav`).

---

## 🚀 Deploy on Vercel

1. Push this project folder to a GitHub/GitLab/Bitbucket repository (or use the Vercel CLI).
2. Import the project in [Vercel](https://vercel.com):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy** — `vercel.json` is already configured so refreshing the page works seamlessly.

Or deploy directly from the terminal:

```bash
npx vercel --prod
```
