# Faking progress (simple edition)

If you're familiar with the github.com website, then you'll be familiar with the effect (as of 2016) when you click from a repo to the issues or PRs or search for files…there's a progress loader at the top of the page, and the updated content is loaded in.

I suspect it feels "ajaxy" to me because I've got a good sense of how websites work. That said though, visual feedback that _something_ is happening is useful (IMHO). I've recently started adding this _effect_ without the ajax part to give the user an impression of progress.

<!--more-->

Here's a simple working demo: [https://loader-simple.isthe.link](https://loader-simple.isthe.link/)

## Why "faking"?

I'm going to apply a progress bar across the entire site every time the visitor clicks on a link or submits a form. The reason for this is that there maybe some server side processing that needs to be done before the browser gets a response, and during that time it can still run code from the current page:

![Animation period](/images/anim-during-network.png)

Specifically, I'm going to kick off an animation that's visible until the initiated request starts to come back. I've edited a short video showing this in action (though its quick and there's a number of moving parts):

<iframe src="https://player.vimeo.com/video/195803457" width="640" height="515" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

When (or why) would you use this? I'm using this process when I know the server can take a few seconds to respond (due to large API requests and related latency). I'm also finding it quite satisfying* session the web page respond to my direct input (even though the browser's chrome does offer feedback via the throbber against the tab).

<small>* not based on research, only my own meandering experience!</small>

## Method 1: the simple version

This is the "noddy" version, very basic, but equally works quite nicely. On any click or form submission, the loading animation starts. The only downside is if the visitor stops loading the page (manually) or the page load times out: the animation remains animating.

I've added the following CSS to my styles (originally based on this [codepen](http://codepen.io/brunjo/pen/XJmbNz)):

```css
html.loading:before{
  display: block;
  position: absolute;
  content: "";
  left: -200px;
  width: 200px;
  height: 4px;
  animation: loading 2s linear infinite;
  background-color: #B3E5FC;
}

@keyframes loading {
  from {left: -200px; width: 30%;}
  50% {width: 30%;}
  70% {width: 70%;}
  80% { left: 50%;}
  95% {left: 120%;}
  to {left: 100%;}
}
```

Then I add in a little JavaScript to enhance:

```js
// you can use jQuery, or these few lines from Paul Irish:
// https://git.io/blingjs
window.$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};
NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (el, i) {
    el.on(name, fn);
  });
};

// now the loading animation logic:
$('form').on('submit', startLoader);
$('a').on('click', startLoader);

function startLoader(event) {
  if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
    document.documentElement.className = 'loading';
  }
}
```

The `startLoader` function includes an important check to make sure the visitor is intending to load the page in the current window, i.e. don't show the loader if they open a new tab.

**Pros:** small JavaScript logic, works on all clicks & submits for both external and internal URLs.

**Cons:** doesn't handle user cancelled requests and network failures.

Overall, a fairly simple from a technical perspective, but equally naïve implementation. In tomorrow's post, I'll show you how to do similar functionality, but using Service Worker instead.
