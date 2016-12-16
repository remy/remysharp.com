# Faking progress (service worker edition)

Yesterday I showed you how to

## Method 2: intelligent service worker driven

Now that we've got a dumb version working, what about something a little more intelligent. Perhaps using Service Workers to handle the requests, and to emit events into the main window to notify of loading activity and equally, and importantly, notify of failed or cancelled loading.

It would even be possible to emit the loading event across _all_ the tabs on the origin (aka the domain) if you so wanted (though I think this might be confusing).

## Notes

- Currently there's no support in browsers to read the `event.client` from the `fetch` event when `mode === 'navigate'`. This means we can't reach back to the `window` that we know for sure triggered the navigation, though I understand this is due to change once implementations catch up.


