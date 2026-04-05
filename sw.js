/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 7.3.0-DEBUG — Cloudflare Pages
 */

const CACHE_NAME = "heuressup-cache-v7.3.0-debug";
const OFFLINE_URL = "./menu.html";

const FILES_TO_CACHE = [
  "./", "./index.html", "./menu.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
  "./glossaire.js", "./ccn/conventions-collectives.js",
  "./heures/index.html",
  "./paye/index.html",
  "./fox/index.html", "./fox/css/style.css",
  "./fox/js/config.js", "./fox/js/assets-config.js", "./fox/js/safety.js",
  "./fox/js/modes.js", "./fox/js/xp-system.js", "./fox/js/leagues.js",
  "./fox/js/badges.js", "./fox/js/milestones.js", "./fox/js/rpg-system.js",
  "./fox/js/quests.js", "./fox/js/combat.js", "./fox/js/skills.js",
  "./fox/js/inventory.js", "./fox/js/module-loader.js",
  "./fox/js/scenarios-fox-data.js", "./fox/js/scenarios-ai.js",
  "./fox/js/legal-engine.js", "./fox/js/module-reader.js",
  "./fox/js/snapshot-system.js", "./fox/js/export-rtf.js",
  "./fox/js/ai-integration.js", "./fox/js/main-rpg.js",
  "./fox/js/vue-pro.js", "./fox/js/articles-loi.js",
  "./module4/index.html", "./module4/js/app.js",
  "./module4/js/core/dte-engine.js", "./module4/js/core/dte-simulator.js",
  "./module4/js/core/dte-risks.js", "./module4/js/core/dte-learning.js",
  "./module4/js/features/ai-advisor.js", "./module4/js/features/checkin.js",
  "./module4/js/features/lifestyle.js", "./module4/js/features/notifications.js",
  "./module4/js/features/dte-glossary.js", "./module4/js/features/dte-scenarios.js",
  "./module4/js/features/schedule.js", "./module4/js/features/vacances.js",
  "./module4/js/features/pdf-report.js",
  "./module4/js/ui/dashboard.js", "./module4/js/ui/heatmap.js",
  "./module4/js/ui/whatif-panel.js", "./module4/js/ui/twin-body.js",
  "./module4/js/ui/animus-boot.js", "./module4/js/ui/radar-chart.js",
  "./module4/js/ui/timeline-chart.js",
  "./module4/css/main.css", "./module4/css/dashboard.css",
  "./module4/css/components.css", "./module4/css/charts.css",
  "./module4/css/twin-body.css",
  "./images/renard-annuel.png.jpg", "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg"
];

// ── INSTALL ───────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  console.log("🔧 [SW INSTALL] Démarrage installation — cache:", CACHE_NAME);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("📦 [SW INSTALL] Cache ouvert, mise en cache de", FILES_TO_CACHE.length, "fichiers...");
      
      let ok = 0, fail = 0;
      for (const url of FILES_TO_CACHE) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            await cache.put(url, res);
            ok++;
            console.log("  ✅ [CACHE OK]", url, "— status:", res.status, "— Cache-Control:", res.headers.get("Cache-Control"));
          } else {
            fail++;
            console.warn("  ⚠️ [CACHE SKIP]", url, "— status HTTP:", res.status);
          }
        } catch(err) {
          fail++;
          console.error("  ❌ [CACHE FAIL]", url, "— erreur:", err.message);
        }
      }
      
      console.log("📊 [SW INSTALL] Résultat:", ok, "OK,", fail, "échecs sur", FILES_TO_CACHE.length);
      
      // Lister le contenu du cache après installation
      const keys = await cache.keys();
      console.log("🗂️ [SW INSTALL] Contenu cache final:", keys.length, "entrées");
      keys.forEach(req => console.log("   →", req.url));
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE ──────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  console.log("🚀 [SW ACTIVATE] Activation — nettoyage anciens caches...");
  
  event.waitUntil(
    caches.keys().then(async (keys) => {
      console.log("🗑️ [SW ACTIVATE] Caches existants:", keys);
      for (const key of keys) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
          console.log("  🗑️ Supprimé:", key);
        }
      }
      console.log("✅ [SW ACTIVATE] Nettoyage terminé — cache actif:", CACHE_NAME);
    })
  );
  self.clients.claim();
});

// ── FETCH ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = event.request.url;
  const shortUrl = url.replace(self.location.origin, '');

  event.respondWith(
    fetch(event.request)
      .then(async (networkResponse) => {
        const status = networkResponse.status;
        if (status === 200) {
          // Lire le body COMPLET avant de cloner — fix Cloudflare content-length:0
          const body = await networkResponse.arrayBuffer();
          // Reconstruire une réponse propre sans les headers qui bloquent le cache
          const headers = new Headers();
          networkResponse.headers.forEach((val, key) => {
            // Exclure les headers qui empêchent la mise en cache
            if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
              headers.append(key, val);
            }
          });
          const cleanResponse = new Response(body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers
          });
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cleanResponse);
            console.log("✅ [CACHE OK]", shortUrl, "| taille:", body.byteLength, "octets");
          });
          // Retourner une nouvelle réponse avec le même body
          return new Response(body, { status, statusText: networkResponse.statusText, headers: networkResponse.headers });
        } else {
          console.warn("⚠️ [FETCH NET NON-200]", shortUrl, "| status:", status);
        }
        return networkResponse;
      })
      .catch((netErr) => {
        console.log("📴 [FETCH OFFLINE] Réseau indisponible pour:", shortUrl, "— recherche dans cache...");
        
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log("✅ [FETCH CACHE HIT]", shortUrl);
            return cachedResponse;
          }
          
          console.error("❌ [FETCH CACHE MISS]", shortUrl, "— non trouvé dans le cache !");
          
          // Fallback HTML
          const isNav = event.request.mode === "navigate" ||
            event.request.headers.get("accept")?.includes("text/html");
          
          if (isNav) {
            console.log("🔄 [FETCH FALLBACK] Retour vers menu.html offline");
            return caches.match(OFFLINE_URL).then(r => {
              if (r) { console.log("✅ [FETCH FALLBACK OK] menu.html servi"); return r; }
              console.error("💥 [FETCH FALLBACK FAIL] menu.html absent du cache !");
            });
          }
        });
      })
  );
});

// ── SYNC ──────────────────────────────────────────────────────────────────────
self.addEventListener("sync", (e) => {
  console.log("🔄 [SYNC]", e.tag);
});

self.addEventListener("periodicsync", (e) => {
  if (e.tag === "update-cache") {
    console.log("🔁 [PERIODIC SYNC] Mise à jour cache...");
    e.waitUntil(
      caches.open(CACHE_NAME).then((c) =>
        Promise.all(FILES_TO_CACHE.map((u) => c.add(u).catch(() => {})))
      )
    );
  }
});

self.addEventListener("push", (e) => {
  const d = e.data?.json() ?? { title: "Heures Sup", body: "Notification" };
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: "./icon-192.png" }));
});

self.addEventListener("message", (e) => {
  if (e.data?.type === "GEO_NOTIFY") {
    const { action, distance } = e.data;
    self.registration.showNotification(action === "in" ? "📍 Arrivée" : "🏁 Départ", {
      body: action === "in" ? `Zone à ${Math.round(distance)}m` : "Sortie de zone",
      icon: "./icon-192.png", tag: "geo-punch",
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
      return clients.openWindow("./paye/index.html").then((w) => {
        if (w) setTimeout(() => w.postMessage({ type: "DO_PUNCH", action }), 1500);
      });
    })
  );
});
