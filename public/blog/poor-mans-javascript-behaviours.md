# Poor man's JavaScript Behaviours

JavaScript behaviours are roughly defined as an event handler that is set once, then handled by elements that are created on the fly later on.

For example, if I have a list of links referencing images which are loaded inline, adding an removing the links from this list would not require me to re-hook the event handler.

There is a jQuery plugin called [LiveQuery](http://brandonaaron.net/docs/livequery/) which can handle this for you, and does so by caching the event handler you set and hooking in to the <code>.append()</code>, <code>.after()</code>, etc, methods to reattach the cached event handler to the newly created elements.

The poor man's behaviours takes a different approach.


<!--more-->

The technique is really very simple, and if you've been writing JavaScript you may have already made use of it in some form.  It doesn't use a timer, and makes use of event bubbling.

<script src="http://remysharp.com/js/prettify.packed.js" type="text/javascript" charset="utf-8"></script>

In our example, our HTML would look like this:

<pre class="prettyprint"><code>&lt;ul id="imageLinks"&gt;
  &lt;li&gt;&lt;a href=&quot;/images/1.jpg&quot;&gt;Image 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;/images/2.jpg&quot;&gt;Image 2&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href=&quot;/images/3.jpg&quot;&gt;Image 3&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

Clicking on a link would load the image dynamically, but for our example, we'll just log the image url.

The JavaScript event handling is set on the <code>ul</code> element instead of the <code>anchor</code> elements.

<pre class="prettyprint"><code>// addEvent function for IE + Firefox
var addEvent = (function () {
  return document.body.addEventListener ? function (e, ev, fn) {
    e.addEventListener(ev, fn, false);
  } : function () {
    e.attachEvent("on" + ev, fn);
  };
})();

addEvent(document.getElementById('imageLinks'), 'click', function (event) {
  // only proceed if the user click on an anchor
  var el = event.target;
  if (el.nodeName == 'A') {
    // this is our real event code - which we can read values
    // from the 'el' variable, including .href, .rel, etc. to
    // handle specific like code
    console.log(el.href);
    return false; // cancel click event
  }
});</code></pre>

As you can see the core of the event handling is within the <code>if (el.nodeName == 'A')</code> (note the casing on the nodeName must be capitalised).  If you need to match a class name, you can do it here too.

### Taking it Further

This can be converted to a jQuery plugin, that supports more complicated selector matches, again without any timeouts.

It's limitation over LiveQuery, is that it's restricted to a subset of elements, i.e. a group of links that match X selector within a UL.

<pre class="prettyprint"><code>(function ($) {
  $.fn.behaviour = function (selector, fn) {
    return this.click(function (ev) {
      var el = ev.target;
      if ($(el).is(selector)) {
        return fn.call(el);
      }
    });
  };
})(jQuery);

$(function () {
  $('#imageLinks').behaviour('a', function () {
    console.log('Clicked link: ' + this.href);
    return false;
  });
});</code></pre>

Here's a working [demonstration of poor man's behaviours](/wp-content/uploads/2008/02/behaviours.html)