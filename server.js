const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const BUILD_LIVE_DIR = path.join(ROOT, "build-preloader");
const BUILD_DIR = fs.existsSync(BUILD_LIVE_DIR) ? BUILD_LIVE_DIR : path.join(ROOT, "build");
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const DB_FILE = path.join(DATA_DIR, "events.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8"
};

function ensureDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]\n", "utf8");
  }
}

function readEvents() {
  ensureDatabase();
  const raw = fs.readFileSync(DB_FILE, "utf8").trim();
  return raw ? JSON.parse(raw) : [];
}

function writeEvents(events) {
  ensureDatabase();
  fs.writeFileSync(DB_FILE, `${JSON.stringify(events, null, 2)}\n`, "utf8");
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function cleanEvent(event) {
  return {
    id: event.id || Date.now(),
    title: String(event.title || "").trim(),
    year: event.year || "",
    location: String(event.location || "").trim(),
    category: String(event.category || "Destination").trim(),
    thumb: String(event.thumb || "").trim(),
    desc: String(event.desc || "").trim(),
    pin: String(event.pin || "").trim(),
    featured: Boolean(event.featured),
    episodes: Array.isArray(event.episodes) ? event.episodes.map((ep, index) => ({
      id: ep.id || `e${Date.now()}${index}`,
      title: String(ep.title || "").trim(),
      duration: String(ep.duration || "").trim(),
      youtubeId: String(ep.youtubeId || "").trim()
    })).filter(ep => ep.youtubeId) : []
  };
}

function extractYoutubeId(input) {
  const value = String(input || "").trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }
    if (url.searchParams.get("v")) {
      return url.searchParams.get("v");
    }
    const parts = url.pathname.split("/").filter(Boolean);
    const marker = parts.findIndex(part => ["embed", "shorts", "live"].includes(part));
    if (marker >= 0 && parts[marker + 1]) {
      return parts[marker + 1];
    }
  } catch (_) {
    return "";
  }

  return "";
}

function formatDuration(seconds) {
  const total = Number(seconds);
  if (!Number.isFinite(total) || total <= 0) return "";
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = Math.floor(total % 60);
  if (hrs > 0) return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

async function fetchYoutubeInfo(input) {
  const youtubeId = extractYoutubeId(input);
  if (!youtubeId) {
    throw new Error("Enter a valid YouTube URL or video ID");
  }

  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const response = await fetch(watchUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 HCM-TV-Admin/1.0"
    }
  });

  if (!response.ok) {
    throw new Error("Could not fetch YouTube video details");
  }

  const html = await response.text();
  const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});<\/script>/s)
    || html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/s);
  let details = {};

  if (playerMatch) {
    try {
      details = JSON.parse(playerMatch[1]).videoDetails || {};
    } catch (_) {
      details = {};
    }
  }

  let title = details.title || "";
  let thumbnail = details.thumbnail?.thumbnails?.at(-1)?.url || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  let duration = formatDuration(details.lengthSeconds);

  if (!title) {
    const oembed = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`);
    if (oembed.ok) {
      const data = await oembed.json();
      title = data.title || title;
      thumbnail = data.thumbnail_url || thumbnail;
    }
  }

  return { youtubeId, title, duration, thumbnail };
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/api/youtube") {
    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }
    try {
      sendJson(res, 200, await fetchYoutubeInfo(url.searchParams.get("url")));
    } catch (error) {
      sendJson(res, 400, { error: error.message || "Could not fetch YouTube video details" });
    }
    return;
  }

  const match = url.pathname.match(/^\/api\/events\/?([^/]*)?$/);
  if (!match) {
    sendJson(res, 404, { error: "API route not found" });
    return;
  }

  try {
    const events = readEvents();
    const id = match[1] ? Number(match[1]) : null;

    if (req.method === "GET" && !id) {
      sendJson(res, 200, events);
      return;
    }

    if (req.method === "POST" && !id) {
      const event = cleanEvent(await readBody(req));
      if (!event.title || event.episodes.length === 0) {
        sendJson(res, 400, { error: "Title and at least one film are required" });
        return;
      }
      const next = [event, ...events.filter(existing => existing.id !== event.id)];
      writeEvents(next);
      sendJson(res, 201, event);
      return;
    }

    if (req.method === "PUT" && id) {
      const event = cleanEvent({ ...(await readBody(req)), id });
      const exists = events.some(existing => existing.id === id);
      if (!exists) {
        sendJson(res, 404, { error: "Event not found" });
        return;
      }
      const next = events.map(existing => existing.id === id ? event : existing);
      writeEvents(next);
      sendJson(res, 200, event);
      return;
    }

    if (req.method === "DELETE" && id) {
      const next = events.filter(event => event.id !== id);
      writeEvents(next);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const baseDir = fs.existsSync(BUILD_DIR) ? BUILD_DIR : PUBLIC_DIR;
  const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(baseDir, safePath === "/" ? "index.html" : safePath);
  const publicPath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (safePath !== "/" && fs.existsSync(publicPath) && !fs.statSync(publicPath).isDirectory()) {
    filePath = publicPath;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(baseDir, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream"
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

ensureDatabase();
server.listen(PORT, () => {
  console.log(`HCM TV running at http://localhost:${PORT}`);
  console.log(`Database file: ${DB_FILE}`);
});
