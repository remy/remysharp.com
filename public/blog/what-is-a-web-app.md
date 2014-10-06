# What is a "Web App"?

In technology definitions are important. We talk in a language that's mostly made up by our own industry.

Bugs, cache, regressions, polyfills, monads, polymorphic functions, isomorphic JavaScript and a lot more language. Even when you *do* work in our industry, it's hard to keep up with all the language.

There there's "web app". A lot of people (including myself) will refer to many web sites as *apps*. But why? I don't know of a good definition ("good" in that there's no hand-waving involved).

So here's my definition and distinction between web site and web app.

<!--more-->

## Web site

A URL that you visit. Classic examples include a blog or a wiki. Where the content is waiting for you at the end of the URL.

JS Bin is a web site by this definition. You visit the URL and create content. Someone will share a bin, and you visiting this content. **You go to the site**.

## Web app

A URL that you take with you. This is locally installed and data is *pushed to you*. Classic examples of this are email clients, news readers, task orientated applications. **The app goes with you**.

Importantly: you expect it to be available with or without an internet connection.

> Isn't this just a web site with offline support?

I'm still scoffing at "*just*". Sure, if you want to dumb it down as such. But equally isn't an app on your screen, like Chrome or TomTom or PhotoShop, *just* some compiled code? Yes, it is, but it's actually a lot more than that.

The common language word we refer to compiled programs are: apps.

It's not that it's harder to build web apps, it's that the experience with these types of web sites are fundamentally different to a web site like Wikipedia for instance.

---

The future of web browsers is coming, and they're giving us more and more support for offline technology, through storage (for data caching) to control over the network (through [service workers](https://github.com/slightlyoff/ServiceWorker)).

If you're using progressive enhancement, then your web site can achieve both. However, I don't believe it's entirely possible to create a web app without the functionality that JavaScript provides. So there's is *some* expectation that a web app relies on JavaScript, but that's not what makes a web app.

Now, next time you're asked to build a web app, at least you can have a feature set that you're working towards.