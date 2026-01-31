const CACHE_NAME = "compteur-v1";

const FILES_TO_CACHE = [
  "./",
  "./menu.html",
  "./index.html",

  "./heures/index.html",
  "./paye/index.html",

  "./images/renard-annuel.jpg",
  "./images/renard-mensuel.jpg",

  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation : mise en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch : offline-first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
