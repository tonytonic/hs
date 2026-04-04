/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 7.1.0 — Cloudflare Pages — Offline Safari Fix
 * Fixes : chemins absolus + skipWaiting après cache complet
 */

const CACHE_NAME = "heuressup-cache-v7.1.0";
const OFFLINE_URL = "/menu.html";

const FILES_TO_CACHE = [
  "/", "/index.html", "/menu.html", "/manifest.json",
  "/icon-192.png", "/icon-512.png", "/glossaire.js",
  "/ccn/conventions-collectives.js",
  "/heures/index.html",
  "/paye/index.html",
  "/fox/index.html", "/fox/css/style.css",
  "/fox/js/config.js", "/fox/js/assets-config.js", "/fox/js/safety.js",
  "/fox/js/modes.js", "/fox/js/xp-system.js", "/fox/js/leagues.js",
  "/fox/js/badges.js", "/fox/js/milestones.js", "/fox/js/rpg-system.js",
  "/fox/js/quests.js", "/fox/js/combat.js", "/fox/js/skills.js",
  "/fox/js/inventory.js", "/fox/js/module-loader.js",
  "/fox/js/scenarios-fox-data.js", "/fox/js/scenarios-ai.js",
  "/fox/js/legal-engine.js", "/fox/js/module-reader.js",
  "/fox/js/snapshot-system.js", "/fox/js/export-rtf.js",
  "/fox/js/ai-integration.js", "/fox/js/main-rpg.js",
  "/fox/js/vue-pro.js", "/fox/js/articles-loi.js",
  "/module4/index.html", "/module4/js/app.js",
  "/module4/js/core/dte-engine.js", "/module4/js/core/dte-simulator.js",
  "/module4/js/core/dte-risks.js", "/module4/js/core/dte-learning.js",
  "/module4/js/features/ai-advisor.js", "/module4/js/features/checkin.js",
  "/module4/js/features/lifestyle.js", "/module4/js/features/notifications.js",
  "/module4/js/features/dte-glossary.js", "/module4/js/features/dte-scenarios.js",
  "/module4/js/features/schedule.js", "/module4/js/features/vacances.js",
  "/module4/js/features/pdf-report.js",
  "/module4/js/ui/dashboard.js", "/module4/js/ui/heatmap.js",
  "/module4/js/ui/whatif-panel.js", "/module4/js/ui/twin-body.js",
  "/module4/js/ui/animus-boot.js", "/module4/js/ui/radar-chart.js",
  "/module4/js/ui/timeline-chart.js",
  "/module4/css/main.css", "/module4/css/dashboard.css",
  "/module4/css/components.css", "/module4/css/charts.css",
  "/module4/css/twin-body.css"
];

// INSTALL — skipWaiting APRÈS cache complet (fix Safari)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        FILES_TO_CACHE.map((url) => cache.add(url).catch(() => console.warn("⚠️ Cache ignoré :", url)))
      ))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE — nettoyage + claim
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// FETCH — Network First + Cache Fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;
  if (new URL(event.request.url).hostname !== self.location.hostname) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.status === 200) {
          caches.open(CACHE_NAME).then((c) => c.put(event.request, res.clone()));
        }
        return res;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          const isNav = event.request.mode === "navigate" ||
            event.request.headers.get("accept")?.includes("text/html");
          if (isNav) return caches.match(OFFLINE_URL);
        })
      )
  );
});

self.addEventListener("sync", (e) => { if (e.tag === "sync-punches") console.log("🔄 Sync..."); });

self.addEventListener("periodicsync", (e) => {
  if (e.tag === "update-cache") {
    e.waitUntil(caches.open(CACHE_NAME).then((c) =>
      Promise.all(FILES_TO_CACHE.map((u) => c.add(u).catch(() => {})))
    ));
  }
});

self.addEventListener("push", (e) => {
  const d = e.data?.json() ?? { title: "Heures Sup", body: "Notification" };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: "/icon-192.png" }));
});

self.addEventListener("message", (e) => {
  if (e.data?.type === "GEO_NOTIFY") {
    const { action, distance } = e.data;
    self.registration.showNotification(action === "in" ? "📍 Arrivée" : "🏁 Départ", {
      body: action === "in" ? `Zone à ${Math.round(distance)}m` : "Sortie de zone",
      icon: "/icon-192.png", tag: "geo-punch",
      actions: [{ action: "punch", title: "Pointer" }, { action: "dismiss", title: "Fermer" }],
      data: { action }
    });
  }
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  if (e.action === "dismiss") return;
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const action = e.notification.data?.action || "in";
      for (const c of list) {
        if (c.url.includes("paye/index.html") && "focus" in c) {
          c.postMessage({ type: "DO_PUNCH", action }); return c.focus();
        }
      }
      return clients.openWindow("/paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});
