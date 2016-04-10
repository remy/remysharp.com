# The Web App "discovery problem"

With the formalisation of [progressive web apps](https://developers.google.com/web/progressive-web-apps?hl=en) (and their associated APIs and technology), there's been huge progress with respect to realising the [real potential of a web app](https://remysharp.com/2014/10/06/what-is-a-web-app#web-app) but there's still a few hurdles that will need to be solved in the future. One hurdle in particular that has come up in a number of posts I've read recently is: **discovery**.

This post is inspired by another post with a section entitled: [Challenge: discoverability ("websites on a plane")](http://softwareas.com/progressive-web-apps-have-leapfrogged-the-native-install-model-but-challenges-remain/).

<!--more-->

In my mind, web app discovery breaks down into a few distinct groups:

1. **Browse**: I'm looking for an app that does a thing. ie. *a calculator*
2. **Find**: That app sounds cool, I want to install it. ie. *being advertised to or word of mouth*
3. **Get**: I want to find the app that goes with this specific thing. ie. *being told to visit "our URL to install our app"*

**TL;DR** it's not a problem. In fact, native app stores are problematic and are limited. Native apps are *only* available via stores. Progressive web apps don't have the same restrictions. User engagement will be, and is better because there's fewer steps to installation. **Discoverability will be won by URLs (direct marketing) and curated app stores.**

## Browse apps

Quoting from the article that prompted this blog post:

> On web, I can search in … Google? Nope. I'll usually get a pile of ugly and ad-ridden sites that happen to be old enough to have reached high rankings.

This is true. However, the same is also true today with app stores. Here's the Google Play store searching for a calculator:

![Play store calculation options: a plenty](/images/play-store-calc.jpg)

And equally from the Apple store:

![Apple store calculation options: a plenty](/images/apple-store-calc.jpg)

The choice is vast (and goes on). The reviews are fairly similar (though Apple showing the number of reviews is certainly useful), and if I'm honest, out of all the averagely good ones, I'll pick the one with the nicest icon, and hope for the best.

The web doesn't have this "successful" model for searching for vast numbers of calculator apps (beyond Google or Yahoo). Though, the web does have web app stores, [Mozilla's marketplace](https://marketplace.firefox.com/) is once such example. The "problem" is that it's not ubiquitous. There is no single store for web apps.

This is huge. **There is no single store for web apps.** This means we can have carefully curated app stores that suit our needs perfectly.

Web app stores with curated apps specifically for designers, or specifically for new parents, or specifically for kids under the age of 6, or specifically for cat lovers, or specifically for paid-for apps, or specifically free apps, or specifically by Google, or Microsoft, or Apple…the list goes on. The opportunities are limitless.

## Find & Get apps

This is where the notion of discovery being a problem for progressive web apps just falls apart.

I listen to the radio in the car. At least once a week I hear the radio station announce:

> Visit magic dot co dot uk to download the Magic app to your smartphone or tablet.

The directions are clear: visit a URL to get their app (to listen to the radio station that I'm already listening too…). Except, in truth, I know this will involve a number of extra steps:

1. Visit the site
2. Find the link to download their app
3. Open app store and install
4. Accept various permissions: carte blanche (though I believe this is much better in newer mobile operating systems)
5. Now open the app *(or I could–and have been—completely distracted by the other app suggestions and completely forget what I intended to do)*
6. App launches and I'm advertised at
7. Sign in to the app (though thankfully Magic allowed me to skip this, IIRC Absolute Radio made it a horrible experience)
8. Listen to music! Phew!

![The install process from an app store](/images/install-app-process.jpg)

Let's compare that to a progressive web app:

1. Visit site
2. Add to home screen. *Optionally nothing changes now and I'm still on the site, and I have the "app" version on my home screen, but let's assume I wanted to leave.*
3. Go to home screen and open site
4. Listen to music

I didn't have to negotiate the user's operating system to send them to the right store, I didn't have to build the same working music app in Java and Swift (or Objective-C or what-have-you-I-lose-track), and if the user doesn't have a compatible browser with progressive web app technology (like Service Workers), **it still works**.

Progressive web apps allow users to truly **"visit our URL to install our app"**.

---

It's on us, [as I realised recently](https://remysharp.com/2016/03/18/progressive-web-apps-the-long-game#magical-moment-2-the-long-game), to make sure that we create a trustworthy experience. The discovery will solve itself: in fact, it's most of the way there already.



