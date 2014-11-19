# My five promise patterns

I've been getting big into promises over the last year. I think the two best resources that I've learnt from today is Forbes Lindesay's [talk at JSConf.EU 2013](https://www.youtube.com/watch?v=qbKWsbJ76-s) and Jake Archibald's excellent [promise article on html5rocks](http://www.html5rocks.com/en/tutorials/es6/promises/).

There's been some patterns that I use over and over so I wanted to share and document them.

*Please note that the examples used are *mostly* based on my real code, but have been simplified for demonstration purposes.*

<!-- more -->

## Library of choice

Firstly I prefer to use the native implementation, and go bare bones. I'm sure they will be a time that I'll want more than the native API has to offer, but I've not arrived there yet.

As a client side polyfill and the server side, in node-land, since promises are oddly not available natively, **my preferred library is [then/promise](https://github.com/then/promise)**.

I've used [RSVP](https://github.com/tildeio/rsvp.js) in the past and heard decent things about [Bluebird](https://github.com/petkaantonov/bluebird).

RSVP feels like it's mostly bare bones, but I learnt about promise.js' `denodeify` which converts a callback based function into a promise function which can be very useful.

## Clean shallow chains

This means my initial promise code would look like:

```js
writeFile(filename, content)
  .then(addDBUser)
  .then(dns)
  .then(configureHeroku)
  .then(function () {
    console.log('All done');
  })
```

This is easy if these are all my functions, but I can also do this with third party libraries via `denodeify` (a feature of the promise.js library, though most promise libraries have something similar) – turn a callback pattern function into a promise based function:

```js
var writeFile = Promise.denodeify(fs.writeFile):

writeFile(filename, content)
  .then(addDBUser)
```

Though one place I've been caught out with `denodeify` is when the method relies on method's context, which is most things as it turns out (`fs` is just a fluke that it's methods don't rely on the context), so make sure to `bind` as required:

```js
var addUser = Promise
  .denodeify(model.user.add)
  .bind(model.user) // multi line for blog readability
```

## Prebaking

You've already seen that I use `bind`, but I've also found that in some situations, I need to call a function with static arguments (i.e. not relying on the previous promise), just because it's part of the promise chain.

I *could* do this:

```js
writeFile(filename, content)
  .then(function () {
    return addUserToDb('rem', 'password', 'some-db');
  })
```

Or, what I've found I'm more inclined to do now is prebake the `addUserToDb` call with the static arguments:

```js
var addUser = addUserToDb.bind(null, 'rem',
      'password', 'some-db');

writeFile(filename, content)
  .then(addUser)
```

This also allows me to code with the [shallow chains](#clean-shallow-chains) as above, because it (to me) feels a bit verbose to drop into a function just to return a promise straight back out that doesn't depend on any unknown variable.

The thing to watch out for is if the function behaves differently if there's more arguments, I have to cold call the promise.

## Cold calling

***Disclaimer:*** *this patterned is required due to my own prebaking patterns and attempts to (ironically) simplify. There's a good chance you won't need this!*

When a function works both as a promise *and* using the callback pattern - it's great, but I've been caught out in the past.

The way the function might work under the hood is something like (this pseudo code):

```js
Heroku.prototype.post = function (slug, options, callback) {
  // do some async thing
  this.request(slug, options, function (err, data) {

    // ** this line is how the dual functionality works ** //
    if (callback) callback(err, data);

    // else do something with promise
  });

  // return some promise created some place
  return this.promise;
}
```

So `post` can be called either as a promise:

```js
heroku.post(slug, opts).then(dostuff);
```

Or as a callback:

```js
heroku.post(slug, opts, dostuff);
```

But gets messy when you do this:

```js
function configureHeroku(slug) {
  // prebake heroku app create promise
  var create = heroku.post.bind(heroku,
    '/apps',
    { name: 'example-' + slug }
  );

  // prebake domain config
  var domain = heroku.post.bind(heroku,
    '/apps/example-' + slug + '/domains',
    { hostname: slug + '.example.com' }
  );

  // ** this is where it goes wrong ** //
  return create().then(domain);
}
```

The issue is when `domain` is called, it's actually called with the prebaked arguments of the slug and options *but also* the resolved value from `create()` - so **a third argument is received**.

This third argument is the resolved result of `create()` which is treated as the `callback` argument and as a function object, so the code will try to invoke it - causing an exception.

My solution is to wrap in a *cold call* - i.e. a newly created function that calls my method with no arguments. Like bind once but then never allow any new arguments, also known as currying (here's a simple demo of the [curry/partial/seal](https://jsbin.com/gopiqu/edit?js,console) type-thing):


```js
function coldcall(fn) {
  return function () {
    fn();
  };
}

function configureHeroku(slug) {
  // prebake heroku app create promise
  // ...


  // ** now it works ** //
  return create().then(coldcall(domain));
}
```

*Note: you can do this using currying, i.e. [lodash.curry](https://lodash.com/docs#curry).*

Now the `domain` call works because it's invoked preventing any extra arguments being added.

## Throw over explicit reject

Instead of:

```js
// compare password & input password
return new Promise(function (resolve) {
  bcrypt.compare(input, password, function (error, result) {
    if (err || !result) {
      // reject and early exit
      return reject(err);
    }

    resolve(result);
  });
});
```

I'll throw instead of reject:

```js
// compare password & input password
return new Promise(function (resolve) {
  bcrypt.compare(input, password, function (error, result) {
    if (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Passwords did not match.');
    }

    resolve(result);
  });
});
```

This might be a little controversial. In fact, when I threw this out to twitter, most people came back with something like:

> Reject whenever possible, it's more performant because throw breaks the stack.

This may well be so, but there's a few key benefits to my code when I throw:

1. I'm used to error first handling, and quite often I'll accidently recieve `reject` as the first argument, which leads to much confusion. This way, I only ever accept `resolve` as my argument.
2. I don't have to remember to `return reject`. I've seen code that doesn't return on reject, and it then goes on to `resolve` with a value. Some libraries fulfill, some reject, some throw new errors. Throwing the error avoids this entirely.
3. This is also consistent with the way I'll deal with errors inside of subsequent `then` calls:

```js
// compare password & input password
utils.compare(input, password)
  .then(function () {
    if (!validUsername(username)) {
      throw new Error('Username is not valid');
    }
    // continues...
  })
  .then(etc)
```

Jake also chimed in with a couple of useful replies:

> reject is supposed to be analogous to throw but async. So reject what you'd throw (which is usually an error)

Then linked to his [post](http://jakearchibald.com/2014/es7-async-functions/) with *"in ES7 async functions reject is throw"*. This also reinforces that you want to reject with a real error, not a string.

## Always end with a catch

It's not uncommon for me to be testing a http request with a promise, and it just never returns...

The issue is that the promise has been rejected somewhere and it's not been caught. So I **always end with a catch**. Even if it's a dump to the console, that way I know something failed.

```js
writeFile(filename, content)
  .then(addDBUser)
  .then(dns)
  .then(configureHeroku)
  .then(function () {
    console.log('All done');
  })
  .catch(function (error) {
    console.error(error.stack);
  });
```

This final catch lets me see the full stacktrace as to what went wrong, and importantly *that something did go wrong*.

*Note: `.catch()` is only in the ES6 spec and doesn't appear in Promises/A+ so some library implementations are missing `.catch()` support (as I've found with [mongoose](http://www.mongoosejs.com/) as it depends on [mPromise](https://www.npmjs.org/mpromise) library).*

## Recap

So that's it:

- Shallow chains
- Prebaking where I can and cold calling if neccessary
- Always throw
- Always catch

Pretty simple. I'd be interested to hear what patterns are emerging in your workflow too.


