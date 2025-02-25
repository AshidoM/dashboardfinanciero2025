const CACHE_NAME = "fincontrol-v3";
const ASSETS_CACHE = "assets-v2";

const CACHED_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/index.css",
  "/assets/index.js",
  "https://odolofjixzwxfntaveii.supabase.co/storage/v1/object/public/imagenes%20de%20equipo/LOGO/LogoICONO.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS)),
      caches.open(ASSETS_CACHE),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle static assets
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;

        return fetch(request).then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(ASSETS_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      }),
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) return response;
          throw new Error("Navigation fetch failed");
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  // Network-first strategy for API requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      })
      .catch(() => caches.match(request)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== ASSETS_CACHE) {
              return caches.delete(cacheName);
            }
          }),
        );
      }),
      // Clean old assets
      caches.open(ASSETS_CACHE).then((cache) => {
        return cache.keys().then((keys) => {
          return Promise.all(
            keys.map((request) => {
              return cache.delete(request);
            }),
          );
        });
      }),
    ]),
  );
});
