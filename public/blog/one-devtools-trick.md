# One weird devtool trick this developer uses. {$experts} hate him!

For reasons that say more about me than anything else, those posts entitled *"3 things you didn't know about XYZ"* always bugged me. Lately they've softened to *"you probably didn't know"*. But being a smug know-it-all, when it comes to devtools, I tend to know (*nearly*) all the tricks.

Anyway, here's my contribution!

<!--more-->

## $$ > $

Hopefully you already know that if the `$` name space isn't taken already, devtools will give you access (from inside the console only) to a `$` function that you can pass a CSS expression and it will return the first matching DOM node:


```
$('a') === document.querySelector('a')
```

This is useful, but if you're familiar with jQuery, then you might want a collection of matching elements rather than just the first one.

`$$` will return a collection, but what's cool is that this is not the result of `document.querySelectorAll`. The result of a call with `$$` is actually an array, so it comes pre-packaged with `.map`, `.forEach`, `.reduce` and so on.

So in fact, this is what `$$` is (approximately):

```
let $$ = (expr, ctx = document) => {
  return Array.from(ctx.querySelectorAll(expr));
};
```

A few notes on *my* implementation above:

- Using `let` because user code can overwrite it
- Using default arguments to set `ctx` to the root node if it's not passed in
- `Array.from` will cast the result from `querySelectorAll` to an Array
- Multi-line just so it fits nicely on my blog :)

I've not actually see the source to the console code, but I do know that devtools does a little bit more in that if the `ctx` argument isn't a DOM node, it'll default to the `document` node (i.e. you can pass a string in devtools, and it will be ignored, whereas my code above will throw an exception).

So, now you know you can do some fun-time DOM node manipulation straight off the result of `$$`.

If you want learn more devtools from me, I'm [running in person workshops](https://2016.ffconf.org/workshops#debug-and-tools) and I'm working on **online video workshop series** on devtools. [Subscribe if you want early access](https://remysharp.com/subscribe).
