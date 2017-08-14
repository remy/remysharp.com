# Me on React: an old dog with new tricks

Over the years I've been consistently uninterested in using the new slew of frameworks and libraries that have been released. By no means is this because they're bad at all, but because my particular kind of work didn't require it. However, in the last 12 months I've made significant use of React and have even released a few client projects using it. So what's changed for me? As someone who's very much "pro vanilla" and bare-metal JavaScript, why have I changed my mind so significantly?

This post really isn't for those developers out there who use tools like React daily (or Vue, Polymer, etc), but for those old dogs like me that have been resisting (for whatever reason) the new technology. Probably the old dog [standardistas](https://en.wiktionary.org/wiki/standardista).

This post is written for an earlier version of me. It doesn't contain silver bullets or very much code, but hopefully it does put lay some of my previous fears to rest.

<!--more-->

Below I've tried to outline what my original concerns _were_ and how they've been mitigated in some way or another.

## 😵🔨 Overhead of tooling

This was and continues to be one of my biggest concerns when it comes to daily development. Technology is difficult enough when it moves as quickly as it does (I'm speaking in broad terms). We don't need to *know* everything, but it certainly helps if we're aware of everything. I remember an old project manager asking me if we should use "comet" for some software solution back around 2006 (when the concept was coined!).

So the thought of having to add some new build process to my current workflow was an initial hurdle that I really didn't want to overcome. Currently I know of grunt, gulp and webpack, but I'm 100% certain there are more tool runners and special configurations that you'll need to learn to get past the very, _very_ first step.

**Enter Create React App** (henceforth known as CRA in this post). In my very first foray I tried to use CRA but got overwhelmed by the generated files, directory and config, so I aborted. Thankfully, I revisited it again a few months later, either armed with a little familiarity with React components or perhaps the config was hidden, but the big, nay *huge*, benefit was that **the configuration is entirely hidden** (though you _can_ eject CRA and manually tune the configuration).

**It meant that I could get up and running with zero configuration and I could write code and see results.**

### 😐🖍️ A side note about styled components

As you might have guessed from my emoji title: I'm not sold. I _think_ I understand the point of styled components, in that it will allow for the browser delivered code to include only the CSS required, but I'm still a little long in the tooth for this modern method.

In truth though, I don't know enough about the ideas behind this approach to adopt it myself. I _feel_ (read: my gut thinks, and very little else) that styles should be kept in stylesheets and not be modified at the wim of every component that uses them. i.e. if a button style is used, it shouldn't be changed at the component level, but changed across the board of the code to consistently affect every button element. Or if it's a single "tweak" required, then it's still needed at the high level of globally accessible styles, as I've learnt over the years: it's never _just once_.

Bottom line though: I don't have a strong reason to use these, and I'm not entirely sure it benefits the standardista inside of me.

## 😭♻️ Reloading and losing state

I've posted previously about [my workflow](https://www.youtube.com/playlist?list=PLXmT1r4krsTq7w7hDV6zfirrs4NJlzJX5) and to this day, I still use devtools for development. An important factor of using devtools is maintaining application state both for debugging but also for general development.

This means that I've interacted with my software, perhaps entered some value into a form, and when a small amount of code changes, either JavaScript or CSS or even some HTML, I do not want the state of my application to change, but only to inject and recognise the small change I've made.

The problem *that I have* with build tools that transpile my code to browser friendly JavaScript is that the browser quite often has to reload to recognise the newly built code. In a few examples I've tried using Angular and using System.js they both relied on a live-reload component that would reload my browser when I saved in my editor (which makes things even more confusing when the editor is devtools).

**React's hot module reloading avoids this for the most part.** What HMR gives me is that when a single component is changed, it is dynamically recompiled and injected into. This is an "old" (2 years) [talk by Dan Abramov explaining how HMR works](https://www.youtube.com/watch?v=xsSnOQynTHs), in particular the core concept is explained around the 7 minute mark.

CRA has HMR turned off by default, but it doesn't require much to enable it. The `index.js` is changed as such:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <App />,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}
```

Note the original source for this code is [Chris Shepherd](http://chrisshepherd.me/posts/adding-hot-module-reloading-to-create-react-app). I've also used [this code](https://gist.github.com/remy/b0b25036b2254d200917e976fdc3eed0) for a few development projects and it works well.

Finally, this [twitter thread](https://twitter.com/dan_abramov/status/843127250329489409) also points to why HMR not turned on by default.

---

With HMR I'm able to maintain a large amount of application state when I'm making changes throughout my software.

For CSS, I do have the option to `import` CSS directly into React components (as you see above in the earlier example) but I'm not 100% sure why I would want to. I _think_ it might be to encourage the component architecture in the CSS, or perhaps to do with code-splitting and component dependencies (but I again, I'm not entirely sure).

If I move the CSS to the `public` directory, now I'm able to map the directory in devtools and make direct changes inside of the elements and sources panels.

**Hot module reloading retains a large amount of state, and putting CSS in to the static served directories means I can use devtools to manage styles.**

## 😨📡 Server side support

I've spoken to a lot of individuals that I would call standardistas who have stories of projects being handed over to a React chopshop and server side support, SEO and all the rich goodness of a server delivering the content is thrown out the window.

My sense having spoken to more individuals is that server side rendering (SSR) is an extra mile that is often left off as not required or valued enough. **This is my own finger-in-the-air opinion, please don't take it as gospel**. Though I wonder if BigQuery could answer this question…

To me, a growing oldie on the web, even the phrase "server side render" makes no sense, since the server *has* to render. You can't get a client without the server (also see rants on "serverless" on twitter!). And why would a developer purposely lose the speed benefits of delivering a fully rendered tree to the client escaped me. The answer of course was: it's hard.

**SSR is entirely possible with React and just requires a little diligence to get the work done.** I've written about [SSR](https://remysharp.com/2016/12/07/server-side-react) before, but [Jack Franklin has an excellent introduction](https://24ways.org/2015/universal-react/) to this and how to solve SSR with React.

More recently [Next.js](https://github.com/zeit/next.js/) has come onto the scene which embraces SSR at it's core and takes the React framework to make "universal" JavaScript out of the box (universal being JS that can be run on both the server and the browser). It's a small mind shift when it comes to routing and directory structure, but it's frighteningly straightforward to follow a few of the examples from the [documentation](https://github.com/zeit/next.js/blob/master/readme.md) to get a SSR React application up and running.

*Related: I've started a [video course on Next.js](https://app.convertkit.com/landing_pages/239554?v=6) that you can sign up to find out more about.*

The Next.js Github repo includes a [great deal of examples](https://github.com/zeit/next.js/tree/master/examples/) that cover different uses too, and in addition I completed a project for [Brad Frost](http://bradfrost.com/) that uses Next.js to deliver the application earlier this year.

Below is an incredibly small demo of a web site that only prints the number of times the page has been loaded locally. It uses React and Next.js together, and importantly, to read the querystring from the initial request, Next provides a special `getInitialProps` method which is used to populate the component's properties.

```js
// filename: pages/count.js
import { Component } from 'react';
import Link from 'next/link';

class Count extends Component {
  // getInitialProps allows my component to read the query string (amongst other properties)
  // this function will run for the very first time on the server when the user requests
  // this page (/count).
  static getInitialProps({ query }) {
    const { count = 0 } = query;

    // the object I return will be passed to my component as `props`, so now the props.count
    // property will be the value of the querystring.count (or zero as I am defaulting the value)
    return { count };
  }

  constructor(props) {
    super(props);

    // inside the component, I'm actually using a state value, so that it'll change every time
    // the component receives an update - but will *always* reset back to the query string
    // value set in `getInitialProps` on a full server load
    this.state = { count: parseInt(props.count || 1, 10) };
  }

  // this handler fires when the user clicks on the <Link> element that I rendered, which
  // is my chance to either read the count from props - which would have been re-loaded in
  // `getInitialProps` in a client side load, or if it's not present, we'll increment the
  // state value
  componentWillReceiveProps(nextProps) {
    this.setState({ count: parseInt(nextProps.count || this.state.count + 1, 10) })
  }

  render() {
    const { count } = this.state;

    // important to note: I am wrapping my <a> elements in a <Link> element. This will
    // "enhance" the anchor so that it can load the page locally, without the round trip
    // to the server.
    return (
      <div>
        <p>This page has been locally <Link href={`/count`}><a>loaded</a></Link> {count} {count > 1 ? 'times' : 'time'}.</p>
        <p>To manually change the number, use the query string: <Link href={`/count?count=${count + 1 }`}><a>?count={ count + 1 }</a></Link></p>
      </div>
    );
  }
}

export default Count;
```

Next provides a great deal of hidden magic, including JSX support without having to include the react module, but also handles the routing (based on the `pages` directory) and all the rendering. Here's a [Glitch that you can remix](https://glitch.com/edit/#!/remy-next-demo?path=pages/index.js:3:1) and have a play around with too.

A quick proof of concept can be seen using `curl` and scrapping the `p` element (aside: [scrape](https://www.npmjs.com/@remy/scrape) is a custom tool I wrote):

```bash
$ curl https://remy-next-demo.glitch.me/count\?count\=10 | scrape p --text
This page has been locally loaded 10 times.
To manually change the number, use the query string: ?count=11
```

This shows that the server isn't just sending an empty `body` tag and indeed rendering on the server fist.

**Server side support does come at a price, but is not particularly harder than the client side react logic. Using Next it comes for free, but (again) at the price of a much higher abstraction.**

## 😟 Overcoming trade-offs

There's a handful of trade-offs that I've personally noticed or I bump into regularly. The first, that will affect every author using a library or framework to some level of degree: _abstraction_.

### Abstractions everywhere

I remember when I was starting out with jQuery (pre 1.0) and I'd often refer to the result of the `foo = $('div')` expression as "an array-like object". I knew that I could access `foo[0]` and it would give me the first element, like an array, and I could access `foo.length`, like an array, but it wasn't an array.

It was only until I had read through and understood a decent portion of jQuery's source code did I understand that it was borrowing the array `push` method to push elements into an object. Or why modifying `jQuery.fn.plugin = bar` would upgrade _all_ jQuery instances.

Abstraction is everywhere, so I believe you either have to accept that you don't fully understand what's going on under the hood (this is how I feel about Next.js right now, because I've not reviewed any of the source), or you do a little research to understand how the fundamentals work.

For me, reading [this post](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) was an excellent resource. Also some reading or videos (sorry, no good links) about the Virtual DOM helps a great deal.

### What stacktraces?

I've had mixed experience with stacktraces and React. In fact, the current version of CRA comes with a really good error reporting system that gives me both the source trace (which is often useless to me), but also offers a mapped trace (showing my original code), and rather magically clicking on the line will jump open to Sublime in the file and line in question. All this is overlaid in the browser window and can be dismissed if I want to ignore the error and continue with the app.

However, I've also experienced the version of reporting that's so abstracted from my code and original source that the only clues I have to the location of the error is by asking myself: what did I just change? Frustratingly Next.js (at present) suffers from this in my experience with it.

I'd also say, if I didn't have CRA to build my initial setup, I'd likely be in a mess of abstracted stacktraces.

Sadly I've had poor experience of error reporting in production. Sourcemaps seem to never really help me, and I'm left attempting to diagnose issues based on a hot mess of useless traces. I expect that this is another learning curve or tool or something that I need to discover.

All in all, it's not absolutely terrible, but for me, that's entirely down to CRA.

### All the scaffolding

As a one person shop, this comes off as slightly tedious having to create a container, then a component, but I can see the benefit when sharing code with others, specifically: having a shared dialect as to how code is structured and arranged

A perceived forced structure, "finding the react way of doing things" - though I suspect all frameworks suffer from this, and there's some degree in which you can bend the rules

## 😍 Wins

This article has a number of frustrations that I've overcome, though it's more to reassure you, my dear reader, that the landscape really isn't as hard as I had expected.

However there's some *really* nice wins that come with React (and I honestly suspect this is the case with other frameworks and modern libraries available today).

I've outlined a few and included why they're important to me.

### Real components

The component system that React relies on naturally puts your code into small modules designed to do a single thing. This approach has long been my aim in development, but always tricky to pull off consistently across projects.

Boilerplate aside, the most of the single files in projects I've worked on are about two scroll heights of my editor. What's important about this is that it makes debugging, testing and upgrading much easier since there's less moving parts in a single file.

Components can pull in other components and so on and the architecture organises itself in a sensible and pleasant to work with way.

### Structure

Components lead nicely to structure of files. Another thing that I've personally found hard to consistently carry across different projects. Except with React. There's a number of patterns that dictate what a directory will be called (though not enforced). I recently completed a Next based project, and one of the most pleasing aspect as developer was the final directory structure.

Anything that helps me to create a consistent and replicable project structure is extremely valuable.

### State machine

One of the more popular state machine libraries for React is Redux (based around Flux, though I've personally never used Flux).

I got hooked on the idea of state machines in software way back in my university days (the late 90s), then again with a talk at jQuery UK 2013 by [Doug Neiner](https://vimeo.com/67473899). Then after 30 minutes of watching Dan Abramov egghead (free) video tutorials [on how Redux works](https://egghead.io/courses/getting-started-with-redux), I was hooked 100%.

I'm a huge fan of state machines because they make developing, debugging and testing a lot simpler. This is because instead of relying on any number and combinations of user input to set my application to a specific state, I'm able to manually set the state and inject it into my system to see how it behaves (and make any necessary changes there and then).

---

There's a huge ecosystem around React which means there's going to be more wins to be found. One of the next items I'd like to try out [Storybook](https://github.com/kadirahq/react-storybook) which promises to let me build and design components in isolation (whereas before I was putting them individually into test pages).

Hopefully this was useful for one or two of you. Feel free to shoot me any questions you might have in the comments or as a blog post and I'll do my best to share my experience.
