# Faking progress (service worker edition)

Yesterday I showed you how to faking loading process using a small amount of JavaScript and CSS. As a reminder, this is a UI effect that shows a request is loading. However, instead of using the naïve method, this post will talk about how to use Service Workers for the task instead.

<!--more-->

<small>Note: Sometimes I'll refer to Service Worker as SW throughout this post.</small>

## The general approach

This method will use a service worker to intercept every network request that was intended as navigation, and emit an event into the client (the active tab) that's used to show the loading animation.

When the request completes (or fails) the service worker will emit another event to notify of the status.

I quite like this approach because it uses service worker in a different way (to the typical SW for offline support). It could also be used for <abb title="Progress Web Apps">PWAs</abb> that perhaps load in a `standalone` mode where the URL bar is hidden. This would then feedback to the user that _something_ is loading.

I will say up front that there are some limitations with this approach and I'll discuss them in the post.

## Installing the service worker

The installation of the SW takes the "usual" approach (whereby we check for support). However, in addition to registering, we also listen for `message` events on the service worker (which can be emitted via `postMessage`). That event will tell our client what state we're in and what class to show.

The rest of the logic lives inside the service worker (and note that we don't need `app.js` from the simple method in yesterdays post).

```js
if ('serviceWorker' in navigator) {
  const LOADING = 0;
  const LOADED = 1;
  const FAILED = 2;

  navigator.serviceWorker.register('/sw.js');
  navigator.serviceWorker.addEventListener('message', function (event) {
    if (event.data === LOADING) {
      document.documentElement.className = 'loading';
    }

    if (event.data === LOADED) {
      document.documentElement.className = '';
    }

    if (event.data === FAILED) {
      document.documentElement.classList.add('fail');
    }
  });
}
```

## The service worker

I'm using a service worker to listen for `navigation` fetch requests. You could add offline support, but I'm not doing that for this particular tuturial.

The following is the `sw.js` service worker that was registered in the earlier code snippet:

```js
// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // do a fetch, bug also emit the loading state
    event.respondWith(fetchAndEmit(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});

function fetchAndEmit(request) {
  // TODO…
}
```

When the page is loaded and the SW is in control, an asset would have the request [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) set to something like `same-origin` and so on. Except when the page is loading anew, like when the visitor clicks a link or hits refresh.

## Fetch and emit

The crux of the functionality lives inside the `fetchAndEmit` function in the `sw.js` file. The task is to emit an event on either side of the fetch process. When the fetch returns, it can do a number of things: `200 OK` - the request worked, or the fetch can throw or it can fail (I'll dig into this in more detail though).

However, before we can emit anything, we need to know _where_ to emit the events to. This is the window that made the original request, known as the _client_.

**Caveat #1:** Unfortuantly the `navigate` fetch events don't include the `event.clientId` (although all other types do), though there's a [redesign in the works](https://jakearchibald.com/2016/service-worker-meeting-notes/#fetch-event-clients) on this part of the spec, but implementations haven't caught up. This does mean that the code below has to make a _best guess_ as to the client.

```js
// replicated from the "client"
const LOADING = 0;
const LOADED = 1;
const FAILED = 2;

function fetchAndEmit(request) {
  // first get all the `window` objects that use this
  // service worker, then send state messages to it.
  return clients.matchAll({
    type: 'window'
  }).then(clients => {
    // attempt to find the client that initiated the
    // request based on whether it's in focus
    const activeClients = clients.filter(_ => _.focused);

    // note that with a navigate operation, there's two
    // clients, kind of like a double buffer effect, the
    // one that initiated the request, and the one that
    // will swap in once the content is parsed.
    activeClients.forEach(postMessage(LOADING));

    // now fetch the request, but before sending it back
    // in the promise, send the appropriate loading state
    return fetch(request).then(res => {
      // res.status is a weird case that's more likely
      // to throw in the future. It's where the user
      // cancelled the request,
      if (res.status === 0) {
        activeClients.forEach(postMessage(FAILED));
      } else {
        activeClients.forEach(postMessage(LOADED));
      }
      return res;
    }).catch(e => {
      // this could be a network timeout
      activeClients.forEach(postMessage(FAILED));

      // 204: No Content (to prevent page load)
      return new Response(null, { status: 204 });
    });
  });
}

// postMessage returns a function that posts
// to the given client (useful for .forEach)
function postMessage(message) {
  return client => client.postMessage(message);
}
```

## Notes

Now that we've got a dumb version working, what about something a little more intelligent. Perhaps using Service Workers to handle the requests, and to emit events into the main window to notify of loading activity and equally, and importantly, notify of failed or cancelled loading.

It would even be possible to emit the loading event across _all_ the tabs on the origin (aka the domain) if you so wanted (though I think this might be confusing).

- Currently there's no support in browsers to read the `event.client` from the `fetch` event when `mode === 'navigate'`. This means we can't reach back to the `window` that we know for sure triggered the navigation, though I understand this is due to change once implementations catch up.


