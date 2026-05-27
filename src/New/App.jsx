import { useState, useEffect, useRef } from "react";

/* ─── THEME ──────────────────────────────────────────────────────────────── */
const G1   = "#2D4A3E";   // deep forest green
const G2   = "#1A3329";   // darker green
const G3   = "#3D6B59";   // mid green
const GOLD = "#C9A84C";
const GOLD_L = "#E8C97A";
const DARK = "#080F0C";
const ADMIN_PW = "ag2024";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const INITIAL_EVENTS = [
  { id:1, title:"Priya & Arjun — A Udaipur Tale", year:2024, location:"Udaipur, Rajasthan", category:"Destination", thumb:"https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80", desc:"A timeless cinematic portrait of love, light, and the magic of one extraordinary day across the golden ghats of Udaipur.", pin:"", featured:true, episodes:[{id:"e1a",title:"The Ceremony",duration:"8 min",youtubeId:"LXb3EKWsInQ"},{id:"e1b",title:"The Reception",duration:"6 min",youtubeId:"LXb3EKWsInQ"},{id:"e1c",title:"Love Story Film",duration:"4 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:2, title:"Meera & Rohan — Jodhpur Royale", year:2024, location:"Jodhpur, India", category:"Celebrity", thumb:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", desc:"A royal three-day celebration set against the blue city of Jodhpur.", pin:"123456", featured:false, episodes:[{id:"e2a",title:"Mehendi & Sangeet",duration:"10 min",youtubeId:"LXb3EKWsInQ"},{id:"e2b",title:"The Wedding Day",duration:"14 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:3, title:"Ananya & Dev — The Venice Edit", year:2024, location:"Venice, Italy", category:"Destination", thumb:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", desc:"Gondolas, cobblestone alleys, and forever — a destination wedding story from the floating city.", pin:"", featured:false, episodes:[{id:"e3a",title:"Pre-Wedding",duration:"7 min",youtubeId:"LXb3EKWsInQ"},{id:"e3b",title:"The Ceremony",duration:"9 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:4, title:"Kavya & Vivek — Santorini Dreams", year:2023, location:"Santorini, Greece", category:"Destination", thumb:"https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", desc:"White-washed walls, blue domes, and a love as vast as the Aegean Sea.", pin:"654321", featured:false, episodes:[{id:"e4a",title:"Arrival",duration:"5 min",youtubeId:"LXb3EKWsInQ"},{id:"e4b",title:"Sunset Ceremony",duration:"12 min",youtubeId:"LXb3EKWsInQ"},{id:"e4c",title:"Highlights",duration:"3 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:5, title:"Shreya & Kabir — A Forest Story", year:2024, location:"Coorg, Karnataka", category:"Love Story", thumb:"https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", desc:"Misty mornings and golden light through the coffee estates of Coorg.", pin:"", featured:false, episodes:[{id:"e5a",title:"Love Story Film",duration:"11 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:6, title:"The Royal Ahmedabad Affair", year:2024, location:"Ahmedabad", category:"Celebrity", thumb:"https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=800&q=80", desc:"Three days of grandeur — a celebration that set the standard for luxury weddings in Gujarat.", pin:"999000", featured:false, episodes:[{id:"e6a",title:"Garba Night",duration:"12 min",youtubeId:"LXb3EKWsInQ"},{id:"e6b",title:"Sangeet",duration:"15 min",youtubeId:"LXb3EKWsInQ"},{id:"e6c",title:"The Wedding",duration:"22 min",youtubeId:"LXb3EKWsInQ"},{id:"e6d",title:"Highlights",duration:"4 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:7, title:"Lakshmi & Aditya — Bali Ritual", year:2024, location:"Bali, Indonesia", category:"Destination", thumb:"https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80", desc:"Sacred temples, tropical light, and a Hindu ceremony woven into the soul of Bali.", pin:"", featured:false, episodes:[{id:"e7a",title:"Temple Blessings",duration:"8 min",youtubeId:"LXb3EKWsInQ"},{id:"e7b",title:"The Ceremony",duration:"16 min",youtubeId:"LXb3EKWsInQ"}]},
  { id:8, title:"Nisha & Kartik — Alps Forever", year:2024, location:"Swiss Alps", category:"Destination", thumb:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", desc:"Snow-capped peaks and a love that towers above everything.", pin:"", featured:false, episodes:[{id:"e8a",title:"Pre-Wedding",duration:"6 min",youtubeId:"LXb3EKWsInQ"},{id:"e8b",title:"The Wedding Film",duration:"14 min",youtubeId:"LXb3EKWsInQ"}]},
];

const CATS = ["Destination","Celebrity","Love Story","Fashion","BTS","Podcast"];
const NAV  = ["Films","Weddings","Destinations","Love Stories","Celebrity","Fashion","Podcasts","BTS"];

function groupBy(events) {
  const m={};
  events.forEach(e=>{ if(!m[e.category])m[e.category]=[]; m[e.category].push(e); });
  return Object.entries(m).map(([label,items])=>({label,items}));
}

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=SF+Pro+Display:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --g1: ${G1};
  --g2: ${G2};
  --g3: ${G3};
  --gold: ${GOLD};
  --dark: ${DARK};
  --glass: rgba(45,74,62,0.35);
  --glass-border: rgba(100,180,140,0.18);
  --glass-hover: rgba(45,74,62,0.55);
}

* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }

.app {
  background: ${DARK};
  color:#fff;
  font-family:'Inter',sans-serif;
  min-height:100vh;
  overflow-x:hidden;
}
.corm { font-family:'Cormorant Garamond',serif; }

/* ── LOADER ── */
.loader {
  position:fixed; inset:0; z-index:9999;
  background:#000;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  transition:opacity .8s ease, transform .8s ease;
}
.loader.out { opacity:0; pointer-events:none; transform:scale(1.04); }
.loader-video {
  width:min(420px,75vw);
  height:auto;
}
.loader-sub {
  margin-top:20px;
  font-size:10px;
  font-weight:500;
  letter-spacing:.45em;
  text-transform:uppercase;
  color:rgba(255,255,255,.28);
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:.28} 50%{opacity:.7} }
.loader-bar-wrap {
  margin-top:28px;
  width:min(200px,50vw);
  height:1px;
  background:rgba(255,255,255,.08);
  overflow:hidden;
}
.loader-bar {
  height:100%;
  background:linear-gradient(to right,transparent,${GOLD},transparent);
  animation:barSlide 1.6s ease-in-out infinite;
}
@keyframes barSlide { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

/* ── NAV ── */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:100;
  padding:0 3.5vw;
  height:64px;
  display:flex; align-items:center; justify-content:space-between;
  background:rgba(8,15,12,0.01);
  border-bottom:1px solid rgba(100,180,140,0.06);
  transition:all .4s;
}
.nav.sc {
  background:rgba(8,15,12,0.82);
  backdrop-filter:blur(28px) saturate(1.4);
  -webkit-backdrop-filter:blur(28px) saturate(1.4);
  border-bottom-color:rgba(100,180,140,0.12);
}
.nav-logo {
  display:flex; align-items:center; gap:10px; cursor:pointer;
}
.nav-logo-text {
  font-family:'Cormorant Garamond',serif;
  font-size:19px; font-weight:500;
  letter-spacing:.22em; text-transform:uppercase;
  color:#fff;
}
.nav-logo-text span { color:${GOLD}; }
.nav-badge {
  font-size:8px; font-weight:700; letter-spacing:.18em;
  text-transform:uppercase;
  color:${GOLD};
  border:1px solid rgba(201,168,76,.4);
  padding:2px 6px;
  margin-left:4px;
}
.nav-links { display:flex; gap:24px; list-style:none; }
.nav-links a {
  font-size:11px; font-weight:400; letter-spacing:.1em;
  text-transform:uppercase; color:rgba(255,255,255,.55);
  text-decoration:none; cursor:pointer; transition:color .2s;
}
.nav-links a:hover { color:#fff; }
.nav-r { display:flex; align-items:center; gap:14px; }
.ibtn {
  background:none; border:none; color:rgba(255,255,255,.5);
  cursor:pointer; font-size:17px; padding:5px;
  transition:color .2s;
}
.ibtn:hover { color:#fff; }

/* ── HERO ── */
.hero {
  position:relative; height:100vh; min-height:600px;
  overflow:hidden; display:flex; align-items:center;
}
.hero-bg {
  position:absolute; inset:0;
  object-fit:cover; width:100%; height:100%;
  filter:brightness(.38) saturate(.7);
  transition:opacity 1.2s ease;
}
/* Green gradient overlay — brand color */
.hero-grad {
  position:absolute; inset:0;
  background:
    linear-gradient(135deg, rgba(26,51,41,.88) 0%, rgba(26,51,41,.1) 60%, transparent 100%),
    linear-gradient(to top, rgba(8,15,12,.95) 0%, transparent 50%),
    linear-gradient(to right, rgba(8,15,12,.6) 0%, transparent 70%);
}
.hero-ct {
  position:relative; z-index:2;
  padding:0 5.5vw;
  max-width:700px;
  margin-top:60px;
}
.hero-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-size:9px; font-weight:600; letter-spacing:.3em;
  text-transform:uppercase; color:${GOLD};
  margin-bottom:18px;
}
.hero-eyebrow::before { content:''; display:block; width:24px; height:1px; background:${GOLD}; }
.hero-title {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(38px,5.8vw,80px);
  font-weight:300; line-height:1.06;
  letter-spacing:.01em; color:#fff;
  margin-bottom:16px;
}
.hero-meta {
  display:flex; align-items:center; gap:14px; flex-wrap:wrap;
  font-size:11px; font-weight:400; letter-spacing:.1em;
  color:rgba(255,255,255,.48); text-transform:uppercase;
  margin-bottom:18px;
}
.dot { width:3px; height:3px; border-radius:50%; background:${GOLD}; opacity:.6; flex-shrink:0; }
.hero-desc {
  font-size:14px; font-weight:300; line-height:1.72;
  color:rgba(255,255,255,.58); margin-bottom:30px; max-width:420px;
}
.hero-btns { display:flex; gap:12px; flex-wrap:wrap; }

/* Liquid glass button */
.btn-play {
  display:flex; align-items:center; gap:10px;
  background:rgba(255,255,255,0.15);
  border:1px solid rgba(255,255,255,0.28);
  backdrop-filter:blur(20px) saturate(1.8);
  -webkit-backdrop-filter:blur(20px) saturate(1.8);
  color:#fff;
  padding:13px 28px;
  font-family:'Inter',sans-serif;
  font-size:12px; font-weight:600; letter-spacing:.1em;
  text-transform:uppercase; cursor:pointer;
  border-radius:100px;
  transition:all .25s;
  box-shadow:0 4px 24px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.15);
}
.btn-play:hover {
  background:rgba(255,255,255,0.22);
  border-color:rgba(255,255,255,.4);
  transform:translateY(-1px);
  box-shadow:0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.2);
}
.btn-play .play-icon { font-size:14px; }

.btn-more {
  display:flex; align-items:center; gap:8px;
  background:rgba(45,74,62,0.4);
  border:1px solid rgba(100,180,140,0.25);
  backdrop-filter:blur(20px) saturate(1.4);
  -webkit-backdrop-filter:blur(20px) saturate(1.4);
  color:rgba(255,255,255,.85);
  padding:13px 24px;
  font-family:'Inter',sans-serif;
  font-size:12px; font-weight:500; letter-spacing:.1em;
  text-transform:uppercase; cursor:pointer;
  border-radius:100px;
  transition:all .25s;
}
.btn-more:hover {
  background:rgba(45,74,62,0.6);
  border-color:rgba(100,180,140,.4);
  transform:translateY(-1px);
}

/* Hero info pill */
.hero-info-pill {
  position:absolute; bottom:7vh; right:5vw; z-index:3;
  background:var(--glass);
  border:1px solid var(--glass-border);
  backdrop-filter:blur(24px) saturate(1.6);
  -webkit-backdrop-filter:blur(24px) saturate(1.6);
  border-radius:16px;
  padding:16px 20px;
  display:flex; flex-direction:column; gap:4px;
  min-width:180px;
  box-shadow:0 8px 32px rgba(0,0,0,.3);
}
.pill-label { font-size:9px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:${GOLD}; }
.pill-val { font-size:13px; font-weight:400; color:#fff; }

/* ── GLASS SHELF TITLES ── */
.shelf-title-area {
  padding:44px 4vw 20px;
  display:flex; align-items:baseline; gap:14px;
}
.shelf-title {
  font-size:18px; font-weight:500;
  color:#fff; letter-spacing:.03em;
}
.shelf-see-all {
  font-size:11px; font-weight:500; letter-spacing:.1em;
  color:rgba(100,180,140,.75); cursor:pointer;
  text-transform:uppercase; transition:color .2s;
}
.shelf-see-all:hover { color:rgba(100,180,140,1); }

/* SCROLL ROW */
.shelf-row {
  display:flex; gap:12px;
  overflow-x:auto; padding:4px 4vw 20px;
  scrollbar-width:none; scroll-behavior:smooth;
}
.shelf-row::-webkit-scrollbar { display:none; }

/* LIQUID GLASS CARD */
.card {
  flex:0 0 auto; width:260px;
  cursor:pointer;
  border-radius:14px;
  overflow:hidden;
  position:relative;
  transition:transform .32s cubic-bezier(.25,.46,.45,.94), box-shadow .32s;
  background:#111;
}
.card:hover {
  transform:scale(1.05) translateY(-6px);
  box-shadow:0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(100,180,140,.2);
  z-index:10;
}
.card-thumb {
  width:100%; aspect-ratio:16/10; object-fit:cover; display:block;
  transition:filter .3s;
}
.card:hover .card-thumb { filter:brightness(.55); }

/* Glass overlay on card */
.card-glass-ov {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(8,15,12,.96) 0%, rgba(8,15,12,.3) 45%, transparent 70%);
  pointer-events:none;
}
.card-play-btn {
  position:absolute; top:50%; left:50%;
  transform:translate(-50%,-52%) scale(0);
  width:48px; height:48px; border-radius:50%;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.35);
  backdrop-filter:blur(12px);
  display:flex; align-items:center; justify-content:center;
  transition:transform .22s, opacity .22s;
  opacity:0;
}
.card:hover .card-play-btn { transform:translate(-50%,-52%) scale(1); opacity:1; }
.card-play-btn svg { width:14px; height:14px; fill:#fff; margin-left:2px; }
.card-pin-badge {
  position:absolute; top:10px; right:10px;
  background:rgba(8,15,12,.7);
  border:1px solid rgba(201,168,76,.5);
  backdrop-filter:blur(8px);
  border-radius:100px;
  padding:3px 9px;
  font-size:9px; font-weight:700; letter-spacing:.1em;
  color:${GOLD};
}
.card-ep-badge {
  position:absolute; bottom:46px; left:10px;
  background:rgba(45,74,62,.7);
  border:1px solid rgba(100,180,140,.25);
  backdrop-filter:blur(8px);
  border-radius:100px;
  padding:3px 9px;
  font-size:9px; font-weight:600;
  color:rgba(255,255,255,.8);
}
.card-info { padding:10px 12px 12px; }
.card-cat {
  font-size:9px; font-weight:600; letter-spacing:.14em;
  text-transform:uppercase; color:rgba(100,180,140,.85); margin-bottom:4px;
}
.card-title {
  font-size:13px; font-weight:500; color:#fff;
  line-height:1.3; margin-bottom:4px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.card-meta {
  display:flex; align-items:center; gap:8px;
  font-size:10px; color:rgba(255,255,255,.35); letter-spacing:.04em;
}

/* ── HERO CAROUSEL DOTS ── */
.hero-dots {
  position:absolute; bottom:3.5vh; left:50%;
  transform:translateX(-50%);
  display:flex; gap:8px; z-index:3;
}
.hero-dot {
  width:6px; height:6px; border-radius:50%;
  background:rgba(255,255,255,.25); cursor:pointer;
  transition:all .3s;
}
.hero-dot.on { width:20px; border-radius:3px; background:${GOLD}; }

/* ── FEATURED COLLECTION GRID ── */
.featured-grid {
  display:grid;
  grid-template-columns:1.6fr 1fr;
  grid-template-rows:auto auto;
  gap:3px;
  margin:0 0 0;
}
.fg-item {
  position:relative; overflow:hidden; cursor:pointer;
}
.fg-item.main { grid-row:span 2; min-height:420px; }
.fg-item img {
  width:100%; height:100%; object-fit:cover;
  transition:transform .6s cubic-bezier(.25,.46,.45,.94), filter .3s;
}
.fg-item:hover img { transform:scale(1.04); filter:brightness(.7); }
.fg-ov {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(8,15,12,.92) 0%, transparent 55%);
  display:flex; align-items:flex-end; padding:22px;
}
.fg-text h3 { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:400; color:#fff; margin-bottom:5px; }
.fg-text span { font-size:9px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:rgba(100,180,140,.85); }

/* ── GLASS STAT BAR ── */
.stat-bar {
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:1px;
  margin:60px 4vw 0;
  background:rgba(100,180,140,.08);
  border:1px solid rgba(100,180,140,.1);
  border-radius:18px;
  overflow:hidden;
}
.stat-item {
  padding:28px 16px;
  text-align:center;
  background:rgba(26,51,41,.45);
  backdrop-filter:blur(20px);
}
.stat-n {
  font-family:'Cormorant Garamond',serif;
  font-size:42px; font-weight:300; color:${GOLD};
  line-height:1; margin-bottom:6px;
}
.stat-l {
  font-size:9px; font-weight:600; letter-spacing:.18em;
  text-transform:uppercase; color:rgba(255,255,255,.3);
}

/* ── QUOTE SECTION ── */
.quote-sec {
  text-align:center; padding:72px 5vw 56px;
  background:linear-gradient(to bottom, transparent, rgba(26,51,41,.15), transparent);
}
.quote-tag {
  font-size:9px; font-weight:700; letter-spacing:.3em;
  text-transform:uppercase; color:rgba(100,180,140,.8); margin-bottom:14px;
}
.quote-h {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(28px,4.5vw,56px);
  font-weight:300; color:#fff; line-height:1.1; letter-spacing:.03em;
}
.quote-line { width:44px; height:1px; background:${GOLD}; margin:18px auto 0; opacity:.5; }

/* ── PIN GATE ── */
.pin-gate {
  position:fixed; inset:0; z-index:250;
  background:rgba(0,0,0,.88);
  display:flex; align-items:center; justify-content:center;
  padding:20px;
  backdrop-filter:blur(32px) saturate(1.4);
  animation:fIn .3s ease;
}
@keyframes fIn { from{opacity:0} to{opacity:1} }
.pin-box {
  background:rgba(26,51,41,.55);
  border:1px solid rgba(100,180,140,.25);
  backdrop-filter:blur(40px) saturate(1.6);
  border-radius:24px;
  padding:44px 40px;
  max-width:400px; width:100%; text-align:center;
  box-shadow:0 24px 64px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08);
}
.pin-icon { font-size:32px; margin-bottom:18px; }
.pin-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:400; color:#fff; margin-bottom:8px; }
.pin-sub { font-size:11px; color:rgba(255,255,255,.4); letter-spacing:.06em; margin-bottom:26px; line-height:1.65; }
.pin-sub strong { color:rgba(255,255,255,.8); font-weight:500; }
.pin-inputs { display:flex; gap:10px; justify-content:center; margin-bottom:20px; }
.pin-d {
  width:46px; height:58px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  border-radius:10px;
  color:#fff; font-family:'Cormorant Garamond',serif;
  font-size:26px; font-weight:400; text-align:center;
  outline:none; transition:border-color .2s, background .2s;
  -moz-appearance:textfield;
}
.pin-d::-webkit-outer-spin-button,.pin-d::-webkit-inner-spin-button { -webkit-appearance:none; }
.pin-d:focus { border-color:rgba(100,180,140,.6); background:rgba(45,74,62,.3); }
.pin-err { font-size:11px; color:#e07070; letter-spacing:.07em; margin-bottom:14px; min-height:18px; }
.pin-btn {
  width:100%; padding:14px;
  background:rgba(100,180,140,.2);
  border:1px solid rgba(100,180,140,.35);
  backdrop-filter:blur(12px);
  color:#fff; font-family:'Inter',sans-serif;
  font-size:11px; font-weight:600; letter-spacing:.16em;
  text-transform:uppercase; cursor:pointer;
  border-radius:100px; transition:all .22s;
}
.pin-btn:hover { background:rgba(100,180,140,.35); }
.pin-cancel {
  margin-top:12px; background:none; border:none;
  color:rgba(255,255,255,.28); font-size:11px;
  letter-spacing:.1em; cursor:pointer; font-family:'Inter',sans-serif;
  transition:color .2s;
}
.pin-cancel:hover { color:rgba(255,255,255,.55); }

/* ── VIDEO MODAL ── */
.modal-bd {
  position:fixed; inset:0; z-index:200;
  background:rgba(0,0,0,.88);
  display:flex; align-items:center; justify-content:center;
  padding:20px;
  backdrop-filter:blur(24px);
  animation:fIn .25s ease;
}
.modal {
  background:rgba(14,24,20,.95);
  border:1px solid rgba(100,180,140,.15);
  border-radius:20px;
  overflow:hidden;
  width:100%; max-width:940px; max-height:92vh;
  overflow-y:auto;
  box-shadow:0 32px 80px rgba(0,0,0,.6);
  animation:sUp .3s cubic-bezier(.25,.46,.45,.94);
  scrollbar-width:thin; scrollbar-color:rgba(100,180,140,.2) transparent;
}
@keyframes sUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
.modal-vid { width:100%; aspect-ratio:16/9; background:#000; }
.modal-vid iframe { width:100%; height:100%; border:none; }
.modal-body { padding:22px 26px 30px; position:relative; }
.modal-close {
  position:absolute; top:14px; right:14px;
  background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.12);
  border-radius:50%; color:#fff;
  width:34px; height:34px; font-size:15px;
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:background .2s;
}
.modal-close:hover { background:rgba(255,255,255,.15); }
.modal-cat { font-size:9px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(100,180,140,.9); margin-bottom:7px; }
.modal-title { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:400; color:#fff; margin-bottom:11px; }
.modal-tags { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
.mtag {
  font-size:10px; font-weight:500; letter-spacing:.09em;
  color:rgba(255,255,255,.38); text-transform:uppercase;
  padding:4px 10px; border-radius:100px;
  border:1px solid rgba(255,255,255,.09);
}
.modal-desc { font-size:13px; font-weight:300; line-height:1.75; color:rgba(255,255,255,.5); margin-bottom:18px; }

/* Episode list */
.ep-sec { border-top:1px solid rgba(100,180,140,.1); padding-top:18px; margin-bottom:18px; }
.ep-sec-t { font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(100,180,140,.8); margin-bottom:12px; }
.ep-list { display:flex; flex-direction:column; gap:6px; }
.ep-item {
  display:flex; align-items:center; gap:12px; padding:9px 12px;
  cursor:pointer; border:1px solid transparent; border-radius:10px;
  transition:background .2s, border-color .2s;
}
.ep-item:hover,.ep-item.on { background:rgba(45,74,62,.4); border-color:rgba(100,180,140,.2); }
.ep-n { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:300; color:rgba(255,255,255,.2); width:22px; flex-shrink:0; text-align:center; }
.ep-item.on .ep-n { color:rgba(100,180,140,.9); }
.ep-pi {
  width:26px; height:26px; border-radius:50%;
  border:1px solid rgba(255,255,255,.14);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  transition:background .2s, border-color .2s;
}
.ep-item:hover .ep-pi,.ep-item.on .ep-pi { background:rgba(100,180,140,.3); border-color:rgba(100,180,140,.5); }
.ep-pi svg { width:8px; height:8px; fill:#fff; margin-left:1px; }
.ep-inf { flex:1; }
.ep-t { font-size:12px; font-weight:500; color:rgba(255,255,255,.78); margin-bottom:2px; }
.ep-item.on .ep-t { color:#fff; }
.ep-dur { font-size:10px; color:rgba(255,255,255,.3); }
.ep-now { font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(100,180,140,.9); }
.dg { display:grid; grid-template-columns:1fr 1fr; gap:10px 22px; border-top:1px solid rgba(100,180,140,.08); padding-top:16px; }
.di label { display:block; font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(100,180,140,.75); margin-bottom:4px; }
.di p { font-size:12px; color:rgba(255,255,255,.55); }

/* ── SEARCH ── */
.srch-ov {
  position:fixed; inset:0; z-index:300;
  background:rgba(8,15,12,.95);
  backdrop-filter:blur(40px);
  display:flex; flex-direction:column; align-items:center;
  padding-top:110px; animation:fIn .2s ease;
}
.srch-in { width:100%; max-width:600px; padding:0 20px; }
.srch-lbl { font-size:9px; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:rgba(100,180,140,.8); margin-bottom:14px; }
.srch-inp {
  width:100%; background:none; border:none;
  border-bottom:1px solid rgba(100,180,140,.35);
  font-family:'Cormorant Garamond',serif; font-size:34px;
  font-weight:300; color:#fff; padding:8px 0 12px; outline:none;
}
.srch-inp::placeholder { color:rgba(255,255,255,.15); }
.srch-res { margin-top:28px; display:flex; flex-direction:column; gap:10px; max-height:52vh; overflow-y:auto; scrollbar-width:none; }
.srch-item {
  display:flex; align-items:center; gap:14px; padding:11px 12px;
  cursor:pointer; border:1px solid transparent; border-radius:12px;
  transition:all .2s;
}
.srch-item:hover { background:rgba(45,74,62,.3); border-color:rgba(100,180,140,.18); }
.srch-item img { width:84px; height:52px; object-fit:cover; border-radius:6px; flex-shrink:0; }
.srch-item h4 { font-size:13px; font-weight:400; color:#fff; margin-bottom:3px; }
.srch-item .sc { font-size:10px; color:rgba(100,180,140,.8); text-transform:uppercase; letter-spacing:.1em; }
.srch-item .sp { font-size:9px; color:rgba(255,255,255,.28); margin-top:2px; }
.srch-cls { position:absolute; top:22px; right:22px; background:none; border:none; color:rgba(255,255,255,.3); font-size:26px; cursor:pointer; }

/* ── ADMIN ── */
.adm-ov {
  position:fixed; inset:0; z-index:400;
  background:rgba(0,0,0,.96);
  backdrop-filter:blur(40px);
  display:flex; align-items:center; justify-content:center;
  padding:20px; overflow-y:auto;
}
.adm {
  background:rgba(14,28,22,.92);
  border:1px solid rgba(100,180,140,.18);
  border-radius:20px;
  width:100%; max-width:700px; max-height:90vh;
  overflow-y:auto; padding:28px 26px;
  scrollbar-width:thin; scrollbar-color:rgba(100,180,140,.2) transparent;
  box-shadow:0 24px 64px rgba(0,0,0,.6);
}
.adm-hd { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
.adm-title { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:400; color:#fff; letter-spacing:.06em; }
.adm-tabs { display:flex; gap:0; margin-bottom:22px; border-bottom:1px solid rgba(100,180,140,.1); }
.atab {
  padding:9px 18px; font-size:10px; font-weight:600;
  letter-spacing:.13em; text-transform:uppercase;
  background:none; border:none; color:rgba(255,255,255,.3);
  cursor:pointer; transition:color .2s;
  border-bottom:2px solid transparent; margin-bottom:-1px;
}
.atab.on { color:rgba(100,180,140,.9); border-bottom-color:rgba(100,180,140,.7); }
.atab:hover { color:rgba(255,255,255,.65); }
.fl { font-size:9px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(100,180,140,.8); display:block; margin-bottom:6px; }
.fi,.fs,.fta {
  width:100%; background:rgba(255,255,255,.04);
  border:1px solid rgba(100,180,140,.12);
  border-radius:8px; color:#fff;
  font-family:'Inter',sans-serif; font-size:12px;
  padding:9px 13px; outline:none; transition:border-color .2s;
}
.fi:focus,.fs:focus,.fta:focus { border-color:rgba(100,180,140,.45); }
.fta { resize:vertical; min-height:68px; }
.fs option { background:#111; }
.fg2 { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
.fg3 { margin-bottom:14px; }
.fchk { display:flex; align-items:center; gap:9px; font-size:11px; color:rgba(255,255,255,.5); cursor:pointer; }
.fchk input { accent-color:rgba(100,180,140,.9); width:13px; height:13px; cursor:pointer; }
.sub-btn {
  width:100%; padding:13px;
  background:rgba(100,180,140,.2);
  border:1px solid rgba(100,180,140,.35);
  border-radius:100px; color:#fff;
  font-family:'Inter',sans-serif;
  font-size:11px; font-weight:700; letter-spacing:.18em;
  text-transform:uppercase; cursor:pointer;
  margin-top:6px; transition:all .22s;
}
.sub-btn:hover { background:rgba(100,180,140,.35); }
.suc {
  background:rgba(45,74,62,.3); border:1px solid rgba(100,180,140,.3);
  border-radius:10px; color:rgba(100,180,140,.9);
  font-size:12px; padding:11px 14px; margin-bottom:14px; letter-spacing:.05em;
}
.pin-field { font-size:18px; letter-spacing:.3em; text-align:center; font-family:'Cormorant Garamond',serif; }
.pin-hint { font-size:10px; color:rgba(255,255,255,.28); letter-spacing:.05em; margin-top:4px; }
.pin-hint.ok { color:rgba(100,180,140,.75); }
.ep-ed { margin-top:6px; }
.ep-ed-item {
  background:rgba(45,74,62,.2); border:1px solid rgba(100,180,140,.1);
  border-radius:10px; padding:13px; margin-bottom:9px; position:relative;
}
.ep-ed-n { font-size:9px; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.28); margin-bottom:9px; }
.ep-rm { position:absolute; top:9px; right:9px; background:none; border:none; color:rgba(255,255,255,.22); font-size:13px; cursor:pointer; transition:color .2s; }
.ep-rm:hover { color:#e07070; }
.ep-add {
  width:100%; padding:9px;
  background:rgba(45,74,62,.15); border:1px dashed rgba(100,180,140,.2);
  border-radius:8px; color:rgba(255,255,255,.4);
  font-family:'Inter',sans-serif; font-size:10px; font-weight:600;
  letter-spacing:.13em; text-transform:uppercase; cursor:pointer;
  transition:all .2s; margin-top:2px;
}
.ep-add:hover { background:rgba(45,74,62,.35); border-color:rgba(100,180,140,.4); color:rgba(100,180,140,.9); }
.ev-list { display:flex; flex-direction:column; gap:9px; }
.ev-li {
  display:flex; align-items:center; gap:12px; padding:11px 13px;
  background:rgba(45,74,62,.2); border:1px solid rgba(100,180,140,.1);
  border-radius:12px; transition:all .2s;
}
.ev-li:hover { border-color:rgba(100,180,140,.25); background:rgba(45,74,62,.35); }
.ev-li-img { width:76px; height:48px; object-fit:cover; border-radius:7px; flex-shrink:0; }
.ev-li-inf { flex:1; min-width:0; }
.ev-li-t { font-size:12px; font-weight:500; color:rgba(255,255,255,.82); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ev-li-m { font-size:10px; color:rgba(255,255,255,.32); letter-spacing:.04em; }
.ev-li-p { font-size:9px; font-weight:700; letter-spacing:.1em; color:rgba(100,180,140,.8); margin-top:3px; }
.ev-edit {
  background:rgba(100,180,140,.12); border:1px solid rgba(100,180,140,.25);
  border-radius:100px; color:rgba(100,180,140,.9);
  padding:6px 14px; font-family:'Inter',sans-serif;
  font-size:9px; font-weight:700; letter-spacing:.13em;
  text-transform:uppercase; cursor:pointer; flex-shrink:0; transition:background .2s;
}
.ev-edit:hover { background:rgba(100,180,140,.25); }

/* ── FOOTER ── */
.footer {
  background:rgba(14,28,22,.6);
  backdrop-filter:blur(20px);
  border-top:1px solid rgba(100,180,140,.1);
  padding:44px 5vw 32px;
}
.footer-top {
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:20px; margin-bottom:28px;
  padding-bottom:28px;
  border-bottom:1px solid rgba(100,180,140,.08);
}
.footer-logo img { height:44px; width:auto; object-fit:contain; }
.footer-tagline {
  font-family:'Cormorant Garamond',serif;
  font-size:14px; font-weight:300; font-style:italic;
  color:rgba(100,180,140,.55); letter-spacing:.06em;
}
.footer-bottom {
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:12px;
}
.footer-copy { font-size:10px; color:rgba(255,255,255,.2); letter-spacing:.07em; }
.footer-links { display:flex; gap:20px; }
.footer-links a { font-size:10px; color:rgba(255,255,255,.28); text-decoration:none; letter-spacing:.08em; cursor:pointer; transition:color .2s; }
.footer-links a:hover { color:rgba(100,180,140,.7); }

@media(max-width:768px){
  .nav-links { display:none; }
  .stat-bar { grid-template-columns:repeat(2,1fr); border-radius:14px; }
  .featured-grid { grid-template-columns:1fr; }
  .fg-item.main { grid-row:span 1; min-height:260px; }
  .hero-title { font-size:30px; }
  .hero-btns { flex-direction:column; }
  .hero-info-pill { display:none; }
  .dg { grid-template-columns:1fr; }
  .fg2 { grid-template-columns:1fr; }
  .pin-inputs { gap:7px; }
  .pin-d { width:38px; height:48px; font-size:22px; }
  .adm { padding:18px 14px; }
  .footer-top { flex-direction:column; align-items:flex-start; }
}
`;

/* ─── EMPTY FORM ──────────────────────────────────────────────────────────── */
const EF = { title:"",thumb:"",desc:"",category:"Destination",year:"2024",location:"",featured:false,pin:"",episodes:[{id:"ne1",title:"",youtubeId:"",duration:""}] };

/* ─── PIN GATE ────────────────────────────────────────────────────────────── */
function PinGate({ event, onSuccess, onCancel }) {
  const [digits,setDigits] = useState(["","","","","",""]);
  const [error,setError]   = useState("");
  const refs = useRef([]);
  useEffect(()=>{ refs.current[0]?.focus(); },[]);
  const hc=(i,val)=>{
    if(!/^\d?$/.test(val))return;
    const n=[...digits]; n[i]=val; setDigits(n); setError("");
    if(val&&i<5) refs.current[i+1]?.focus();
  };
  const hk=(i,e)=>{
    if(e.key==="Backspace"&&!digits[i]&&i>0) refs.current[i-1]?.focus();
    if(e.key==="Enter") verify();
  };
  const verify=()=>{
    const pin=digits.join("");
    if(pin.length<6){setError("Enter all 6 digits.");return;}
    if(pin===event.pin){onSuccess();}
    else{setError("Incorrect PIN — try again.");setDigits(["","","","","",""]);refs.current[0]?.focus();}
  };
  return (
    <div className="pin-gate">
      <div className="pin-box">
        <div className="pin-icon">🔒</div>
        <h2 className="pin-title corm">Private Event</h2>
        <p className="pin-sub"><strong>{event.title}</strong><br/>Enter your 6-digit event PIN to unlock.</p>
        <div className="pin-inputs">
          {digits.map((d,i)=>(
            <input key={i} ref={el=>refs.current[i]=el} className="pin-d" type="number"
              maxLength={1} value={d}
              onChange={e=>hc(i,e.target.value.slice(-1))}
              onKeyDown={e=>hk(i,e)}/>
          ))}
        </div>
        <div className="pin-err">{error}</div>
        <button className="pin-btn" onClick={verify}>Unlock Film</button><br/>
        <button className="pin-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ─── CARD ────────────────────────────────────────────────────────────────── */
function Card({ ev, onClick }) {
  const epc = ev.episodes?.length||0;
  return (
    <div className="card" onClick={()=>onClick(ev)}>
      <div style={{position:"relative"}}>
        <img className="card-thumb" src={ev.thumb} alt={ev.title} loading="lazy"/>
        <div className="card-glass-ov"/>
        <div className="card-play-btn"><svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5z"/></svg></div>
        {ev.pin && <div className="card-pin-badge">🔒 PIN</div>}
        <div className="card-ep-badge">{epc} {epc===1?"Film":"Films"}</div>
      </div>
      <div className="card-info">
        <div className="card-cat">{ev.category}</div>
        <div className="card-title">{ev.title}</div>
        <div className="card-meta">
          <span>{ev.year}</span><span>·</span>
          <span>{epc} {epc===1?"film":"films"}</span><span>·</span>
          <span>{ev.location}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── VIDEO MODAL ─────────────────────────────────────────────────────────── */
function VideoModal({ ev, onClose }) {
  const [aep,setAep] = useState(0);
  if(!ev) return null;
  const ep = ev.episodes?.[aep];
  if(!ep) return null;
  return (
    <div className="modal-bd" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-vid">
          <iframe key={ep.id}
            src={`https://www.youtube.com/embed/${ep.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen" title={ep.title}/>
        </div>
        <div className="modal-body">
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-cat">{ev.category}</div>
          <h2 className="modal-title corm">{ev.title}</h2>
          <div className="modal-tags">
            <span className="mtag">{ev.year}</span>
            <span className="mtag">{ev.location}</span>
            <span className="mtag">{ev.episodes.length} {ev.episodes.length===1?"Film":"Films"}</span>
          </div>
          <p className="modal-desc">{ev.desc}</p>
          {ev.episodes.length>0&&(
            <div className="ep-sec">
              <div className="ep-sec-t">{ev.episodes.length===1?"Film":`All Films — ${ev.episodes.length} Videos`}</div>
              <div className="ep-list">
                {ev.episodes.map((ep,i)=>(
                  <div key={ep.id} className={`ep-item${aep===i?" on":""}`} onClick={()=>setAep(i)}>
                    <div className="ep-n">{i+1}</div>
                    <div className="ep-pi"><svg viewBox="0 0 10 10"><path d="M1.5 1l7 4-7 4z"/></svg></div>
                    <div className="ep-inf">
                      <div className="ep-t">{ep.title}</div>
                      <div className="ep-dur">{ep.duration}</div>
                    </div>
                    {aep===i&&<div className="ep-now">Now Playing</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="dg">
            <div className="di"><label>Location</label><p>{ev.location}</p></div>
            <div className="di"><label>Category</label><p>{ev.category}</p></div>
            <div className="di"><label>Year</label><p>{ev.year}</p></div>
            <div className="di"><label>Total Films</label><p>{ev.episodes.length}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN ───────────────────────────────────────────────────────────────── */
function Admin({ onClose, onAdd, onUpdate, events }) {
  const [tab,setTab]     = useState("add");
  const [eid,setEid]     = useState(null);
  const [form,setForm]   = useState(EF);
  const [msg,setMsg]     = useState("");

  const h=k=>e=>setForm(f=>({...f,[k]:e.target.type==="checkbox"?e.target.checked:e.target.value}));
  const ue=(idx,k,v)=>setForm(f=>{ const e=[...f.episodes]; e[idx]={...e[idx],[k]:v}; return{...f,episodes:e}; });
  const ae=()=>setForm(f=>({...f,episodes:[...f.episodes,{id:"e"+Date.now(),title:"",youtubeId:"",duration:""}]}));
  const re=idx=>setForm(f=>({...f,episodes:f.episodes.filter((_,i)=>i!==idx)}));
  const startEdit=ev=>{ setEid(ev.id); setForm({...ev,episodes:ev.episodes.map(e=>({...e}))}); setTab("add"); };
  const cancelEdit=()=>{ setEid(null); setForm(EF); };
  const flash=m=>{ setMsg(m); setTimeout(()=>setMsg(""),2600); };

  const submit=()=>{
    if(!form.title.trim()){flash("❌ Title required.");return;}
    if(form.pin&&!/^\d{6}$/.test(form.pin)){flash("❌ PIN must be exactly 6 digits or leave empty.");return;}
    const eps=form.episodes.filter(e=>e.youtubeId.trim());
    if(eps.length===0){flash("❌ Add at least one film with a YouTube link.");return;}
    const data={...form,episodes:eps,id:eid||Date.now()};
    if(eid){onUpdate(data);flash("✦ Event updated.");}
    else{onAdd(data);flash("✦ Event added to HCM TV.");}
    setTimeout(()=>{setEid(null);setForm(EF);},2700);
  };

  return (
    <div className="adm-ov">
      <div className="adm">
        <div className="adm-hd">
          <h2 className="adm-title corm">{eid?"Edit Event":"Admin — HCM TV"}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",fontSize:21,cursor:"pointer"}}>✕</button>
        </div>
        <div className="adm-tabs">
          <button className={`atab${tab==="add"?" on":""}`} onClick={()=>{setTab("add");cancelEdit();}}>
            {eid?"✏ Edit Event":"+ Add Event"}</button>
          <button className={`atab${tab==="manage"?" on":""}`} onClick={()=>setTab("manage")}>
            Manage ({events.length})</button>
        </div>
        {msg&&<div className="suc">{msg}</div>}
        {tab==="add"&&<>
          {eid&&<div style={{fontSize:11,color:"rgba(100,180,140,.8)",marginBottom:14,letterSpacing:".07em"}}>
            Editing: <strong style={{color:"#fff"}}>{form.title}</strong>
            <button onClick={cancelEdit} style={{marginLeft:12,background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:11,cursor:"pointer",textDecoration:"underline",fontFamily:"inherit"}}>Cancel</button>
          </div>}
          <div className="fg3"><label className="fl">Event / Couple Title *</label><input className="fi" value={form.title} onChange={h("title")} placeholder="Priya & Arjun — Udaipur"/></div>
          <div className="fg3"><label className="fl">Thumbnail URL</label><input className="fi" value={form.thumb} onChange={h("thumb")} placeholder="https://..."/></div>
          <div className="fg3"><label className="fl">Description</label><textarea className="fta" value={form.desc} onChange={h("desc")} placeholder="Describe this event..."/></div>
          <div className="fg2">
            <div className="fg3"><label className="fl">Category</label><select className="fs" value={form.category} onChange={h("category")}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg3"><label className="fl">Year</label><input className="fi" value={form.year} onChange={h("year")} placeholder="2024"/></div>
          </div>
          <div className="fg3"><label className="fl">Location / Venue</label><input className="fi" value={form.location} onChange={h("location")} placeholder="Udaipur, India"/></div>
          {/* PIN */}
          <div className="fg3">
            <label className="fl">🔒 Event PIN — Optional (6 digits)</label>
            <input className="fi pin-field" value={form.pin}
              onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,6);setForm(f=>({...f,pin:v}));}}
              placeholder="Leave empty = public  ·  e.g. 123456" maxLength={6}/>
            <div className={`pin-hint${form.pin.length===6?" ok":""}`}>
              {form.pin.length===0&&"🌐 Public — anyone can watch"}
              {form.pin.length>0&&form.pin.length<6&&`Enter ${6-form.pin.length} more digit(s)`}
              {form.pin.length===6&&`🔒 Protected — PIN: ${form.pin}`}
            </div>
          </div>
          <div className="fg3"><label className="fchk"><input type="checkbox" checked={form.featured} onChange={h("featured")}/> Mark as Featured (hero banner)</label></div>
          {/* EPISODES */}
          <div className="fg3">
            <label className="fl">Films / Episodes</label>
            <div className="ep-ed">
              {form.episodes.map((ep,i)=>(
                <div className="ep-ed-item" key={ep.id}>
                  <div className="ep-ed-n">Film {i+1}</div>
                  {form.episodes.length>1&&<button className="ep-rm" onClick={()=>re(i)}>✕</button>}
                  <div className="fg3" style={{marginBottom:9}}>
                    <label className="fl" style={{color:"rgba(255,255,255,.35)"}}>Film Title</label>
                    <input className="fi" value={ep.title} onChange={e=>ue(i,"title",e.target.value)} placeholder="The Ceremony"/>
                  </div>
                  <div className="fg2">
                    <div>
                      <label className="fl" style={{color:"rgba(255,255,255,.35)"}}>YouTube Link *</label>
                      <input className="fi" value={ep.youtubeId}
                        onChange={e=>{const m=e.target.value.match(/(?:v=|youtu\.be\/)([^&\s]+)/);ue(i,"youtubeId",m?m[1]:e.target.value);}}
                        placeholder="YouTube URL or ID"/>
                    </div>
                    <div>
                      <label className="fl" style={{color:"rgba(255,255,255,.35)"}}>Duration</label>
                      <input className="fi" value={ep.duration} onChange={e=>ue(i,"duration",e.target.value)} placeholder="12 min"/>
                    </div>
                  </div>
                </div>
              ))}
              <button className="ep-add" onClick={ae}>+ Add Another Film</button>
            </div>
          </div>
          <button className="sub-btn" onClick={submit}>{eid?"Save Changes":"Add to HCM TV"}</button>
        </>}
        {tab==="manage"&&(
          <div className="ev-list">
            {events.length===0&&<p style={{fontSize:12,color:"rgba(255,255,255,.28)",textAlign:"center",padding:"24px 0"}}>No events yet.</p>}
            {events.map(ev=>(
              <div className="ev-li" key={ev.id}>
                <img className="ev-li-img" src={ev.thumb||"https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=200&q=60"} alt={ev.title}/>
                <div className="ev-li-inf">
                  <div className="ev-li-t">{ev.title}</div>
                  <div className="ev-li-m">{ev.category} · {ev.location} · {ev.year} · {ev.episodes.length} film(s)</div>
                  <div className="ev-li-p">{ev.pin?`🔒 PIN: ${ev.pin}`:"🌐 Public"}</div>
                </div>
                <button className="ev-edit" onClick={()=>startEdit(ev)}>Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [loading,setLoading]       = useState(true);
  const [loadOut,setLoadOut]       = useState(false);
  const [scrolled,setScrolled]     = useState(false);
  const [events,setEvents]         = useState(INITIAL_EVENTS);
  const [pending,setPending]       = useState(null);
  const [active,setActive]         = useState(null);
  const [showSearch,setShowSearch] = useState(false);
  const [searchQ,setSearchQ]       = useState("");
  const [showAdmin,setShowAdmin]   = useState(false);

  const hero  = events.find(e=>e.featured)||events[0];
  const rows  = groupBy(events);

  /* Loader — 2.8s then fade out */
  useEffect(()=>{
    const t1=setTimeout(()=>setLoadOut(true),2600);
    const t2=setTimeout(()=>setLoading(false),3400);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const open=ev=>{ ev.pin?setPending(ev):setActive(ev); };
  const pinOk=()=>{ setActive(pending); setPending(null); };

  const openAdmin=()=>{
    const k=window.prompt("Enter admin password:");
    if(k===ADMIN_PW) setShowAdmin(true);
    else if(k!==null) window.alert("Incorrect password.");
  };

  const sr = searchQ.length>1
    ? events.filter(e=>
        e.title.toLowerCase().includes(searchQ.toLowerCase())||
        e.location.toLowerCase().includes(searchQ.toLowerCase())||
        e.category.toLowerCase().includes(searchQ.toLowerCase()))
    : [];

  return (
    <>
      <style>{CSS}</style>

      {/* ── LOADER ── */}
      {loading && (
        <div className={`loader${loadOut?" out":""}`}>
          <video
            className="loader-video"
            src="/loader.mp4"
            autoPlay muted playsInline loop
            style={{borderRadius:0}}
          />
          <div className="loader-sub">Loading Experience</div>
          <div className="loader-bar-wrap"><div className="loader-bar"/></div>
        </div>
      )}

      <div className="app">

        {/* ── NAV ── */}
        <nav className={`nav${scrolled?" sc":""}`}>
          <div className="nav-logo">
            <div className="nav-logo-text">HCM<span> TV</span></div>
            <span className="nav-badge">Originals</span>
          </div>
          <ul className="nav-links">{NAV.map(n=><li key={n}><a>{n}</a></li>)}</ul>
          <div className="nav-r">
            <button className="ibtn" onClick={()=>setShowSearch(true)} title="Search">⌕</button>
            <button className="ibtn" onClick={openAdmin} title="Admin" style={{fontSize:13,opacity:.5}}>⚙</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        {hero&&(
          <section className="hero">
            <img className="hero-bg" src={hero.thumb} alt={hero.title}/>
            {/* Green gradient brand overlay */}
            <div className="hero-grad"/>
            <div className="hero-ct">
              <div className="hero-eyebrow">Featured Event</div>
              <h1 className="hero-title corm">{hero.title}</h1>
              <div className="hero-meta">
                <span>{hero.year}</span><span className="dot"/>
                <span>{hero.episodes.length} {hero.episodes.length===1?"Film":"Films"}</span><span className="dot"/>
                <span>{hero.location}</span>
                {hero.pin&&<><span className="dot"/><span style={{color:GOLD}}>🔒 Private</span></>}
              </div>
              <p className="hero-desc">{hero.desc}</p>
              <div className="hero-btns">
                <button className="btn-play" onClick={()=>open(hero)}>
                  <span className="play-icon">▶</span> Watch Now
                </button>
                <button className="btn-more" onClick={()=>setShowSearch(true)}>
                  Explore Collection
                </button>
              </div>
            </div>
            {/* Floating glass info pill */}
            <div className="hero-info-pill">
              <span className="pill-label">Now Featuring</span>
              <span className="pill-val" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15}}>{hero.location}</span>
              <span className="pill-val" style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{hero.episodes.length} films available</span>
            </div>
          </section>
        )}

        {/* ── STAT BAR ── */}
        <div style={{padding:"0 4vw"}}>
          <div className="stat-bar">
            {[["200+","Films"],["50+","Destinations"],["8","Years"],["12K+","Moments"]].map(([n,l])=>(
              <div className="stat-item" key={l}>
                <div className="stat-n corm">{n}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SHELVES ── */}
        {rows.map(row=>(
          <div key={row.label}>
            <div className="shelf-title-area">
              <span className="shelf-title">{row.label}</span>
              <span className="shelf-see-all">See All →</span>
            </div>
            <div className="shelf-row">
              {row.items.map(ev=><Card key={ev.id} ev={ev} onClick={open}/>)}
            </div>
          </div>
        ))}

        {/* ── QUOTE ── */}
        <div className="quote-sec">
          <div className="quote-tag">The HCM Difference</div>
          <h2 className="quote-h corm">Stories told with light,<br/>silence, and truth.</h2>
          <div className="quote-line"/>
        </div>

        {/* ── FEATURED GRID ── */}
        <div className="featured-grid">
          {events.slice(0,3).map((ev,i)=>(
            <div key={ev.id} className={`fg-item${i===0?" main":""}`} onClick={()=>open(ev)}>
              <img src={ev.thumb} alt={ev.title}/>
              <div className="fg-ov">
                <div className="fg-text">
                  <h3 className="corm">{ev.title}</h3>
                  <span>{ev.category} · {ev.episodes.length} {ev.episodes.length===1?"film":"films"}{ev.pin?" · 🔒":""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-top">
            {/* White logo for dark background */}
            <div className="footer-logo">
              <img src="/logo-white.png" alt="Handcrafting Memories by AG Photography"/>
            </div>
            <div className="footer-tagline">"Where cinema meets ceremony."</div>
            {/* Green logo / theme image */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <img src="/logo-green.jpg" alt="HCM" style={{height:48,width:48,objectFit:"cover",borderRadius:10,border:"1px solid rgba(100,180,140,.25)"}}/>
              <div>
                <div style={{fontSize:13,fontWeight:600,letterSpacing:".06em",color:"#fff"}}>HCM TV</div>
                <div style={{fontSize:10,color:"rgba(100,180,140,.6)",letterSpacing:".1em",textTransform:"uppercase"}}>Handcrafting Memories</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2024 Handcrafting Memories by AG Photography · Ahmedabad, India · All rights reserved</div>
            <div className="footer-links">
              <a>Films</a><a>About</a><a>Contact</a><a>Privacy</a>
            </div>
          </div>
        </footer>

        {/* ── OVERLAYS ── */}
        {pending&&<PinGate event={pending} onSuccess={pinOk} onCancel={()=>setPending(null)}/>}
        {active&&<VideoModal ev={active} onClose={()=>setActive(null)}/>}

        {showSearch&&(
          <div className="srch-ov">
            <button className="srch-cls" onClick={()=>{setShowSearch(false);setSearchQ("");}}>✕</button>
            <div className="srch-in">
              <div className="srch-lbl">Search HCM TV</div>
              <input className="srch-inp" placeholder="Event, location, category…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} autoFocus/>
              <div className="srch-res">
                {sr.length>0?sr.map(r=>(
                  <div key={r.id} className="srch-item" onClick={()=>{open(r);setShowSearch(false);setSearchQ("");}}>
                    <img src={r.thumb} alt={r.title}/>
                    <div>
                      <h4>{r.title}</h4>
                      <span className="sc">{r.category} · {r.location} · {r.year}</span>
                      <div className="sp">{r.pin?"🔒 PIN Protected":"🌐 Public"} · {r.episodes.length} film(s)</div>
                    </div>
                  </div>)):searchQ.length>1
                  ?<p style={{fontSize:12,color:"rgba(255,255,255,.26)"}}>No events found for "{searchQ}"</p>
                  :<p style={{fontSize:12,color:"rgba(255,255,255,.16)"}}>Begin typing to search all events…</p>
                }
              </div>
            </div>
          </div>
        )}

        {showAdmin&&(
          <Admin onClose={()=>setShowAdmin(false)}
            onAdd={ev=>setEvents(e=>[ev,...e])}
            onUpdate={u=>setEvents(e=>e.map(ev=>ev.id===u.id?u:ev))}
            events={events}/>
        )}
      </div>
    </>
  );
}
