/**
 * Service Worker : Simulateur Heures Sup & RPG Fox
 * Version : 6.0.1 (Production Cloudflare - Full Options)
 */

const CACHE_NAME = "heuressup-cache-v6.0.1";
const OFFLINE_URL = "/menu.html";

// On reprend TOUS tes fichiers originaux mais avec le "/"
const FILES_TO_CACHE = [
  "/", 
  "/index.html", 
  "/menu.html", 
  "/manifest.json",
  "/icon-192.png", 
  "/icon-512.png", 
  "/apple-touch-icon.png",
  "/heures/index.html", 
  "/paye/index.html",
  "/module4/index.html",
  "/module4/css/main.css",
  "/images/renard-annuel.png.jpg", 
  "/images/renard-mensuel.png.jpg", 
  "/images/renard-central.png.jpg",
  "/fox/index.html", 
  "/fox/css/style.css", 
  "/fox/js/safety.js",
  "/fox/js/storage.js", 
  "/fox/js/config.js", 
  "/fox/js/assets-config.js",
  "/fox/js/modes.js", 
  "/fox/js/xp-system.js", 
  "/fox/js/leagues.js",
  "/fox/js/badges.js", 
  "/fox/js/milestones.js", 
  "/fox/js/rpg-system.js",
  "/fox/js/module3.js", 
  "/fox/js/quests.js", 
  "/fox/js/combat.js",
  "/fox/js/skills.js", 
  "/fox/js/inventory.js", 
  "/fox/js/module-loader.js",
  "/fox/js/scenarios-fox-data.js", 
  "/fox/js/scenarios-fox.js",
  "/fox/js/scenarios-ai.js", 
  "/fox/js/legal-engine.js",
  "/fox/js/data-bridge.js", 
  "/fox/js/module-reader.js",
  "/fox/js/snapshot-system.js", 
  "/fox/js/export-rtf.js",
  "/fox/js/ai-integration.js", 
  "/fox/js/main-rpg.js"
];

// --- INSTALLATION ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn("⚠️ Fichier non trouvé sur Cloudflare :", url);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// --- FETCH (Network First) ---
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// --- SYNC ---
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") {
    console.log("🔄 Synchronisation Cloudflare active...");
  }
});

// --- PERIODIC SYNC (Mise à jour auto) ---
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-cache") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(FILES_TO_CACHE.map(url => cache.add(url).catch(() => {})));
      })
    );
  }
});

// --- NOTIFICATIONS PUSH ---
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "Nouvelle notification" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png"
    })
  );
});

// --- MESSAGES (GEOLOCALISATION) ---
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "GEO_NOTIFY") {
    const { action, distance } = event.data;
    const isArrival = action === "in";
    self.registration.showNotification(isArrival ? "📍 Arrivée" : "🏁 Départ", {
      body: isArrival ? `Zone à ${Math.round(distance)}m` : `Sortie de zone`,
      icon: "/icon-192.png",
      tag: "geo-punch",
      actions: [{ action: "punch", title: "Pointer" }, { action: "dismiss", title: "Fermer" }],
      data: { action }
    });
  }
});

// --- CLIC SUR NOTIFICATION ---
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = event.notification.data?.action || "in";
      for (const c of list) {
        if (c.url.includes("/paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action });
          return c.focus();
        }
      }
      return clients.openWindow("/paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});