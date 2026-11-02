
/*
 * AntarDesa PWA Service Worker
 * Cache hanya aset statis yang ditentukan.
 * Tidak menyimpan HTML, akun, pesanan, atau respons API.
 */

const CACHE_NAME = 'antardesa-static-v2';

const STATIC_ASSETS = [
  './style.css',
  './ui-components.css',
  './ui-messages.js',
  './app.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(
          keys
            .filter(function(key) {
              return key.startsWith('antardesa-static-') &&
                     key !== CACHE_NAME;
            })
            .map(function(key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function(event) {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  if (
    request.mode === 'navigate' ||
    request.destination === 'document'
  ) {
    return;
  }

  const allowed = STATIC_ASSETS.some(function(asset) {
    return new URL(asset, self.location.href).href === url.href;
  });

  if (!allowed) return;

  event.respondWith(
    fetch(request)
      .then(function(response) {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(request, copy);
            });
        }

        return response;
      })
      .catch(function() {
        return caches.match(request);
      })
  );
});
