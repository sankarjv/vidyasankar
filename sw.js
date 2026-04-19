const CACHE_NAME = "cache-v1";

const PRECACHE = [
"/index.html",
"/panchd.htm",
"/panchf.htm",
"/planetd.htm",
"/planetf.htm",
"/match1.htm",
"/lagna.htm",
"/mahapata.htm",
"/kalsarpa.htm",
"/ugadi.htm",
"/moudhya.htm",
"/kandaya.htm",
"/grahana.htm",
"/pushkara.htm",
"/about.htm",
"/index.js",
"/panchd.js",
"/panchf.js",
"/planetd.js",
"/planetf.js",
"/match1.js",
"/lagna.js",
"/mahapata.js",
"/kalsarpa.js",
"/ugadi.js",
"/moudhya.js",
"/kandaya.js",
"/grahana.js",
"/pushkara.js",
"/about.js",
"/pa.js",
"/su.js",
"/sw.js",
"/manifest.json",
"/favicon.ico",
"/logo.png",
"/big.png"
];


// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Skip caching when running from file:// protocol
        if (location.protocol === 'file:') {
          console.debug('Service Worker: Skipping cache (file:// protocol)');
          return Promise.resolve();
        }
        return cache.addAll(PRECACHE);
      })
      .then(() => self.skipWaiting())
  );
});


// ACTIVATE
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  if (self.registration.navigationPreload) {
    self.registration.navigationPreload.enable();
  }

  self.clients.claim();
});


// FETCH
self.addEventListener("fetch", event => {

  const req = event.request;

  if (req.method !== "GET") return;

  const accept = req.headers.get("accept") || "";

  // HTML → Network First
  if (accept.includes("text/html")) {
    event.respondWith(networkFirst(event));
    return;
  }

  // JS/CSS/Images → Stale While Revalidate
  event.respondWith(staleWhileRevalidate(req));

});


// NETWORK FIRST (for pages)
async function networkFirst(event) {

  const req = event.request;

  try {

    const preload = await event.preloadResponse;
    if (preload) return preload;

    const net = await fetch(req);

    const cache = await caches.open(CACHE_NAME);
    cache.put(req, net.clone());

    return net;

  } catch {

    const cached = await caches.match(req);

    return cached || caches.match("/offline.html");

  }

}


// STALE WHILE REVALIDATE
async function staleWhileRevalidate(req) {

  const cache = await caches.open(CACHE_NAME);

  const cached = await cache.match(req);

  const networkFetch = fetch(req).then(res => {
    cache.put(req, res.clone());
    return res;
  }).catch(() => {});

  return cached || networkFetch;

}
