const CACHE_NAME = "compteur-heures-v1.4.8";

const FILES_TO_CACHE = [
  "./index.html",
  "./menu.html",
  "./manifest.json",
  "./images/renard-annuel.png.jpg",
  "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./heures/index.html",
  "./paye/index.html",
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
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
        } catch (e) {
          console.warn("⚠️ Échec mise en cache :", file);
        }
      }
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

// --- STRATÉGIE FETCH (Optimisée iOS & Android) ---
self.addEventListener("fetch", (event) => {
  // On ne traite que les requêtes GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Stratégie : Réponse immédiate du cache + mise à jour silencieuse
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback hors-ligne : si navigation, renvoyer menu.html
          if (event.request.mode === "navigate") {
            return caches.match("./menu.html");
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});

/* ========================================================
   LOGIQUE ANDROID (Play Store / Background Sync / Push)
   Ces événements sont ignorés par iOS sans provoquer d'erreurs.
   ======================================================== */

// Background Sync (Requis par PWABuilder)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") {
    console.log("🔄 Sync en attente...");
  }
});

// Push Notifications standard
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Compteur", body: "Rappel" };
  const options = {
    body: data.body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    vibrate: [100, 50, 100],
    data: { url: "./paye/index.html" }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

/* ========================================================
   GÉOLOCALISATION & INTERACTION (Votre logique actuelle)
   ======================================================== */

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "GEO_NOTIFY") return;

  const { action, distance } = event.data;
  const isArrival = action === "in";
  const title = isArrival ? "📍 Tu arrives au travail" : "🏁 Tu quittes le travail";
  const body = isArrival
    ? `Zone détectée à ${Math.round(distance)} m — Pointer l'arrivée ?`
    : `Tu t'éloignes (${Math.round(distance)} m) — Pointer la sortie ?`;

  self.registration.showNotification(title, {
    body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: "geo-punch",
    renotify: false,
    vibrate: [100, 50, 100],
    actions: [
      { action: "punch", title: isArrival ? "▶ Pointer" : "⏹ Pointer" },
      { action: "dismiss", title: "Plus tard" }
    ],
    data: { action }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const action = event.notification.data?.action || "in";
      const targetUrl = new URL("./paye/index.html", self.location.origin).href;

      // 1. Si l'app est déjà ouverte, on focus et on envoie le message
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          client.postMessage({ type: "DO_PUNCH", action });
          return client.focus();
        }
      }

      // 2. Si l'app est fermée, on l'ouvre
      if (clients.openWindow) {
        return clients.openWindow("./paye/index.html").then((windowClient) => {
          // Petit délai pour laisser le temps au script de charger sur Android
          if (windowClient) {
            setTimeout(() => {
              windowClient.postMessage({ type: "DO_PUNCH", action });
            }, 1200);
          }
        });
      }
    })
  );
});
