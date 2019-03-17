---
title: The Silky Smooth Marquee
date: '2008-09-10 09:55:16'
published: true
tags:
  - code
  - jquery
  - marquee
  - plugin
  - project
modified: '2014-09-03 16:15:12'
---
# The Silky Smooth Marquee

As we abused the Internet back in the 90 with tags like <code>&lt;blink&gt;</code> and <code>&lt;marquee&gt;</code> the last 10 years have seen the gradual extinction of these proprietary tags until we did full circle and the [marquee effect appears in CSS 3](http://www.w3.org/TR/css3-marquee/).

There's actually a very strong business case and requirement for the marquee tag - since the only the alternative is often a hacky solution (I feel) that shifts the CSS left position which, depending on your browser, will begin to eat away at your CPU.

Funnily enough, the marquee tag is pretty well supported amongst the browser, but the actual effect is poorly executed natively (which is kind of odd if it's built directly in to the browser).  So let's solve this with JavaScript.


<!--more-->

## Demo

This demonstration shows 3 *jQuerified* marquees and 3 standard marquees. You can see how the untouched marquees are jumpy to animate, even in the later browsers such as Firefox 3 and Safari - let alone IE6.

[Demonstration of jQuery Marquee](http://remysharp.com/demo/marquee.html)

## Download

[Download jQuery marquee plugin](https://gist.github.com/2484402)

## Usage

Include the [latest jQuery](http://jquery.com/) and the plugin file via the <code>script</code> tag, then:

<pre><code>$('marquee').marquee(optionalClass);</code></pre>

Note that the enhanced marquee doesn't particularly have to apply to a marquee tag - but it is reading the effect details from the tag - currently it will default to behaviour = scroll, dir = left, speed = 2.  There's no (current) option for setting an overall default - but I'll add this if people feel it's required.

## How it Works

There's a few solutions available that create a similar effect, but this plugin does two things differently:

1. Progressively enhances the <code>marquee</code> tag making this plugin uber easy to use.
2. The effect is **not** achieved using CSS.  It's created using the overflow scroll on the element, which massively reduces the work the browser has to do - i.e. there's no re-rendering due to changes in CSS, it's scrolling using native functions of the browser.

It's worth noting that behind the scenes, the <code>marquee</code> tag is being lifted out of the DOM and replaced with <code>div</code>s.  However, when it's chains in jQuery, it returns the new enhanced marquee <code>div</code>, so you can still hook click events, or navigate the DOM element if you wish - i.e. business as usual.

However, be warned - as we are lifting the <code>marquee</code>'s contents in to a new <code>div</code>, it means and predefined events or data will be lost.  To avoid this, make sure the marquee plugin is called before hand.

## Events

The following events can be bound to:

* stop - triggers when a loop is completed
* start - triggers when a loop is started
* end - completely finishes the loops if set

The follow events can be triggered by the user:

* pause/stop (both do the same thing)
* unpause/start (both do the same thing)

## Support

I've written the marquee to run on a single timer function rather than one per marquee, the idea being that you *could* go crazy and add lots of marquees, and this code should scale<sup>&dagger;</sup>.  

<del>Also, the marquee doesn't currently support <code>direction="up"</code> or <code>direction="down"</code>...yet.  Come back later and I'll upgrade if there's any interest.</del>

The marquee plugin now supports all directions.

<small>&dagger; I've not tested it with more than 3 marquees yet - feel free to test and give feedback</small>

## Other Uses

I've played around with the implementation of the marquee and I've been able to easily create the effect of the user clicking and dragging the marquee back and forth - which is very smooth (note that before I start the drag effect, I need to trigger a stop event):

<pre><code>$('div.demo marquee').marquee('pointer').mouseover(function () {
  $(this).trigger('stop');
}).mouseout(function () {
  $(this).trigger('start');
}).mousemove(function (event) {
  if ($(this).data('drag') == true) {
    this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
  }
}).mousedown(function (event) {
  $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
}).mouseup(function () {
  $(this).data('drag', false);
});</code></pre>
