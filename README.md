# AG Photography — Premium OTT Streaming Platform

A luxury wedding cinematography platform inspired by Netflix / Apple TV UI.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the React app
npm run build

# 3. Run the file-backed website server
npm start
# Opens at http://localhost:3000
```

## Admin Panel

- Click the **⚙** gear icon (top-right nav)
- Password: **ag2024**
- Add YouTube links, thumbnails, categories, and more
- Films appear instantly on the homepage
- All entries are saved in `data/events.json`
- Deleting an event in the admin panel removes it from `data/events.json`
- Backdoor admin page: `http://localhost:3000/admin.html`
- Use **Fetch Video Title, Duration & Thumbnail** beside any YouTube link to auto-fill film details

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Folder Structure

```
ag-photography/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx        ← Main platform UI
│   └── index.js       ← React entry point
├── package.json
└── README.md
```

## Tech Stack
- React 18
- CSS-in-JS (inline styles + style tag)
- YouTube embed API
- Google Fonts (Cormorant Garamond + Montserrat)

## Color Palette
- Background: #080808
- Gold accent: #C9A84C
- Text: #ffffff

## SEO Keywords
Luxury Wedding Photographer · Wedding Cinematography · Destination Wedding Films ·
Cinematic Wedding Films · Premium Wedding Photography · Wedding Films India ·
Ahmedabad Wedding Photographer
