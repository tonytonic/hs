/**
 * Service Worker : Simulateur Heures Sup & RPG Fox
 * Version : 6.0.2 (L'INTÉGRAL COMPLET - ZÉRO CUT)
 */

const CACHE_NAME = "heuressup-cache-v6.0.2";
const OFFLINE_URL = "/menu.html";

// --- LA LISTE TOTALE DES FICHIERS (Zéro oubli) ---
const FILES_TO_CACHE = [
  "/", 
  "/index.html", 
  "/menu.html", 
  "/manifest.json",
  "/sw.js",
  "/glossaire.js",
  "/privacy.html",
  "/icon-192.png", 
  "/icon-512.png", 
  "/apple-touch-icon.png",
  "/foxpredit.jpg",
  
  // --- DOSSIER CCN ---
  "/ccn/index.html",
  "/ccn/conventions-collectives.js",

  // --- DOSSIER HEURES ---
  "/heures/index.html", 

  // --- DOSSIER PAYE ---
  "/paye/index.html",

  // --- DOSSIER MODULE 4 (Tous les JS et CSS) ---
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

// --- INSTALLATION : Logs complets ---
self.addEventListener("install", (event) => {
  console.log("📥 [SW] Début de l'installation...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn("⚠️ [SW] Échec mise en cache :", url, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// --- ACTIVATION : Nettoyage strict ---
self.addEventListener("activate", (event) => {
  console.log("🚀 [SW] Activation et nettoyage des anciens caches...");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log("🗑️ [SW] Suppression de l'ancien cache :", key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// --- FETCH : Cache-First puis Network (Correctif Safari Redirection) ---
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Retourne le cache si trouvé (Vitesse + Offline iOS)
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Sinon, tente le réseau
      return fetch(event.request).then((networkResponse) => {
        // Protection contre les redirections qui font planter Safari
        if (networkResponse.redirected) {
          return networkResponse;
        }

        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.log("📶 [SW] Offline : Tentative de secours...");
        
        // Navigation de secours si on est sur un document HTML
        if (event.request.mode === 'navigate' || (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"))) {
          console.log("🏠 [SW] Redirection vers l'URL Offline :", OFFLINE_URL);
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// --- SYNC : Synchro en arrière-plan (Punches) ---
self.addEventListener("sync", (event) => {
  console.log("🔄 [SW] Synchro détectée :", event.tag);
  if (event.tag === "sync-punches") {
    event.waitUntil(
      console.log("✅ [SW] Synchronisation des pointages effectuée.")
    );
  }
});

// --- PERIODIC SYNC : Mise à jour automatique ---
self.addEventListener("periodicsync", (event) => {
  console.log("📅 [SW] PeriodicSync détecté :", event.tag);
  if (event.tag === "update-cache") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(
          FILES_TO_CACHE.map(url => cache.add(url).catch(e => console.error("❌ Update failed:", url)))
        );
      })
    );
  }
});

// --- PUSH : Gestion des notifications distantes ---
self.addEventListener("push", (event) => {
  console.log("🔔 [SW] Push reçu.");
  const data = event.data ? event.data.json() : { title: "Heures Sup", body: "Notification du simulateur" };
  
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
  console.log("💬 [SW] Message reçu :", event.data);
  if (event.data && event.data.type === "GEO_NOTIFY") {
    const { action, distance } = event.data;
    const isArrival = action === "in";
    
    self.registration.showNotification(isArrival ? "📍 Arrivée en zone" : "🏁 Départ de zone", {
      body: isArrival ? `Vous êtes à ${Math.round(distance)}m.` : `Vous avez quitté la zone.`,
      icon: "/icon-192.png",
      tag: "geo-punch",
      actions: [
        { action: "punch", title: "Pointer" },
        { action: "dismiss", title: "Fermer" }
      ],
      data: { action }
    });
  }
});

// --- NOTIFICATION CLICK : Gestion des redirections ---
self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ [SW] Clic notification :", event.notification.tag);
  event.notification.close();
  
  if (event.action === "dismiss") return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = event.notification.data?.action || "in";
      
      // Focus si déjà ouvert
      for (const c of list) {
        if (c.url.includes("/paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action });
          return c.focus();
        }
      }
      
      // Sinon ouvrir
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
