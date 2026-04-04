/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 7.0.0 — Cloudflare Pages Edition
 * Stratégie : Network First + Cache Fallback + Offline solide
 */

const CACHE_NAME = "heuressup-cache-v7.0.0";
const OFFLINE_URL = "./menu.html";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./menu.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./glossaire.js",
  "./ccn/conventions-collectives.js",

  // Module 1 — Compteur annuel
  "./heures/index.html",

  // Module 2 — Simulateur mensuel
  "./paye/index.html",

  // Module 3 — Fox / Kitsune RPG
  "./fox/index.html",
  "./fox/css/style.css",
  "./fox/js/config.js",
  "./fox/js/assets-config.js",
  "./fox/js/safety.js",
  "./fox/js/modes.js",
  "./fox/js/xp-system.js",
  "./fox/js/leagues.js",
  "./fox/js/badges.js",
  "./fox/js/milestones.js",
  "./fox/js/rpg-system.js",
  "./fox/js/quests.js",
  "./fox/js/combat.js",
  "./fox/js/skills.js",
  "./fox/js/inventory.js",
  "./fox/js/module-loader.js",
  "./fox/js/scenarios-fox-data.js",
  "./fox/js/scenarios-ai.js",
  "./fox/js/legal-engine.js",
  "./fox/js/module-reader.js",
  "./fox/js/snapshot-system.js",
  "./fox/js/export-rtf.js",
  "./fox/js/ai-integration.js",
  "./fox/js/main-rpg.js",
  "./fox/js/vue-pro.js",
  "./fox/js/articles-loi.js",

  // Module 4 — Digital Twin Engine
  "./module4/index.html",
  "./module4/js/app.js",
  "./module4/js/core/dte-engine.js",
  "./module4/js/core/dte-simulator.js",
  "./module4/js/core/dte-risks.js",
  "./module4/js/core/dte-learning.js",
  "./module4/js/features/ai-advisor.js",
  "./module4/js/features/checkin.js",
  "./module4/js/features/lifestyle.js",
  "./module4/js/features/notifications.js",
  "./module4/js/features/dte-glossary.js",
  "./module4/js/features/dte-scenarios.js",
  "./module4/js/features/schedule.js",
  "./module4/js/features/vacances.js",
  "./module4/js/features/pdf-report.js",
  "./module4/js/ui/dashboard.js",
  "./module4/js/ui/heatmap.js",
  "./module4/js/ui/whatif-panel.js",
  "./module4/js/ui/twin-body.js",
  "./module4/js/ui/animus-boot.js",
  "./module4/js/ui/radar-chart.js",
  "./module4/js/ui/timeline-chart.js",
  "./module4/css/main.css",
  "./module4/css/dashboard.css",
  "./module4/css/components.css",
  "./module4/css/charts.css",
  "./module4/css/twin-body.css",

  // Assets images
  "./images/renard-annuel.png.jpg",
  "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg"
];

// ── INSTALLATION ─────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) =>
          cache.add(url).catch(() => {
            console.warn("⚠️ Cache ignoré (fichier absent ou réseau) :", url);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// ── ACTIVATION ───────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH — Network First + Cache Fallback ────────────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Ignorer les requêtes non-HTTP (extensions, etc.)
  if (!event.request.url.startsWith("http")) return;

  // Ignorer les API externes (Anthropic, CDN) → pas de mise en cache
  const url = new URL(event.request.url);
  const isExternal = !url.hostname.includes("simulateurheuressupfrance.pages.dev");
  if (isExternal) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Fallback HTML → menu offline
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match(OFFLINE_URL);
          }
        })
      )
  );
});

// ── BACKGROUND SYNC ──────────────────────────────────────────────────────────
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-punches") {
    console.log("🔄 Synchronisation des pointages...");
  }
});

// ── PERIODIC SYNC ─────────────────────────────────────────────────────────────
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-cache") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) =>
        Promise.all(FILES_TO_CACHE.map((url) => cache.add(url).catch(() => {})))
      )
    );
  }
});

// ── PUSH NOTIFICATIONS ────────────────────────────────────────────────────────
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: "Heures Sup", body: "Nouvelle notification" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-192.png",
      badge: "./icon-192.png"
    })
  );
});

// ── MESSAGES (GÉOLOCALISATION) ────────────────────────────────────────────────
self.addEventListener("message", (event) => {
  if (event.data?.type === "GEO_NOTIFY") {
    const { action, distance } = event.data;
    self.registration.showNotification(action === "in" ? "📍 Arrivée" : "🏁 Départ", {
      body: action === "in" ? `Zone à ${Math.round(distance)}m` : "Sortie de zone",
      icon: "./icon-192.png",
      tag: "geo-punch",
      actions: [{ action: "punch", title: "Pointer" }, { action: "dismiss", title: "Fermer" }],
      data: { action }
    });
  }
});

// ── CLIC NOTIFICATION ────────────────────────────────────────────────────────
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
