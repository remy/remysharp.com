# One devtools trick I'm sure you won't know!

For reasons that say more about me than anything else, those posts entitled "3 things you didn't know about XYZ" always bugged me. Lately they've softer to "you probably didn't know". But being a smug know-it-all, when it comes to devtools, I tend to know (*nearly*) all the tricks.

So here's one that even surprised me. 

## $$ > $

Hopefully you already know that if the `$` namespace isn't taken already, devtools will give you access (from inside the console only) to a `$` function that you can pass a CSS expression and it will return the first matching DOM node:


```
$('a') === document.querySelector('a')
```

This is useful, but if you're familiar with jQuery, then you might want a collection of matching elements rather than just the first one.

`$$` will return a collection, but what's cool is that this is not the result of `document.querySelectorAll`. The result of a call with `$$` is actually an array, so it comes prepackaged with `.map`, `.forEach`, `.reduce` and so on.

So in fact, this is what `$$` is:

```
let $$ = (expr, ctx = document) => Array.from(ctx.querySelectorAll(expr));
```

So, now you know you can do some fun times DOM node manipulation straight off the result of `$$`.