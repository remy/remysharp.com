# Progressive enhancement

I thought that this EdgeConf panel would be about developers not using JavaScript because they were more interested in building high end web apps, full of WebRTC, Web Audio and the like. But it's not.

Here's the thing: after getting responses from 800+ developers, I've come to realise that most developers, or certainly everyone in this room, everyone watching, everyone reading, see progressive enhancement as a good thing. The "right thing" to do. They understand that it can deliver the web site's content to a wider audience. There's no doubt.

There's accessibility benefits and SEO benefits. SEO, I've heard directly from developers, is one way that the business has had buy in to taking a PE approach to development.

But the truth is: progressive enhancement is not part of the workflow.

## What is Progressive Enhancement?

Well...it's a made up term by Steve Champeon who [used it to describe the techniques](http://hesketh.com/publications/progressive_enhancement_and_the_future_of_web_design.html) he (or he and team) were using to build web sites instead of taking a graceful degradation approach.

As such, there's no one single line that defines progressive enhancement. However, Wikipedia defines it as:

> [progressive enhancement] allows everyone to access the basic content and functionality of a web page, using any browser or Internet connection

<div hidden>while also providing an enhanced version of the page to those with more advanced browser software or greater bandwidth</div>

Graceful degradation works the *other way around*, in that the complete functionality is delivered to the browser, and edge cases and "older browsers" (not meeting the technical requirements) degrade down to a (potentially) less functionality.

**The problem is** based on a survey of my own followers, that's to say that they're likely to have similar interests and values when it comes to web dev, 25% of 800 developers still believe that progressive enhancement is simply making the site work without JavaScript enabled.

## How do you make it work without JavaScript?

I ran a simple survey of my twitter followers and ask people to share the question too. It asked "what is progressive enhancement?" with 4 limited answers.

Out of *800* responses, 25% said that progressive enhancement was making the site work *without* JavaScript.

Which explains the *silver bullet response* of: "how would a WebRTC chat site work?" ...obviously it wouldn't.

<iframe width="853" height="480" src="https://www.youtube.com/embed/8QCiXc6QHV4?rel=0" frameborder="0" allowfullscreen></iframe>

Which to me, means **delivering a baseline web site that's usable by the most minimal of requirements**.

Very much what Jeremy Keith has [said recently in response](https://adactio.com/journal/7774) to criticism that it's impossible to progressively enhance everything with today's expectations. Progressive enhancement is:

> ...figuring out what is core functionality and what is an enhancement.

**So the question becomes** how does the web community re-frame it's thinking, and looks at progressive enhancement as the baseline that you build upon?

## Why does it matter?

Today, many developers are writing "thick clients", that is, JavaScript driving a lot, if not all, of the functionality and presentation in the browser.

They do it by delivering and render *views* in the browser. The big upside of this is that the site is extremely fast to the user's input. The other big benefit is that there are a good number of frameworks (Angular, Ember, Polymer to name the "biggies" of today) that lend themselves greatly to client side MVC, i.e. full application logic in the client side code.

The problem is that the frameworks will often (try to) reinvent fundamental building blocks of a web experience. A few simple/classic examples:

- The link isn't a link at all, which means you can't open it in a new tab, or copy it, or share it...or even click it the way you'd expect to
- The *button* isn't a button
- You can't share a link to the page you're looking at (because it's all client side rendered and doesn't have a link)
- Screen readers can't navigate the content properly

This doesn't mean this isn't possible, just that it's more often forgotten. In the same way that Flash was often labelled as inaccessible. This wasn't true, it was *possible* to make Flash accessible, it's just that the default development path didn't include it.

A more extreme example of this is seen in Flipboard's mobile site. Importantly: *mobile site*. Flipboard render the entire page using a `canvas` element. I can't speak for the accessibility of the site, but on mobile it performs beautifully. It feels..."native". And with that, it's also broken. I can't copy links, and I can't copy text - akin to the Flash apps and even Java applet days. It looks great, but it doesn't feel "of the web".

The problem is: browsers are pretty poor when compared to the proprietary and closed platforms they're constantly compared to.

There's pressure (from SF/Apple/who knows) to deliver web sites that feel "native" (no, I won't define this) and browsers are always playing catch up with native, proprietary platforms: this is a fact.

