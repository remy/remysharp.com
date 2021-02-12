---
title: Nice imports with Next.js
date: '2019-11-04 10:00:00'
tags:
- code
---

# Nice imports with Next.js

During my React based development, I'll find myself importing a module `from '../../../components/Widget'` and that `../../../` is anyone's guess if it's right first time or not.

Except I discovered that Next.js (which is what I do most of my React dev with) ships with a trick up its sleeve.

<!--more-->

***Update 2020-12-19*** - the latest Next.js supports aliases directly through `jsconfig.json`, so you can [skip straight to that part](#bonus-vs-code-support) and you get path aliases for (nearly) free!


## Alias

Next.js uses a preconfigured webpack under the hood that you don't need to mess with.

There's a helpful webpack plugin that let's you alias paths, so I could alias `~` to the root of my project, letting my imports look like this:

```js
import Widget from '~/components/Widget'
```

Much cleaner. Knowing which plugin this is and how to configure it will be time and energy wasted. Which is why it was nice to find that Next.js silently shipped with it by default.

## In the wild

If you're familiar with Next.js already, you might have used the alias already without knowing.

```js
import Head from `next/head`
```

The above code is actually using the alias feature. Under the hood Next is [aliasing a number](https://github.com/zeit/next.js/blob/f632567bcf6652333ab57e7c13adeabe15bf1074/packages/next/build/webpack-config.ts#L159) of their modules to the distribution builds:

```js
alias: {
  // These aliases make sure the wrapper module is not included in the bundles
  // Which makes bundles slightly smaller, but also skips parsing a module that we know will result in this alias
  'next/head': 'next/dist/next-server/lib/head.js',
  'next/router': 'next/dist/client/router.js',
  'next/config': 'next/dist/next-server/lib/runtime-config.js',
  'next/dynamic': 'next/dist/next-server/lib/dynamic.js',
```

This means it's (relatively) straight forward to add our own custom alias path.

## Customising the alias

Add the `next.config.js` file to your project then it needs to add to the `webpack.config.resolve.alias` object:

```js
const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    return config;
  }
};
```

That's it. Now I can import `from '~/components/Widget'` and all is well.

## Bonus: VS Code support

I'm a VS Code user (so if you're using another editor, please comment below to share how this is done). This means I can alt+click on imported packages and the source will be loaded.

VS Code needs to understand where how I've configured my alias. This is matter of adding a `jsconfig.json` file to my project's root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"]
    }
  }
}
```

Now everything works and I don't have to type so many period characters 🎉
