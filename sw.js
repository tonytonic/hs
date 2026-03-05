 /**
 * Service Worker : Compteur d'Heures & RPG Fox
 * Version : 1.6.4 (Complet avec dossier Fox)
 */

const CACHE_NAME = "compteur-heures-v1.6.4";
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

// --- INSTALLATION (Plus robuste contre les erreurs 404) ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // On utilise une boucle pour que si UN fichier manque, les AUTRES soient quand même cachés
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn("⚠️ Impossible de mettre en cache (vérifie le nom) :", url);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION (Nettoyage des anciens caches) ---
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

// --- FETCH (Gestion du mode hors-ligne) ---
self.addEventListener("fetch", (event) => {
  // Stratégie : Réseau d'abord, sinon Cache, sinon page de secours (Offline URL)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});

// --- SYNC (Background Sync) ---
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") console.log("🔄 Sync active");
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

// --- GÉOLOCALISATION & MESSAGES ---
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "GEO_NOTIFY") return;
  const { action, distance } = event.data;
  const isArrival = action === "in";
  self.registration.showNotification(isArrival ? "📍 Arrivée" : "🏁 Départ", {
    body: isArrival ? `Zone à ${Math.round(distance)}m` : `Sortie à ${Math.round(distance)}m`,
    icon: "./icon-192.png",
    tag: "geo-punch",
    actions: [
      { action: "punch", title: "Pointer" }, 
      { action: "dismiss", title: "Fermer" }
    ],
    data: { action }
  });
});

// --- CLIC SUR NOTIFICATION ---
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = event.notification.data?.action || "in";
      for (const c of list) {
        if (c.url.includes("paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action });
          return c.focus();
        }
      }
      return clients.openWindow("./paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});
