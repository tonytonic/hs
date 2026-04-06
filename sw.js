/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 7.3.0-DEBUG — Cloudflare Pages
 */

const CACHE_NAME = "heuressup-cache-v7.7.0";
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
  "./images/renard-central.png.jpg",

  // Décors saisonniers Fox (dans images/)
  "./images/fox-bg.PNG",
  "./images/fox-bg-2.jpg",
  "./images/fox-bg-3.jpg",
  "./images/fox-bg-4.jpg",

  // PNJ Fox (dans images/)
  "./images/foxplayer.PNG",
  "./images/foxplayer-2.PNG",
  "./images/foxplayer-3.PNG",
  "./images/foxplayer-4.PNG",
  "./images/foxplayer-5.PNG",
  "./images/foxplayer-6.PNG",
  "./images/foxplayer-7.PNG",
  "./images/foxplayer-8.PNG",
  "./images/foxplayer-9.PNG",
  "./images/foxplayer-10.PNG",

  // Images Fox (dans images/)
  "./images/foxpredit.jpg"
];

// ── INSTALL ───────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      
      let ok = 0, fail = 0;
      for (const url of FILES_TO_CACHE) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            // Lire le body complet avant de mettre en cache (fix Cloudflare content-length:0)
            const body = await res.arrayBuffer();
            const headers = new Headers();
            res.headers.forEach((val, key) => {
              if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
                headers.append(key, val);
              }
            });
            // Forcer Content-Length avec la vraie taille du body décompressé
            headers.set('content-length', body.byteLength.toString());
            headers.delete('content-encoding'); // supprimer gzip/br — body déjà décompressé
            headers.delete('transfer-encoding');
            const cleanRes = new Response(body, { status: res.status, statusText: res.statusText, headers });
            await cache.put(url, cleanRes);
            ok++;
          } else {
            fail++;
          }
        } catch(err) {
          fail++;
          console.error("  ❌ [CACHE FAIL]", url, "— erreur:", err.message);
        }
      }
      
      
      // Lister le contenu du cache après installation
      const keys = await cache.keys();
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE ──────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
        }
      }
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
          headers.set('content-length', body.byteLength.toString());
          headers.delete('content-encoding');
          headers.delete('transfer-encoding');
          const cleanResponse = new Response(body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers
          });
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cleanResponse);
          });
          // Retourner une nouvelle réponse avec le même body
          return new Response(body, { status, statusText: networkResponse.statusText, headers: networkResponse.headers });
        } else {
        }
        return networkResponse;
      })
      .catch((netErr) => {
        
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          console.error("❌ [FETCH CACHE MISS]", shortUrl, "— non trouvé dans le cache !");
          
          // Fallback HTML
          const isNav = event.request.mode === "navigate" ||
            event.request.headers.get("accept")?.includes("text/html");
          
          if (isNav) {
            return caches.match(OFFLINE_URL).then(r => {
              console.error("💥 [FETCH FALLBACK FAIL] menu.html absent du cache !");
            });
          }
        });
      })
  );
});

// ── SYNC ──────────────────────────────────────────────────────────────────────
self.addEventListener("sync", (e) => {
});

self.addEventListener("periodicsync", (e) => {
  if (e.tag === "update-cache") {
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
