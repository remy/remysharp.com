# Throttling function calls

If you've written any kind of validation on user input, like <code>onkeypress</code> then you'll know that sometimes you want to throttle the amount of times your function runs. A good example of this is Ajax based username validation - you don't want to hit the server on every key press, because most users will be able to write their name in around 1/10th of a second, so you *should* throttle the ajax request until the input is dormant for 100ms.

<!--more-->

<div class="update">2&frac12; years later, I decide that <a href="#comment-216435">Ben was right</a> - and nowadays I refer to this as a debounce rather than a throttle. I've updated this post so that the function name reflects what it does on the tin, but also add my own throttle function that fires the callback based on a specific frequency. The throttle function will also always fire the first and last message.</div>

So with a bit of magic JavaScript making use of the ever useful <a href="http://en.wikipedia.org/wiki/Closure_(computer_science)">closure</a> JavaScript offers, we can create a simple method to handle this for us:

<pre><code>function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}</code></pre>

So if you were doing something with jQuery, like a key press validation, you would do this instead:

<pre><code>$('input.username').keypress(<strong>debounce</strong>(function (event) {
  // do the Ajax request
}, <strong>250</strong>));</code></pre>

The keyword <code>this</code> is the input as you would expect, and all the correct arguments are passed to the event handle, i.e. it works the exact same way as you'd expect, except it only fires once the <code>keypress</code> event is idle for 250ms (in this particular case).

Below is an **actual** throttle function, that fires a message every 250ms by default (rather than at the end of a burst of events):

    function throttle(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;
      
        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }

So when you use this, moving the mouse around the [example below](http://jsbin.com/enowox/1/edit), will echo out the tick on the first time you move, but then every 1 second until you stop moving the mouse:

<pre><code>$('body').on('mousemove', <strong>throttle</strong>(function (event) {
  console.log('tick');
}, <strong>1000</strong>));</code></pre>

There's also a [simple rate throttled function](http://remysharp.com/2010/07/21/throttling-function-calls/#comment-497362) in the comments below, that fires on every nth message - though I'd be inclined to tweak it to ensure the first message is delivered 