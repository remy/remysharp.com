# My promise patterns

I've been getting big into promises over the last year. I think the two best resources that I've learnt from today is Forbes Lindesay's [talk at JSConf.EU 2013]() and Jake Archibald's excellent [promise article on html5rocks]().

There's been some patterns that I use over and over so I wanted to share and document them.

<!-- more -->

## Library of choice

Firstly I prefer to use the native implementation, and go bare bones. I'm sure they will be a time that I'll want more than the native API has to offer, but I've not arrived there yet.

On the server side, in node-land, since promises are oddly not available natively, my preferred library is promise.js.

It used to be RSVP, which is mostly bare bones, but I learnt about promise.js' `denodeify` which converts a callback based function into a promise function which can be very useful.

## Clean shallow chains

This means my initial promise code would look like:

```js
validate(user)
  .then(save)
  .then(welcomeEmail)
```

This is easy if these are all my functions, but I can also do this with third party libraries via `denodeify` (a feature of the promise.js library, though most promise libraries have something similar) – turn a callback pattern function into a promise based function.

```js
var readFile = Promise.denodeify(fs.readFile):

readFile('welcome.txt')
  .then(emailToUser('rem'))
```



## Prebake

Using bind

## Always end with a catch

Note: this is only in the es6 spec and doesn't appear in Promises/A+ so some implementations are missing `.catch()` support (as I've found with mongoose as it depends on mPromise library).

## Throw over reject

## Cold calling
