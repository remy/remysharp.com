# My node test strategy

Historically testing has been far far down on my list of priorities. However that's been slowly changing over the last 3-4 years, and now I have a fairly solid and systematic method to testing.

I'm writing it partly to capture it in time as I know it'll continue to evolve and partly to share with you to get your input too.

<!--more-->

## Always be automating

It *nearly* goes without saying that the whole process should be automated. I'm not a big tooling fan, so I don't personally have something like grunt constantly running my tests.

However, all my projects these days will immediately be added to Travis (my CI of choice) and typically with email alerts turned on. I'll go into the detail of my setup in a moment.

JS Bin, sadly, has nearly no tests, which means the main process is: can I sign in? Can I save? This is super-super prone to disaster. Do not follow these old and crusty footsteps!

## Prerequisites

I have a few prerequisites for my test strategy:

- Runs either from an event (like a commit or repo push) or from the CLI. Anything more is over excursion.
- Given a failure, the exit code for my test is "non-zero" - this is specifically to allow Travis to see my tests have failed (more on this later).
- Browser/client side testing must also be triggered in the same way, and not require me to manually run browsers.
- Should be easy to configure and install, ideally there's no install beyond node and my project code.

## Test runners

Good lord there's a mass of choice. Pick your poison and stick with it (until you find a reason to move). I've tried jasmine, mocha, qunit, tap and tape. Then you've got karma, zuul...and another one...I think!

I like my test runners to be 100% familiar JavaScript which is why I've settled on [tape](https://www.npmjs.com/package/tape) (though I'm considering [tap](https://www.npmjs.com/package/tap) recently as it has a few extra utilities that I need sometimes).

I'll use tape as such:

```js
var test = require('tape');
var lib = require('..'); // my actual package

test('litmus', function (assert) {
  assert.plan(1);
  assert.ok(lib, 'the library loaded');
});
```

The only problem I find with tape is that there's no `beforeEach` and `afterEach` which is very useful for state reset. However, it's possible to patch tape using [this technique](https://github.com/remy/autocache/blob/master/test/core.js#L474-L510). This alone might be a reason to use tap (or [tapes](https://www.npmjs.com/package/tapes) which extends tap).

## Reporters

The tape module is compatible with [Test Anything Protocol](https://testanything.org/), so by itself it's fairly raw. So I pipe the output to [tap-spec](https://www.npmjs.com/package/tap-spec).

The problem that took me about 4 hours to debug was that if the test harness threw an exception, that exception would be swallowed by tap-spec. What this means from a practical point of view is: if my test script (like the one above) had an exception, the "tests would pass".

I found that if I install tap-spec@2.x then it errors correctly. I know I'm two major (breaking) changes out of date, but at the cost of getting the *right* result in my tests - it's worth it.

## Pre-tests

Before my code even gets tested though, it'll check that the code passes my coding guideliness via [JSCS](http://jscs.info/) (check out [Addy Osmani's superb guide to JSCS](https://medium.com/@addyosmani/auto-formatting-javascript-code-style-fe0f98a923b8)). This is *my* `.jscsrc`, pick your own, stick with it, share it amongst the team:

```json
{
  "preset": "node-style-guide",
  "requireCapitalizedComments": null,
  "requireSpacesInAnonymousFunctionExpression": {
    "beforeOpeningCurlyBrace": true,
    "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInNamedFunctionExpression": {
    "beforeOpeningRoundBrace": true
  },
  "excludeFiles": ["node_modules/**"],
  "disallowSpacesInFunction": null
}
```

## File structure

All my new projects include the same directory setup and naming convention:

```
└── test
    ├── fixtures
    │   ├── ...scripts...
    │   └── ...html, etc...
    ├── foo.test.js
    └── litmus.test.js
```

The `fixture` directory is for anything the tests needs to setup with. All actual test scripts are suffixed with `.test.js`.

Where I've included both server-side and client-side tests, I'll name the client-side tests as `.browser.js` so that the test command is able to isolate browser specific tests.

## Running

Since this is node land, I use npm only for my tests. So I have the following in my `package.json`:

```json
{
  "scripts": {
    "style": "jscs -v cli/*.js lib/*.js",
    "test": "npm run style && node test/*.test.js | tap-spec"
  }
}
```

This `test` command is looking for all my test scripts, using tape to generate a TAP formatted output, and piping to tap-spec (@2.x, not @latest).

## Blank slates

My big gripe with all the test runners is that each test script that's included is run in the same process and same shared memory as all the other test scripts.

That's to say, if something in `foo.test.js` modifies my library (that I'm testing), then it'll remained tainted when `bar.test.js` runs. Of course some cases can be handled by a proper `beforeEach` (or `before`) call, but in some cases, you need a fresh start.

This is what I do:

```bash
for FILE in test/*.test.js;
  do echo $FILE;
  node $FILE | tap-spec;
  if [ $? -ne 0 ];
    then exit 1;
  fi;
done
```

This is all compressed down to a single line, and put inside the `test` command in my `package.json`. This way, when the test exits, and it's successful, it'll move on to the next script, completely ditching the process. Equally, if it fails, the `if [ $? ]` test will throw the exit to Travis.

This feels utterly clunky, but I can't see any other way to do a total reset. It might be because I have to write insane [tests for things like nodemon](https://travis-ci.org/remy/nodemon/jobs/71828422).

## Couple of tips

**Avoid using `assert.ok` if possible.** My tests usually relied on this, but when they failed, there's no information on *why* they failed. Use `assert.equal` instead. If it doesn't match, then you'll get the delta in the failure - which hopefully leads to *why* it failed.

**Make tests easily reusable.** This is very dependant on the problem you're solving. But I was able to use this in my [inliner](https://github.com/remy/inliner/blob/master/CONTRIBUTING.md) repo. The main tests are: does the source file inline down to "some target content". So the tests run through a fixture directory looking for specific file extensions, allowing users to contribute tests very easily. I also reuse tests in my autocache adapters, feel free to review the [localStorage version](https://github.com/remy/autocache-localstorage/blob/master/test/localstorage.test.js) that uses autocache's [core.js](https://github.com/remy/autocache/blob/master/test/core.js) tests.

## Wrapping up

I've installed these pieces locally, *not* globally, for dev only use by running:

```bash
npm install --save-dev tape tap-spec jscs
```

I'd like to generate my project folder structure, but as yet, it's a manual job (I've been wanting to check out [Yeoman](http://yeoman.io/) for generating, but it still feels like a lot of work for something that's reasonably straight forward).

Finally, kudos to [Brian LeRoux](https://twitter.com/brianleroux), on my behest, he kept returning to (my conference) [ffconf](http://ffconf.org) to run workshops on testing, and it's his work that finally got me to shake my bad habits of no-test-coding.

Related posts:

- [Using travis with private npm deps](/using-travis-with-private-npm-deps)
<!-- - [My client side testing wish](/my-client-side-testing-wish) -->