const CACHE_NAME = "compteur-heures-v1.4.0";

const FILES_TO_CACHE = [
  "./index.html",
  "./menu.html",
  "./manifest.json",

  "./images/renard-annuel.png.jpg",
  "./images/renard-mensuel.png.jpg",

  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",

  "./heures/index.html",
  "./paye/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
        } catch (e) {
          console.warn("⚠️ Cache fail:", file);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).catch(() =>
        caches.match("./menu.html")
      );
    })
  );
});