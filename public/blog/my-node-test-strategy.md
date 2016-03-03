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

This post **does not** cover client side testing, mostly because I think the whole setup is a mess right now. There's *a lot* of tools available, but the process is still a lot of customisation (with respect to my own experience) so I don't think I've got it right yet at all.

## Test runners

Good lord there's a mass of choice. Pick your poison and stick with it (until you find a reason to move). I've tried jasmine, mocha, qunit, tap and tape. Then you've got karma, zuul...and another one...I think!

I like my test runners to be 100% familiar JavaScript which is why I've settled on [tape](https://www.npmjs.com/package/tape). Up until recently I'd always use tape as my test library *and* my test runner (the executable), but very recently I've started to mixing tape with [tap](https://www.npmjs.com/package/tap) in that I'll use tape for the test code (mostly because most of my tests are written with it) but I'll run the tests with tap (specifically for the test coverage, which I'll touch on later).

I'll use tape as such:

```js
var test = require('tape');
var lib = require('..'); // my actual package

test('litmus', function (assert) {
  assert.plan(1);
  assert.ok(lib, 'the library loaded');
});
```

I'm a big fan of planning my tests using the `assert.plan(n)` (because a lot of what I test is async), and then making sure I'm actually fulfilling those specific tests. tape also comes with the usual `.equals`, `.deepEquals`, `.fail` and `.bail` (for fail and exit) and `.end` for non-planned tests.

The only trouble I've had with tape is that there's no `beforeEach` and `afterEach` which is very useful for state reset. However, it's possible to patch tape using [this technique](https://github.com/remy/autocache/blob/master/test/core.js#L474-L510). This alone might be a reason to use tap as the test library...maybe.

## Reporters

