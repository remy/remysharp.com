'use strict';
/* global caches, self, Request, Response */
importScripts('/js/hashes.js');

console.log('SW: hashes', hashes);
const version = 'v1/';
const jsCache = `${version}static/js/${hashes.js}`;
const cssCache = `${version}static/css/${hashes.css}`;
const pagesCache = version + 'pages';
const imagesCache = version + 'images';

const cacheByType = {
  css: cssCache,
  javascript: jsCache,
  image: imagesCache,
};

function updateStaticCache() {
  return caches.open(pagesCache).then(cache => {
    // these items won't block the installation of the Service Worker
    // cache.addAll([]);
    // These items must be cached for the Service Worker to complete installation
    return cache.addAll(['/', '/offline']);
  });
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then(cache => cache.put(request, response));
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys().then(keys => {
    return Promise.all(
      keys
        .filter(key => {
          if (key.startsWith(version + '/static/js/')) {
            return key !== jsCache;
          }

          if (key.startsWith(version + '/static/css/')) {
            return key !== cssCache;
          }

          return !key.startsWith(version);
        })
        .map(key => {
          console.log('deleting old cache %s', key);

          return caches.delete(key);
        })
    );
  });
}

self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests to my own server
  if (url.origin !== location.origin) {
    return event.respondWith(fetch(request));
  }

  // Ignore requests to some directories
  if (
    request.url.indexOf('/mint') !== -1 ||
    request.url.indexOf('/cms') !== -1
  ) {
    return;
  }

  // For non-GET requests, try the network first, fall back to the offline page
  if (request.method !== 'GET') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')));
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').includes('text/html')) {
    // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
    request = new Request(request.url, {
      method: 'GET',
      headers: request.headers,
      mode: request.mode == 'navigate' ? 'cors' : request.mode,
      credentials: request.credentials,
      redirect: request.redirect,
    });

    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            // NETWORK
            // Stash a copy of this page in the pages cache
            let copy = response.clone();
            stashInCache(pagesCache, request, copy);
          }
          return response;
        })
        .catch(() => {
          // CACHE or FALLBACK
          return caches
            .match(request)
            .then(response => response || caches.match('/offline'));
        })
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  let res = caches.match(request).then(response => {
    // CACHE
    // console.log('+asset %s %s', request.url, response ? 'HIT' : 'MISS');

    return (
      response ||
      fetch(request)
        .then(response => {
          // NETWORK
          // If the request is for an image, stash a copy of this image in the images cache
          let accepts = request.headers.get('Accept');
          const ct = response.headers.get('content-type');

          const type = ['image', 'css', 'javascript'].find(_ => ct.includes(_));

          if (type) {
            let copy = response.clone();
            stashInCache(cacheByType[type], request, copy);
          }

          return response;
        })
        .catch(() => {
          // OFFLINE
          // If the request is for an image, show an offline placeholder
          if (request.headers.get('Accept').indexOf('image') !== -1) {
            return new Response(
              '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        })
    );
  });
  event.respondWith(res);
});
