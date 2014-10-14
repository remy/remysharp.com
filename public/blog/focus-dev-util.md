# Element focus utility

I've recently been looking at retrofitting keyboard navigation support to JS Bin, but I was immediately struck by the totally lack of visibility on *what* was in focus.

<!--more-->

Sure, this is a short-coming of the original design and bad choises I had made with JS Bin's code base. Perhaps you can see from the animation below, when the `body` is in focus, tabbing is focusing *something* but until I actually tab to the "HTML" panel title, there's no visual feedback as to *what* I should be fixing:

![Tab focusing is clueless](/images/tab-focus-clueless.gif)

If you can see it, the browser's status bar tells me that I'm moving focus, but it's near impossible to work out which element I'm working with.

So I built a mini utility to visualise what's happening. Now with that utility:

![Tabbing visible](/images/tab-visibility.gif)

## Installation

Either add the code directly to your project as a debug dependancy, or use it as a snippet in your devtools:

```js
(function () {
  var active = document.createElement('pre');
  document.body.appendChild(active);
  active.tabindex = -1;
  with (active.style) {
    position = 'fixed';
    padding = '2px';
    bottom = right = '20px';
    margin = 0;
    fontSize = 12;
    color = '#fff';
    background = '#aaa';
    whiteSpace = 'pre-wrap';
    maxWidth = '95%';
  }

  var lastActive = null;
  var showActive = function () {
    var el = document.activeElement;
    var html = '';
    var attrs = el.attributes;
    var i = 0;

    if (el !== lastActive && el !== active) {
      for (; i < attrs.length; i++) {
        html += ' ' + attrs[i].name + '="' + attrs[i].value + '"';
      }

      active.innerText = '<' + el.nodeName.toLowerCase() + html + '>';
      lastActive = el;
    }

    requestAnimationFrame(showActive);
  }

  showActive();
})();
```

Here's a live demo:

<a class="jsbin-embed" href="https://jsbin.com/bexugo/1/embed?output">JS Bin</a><script src="https://drt35l4oshkgr.cloudfront.net/js/embed.js"></script>

So now I have visibility on *what* is being focused, I can fix various issues ranging from `outline` being removed, only including `:hover` styles and not `:focus` and applying *proper* [menu logic](http://oaa-accessibility.org/example/25/) to menu-like objects.