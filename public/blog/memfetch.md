# memfetch

The web API `fetch` is superbly simple (compared to its predecessor: `XMLHttpRequest`) but during development there's always a few concerns I have when making fetch requests: hitting 3rd party request limits, latency (since I want dev to be rapid) and the potential of going offline (aka: developing on trains).

Since the browser is a beautiful thing, I'm able to wrap the `fetch` API with my own custom logic and circumvent those concerns, so I introduce to you: [memfetch](https://github.com/remy/memfetch)

<!--more-->

## What it does

Memfetch will, unobtrusively, wrap the fetch API, and cache _any_ request and response so that if you have the **exact same** request again, it'll be served from local browser cache.

Importantly, there's no change to my code to make use of the cached version of the requests. This aspect is an important feature to me, because I see memfetch as a development tool that I should be able to remove without having to refactor code before production.

## How to use it

Again, no changes to my JavaScript fetch requests, only to include the memfetch library before my code runs:

```html
<script src="https://unpkg.com/memfetch"></script>
```

Now all fetch requests will be cached, and subsequent requests will be served directly from the local browser's storage. Importantly, the requests are fingerprinted using the url and the init options passed to the `fetch`. This means if there's an additional option passed to your request (such as adding `mode: 'cors'`), memfetch will treat this as distinct.

Again, _all_ fetch requests are cached, which includes `POST` requests. I suspect in future I'll have some kind of `include`/`exclude` configuration if there's demand for it.

To clear the local cache, there's a `seed` property on the `fetch` method, if it's set to a value that's different to the current value (i.e. changed from `undefined` to `a` or from `a` to `b`), the local cache will be completely erased:

## Under the hood

Originally this library would wrap the `fetch` API and return a `new Proxy` that would allow memfetch capture that the code used the `.json` method, or the `.blob` method - but it turned out I could simplify the code and drop the use of proxies (as cool as they are).

The original `fetch` method is stored in an internal method and replaced with a wrapper.

When you code makes a request, the following are stored in IndexedDB (thanks to [Jake Archibald's micro idb-keyval library](https://npmjs.com/idb-keyval)):

- url
- fetch options
- response headers
- status
- statusText
- blob

Using these values, memfetch constructs a `new Response` and returns _that_ instead of the original response.

Subsequent requests check if there's a cached value, and using the captured data points (above), it resolved with another `new Response` - this way the authored code can call `.blob` or `.json` or any other method implemented by the Response API (which meant memfetch didn't need to use a proxy object).
