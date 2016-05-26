# State of the gap

I remember first hearing about PhoneGap through excitement over Twitter in 2009. The first [jsconf.us](https://jsconf.us) had just run, but I hadn't attended (at the time, the distance and costs was too much). One thing was for certain: PhoneGap, team Nitobe with front man, Brian LeRoux, had cracked something hugely important important: *deploying webapps inside of a native shell with native access*.

<!--more-->

In the same year I coined the [term polyfill](/what-is-a-polyfill):

> A polyfill …, is a piece of code or *plugin* that provides the technology that you, the developer, expect the browser to provide *natively*. Flattening the API landscape if you will.

Back in 2010, mobile browsers didn't expose many of the APIs nor mobile sensors to the browser, such as orientation data. In conversations and conference talks, Brian LeRoux (noble bear warrior of PhoneGap) would talk about closing the gap between mobile and desktop (alluding to the meaning of the name). Something to raise the level of API access within mobile devices. Eventually [publishing exactly what he meant](http://phonegap.com/blog/2012/05/09/phonegap-beliefs-goals-and-philosophy/) on the web (which never forgets*):

!["PhoneGap is a polyfill, and the ultimate purpose of PhoneGap is **to cease to exist**." - Brian LeRoux, 2012](/images/state-of-the-gap/slide_2.jpg)

That bears repeating: [the] **purpose of PhoneGap to cease to exist**.

Now, obviously this is not in Adobe's interest, given their purchase back in 2011, however it *is* PhoneGap’s philosophy. That is, to create software that helps developers to get to where they need to get to whilst we wait for the technology to catch up.

Once that technology bridge exists natively (i.e. via the browser), the "gap" bridge can and should be removed without any (real) impact. This is exactly the way a polyfill works.

---

This post (and talk) is about the current state of that gap some 7 years later, and whether application developers still need to turn to PhoneGap or whether in fact the web is fully capable of delivering a first class experience whilst also solving your user's needs. Did team PhoneGap succeed? Did the web catch up? Did user's needs surpass what's possible?

Though, spoilers: [progressive web apps](https://developers.google.com/web/progressive-web-apps).

## Core plugins

Today, PhoneGap supports a number of [core plugins](http://docs.phonegap.com/plugin-apis/) and I think it's useful to do a quick eye-ball test to see where the web is up to before looking at the web as an independent entity (that's to say: to stop comparing to native).

I've included a full table of comparison, but below I first wanted to show you a few samples of native web running the code:

### Battery status

```
navigator.getBattery()
	.then(b => console.log(`${b.level * 100}%`))
```

[Demo](https://jsbin.com/qetavi/1/edit?js,console)

### Camera

```
<input type="file" accept="image/*;capture=camera">
```

[Demo](https://jsbin.com/hikicet/1/edit?html,output)

### Device Motion & Orientation

```
window.addEventListener('deviceorientation', handler);
window.addEventListener('devicemotion', handler);
```

[Demo](https://jsbin.com/fobiniw/2/edit?js,output)

### File

```
let reader = new FileReader();
reader.onload = e => {
  let img = new Image();
  img.src = e.target.result;
  document.body.appendChild(img);
};
reader.readAsDataURL(this.files[0]);
```

[Demo](https://jsbin.com/tedoruz/1/edit?js,output)

### File transfer

```
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://httpbin.org/post', true);
  xhr.onload = e => {
    alert('Fully uploaded');
  };

  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = e => { // track upload progress
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
    }
  };

  xhr.send(blobOrFile);
}

button.onclick = () => {
  upload(new Blob(['hello world'], {type: 'text/plain'}));
};
```

[Demo](https://jsbin.com/qefigi/1/edit?js,output)

### Media Capture

```
const video = document.querySelector('video');

function done(stream) {
  var url = window.URL.createObjectURL(stream);
  video.src = url; // starts to play video
}

// webkit specific (should detect, I've skipped for demo)
navigator.webkitGetUserMedia({
  video: true
}, done, console.error);
```

[Demo](https://jsbin.com/rawoku/1/) ([source](https://jsbin.com/rawoku/1/edit?js))

### Network information

```js
navigator.connection.ontypechange = () => {
  // wifi/cellular/bluetooth/ethernet/etc/none
  alert(`New connection type: ${navigator.connection.type}`);
});
```

[Demo](https://jsbin.com/saxapos/1/edit?js,output)


### Vibration

```
navigator.vibrate(1000);
```

[Demo](https://jsbin.com/tipesa/1/edit?js,output)

---

| API | PhoneGap | Web capable |
|-----|----------|-------------|
| Battery Status | 👍 | 👍 |
| Camera | 👍 | 👍 |
| Contacts | 👍 | ❌ |
| Device Info | 👍 | 👍 |
| Device Motion (accelerometer) | 👍 | 👍 |
| Device Orientation (compass) | 👍 | 👍 |
| Dialogs (notification) | 👍 | 👍 |
| File | 👍 | 👍 |
| File Transfer | 👍 | 👍 |
| Geolocation | 👍 | 👍 |
| Globalisation | 👍 | 👍 |
| Media Capture | 👍 | 👍 |
| Network Information | 👍 | 👍 |
| Splash Screen | 👍 | 👍 |
| Status Bar | 👍 | 👍 |
| Vibration | 👍 | 👍 |

Notes: I've removed `InAppBrowser` and `Whitelist` as they're PhoneGap specific to allow PhoneGap to run. Also, "Web capable" means it's capable via a W3C specification, though possibly not available in *all* browsers today.

## Many more APIs

There are many many more interesting and exciting APIs in browsers today, including `navigator.sendBeacon()` (for analytics after your tab is closed), Streams, bluetooth and Physical Web.

I'll admit, I've shoehorned this in, but I recently saw a physical web demo that combines beautifully with bluetooth discover and control.

This individual is interacting with a bluetooth device without having to jump into any settings. The beacon discovery is landing directly in Chrome (he’s using a separate app), and bluetooth is currently behind flags, but it shows how frictionless the process was to start using this new toy:

<iframe width="1280" height="720" src="https://www.youtube.com/embed/6z9ED4fmi1w?rel=0" frameborder="0" allowfullscreen></iframe>

## Ecosystem

When looking at a PhoneGap plugin (for example), there's a strong focus around support across platforms, because this is the hard part: coding in multiple languages. PhoneGap has core support for three platforms (Android, iOS, Windows Phone) and a number of other platforms supported by the community through Cordova. Though, as I was checking out the [featured PhoneGap apps](http://phonegap.com/app/) all of the ones I saw only supported Android and iOS…

The web is different, in that if the browser fully supports a class of APIs, then the support across devices is the same†. A key feature of browsers is to support interoperability. It's a relatively simple equation: site looks amazing in browser X, browser Y should want to provide the same experience to pull the users across.

<small>† Mostly, hardware oddities aside!</small>

The web is the long game. It will always make progress. Free access to both consumers and producers is a core principle. Security is also a core principle, and sometimes at the costs of ease to the developer (but if it were easy it wouldn't be fun, right?).

Over the years since 2009, the web's native support for APIs that PhoneGap provided have improved dramatically. The ecosystem is very different from the day that PhoneGap was *needed*.

### Cross browser support



In my game of Q&A bingo, *"what about Apple?"* is always on my card. On one hand, I hate that Apple doesn't pull up to the table and discuss their intentions and how they will support developers.

Even getting the hint of interest from Apple is a process of dumper-diving the mailing lists scanning for the smallest hint of interest.

Apple also won't allow any other browsers into their platform, and [this *really* annoys me](https://adactio.com/journal/5787), as such so Chrome is just a wrapped view on WebKitView (the Safari render engine). So all the new technology that lands in Chrome or Firefox does not per-se land in iOS. iPhone users have to wait for Apple and Safari to get involved.

Equally, Apple, just like Mozilla and Chrome and Opera and Microsoft, is a company. They can behave as they please. They do not necessarily have to answer to our call. This secrecy is how they operate (for better or worse).

The upshot however is that technology like Service Workers and push notifications are already implemented in Chrome, Opera and Firefox and there are positive signals coming from Microsoft (via prototypes), so that just leaves Safari. If web developers start making amazing web apps that use these technologies, Apple will *want* to serve the developer demand.

## Could Instagram work as a web app?

Instagram is a hybrid app. I asked over twitter: why is Instagram a native app? More specifically, what's missing on the web to do it?

The limitations (i.e. not possible at all with web tech) we could find were:

- The ability to focus the camera (when used as an inline object)
- Access to list (inline) camera roll images
- Client side transcoding and compression (of video in particular)
- Inbound share intent (i.e. sharing *to* our web app, [aka "web intents" of yesteryear](https://paul.kinlan.me/what-happened-to-web-intents/))

Sole Penadés wrote up an excellent [follow up article](https://soledadpenades.com/2016/05/17/why-is-instagram-not-a-website-yet/) explaining the biggest issues and the research that she undertook in Mozilla a few years ago.

The items possible via web technology today (but not across *all* platforms):

- Filters via WebGL (and possibly [with CSS](https://una.im/CSSgram/) for faster previews)
- Inline video and audio playback already possible (and [hackable for iOS](https://github.com/bfred-it/iphone-inline-video))
- Fast loading shell: Service Workers and Intersection Observer API
- Push notifications

Discoverability is a question that keeps coming up. Users are "used" to app stores. This, though, is a relatively new paradigm and it can be changed. It's not set in stone.

## Why wouldn't you use the web?

It depends on your criteria and context. I recently read an article comparing hybrid apps (such as PhoneGap based apps) to web, and one of the cons of a hybrid was the API access available.

The truth, a lot of that has changed, and in fact, a lot of the core APIs available in hybrid app development come directly from the browser APIs, for applications such as social media, gaming, and the like.

What a hybrid app frame *does* offer that web cannot (today) is a plugin system that allows the developer to bridge to native functionality that isn't available in a browser - like sending an SMS.

Again, this depends on your criteria and context. I listen to the radio a lot when I'm working from home. Quite often I'll hear their advert for their native app. This involves visiting the radio station web site, which will direct to the right app store to install their radio app.

The radio station doesn't do anything on a native that could be done using web. The things is: mobile web site often suck.

It's 2016, responsive web design has been around since 2004, and CSS3 media queries have been ready for prime time since 2009 and it really landed with the web community via Ethan Marcotte coining the term in the [A List Apart article](http://alistapart.com/article/responsive-web-design) in 2010.

***UNFINISHED SECTION***

## State of web APIs

The web is always in a state of playing catch up with native when it comes to APIs. There's no question, and I don't personally believe this will ever change. The web has advantages (that should be obvious) over native, one in particular is links and the connectivity that the web has – this is still a total mess in native land.

First of all though, I should caveat that a lot of the newer APIs require HTTPS. This has also been back-ported to older APIs like the `geolocation` API. This is obviously for security of data. Mobile operators have been known to intercept data so there's nothing stop them from keeping what they want (or what some other entity tells them to keep). Using HTTPS keeps *our* data secure.

I've broken the API categories down into:

- Network (service worker, push notifications, streams api)
- Storage (IDB, localStorage, FileAPI, cookies)
- Media (video, audio, webgl, WebRTC)
- Sensors (geolocation, device orientation, device motion, bluetooth)
- Timing (navigator.performance)
- Fullscreen (and cursor lock)

There's many many more APIs that have made progress and in the process of review, ranging from [NFC](https://www.chromestatus.com/feature/6261030015467520) to [WebAssembly](https://www.chromestatus.com/feature/5453022515691520).

The bottom line as PhoneGap (and hybrid app) developers it's likely you already know about a lot of these APIs.

What's changing **right now** is that Progressive Web Apps (PWA) are taking over.

## Why have web apps been "avoided"

I've heard "app stores" being cited as a reason to use native. One story goes: the CEO wants their company present in an app store. They want adverts, telling listeners to go to their homepage, then download their app from the Apple or Google store.

It's well known that Apple takes a reasonably significant cut of sale profits (I'm not familiar enough with the other stores to know the status).

However, when you put it up against numbers, it really doesn’t look that attractive.

Research has shown that the UX of requiring [an action creates a 20% fall off rate](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html), which has a direct effect when you want to send your users away to an app store. Alex Russell uses this in number of his recent presentations, and I'll use the same numbers.

Say you have 1,000 interested users. Here are the steps:

1. Visit app store (800 users left)
2. Find app (640 users left)
3. Click install (512 users left)
4. Accept permissions (410 users left)
5. Download and wait (328 users left)
6. Use! 262 users left.

Even if they're directed straight to your app, you're skipping step 1 & 2, you’re still *only* left with 410 users. That’s **less than 50% of users** for your app store.

[Selio](https://selioapp.com) (a buy/sell/chat commerce app) moved to PWA for their site and saw an average of 6+ minutes spent in the app. More importantly, the user acquisition was up to 10 times cheaper than native apps. Putting a (<abbr title="cost per action">CPA</abbr>) cost of €3-5 for native apps, and €0.30-0.40 for PWA users ([citation](http://www.slideshare.net/julianmartinez2/building-selio-a-local-market-progressive-web-app)).

## Progressive Web Apps

\#LOLMarketSpeek. Well, yup, sort of. But every big change needs a hook. A *word*. Like ajax. Or comet. Or polyfills. This is, in part, a marketing ploy by the web (and some clever hats at Google) aimed squarely at those people who keep building "native apps" that replicate web functionality.

And it's working.

**Flipkart** is an commerce site in India that recently *shut down their mobile app* in favour of a progressive web application.

Obviously it's not working because of good marketing, it's working because web technology is getting really solid backed by solid APIs.

What makes a progressive web app?

1. Security: TLS/HTTPS, permissions
2. Performance: fast, responsive (in both senses)
3. Availability: control of the network, homescreen, push notifications (without requiring an install)

In other words: lauchable from your homescreen, works completely without a connection, fullscreen, fast and can push notifications.

## Technology

- HTTPS (secure)
- Service Worker (network control)
- Manifest (add to homescreen)
- Push notifications

### A note about add to homescreen

Without HTTPS and without service workers, you *can't* add to homescreen. This is an intentionally high bar of entry with damn good reasons.

When the user installs a PWA, it has to work. It's our job as web developers to provide the most excellent experience for our users.

**It has to work.**

Once an app is on the homescreen, it has space in the highest valued real-estate on the user's device. It's fast to access so it's our jobs to instil trust into our users over and over.

With time, and persistence, users (us included) will come to **expect** PWAs to work. If it's on my homescreen, it'll work. The same way as any good native app might work today.


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
- http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html Every step costs you 20% of users.


* The web always forgets…eventually.

## Further resources

- Jake & Alex
- Google fundamentals has some excellent resources
- caniuse.com
- chromestatus (includes other browsers and interest)


## Thoughts

### What question am I trying to answer?

#### One tap away

More importantly, up until relatively recently, adding a web app to your phone for quick access ranged from hard to virtually impossible. Even then, it wasn't clear whether the app would load, whether it would open a browser, or a webview, what access it had, whether it's cache had been tossed away and so on. Generally, not so good.

Installed apps via the app stores however have that first class access to the user. Installed directly on to the homescreen from a few taps (and possibly a password and dismissal of permission requests!).

It's the homescreen that a lot of the companies want to get to. That single tap away leads to more engagement from their customers, which could leads to more sales.

## Closing thoughts

> We agree that there are no silver bullets, and the web isn’t the best tool for every job. However, the web is not getting worse, and the browser abstraction layer is ultimately the same across operating systems (C, C++). If the web doesn’t do something today it’s not because it can’t, or won’t, but rather it is because we haven’t gotten around to implementing that capability yet.

Brian wrote this of the PhoneGap philosophy back in 2012. It’s still fitting today and it will always be true.

If there is demand for access to a native API or native access point (such as the home screen), first the hackers will take on the problem, then the masses will use the hacks and then, eventually, it’ll land in browsers. It’s a long bet, but the web  will get there.

For now though, there’s a *lot* of new and exciting prospects with the technology available right now. Do it right, make your users trust the web.






- Native apps can be extremely popular, but research has found that on average there are 3 successful native apps. *TODO add supporting data*.
- Web APIs were poor and not accessible without a wrapper
- Web APIs today: WebGL, getUserMedia, WebRTC
- Mobile experience still sucks, but PWA is a strategy that can turn this around


---

## Talk details

Title:

State of the gap

Abstract:

"PhoneGap is a polyfill, and the ultimate purpose of PhoneGap is to cease to exist" – Brian LeRoux, SPACELORD!1!! at Adobe, 2012.

Clearly PhoneGap, and Cordova are still required today, but when is it really needed? Did the web ever catch up? Do we always need to turn to a PhoneGap shell for all our solutions?
