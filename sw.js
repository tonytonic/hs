/**
 * Service Worker : Compteur d'Heures & RPG Fox
 * Version : 1.6.2 (Optimisé pour PWABuilder & Google Play)
 */

const CACHE_NAME = "compteur-heures-v1.6.2";
const OFFLINE_URL = "./menu.html"; // Page de secours impérative pour le Play Store

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
      console.log("📥 Mise en cache globale des ressources");
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

// --- FETCH (Gestion du cache avec Fallback Offline strict) ---
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Si la ressource est déjà en cache, on la sert immédiatement
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Sinon, on tente de la récupérer sur le réseau
      return fetch(event.request)
        .then((networkResponse) => {
          // Si réseau OK, on clone la réponse pour mettre à jour le cache
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // 3. FALLBACK : Si le réseau échoue et que c'est une navigation (page HTML)
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

// --- SYNC (Background Sync pour PWABuilder) ---
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") {
    console.log("🔄 Synchronisation en arrière-plan activée");
  }
});

// --- PERIODIC SYNC ---
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-cache") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
  }
});

// --- PUSH NOTIFICATIONS ---
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "N'oubliez pas de pointer !" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-192.png",
      badge: "./icon-192.png"
    })
  );
});

// --- MESSAGES & GÉOLOCALISATION ---
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "GEO_NOTIFY") return;
  const { action, distance } = event.data;
  const isArrival = action === "in";
  
  self.registration.showNotification(isArrival ? "📍 Arrivée détectée" : "🏁 Départ détecté", {
    body: isArrival ? `Zone de travail à ${Math.round(distance)}m` : `Vous quittez la zone à ${Math.round(distance)}m`,
    icon: "./icon-192.png",
    tag: "geo-punch",
    actions: [
      { action: "punch", title: "Pointer maintenant" }, 
      { action: "dismiss", title: "Ignorer" }
    ],
    data: { action }
  });
});

// --- CLIC SUR NOTIFICATION ---
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const action = event.notification.data?.action || "in";
      
      for (const client of clientList) {
        if (client.url.includes("paye/index.html") && "focus" in client) {
          client.postMessage({ type: "DO_PUNCH", action });
          return client.focus();
        }
      }
      
      return clients.openWindow("./paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});
