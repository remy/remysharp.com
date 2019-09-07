---
title: 'Blog service workers and the chicken and the egg'
tags:
  - code
draft: true
---

# Blog service workers and the chicken and the egg

I posted a blog the other week explaining the process I had in place for showing recently viewed posts whilst the visitor was offline. Being a clever clogs I also included a link to the [offline](/offline) page to show that the post they were reading was also already in the "recently viewed".

Except there was a small catch. First time visitors, though had installed the service worker, apparently had not visited any pages yet.

<!--more-->

## Wait, what?

There's a number of use cases that must be met when designing a service worker for your site. In particular the user who goes from no service worker to having it installed.

When my service worker installs, I add some "sensible defaults" to the browser's cache:

- The index page
- My CSS
- Four core images

The rest is cached on demand. However, the page that triggered the installation, likely to be a blog post, won't be in the cache because the first request for that resource was performed through the browser's native network handling and not through my service worker.

So, how do I work around this?

## Reading client URLs

What needs to happen upon installation of the service worker, is that the service worker's client URL - that is, the main browser session doing the installation - should be added to the list of initially cached assets.

Though it doesn't come up in a lot of tutorials I've seen, you can access this using the `clients` API inside of the service worker.

My (simplified) install event handler in the service worker now looks like this:

```js
self.addEventListener('install', event => {
  event.waitUntil(initialiseCache().then(() => self.skipWaiting()));
});

async function initialiseCache() {
  // I'd expect this array to have a single entry,
  // but in case there's more than one window, we'll
  // capture them all
  const posts = [];

  // get all clients using this service worker
  const allClients = await clients.matchAll({
    includeUncontrolled: true
  });

  // then collect their URL - equivalents to window.location.toString()
  for (const client of allClients) {
    posts.push(client.url);
  }

  return caches.open('v1/cache').then(cache => {
    return cache.addAll(
      // important bit: add the posts to cache to the core assets
      posts.concat([
        '/',
        '/offline',
        '/css/styles.css',
        '/images/important-image1.jpg',
        '/images/important-image2-etc.svg'
      ])
    );
  });
}
```
