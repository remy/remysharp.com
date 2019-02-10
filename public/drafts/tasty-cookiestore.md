# Tasty CookieStore

Firstly, I apologise for the awful post title. Still - my excitement about this browser API is disproportionate to how utterly uncool it really is; the cookie browser API got a serious upgrade.

Fuuuq-king-finally. Amirite?

<!--more-->

## That bad smell

I've been complaining about the current `document.cookie` API for quite literally a decade. 10 years! That's some sign of how bad it is.

There's 40 billion packages published on npm, and just shy of 2% of those* are dedicated to setting and parsing cookies - it's _that_ bad.

<small>Figures may be exaggerated, or possibly made up.</small>

When the Web Storage API started to land in browsers, I'd refer to them as Cookies on Steroids.

A few lowlights:

- "Session" cookies leak across sessions
- Non-session cookies require returning to the 70s via time machine to recall the exact date format to make them work
- Deleting a cookie doesn't delete at all, just sets it to really old - has grandpa been deleted? Who knows.

In fact, here's a slide straight out of my "Browsers with Wings" talk from 2010.

![Fuck cookies](/images/f-cookies.jpg)

Yes. I ~~am~~ was upset about cookies.

Web Storage took a bit of a bashing too due to it's synchronous way of doing things. If you happened to try to store an entire house worth of data in localStorage, your browser would jump out and beat you on the head.

And so, apparently, IndexedDB would save us. If anyone could actually understand how it worked*.

<small>*Of course the fabulous Jaffa The Cake-Archibald did just that with [idb-keyval](https://github.com/jakearchibald/idb-keyval) which just spoils all the fun of moaning about IDB…</small>

Anyway, all that's changing because there's a new API in store…

## The new CookieStore

Oh yes, a new store that not _only_ buys and sells your cookies, your cookies come with all kinds of extra sprinklings, BUT ALSO the store tells you when new cookies are hot off the cookie pressing machine!

![I am excited](/images/excited.gif)

You: *Enough with the crap puns, show me code.*

### Getting a cookie

I was going to include how to get a cookie using the current API  for comparison - but I decided I didn't hate myself enough, so let's look at getting a cookie.

As a note - all the cookie store methods return promises, so it's async by default (which means no locking up the browser during any deserialisation).

```js
const token = await cookeStore.get('token');
// response:
{
  "domain": null,
  "expires": 1549643944000,
  "name": "token",
  "path": "/",
  "sameSite": "unrestricted",
  "secure": false,
  "value": "eyJhbGciOiJIUzI1NiIsIn…"
}
```

That's it.

## Can I use?

Well… it's (at time of writing) so freakingly fresh out of the API oven that not even [caniuse.com has it listed as a thing](https://caniuse.com/#search=cookiestore), but apparently web developers are giving [positive signals](https://www.chromestatus.com/feature/5658847691669504) (though positive signals about the API or cookies in general is unclear).

Certainly it's available in Chrome 69 and upwards (from chromestatus.com), and I've written a handy polyfill for you. 

The (massive) downside of the polyfill is that it doesn't support events properly (only fires when you modify a cookie through the polyfill), and it doesn't include all the juicy data about the cookie, like the expiry, path and so on. But if you want to set and get, then this will get you started.

If you want to read more about this API, there's also an [excellent explainer document](https://wicg.github.io/cookie-store/explainer.html) which, perhaps, could have saved you from reading my ramblings.