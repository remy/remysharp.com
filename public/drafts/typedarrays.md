# Arrays and Typed Arrays

Typed arrays arrived in JavaScript some time ago but until recently I hadn't really had much cause to play around with them. However, with a few recent projects, I've had the pleasure of deep diving my learning on typed arrays, how they work and what they're for.

## The old reliable array

Prior to typed arrays, JavaScript had (or rather _has_) a primitive called an array. There's lots to be known about the array and I'll touch briefly on a few of it's best hits here before I move on to the _typed_ array.

Firstly, you can create a new array using two different syntaxes, using the array constructor and the literal:

```js
const a = new Array();
const b = [];
```

An age old question is: is one of these better than the other, and which should I use?

You'd be hard pushed to find a _technical_ reason why one is better than the other. Both will gzip up nicely, and both return an array that you can manipulate. However, the `new Array` syntax can be misleading.

The array constructor can take an argument. So you can create an array that's 10 elements big, and each element has an `undefined` value:

```js
const a = new Array(10);
console.log(a.length); // => 10
console.log(a[0]); // => undefined
console.log(a.toString()); // => ,,,,,,,,,
```

This isn't too bad, but the constructor supports argument overloading. Along with the size of the array (which I'll come back to since it's a red herring), you can also define the array elements in the argument.

Argument overloading isn't new or unique in JavaScript, but it can easily throw off someone coming fresh to the code (or the job). Take the following example:

```js
const data = new Array('a', 'b');
console.log('length: %s, 0: %s, 1: %s', data.length, data[0], data[1]);
// => length: 2, 0: 'a', 1: 'b'
```

That's what we'd expect. What if you had to change the code so it no longer needed the 'b' element?

```js
const data = new Array('a');
console.log('length: %s, 0: %s', data.length, data[0]);
// => length: 1, 0: 'a'
```

Okay. That looks fine. What if it was changed to numbers instead of letters?

```js
let data = new Array(100, 101);
console.log('length: %s, 0: %s, 1: %s', data.length, data[0], data[1]);
// => length: 2, 0: 100, 1: 101

// now we don't need '101'
data = new Array(100);
console.log('length: %s, 0: %s', data.length, data[0]);
// => length: 100, 0: undefined  😲
```

So why use `new Array`? Perhaps if you want to predetermine the size of the array? Well, no, not really. Sure it makes an array of `undefined` elements, but in JavaScript specifically, the array is dynamic. That means that the size is _not_ fixed or preallocated in memory (whereas C or Java would allocate the memory upon creation of the array).

This means that you can `push`, `pop` etc on an array that was created using `new Array(n)`. So that's really _two_ strikes against using the `new Array` method for making arrays - because it can be misleading to other people reading the code.

Pushing a new value onto this kind of array makes the array a _sparse array_ if you've wondered about this term. These `undefined` items are also called holes, and there's some interesting reading at [speakingjs.com](http://speakingjs.com/es5/ch18.html#array_holes) that explains which array methods consider holes, and which do not.

Coincidentally, ES6 introduced a new method `Array.of` that returns a consistent array given the argument. Using the above example, but making use of `of` we can see how the result is what we'd expect:

```js
let data = Array.of(100, 101);
console.log('length: %s, 0: %s, 1: %s', data.length, data[0], data[1]);
// => length: 2, 0: 100, 1: 101

data = Array.of(100);
console.log('length: %s, 0: %s', data.length, data[0]);
// => length: 1, 0: 100 👍
```

### A use for a pre-sized array: Array.from

The only time I've found I needed a predefined size for an array was when I wanted to generate a sequence of values. For example, 1..10. I could populate an array with a `for` loop and `push`, but a few years ago I'd be tempted to use something like a `new Array` combined with a `map` call.

But I've wasted many hours (okay, probably minutes, but still) trying to get the syntax right. Certainly it **isn't this**:

```js
const seq = new Array(10).map((_, i) => i + 1);
console.log(seq); // => Array(10) [ <undefined × 10> ]
```

Instead, ES6 introduced `from` on the Array object which allows me to generate an array at a specific length _and_ populate it during construction.

`Array.from`'s first argument is an "array-like" or iterable object. The "array-like" is important because it means anything that has a length and can be accessed using an index. This means that an object as simple as `{ length: 10 }` is valid, since it has a length, and you can access it by index, albeit you'll get `undefined`, but that's good.

The second argument is a map function. Perfect for what I wanted to do originally:

```js
const seq = Array.from({ length: 10 }).map((_, i) => i + 1);
console.log(seq); // => Array(10) [ 1,2,3,4,5,6,7,8,9,10 ]
```

### Know your Big O's

There's a lot of methods hanging off an array, both the object (`Array`) and array instances. If you're working with "normal" size datasets, then in general, performance should be fine (whatever that actually means). I recently was working with an array with anything between 500,000 to several million items and although `push` and `pop` where generally fine (i.e. didn't take a visible significant amount of time), a `shift` operation takes a long time. By a long time, I literally mean seconds.

Big O notation is when you might see O(n) or O(1) to signify how long a function is going to take. I'm always rusty with what it actually means, so here's a quick primer:

### References

* ["Why never use new Array in Javascript"](https://coderwall.com/p/h4xm0w/why-never-use-new-array-in-javascript) - I wouldn't say "never", but certainly useful information
* [Write up of Big O timings of pop, shift, etc](https://stackoverflow.com/a/22615787/22617)
* [What the heck does O(n) mean anyway?](https://stackoverflow.com/a/2307314/22617)

### Notes

* TypedArray .map/filter/etc return a typedarray, so `new Uint8Array([254, 255]).map(_ => _ + 1)` [ie](https://jsconsole.com/?console.log%28%20...new%20Uint8Array%28%5B254%2C%20255%5D%29.map%28_%20%3D%3E%20_%20+%201%29%20%29)
