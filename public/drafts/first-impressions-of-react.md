# First impressions of React

Ever since I started pondering *[what is React](https://remysharp.com/2016/08/15/what-is-react)* last month, the core idea of state driving my development has been on my mind. I've been trying to do more reading around React, mostly to understand how to use the APIs available (like creating components, events, etc) and trying to grok any of the magic that wouldn't be immediately obvious to me on first review of some React-based code.

Today, I spent about 3-4 hours coding up a very small part of a project I'm working on. I thought it might be useful to share my thoughts, but also some of the thoughts I had of that first impression.

**Big ol-british disclaimer:** this post is based on *hours* of work. Not days. I do not have a full understanding, and it's likely I'm doing stuff "wrong" (in a similar way that I've heard things like "that's not the *Angular* way of doing things"). But, as someone who generally avoids adding in large 3rd-party JavaScript, if you're like me, this might help with some insight.

<!--more-->

## The problem space

I have a relatively simple web app to build (a closed system with very little interface to perform a single task). The start of the problem (that I wanted to solve) was simple:

> Create a list of items, with a form to add items and a control to filter those items.

And yes, no I put it in writing, that *does* sound a lot like [todoMVC](http://todomvc.com/examples/react/)!

## Setting a benchmark

I'm very good at vanilla JavaScript, and I'd already written a data binding library ("cleverly") called [bind.js](https://github.com/remy/bind.js/), and using bind.js to solve the problem took roughly 30 minutes to code (obviously I have an deep understanding of bind.js).

Bind.js is a 2-way data binding library that uses DOM selectors to target elements, and an augmented object that tracks changes via setter hooks.

The solution isn't super pretty, but again, it was 45 minutes and does the trick:

<!-- <a class="jsbin-embed" href="https://jsbin.com/raboqe/embed?js,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.39.15"></script>-->
However, there's one line of code in the filter callback that I didn't like:

```js
this.list.map((item, i) => {
  // ...snipped
  // replace the old entry
  this.list.splice(i, 1, item);
})
```

The `splice` felt britle. It's also mutating the data in a pretty aggressive manner. Finally, I wasn't sure I could continue using bind.js for the rest of the app.

Whereas React should be able to do this stuff well (from what I understand), it can do more (like the app routing) and React should also let me move all the JavaScript into the server so that it's a Progressive Enhancement (whereas bind.js would use PE, but it would be more work and duplication of logic).

## Starting out with React

I had a couple of false starts with trying [create-react-app](https://github.com/facebookincubator/create-react-app), [react-boilerplate](https://github.com/mxstbr/react-boilerplate) and another that I forget.

The reason for the false starts is that they contained _way_ too much code and structure and expected understanding. I believe they'll be super useful once there's some understanding and ability to navigate the logic behind React apps, but for starting out, I needed to be closer to the metal, I needed to see the direct output of my coding efforts.

Equally, I wanted to avoid build steps at this stage. I'm debugging in Chrome, so I've got most of ES6, so I don't need babel. I am using JSX (which I'll come to), so I wanted to transform this in the client (obviously for development only).

**The most useful resource** for me, for walking through the code and how the components compose, was [Facebook's own React tutorial](https://facebook.github.io/react/docs/tutorial.html). It's good because it takes a comment list and comment box as a tutorial, which I've got a good understand how it should work, and I can understand how it would want to be composed together (without even looking at any code).

[James Long's post entitled "Removing User Interface Complexity, or Why React is Awesome"](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) is also an excellent, excellent resource for someone like me who favours vanilla JavaScript to understand a problem.

## Turning in my grave: JSX

I was there at JSConf US in May 2013 when React was open sourced and they showed off the JSX syntax. Many of us also threw up a little in our mouths. But hey, some people (actually: many people) actually quite like it.

So what's to like? And why did I use it instead of vanilla JavaScript when I'm a vanilla guy?

Well, it's quicker to code, that's for sure, but [this](https://facebook.github.io/react/docs/jsx-in-depth.html#why-jsx) from the React site actually nailed it for me:

> […However] we recommend using JSX because it is a concise and familiar syntax for defining tree structures with attributes.

HTML(like) syntax is consice compared to coding up a new `div` using JavaScript and then adding each property, making sure strings are escaped (or not), etc.

To be super, super clear though (in my opinion, and I suspect this is the company message anyway): JSX should not land in the client at all. It should already be transformed.

I like writing large swaths of HTML using Jade. I don't like *myself* for liking Jade over HTML, but it gets the job done for me.

I gave in to JSX in a similar way. There are some [gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html) which are documented, and there are some that aren't (or not in the gotcha list anyway) which I'll come to.

## For prototyping I will need…

The [React and ReactDOM library](https://facebook.github.io/react/docs/getting-started.html#starter-pack) (which I got from the starter pack), and the [JSXTransformer](http://todomvc.com/examples/react/node_modules/react/dist/JSXTransformer.js) (which I believe is depricated, or certainly I had to lift it from TodoMVC/React).

The reason I didn't want to use babel/browser.js (the recommend client transformer) is that it's a whopping 1.9Mb of JavaScript, whereas JSXTransformer is 480K. Even when you're running in development mode *and* offline, 2Mb of JavaScript is going to slow things down.

Now I've got my minimum requirement to start coding. Notice that I don't have any build tools. That's good. The client transform costs me the ability to live-code in the browser ([as I like to do](https://remysharp.com/2013/07/18/my-workflow-v3-full-coding-stack))




