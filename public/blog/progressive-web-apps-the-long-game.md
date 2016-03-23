# Progressive web apps: the long game

Yesterday I was able to attend Google's first Progressive Web Apps event. A half day of talks that focused down on progressive web apps.

The event, to me, was extremely well executed with respect to the developer story it told: what's required to create a [progressive web app](https://developers.google.com/web/progressive-web-apps)?

<!--more-->

---

**TL;DR:** There's a high barrier of entry to add to home screen that will create a trust between our users and our web apps. A trust that equals the trust of an app store installed app. **This is huge.**

---

The talks individually covered the following technology and ideas (note that this doesn't include the two keynote talks):

* Security & HTTPS in particular and some of the pain points (Matt Gaunt)
* HTTP/2 and network optimisation (Surma)
* Animation performance (Paul Lewis)
* Service workers - online, offline and lie-fi (Jake Archibald)
* Add to home screen (Paul Kinlan)
* Push notifications (Pete LePage)

I'm certain the material for these talks will be online soon (perhaps in the coming months), but for now, review this list as it's what makes a progressive web app.

Keep in mind that no one is trying to pull the wool over our eyes, and "progressive web apps" as a term is simply that: something to hang an idea on. The same way "ajax" or "web 2.0" is used by businesses to mean: rich and interactive.

## Magical moment #1: service worker wins

The first was Jake Archibald's service worker talk. I've seen Jake talk about service workers many times in the past (here's a [short one](https://www.youtube.com/watch?v=4uQMl7mFB6g) if you haven't), but this time he went on to compare the load time using service worker compared to without.

I'm spoiling the inevitable reveal from his talk, but he goes on to show a service worker driven page will load almost instantly in an online connection (and in fact complete rendering first), offline and importantly in the "lie-fi" mode (when a device *thinks* it has a connection).

What's stood out for me was how a relatively small amount of JavaScript and some well considered code can truly create an offline first experience that doesn't just rival it's native counterparts, but <abbr title="in my humble opinion">IMHO</abbr> stands head and shoulders above. The load time was instant, for a web app, driven by regular HTML, CSS and JavaScript. It was fast, and all worked **irrespective of the connectivity**.

This screenshot I took of Instagram is still a relatively recent memory for me. A native app loading over lie-fi:

<img alt="Failed instagram" src="/images/instagram.jpg" style="max-width: 50%; display: block; margin: 0 auto">

Jake demoed the potential that we have as web developers to make sure this never happens on the web.

## Magical moment #2: the long game

Paul Kinlan spent a brief 15 minutes talk through the add to home screen feature that's new in Chrome. He touched on some of the history, coming from Apple's old meta tags that tried to inform Safari how to render the page, and showed how Chrome's old process was convoluted.

The home screen feature is controlled through a [manifest.json](/manifest.json) (mine) file but can't be accessed unless a few prerequisites are in place.

Those prerequisites are:

1. All served over HTTPS
2. Have a manifest
3. Includes a service worker

Paul also talked about the next steps:

![Paul's list](/images/paul-k-progressive-apps.jpg)

Initially when I learnt about the add to home screen feature, I was frustrated that I needed to have a service worker. It seemed like another hoop to jump through (after adding HTTPS). This wasn't the case. Paul, in not so many words, explained the long game:

> This high bar of entry will create a new mental model for our users.
>
> **If I add this app to my home screen, it *will* work when I open it.**

This is huge. Today, I don't even bother trying to visit sites offline. I know there's a browser cache, but I don't trust it'll load. If I know there's a poor connection, I could open the URL hoping, praying that it might load before I forget what I was doing. I have no trust it'll load at all.

Now is our chance to change all this. Now we have the technologies to create a trustworthy experience with our users, that puts web apps a single touch away from our users.
