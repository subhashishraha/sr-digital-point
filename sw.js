/* SR Digital Point — service worker
   Bump VERSION whenever you change HTML/CSS/JS so visitors get the update. */
const VERSION = "v1.0.0";
const STATIC_CACHE = "srdp-static-" + VERSION;
const RUNTIME_CACHE = "srdp-runtime-" + VERSION;

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/script.js",
  "./assets/images/logo.png",
  "./assets/images/logo-white.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/apple-touch-icon.png",
];

// Third-party static files worth keeping offline (fonts + icon font)
const CDN_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith("srdp-") && k !== STATIC_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // form posts (Web3Forms) go straight to network
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Page navigations: network first (fresh content), cached page when offline
  if (req.mode === "navigate" && sameOrigin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html", { ignoreSearch: true }))
    );
    return;
  }

  // Own assets + fonts/icons CDN: stale-while-revalidate
  if (sameOrigin || CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(req, { ignoreSearch: sameOrigin }).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) {
              const copy = res.clone();
              caches.open(sameOrigin ? STATIC_CACHE : RUNTIME_CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
  // Everything else (Google Maps, WhatsApp, Web3Forms) is left to the browser.
});
