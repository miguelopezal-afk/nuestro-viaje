const CACHE = 'nuestro-viaje-v34';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/portada-familia.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/foto-londres.jpg',
  './assets/foto-disney.jpg',
  './assets/foto-praga.jpg',
  './assets/foto-paris.jpg',
  './assets/foto-madrid.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // 'reload' salta la cache HTTP del navegador para guardar siempre la version mas nueva.
      .then((cache) => cache.addAll(CORE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(new URL(request.url).pathname);

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      // Imagenes: primero la copia guardada (no cambian seguido).
      if (isImage) {
        const cached = await cache.match(request);
        if (cached) return cached;
      }

      // Todo lo demas: primero internet, y si no hay senal, la copia guardada.
      try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      } catch (err) {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') return cache.match('./index.html');
        throw err;
      }
    })
  );
});
