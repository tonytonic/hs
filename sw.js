/**
 * Service Worker : Compteur d'Heures & RPG Fox
 * Version : 1.6.2 (Optimisé pour PWABuilder Offline Test)
 */

const CACHE_NAME = "compteur-heures-v1.6.2";
const OFFLINE_URL = "./menu.html"; 

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./menu.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./heures/index.html",
  "./paye/index.html",
  "./images/renard-annuel.png.jpg",
  "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg",
  "./fox/index.html",
  "./fox/css/style.css",
  "./fox/js/safety.js",
  "./fox/js/storage.js",
  "./fox/js/config.js",
  "./fox/js/assets-config.js",
  "./fox/js/modes.js",
  "./fox/js/xp-system.js",
  "./fox/js/leagues.js",
  "./fox/js/badges.js",
  "./fox/js/milestones.js",
  "./fox/js/rpg-system.js",
  "./fox/js/module3.js",
  "./fox/js/quests.js",
  "./fox/js/combat.js",
  "./fox/js/skills.js",
  "./fox/js/inventory.js",
  "./fox/js/module-loader.js",
  "./fox/js/scenarios-fox-data.js",
  "./fox/js/scenarios-fox.js",
  "./fox/js/scenarios-ai.js",
  "./fox/js/legal-engine.js",
  "./fox/js/data-bridge.js",
  "./fox/js/module-reader.js",
  "./fox/js/snapshot-system.js",
  "./fox/js/export-rtf.js",
  "./fox/js/ai-integration.js",
  "./fox/js/main-rpg.js"
];

// --- INSTALLATION ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// --- FETCH (Logique Offline validée par PWABuilder) ---
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Pour les pages HTML, on tente le réseau, sinon le menu.html du cache
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    // Pour les assets (images/js), cache d'abord, puis réseau
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// --- PUSH NOTIFICATIONS ---
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "Rappel" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-192.png"
    })
  );
});
