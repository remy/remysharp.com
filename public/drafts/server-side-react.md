# Server Side React

Even before I watched Node.js being revealed to the greater world at jsconf.eu 2009, I had been keen to solve the problem of universal JavaScript. That is to say: a single code base that runs both on the server and on the client. I remember tinkering with [Rhino for SS JavaScript](http://ejohn.org/blog/bringing-the-browser-to-the-server/) and [Apatana's Jaxer](http://ajaxian.com/archives/aptana-releases-jaxer-ajax-server-built-on-mozilla), but I didn't get far. Node.js allowed me to flirt with the idea, but I quickly realised that a single code base wasn't quite achievable without a lot of help.

In a recent client project, I decided to try out using React [for the first time](https://remysharp.com/2016/09/13/first-impressions-of-react) and quickly also decided to use it for my server side rendering. I'm writing up my experience, and split this post into a high level learnings and the second post will be technical details of the implementation.

<!--more-->

## TL;DR

In my opinion, it's not possible to use progessive enhancement as an approach to building a server side React application. But that's just semantics (possibly of my definition of PE). However I *was* able to finish with a unverisal code base (with a few exceptions that handled server only requirements).

I was not able to use my normal continious development and debugging techniques, but there are some useful React and Redux tools available.

Since I was also use JSX for the *view* part of my code, I had to use sourcemaps (to make any sense during debugging), but I'm not a fan of sourcemaps which I had to since it prevents me using Devtool Workspaces fully.

I also found Webpack very confusing, there's some much to configure and finding the right setup was tricky (I went through about four iterations). I the right setup (for me) in the end, and I'll probably copy and paste it again, but this isn't something I want to have to learn.

**Bottom line:** I would use this approach again. Having a large base of reusable code is very appealing. I'm not sure I have the right development approach (for me), but as with anything, that would come with time. I'm also interested in trying this approach with other JavaScript libraries out there (if possible), including Vue, Ember and Polymer (my brief experiences of Angular so far have been enough for me).

## The project requirements

I'll link to a demo version of the project (since I can't share the client's work) which essentially has these features:

1. List of messages (page)
- Filter messages
- Create new message (page)
- Send separate contact message (page)
- Flash messages
- Status update when messages successfully deliver or fail delivery

Those are fairly straight forward requirements which is why I decided to invest a bit of my own time trying it with react.

## Final status

After around 7 days of learning and development, the final solution compised of:

- Node
- Express.js
- Mongoose (for mongodb)
- Webpack
- Babel
- React
- React Router
- Redux
- A small number handful of polyfills for production build

Every page had a URL, and every URL could be requested using cURL to view complete content, that is to say: as a benchmark, the entire application worked with JavaScript disabled.

## Libraries

- [React engine (by PayPal)](https://github.com/paypal/react-engine/) (this is what I started with, but eventually bailed)
- [Express React views](https://github.com/reactjs/express-react-views) (a little closer to the metal)
- [Simple universal](https://github.com/guidsen/react-simple-universal) (though still in development)

## Resources

- [Router tutorials](https://github.com/reactjs/react-router-tutorial)
- [Simplified routing structures](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes)
- [Reducing the size of the final bundle.js](http://moduscreate.com/optimizing-react-es6-webpack-production-build/)
- [Excellent example of specification breakdown into components and containers](http://redux.js.org/docs/basics/UsageWithReact.html#designing-component-hierarchy)

## Containers and components

- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.dxeml6nsq
- https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
- https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351

## Quick prototyping

This is super quick, but slow to load, since it's pulling around 2mb over the wire.

### index.html

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

### app.js

```js
import React from 'react'
import { render } from 'react-dom'

render(<h1>Hello world</h1>), document.body);
```

## Current tree

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
