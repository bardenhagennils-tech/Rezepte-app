/* Service Worker: macht die App vollständig offline-fähig.
   Rezeptdaten leben im localStorage; der SW cached nur die App-Dateien. */
const CACHE = 'rezepte-app-v11-aimulti2';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // GitHub-API-Aufrufe gehen direkt ins Netz (Offline-Fallback: localStorage)
  if (url.origin !== location.origin) return;
  // App-Shell: Cache zuerst, dann Netz, Antwort ebenfalls cachen
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match('./index.html')))
  );
});
