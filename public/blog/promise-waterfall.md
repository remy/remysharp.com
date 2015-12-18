# Promise waterfall

I use promises a lot in my development process. I find them extremely pliable for my needs. However, for whatever reason, I don't use abstractions for most of my development, which is to say I use vanilla promises unencumbered by an additional API to learn.

Recently I needed to run a series of promises, but I had to also solve a race condition, so they had to run in sequence (i.e. a waterfall). I know libraries like [async.js](https://github.com/caolan/async) have this baked in, but I wanted to write up how to go about doing it without a library.

<!--more-->

## The setup

My particular case I was running promises that took an undetermined amount of time to complete. In the interest of keeping things simple, let's say the following is what the promise has to run, and it will return a sequence number:

```js
var guid = 0;
function run() {
  guid++;
  var id = guid;
  return new Promise(resolve => {
    // resolve in a random amount of time
    setTimeout(function () {
      console.log(id);
      resolve(id);
    }, (Math.random() * 1.5 | 0) * 1000);
  });
}
```

## First in parallel

To get values 1..10 I would then call the `run` function via an array of promises through `Promise.all` (note that this is run in parallel and not in sequence at this point):

```js
// make an array of 10 promises
var promises = Array.from({ length: 10 }, run);

Promise.all(promises).then(console.log);
// => [1,2,3,4,5,6,7,8,9,10]
```

Note that the console logs in the bin below are *out of order*, but the final result is correct (which is what we'd expect with `Promise.all`):

<a class="jsbin-embed" href="https://jsbin.com/hivate/1/embed?js,console">parallel on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.35.5"></script>

## Now as a waterfall

Promises naturally waterfall into each other, but for an undetermined length of an array, I need to recursively chain the promises together, passing the aggregate result from the previous promise into the next, and so on. A perfect match for `[].reduce`.

```js
var promise = Array.from({ length: 10 }).reduce(function (acc) {
  return acc.then(function (res) {
    return run().then(function (result) {
      res.push(result);
      return res;
    });
  });
}, Promise.resolve([]));

promise.then(console.log);
```

Remember that the `Array.form({ length: 10 })` is simply generating an array from 0 to 9 for this demo purpose. Also note that `run()` is *inside* the reduce function, and the end result is no longer an array of promises, but in fact a single promise (and so I drop the use of `Promise.all`).

Now you can see from the JS Bin below that the promises run in sequence (I've added a console):

<a class="jsbin-embed" href="https://jsbin.com/nitoti/6/embed?js,console">waterfall on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.35.5"></script>

## Worth noting

Obviously the waterfall of promises is going to take longer to complete than a parallel run of the promises, but as I mentioned at the start of this post, I needed to solve a race condition, and this was the solution I needed.