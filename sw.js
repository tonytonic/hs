/**
 * Service Worker : Simulateur Heures Sup & RPG Fox
 * Version : 6.0.1 (L'Intégral - CCN & Full Logic)
 */

const CACHE_NAME = "heuressup-cache-v6.0.1";
const OFFLINE_URL = "/menu.html";

// --- LA LISTE TOTALE (Zéro oubli) ---
const FILES_TO_CACHE = [
  "/", 
  "/index.html", 
  "/menu.html", 
  "/manifest.json",
  "/sw.js",
  "/glossaire.js",
  "/icon-192.png", 
  "/icon-512.png", 
  "/apple-touch-icon.png",
  "/foxpredit.jpg",
  "/heures/index.html", 
  "/paye/index.html",
  
  // --- DOSSIER CCN (Fixé selon capture) ---
  "/ccn/index.html",
  "/ccn/conventions-collectives.js",

  // --- DOSSIER MODULE 4 ---
  "/module4/index.html",
  "/module4/js/app.js",
  "/module4/js/core/dte-engine.js",
  "/module4/js/core/dte-simulator.js",
  "/module4/js/core/dte-risks.js",
  "/module4/js/core/dte-learning.js",
  "/module4/js/features/ai-advisor.js",
  "/module4/js/features/checkin.js",
  "/module4/js/features/lifestyle.js",
  "/module4/js/features/notifications.js",
  "/module4/js/features/dte-glossary.js",
  "/module4/js/features/dte-scenarios.js",
  "/module4/js/ui/dashboard.js",
  "/module4/js/ui/heatmap.js",
  "/module4/js/ui/whatif-panel.js",
  "/module4/js/ui/twin-body.js",
  "/module4/js/ui/animus-boot.js",
  "/module4/css/main.css",
  "/module4/css/dashboard.css",
  "/module4/css/components.css",
  "/module4/css/charts.css",
  "/module4/css/twin-body.css",

  // --- DOSSIER IMAGES ---
  "/images/renard-annuel.png.jpg", 
  "/images/renard-mensuel.png.jpg", 
  "/images/renard-central.png.jpg",

  // --- DOSSIER FOX (RPG COMPLET) ---
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
  console.log("📥 [SW] Installation Master Cloudflare...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn("⚠️ [SW] Fichier ignoré au cache :", url);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION ---
self.addEventListener("activate", (event) => {
  console.log("🚀 [SW] Service Worker Activé.");
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
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') return caches.match(OFFLINE_URL);
        });
      })
  );
});

// --- SYNC ---
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") {
    console.log("🔄 [SW] Synchronisation des données Cloudflare...");
  }
});

// --- PERIODIC SYNC ---
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
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "Notification RPG active" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [100, 50, 100]
    })
  );
});

// --- GÉOLOCALISATION ---
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "GEO_NOTIFY") {
    const { action, distance } = event.data;
    const isArrival = action === "in";
    self.registration.showNotification(isArrival ? "📍 Arrivée" : "🏁 Départ", {
      body: isArrival ? `Zone à ${Math.round(distance)}m` : `Sortie de zone`,
      icon: "/icon-192.png",
      actions: [{ action: "punch", title: "Pointer" }, { action: "dismiss", title: "Fermer" }],
      data: { action }
    });
  }
});

// --- CLIC NOTIF ---
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
