---
image: /images/remy-react.png
title: First impressions of React
date: '2016-09-13 15:14:36'
modified: '2016-09-21 15:10:36'
tags:
  - web
published: true
---
# First impressions of React

Ever since I started pondering *[what is React](https://remysharp.com/2016/08/15/what-is-react)* last month, the core idea of state driving my development has been on my mind. I've been trying to do more reading around React, mostly to understand how to use the APIs available (like creating components, events, etc) and trying to grok any of the magic that wouldn't be entirely obvious to me on first review of some React-based code.

Today, I spent about 3-4 hours coding up a small part of a project I'm working on. I thought it might be useful to share my thoughts, but also some of the thoughts I had of that first impression.

**Big ol-british disclaimer:** this post is based on *hours* of work. Not days. I do not have a full understanding, and it's likely I'm doing stuff "wrong" (in a similar way that I've heard things like "that's not the *Angular* way of doing things"). But, as someone who generally avoids adding in large 3rd-party JavaScript, if you're like me, this might help with some insight.

<!--more-->

## The problem space

I have a relatively simple web app to build (a closed system with only a little interface to perform a single task). The start of the problem (that I wanted to solve) was simple:

> Create a list of items, with a form to add items and a control to filter those items.

And yes, now I put it in writing, that *does* sound a lot like [todoMVC](http://todomvc.com/examples/react/)!

## Setting a benchmark

I'm good at vanilla JavaScript, and I'd already written a data binding library ("cleverly") called [bind.js](https://github.com/remy/bind.js/), and using bind.js to solve the problem took roughly 30 minutes to code (as the author, I have an deep understanding of bind.js).

Bind.js is a 2-way data binding library that uses DOM selectors to target elements, and an augmented object that tracks changes via setter hooks.

[The solution isn't super pretty](https://rem.jsbin.com/raboqe/3/edit?js,output), but again, it was 30 minutes of dev and does the trick. However, there's one line of code in the filter callback that I didn't like:

```js
this.list.map((item, i) => {
  // ...snipped
  // replace the old entry
  this.list.splice(i, 1, item);
})
```

The `splice` felt brittle. It's also mutating the data in a pretty aggressive manner. Finally, I wasn't sure I could continue using bind.js for the rest of the app.

Whereas React should be able to do this stuff well (from what I understand), it can do more (like the app routing) and React should also let me move all the JavaScript into the server so that it's a Progressive Enhancement (whereas bind.js would use PE, but it would be more work and duplication of logic).

## Starting out with React

I had a couple of false starts with trying [create-react-app](https://github.com/facebookincubator/create-react-app), [react-boilerplate](https://github.com/mxstbr/react-boilerplate) and another that I forget.

The reason for the false starts is that they contained _way_ too much code and structure and expected understanding. I believe they'll be super useful once there's some understanding and ability to navigate the logic behind React apps, but for starting out, I needed to be closer to the metal, I needed to see the direct output of my coding efforts.

Equally, I wanted to avoid build steps at this stage. I'm debugging in Chrome, so I've got most of ES6, so I don't need babel. I am using JSX (which I'll come to), so I wanted to transform this in the client (obviously for development only).

⚡️ The most useful resource for me, for walking through the code and how the components compose, was [Facebook's own React tutorial](https://facebook.github.io/react/docs/tutorial.html). It's good because it takes a comment list and comment box as a tutorial, which I've got a good understand how it should work, and I can understand how it would want to be composed together (without even looking at any code).

[James Long's post entitled "Removing User Interface Complexity, or Why React is Awesome"](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) is also an excellent, excellent resource for someone like me who favours vanilla JavaScript to understand a problem.

## Turning in my grave: JSX

I was there at JSConf US in May 2013 when React was open sourced and they showed off the JSX syntax. Many of us also threw up a little in our mouths. But hey, some people (actually: many people) like it.

So what's to like? And why did I use it instead of vanilla JavaScript when I'm a vanilla guy?

Well, it's quicker to code, that's for sure, but [this](https://facebook.github.io/react/docs/jsx-in-depth.html#why-jsx) from the React site nailed it for me:

> […However] we recommend using JSX because it is a concise and familiar syntax for defining tree structures with attributes.

HTML(like) syntax is concise compared to coding up a new `div` using JavaScript and then adding each property, making sure strings are escaped (or not), etc.

To be super, super clear though (in my opinion, and I suspect this is the party line anyway): JSX should not land in the client at all. It should already be transformed.

I like writing large swaths of HTML using Jade. I don't like *myself* for liking Jade over HTML, but it gets the job done for me.

I gave in to JSX in a similar way. There are some [gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html) documented, and there are some that aren't (or not in the gotcha list anyway) which I'll come to.

## For prototyping I will need…

The [React and ReactDOM library](https://facebook.github.io/react/docs/getting-started.html#starter-pack) (which I got from the starter pack), and the [JSXTransformer](http://todomvc.com/examples/react/node_modules/react/dist/JSXTransformer.js) (though deprecated, I had to lift it from TodoMVC/React).

The reason I didn't want to use babel/browser.js (the recommend client transformer) is that it's a whopping 1.9Mb of JavaScript, whereas JSXTransformer is 480K. Even when you're running in development mode *and* offline, 2Mb of JavaScript is going to slow things down.

Now I've got my minimum requirement to start coding. Notice that I don't have any build tools. That's good. The client transform costs me the ability to live-code in the browser ([as I like to do](https://remysharp.com/2013/07/18/my-workflow-v3-full-coding-stack)).

Since I can't code directly in the browser, I ran a local static server using [`live-server`](https://www.npmjs.com/package/live-server) (static server with live-reload baked in).

The code in `index.html` looks like this (yeah, there's [no body](https://www.youtube.com/watch?v=32wer_j5soQ&index=1&list=PLXmT1r4krsTrXThZIxcnzogf_YLOHRUZv)…):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Simple react</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="react.min.js"></script>
  <script src="react-dom.min.js"></script>
  <script src="JSXTransformer.js"></script>
</head>
<body>
</body>
</html>
```

## Composing components

"Composing" and "components" were two words that kept coming up, but after reading the Facebook React tutorial, and thinking about how this list would work, it does make sense. I'd need components for the following (pseudo-XML):

```xml
<MessageList>    // the app
  <Filter />     // user input
  <Messages>     // list of messages
    <Message />  // individual messages
  </Messages>
  <NewMessage />
</MessageList>
```

So that's the `Message` component being composed into `Messages` and so on. I watched (at 2x speed) this interesting 30 minute talk on [re-write to React](https://www.youtube.com/watch?v=BF58ZJ1ZQxY). The gist being: the lowest leaf can be written as a React component, and then working *up* the chain, each component can be refactored to React and composed into the application.

💡 I wondered whether I actually needed web components. Would this do the same job? In theory, they map to regular HTML components (like `input`, `tr`, `div` and so on), so they're compose-able by default.

But then…I wondered if web components can progressively enhance. I _think_ they can, but honestly, I don't know. I've never felt like they've been adopted the way the web developers had hoped.

## A sample of the work

After ~3-4 hours of work, I got the list and filtering working (I didn't get the form to create new messages, but I will do).

The main component is the `Messages` one that looks like this:

```js
const Messages = React.createClass({
  render() {
    const byDate = this.props.data.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = [];
      }

      acc[curr.date].push(curr);

      return acc;
    }, {});

    const dates = Object.keys(byDate);

    const messageNodes = dates.map(date => {
      const nodes = byDate[date].map(data => {
        return (
          <Message number={data.number}>{data.text}</Message>
        );
      });

      return (
        <div>
          <h3>{date.string}</h3>
          <ul className="list">
            {nodes}
          </ul>
        </div>
      );
    });

    return (<div>{messageNodes}</div>);
  }
});
```

## First impressions

🚨 The biggest issue I ran into (that I didn't understand) was why I had to wrap everything up in a `div`. The code I thought I could use was effectively above, minus all the `div`s, yet the JSX transform kept blowing up saying it wasn't legal (possibly the babel/browser library might have helped with better errors?).

I got the answer from a Slack forum that I needed to `return` a single top-level node. I wasn't sure what that meant, but now, as I write this post, I realised.

If I transform the XML (in my head) I can visualise that I need to return a single object from the `render` function: the result of `React.createElement(…)`. It doesn't matter if that element has many nested elements, I have to return a root element for the render to work. Hence the divitus.

🚨 Once I had wired up the state emitting from the `Filter` component, _up_ to the parent `MessageList` which then updates `state.data` which triggers an update to the `Messages`, it _kinda_ felt like I was just triggering events and reacting to them.

Similarly to the architecture that the state machine library, Machina.js uses (I recalled this excellent talk from [Doug Neiner at jQuery 2013](https://vimeo.com/67473899))*.

<small>* I later read that [_components are Just State Machines_](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#components-are-just-state-machines), which supports my initial gut feeling</small>

But realising this sort of bummed me out. I was using the "super cool" React, only to write everything for myself and just pass events up the chain. Heck (I _thought_) I could write this myself!

But it's also things like the `onChange` properties that make me cringe a little. I'm using writing code that's DOM scripting, and this doesn't *feel* like it is.

This isn't so at all. I know this without even looking at the code. But here's the DOM to prove it:

![Devtools react onchange listener](/images/react-input-onchange.png)

Notice that the DOM *doesn't* have an `onchange` and in fact the change event listener is sitting on the `document` root element. A pretty good approach in my opinion.

🚨 The setup feels very heavy. I also suspect I'm going to have a bit of a battle on my hands when it comes to building for production, because I hate messing around with build tools, and if the boilerplate examples I've found are anything to go by, there's a *lot* more code and fuss to add.

🚨 Although I'm not horrified by JSX (any more), I would like to try out the same program _without_ it and using vanilla JavaScript to generate my DOM. Even more appealing would be to have the templates in HTML, and have them sucked into my JavaScript and dynamically converted (though…am I just reinventing JSX in the process…?!).

The only additional quirk of JSX is that HTML properties that I'm used to don't always get applied. I added an `autofocus` and then `autofocus="true"` and the final rendered DOM was missing the property. It only worked when I used `autoFocus="true"`…which wasn't intuitive at all.

🚨 The "server-side React" articles that I've skimmed are making me reasonably confident that I can port all, if not *nearly* all this code to the server and make it drive the server side rendering (and potentially throw away the client side code…maybe). This is definitely compelling, but I'm not there yet.

🚨 There's a lot more code compared to my bind.js version, but this code *does* feel robust. How does that weigh against the fact that I can hack solutions faster when I mess directly with the DOM? I'm not sure.

🚨 When I come across the occasional "Caution: Never access refs inside of any component's render method" ([here](https://facebook.github.io/react/docs/more-about-refs.html#cautions)) it worries me that a small mistake comes with a *\_never\_* warning. Like…how badly will my my browser blow up!?

🚨 [devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for React isn't bad either, gives you a view on the component tree I rendered, access to mess with the state directly from the devtools sidebar.

## Yeah, but what do you think, Remy?

I'm going to stick with it. I feel like if it doesn't suit the entire application design, then I can either use it for a part of what I'm doing. I definitely feel like moving towards a state managed design is a positive thing for my coding.

I'll be looking at the React Router next, then porting my code to the server (before I get too deep in client-side code).

I think the next important steps will be to validate code design, typically this would be done with either a peer review or code review for a senior developer. Alas, poor me, I'm not in that position as I work alone (so you _may_ see some random tweets in the coming week!).

---

## TL;DR 🐎

- There's a tonne of resources out there, but it's really hard to be sure where to start since there's so many resources and tutorials.
- If you're curious, try to focus on React first, ignore the extra flux, redux, donaldux etc extra bits.
- JSX isn't so bad (and made coding components faster), once I got over myself.
- It all just feels a bit simplistic (at this stage), effectively it _feels_ like a simple state machine and it reminded me of [Doug Neiner's Machina.js talk](https://vimeo.com/67473899).

Again, this was just a tip of the iceberg. I'm no fool. I know there's more to React than this. I'm trying to build a web app that uses progressive enhancement as a design principle with state as a core value to the coding approach.
