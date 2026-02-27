const CACHE_NAME = “compteur-heures-v1.4.8”;

const FILES_TO_CACHE = [
“./index.html”,
“./menu.html”,
“./manifest.json”,
“./images/renard-annuel.png.jpg”,
“./images/renard-mensuel.png.jpg”,
“./images/renard-central.png.jpg”,
“./icon-192.png”,
“./icon-512.png”,
“./apple-touch-icon.png”,
“./heures/index.html”,
“./paye/index.html”,
“./fox/index.html”,
“./fox/css/style.css”,
“./fox/js/safety.js”,
“./fox/js/storage.js”,
“./fox/js/config.js”,
“./fox/js/assets-config.js”,
“./fox/js/modes.js”,
“./fox/js/xp-system.js”,
“./fox/js/leagues.js”,
“./fox/js/badges.js”,
“./fox/js/milestones.js”,
“./fox/js/rpg-system.js”,
“./fox/js/module3.js”,
“./fox/js/quests.js”,
“./fox/js/combat.js”,
“./fox/js/skills.js”,
“./fox/js/inventory.js”,
“./fox/js/module-loader.js”,
“./fox/js/scenarios-fox-data.js”,
“./fox/js/scenarios-fox.js”,
“./fox/js/scenarios-ai.js”,
“./fox/js/legal-engine.js”,
“./fox/js/data-bridge.js”,
“./fox/js/module-reader.js”,
“./fox/js/snapshot-system.js”,
“./fox/js/export-rtf.js”,
“./fox/js/ai-integration.js”,
“./fox/js/main-rpg.js”
];

self.addEventListener(“install”, (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then(async (cache) => {
for (const file of FILES_TO_CACHE) {
try {
await cache.add(file);
} catch (e) {
console.warn(“⚠️ Cache fail:”, file);
}
}
})
);
self.skipWaiting();
});

self.addEventListener(“activate”, (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(
keys
.filter((k) => k !== CACHE_NAME)
.map((k) => caches.delete(k))
)
)
);
self.clients.claim();
});

self.addEventListener(“fetch”, (event) => {
event.respondWith(
caches.match(event.request).then((cached) => {
return cached || fetch(event.request).catch(() => caches.match(”./menu.html”));
})
);
});

/* =======================
NOTIFICATIONS GÉOLOC
Reçoit un message depuis l’app et affiche
une notification système native.
======================= */
self.addEventListener(“message”, (event) => {
if (!event.data || event.data.type !== “GEO_NOTIFY”) return;

const { action, distance } = event.data;

const isArrival = action === “in”;
const title     = isArrival ? “📍 Tu arrives au travail” : “🏁 Tu quittes le travail”;
const body      = isArrival
? `Zone détectée à ${Math.round(distance)} m — Pointer l'arrivée ?`
: `Tu t'éloignes (${Math.round(distance)} m) — Pointer la sortie ?`;

self.registration.showNotification(title, {
body,
icon:    “./icon-192.png”,
badge:   “./icon-192.png”,
tag:     “geo-punch”,        // remplace la notif précédente si non lue
renotify: false,
vibrate: [100, 50, 100],
actions: [
{ action: “punch”, title: isArrival ? “▶ Pointer” : “⏹ Pointer” },
{ action: “dismiss”, title: “Plus tard” }
],
data: { action }
});
});

/* =======================
CLIC SUR LA NOTIFICATION
======================= */
self.addEventListener(“notificationclick”, (event) => {
event.notification.close();

if (event.action === “dismiss”) return;

// Ouvre ou focus l’app puis envoie l’ordre de pointer
event.waitUntil(
clients.matchAll({ type: “window”, includeUncontrolled: true }).then((clientList) => {
const action = event.notification.data?.action || “in”;

```
  if (clientList.length > 0) {
    // App déjà ouverte → envoyer le message de pointage
    clientList[0].postMessage({ type: "DO_PUNCH", action });
    return clientList[0].focus();
  }

  // App fermée → ouvrir puis pointer (Android uniquement)
  return clients.openWindow("./paye/index.html").then((w) => {
    if (w) w.postMessage({ type: "DO_PUNCH", action });
  });
})
```

);
});