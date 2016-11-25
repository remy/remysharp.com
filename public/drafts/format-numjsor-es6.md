# format-num.js…or ES6!

This is a quick tip post, but there's a tonne of "cool" syntax features in ES6, but when you dig around a little more you'll find a few nicities knocking around (which I tend to find by playing in devtools' console).

<!--more-->

I was recently working on a node based project which needed to format a number from `1600.6666` to `£1,600.67`. Initially I went spelunking for a npm package that did the job for me. I found [format.js](http://formatjs.io/) and [numeral.js](http://numeraljs.com/)…and quite a number of other options.

But why add another library to my code, when I can use ES6?

## toLocaleString(…)

Enter `toLocaleString` with powerups! Firstly, the function is available on a few prototype chains, including `String` and `Number`. We want the the `Number` (i.e. `"1000".toLocaleString()` doesn't do want we want).

Let's take a look:

<a class="jsbin-embed" href="https://jsbin.com/pihahih/1/embed?js,console">toLocaleString demo on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.40.2"></script>
