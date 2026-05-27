import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const DARK_BG = "#080808";
const ADMIN_PASSWORD = "ag2024";

const INITIAL_EVENTS = [
  {
    id: 1, title: "Priya & Arjun — A Udaipur Tale", year: 2024, location: "Udaipur, Rajasthan",
    category: "Destination", thumb: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80",
    desc: "A timeless cinematic portrait of love, light, and the magic of one extraordinary day across the golden ghats of Udaipur.",
    pin: "", featured: true,
    episodes: [
      { id: "e1a", title: "The Ceremony", duration: "8 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e1b", title: "The Reception", duration: "6 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e1c", title: "Love Story Film", duration: "4 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 2, title: "Meera & Rohan — Jodhpur Royale", year: 2024, location: "Jodhpur, India",
    category: "Celebrity", thumb: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
    desc: "A royal three-day celebration set against the blue city of Jodhpur, captured with cinematic grandeur.",
    pin: "123456", featured: false,
    episodes: [
      { id: "e2a", title: "Mehendi & Sangeet", duration: "10 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e2b", title: "The Wedding Day", duration: "14 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 3, title: "Ananya & Dev — The Venice Edit", year: 2024, location: "Venice, Italy",
    category: "Destination", thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    desc: "Gondolas, cobblestone alleys, and forever — a destination wedding story from the floating city.",
    pin: "", featured: false,
    episodes: [
      { id: "e3a", title: "Pre-Wedding in Venice", duration: "7 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e3b", title: "The Ceremony", duration: "9 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 4, title: "Kavya & Vivek — Santorini Dreams", year: 2023, location: "Santorini, Greece",
    category: "Destination", thumb: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
    desc: "White-washed walls, blue domes, and a love as vast as the Aegean Sea.",
    pin: "654321", featured: false,
    episodes: [
      { id: "e4a", title: "Arrival & Pre-shoot", duration: "5 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e4b", title: "The Sunset Ceremony", duration: "12 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e4c", title: "Highlights Reel", duration: "3 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 5, title: "Shreya & Kabir — A Forest Story", year: 2024, location: "Coorg, Karnataka",
    category: "Love Story", thumb: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
    desc: "Misty mornings and golden light through the coffee estates of Coorg — a love story in green.",
    pin: "", featured: false,
    episodes: [
      { id: "e5a", title: "Love Story Film", duration: "11 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 6, title: "The Royal Ahmedabad Affair", year: 2024, location: "Ahmedabad",
    category: "Celebrity", thumb: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=600&q=80",
    desc: "Three days of grandeur — a celebration that set the standard for luxury weddings in Gujarat.",
    pin: "999000", featured: false,
    episodes: [
      { id: "e6a", title: "Day 1 — Garba Night", duration: "12 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e6b", title: "Day 2 — Sangeet", duration: "15 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e6c", title: "Day 3 — The Wedding", duration: "22 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e6d", title: "Highlights", duration: "4 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 7, title: "Lakshmi & Aditya — Bali Ritual", year: 2024, location: "Bali, Indonesia",
    category: "Destination", thumb: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80",
    desc: "Sacred temples, tropical light, and a Hindu ceremony woven into the soul of Bali.",
    pin: "", featured: false,
    episodes: [
      { id: "e7a", title: "Temple Blessings", duration: "8 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e7b", title: "The Ceremony", duration: "16 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
  {
    id: 8, title: "Nisha & Kartik — Alps Forever", year: 2024, location: "Swiss Alps",
    category: "Destination", thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    desc: "Snow-capped peaks and a love that towers above everything — a winter wedding in the Swiss Alps.",
    pin: "", featured: false,
    episodes: [
      { id: "e8a", title: "Pre-Wedding Shoot", duration: "6 min", youtubeId: "LXb3EKWsInQ" },
      { id: "e8b", title: "The Wedding Film", duration: "14 min", youtubeId: "LXb3EKWsInQ" },
    ]
  },
];

const CATEGORIES_LIST = ["Destination", "Celebrity", "Love Story", "Fashion", "BTS", "Podcast"];
const NAV_ITEMS = ["Films", "Weddings", "Destinations", "Love Stories", "Celebrity", "Fashion", "Podcasts", "BTS"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
.ag{background:${DARK_BG};color:#fff;font-family:'Montserrat',sans-serif;min-height:100vh;overflow-x:hidden;}
.corm{font-family:'Cormorant Garamond',serif;}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 4vw;height:68px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to bottom,rgba(8,8,8,.98),transparent);border-bottom:1px solid rgba(201,168,76,.1);transition:background .3s;}
.nav.sc{background:rgba(8,8,8,.97);}
.logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;letter-spacing:.18em;color:${GOLD};text-transform:uppercase;cursor:pointer;}
.logo span{color:#fff;font-weight:300;}
.nav-links{display:flex;gap:28px;list-style:none;}
.nav-links a{font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);text-decoration:none;transition:color .2s;cursor:pointer;}
.nav-links a:hover{color:${GOLD};}
.nav-r{display:flex;align-items:center;gap:16px;}
.ibtn{background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;font-size:18px;padding:4px;transition:color .2s;}
.ibtn:hover{color:${GOLD};}

/* HERO */
.hero{position:relative;height:92vh;min-height:560px;overflow:hidden;display:flex;align-items:flex-end;}
.hero-bg{position:absolute;inset:0;object-fit:cover;width:100%;height:100%;filter:brightness(.42) saturate(.8);}
.hero-ov{position:absolute;inset:0;background:linear-gradient(to right,rgba(8,8,8,.93) 0%,rgba(8,8,8,.45) 55%,transparent 100%),linear-gradient(to top,rgba(8,8,8,.88) 0%,transparent 55%);}
.hero-ct{position:relative;z-index:2;padding:0 5vw 7vh;max-width:680px;}
.badge{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${GOLD};margin-bottom:16px;}
.badge::before{content:'';display:block;width:28px;height:1px;background:${GOLD};}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,5.5vw,70px);font-weight:400;line-height:1.08;margin-bottom:14px;color:#fff;}
.hero-meta{display:flex;align-items:center;gap:14px;margin-bottom:14px;font-size:11px;font-weight:500;letter-spacing:.1em;color:rgba(255,255,255,.5);text-transform:uppercase;flex-wrap:wrap;}
.d{width:3px;height:3px;border-radius:50%;background:${GOLD};opacity:.7;flex-shrink:0;}
.hero-desc{font-size:13px;font-weight:300;line-height:1.7;color:rgba(255,255,255,.58);margin-bottom:26px;max-width:400px;}
.hero-acts{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
.btn-g{display:flex;align-items:center;gap:10px;background:${GOLD};color:#0B0B0B;border:none;padding:13px 28px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .15s;}
.btn-g:hover{background:${GOLD_LIGHT};transform:translateY(-1px);}
.btn-gh{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);color:#fff;border:1px solid rgba(255,255,255,.2);padding:13px 28px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:background .2s;backdrop-filter:blur(4px);}
.btn-gh:hover{background:rgba(255,255,255,.13);}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,168,76,.08);margin:0 3vw 56px;border:1px solid rgba(201,168,76,.08);}
.stat{background:${DARK_BG};padding:32px 16px;text-align:center;}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;color:${GOLD};line-height:1;margin-bottom:6px;}
.stat-l{font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.28);}

/* ROWS */
.rows{padding:0 3vw 60px;}
.row{margin-bottom:42px;}
.row-hd{display:flex;align-items:baseline;gap:14px;margin-bottom:16px;padding:0 1vw;}
.row-t{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#fff;}
.row-a{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${GOLD};cursor:pointer;opacity:.65;transition:opacity .2s;}
.row-a:hover{opacity:1;}
.scroll{display:flex;gap:14px;overflow-x:auto;padding:8px 1vw 14px;scrollbar-width:none;}
.scroll::-webkit-scrollbar{display:none;}

/* CARD */
.card{flex:0 0 auto;width:240px;cursor:pointer;transition:transform .28s cubic-bezier(.25,.46,.45,.94);position:relative;}
.card:hover{transform:scale(1.06) translateY(-4px);z-index:10;}
.card-img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:#1a1a1a;transition:filter .3s;}
.card:hover .card-img{filter:brightness(.5);}
.card-ov{position:absolute;top:0;left:0;right:0;bottom:40px;background:linear-gradient(to top,rgba(8,8,8,.95) 0%,transparent 55%);pointer-events:none;}
.card-play{position:absolute;top:36%;left:50%;transform:translate(-50%,-50%) scale(0);width:44px;height:44px;border-radius:50%;background:rgba(201,168,76,.92);display:flex;align-items:center;justify-content:center;transition:transform .2s,opacity .2s;opacity:0;}
.card:hover .card-play{transform:translate(-50%,-50%) scale(1);opacity:1;}
.card-play svg{width:13px;height:13px;fill:#000;margin-left:2px;}
.card-info{padding:9px 2px 0;}
.card-cat{color:${GOLD};font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:3px;}
.card-title{font-size:12px;font-weight:500;color:rgba(255,255,255,.88);line-height:1.35;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.card-meta{display:flex;align-items:center;gap:7px;font-size:10px;color:rgba(255,255,255,.36);letter-spacing:.04em;}
.pin-badge{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.78);border:1px solid rgba(201,168,76,.5);padding:3px 7px;font-size:9px;font-weight:700;letter-spacing:.08em;color:${GOLD};backdrop-filter:blur(4px);}
.ep-badge{position:absolute;bottom:44px;left:8px;background:rgba(0,0,0,.7);padding:3px 7px;font-size:9px;font-weight:600;color:rgba(255,255,255,.75);}

/* PIN GATE */
.pin-gate{position:fixed;inset:0;background:rgba(0,0,0,.93);z-index:250;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(14px);animation:fIn .25s ease;}
.pin-box{background:#111;border:1px solid rgba(201,168,76,.25);padding:44px 40px;max-width:400px;width:100%;text-align:center;}
.pin-icon{font-size:30px;margin-bottom:18px;opacity:.75;}
.pin-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:#fff;margin-bottom:8px;}
.pin-sub{font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.07em;margin-bottom:26px;line-height:1.65;}
.pin-sub strong{color:rgba(255,255,255,.75);font-weight:500;}
.pin-inputs{display:flex;gap:10px;justify-content:center;margin-bottom:22px;}
.pin-d{width:46px;height:56px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#fff;font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;text-align:center;outline:none;transition:border-color .2s;-moz-appearance:textfield;}
.pin-d::-webkit-outer-spin-button,.pin-d::-webkit-inner-spin-button{-webkit-appearance:none;}
.pin-d:focus{border-color:${GOLD};}
.pin-err{font-size:11px;color:#e05c5c;letter-spacing:.07em;margin-bottom:14px;min-height:18px;}
.pin-btn{width:100%;padding:13px;background:${GOLD};color:#0B0B0B;border:none;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:background .2s;}
.pin-btn:hover{background:${GOLD_LIGHT};}
.pin-cancel{margin-top:12px;background:none;border:none;color:rgba(255,255,255,.28);font-size:11px;letter-spacing:.1em;cursor:pointer;font-family:'Montserrat',sans-serif;transition:color .2s;}
.pin-cancel:hover{color:rgba(255,255,255,.55);}

/* MODAL */
.modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);animation:fIn .25s ease;}
@keyframes fIn{from{opacity:0}to{opacity:1}}
.modal{background:#111;width:100%;max-width:920px;max-height:92vh;overflow-y:auto;border:1px solid rgba(201,168,76,.15);animation:sUp .3s cubic-bezier(.25,.46,.45,.94);scrollbar-width:thin;scrollbar-color:rgba(201,168,76,.2) transparent;}
@keyframes sUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.modal-vid{width:100%;aspect-ratio:16/9;background:#000;}
.modal-vid iframe{width:100%;height:100%;border:none;}
.modal-body{padding:22px 26px 30px;position:relative;}
.modal-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;width:34px;height:34px;border-radius:50%;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.modal-close:hover{background:rgba(255,255,255,.14);}
.modal-cat{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${GOLD};margin-bottom:7px;}
.modal-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:#fff;line-height:1.1;margin-bottom:11px;}
.modal-meta{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:14px;}
.tag{font-size:10px;font-weight:500;letter-spacing:.1em;color:rgba(255,255,255,.38);text-transform:uppercase;padding:3px 9px;border:1px solid rgba(255,255,255,.09);}
.modal-desc{font-size:13px;font-weight:300;line-height:1.75;color:rgba(255,255,255,.52);margin-bottom:18px;}

/* EPISODES */
.ep-sec{border-top:1px solid rgba(255,255,255,.06);padding-top:18px;margin-bottom:18px;}
.ep-sec-t{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};margin-bottom:12px;}
.ep-list{display:flex;flex-direction:column;gap:6px;}
.ep-item{display:flex;align-items:center;gap:12px;padding:9px 11px;cursor:pointer;border:1px solid transparent;transition:background .2s,border-color .2s;border-radius:2px;}
.ep-item:hover,.ep-item.on{background:rgba(201,168,76,.07);border-color:rgba(201,168,76,.2);}
.ep-n{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;color:rgba(255,255,255,.22);width:22px;flex-shrink:0;text-align:center;}
.ep-item.on .ep-n{color:${GOLD};}
.ep-pi{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,border-color .2s;}
.ep-item:hover .ep-pi,.ep-item.on .ep-pi{background:${GOLD};border-color:${GOLD};}
.ep-pi svg{width:8px;height:8px;fill:#fff;margin-left:1px;}
.ep-item.on .ep-pi svg{fill:#000;}
.ep-inf{flex:1;}
.ep-t{font-size:12px;font-weight:500;color:rgba(255,255,255,.8);margin-bottom:2px;}
.ep-item.on .ep-t{color:#fff;}
.ep-dur{font-size:10px;color:rgba(255,255,255,.32);}
.ep-now{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${GOLD};}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;border-top:1px solid rgba(255,255,255,.06);padding-top:16px;}
.di label{display:block;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};margin-bottom:4px;}
.di p{font-size:12px;color:rgba(255,255,255,.55);}

/* SEARCH */
.srch-ov{position:fixed;inset:0;background:rgba(8,8,8,.97);z-index:300;display:flex;flex-direction:column;align-items:center;padding-top:110px;animation:fIn .2s ease;}
.srch-in{width:100%;max-width:580px;padding:0 20px;}
.srch-lbl{font-size:9px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:${GOLD};margin-bottom:14px;}
.srch-inp{width:100%;background:none;border:none;border-bottom:1px solid rgba(201,168,76,.4);font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;color:#fff;padding:8px 0 12px;outline:none;letter-spacing:.04em;}
.srch-inp::placeholder{color:rgba(255,255,255,.16);}
.srch-res{margin-top:28px;display:flex;flex-direction:column;gap:12px;max-height:52vh;overflow-y:auto;scrollbar-width:none;}
.srch-item{display:flex;align-items:center;gap:14px;padding:11px;cursor:pointer;border:1px solid transparent;transition:all .2s;}
.srch-item:hover{background:rgba(255,255,255,.04);border-color:rgba(201,168,76,.15);}
.srch-item img{width:84px;height:52px;object-fit:cover;flex-shrink:0;}
.srch-item h4{font-size:13px;font-weight:400;color:#fff;margin-bottom:3px;}
.srch-item .sc{font-size:10px;color:${GOLD};text-transform:uppercase;letter-spacing:.1em;}
.srch-item .sp{font-size:9px;color:rgba(255,255,255,.28);margin-top:2px;}
.srch-cls{position:absolute;top:22px;right:22px;background:none;border:none;color:rgba(255,255,255,.3);font-size:26px;cursor:pointer;}

/* ADMIN */
.adm-ov{position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;}
.adm{background:#111;border:1px solid rgba(201,168,76,.2);width:100%;max-width:700px;max-height:90vh;overflow-y:auto;padding:28px 26px;scrollbar-width:thin;scrollbar-color:rgba(201,168,76,.2) transparent;}
.adm-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;}
.adm-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:${GOLD};letter-spacing:.06em;}
.adm-tabs{display:flex;gap:0;margin-bottom:22px;border-bottom:1px solid rgba(255,255,255,.07);}
.atab{padding:9px 18px;font-size:10px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;transition:color .2s;border-bottom:2px solid transparent;margin-bottom:-1px;}
.atab.on{color:${GOLD};border-bottom-color:${GOLD};}
.atab:hover{color:rgba(255,255,255,.65);}
.fl{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${GOLD};display:block;margin-bottom:6px;}
.fi,.fs,.fta{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#fff;font-family:'Montserrat',sans-serif;font-size:12px;padding:9px 13px;outline:none;transition:border-color .2s;}
.fi:focus,.fs:focus,.fta:focus{border-color:rgba(201,168,76,.45);}
.fta{resize:vertical;min-height:68px;}
.fs option{background:#111;}
.fg2{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.fg{margin-bottom:14px;}
.fchk{display:flex;align-items:center;gap:9px;font-size:11px;color:rgba(255,255,255,.5);cursor:pointer;}
.fchk input{accent-color:${GOLD};width:13px;height:13px;cursor:pointer;}
.sub-btn{width:100%;padding:13px;background:${GOLD};color:#0B0B0B;border:none;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;margin-top:6px;transition:background .2s;}
.sub-btn:hover{background:${GOLD_LIGHT};}
.suc{background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.25);color:${GOLD};font-size:12px;padding:11px 14px;margin-bottom:14px;letter-spacing:.05em;}
.pin-field{font-size:18px;letter-spacing:.3em;text-align:center;font-family:'Cormorant Garamond',serif;}
.pin-hint{font-size:10px;color:rgba(255,255,255,.28);letter-spacing:.05em;margin-top:4px;}
.pin-hint.ok{color:rgba(201,168,76,.7);}

/* EPISODE EDITOR */
.ep-ed{margin-top:6px;}
.ep-ed-item{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);padding:13px;margin-bottom:9px;position:relative;}
.ep-ed-n{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:9px;}
.ep-rm{position:absolute;top:9px;right:9px;background:none;border:none;color:rgba(255,255,255,.22);font-size:13px;cursor:pointer;transition:color .2s;}
.ep-rm:hover{color:#e05c5c;}
.ep-add{width:100%;padding:9px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.14);color:rgba(255,255,255,.4);font-family:'Montserrat',sans-serif;font-size:10px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;transition:all .2s;margin-top:2px;}
.ep-add:hover{background:rgba(201,168,76,.06);border-color:rgba(201,168,76,.3);color:${GOLD};}

/* MANAGE LIST */
.ev-list{display:flex;flex-direction:column;gap:9px;}
.ev-li{display:flex;align-items:center;gap:12px;padding:11px 13px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);transition:all .2s;}
.ev-li:hover{border-color:rgba(201,168,76,.22);background:rgba(201,168,76,.04);}
.ev-li-img{width:76px;height:48px;object-fit:cover;flex-shrink:0;}
.ev-li-inf{flex:1;min-width:0;}
.ev-li-t{font-size:12px;font-weight:500;color:rgba(255,255,255,.82);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ev-li-m{font-size:10px;color:rgba(255,255,255,.32);letter-spacing:.04em;}
.ev-li-p{font-size:9px;font-weight:700;letter-spacing:.1em;color:${GOLD};margin-top:3px;}
.ev-edit{background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.22);color:${GOLD};padding:6px 13px;font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;flex-shrink:0;transition:background .2s;}
.ev-edit:hover{background:rgba(201,168,76,.2);}

/* MISC */
.sec-intro{text-align:center;padding:56px 5vw 42px;}
.sec-tag{font-size:9px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:${GOLD};margin-bottom:12px;}
.sec-h{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,4vw,50px);font-weight:300;color:#fff;line-height:1.12;letter-spacing:.04em;}
.sec-line{width:46px;height:1px;background:${GOLD};margin:16px auto 0;opacity:.5;}
.fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin:0 3vw 46px;}
.fc{position:relative;aspect-ratio:16/9;overflow:hidden;cursor:pointer;}
.fc.lg{grid-row:span 2;aspect-ratio:unset;}
.fc img{width:100%;height:100%;object-fit:cover;transition:transform .55s cubic-bezier(.25,.46,.45,.94);}
.fc:hover img{transform:scale(1.05);}
.fc-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,.92) 0%,transparent 60%);display:flex;align-items:flex-end;padding:18px;}
.fc-t h3{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#fff;line-height:1.2;margin-bottom:4px;}
.fc-t span{font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${GOLD};}
.footer{border-top:1px solid rgba(201,168,76,.1);padding:36px 5vw 28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
.footer-copy{font-size:10px;color:rgba(255,255,255,.2);letter-spacing:.07em;}
.footer-tag{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:300;font-style:italic;color:rgba(201,168,76,.42);}
@media(max-width:768px){
  .nav-links{display:none;}
  .stats{grid-template-columns:repeat(2,1fr);}
  .fg-grid{grid-template-columns:1fr;}
  .fc.lg{grid-row:span 1;}
  .hero-title{font-size:30px;}
  .hero-acts{flex-direction:column;align-items:flex-start;}
  .dg{grid-template-columns:1fr;}
  .fg2{grid-template-columns:1fr;}
  .pin-inputs{gap:7px;}
  .pin-d{width:38px;height:48px;font-size:22px;}
  .adm{padding:20px 16px;}
}
`;

function groupByCategory(events) {
  const map = {};
  events.forEach(ev => {
    if (!map[ev.category]) map[ev.category] = [];
    map[ev.category].push(ev);
  });
  return Object.entries(map).map(([label, items]) => ({ label, items }));
}

// ── PIN GATE ────────────────────────────────────────────────────────────────
function PinGate({ event, onSuccess, onCancel }) {
  const [digits, setDigits] = useState(["","","","","",""]);
  const [error, setError] = useState("");
  const refs = useRef([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits]; next[i] = val;
    setDigits(next); setError("");
    if (val && i < 5) refs.current[i+1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i-1]?.focus();
    if (e.key === "Enter") verify();
  };

  const verify = () => {
    const entered = digits.join("");
    if (entered.length < 6) { setError("Please enter all 6 digits."); return; }
    if (entered === event.pin) { onSuccess(); }
    else { setError("Incorrect PIN. Please try again."); setDigits(["","","","","",""]); refs.current[0]?.focus(); }
  };

  return (
    <div className="pin-gate">
      <div className="pin-box">
        <div className="pin-icon">🔒</div>
        <h2 className="pin-title corm">Private Event</h2>
        <p className="pin-sub">
          <strong>{event.title}</strong><br/>
          This film is protected. Enter your 6-digit event PIN to watch.
        </p>
        <div className="pin-inputs">
          {digits.map((d, i) => (
            <input key={i} ref={el => refs.current[i] = el} className="pin-d" type="number"
              maxLength={1} value={d}
              onChange={e => handleChange(i, e.target.value.slice(-1))}
              onKeyDown={e => handleKey(i, e)} />
          ))}
        </div>
        <div className="pin-err">{error}</div>
        <button className="pin-btn" onClick={verify}>Unlock Film</button>
        <br/>
        <button className="pin-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────────────────────────
function EventCard({ event, onClick }) {
  const epCount = event.episodes?.length || 0;
  return (
    <div className="card" onClick={() => onClick(event)}>
      <div style={{position:"relative"}}>
        <img className="card-img" src={event.thumb} alt={event.title} loading="lazy"/>
        <div className="card-ov"/>
        <div className="card-play"><svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5z"/></svg></div>
        {event.pin && <div className="pin-badge">🔒 PIN</div>}
        <div className="ep-badge">{epCount} {epCount === 1 ? "Film" : "Films"}</div>
      </div>
      <div className="card-info">
        <div className="card-cat">{event.category}</div>
        <div className="card-title">{event.title}</div>
        <div className="card-meta">
          <span>{event.year}</span><span>·</span>
          <span>{epCount} {epCount===1?"film":"films"}</span><span>·</span>
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
}

// ── VIDEO MODAL ───────────────────────────────────────────────────────────────
function VideoModal({ event, onClose }) {
  const [activeEp, setActiveEp] = useState(0);
  if (!event) return null;
  const ep = event.episodes?.[activeEp];
  if (!ep) return null;

  return (
    <div className="modal-bd" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-vid">
          <iframe key={ep.id}
            src={`https://www.youtube.com/embed/${ep.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen" title={ep.title}/>
        </div>
        <div className="modal-body">
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-cat">{event.category}</div>
          <h2 className="modal-title corm">{event.title}</h2>
          <div className="modal-meta">
            <span className="tag">{event.year}</span>
            <span className="tag">{event.location}</span>
            <span className="tag">{event.episodes.length} {event.episodes.length===1?"Film":"Films"}</span>
          </div>
          <p className="modal-desc">{event.desc}</p>

          {event.episodes.length > 0 && (
            <div className="ep-sec">
              <div className="ep-sec-t">
                {event.episodes.length===1 ? "Film" : `All Films — ${event.episodes.length} Videos`}
              </div>
              <div className="ep-list">
                {event.episodes.map((ep, i) => (
                  <div key={ep.id} className={`ep-item${activeEp===i?" on":""}`} onClick={()=>setActiveEp(i)}>
                    <div className="ep-n">{i+1}</div>
                    <div className="ep-pi"><svg viewBox="0 0 10 10"><path d="M1.5 1l7 4-7 4z"/></svg></div>
                    <div className="ep-inf">
                      <div className="ep-t">{ep.title}</div>
                      <div className="ep-dur">{ep.duration}</div>
                    </div>
                    {activeEp===i && <div className="ep-now">Now Playing</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="dg">
            <div className="di"><label>Location</label><p>{event.location}</p></div>
            <div className="di"><label>Category</label><p>{event.category}</p></div>
            <div className="di"><label>Year</label><p>{event.year}</p></div>
            <div className="di"><label>Total Films</label><p>{event.episodes.length}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
const EMPTY_FORM = { title:"", thumb:"", desc:"", category:"Destination", year:"2024", location:"", featured:false, pin:"", episodes:[{id:"ep_new_1", title:"", youtubeId:"", duration:""}] };

function AdminPanel({ onClose, onAdd, onUpdate, events }) {
  const [tab, setTab] = useState("add");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [msg, setMsg] = useState("");

  const h = k => e => setForm(f => ({...f, [k]: e.target.type==="checkbox"?e.target.checked:e.target.value}));

  const updEp = (idx, key, val) => setForm(f => {
    const eps = [...f.episodes]; eps[idx] = {...eps[idx], [key]: val};
    return {...f, episodes: eps};
  });
  const addEp = () => setForm(f => ({...f, episodes:[...f.episodes,{id:"ep_"+Date.now(),title:"",youtubeId:"",duration:""}]}));
  const rmEp = idx => setForm(f => ({...f, episodes: f.episodes.filter((_,i)=>i!==idx)}));

  const startEdit = ev => {
    setEditId(ev.id);
    setForm({...ev, episodes: ev.episodes.map(e=>({...e}))});
    setTab("add");
  };

  const cancelEdit = () => { setEditId(null); setForm(EMPTY_FORM); };

  const flash = (m) => { setMsg(m); setTimeout(()=>setMsg(""),2500); };

  const submit = () => {
    if (!form.title.trim()) { flash("❌ Title is required."); return; }
    if (form.pin && !/^\d{6}$/.test(form.pin)) { flash("❌ PIN must be exactly 6 digits or leave empty."); return; }
    const episodes = form.episodes.filter(e => e.youtubeId.trim());
    if (episodes.length === 0) { flash("❌ Add at least one film with a YouTube link."); return; }
    const data = {...form, episodes, id: editId || Date.now()};
    if (editId) { onUpdate(data); flash("✦ Event updated successfully."); }
    else { onAdd(data); flash("✦ Event added to collection."); }
    setTimeout(() => { setEditId(null); setForm(EMPTY_FORM); }, 2600);
  };

  return (
    <div className="adm-ov">
      <div className="adm">
        <div className="adm-hd">
          <h2 className="adm-title corm">{editId ? "Edit Event" : "Admin Panel"}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",fontSize:21,cursor:"pointer"}}>✕</button>
        </div>

        <div className="adm-tabs">
          <button className={`atab${tab==="add"?" on":""}`} onClick={()=>{setTab("add");cancelEdit();}}>
            {editId ? "✏ Edit Event" : "+ Add Event"}
          </button>
          <button className={`atab${tab==="manage"?" on":""}`} onClick={()=>setTab("manage")}>
            Manage Events ({events.length})
          </button>
        </div>

        {msg && <div className="suc">{msg}</div>}

        {tab==="add" && <>
          {editId && (
            <div style={{fontSize:11,color:GOLD,marginBottom:14,letterSpacing:".07em"}}>
              Editing: <strong style={{color:"#fff"}}>{form.title}</strong>
              <button onClick={cancelEdit} style={{marginLeft:12,background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:11,cursor:"pointer",textDecoration:"underline",fontFamily:"inherit"}}>Cancel Edit</button>
            </div>
          )}

          <div className="fg"><label className="fl">Event / Couple Title *</label>
            <input className="fi" value={form.title} onChange={h("title")} placeholder="Priya & Arjun — A Udaipur Tale"/></div>
          <div className="fg"><label className="fl">Thumbnail URL</label>
            <input className="fi" value={form.thumb} onChange={h("thumb")} placeholder="https://..."/></div>
          <div className="fg"><label className="fl">Description</label>
            <textarea className="fta" value={form.desc} onChange={h("desc")} placeholder="Describe this wedding event..."/></div>
          <div className="fg2">
            <div className="fg"><label className="fl">Category</label>
              <select className="fs" value={form.category} onChange={h("category")}>
                {CATEGORIES_LIST.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label className="fl">Year</label>
              <input className="fi" value={form.year} onChange={h("year")} placeholder="2024"/></div>
          </div>
          <div className="fg"><label className="fl">Location / Venue</label>
            <input className="fi" value={form.location} onChange={h("location")} placeholder="Udaipur, India"/></div>

          {/* ── PIN FIELD ── */}
          <div className="fg">
            <label className="fl">🔒 Event PIN — Optional (6 digits)</label>
            <input className="fi pin-field" value={form.pin}
              onChange={e=>{ const v=e.target.value.replace(/\D/g,"").slice(0,6); setForm(f=>({...f,pin:v})); }}
              placeholder="Leave empty = public  ·  e.g. 123456" maxLength={6}/>
            <div className={`pin-hint${form.pin.length===6?" ok":""}`}>
              {form.pin.length===0 && "🌐 No PIN — anyone can watch"}
              {form.pin.length>0 && form.pin.length<6 && `Enter ${6-form.pin.length} more digit(s)`}
              {form.pin.length===6 && `🔒 Protected — viewers must enter PIN: ${form.pin}`}
            </div>
          </div>

          <div className="fg"><label className="fchk"><input type="checkbox" checked={form.featured} onChange={h("featured")}/> Mark as Featured (appears in hero banner)</label></div>

          {/* ── EPISODES ── */}
          <div className="fg">
            <label className="fl">Films / Episodes in this Event</label>
            <div className="ep-ed">
              {form.episodes.map((ep,i)=>(
                <div className="ep-ed-item" key={ep.id}>
                  <div className="ep-ed-n">Film {i+1}</div>
                  {form.episodes.length>1 && <button className="ep-rm" onClick={()=>rmEp(i)}>✕</button>}
                  <div className="fg" style={{marginBottom:9}}>
                    <label className="fl" style={{color:"rgba(255,255,255,.38)"}}>Film Title</label>
                    <input className="fi" value={ep.title} onChange={e=>updEp(i,"title",e.target.value)} placeholder="The Ceremony"/>
                  </div>
                  <div className="fg2">
                    <div>
                      <label className="fl" style={{color:"rgba(255,255,255,.38)"}}>YouTube Link *</label>
                      <input className="fi" value={ep.youtubeId}
                        onChange={e=>{ const m=e.target.value.match(/(?:v=|youtu\.be\/)([^&\s]+)/); updEp(i,"youtubeId",m?m[1]:e.target.value); }}
                        placeholder="YouTube URL or video ID"/>
                    </div>
                    <div>
                      <label className="fl" style={{color:"rgba(255,255,255,.38)"}}>Duration</label>
                      <input className="fi" value={ep.duration} onChange={e=>updEp(i,"duration",e.target.value)} placeholder="12 min"/>
                    </div>
                  </div>
                </div>
              ))}
              <button className="ep-add" onClick={addEp}>+ Add Another Film to This Event</button>
            </div>
          </div>

          <button className="sub-btn" onClick={submit}>{editId?"Save Changes":"Add Event to Collection"}</button>
        </>}

        {tab==="manage" && (
          <div className="ev-list">
            {events.length===0 && <p style={{fontSize:12,color:"rgba(255,255,255,.28)",textAlign:"center",padding:"24px 0"}}>No events yet.</p>}
            {events.map(ev=>(
              <div className="ev-li" key={ev.id}>
                <img className="ev-li-img" src={ev.thumb||"https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=200&q=60"} alt={ev.title}/>
                <div className="ev-li-inf">
                  <div className="ev-li-t">{ev.title}</div>
                  <div className="ev-li-m">{ev.category} · {ev.location} · {ev.year} · {ev.episodes.length} film(s)</div>
                  <div className="ev-li-p">{ev.pin ? `🔒 PIN: ${ev.pin}` : "🌐 Public"}</div>
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

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled]     = useState(false);
  const [events, setEvents]         = useState(INITIAL_EVENTS);
  const [pendingEvent, setPending]  = useState(null);
  const [activeEvent, setActive]    = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQ, setSearchQ]       = useState("");
  const [showAdmin, setShowAdmin]   = useState(false);

  const heroEvent = events.find(e=>e.featured) || events[0];
  const rows = groupByCategory(events);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const openEvent = ev => { ev.pin ? setPending(ev) : setActive(ev); };
  const pinOk     = ()  => { setActive(pendingEvent); setPending(null); };
  const pinCancel = ()  => setPending(null);

  const addEvent    = ev  => setEvents(e=>[ev,...e]);
  const updateEvent = upd => setEvents(e=>e.map(ev=>ev.id===upd.id?upd:ev));

  const openAdmin = () => {
    const k=window.prompt("Enter admin password:");
    if (k===ADMIN_PASSWORD) setShowAdmin(true);
    else if (k!==null) window.alert("Incorrect password.");
  };

  const searchResults = searchQ.length>1
    ? events.filter(e=>
        e.title.toLowerCase().includes(searchQ.toLowerCase())||
        e.location.toLowerCase().includes(searchQ.toLowerCase())||
        e.category.toLowerCase().includes(searchQ.toLowerCase()))
    : [];

  return (
    <>
      <style>{css}</style>
      <div className="ag">

        {/* NAV */}
        <nav className={`nav${scrolled?" sc":""}`}>
          <div className="logo">AG<span> Photography</span></div>
          <ul className="nav-links">{NAV_ITEMS.map(n=><li key={n}><a>{n}</a></li>)}</ul>
          <div className="nav-r">
            <button className="ibtn" onClick={()=>setShowSearch(true)}>⌕</button>
            <button className="ibtn" onClick={openAdmin} title="Admin" style={{fontSize:14,color:`${GOLD}55`}}>⚙</button>
          </div>
        </nav>

        {/* HERO */}
        {heroEvent && (
          <section className="hero">
            <img className="hero-bg" src={heroEvent.thumb} alt={heroEvent.title}/>
            <div className="hero-ov"/>
            <div className="hero-ct">
              <div className="badge">Featured Event</div>
              <h1 className="hero-title corm">{heroEvent.title}</h1>
              <div className="hero-meta">
                <span>{heroEvent.year}</span><span className="d"/>
                <span>{heroEvent.episodes.length} {heroEvent.episodes.length===1?"Film":"Films"}</span><span className="d"/>
                <span>{heroEvent.location}</span>
                {heroEvent.pin && <><span className="d"/><span style={{color:GOLD}}>🔒 Private</span></>}
              </div>
              <p className="hero-desc">{heroEvent.desc}</p>
              <div className="hero-acts">
                <button className="btn-g" onClick={()=>openEvent(heroEvent)}>▶&nbsp; Watch Now</button>
                <button className="btn-gh" onClick={()=>setShowSearch(true)}>Explore Collection</button>
              </div>
            </div>
          </section>
        )}

        {/* STATS */}
        <div className="stats">
          {[["200+","Films"],["50+","Destinations"],["8","Years"],["12K+","Moments"]].map(([n,l])=>(
            <div className="stat" key={l}><div className="stat-n corm">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>

        {/* ROWS */}
        <div className="rows">
          {rows.map(row=>(
            <div className="row" key={row.label}>
              <div className="row-hd">
                <span className="row-t">{row.label}</span>
                <span className="row-a">View All →</span>
              </div>
              <div className="scroll">
                {row.items.map(ev=><EventCard key={ev.id} event={ev} onClick={openEvent}/>)}
              </div>
            </div>
          ))}
        </div>

        {/* QUOTE */}
        <div className="sec-intro">
          <div className="sec-tag">The AG Difference</div>
          <h2 className="sec-h corm">Stories told with light,<br/>silence, and truth.</h2>
          <div className="sec-line"/>
        </div>

        {/* FEATURE GRID */}
        <div className="fg-grid">
          {events.slice(0,3).map((ev,i)=>(
            <div key={ev.id} className={`fc${i===0?" lg":""}`} onClick={()=>openEvent(ev)}>
              <img src={ev.thumb} alt={ev.title}/>
              <div className="fc-ov">
                <div className="fc-t">
                  <h3 className="corm">{ev.title}</h3>
                  <span>{ev.category} · {ev.episodes.length} {ev.episodes.length===1?"film":"films"}{ev.pin?" · 🔒":""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="logo" style={{fontSize:16}}>AG<span> Photography</span></div>
          <div className="footer-tag">"Where cinema meets ceremony."</div>
          <div className="footer-copy">© 2024 AG Photography · Ahmedabad, India</div>
        </footer>

        {/* PIN GATE */}
        {pendingEvent && <PinGate event={pendingEvent} onSuccess={pinOk} onCancel={pinCancel}/>}

        {/* PLAYER */}
        {activeEvent && <VideoModal event={activeEvent} onClose={()=>setActive(null)}/>}

        {/* SEARCH */}
        {showSearch && (
          <div className="srch-ov">
            <button className="srch-cls" onClick={()=>{setShowSearch(false);setSearchQ("");}}>✕</button>
            <div className="srch-in">
              <div className="srch-lbl">Search the collection</div>
              <input className="srch-inp" placeholder="Event, location, category…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} autoFocus/>
              <div className="srch-res">
                {searchResults.length>0
                  ? searchResults.map(r=>(
                      <div key={r.id} className="srch-item" onClick={()=>{openEvent(r);setShowSearch(false);setSearchQ("");}}>
                        <img src={r.thumb} alt={r.title}/>
                        <div>
                          <h4>{r.title}</h4>
                          <span className="sc">{r.category} · {r.location} · {r.year}</span>
                          <div className="sp">{r.pin?"🔒 PIN Protected":"🌐 Public"} · {r.episodes.length} film(s)</div>
                        </div>
                      </div>))
                  : searchQ.length>1
                    ? <p style={{fontSize:12,color:"rgba(255,255,255,.26)"}}>No events found for "{searchQ}"</p>
                    : <p style={{fontSize:12,color:"rgba(255,255,255,.16)"}}>Begin typing to search all events…</p>
                }
              </div>
            </div>
          </div>
        )}

        {/* ADMIN */}
        {showAdmin && (
          <AdminPanel onClose={()=>setShowAdmin(false)} onAdd={addEvent} onUpdate={updateEvent} events={events}/>
        )}
      </div>
    </>
  );
}
