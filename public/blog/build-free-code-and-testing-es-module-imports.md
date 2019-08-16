---
title: "Build free code & testing ES module imports"
tag:
- code
date: "2019-08-16 10:00:00"
---

# Build free code & testing ES module imports

A bit of a mouthful of a post title, but I can assure my future self this post will be worthy of publishing because it'll save future self many angry hours shouting at build tools.

The goal: no build tools, which leads to no config, which leads to no waiting around.

<!--more-->

## Let's get the lie out of the way

There's a little config required, but I can assure you, future Remy, it's a copy and paste job.

Whilst I'm admitting things, it's worth noting that I _think_ this strategy won't work for distributed node modules. That's to say: this process is for application development and testing.

## TL;DR

Install a few bits:

```sh
$ npm i esm
$ npm i -D ava nyc
```

And update your `package.json` with my [solution](#final-solution) to use `import` statements without any build hassles.

### 1. esm

It's been around for a while, but when I tried it originally I didn't have much success. Lately the [esm module](https://github.com/standard-things/esm) worked right out of the box for me. If you're not familiar:

> The brilliantly simple, babel-less, bundle-less ECMAScript module loader.

This code is going to allow me to name my files as I please - that's usually `someProcess.js` (not .mjs, or .cjs, .watjs). Within any of these files I can also use `import` like I'm a space boy from the future. Using `import` will work on my own files and any other package I install.

```js
import fs from 'fs'; // node internals
import nodemon from 'nodemon'; // an "ES5-style" package made compatible
import { method } from './my-methods'; // my local code

export const number = 12;
export default () => {
  // do something magical
}
```

To use esm I can either include it in my code…hmm, no, yuk, or I can get node to load the esm module up front so my code never sees the library. In my `package.json` file I'll have:

```json
{
  "scripts": {
    "start": "node -r esm .",
    "dev": "DEBUG=* node -r esm ."
  },
  "main": "src/index.js"
}
```

That's it. Next though, is testing, and that wasn't so simple (at first!).

## 2. Testing

I've been a fan of [tap](https://remysharp.com/2016/02/08/testing-tape-vs-tap) for a while, I used mocha (a very old version) for nodemon (for my sins), and lately I've enjoyed using Jest for testing.

However Jest doesn't support requiring an additional module during runtime the way node does. Mocha and other testing frameworks do, but not Jest. It's a bit annoying, but it made me look around again.

I settled on [AVA](https://github.com/avajs/ava). I'm still not quite a fan, but it's doing it's job as a test runner. Importantly, AVA lets me include esm as part of the testing and I can define this in my `package.json` (again), so all this stuff lives together so far:

```json
{
  "ava": { "require": [ "esm" ] },
  "scripts": {
    "test": "ava",
    "start": "node -r esm .",
    "dev": "DEBUG=* node -r esm ."
  },
  "main": "src/index.js"
}
```

Again, that's it. My tests now work and my code remains to use `import` statements. No build process (or that I'm aware of, which is the way I like it).

The last part of the jigsaw puzzle is coverage. I use coverage as an indicator that I've not missed some important code fork (rather than aiming for 100% coverage). AVA makes it easy to use [nyc](https://istanbul.js.org/) ("the Istanbul command line interface"…whatever that means…). Except…coverage doesn't _quite_ work.

## 3. Coverage

I found that if the codebase used `require` statements but my tests used `import` then the coverage would report. If it was 100% `import` statements, I'd be faced with wonderful bit of nonsense:

```text
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |        0 |        0 |        0 |        0 |                   |
----------|----------|----------|----------|----------|-------------------|
```

I tried debugging it manually but it was completely useless. Thank the stars when I came across [this repo](https://github.com/andrezero/boilerplate-esm-nyc-mocha) by [Andre Torgal](https://andretorgal.com/) which gave me most of the bits I needed for nyc to pick up the imported files.

First the following is needed for esm to operate fully `"esm": { "cjs": true }` (I'm not completely sure why, but trust that I went through a lot of permutations!). Next nyc _also_ needs to know to load in the esm module, so the final `package.json` reads as:

```json {id=final-solution}
{
  "esm": { "cjs": true },
  "nyc": { "require": [ "esm" ] },
  "ava": { "require": [ "esm" ] },
  "scripts": {
    "start": "node -r esm .",
    "dev": "DEBUG=* node -r esm .",
    "test": "nyc --reporter=text ava"
  },
  "main": "src/index.js"
}
```

It's a bit repetitive, but it works and it works without any build tool shenanigans, which is all I really want in life.
