# $ in code examples

My blog includes a lot of code examples throughout the many blog posts I have, and I'm a big proponent of copy & paste code examples, i.e. if I can make it easy to copy, I want it to work when it's pasted.

So here's two ways you can prefix terminal code examples with a `$` and not make it selectable (so it isn't included in the copy/paste op).

<!--more-->

## Method 1 - adding `$` in post

I'm mixed on whether the source of my posts include the `$` in the code examples, but this method will add it in afterwards, but splitting the `code` element into individual lines, then wrapping each line with a `span` element that's styled with a `:before` pseudo selector.

Firstly the JavaScript. I'm making an assumption that all code examples for the terminal have a class name of `.bash` (yours might be something similar, or you could apply to _all_ elements):

```javascript
// I've used vanilla JS, but feel free to port to jQuery, etc
const $ = (expr, ctx = document) => {
  return Array.from(ctx.querySelectorAll(expr));
}

$('code.bash').forEach(elem {
  const replaced = elem.textContent
    .split('\n') // break into individual lines
    .filter(Boolean) // strip empty lines
    .map(line => line.replace(/^\$ /, '')) // remove leading $[space]
    .join('</span>\n<span class="line">')); // wrap with span.line

  elem.innerHTML = `<span class="line">${replaced}</span>`;
});
```

Then a simple dash of CSS for the `span.line` selector:

```css
code.bash .line:before {
  content: '$ ';
  opacity: 0.5;
}
```


This quick tip is for styling code examples that have a `$` for the command line, but allow it to be properly copied.

## Step 1: include some JavaScript

Yep, sorry, but I need JavaScript to solve this. Though you could (if you wanted to do the little bit of extra work), prepare the HTML on the server side. What I need to achieve is a wrapping `span` around each line in the code example.

```javascript
// I've used vanilla JS, but feel free to port to jQuery, etc
const $ = (expr, ctx = document) => {
  return Array.from(ctx.querySelectorAll(expr));
}

$('pre > code.language-bash').each(function () {
  const el = this;
  const replaced = el.textContent
    .split('\n') // break into individual lines
    .filter(Boolean) // strip empty lines
    .map(line => line.replace(/^\$ /, '')) // remove leading $[space]
    .join('</span>\n<span class="line">')); // wrap with span.line

  el.innerHTML = '<span class="line">'+replaced+'</span>';
});

$('pre > code.language-sh').forEach(function () {
  this.innerHTML='<span class="line">'+(this.textContent.split('\n').filter(Boolean).map(function (line) {
    return line.replace(/^\$ /, '<span class="bash-prompt">$ </span>');
  }).join('</span>\n<span class="line">'))+'</span>';
});
```

