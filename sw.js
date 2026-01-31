const CACHE_NAME = "compteur-heures-v1";

const FILES_TO_CACHE = [
  "./", 
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
  console.log("SW install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW activate");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
