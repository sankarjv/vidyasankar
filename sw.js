const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
];

self.addEventListener('fetch', event => {

const url = new URL(event.request.url);

if (!HOSTNAME_WHITELIST.includes(url.hostname)) {
    return;
}

const cached = caches.match(event.request);
const fixedUrl = getFixedUrl(event.request);
const fetched = fetch(fixedUrl, { cache: 'no-store' });
const fetchedCopy = fetched.then(r => r.clone());

const delayCacheResponse =
    new Promise(resolve =>
        setTimeout(resolve, 500, cached)
    );

event.respondWith(
    Promise.race([fetched.catch(()=>cached), delayCacheResponse])
        .then(resp => resp || fetched)
        .catch(() =>
            new Response("Offline", { status: 503 })
        )
);

event.waitUntil(
    Promise.all([fetchedCopy, caches.open("pwa-cache")])
        .then(([resp, cache]) =>
            resp.ok && cache.put(event.request, resp)
        )
);
});
