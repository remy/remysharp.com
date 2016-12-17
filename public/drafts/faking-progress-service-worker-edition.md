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
    const data = JSON.parse(event.data);
    if (data.message === LOADING) {
      document.documentElement.className = 'loading';
    }

    if (data.message === LOADED) {
      document.documentElement.className = '';
    }

    if (data.message === FAILED) {
      document.documentElement.classList.add('fail');
    }
  });
}
```

## The service worker

I'm using a service worker to listen for `navigation` fetch requests. You could add offline support, but I'm not doing that for this particular tuturial.

```js
// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // emit event to say we're loading
    event.respondWith(fetchAndEmit(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});

function fetchAndEmit(request) {
  // ...
}
```

## Notes

Now that we've got a dumb version working, what about something a little more intelligent. Perhaps using Service Workers to handle the requests, and to emit events into the main window to notify of loading activity and equally, and importantly, notify of failed or cancelled loading.

It would even be possible to emit the loading event across _all_ the tabs on the origin (aka the domain) if you so wanted (though I think this might be confusing).

- Currently there's no support in browsers to read the `event.client` from the `fetch` event when `mode === 'navigate'`. This means we can't reach back to the `window` that we know for sure triggered the navigation, though I understand this is due to change once implementations catch up.


