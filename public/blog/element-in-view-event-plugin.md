# Element 'in view' Event Plugin

I've been preparing a few articles for [jQuery for Designers](http://jqueryfordesigners.com/ "jQuery for Designers - Tutorials and screencasts") and for [.net magazine](http://www.netmag.co.uk/) and in doing so I've had to write a plugin that could prove to be useful to share.

I've created an event that will trigger when the element is scrolled in to the viewport.


<!--more-->

## Preamble

First of all, this isn't *really* a plugin.  It's a utility of sorts.  It's not really a plugin, because you don't call it. It binds on to the scroll event and does the work for you.

Also, I'm aware that there is the [lazyload plugin](http://www.appelsiini.net/projects/lazyload "Lazy Load Plugin for jQuery").  I've not had real time to play with it, but I suspect there's some similarities, though my inview plugin is extremely stripped down (because I wrote it for a particular purpose).  Also note that my code only works for vertical scroll, and not horizontal.

I should also add that this utility/plugin was inspired by [Dustin Diaz's](http://www.dustindiaz.com/ "Dustin Diaz: ./with Imagination") [detect when an element scrolls in to view](http://www.dustindiaz.com/element-scroll-into-view/) code.

## Demo

The example is mostly *lorem* text, but in the middle of the page is an element whose text reads: "You can't see me".  When the element is scrolled in to view it will change to "You found me".  

To confirm this, open firebug while the element is out of view, and watch the element in question as you scroll it in to view.

[http://jsbin.com/ugupa/1](http://jsbin.com/ugupa/1) (to edit: [http://jsbin.com/ugupa/1/edit](http://jsbin.com/ugupa/1/edit))

## Download

[Download jQuery inview event plugin](http://remysharp.com/downloads/jquery.inview.js)

## Usage

The script makes use of the new [$.support](http://api.jquery.com/?support) properties - so it will only work with jQuery 1.3 upwards.  If you need to use it with older versions of jQuery, drop a comment, and I'll post an alternative.

The event will only fire when the element comes in to view of the viewport, and out of view.  It won't keep firing if the user scrolls and the element remains in view.

**Bear in mind** if think the element may already be in view, you may need to *kick* the scroll event (using <code>$(window).scroll()</code>).  If you include this plugin last (i.e. *after* you've hooked in to the event), then the script will automatically trigger the scroll event - therefore sending the event to your bound element.

The variable after the event argument indicates the visible state in the viewport.

<pre><code>$('div').bind('inview', function (event, visible) {
  if (visible == true) {
    // element is now visible in the viewport
  } else {
    // element has gone out of viewport
  }
});</code></pre>

To stop listening for the event - simply unbind:

<pre><code>$('div').unbind('inview');</code></pre>

Remember you can also bind once:

<pre><code>$('div').one('inview' fn);</code></pre>

## How it works

When the window is scrolled, the event checks the position of the elements against the viewport height and the <code>scrollTop</code> position.

However, I wanted to create a utility that would only check the elements that were registered under the 'inview' event, i.e. I didn't want to keep checking the element list if we <code>unbind</code> from the event.

This is achieved by dipping in to the <code>$.cache</code> store within jQuery, and looping through, looking for the elements tied to the 'inview' event. 

This way the user can treat it like a native event on the page.