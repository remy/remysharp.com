---
title: An adventure in sparse arrays
image: /images/adventures-in-arrays.png
date: '2018-06-26 14:28:42'
modified: '2018-06-26 13:12:47'
tags:
  - code
published: true
---
# An adventure in sparse arrays

I offered to coach JavaScript recently, and an exercise I dreamt up was to implement every array (prototype) method, and write tests that they work.

Since I'd come down with tonsillitis which apparently comes with a full on bedridden fever, I thought I'd have a go myself. And I learnt a few things along the way. Today, I wanted to share the swiss cheese wonder of sparse arrays!

(see what I did there? 🧀)

<!--more-->

There is a [TLDR](#in-summary-aka-tldr) if you really want to skip all my lovely words!

## A closer look

A sparse array is an an array with _"holes"_. Holes tend to look like `undefined` (when logging), but they're not really not defined. It's just that JavaScript doesn't have a value for a hole, which…one might argue is undefined, but alas, that value for undefined value is already in use!

<small>More recently Chrome started using `empty` for holes…which makes sense, but spoils my fun…</small>

A few fun ways to view sparse arrays:

```js
new Array(1) // hole × 1
[ , ] // hole × 1
[ 1, ] // int(1), no holes, length: 1
[ 1, , ] // int(1) and hole × 1
```

Obviously that last example is super precious, you're left to spot the difference between the comma that causes the sparse array, and the comma that's treated as a trailing comma and is ignored entirely by JavaScript.

Then there's the fun confusion of trying to look at a hole…which I'm now starting to liken to a black hole in my mind (to be interpreted both ways.).

```js
const a = [ undefined, , ];
console.log(a[0]) // undefined
console.log(a[1]) // undefined
```

These values are both undefined, but not because they're both undefined. WAT? `a[0]` points a set array element containing the value undefined. Whereas `a[1]` is _not_ set to any value (it's a hole remember), but any value not defined is undefined. So, they kinda look the same.

There still be hope! A one line `prop in object` can tell us if we're looking at a hole:

```js
const a = [ undefined, , ];
console.log(0 in a) // true
console.log(1 in a) // false
```

