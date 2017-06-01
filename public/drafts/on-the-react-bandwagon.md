# On the React bandwagon

Over the years I've bee consistently uninterested in using the new slew of frameworks and libraries that have been released. By no means is this because they're bad at all, but because my particular kind of work didn't require it. However, in the last 6 months I've made significant use of React and have even released a few client projects using it. So what's changed for me? As someone who's very much "pro vanilla" and bare-metal JavaScript, why have I changed my mind so significantly?

This post really isn't for those developers out there who use tools like React (Vue, Polymer, etc) daily, but for those old dogs like me that have been resisting (for whatever reason) the new technology.

<!--more-->

Below I've tried to outline what my original concerns _were_ and how they've been mitigated in some way or another.

## Overhead of tooling

This was and continues to be one of my biggest concerns when it comes to daily development. Technology is difficult enough when it moves as quickly as it does (I'm speaking in broad terms). We don't need to *know* everything, but it certainly helps if we're aware of everything. I remember an old project manager asking me if we should use "comet" for some software solution back around 2006 (when the concept was coined!).

So the thought of having to add some new build process to my current workflow was an initial hurdle that I really didn't want to overcome. Currently I know of grunt, gulp and webpack, but I'm 100% certain there are more tool runners and special configurations that you'll need to learn to get past the very, _very_ first step.

**Enter Create React App** (henceforth know as CRA in this post). In my very first foray I tried to use CRA but got overwhelmed by the generated files, directory and config, so I aborted. Thankfully, I revisited it again a few months later, either armed with a little familiarity with React components or perhaps the config was hidden, but the big, nay *huge*, benefit was that **the configuration is entirely hidden** (though you _can_ eject CRA and manually tune the configuration).

This is important to me: it meant that I could get up and running with zero configuration and I could write code and see results.

## Reloading and losing state

I've posted previously about [my workflow](https://www.youtube.com/playlist?list=PLXmT1r4krsTq7w7hDV6zfirrs4NJlzJX5) and to this day, I still use devtools for development. An important factor of using devtools is maintaining application state both for debugging but also for general development.

This means that I've interacted with my software, perhaps entered some value into a form, and when a small amount of code changes, either JavaScript or CSS or even some HTML, I do not want the state of my application to change, but only to inject and recognise the small change I've made.

The problem *that I have* with build tools that transpile my code to browser friendly JavaScript is that the browser quite often has to reload to recognise the newly built code. In a few examples I've tried using Angular and using System.js they both relied on a live-reload component that would reload my browser when I saved in my editor (which makes things even more confusing when the editor is devtools).

**React's hot module reloading avoids this for the most part.** What HMR gives me is that when a single component is changed, it is dynamically recompiled and injected into. This is an "old" (2 years) [talk by Dan Abramov explaining how HMR works](https://www.youtube.com/watch?v=xsSnOQynTHs), in particular the core concept is explained around the 7 minute mark.

CRA has HMR turned off by default, but it doesn't require much to enable it. The `index.js` is changed as such:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

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

## Server side support

I've spoken to a lot of individuals that I would call standardistas who have stories of projects being handed over to a React chopshop and server side support, SEO and all the rich goodness of a server delivering the content is thrown out the window.

My sense having spoken to more individuals is that server side rendering (SSR) is an extra mile that is often left off as not required or valued enough. **There is no hard data for this statement**, don't lose your hats over it. Though I wonder if BigQuery could answer this question…

To me, a growing oldie on the web, even the phrase "server side render" makes no sense, since the server *has* to render. You can't get a client without the server (also see rants on "serverless" on twitter!). And why would a developer purposely lose the speed benefits of delivering a fully rendered tree to the client escaped me. The answer of course was: it's hard.

It's not *that* hard. Learning programming or a new framework is hard! Anyway, SSR is entirely possible with React and just requires a little diligence to get the work done.

I've written about [SSR](https://remysharp.com/2016/12/07/server-side-react) before, but [Jack Franklin has an excellent introduction](https://24ways.org/2015/universal-react/) to this and how to solve SSR with React.

More recently [Next.js](https://github.com/zeit/next.js/) came on the scene which embraces SSR and takes the React framework and makes it universal JavaScript out of the box. It's a small mind shift when it comes to routing and directory structure, but it's frighteningly straightforward to follow a few of the examples on the web site to get a SSR React application up and running.

- https://remy-next-demo.glitch.me/
- https://glitch.com/edit/#!/remy-next-demo?path=pages/index.js:3:1

```nohighlight
app
├── package.json
├── pages
│   └── index.js
└── static
```

```bash
$ curl https://remy-next-demo.glitch.me/ | scrape p
&lt;p data-reactid="2"&gt;Welcome to next.js!&lt;/p&gt;
```

## Trade offs

- Abstraction
- Stacktraces
- Scaffolding - as a one person shop, this comes off as slightly tedious having to create a container, then a component, but I can see the benefit when sharing code with others, specifically: having a shared dialect as to how code is structured and arranged
- A perceived forced structure, "finding the react way of doing things" - though I suspect all frameworks suffer from this, and there's some degree in which you can bend the rules

## Wins

- Redux
- Structure





