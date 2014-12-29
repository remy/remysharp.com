# Maybe the Horse Before the Cart

Or: a server first JavaScript library

Over the last decade there's been huge progress in the field of JavaScript libraries and frameworks. I've even heard people stating that the framework you decide to invest your knowledge in is an important career move.

I don't come from that camp of thinking. I'm old school or more of an old dog. I tend to shy away from frameworks and prefer to be as close to the metal as possible.

But why?

Let's consider the big (current) frameworks: ember, angular, react, polymer, etclib. 

Some are opinionated (forcing you to code the way they need), some require magic attributes on the markup, some don't have markup. 

All the framework make complicated tasks easier due to abstraction, and even this old dog has to admit the appeal. Routing. Templates. Data binding. Data storage. There's lots of great benefits to the frameworks.

But what about without that initial hit. The one where JavaScript hasn't run yet. Akin to the search engine bots that crawl with JavaScript disabled (and yes, Google is doing something here, but the details are currently unclear). 

This is the reason I've always shied away from frameworks. The initial load time when nothing works. A second or "so" of blank screen (or loader) makes no sense when you're trying to render an admin tool. Or even an article of content.

So, what's the answer? Well, when you consider each of these frameworks, the answer is bespoke, and probably not well documented (though [ember is doing work to provide server support]()). Quite often you'll also have to do some magic with a Single Page App (ie. the single page is loaded with a router and then renders the actual page you wanted on the client side).

Often the thinking is "why bother" this is meant to run on the client and it could even run without a server. But that's the rub. You absolutely cannot reach your *client app* because you need a server to deliver it. So let's stop ignoring the server. Let's use it.

Okay, so now we have some server support as part of the framework, but currently this is always an afterthought. Why? Probably because it's a lot of work *just* getting it working in the client.

How about this: the next framework released comes with server support *and* client support.

What would this entail? Well, you can't have 100% parity between the client and server (or at least I don't think you can). But there's a certain number of modules that can be common: routing and the router config, handlers, views and templates, data store and retrieve APIs, business logic (ie. the pure JavaScript). 

I suspect this smells a lot like backbone, and sure, there's probably some server module but again: I want to see the horse put *before* the cart.