So we're all safe now right? we've escaped the clutches of the unknown undefined but not undefined hole. Nope, as [The O.G. Daddy of JavaScript pointed out on Twitter](https://twitter.com/BrendanEich/status/1011325822261575681), there's potential risk if there's any 3rd party scripts or libraries involved (which unless your code is 100% siloed, is likely at some level). A 3rd party could tamper with the array prototype and:

```js
// elsewhere in boobooland
Array.prototype[1] = 'fool!'
// and in my code
const a = [ undefined, , ];
console.log(0 in a) // true
console.log(1 in a) // true … 😱
```

As with most things in JavaScript, the _proper_ way of checking whether there's a hole or not requires using a method I barely remembered even existed:

```js
// elsewhere in boobooland
Array.prototype[1] = 'fool!'
// and in my code
const a = [ undefined, , ];
console.log(a.hasOwnProperty(1)) // false
// 👊 have some of that boobooland
```

Since `hasOwnProperty` is from the days of ES3, using that method allows you to officially call yourself a _Retro Scripter_.

## But why?

Performance is a really good reason these holes exist. Say you create a `new Array(10000000)` (10 million). There's not actually 10 million allocated values in that array, and the browser isn't storing anything.

## Tripping over maps

The cherry on the top, is that I always trip up on sparse arrays combined with map, forEach and filter (though I'm sure it has some funsies effects on other callback-based methods too).

The callback passed to `forEach` will skip over holes. Makes sense. It seems right that a fully sparse array doesn't have any _for-eaches_:

```js
const a = new Array(100);
let i = 0
a.forEach(() => i++);
console.log(i) // 0 - the callback is never called
```

It is worth noting that the array is still walked, and the larger the array, the longer the `forEach` will take, even if it's sparse. Oddly, I ran some (contrived) tests that showed it took ~85ms to run `forEach` on a 10 million sparse array, but over 20 seconds for 100 million. Weird.

Then there's `map`. The `map` function, like `forEach` doesn't call on the hole, but it will _always_ return the hole in your result.

```js
const a = [ undefined, , true ];
const res = a.map(v => typeof v);
console.log(res) // [ "undefined", hole × 1, "boolean" ]
```

This `map` with sparse arrays also explains why my goto method for generating an array of numbers from 1 to 9 (for instance) would never work:

```js
new Array(10).map((_, i) => i + 1) // hole × 10
// not 1, 2, 3 … etc 😢
```

And then `filter` is just like, "meh, screw you all, no one wants sparse arrays", so it just removes them no matter what:

```js
const a = [ undefined, , true ];
const res = a.filter(() => true);
console.log(res) // [ undefined, true ] - no hole 🤔
```

…which, I guess makes sense, since the result of a filter is every element whose callback returned a truthy value, and since the hole wasn't invited to the party (as we saw in `forEach`), then it's never even considered, so the `filter` result is _never_ sparse.

## Walking in sparseland

There's two ways to guarantee iterating over the elements that don't exist in a sparse array. The first is a "classic" loop (I'm using a `for`, but a `while` or `do/while` will work too):

```js
const a = new Array(3);
for (let i = 0; i < a.length; i++) {
  console.log(i, a[i]) // logs 0…2 + undefined
}
```

In addition, there's the new ES6 array methods `values` and `keys`, both of which include sparse elements. This also means that array spread will translate holes into `undefined`. This is because under the hood, array spread is using the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

This means that if you intend to copy an array, you should be very wary of spread and possible stick to slice.

```js
const a = [ 1, , ];
const b = [ ...a ];
const c = a.slice();

expect(a).toEqual(b); // false
expect(a).toEqual(c); // true
```

Here's a "clever" (read: not very good or even remotely clever) emoji sequence to help you in the future: 🔪🙅🍞👍

## Sometimes sparse is okay

As I mentioned earlier, a sparse array is going to outperform to generation time when compared to using `Array.from({ length })`. Here's some very rough timings I got from Chrome Canary:

```js
const length = 1000000; // 1 million 🧐
new Array(length); // ~5ms
Array.from({ length }) // ~150ms
```

The reason `Array.from` is so much slower, is that it's populated with _real_ `undefined` values, and not holes. For typical daily use cases, I suspect that it won't really matter which you use. If you were working with something that handles a lot of data, perhaps audio samples, then a sparse array is clearly (I think) the way to go.

## In summary aka TLDR

A trailing comma in array syntax is simply ignored.

```js
[ 1, 2, 3, ] // no hole at the end, just a regular trailing comma
```

Empty values between commas create holes and thus sparse arrays - these are known as: holes, empty or an elision (apparently)

```js
[ 1, , 2 ] // hole at index(1) aka empty
```

Detecting a hole is done using `array.hasOwnProperty(index)`

```js
[ 1, , 2 ].hasOwnProperty(1) // false: index(1) does not exist, thus a hole
```

Iterating methods, such as `map`, `forEach`, `every`, etc won't call your callback for the hole

```js
const a = new Array(1000);
let ctr = 0;
a.forEach(() => ctr++);
console.log(ctr); // 0 - the callback was never called
```

`map` will return a new array _including_ the holes

```js
[ 1, , 2 ].map(x => x * x) // [ 1, <empty>, 4 ]
```

`filter` will return a new array _excluding_ the holes

```js
[ 1, , 2 ].filter(x => true) // [ 1, 2 ]
```

`keys` and `values` return iterator functions that do iterate over hole (ie. includes them in a `for key of array.keys()`)

```js
const a = [ 'a', , 'b' ];
for (let [index, value] of a.entries()) {
  console.log(index, value);
}
/* logs:
- 0 'a'
- 1 undefined
- 2 'b'
*/
```

Array spread `[...array]` will transform holes into `undefined` (which will also increase memory and affect performance)

```js
[...[ 'a', , 'b' ]] // ['a', undefined, 'b']
```

Large sparse array creation is fast - much faster than `Array.from`.

```js
const length = 10000000; // 10 million
new Array(length); // quick
Array.from({ length }) // less quick
```

---

In practise though, for me, it just helps to remember these pitfalls (a pun, yes), as they rarely cause me any real trouble day-to-day.
