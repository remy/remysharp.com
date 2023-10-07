/* eslint-env serviceworker */

const prefix = 'v2.1';
const commit = '%%FILE_HASH%%';
const version = prefix + '/' + commit;

// depends on SW version change
const pagesCache = prefix + '/content/pages';
const postsCache = prefix + '/content/posts';

// updated on commit - since they're cache first
const jsCache = version + '/static/js';
const cssCache = version + '/static/css';
const imagesCache = version + '/static/images';

const cacheByType = {
  css: cssCache,
  javascript: jsCache,
  image: imagesCache,
};

function cacheForRequest(req, res) {
  const url = req.url;
  if (/\/(\d{4})\/(\d{2})\/(\d{2})\//.test(url)) {
    return postsCache;
  }

  const contentType = res.headers.get('content-type');

  const type = ['image', 'css', 'javascript'].find((_) =>
    contentType.includes(_)
  );

  if (type) {
    return cacheByType[type];
  }

  return pagesCache;
}

async function updateStaticCache() {
  const allClients = await clients.matchAll({
    includeUncontrolled: true,
  });

  const posts = [];

  // Let's see if we already have a chat window open:
  for (const client of allClients) {
    posts.push(client.url);
    console.log('adding %s', client.url);
  }

  return Promise.all([
    posts.length
      ? caches.open(postsCache).then((cache) => cache.addAll(posts))
      : null,
    caches
      .open(pagesCache)
      .then((cache) => cache.addAll(['/', '/offline', '/manifest.json'])),
    caches
      .open(imagesCache)
      .then((cache) =>
        cache.addAll([
          '/images/avatar.jpg',
          '/images/avatar-2023.jpg',
          '/images/background.jpg',
          '/images/search.svg',
        ])
      ),
  ]);
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then((cache) => cache.put(request, response));
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys().then((keys) => {
    return Promise.all(
      keys
        .filter((key) => {
          if (key.includes('/static/')) {
            return !key.startsWith(version);
          }

          return !key.startsWith(prefix);
        })
        .map((key) => {
          console.log('deleting %s', key);
          return caches.delete(key);
        })
    );
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
  updateStaticCache();
});

self.addEventListener('fetch', (event) => {
  let request = event.request;
  let url = new URL(request.url);

  const pass =
    url.origin !== location.origin ||
    url.pathname.startsWith('_logs') ||
    url.pathname.startsWith('feed.xml');

  // pass through any requests outside this origin
  if (pass) {
    return event.respondWith(fetch(request));
  }

  // non GET requests hit network first, then show offline if appropriate
  if (request.method !== 'GET') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')));
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request) // network first method
        .then((response) => {
          if (response.status === 200) {
            // NETWORK
            // Stash a copy of this page in the pages cache
            const cacheName = cacheForRequest(request, response);
            stashInCache(cacheName, request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // CACHE or FALLBACK
          return caches
            .match(request)
            .then((response) => response || caches.match('/offline'));
        })
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(assetRequest(request));
});

function assetRequest(request) {
  let url = new URL(request.url);
  url = url.origin + url.pathname; // strip the query string

  const isText = request.headers.get('Accept').startsWith('text');

  return caches.match(url).then((response) => {
    // CACHE
    return (
      response ||
      fetch(isText ? `${url}?${version}` : request)
        .then((response) => {
          // NETWORK
          // If the request is for an image, stash a copy of this image in the images cache
          const ct = response.headers.get('content-type');

          const type = ['image', 'css', 'javascript'].find((_) =>
            ct.includes(_)
          );

          if (type) {
            stashInCache(cacheByType[type], url, response.clone());
          }

          return response;
        })
        .catch(() => {
          // OFFLINE - If the request is for an image, show an offline placeholder
          if (request.headers.get('Accept').startsWith('image/')) {
            return new Response(
              '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        })
    );
  });
}
