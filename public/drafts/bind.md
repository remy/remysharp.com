# Tiny two way data binding

Data binding to the DOM is just one of those things that's damn handy when you've got it and super laborious when you don't. The problem is that it usually comes at a price of a hefty framework (hefty can apply to byte-size, but more often: the learning curve to use said framework).

So, as any good re-inventer of wheels, I wrote my own two-way data binding library, partly to experiment, partly to solve existing needs in my own projects.

I present (cleverly named): [bind.js](https://github.com/remy/bind)

<!--more-->

## Demo time



## HTML decorators

No. I was recently debugging some Knockout code, and found myself struggling as I realised that the actual binding was happening in the HTML, and the manipulation was happening in the separate JavaScript file.

So no, there's no `data-*` support, intentionally. All the code lives in one place: in the JavaScript.