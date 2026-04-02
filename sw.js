/**
 * Service Worker : Simulateur Heures Sup & RPG Fox
 * Version : 6.0.1 (Production Cloudflare - Cache Purge)
 */

const CACHE_NAME = "heuressup-cache-v6.0.1";
const OFFLINE_URL = "/menu.html";

const FILES_TO_CACHE = [
  "/", "/index.html", "/menu.html", "/manifest.json",
  "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png",
  "/heures/index.html", "/paye/index.html",
  "/module4/index.html", "/module4/css/main.css",
  "/images/renard-annuel.png.jpg", "/images/renard-mensuel.png.jpg", "/images/renard-central.png.jpg",
  "/fox/index.html", "/fox/css/style.css", "/fox/js/main-rpg.js" 
  // (Ajoute ici tes autres fichiers JS si nécessaire, toujours avec / au début)
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(FILES_TO_CACHE.map(url => cache.add(url).catch(e => console.warn(url, e))));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') return caches.match(OFFLINE_URL);
        });
      })
  );
});