---
title: Fixing fixtures
date: '2016-01-28 16:06:15'
tags:
  - code
published: true
modified: '2016-01-23 16:14:42'
---
# Fixing fixtures

For context, the following technical post is rather bespoke to my recent work but I believe it helps to manage potentially heavy fixtures in tests.

A fixture is used to consistently test software. I used them in nearly every project I write and test. Lately, with my work on [Snyk](https://snyk.io) requires that the code is tested against a number of npm packages. This means entire swaths of `node_modules` end up in our fixtures directory, which would then lead to pull requests that look like this (a recent real PR in our code):

![Example commit with 3,700 files](/images/fixtures.png)

<!--more-->

## Using npm for fixtures

My new method now puts these npm packages inside of totally separate npm package. I've only used this once, but the name of the fixture package will the same as my main project, and suffixed with `-fixtures`.

This can be tracked in something like GitHub, but it doesn't require pull requests or code reviews upon update.

The fixtures package can really include anything I like, but specifically I'm using it to include dependencies that will become the individual npm packages I'm using as fixtures. This method also allows me to create *mock* packages and include them in the `node_modules` directory of my fixture page, something like this:

```bash
node_modules
├── @remy
│   └── vuln-test
│       └── node_modules
│           └── semver
│               ├── bin
│               └── test
├── debug
│   └── node_modules
│       └── ms
├── semver-rs-demo
│   └── node_modules
│       └── semver
│           ├── bin
│           └── test
├── uglify-package ⬅⬅⬅ this is the mocked package
│   └── node_modules
│       ├── ug-deep
│       │   └── node_modules
│       ├── ug-deep-alt
│       │   └── node_modules
│       │       └── ug-no-deps
│       └── uglify-js
│           └── <snip>
└── undefsafe
    ├── lib
    └── test
```

You can see my live example of the [fixture package](https://github.com/Snyk/snyk-resolve-deps-fixtures) and [how it's being used](https://github.com/Snyk/resolve-deps/blob/master/test/deps.test.js#L4-L7) in my Snyk work.

## Important implementation details

- The big win here is that so long as you pin the fixture package version in your project, your **fixtures are now immutable**.
- If you're including mocked packages you need to list the top level package name (`uglify-package` in my case) in the `bundleDependencies` array in the `package.json`.
- If you want the package directory structure to remain intact (maybe because you need an npm@3 flat directory structure for instance), include the name of the package in the `bundleDependencies`.
- You can't include a directory called `node_modules` in your package anywhere (outside of the project root directory) as it's automatically stripped from `npm publish`.
- Do not expect `devDependencies` to be installed, as this isn't the normal install process when including a project dependency.

## Simple

So that's it. Put the dependencies in a separate package. Make sure you pin the version of the fixture in your code (so it's immutable) and if you use a CI system that benefits from caching (like [Travis](https://travis-ci.org) does), then the build benefits from the cached fixture.

Most importantly though: no more unnecessarily large pull requests. Now they can focus on the code changes and tests alone.
