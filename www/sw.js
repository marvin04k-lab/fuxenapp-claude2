/* Offline-Cache für die PWA-Version (im APK nicht nötig, schadet aber nicht) */
const CACHE = "fuchsenapp-v2";
const FILES = ["./", "index.html", "styles.css", "app.js", "manifest.webmanifest",
  "data/skript.js", "data/content-brander.js", "data/content-burschen.js",
  "icons/icon-192.png", "icons/icon-512.png",
  "audio/gaudeamus.mp3", "audio/strassen.mp3", "audio/oecv-hymne.mp3", "audio/bundeshymne.mp3"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match("index.html"))));
});
