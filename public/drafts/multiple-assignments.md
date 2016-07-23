# Multiple assignments

As I slowly join the masses in using ES6 to a fuller extent (than my previous `Promise` only-ES6), I'm discovering new and interesting ways to play with the language. I'm even learning that some stuff just didn't work the way I thought.

<!--more-->

## Multiple assignments

It's not uncommon to see multiple assignments in a single line in my code. Something like this:

```js
// creating short variable name to exports
const app = module.exports = { /* exports */ };
```

Though, it's almost an anti-pattern because it could leak a global by accident. Take this code in the browser for instance:

```js
function calc(v) {
  var value = max = 10;
  // …
}
```

Yup, I've leaked the `max` value as a global. Still, so long as I'm careful, it's useful.

## Destructuring

This is where I got caught out. Take the following example (though mildly convoluted). The intention of the following code was to take a pre-existing object (the value on the right hand side), destruct it into a new object containing a subset of the properties from the <abbr title="right hand side">RHS</abbr>.

So in the example below, what's the value of `one.c`?

<a class="jsbin-embed" href="https://jsbin.com/galujos/4/embed?js,console&amp;height=150px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.38.7"></script>

## What did I expect?

In the past, when I look at multiple assignments, I've always read it a bit like right-to-left presidence. Sort of like this:

```
// a = b = 10
b = 10, a = b;
```

**What you're signing on the left, is the result of the expression on the right.**

This doesn't have any significance when you're assigning something simple like `a = b = 10`, because the result of the expression `b = 10` is `10`.

However, this is important when I was working with destructuring (in the example [above](#destructuring)), because the result of the expression is the right hand side, is the value of `two`.

Since the result of the of `{ a, b, d} = two` is the value of `two`, then the value of `one.c` will be the same as `two.c`, not `undefined` as I had hoped.

## What's really going on here?

This might be easier to you get your head around if you look at the following example:

<a class="jsbin-embed" href="https://jsbin.com/vipava/8/edit?js,console&amp;height=300px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.38.7"></script>

In the first expression, I'm assigning `a = 2`, but `a` has a `set` method, and doesn't do anything with the value. The *result* of the expression is logged out: `2`. This is irrespective of the value of `a`.

When I log the value of `a` again, it's `1` and was never modified.

## Further reading

When I saw the value wasn't what I expected, it was pretty straight forward to adjust my thinking and understand that the <abbr title="right hand side">RHS</abbr> is more important, but it was fun to wrap my head around *why*.

Here's a few extra resources I found handy to get my head around it:

- [Sebastian McKenzie](https://twitter.com/sebmck/status/755803264306864129) – creator of Babel
- [Brendan Eich](https://twitter.com/BrendanEich/status/755915609188077570) – creator of JavaScript
- Kyle Simpson's [You Don't Know JavaScript](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#destructuring-assignment-expressions) on Destructuring Assignment Expressions
