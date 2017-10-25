# (Easy) SSR React conference schedule

In a bid to get you thinking about server side (JavaScript) rendering, I'm running a workshop on Next.js which doesn't just make SSR easy, but it just works out of the box. Though, that said, it all depends on your requirements - and those requirements, I'm sure, can be met, but the "just works out of the box" has varying mileage!

However, building a React based conference schedule with SSR support is straight forward enough that I wanted to write it up by way of example.

<!--more-->

## Initial setup

The entire system is going to be written in JavaScript, and we'll need [node](https://nodejs.org) installed along with npm (which comes with node). I'd recommend Node v8 because it supports `async/await` which will become useful in the code we write.

I'm assuming we're working on an entirely blank project. To start off, we need a new project directory and the project dependencies.

Start off by creating a file called `package.json` containing the following JSON:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

The in the terminal, run the following commands:

```shell
$ npm init -f # create an empty package.json
$ npm install next react react-dom # saves by default
```

At this point you should have an initialised project that's _nearly_ ready to show you "Hello World".

Next we need a `pages` directory (the naming is important) with `index.js`:

```shell
$ mkdir pages
$ echo "export default () => &lt;div>Hello world&lt;/div>" > pages/index.js
```

Now the project is ready to run, albeit an utterly uninspiring project right now. To browse the project, we need to use `npm run dev` (and not `start`) to run in development mode:

```shell
$ npm run dev

> conf-schedule@1.0.0 dev ./conf-schedule
> next

[ DONE ] Compiled successfully in 1907ms

> Ready on http://localhost:3000
```

<div class="update"><strong>🚨 Warning 🚨</strong> If this doesn't work, and you're faced with something like this:

<pre class="nohighlight"><code>[ ERROR ] Failed to compile with 1 errors
This module was not found:

* react-dom/lib/ReactReconciler in ./node_modules/next/dist/client/next-dev.js

To install it, you can run: npm install --save react-dom/lib/ReactReconciler</code></pre>

…then you'll need to use react@15 and react-dom@15 for the time being (Next.js has a couple of pull requests waiting to land to support React v16):

<pre class="nohighlight"><code>npm install react@15 react-dom@15</code></pre></div>

## Routing simplified

For the conference schedule, I want to have the following URLs handled:

- `/` the root of the application, showing the timings and session titles
- `/session/:slug` more details about what the talk is and by whom
- `/about` an arbitrary page with venue information, etc

With something like express, I would have to manually define each of these routes in code, and execute the appropriate handler. The way Next does this is with files. We already handle the root path (albeit with "Hello World"), but adding an about page is as simple as creating a file called `pages/about.js`.

```shell
$ echo "export default () => &lt;div>About my conf&lt;/div>" > pages/about.js
```

Now I can visit the URL http://localhost:3000/about in my browser and it will render. No restart required. No config change. Just works.

The session URL will take a little bit more, but for now, we'll add `pages/session.js` and this will read a query string to load each session via the URL, like so: `/session?slug=passwords`. This will do for development, but we will need to later make it "pretty".

To give you an more complete example, here's a directory tree for the routes in a Next based application I worked on recently:

```nohighlight
pages
├── 404.js
├── _error.js
├── about.js
├── contact.js
├── dashboard.js
├── embed
│   └── _single.js
├── index.js
├── list
│   ├── _single.js
│   └── new.js
├── profile
│   ├── index.js
│   └── settings.js
├── signup.js
├── tag
│   └── _tag.js
├── terms.js
└── user
    └── _profile.js
```

## Components

One of the things that has attracted me to React in the last year is the structure it encourages in my code (which previously tended to change from project to project). For the conference schedule, I need two key components:

1. Session summary - which we'll loop over for each session
2. Session detail

The component for the session summary will look like this:

```js
import classnames from 'classnames';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';

export default ({ title, when, slug, isBreak = false }) => {
  const finished = isAfter(Date.now(), when);
  return (
    <a
      className={classnames({
        Summary: true,
        finished,
        next: !finished,
        isBreak,
      })}
      href={`/session?slug=${slug}`}
    >
      <span className="title">{title}</span>
      <span className="when">{format(when, 'h:mm A')}</span>
    </a>
  );
};
```

A few things to note about the component:

1. There's no need for `import React from 'react'` to get the JSX rendering to work, as Next will handle that for me automatically
2. I'm using [classnames](https://www.npmjs.com/package/classnames) and [ES6's object shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) to set different classes for when the session is finished or not.
3. I'm using (the superb light alternative to moment) called [date-fns](https://date-fns.org/) for formatting and comparison.

Modifying the `pages/index.js` I'll load in some preconfigured data (originally JSON), and loop through each session rendering the session component:

```js
import Summary from '../components/Summary';
import { styles } from '../components/Styles';
import sessions from '../data';

export default function index() {
  return (
    <div>
      <style jsx global>
        {styles}
      </style>
      {sessions.map((session, i) => {
        return <Summary key={i} {...session} />;
      })}
    </div>
  );
}
```



---

## Some closing words

Server Side Rendering (SSR) will quite often fall to the bottom of the priorities in a JavaScript based project, but it's important. It's important to SEO (which tends to have a direct relationship to profits), performance (perceived or otherwise) and even development - as the same code can be used in both client and server side code.

Next.js, I believe, makes SSR for React easy. In fact, that's a lie. It's not easy, but there's nothing really required except perhaps a frame of thinking. Once I start thinking about React as a framework to develop…

