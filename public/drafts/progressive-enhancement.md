# Progressive enhancement

I thought that this panel would be about developers not using JavaScript because they were more interested in building high end web apps, full of WebRTC, Web Audio and the like. But it's not.

Here's the thing: most developers, or certainly everyone in this room, everyone watching, everyone reading, see progressive enhancement as a good thing. The "right thing" to do. They understand that it can deliver the site's content to a wider audience.

There's accessibility benefits and SEO benefits. SEO, I've heard directly from developers, is one way that the business has had buy in to taking a PE approach to development.

What is still common is:

> How would the thick-client work with JavaScript disabled?

When PE was first evangelised in 2003 it also included "enhanced layout is provided by externally linked CSS" and the same for JavaScript. However, times have changed. For a fast delivery, [we need to prioritise our CSS](https://youtu.be/d5_6yHixpsQ?t=2m25s) by inlining the CSS for the initial render.










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

## Definitions, history & aims

### What is progressive enhancement?

In Wiki's words:

> ...allows everyone to access the basic content and functionality of a web page, using any browser or Internet connection

<div hidden>while also providing an enhanced version of the page to those with more advanced browser software or greater bandwidth</div>

In my words:

> It's delivering a baseline web site that's usable by the most minimal of requirements (i.e. a browser & internet connection).

In other people's words:

> ...figuring out what is core functionality and what is an enhancement

In no one's words:

> Making everything work without JavaScript enabled

### Aims

> Basic & functionality content accessible all web browsers




* Why is it important
* Is it always appropriate

## So what?

> wouldn't progressive enhancement mean that an app is supposed to work with Javascript disabled?

> PE was used...because of search engine optimisation

## Alternative methods

### Graceful degradation

Where the "full" functionality is delivered to the browser, and then each edge case is catered for, falling back to either disabling functionality or a lesser technology.

W3C's explanation of the difference between PE & GD:

> In other words, graceful degradation starts from the status quo of complexity and tries to fix for the lesser experience whereas progressive enhancement starts from a very basic, working example and allows for constant extension for future environments. Degrading gracefully means looking back whereas enhancing progressively means looking forward whilst keeping your feet on firm ground.


### Unobtrusive JavaScript


### Polyfills

## The common problems

* What about applications where html is irrelevant? Webrtc products?
* what about the cost?
* What about the loss of business


## The new problems

* is there a use case or does it apply to all our work?
* is html limited? Flipboard reinventing rendering (gmail reinvented scrolling before that also due to browser limitations).
* is it just the dinosaurs talking about PE?
* is @sil's diagram missing all the prerequisites about having a computer that boots, starting the browser etc?
* there is *no* PE story for ES6 and 7…so do we just stagnate?
* staircase example, all I see is a route that is blocked to those with mobility challenges.
* Question: does it really matter? A *lot* of developers are building internal tools or time critical campaigns that are aided by missing steps.
* trends of JavaScript being used to replace CSS and HTML.