The tape module is compatible with [Test Anything Protocol](https://testanything.org/), so by itself it's fairly raw. So I pipe the output to [tap-spec](https://www.npmjs.com/package/tap-spec).

The problem that took me about 4 hours to debug was that if the test harness threw an exception, that exception would be swallowed by tap-spec. What this means from a practical point of view is: if my test script (like the one above) had an exception, the "tests would pass".

I found that if I install `tap-spec@2.x` then it errors correctly. I know I'm two major (breaking) changes out of date, but at the cost of getting the *right* result in my tests - it's worth it.

**Update** since using tap as my test runner, I don't mix it with tap-spec, so I've dropped this as a pre-requisite.

## Mocking

Something I've always struggled with is how to mock out a full environment and state without actually having the human interaction required to get to that point in the application.

A simple example of this I had lately was testing with a package called inquirer for the [Snyk cli](https://github.com/snyk/snyk) which prompts the user for various bits of content, and then does something with it. I want to test the full flow of code that uses inquirer inside of Snyk, but to do that I'd need to take control of inquirer somehow.

That's where [proxyquire](https://github.com/thlorenz/proxyquire) and optionally [sinon](http://sinonjs.org/) come into play.

### Proxyquire

Proxyquire will *require* your module, but allow you to intercept the loading of dependencies in that module.

For instance, in Snyk, I load the inquirer package in a module called `wizard.js`. So to test the wizard, I will proxy'require the module, and take control of the inquirer package as such:

```js
var answers = require('./fixtures/inquirer-answers.json');
var wizard = proxyquire('../cli/commands/protect/wizard', {
  // when the wizard runs require('inquirer'),
  // it'll get this back
  inquirer: {
    prompt: function (questions, callback) {
      if (questions.name === 'misc-start-over') {
        // handle a specific case manually
        return callback({ 'misc-start-over': false });
      }

      // otherwise, return the fixtures
      return callback(answers);
    },
  },
});

wizard().then(function () {
  // tests 🎉
}).then(function () {
  t.end();
});
```

I can also take control of my own modules being loaded, the key tip is that the path used to load the module exactly matches the key you use in the `proxyquire` call:

```js
var wizard = proxyquire('../cli/commands/protect/wizard', {
  '../../../lib/': {
    protect: function () {
      return Promise.resolve(require('./fixutres/vulns.json'));
    }
  },
  inquirer: {
    // as before
  },
});
```

Note that with proxyquire you can only take over modules *one* level deep (so I can't nest a proxyquire inside of the `inquirer` property in the above example). This is a bit of a limitation, but you can work around it by loading in all your modules ahead of time (i.e. use proxyquire to overload a package that inquirer might use).

### Sinon

I won't say too much about Sinon, but the main use allows me to wrap an existing function with a mock function, and later on in my tests I can test what values were used to call that mocked function (or what was returned), or how many times it was called, what was used to call the function on the nth call, etc.

Very useful if you want to be sure of what's going in and out of your functions.

## Pre-tests

Before my code even gets tested though, it'll check that the code passes my coding guidelines via [JSCS](http://jscs.info/) (check out [Addy Osmani's superb guide to JSCS](https://medium.com/@addyosmani/auto-formatting-javascript-code-style-fe0f98a923b8)). This is *my* `.jscsrc`, pick your own, stick with it, share it amongst the team:

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
    "style": "jscs -v lib/*.js",
    "test": "npm run style && tape test/*.test.js | tap-spec"
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

This feels utterly clunky, but I can't see any other way to do a total reset. It might be because I have to write insane [tests for things like nodemon](https://travis-ci.org/remy/nodemon/jobs/71828422). The main downside of this (that I can see) is that your total count is not totalled up at the end and **importantly** if you have test coverage, it won't work - since the test coverage is running once for each file.

**Be warned:** do not use this if you don't have to!

## Watching

Being that I'm not a big fan of larger tool chains (though there's nothing wrong with them, it's just my preference), I've been known to include [nodemon](https://github.com/remy/nodemon) in a watch command to monitor for changes to re-run tests.

That would look like this:

```json
{
  "scripts": {
    "style": "jscs -v lib/*.js",
    "test": "npm run style && tape test/*.test.js | tap-spec",
    "watch": "nodemon -q -x 'npm test'"
  }
}
```

Then on the cli I run:

```bash
npm run watch
```

nodemon is running in "quiet" mode (i.e. suppress any nodemon specific output), and make the thing it executes be `npm test`.

## Code coverage

I mentioned earlier that I switched to tap for my test runner. The main reason for this was that it comes with code coverage integration. I can add `--cov --coverage-report=lcov` to my test command, and I get [istanbul](https://www.npmjs.com/package/istanbul) coverage reports that I click through and browse.

Remember though, **code coverage != test coverage**, it does give me some very useful insights into my code, particularly to show me either blind spots in my code (that I've not tested at all), or areas of code that are not used at all and should be removed.

Though there is always the temptation to get the few extra tests that take that code coverage up to 100%, just by hitting a specific line of code in the tests.

I'm also using [Coveralls](https://coveralls.io/) (for a private repo) and tap integrates nicely with Coveralls from Travis. The trick here (if you want to avoid putting your Coveralls token in your repo) is to put the following two values in the environment variables settings in Travis: `COVERALLS_REPO_TOKEN=x`, `COVERALLS_SERVICE_NAME=travis-ci`.

## Couple of tips

**Avoid using `assert.ok` if possible.** My tests usually relied on this, but when they failed, there's no information on *why* they failed. Use `assert.equal` instead. If it doesn't match, then you'll get the delta in the failure - which hopefully leads to *why* it failed.

**If it makes sense: make tests reusable.** This is very dependant on the problem you're solving, but I was able to do this on a few projects, including my [inliner](https://github.com/remy/inliner/) repo. The main tests are: does the source file inline down to "some target content". So the tests run through a fixture directory looking for specific file extensions, allowing users to [contribute tests very easily](https://github.com/remy/inliner/blob/master/CONTRIBUTING.md). I also reuse tests in my autocache adapters, feel free to review the [localStorage version](https://github.com/remy/autocache-localstorage/blob/master/test/localstorage.test.js) that uses autocache's [core.js](https://github.com/remy/autocache/blob/master/test/core.js) tests.

## All together now

What does that all look like? Rather than bloating this post even more, I've added all the files (with a litmus test) and configuration into a (work in progress) [git repo](https://github.com/remy/templates/tree/master/node).

---

I've installed these pieces locally, *not* globally, for dev only use by running:

```bash
npm install --save-dev tape tap-spec@2 jscs
```

I'll also make sure that my tests and fixtures are excluded from my npm packages too, with `.npmignore` containing (at least):

```
/test
```

I'd like to generate my project folder structure, but as yet, it's a manual job (I've been wanting to check out [Yeoman](http://yeoman.io/) for generating, but it still feels like a lot of work for something that's reasonably straight forward).

## A closing thought

It's worth saying that, *for me* it's taken years and years to get to the point where tests are a normal part of my workflow. The most important part of that is making it easy. **It needs to be easy to test.** If there's lot of barriers to testing, then it'll fall behind, and once it's in a state of disrepair, all testing is lost.

This process works for me (and I don't need *all* of this to make the process work). Find what works for you to make it easy.

Finally, kudos to [Brian LeRoux](https://twitter.com/brianleroux), on my behest, he kept returning to (my conference) [ffconf](http://ffconf.org) to run workshops on testing, and it's his work that finally got me to shake my bad habits of no-test-coding.

Related posts:

- [Using travis with private npm deps](/using-travis-with-private-npm-deps)
<!-- - [My client side testing wish](/my-client-side-testing-wish) -->
