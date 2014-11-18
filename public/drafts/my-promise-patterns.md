# My promise patterns

I've been getting big into promises over the last year. I think the two best resources that I've learnt from today is Forbes Lindesay's [talk at JSConf.EU 2013](https://www.youtube.com/watch?v=qbKWsbJ76-s) and Jake Archibald's excellent [promise article on html5rocks](http://www.html5rocks.com/en/tutorials/es6/promises/).

There's been some patterns that I use over and over so I wanted to share and document them.

*Please note that the examples used are *mostly* based on my real code, but have been simplified for demonstration purposes.*

<!-- more -->

## Library of choice

Firstly I prefer to use the native implementation, and go bare bones. I'm sure they will be a time that I'll want more than the native API has to offer, but I've not arrived there yet.

I've used [RSVP](https://github.com/tildeio/rsvp.js) in the past and heard decent things about [Bluebird](https://github.com/petkaantonov/bluebird).

On the server side, in node-land, since promises are oddly not available natively, my preferred library is [then/promise](https://github.com/then/promise).

It used to be RSVP, which is mostly bare bones, but I learnt about promise.js' `denodeify` which converts a callback based function into a promise function which can be very useful.

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


## Always end with a catch

Note: this is only in the es6 spec and doesn't appear in Promises/A+ so some implementations are missing `.catch()` support (as I've found with mongoose as it depends on mPromise library).

## Throw over reject

## Cold calling
