/* =========================================
   ANTARDESA SERVICE WORKER v0.3.0-RC2
   Strategi: Network-First untuk Dokumen HTML
   ========================================= */

const CACHE_NAME = "antardesa-cache-v0.3.0-rc2";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./ui-components.css",
  "./ui-messages.js",
  "./manifest.json"
];

/* 1. Tahap Install: Simpan aset dasar & paksa aktivasi instan */
self.addEventListener("install", function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

/* 2. Tahap Activate: Bersihkan cache versi lama secara otomatis */
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Menghapus cache lama:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* 3. Tahap Fetch: Menerapkan Network-First untuk Halaman Utama/HTML */
self.addEventListener("fetch", function(event) {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  /* Untuk halaman navigasi/HTML: Ambil dari Jaringan dulu. Jika offline/gagal, ambil dari Cache. */
  if (request.mode === "navigate" || (request.headers.get("accept") && request.headers.get("accept").includes("text/html"))) {
    event.respondWith(
      fetch(request)
        .then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(function() {
          /* Fallback jika tidak ada jaringan sama sekali */
          return caches.match(request).then(function(cachedResponse) {
            return cachedResponse || caches.match("./index.html");
          });
        })
    );
    return;
  }

  /* Untuk aset statis pendukung (CSS, JS, Gambar): Ambil dari Cache dulu, jika tidak ada ambil dari Jaringan */
  event.respondWith(
    caches.match(request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request);
    })
  );
});
