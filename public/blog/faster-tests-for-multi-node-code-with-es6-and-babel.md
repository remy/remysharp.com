# Faster tests for multi-node code with ES6 and Babel

I've spent a lot of time writing CLI tools written in NodeJS ([nodemon](https://github.com/remy/nodemon), [snyk](https://github.com/Snyk/snyk), [inliner](https://github.com/remy/inliner) and [more](https://github.com/remy/clite)) and packages that have to work in multiple versions of node, and thus different support for JavaScript.

In general, I've stuck to "vanilla" ES5 JavaScript, no fancy [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions), or [default parameters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Default_parameters) or niceties like [includes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/includes). However, in the last year and support has been landing all over the place, I've slowly enjoyed using this sugar. More importantly [pretty much all of ES6 is available in Node 6](http://node.green/) - so now I've been looking at how I can use [Babel](https://babeljs.io/) to support ES6 *without effecting my build times*.

<!--more-->

## TL,DR; because my post is a bit long!

I develop in the latest version of node, and run my local tests with the newest version (ideally not requiring any transpiling).

In the `package.json`, I have:

```json
"scripts": {
  "travis-coverage": "node_modules/tap/node_modules/.bin/nyc report --reporter=text-lcov | node_modules/tap/node_modules/.bin/coveralls",
  "coverage": "tap --cov --coverage-report=lcov test/*.test.js",
  "tapone": "COVERALLS_REPO_TOKEN=0 tap --nyc-arg=--require --nyc-arg=babel-polyfill --timeout=60 --cov --coverage-report=text-summary",
  "test": "npm run tapone test/*.test.js",
  "test:babel": "babel test/*.test.js -d . && npm test",
},
```

And the `.travis.yml` contains:

```yaml
matrix:
  include:
    - node_js: "6"
    - node_js: "4"
    - node_js: "0.10"
      env: BABEL=true
script: "[[ $BABEL == true ]] && npm run test:babel || npm test"
after_success:
  - npm run travis-coverage
```

Note that as I increase my use of ES6 features, the `BABEL` env value will likely also be included in the node4 tests.

## Caveats and prerequisites

My caveat: sorry I was late to the party. I've never been keen on transpilers or processors. I remember watching an episode of 203 with Paul and Jake, [where Paul said](https://youtu.be/pLLLf1QPgoU?t=56s) he was "sort of anti-transpiler". The real insight for me when is when he mention that the code that Babel generates is readable and close (if not the same) as what we would produce without it.

This, as the title suggests, was only for tests. Distribution code is slightly different and off topic for this post. This is also slightly bespoke to some of the set up I have, since Coveralls was the cause of some issues.

Finally, the most important factor for me was that this process would not affect my workflow. This means any intermediate step, and test time must not increase significantly.

## Background and concepts

Believe me when I say: I tried a lot of combinations, but what I've settled on, I believe is pretty solid. **However, if you're just after the solution, skip this bit 👍**

For background, [I use tap](https://remysharp.com/2016/02/08/testing-tape-vs-tap) for my test strategy. Tap uses [nyc](https://www.npmjs.com/package/nyc) for instrumenting code coverage. I'm also using [Travis](https://travis-ci.org) for CI and [Coveralls](https://coveralls.io) captures a record of my coverage. These are important, because they're all at play.

### Initial attempt: babel-node

My initial attempt at getting ES6 transpiling my `scripts.test` looked like this:

```json
"scripts": {
  "test": "babel-node node_modules/.bin/tap test/*.test.js"
}
```

This, of course works offline, but inside of Travis, every run produced a `spawn EACCES` error:

![Example of the Travis spawn access error](/images/spawn-access-failure.gif)

It took some time to realise that this was related to using Babel with the Coveralls module inside of tap which somehow blowing up.

So part of this task was to strip out the coverage task (by adding `--no-cov`) and move it out of the test and as part of the `after_success` event in Travis.

I also found that I could pass arguments to nyc to tell it to require in packages (specifically for require hooks that Babel provides).

### Injecting babel into nyc

So now my command looks like this - and fair warning, it ain't pretty:

```json
"scripts": {
  "coverage": "tap --nyc-arg=--require --nyc-arg=babel-polyfill --nyc-arg=--require --nyc-arg=babel-register --cov --coverage-report=lcov",
  "test": "tap --nyc-arg=--require --nyc-arg=babel-polyfill --nyc-arg=--require --nyc-arg=babel-register test/*.test.js --no-cov",
}
```

And my `.travis.yml` now has:

```yaml
after_success:
  - npm run travis-coverage
```

Except now…my full test suite is running *twice* for each version of node in my test matrix (because the coverage re-runs tests). Not good.

The answer here is to generate the source coverage data for Coveralls during the test, but not post it during the test cycle (since this would cause the `spawn EACCES` error).

An important benefit of using `after_success` for coverage: I've found that Coveralls can be down (or sending error responses to the coverage post) which causes our entire test to fail. This is a good practise to isolate the coverage from the actual tests (in my case).

### Hacking tap & smarter matrix

So now I need to hack tap…a little. Tap automatically posts to Coveralls if the `COVERALLS_REPO_TOKEN` env value is present ([which it is in my Travis builds](https://remysharp.com/2015/12/14/my-node-test-strategy#code-coverage)).

In the execution of `tap`, I'm going to zero out the Coveralls token, so the nyc output is still generated, but not posted. Then in the `after_success` I'll call `npm run travis-coverage` which directly pipes the nyc coverage to the local coveralls package:

```json
"travis-coverage": "node_modules/tap/node_modules/.bin/nyc report --reporter=text-lcov | node_modules/tap/node_modules/.bin/coveralls"
```

Nearly there.

I also only want to make use of babel if we're running the node 0.10 tests. So my Travis build matrix needs some tweaking. Below, I'm adding an environment value to the node 0.10 run, and using that to work out what to run (instead of using `npm test` by default):

```yaml
matrix:
  include:
    - node_js: "6"
    - node_js: "4"
    - node_js: "0.10"
      env: BABEL=true
script: "[[ $BABEL == true ]] && npm run test:babel || npm test"
```

With this, I call `npm test` for "capable" environments, and `npm run test:babel` for when I need babel to be included. The `test:babel` looked like this:

```json
"test:babel": "COVERALLS_REPO_TOKEN=0 tap --nyc-arg=--require --nyc-arg=babel-register,babel-polyfill --timeout=60 --cov --coverage-report=text-summary test/*.test.js"
```

…except, yeah, notice the issue?

![Slowwwww tests](/images/slow-babel-test.gif)

That's node 0.10 taking a whopping 10 minutes to complete the tests. No, thank you, sir.

### Reducing test time

The issue is that since tap spawns a new process per test file (which is great), it also means babel has to do all it's work over and over.

The answer is to, within the Travis build, completely rewrite the test scripts using babel's transpiler, and *only* then are the tests run. Sort of gnarly, but it means the execution time for the babel based test is the same as the non-babel tests.

Now, the `test:babel` looks like this:

```json
"test:babel": "babel test/*.test.js -d . && npm test"
```

Now, finally, the workflow is good. I code with the goodness of ES6 and beyond, I'm finally in camp-babel and there's no extra waiting time on my tests.

### Final set up

The final set up and configuration looks like this:

```json
"scripts": {
  "travis-coverage": "node_modules/tap/node_modules/.bin/nyc report --reporter=text-lcov | node_modules/tap/node_modules/.bin/coveralls",
  "coverage": "tap --cov --coverage-report=lcov test/*.test.js",
  "tapone": "COVERALLS_REPO_TOKEN=0 tap --nyc-arg=--require --nyc-arg=babel-polyfill --timeout=60 --cov --coverage-report=text-summary",
  "test": "npm run tapone test/*.test.js",
  "test:babel": "babel test/*.test.js -d . && npm test"
},
"devDependencies": {
  "babel-cli": "^6.7.7",
  "babel-polyfill": "^6.7.4",
  "babel-preset-es2015": "^6.6.0",
  "babel-preset-stage-3": "^6.5.0",
  "tap": "^5.7.1"
}
```

I use both `npm test` for a complete test run. And `npm run tapone test/foo.test.js` to test a single test script, which also gives me the `babel-polyfill` package and only adds a negligible amount of time. Finally, the `.travis.yml` contains:

```yaml
matrix:
  include:
    - node_js: "6"
    - node_js: "4"
    - node_js: "0.10"
      env: BABEL=true
script: "[[ $BABEL == true ]] && npm run test:babel || npm test"
after_success:
  - npm run travis-coverage
```

I hope this is useful to someone out there (even if it's just me in another 5 years time)!