Native media elements, native sockets, native audio, native push notifications, native control over network - this all took it's merry time to get the browser. So when a company decides that the tried and tested approach to styling at list of articles won't give them the unique UX they want *and* the 60fps interaction, then of course they're going to bake up their own technology (in Flipboard's case, re-inventing wheels with canvas...the *exact same way* [Bespin](http://ajaxian.com/archives/bespin-a-new-mozilla-labs-experimental-extensible-code-editor-using-canvas) did back in it's day).

## But...how would a thick-client work without JavaScript?

Angular, for instance, does not have a developer story for how to develop a site with progressive enhancement as a baseline.

Does this mean it's not possible? I don't think so. Without the stories though, developers will gravitate towards solved problems (understandably).

**What does this story look like when a framework is a prerequisite of the project?**

## Web Components

Web Components are a hot debate topic. They could cause all kinds of mess of the web. On the other hand, they're also a perfect fit for progressive enhancement.

Take the following HTML:

```html
<input type="text" name="creditcard" required autocomplete="cc-number">
```

Notice that I'm not using the `pattern` attribute because it's hard to match correctly to credit cards (they might have spaces between groups of numbers, or dashes, or not at all).

There's also no validation, and the first number also tells us what kind of card is being used (4 indicates a Visa card for instance).

A web component could progressively enhance the element similarly to the way the browser would natively enhance `type="date"` for instance.

```html
<stripe-cc-card>
  <input type="text" name="creditcard" required autocomplete="cc-number">
</stripe-cc-card>
```

I wonder, **are web components the future of progressive enhancement?**

## Potential problems on the horizon

Developers are inherently lazy. It's what makes them/us optimise our workflows and become very good at solving problems. We re-use what's known to work and tend to eke out the complex parts that we can "live without". Sadly, this can be at the cost of accessibility and progressive enhancement.

I think there's some bigger potential problems on the horizon: ES6 - esnext (i.e. the future of JavaScript).

### "But progressive enhancement has nothing to do with ES-whatever..."

Taking a step back for a moment. Say we're writing an HTML only web site (no CSS or JS). But we want to use the latest most amazing *native* email validation:

```html
<input type="email" required>
```

Simple. But...what happens *if* `type="email"` isn't supported? Well, nothing bad. The element will be a text element (and we can validate on the server). *The HTML doesn't break*.

JavaScript isn't quite the same, but we can code defensively, using feature detection and polyfills where appropriate.

ES6 has features that breaks this design. Syntax breaking features that cannot exist alongside our ES5 and cannot be polyfilled. It must be transpiled.

### Syntax breaking

There's a small number of ES6 features that are syntax breaking, the "[arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)" in particular.

This means, if the arrow function is encountered by a browser that doesn't support ES6 arrows, it's cause a syntax error. If the site is following best practise and combining all their JavaScript into a single file, this means that *all* their JavaScript just broke (I've personally seen this on JS Bin when we used [jshint which uses ES5 setters and broke IE8](https://github.com/jsbin/jsbin/blob/b1e56287d668818b361bc71b299fc36b707f9e6e/views/index.html#L311-L320)).

I've asked people on the TC39 group and JavaScript experts as to what the right approach here is (bear in mind this is still early days).

The answer was a mix of:

- Use feature detection (including for syntax breaking features) and conditionally load the *right* script, either the ES5 or ES6
- Transpile your ES6 to ES5 and make both available

This seems brittle and the more complexity the more likely that as time goes by, new projects will leave out the transpile part, and forget about supporting older browsers - or even newer browsers that don't ship with ES6 support (perhaps because the VM footprint is smaller and has to work in a super low powered environment).

Since JavaScript doesn't exhibit the same resilience that HTML & CSS does, so the fear is that it'll leave users who can't upgrade, faced with a broken or blank page.

**Is there a workflow that solves this? Or are we forced to support two incompatible languages on the web?**


## Further reading

- [Progressive enhancement is still important](http://jakearchibald.com/2013/progressive-enhancement-still-important/)
- [Be progressive](https://adactio.com/journal/7706)
- [Everyone has JavaSript, right?](http://kryogenix.org/code/browser/everyonehasjs.html)
- [The True Cost of Progressive Enhancement](http://blog.easy-designs.net/archives/the-true-cost-of-progressive-enhancement/)
- [The Ryanair Approach To Progressive Enhancement](http://christianheilmann.com/2015/05/24/the-ryanair-approach-to-progressive-enhancement/)
- [How to Apply Progressive Enhancement When JavaScript Seems Like a Requirement](http://www.aaron-gustafson.com/notebook/how-to-apply-progressive-enhancement-when-javascript-seems-like-a-requirement/)
- [My Issue with Progressive Enhancement](https://plus.google.com/+ScottJenson/posts/S23BqQsEuvR) ([@adactio's response](https://adactio.com/journal/7774))
- [Progressive enhancement: a history lesson](http://cole007.net/blog/120/progressive-enhancement-a-history-lesson) ([and his reading list](http://readlists.com/c04e56c0/))
- [Why Discourse uses Ember.js](http://eviltrout.com/2013/02/10/why-discourse-uses-emberjs.html)
- [How many people are missing out on JavaScript enhancement?](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/)
- [You're Missing the Point of Server-Side Rendered JavaScript Apps](http://tomdale.net/2015/02/youre-missing-the-point-of-server-side-rendered-javascript-apps/)
- [Progressive Enhancement: Zed’s Dead, Baby](http://tomdale.net/2013/09/progressive-enhancement-is-dead)