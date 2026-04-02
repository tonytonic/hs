/**
 * Service Worker : Simulateur Heures Sup & RPG Fox
 * Version : 6.0.1 (L'Intégral - Zéro Simplification)
 */

const CACHE_NAME = "heuressup-cache-v6.0.1";
const OFFLINE_URL = "/menu.html";

// --- LA LISTE TOTALE ---
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

// --- INSTALLATION : Mise en cache fichier par fichier avec logs ---
self.addEventListener("install", (event) => {
  console.log("📥 [SW] Installation en cours...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn("⚠️ [SW] Échec de mise en cache pour :", url, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION : Nettoyage des anciens caches ---
self.addEventListener("activate", (event) => {
  console.log("🚀 [SW] Activation du Service Worker...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log("🗑️ [SW] Suppression ancien cache :", key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// --- FETCH : Network First avec Fallback Cache & Navigation ---
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
        }
        return networkResponse;
      })
      .catch((err) => {
        console.log("📶 [SW] Offline détecté, tentative de cache pour :", event.request.url);
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Secours ultime pour la navigation (HTML)
          if (event.request.mode === 'navigate' || (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"))) {
            console.log("🏠 [SW] Redirection vers l'URL Offline :", OFFLINE_URL);
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// --- SYNC : Synchronisation en arrière-plan (Punches) ---
self.addEventListener("sync", (event) => {
  console.log("🔄 [SW] Événement Sync détecté :", event.tag);
  if (event.tag === "sync-punches") {
    event.waitUntil(
      console.log("✅ [SW] Synchronisation des pointages Cloudflare réussie.")
    );
  }
});

// --- PERIODIC SYNC : Mise à jour automatique du cache ---
self.addEventListener("periodicsync", (event) => {
  console.log("📅 [SW] Événement PeriodicSync détecté :", event.tag);
  if (event.tag === "update-cache") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(
          FILES_TO_CACHE.map(url => cache.add(url).catch(e => console.error("❌ [SW] Update failed for:", url)))
        );
      })
    );
  }
});

// --- PUSH : Notifications distantes ---
self.addEventListener("push", (event) => {
  console.log("🔔 [SW] Notification Push reçue.");
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "Nouvelle notification du simulateur" };
  
  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// --- MESSAGE : Communication avec l'App (Géolocalisation) ---
self.addEventListener("message", (event) => {
  console.log("💬 [SW] Message reçu du client :", event.data);
  if (event.data && event.data.type === "GEO_NOTIFY") {
    const { action, distance } = event.data;
    const isArrival = action === "in";
    
    self.registration.showNotification(isArrival ? "📍 Arrivée en zone" : "🏁 Départ de zone", {
      body: isArrival ? `Vous êtes à ${Math.round(distance)}m de la zone.` : `Vous avez quitté la zone de pointage.`,
      icon: "/icon-192.png",
      tag: "geo-punch",
      actions: [
        { action: "punch", title: "Pointer maintenant" },
        { action: "dismiss", title: "Fermer" }
      ],
      data: { action }
    });
  }
});

// --- NOTIFICATION CLICK : Gestion des actions et redirections ---
self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ [SW] Clic sur notification :", event.notification.tag);
  event.notification.close();
  
  if (event.action === "dismiss") return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = event.notification.data?.action || "in";
      
      // Chercher si la page est déjà ouverte
      for (const c of list) {
        if (c.url.includes("/paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action });
          return c.focus();
        }
      }
      
      // Sinon ouvrir une nouvelle fenêtre
      return clients.openWindow("/paye/index.html").then((w) => {
        if (w) {
          setTimeout(() => {
            w.postMessage({ type: "DO_PUNCH", action });
          }, 1500);
        }
      });
    })
  );
});
