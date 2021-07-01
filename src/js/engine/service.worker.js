/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v1';
const cacheName = `ahj-${version}`;
const files = ['./', './index.html', './main.js', './main.css'];

async function removeOldCache(retain) {
  const keys = await caches.keys();
  return Promise.all(keys.filter((key) => !retain.includes(key)).map((key) => caches.delete(key)));
}

self.addEventListener('install', async (event) => {
  console.log('SW Installed');
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
    await self.skipWaiting();
  });
});

self.addEventListener('activate', (event) => {
  console.log('SW activated');
  event.waitUntil(async () => {
    await removeOldCache([cacheName]);
    await self.clients.claim();
  });
});

self.addEventListener('fetch', (event) => {
  console.log('SW fetchin:', event.request.url);

  event.respondWith(async () => {
    const cache = await caches.open(cacheName);

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(event.request);
  });
});
