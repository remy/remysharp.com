# State of the gap

I remember first hearing about PhoneGap through excitement over Twitter in 2009. The first [jsconf.us](https://jsconf.us) had just run, but I hadn't attended (at the time, the distance and costs was too much). One thing was for certain: PhoneGap, team Nitobe with front man, Brian LeRoux, had cracked something hugely important important: *deploying webapps inside of a native shell with native access*.

<!--more-->

In the same year I coined the [term polyfill](/what-is-a-polyfill):

> A polyfill …, is a piece of code (or *plugin*) that provides the technology that you, the developer, expect the browser to provide *natively*. Flattening the API landscape if you will.

Back in 2010, mobile browser didn't expose many of the sensors to the browser, such as orientation data. In conversations and conference talks, Brian would talk about closing the gap between mobile and desktop (alluding to the meaning of the name). Something to raise the level of API access within mobile devices. Eventually publishing exactly what he meant on the web (which never forgets*):

> PhoneGap is a polyfill, and the ultimate purpose of PhoneGap is **to cease to exist**.
>
> — Brian LeRoux, SPACELORD!1!! at Adobe, 2012.

That bears repeating: [the] **purpose of PhoneGap to cease to exist**.

Now, obviously this is not in Adobe's interest, given their purchase back in 2011, however it's a noble aim. To create software that helps developers to get to where they need to get to whilst we wait for the technology to catch up.

Once that technology bridge exists natively (i.e. via the browser), the "gap" bridge can and should be removed without any (real) impact. This is exactly the way a polyfill works.

---

This post (and talk) is about the current state of that gap some 7 years later, and whether application developers still need to turn to PhoneGap or whether in fact the web is fully capable of delivering a first class experience whilst also solving your user's needs. Did team PhoneGap succeed? Did the web catch up? Did user's needs surpass what's possible?

Though, spoilers: [progressive web apps](https://developers.google.com/web/progressive-web-apps).

## Core plugins

Today, PhoneGap supports a number of [core plugins](http://docs.phonegap.com/plugin-apis/) and I think it's useful to do a quick eye-ball test to see where the web is up to before looking at the web as an independent entity (that's to say: to stop comparing to native).

| API | PhoneGap | Web capable | Web ∞ |
|-|-|-|
| Battery Status | 👍 | 👍 | ❌ |
| Camera | 👍 | 👍 | 👍 |
| Contacts | 👍 | ❌ | ❌ |
| Device Info | 👍 | 👍 | 👍 |
| Device Motion (accelerometer) | 👍 | 👍 | 👍|
| Device Orientation (compass) | 👍 | 👍 |👍|
| Dialogs (notification) | 👍 | 👍 | 👍|
| File | 👍 | 👍 | 👍 |
| File Transfer | 👍 | 👍 | 👍|
| Geolocation | 👍 | 👍 | 👍 |
| Globalization | 👍 | 👍 | 👍|
| Media Capture | 👍 | 👍 |👍|
| Network Information | 👍 | ❓ | ❓ |
| Splash Screen | 👍 | 👍 | 👍 |
| Status Bar | 👍 | 👍 | 👍 |
| Vibration | 👍 | 👍 | ❌ |

Notes: I've removed `InAppBrowser` and `Whitelist` as they're PhoneGap specific to allow PhoneGap to run.

## Ecosystem

When looking at a PhoneGap plugin (for example), there's a strong focus around support across platforms. PhoneGap has core support for XXX platforms (iOS, Android, …) but supports a growing total of XXX device types.

The web is slightly different, in that if the browser is fully implemented, then the support across devices is the same, in that if Chrome is installed on an Android device, the API access and support is the same on a Blackberry device.

The web is a long game. It will always make progress. Free access to all, both consumers and producers is a core principle. Security is also a core principle, and sometimes at the costs of ease to the developer (but if it were easy it wouldn't be fun, right?).

Over the years since 2009, the web's native support for APIs that PhoneGap provided has improved dramatically.

### The typical fucking caveats with Apple

As always with the web though…this isn't strictly true. ::sigh:: One such example of this is Apple, [because…well, *because*](https://adactio.com/journal/5787). Apple won't allow any other browsers into their platform, so Chrome is just a wrapped view on WebKitView (the Safari render engine). So all the new technology that lands in Chrome does not land in iOS. iPhone users have to wait for Apple and Safari to raise their game.

## Why have web apps been "avoided"

I'm not entirely sure they've been avoided per-see, but I know how the story goes: CEO wants their company present in an app store. They want radio adds, telling listeners to go to their homepage, then download their app from the Apple or Google store.

It's well known that Apple takes a reasonably significant cut of sale profits (I'm not familiar enough with the other stores to know the status), but research has shown that the UX of installing from an app store shows significant drop off:

...

## Progressive Web Apps

Wat?

- What are the pieces of the puzzle

## App stores

---

- What does PhoneGap have that the web does not?
- Web Apps
- API access run down
  - Software APIs
  - Hardware APIs
- Offline support
  - Service Workers
  - IDB / Local Storage
  - Cache API
- Push notifications
- Security
- Progressive Web Apps

## Misc notes

### Discoverability

Today:

1. Visit site
2. Get overlay/blocked with "install our app"
3. Open app store, hopefully at the app
4. Install app
5. Wait...
6. Open app
7. Sign in?

Tomorrow:

1. Visit site
2. Get non-intrusive "add to home screen?"
3. ...


### Links

- https://www.oreilly.com/ideas/progressive-web-apps-and-whats-next-for-mobile
- https://medium.com/@grigs/one-amazing-video-that-shows-the-potential-of-the-physical-web-d336f1f8af59 - bluetooth, web and physical web
- https://medium.com/net-magazine/10-steps-to-better-hybrid-apps-e8e33831ea5e - 9 out of 10 of these are actually web concerns
- http://www.plugreg.com/ - phonegap plugins
- https://twitter.com/auchenberg/status/728054321372266497 thoughts


* It always forgets, eventually.
