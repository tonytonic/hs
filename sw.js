/**
 * Service Worker — Simulateur Heures Sup & RPG Fox
 * Version : 8.1.0 — Cloudflare Pages (Google Play compliance : disclaimers non-gouv + sources)
 */

const CACHE_NAME = "heuressup-cache-v8.5.0"; // Cache First + skip cross-origin (fix CORS fonts)
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
  "./fox/js/scenarios-fox-data.js", "./fox/js/scenarios-fox.js",
  "./fox/js/scenarios-ai.js",
  "./fox/js/legal-engine.js", "./fox/js/module-reader.js",
  "./fox/js/module3.js", "./fox/js/data-bridge.js", "./fox/js/storage.js",
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
  "./module4/assets/favicon.svg", "./module4/assets/icon-192.svg",
  "./module4/assets/logo-dte.svg",
  // === Module 5 — Temps partiel (Mizuki) ===
  "./module5/index.html",
  "./module5/css/main.css",
  "./module5/assets/mizuki.svg",
  "./module5/js/app.js",
  "./module5/js/core/calc-engine.js",
  "./module5/js/data/ccn-partiel.js",
  "./module5/js/features/glossaire.js",
  "./module5/js/features/mizuki.js",
  "./module5/js/features/pdf-report.js",
  "./module5/js/features/saisie.js",
  "./module5/js/features/wellbeing.js",
  // === Module 6 — Cadres (Zenji) ===
  "./module6/index.html",
  "./module6/css/main.css",
  "./module6/images/Cadre.png",
  "./module6/js/app.js",
  "./module6/js/core/bio-engine.js",
  "./module6/js/core/calc-engine.js",
  "./module6/js/core/safe-boot.js",
  "./module6/js/core/storage.js",
  "./module6/js/data/ccn-adapter.js",
  "./module6/js/data/glossaire-cadres.js",
  "./module6/js/features/calendar.js",
  "./module6/js/features/charts.js",
  "./module6/js/features/coach.js",
  "./module6/js/features/entretien-glossaire.js",
  "./module6/js/features/import-export.js",
  "./module6/js/features/nullite-checker.js",
  "./module6/js/features/pdf-report.js",
  "./module6/js/features/rupture-calculateur.js",
  "./module6/js/features/simulateur-nullite.js",
  "./module6/js/features/validite-heures-cd.js",
  "./module6/js/features/zenji-popup.js",
  "./module6/js/features/zenji.js",
  "./module6/js/views/view-cadre-dirigeant.js",
  "./module6/js/views/view-forfait-heures.js",
  "./module6/js/views/view-forfait-jours.js",
  "./module6/ccn/coefficients-grilles.js",
  "./module6/ccn/conventions-cadres.js",
  // Images
  "./images/Mizuki.PNG",
  "./images/renard-annuel.png.jpg", "./images/renard-mensuel.png.jpg",
  "./images/renard-central.png.jpg",
  "./images/fox-bg.PNG",
  "./images/fox-bg-2.jpg",
  "./images/fox-bg-3.jpg",
  "./images/fox-bg-4.jpg",
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
  "./images/foxpredit.jpg",
  // === Lumina — Grilles Salariales CCN 2026 ===
  "./GrillePaye/index.html",
  "./GrillePaye/ccn-data.json"
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
            const body = await res.arrayBuffer();
            const headers = new Headers();
            res.headers.forEach((val, key) => {
              if (!['cf-cache-status','cf-ray','age','x-cache','nel','report-to'].includes(key.toLowerCase())) {
                headers.append(key, val);
              }
            });
            headers.set('content-length', body.byteLength.toString());
            headers.delete('content-encoding');
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

// ── FETCH — CACHE FIRST (stale-while-revalidate) ──────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Ne PAS intercepter les requêtes cross-origin (Google Fonts, CDN…)
  // Sinon la réécriture des headers casse le CORS (erreur if-modified-since).
  const reqUrl = new URL(event.request.url);
  if (reqUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Cache disponible → retourner immédiatement + rafraîchir en arrière-plan
      if (cachedResponse) {
        fetch(event.request).then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const body = await networkResponse.arrayBuffer();
            const headers = new Headers();
            networkResponse.headers.forEach((val, key) => {
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
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cleanResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Pas en cache → réseau
      return fetch(event.request).then(async (networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const body = await networkResponse.arrayBuffer();
          const headers = new Headers();
          networkResponse.headers.forEach((val, key) => {
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
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cleanResponse));
          return new Response(body, { status: networkResponse.status, statusText: networkResponse.statusText, headers: networkResponse.headers });
        }
        return networkResponse;
      }).catch(() => {
        // Offline + pas en cache → fallback HTML
        const isNav = event.request.mode === "navigate" ||
          event.request.headers.get("accept")?.includes("text/html");
        if (isNav) return caches.match(OFFLINE_URL);
        return new Response('', { status: 503 });
      });
    })
  );
});

// ── SYNC ──────────────────────────────────────────────────────────────────────
self.addEventListener("sync", (e) => {});

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
