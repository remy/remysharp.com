# State of the gap

Clearly PhoneGap, and Cordova are still required today in the mobile world, but when is it *really* needed? Did the web ever catch up? Do we always need to turn to a PhoneGap shell for all our solutions?

**TL,RD;** I strongly believe in the concepts behind progressive web apps and even though native hacks (Flash, PhoneGap, etc) will always be ahead, the web, always gets there. Now, today, is an incredibly exciting time to be build on the web.

<!--more-->

---

I remember first hearing about PhoneGap through excitement over Twitter in 2009. The first [jsconf.us](https://jsconf.us) had just run, but I hadn't attended (at the time, the distance and costs was too much). One thing was for certain: PhoneGap, team Nitobe with front man, Brian LeRoux, had cracked something hugely important important: *deploying webapps inside of a native shell with native access*.

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

In my game of Q&A bingo, *"what about Apple?"* is always a sure bet. On one hand, I hate that Apple doesn't pull up to the table and discuss their intentions and how they will support developers.

Even getting the hint of interest from Apple is a process of dumpster-diving the mailing lists scanning for the smallest hint of interest.

Apple also won't allow any other browsers into their platform, and [this *really* annoys me](https://adactio.com/journal/5787), as such so Chrome is just a wrapped view on [WKWebView](http://blog.chromium.org/2016/01/a-faster-more-stable-chrome-on-ios.html) (the Safari render engine). So all the new technology that lands in Chrome or Firefox does not per-se land in iOS. iPhone users have to wait for Apple and Safari to get involved.

Equally, Apple, just like Mozilla and Chrome and Opera and Microsoft, is a company. They can behave as they please. They do not necessarily have to answer to our call. This secrecy is how they operate (for better or worse).

The upshot however is that technology like Service Workers and push notifications are already implemented in Chrome, Opera and Firefox and there are positive signals coming from Microsoft (via active development and their dev status pages), so that just leaves Safari. If web developers start making amazing web apps that use these technologies, Apple will *want* to serve the developer demand.

## Could Instagram work as a web app?

I posed the question recently via twitter, purely as a thought exercise. Instagram today is a hybrid app. I asked: [why is Instagram a native app? More specifically, what's missing on the web to do it?](https://twitter.com/rem/status/732218937606328320)

The answers were interesting, particularly as I felt that a great deal of functionality is possible today. However, the limitations (i.e. not possible at all with web tech) we found included:

- The ability to focus the camera (when used as an inline object)
- Access to list camera roll images (inline)
- Inbound share intent (i.e. sharing *to* our web app, [aka "web intents" of yesteryear](https://paul.kinlan.me/what-happened-to-web-intents/))
- Client side transcoding and compression (of video in particular)

With respect to transcoding: Sole Penadés wrote up an excellent [follow up article](https://soledadpenades.com/2016/05/17/why-is-instagram-not-a-website-yet/) explaining the biggest issues and the research that they undertook in Mozilla a few years ago.

The items possible via web technology today (but, as caveats go: not across *all* platforms):

- Filters via WebGL (and using [CSS](https://una.im/CSSgram/) for fast previews)
- Inline video and audio playback (long available in Chrome and [hackable for iOS](https://github.com/bfred-it/iphone-inline-video))
- Fast loading shell: Service Workers and [Intersection Observer API](https://www.chromestatus.com/feature/5695342691483648)
- Push notifications

Discoverability (of the app) was also a question that came up a few times. In particular, citing that "users are used to app stores". I don't _quite_ agree, because app stores are a relatively new paradigm and it *can* be changed: it's not set in stone.

## Why wouldn't you use the web?

It depends on your criteria and context. I recently read an article comparing hybrid apps (such as PhoneGap based apps) to web, and one of the pros of a hybrid was the API access available.

The truth, a lot of that has changed with respect to Web APIs, and in fact, a lot of the core APIs available in hybrid app development come directly from the browser APIs, for applications such as social media, gaming, and the like.

What a hybrid app frame *does* offer that web cannot (today) is a plugin system that allows the developer to bridge to native functionality that isn't available in a browser - like sending an SMS.

The bottom line is that being able to write custom plugins for tools like PhoneGap will **always** put the technology ahead of the web. Flash was the plugin that was ahead of the web for a long time, it was the *only* way to play video for heavens sake!

If a new sensor is shipped with a device tomorrow and plugin giving developers API access can be available the next day. The same cannot be said for browsers. It takes many months, if not years to get to the same API access.

## Why have web apps been "avoided"

I've heard "app stores" being cited as a reason to use build hybrid or native. One story goes: the CEO wants their company present in an app store. They want adverts, telling listeners to go to their homepage, then download their app from the Apple or Google store.

It's well known that Apple takes a reasonably significant cut of sale profits (I'm not familiar enough with the other stores to know the status).

However, when you put it up against numbers, it really doesn’t look that attractive.

Research has shown that the UX of requiring [an action creates a 20% fall off rate](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html), which has a direct effect when you want to send your users away to an app store. Alex Russell uses this in number of [his recent presentations](https://www.youtube.com/watch?v=x7cfLDFVyHo), and I'll use the same numbers.

Say you have 1,000 interested users. Here are the steps:

![Visit app store, 800 users, Find app, 640 users, Click install, 512 users, Accept permissions, 410 users, Download and wait, 328 users, Use, 262 users](/images/state-of-the-gap/20-dropoff.jpg)

Even if they're directed straight to your app, you're skipping step 1 & 2, you’re still *only* left with 410 users. That’s **less than 50% of users** for your app store.

[Selio](https://selioapp.com) (a buy/sell/chat commerce app) moved to PWA for their site and saw an average of 6+ minutes spent in the app. More importantly, the user acquisition was up to 10 times cheaper than native apps. Putting a (<abbr title="cost per action">CPA</abbr>) cost of €3-5 for native apps, and €0.30-0.40 for PWA users ([citation](http://www.slideshare.net/julianmartinez2/building-selio-a-local-market-progressive-web-app)).

That's a huge cost.

What if there was an alternative path…?

## Progressive Web Apps

*\#LOLMarketSpeek*. Well, yup, sort of. But every big change needs a hook. A *word*. Like ajax. Or comet. Or polyfills. This is, in part, a marketing ploy by the web (and some clever hats at Google) aimed squarely at those people who keep building "native apps" that replicate web functionality.

And it's working.

**Flipkart** is an commerce site in India that recently *shut down their mobile app* in favour of a progressive web application. Google have a [case study](https://developers.google.com/web/showcase/2016/flipkart?hl=en) that includes some really interesting data and insights:

![3 times more time spent on site, 40% high re-engagement, 70% greater conversion from homescreen, 3 times lower data usage](/images/state-of-the-gap/flipkart.jpg)

Obviously it's not working because of good marketing, it's working because web technology is getting really solid backed by solid APIs.

## What makes a progressive web app?

Alex Russell coined the term and posted on his [blog last year: Escaping the Tab: Progressive, Not Hybrid](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/). He notes that "an evolution has taken place in browsers.".

[Frances Berriman](https://fberriman.com/) and Alex enumerated the factors that make for a progressive web app, which I've taken the liberty to (attempt to) distil into three main topics:

1. Security: TLS/HTTPS, permissions
2. Performance: fast, responsive (in all senses)
3. Availability: control of the network, homescreen, push notifications

Importantly, the users will not be be actively differentiating between progressive web apps and "native" apps. That means, they must behave with the same level of performance.

It's our jobs, as web developers, to change the mindset of our users. We want and them to say to themselves:

> If I add this app to my home screen, it **will** work when I open it.

### A note about add to homescreen

At the risk of repeating myself (over and over and over…):

Without HTTPS and without service workers, you *can't* add to homescreen. This is an intentionally high bar of entry with damn good reasons.

When the user installs a PWA, it has to work. It's our job as web developers to provide the most excellent experience for our users.

**It has to work.**

Once an app is on the homescreen, it has space in the highest valued real-estate on the user's device. It's fast to access so it's our jobs to instil trust into our users over and over.

With time, and persistence, users (us included) will come to **expect** PWAs to work. If it's on my homescreen, it'll work. The same way as any good native app might work today.

## Push notifications

There's a huge (business) demand for push notifications. The opportunities to re-engage with a customer are almost overwhelming!

Push technology also requires a service worker, because the service worker will do the subscription, and receives the `push` message event.

<img src="/images/state-of-the-gap/push.gif" style="min-width: 280px; float: left; margin-bottom: 10px; margin-right: 20px;" alt="Demo of Caturday push notification on Android">

In [this push notification demo](https://caturday-post.herokuapp.com), what's important to notice here is that I didn't install the app to my phone. The tab and browser was completed closed. I simply accepted push notifications from the web site, and the notification still arrives. It's a little hard to see from the small animated gif (*sorry about that*), but after I close the browser, a notification from Chrome comes in at the very top left of the screen.

Over a conversations I was having with some developers, I explained how I was using the native Android Amazon app recently and tried to compare a product (that I wanted to buy).

I quickly realised I couldn't switch back and forth the way I would normally with a tabbed browsing system. Someone else pointed out that they had uninstalled the native app, and exclusively use Amazon in the browser at the expense of *not* getting the delivery notifications.

Push notification technology can change this!

Beyond the Rack, [in another Google case study](https://developers.google.com/web/showcase/2015/beyond-the-rack), stated that:

> Push notifications allowed us to bring one of the most compelling capabilities from our native app to our mobile site. **We see a direct 20% click through rate from push notifications…**

## An anecdote in the wild

In preparing the content for this talk and post, I had been taking screenshots and videos on my phone that I needed to transfer to my laptop.

Ordinarily I would send myself a hangout message to my additional Google Plus account - which, now I've written it down is bananas.

I knew I just wanted a simple peer to peer file transfer app. I'd need this in the past, so I started to spelunk the Google Play store…

The result was installing three separate apps all of which didn't _quite_ do what I wanted. It either did way too much or didn't let me transfer the way I wanted (I even found an app that moved files from my laptop _to_ my phone - the wrong way around!).

Then, through twitter, I was notified about [snapdrop.net](https://snapdrop.net). Right away I realised this was *exactly* what I needed: a peer to peer file transfer application.

![Polymer: starter kit & elements, WebRTC: PeerJS, WebSockets: BinaryJs, NodeJS, Material Design and perfect UX](/images/state-of-the-gap/snapdrop.jpg)

Not only was this a progressive web app, but I've also installed this app to my homescreen and it did exactly what I needed. Perfect and simple. Irrespective of the fact it was entirely web technology. This app was a perfect example (for me) of a PWA in the wild.

## Closing thoughts

Brian wrote this of the PhoneGap philosophy back in 2012 (emphasis mine). It’s still fitting today and, in my humble opinion, it will always be true.

> We agree that there are no silver bullets, and the web isn’t the best tool for every job. However, the web is not getting worse, and the browser abstraction layer is ultimately the same across operating systems (C, C++). **If the web doesn’t do something today it’s not because it can’t, or won’t, but rather it is because we haven’t gotten around to implementing that capability yet**.

If there is demand for access to a native API or native access point (such as the home screen), first the hackers will take on the problem, then the masses will use the hacks and then, eventually, it’ll land in browsers. It’s a long bet, but the web  will get there.

For now though, there’s a *lot* of new and exciting prospects with the technology available right now. Do it right, make your users trust the web.

---

## Resources & further reading

This is just of the URLs that I was looking at whilst preparing these thoughts. It's incomplete, but probably still useful.

- [Slide deck for this talk I gave at PhoneGap Day EU 2016](https://speakerdeck.com/rem/state-of-the-gap)
- [Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
- [Bluetooth, web and physical web](https://medium.com/@grigs/one-amazing-video-that-shows-the-potential-of-the-physical-web-d336f1f8af59)
- [Progressive web apps and what's next for mobile (with Alex Russell)](https://www.oreilly.com/ideas/progressive-web-apps-and-whats-next-for-mobile)
- [9 out of 10 of these are actually web concerns](https://medium.com/net-magazine/10-steps-to-better-hybrid-apps-e8e33831ea5e)
- [Thoughts about PWA retrospectives](https://twitter.com/auchenberg/status/728054321372266497)
- [Every step costs you 20% of users](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)
- [Chrome status](https://www.chromestatus.com)
- [Web fundamentals](https://developers.google.com/web/fundamentals/?hl=en)
