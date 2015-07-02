# You know what they say about assumptions...

During our heated panel on progressive enhancement [Jeremy](https://adactio.com) points out that by trying to anticipate your users' needs, **you're making assumptions**, and [you know what they say about assumptions](https://www.youtube.com/watch?v=G-2NimrRPAQ).

Although he didn't say so explicitly, there was certainly an undertone that it was something we should admit to ourselves. I'd like to add: *for better or worse*.

The wider impact of assumptions about your user (for example that they're viewing on a desktop device) is the exclusion of others.

Jeremy argued, rightly, that you should aim to develop for the absolute lowest technological solution as possible to suit your *all* your visitors basic needs: known and unknown.

I'll say it now: I make all kinds of assumptions about my users. A couple of the most common assumption I make is that they can read English, and that they're visiting using a browser that's capable of rendering HTML correctly.

Then my base level assumption changes depending on the application and adjusts over time depending on feedback.

<!-- [Talky.io](https://talky.io/) is an excellent example to zoom in on. Their technology *requires* WebRTC. This assumes that their users have JavaScript, for without it, there is no product. -->

Just one example was that JS Bin's static code used to be served from a single server which suited most users. One day a bug was filed by an individual in Iran notifying me that JS Bin simply would get past the loader (an example of JavaScript was enabled, but not getting down the wire in time before the connection timed out). Putting the static content (scripts, etc) on a CDN fixed this instantly. A simple retroactive fix.

[Lee Byron](https://twitter.com/leeb), working for Facebook, was a fellow panellist brought up an excellent case study that users in China (<abbr title="if I recall correctly">IIRC</abbr>), unbeknownst to Facebook had such oddball versions of browsers that HTML and CSS wasn't rendering as expected leaving the site in an unusable (or very difficult to use) state.

How low do you go? The real answer is you can never go too low because there's always going to be a case that isn't catered for because [you can't test for it](https://twitter.com/triblondon/status/615894823384420354).

I believe, that progressive enhancing **should** be part of your workflow. Common HTML elements, delivering baseline functionality to all users, and then enhancing. **All does not mean it has to work with cURL**. That's *my* take. You have to decide for yourself.

We *all* make assumptions. Ranging from the language our users can read, to the HTML and CSS support, to the level of JavaScript and the prerequisite on high level JavaScript APIs.

Don't be ashamed. Just **own** those assumptions.

<small>Also, thank you to Jeremy for running his eyes over this post.</small>