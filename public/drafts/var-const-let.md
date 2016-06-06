# var const let

As I slowly make my way into the land of ES6 (sure I started mid-2016 when all the cool kids were doing it for years) I've been presented with the problem of: when do you use `const` and when do you use `let` and do I still use `var`.

**TL,DR:** always use `const`, except for primitives whose value will change, then use `let`.

<!--more-->

## 🚮 var: no more

Don't use `var` at all. Which sucks, because I've got over 17 years of muscle memory writing `var`.

Which is sort of sad because now I can't do any magic [hoisting](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/var#var_hoisting). Which, in fact is almost enough by itself to *stop* using `var`. However, we also now have `const` and `let` to define variables and `var` really isn't needed.

<small>Honestly, I can't see the need for this at all anymore…maybe I'm wrong though?</small>

## 💎 const: always, but not always

The first important thing to always keep in mind when using `const` is that it's not really *really* constant. Or more specifically, it doesn't make objects *immutable*.

The best way (I've found) to think of `const` is that the variable that you assign with `const` is an immutable *pointer*. Primitive types, such as strings, booleans and numbers can't be changed - since the variable is pointing directly at the primitive (so you can't do [`const a = 10; a++`](http://jsconsole.com/?const%20a%20%3D%2010%3B%20a%2B%2B)). Objects and arrays on the other hand, can have their properties changed.

If you do really want an immutable object, you can use `const` in combination with [`Object.freeze`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) which protects your object entirely:

![Using const and object.freeze to create an immutable object](/images/const.png)

However, it's been argued by many that using `const` is a way to document your *intent* with a variable to a future reader of the code. My thoughts: **always use `const`**.

## ☔️ let: the exception

Assuming you (or I) only use `const`, the only exception is when I know that the variable's contents will change. For instance, in a `for` loop, or some dynamic allocation. Then, and only then, do I need to use `let`.

<small>Filing this post under "stuff I shoulda learnt 18 months ago"</small>




