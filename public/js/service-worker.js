'use strict';
/* global caches, self, Request, Response */
const version = 'v1::';
const staticCacheName = version + 'static';
const pagesCacheName = version + 'pages';
const imagesCacheName = version + 'images';

function updateStaticCache() {
  return caches.open(staticCacheName)
    .then(cache => {
      // these items won't block the installation of the Service Worker
      cache.addAll([
        '/skins/default/images/bandstand.jpg',
        '/skins/default/images/scaffold.jpg',
        '/skins/default/images/tokyo.jpg',
        '/skins/default/images/stage.jpg',
        '/skins/default/images/florence.jpg',
        '/skins/default/images/curved.jpg',
        '/images/html5_cover_small.gif',
        '/journal/',
        '/links/',
        '/articles/',
        '/notes/',
        '/about/',
        '/contact/'
      ]);
      // These items must be cached for the Service Worker to complete installation
      return cache.addAll([
        '/includes/javascript/global.js',
        '/includes/css/print.css',
        '/skins/default/global.css',
        '/skins/default/images/logo.png',
        '/skins/default/images/logox2.png',
        '/skins/default/images/clone.jpg',
        '/',
        '/offline'
      ]);
    });
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then(cache => cache.put(request, response));
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys().then(keys => {
    return Promise.all(
      keys.filter(
        key => key.indexOf(version) !== 0
      ).map(
        key => caches.delete(key)
      )
    );
  });
}

self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache().then( () => self.skipWaiting() )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener('message', event => {
  if (event.data.command === 'trimCaches') {
    trimCache(pagesCacheName, 35);
    trimCache(imagesCacheName, 20);
  }
});

self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests to my own server
  if (url.origin !== location.origin) {
    return;
  }

  // Ignore requests to some directories
  if (request.url.indexOf('/mint') !== -1 || request.url.indexOf('/cms') !== -1) {
    return;
  }

  // For non-GET requests, try the network first, fall back to the offline page
  if (request.method !== 'GET') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')) );
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
    request = new Request(url, {
      method: 'GET',
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect
    });
    event.respondWith(
      fetch(request).then(response => {
        // NETWORK
        // Stash a copy of this page in the pages cache
        let copy = response.clone();
        stashInCache(pagesCacheName, request, copy);
        return response;
      }).catch(() => {
        // CACHE or FALLBACK
        return caches.match(request).then(response => response || caches.match('/offline'));
      })
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  let res = caches.match(request).then(response => {
    // CACHE
    return response || fetch(request).then(response => {
      // NETWORK
      // If the request is for an image, stash a copy of this image in the images cache
      if (request.headers.get('Accept').indexOf('image') !== -1) {
          let copy = response.clone();
          stashInCache(imagesCacheName, request, copy);
      }
      return response;
    }).catch( () => {
      // OFFLINE
      // If the request is for an image, show an offline placeholder
      if (request.headers.get('Accept').indexOf('image') !== -1) {
        return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
        }
      });
    });
    event.respondWith(res);
  });