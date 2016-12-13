# Server Side React

Even before I watched Node.js being revealed to the greater world at jsconf.eu 2009, I had been keen to solve the problem of universal JavaScript. That is to say: a single code base that runs both on the server and on the client. I remember tinkering with [Rhino for SS JavaScript](http://ejohn.org/blog/bringing-the-browser-to-the-server/) and [Apatana's Jaxer](http://ajaxian.com/archives/aptana-releases-jaxer-ajax-server-built-on-mozilla), but I didn't get far. Node.js allowed me to flirt with the idea, but I quickly realised that a single code base wasn't quite achievable without a lot of help.

In a recent client project, I decided to try out using React [for the first time](https://remysharp.com/2016/09/13/first-impressions-of-react) and quickly also decided to use it for my server side rendering. I'm writing up my experience, and split this post into a high level learnings and the second post will be technical details of the implementation.

<!--more-->

---

I wanted to take a moment to point out that this post really isn't written for developers already quite comfortable with React or any other flavour of high level JavaScript project. It's from a developer who prefers to be very close to the metal (aka Vanilla JS), and I hope it will help others in a similar position as I have been: on the fence waiting for it all to fall apart!

---

## TL;DR

Approach:

- I can see how progressive enhancement would be skipped, and perhaps graceful degradation would be used to achieve a universal application
- There's no single guiding approach on how to support the server side
- IHMO React has the "jQuery of today" badge (but why doesn't fit in the TL;DR, so read on!)

After around 7 days of learning and development, the final technology comprised of:

- Node 6
- Express.js
- Babel
- React
- React Router
- Redux
- A small number handful of polyfills for production build
- Webpack

For development, I also used a custom route that the main client bundle would be served from, that was compiled on the fly via webpack which made things a little faster.

Every page had a URL, and every URL could be requested using cURL to view complete content, that is to say: as a benchmark, the entire application worked with JavaScript disabled, and time to first complete render (on a cold cache) was 400ms.

**Bottom line:** React with React Router is absolutely a viable stack for server side. The one thing I'd advise is to find a solid development pattern and use it for your own approach.

---

## Understanding the requirements

Here's how I expected the technology stack to work (from a server side perspective) when a new request is received:

1. HTTP request handled by Express
2. React Router is somehow utilised by Express' routing system
3. The correct React views are rendered into a string (and ideally cached!)
4. Express responds with the HTML string
5. The client bundle see no rendering is required, but normal bindings work

This should work on all URLs that are accessible on the client.

---

I spent a long time (relative to the time spent on this project) trying to understand how to connect the client side routing mechanism to Express running in node. I did use [react-engine](https://github.com/paypal/react-engine/) successful for a while, but had to eject the code towards the end of the project because it restricted how I could actually use React Router.

The final solution is to use a catch all route that hands off to React Router which correctly generates all the markup (as per the sequence described earlier).

The thing that feels a little weird here is that I'm using Express' routing system for the first layer of requests, then I defer to React's router, which, does work, and doesn't create any actual code duplication, but feels…strange.

What I'm left with is "universal JavaScript" that uses React that handles everything the client would see (or specifically *render*).

There is still some server side specific code, and that code is concerned with communicating with databases and responding to non-GET requests, which makes me think of my URL design in a much more RESTful and API-ish way.

I don't need to cover the technical how, because it turns out that Jack Franklin [covered exactly how to approach server side first](https://24ways.org/2015/universal-react/) in his 2015 post on 24ways, and the post is very much what I ended up with (I just wish I'd seen it ahead of time!).

## State management

State was the big attraction to me when considering React. Strictly speaking, React doesn't do state management at all. But what it does naturally encourage is a functional style of programming. Simply put: your functions don't have side effects (like changing or using any variables outside of the functions direct scope).

This functional style meant that when it was time for me to turn to Redux (a React friendly implementation of Flux—which, honestly, I not actually researched at all!), my coding style was ready.

I'm not going to go into what Redux is, but there's some [excellent free video tutorials](https://egghead.io/courses/getting-started-with-redux) by its creator [Dan Abramov](https://twitter.com/dan_abramov). What it does for me, is to start thinking of my software as being a state machine - which makes testing and replicating state very easy. This is good


## Progressive Enhancement

Early on, I had the requirement in my head that I wanted to understand if it was possible to use React to progressively enhance my application. The intention being that I would be able to serve a static version of the site, and enhance to the rich client side experience using React.

I also wanted to see if and how this was possible re-using as much code as possible, thus "universal JavaScript".

In my opinion, an individual or a team starting out, or without the *will*, aren't going to use progressive enhancement in their approach to applying server side rendering to a React app. I don't believe this is by choice, I think it's simply because React lends itself so strongly to client-side, that I can see how it's easy to oversee how you could *start* on the server and progressive enhance upwards to a rich client side experience.

<small>This isn't to say another project (like Vue, Ember, etc) don't, I'm focused entirely on React in this post.</small>

That said, React has a very solid backend system to support server side implementations* using Node, it just took me a while to get my head around it (especially as I was new to using React). The upshot, is that in retrospect, and now that I've had time to review my code after it's all gone live, I'm able to see how I would approach the development tasks in a different order so that I *could* achieve progressive enhancement.

It's also worth saying: that even if I didn't use PE as a development approach, but I'm able to provide that complete experience (say, to a user that didn't manage to download or execute the JavaScript), then the end goal is the same. However, taking the PE approach ensures that as a developer, I don't miss some important aspect of the application's logic (perhaps like a deep URL can be crawled with any browser…like cURL).

**Bottom line:** doable. Whether people *are* doing it is another matter. One thing is clear to me though: it's very much a secondary concern.

## Is React the jQuery of it's time?

I read a post very recently that argued that Vue is the jQuery of it's time. The post mostly pitted Vue against React. I definitely don't agree. For context, jQuery arrived in 2006 and opened the doors to many developers *and* non-developers, to manipulating the DOM using JavaScript. Suddenly interactivity was much easier and jQuery was the tool of choice.

jQuery was not the only tool however, neither was it particularly the "best" tool (Dojo for instance had been around for years prior breaking new ground long before).

What made jQuery a success was two important items:

1. Time to up-and-running, in that you could know nothing about JavaScript, but with a touch of CSS (selectors) and copying a few symbols (like `$`) you could make something move on the page.
2. Documentation, both in official form, but more importantly, community contributed.

The second item is the most important. And by *documentation*, I mean actual docs, API, blog posts, tutorials, videos, conference talks, the lot. It was the spread of knowledge and the ease in which it happened is what allowed jQuery to end up in front of so many developers. *Obviously* the team behind making jQuery work in every browser, and the mobile support, and continued efforts, and everything has a huge importance, but that spread of knowledge…it's that, that got jQuery to critical mass.

For me, as much as Vue looks interesting and certainly easier to get going with, there's a distinct lack of examples across the web, and yes, Vue had just landed 2.0 and which would give me server support - which was a little too new for me, but this is comparison to React. That doesn't mean Vue couldn't grow to be a great (and I remember the old Prototype vs. jQuery discussions of yonder year!).

<p class="update"><small>Note: paragraph above was [updated to correct]() Vue's version release.</small></p>

The more examples and samples and code out on the web, the more edge cases are covered, and the more it helps with the "yeah, but what about when I…" questions. React's community posts could definitely answer a lot of the questions I had. I'm not totally sure we've seen the next Rule Of the Libraries yet though!

## Development approach

Again, for context, I do *a lot* of development [directly in devtools](https://remysharp.com/search?q=devtools) using workspaces and related debugging tools. Due to the work that React does to create the DOM, I was not able to use my normal continuous development and debugging techniques, but there are some useful React and Redux tools available.

Equally, I was using JSX for the *view* part of my code, so I had to use sourcemaps (to make any sense during debugging), but I'm not a fan of sourcemaps which I had to since it specifically prevents me using Devtool Workspaces fully.

I also found Webpack very confusing, there's some much to configure and finding the right setup was tricky (I went through about four iterations). I did find the right setup (for me) in the end, and I'll probably copy and paste it again, but this isn't something I want to have to learn.

Finally, I also settled on a development only dynamic webpack route, that would conditionally load, and server the client bundle based on a development configuration. The development configuration would allow me to use hotloading and few other niceties that I wouldn't need in production. [Here's my webpack configurations and the development middleware](https://gist.github.com/remy/ce019c82940b624de21dcafb3e6f69af).

The hot module reloading for React did work for a lot of the view code, but not for everything (in the client) and did require a refresh of the browser fairly frequently. It certainly helped, but again, wasn't as smooth as my typical development workflow.

**Bottom line:** I would use this approach again. Having a large base of reusable code is very appealing. I'm not sure I have the right development approach (for me), but as with anything, that would come with time. I'm also interested in trying this approach with other JavaScript libraries out there (if possible), including Vue, Ember and Polymer (my brief experiences of Angular so far have been enough for me).


## Miscellaneous notes and resources

The post finished a moment ago, but I wanted to include some of the resources I had found in my research and some of the code and structure I ended up with, so here it is, in all it's unabashed glory.

### Libraries

- [React engine (by PayPal)](https://github.com/paypal/react-engine/) (this is what I started with, but eventually bailed)
- [Express React views](https://github.com/reactjs/express-react-views) (a little closer to the metal)
- [Simple universal](https://github.com/guidsen/react-simple-universal) (though still in development)

### Resources

- [Router tutorials](https://github.com/reactjs/react-router-tutorial)
- [Simplified routing structures](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes)
- [Reducing the size of the final bundle.js](http://moduscreate.com/optimizing-react-es6-webpack-production-build/)
- [Excellent example of specification breakdown into components and containers](http://redux.js.org/docs/basics/UsageWithReact.html#designing-component-hierarchy)

### Concepts: Containers and components

- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.dxeml6nsq
- https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
- https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351

### Quick prototyping

This is super quick, but slow to load, since it's pulling around 2mb over the wire.

#### index.html

From [here](https://gist.github.com/cem2ran/9be3dd3499566302d5ae).

```html
<!DOCTYPE html>
<script src="https://jspm.io/system.js"></script>
<script>
System.config({
  transpiler: 'babel',
  babelOptions: {}
});
System.import('./app.js');
</script>
<body></body><!--need a body for live-reload -->
```

#### app.js

```js
import React from 'react'
import { render } from 'react-dom'

render(<h1>Hello world</h1>), document.body);
```

## Final code structure tree

This is the structure my project ended up with. I'm sure there's different patterns, and in future I _may_ structure a few things differently, but it served it's job and wasn't too confusing to navigate.

```nohighlight
├── actions           # redux actions
├── components        # react views
├── containers        # react components (logic for views)
├── lib               # main server code
│   ├── config
│   ├── db            # database models
│   ├── dev.js        # only used for dev
│   ├── email
│   ├── index.js      # server entry point
│   ├── routes        # server specific routes
│   ├── serve.js      # server side rendering and routing of React app
│   └── views         # server specific views
├── package.json
├── public            # static assets
├── reducers          # redux reducers
├── src               # client side specific boot code
├── test
└── webpack.config.js # npm run build config
```
