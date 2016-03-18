# Issues with position fixed & scrolling on iOS

With the release of iOS 5, fixed positioned layout is said to be supported in MobileSafari.

The word *supported* needs to be taken with a pinch of salt, because there's all kinds of issues which I intend to show you in the following post.

<small>Note that I have filed bugs for a number of these during the beta of iOS 5 - but god knows how the Radar Apple thing works, so I don't know the issue numbers.</small>

<!--more-->

<div class="update"><strong>Update:</strong> I've added "scrolling == unusable position:fixed element" based on Corey Duston pointing out <em>more</em> bugs with position fixed.</div>

## position:fixed, who cares?

I might have argued that fixed positioned doesn't matter or isn't really required in a good app. However, there's an increasing number of iOS apps I've noticed that are actually just a collection of WebViews (mini-MobileSafaris) with fixed position toolbars as seen in Apple's own AppStore app, the native Facebook app and Instagram below:

<img src="/images/appstore.jpg" style="max-width: 30%; border: 1px solid #ccc;"><img src="/images/facebook.jpg" style="max-width: 30%; margin-left: 10px;border: 1px solid #ccc;"><img src="/images/instagram.jpg" style="margin-left: 10px; max-width: 30%;border: 1px solid #ccc;">

<small>AppStore via [@devongovett](https://twitter.com/devongovett/statuses/84008944674148352), Facebook via [@9eggs](https://twitter.com/9eggs/status/205558649937072130/photo/1)</small>

## Issues

I've created a number of example pages that you can view for yourself, which are used in the following videos.

### Juddering

If you add `position:fixed` in any normal way as you might on a "desktop" site, you'll see some degree of juddering as the page scrolls.

<iframe width="612" height="341" src="//www.youtube.com/embed/yps8Ea5GO4I?fs=1&amp;#038;feature=oembed" frameborder="0" allowfullscreen></iframe>

Note that this is the simulator running, but I've also captured the [real iPhone](http://www.youtube.com/watch?v=T5P0x5NPr3M&hd=1) (using Reflection) showing the same behaviour.

The page used was: [jsbin.com/3/ixewok/6/](http://jsbin.com/3/ixewok/6/) ([edit](http://jsbin.com/3/ixewok/6/edit?html,css,live))

### No updated values on scroll

The sharp eyed viewer might have spotted some values changing in the video. I'm monitoring the `window.scrollTop` and `window.pageYOffset` (and another value which we'll look at later). You'll notice that the values don't change *until* the scroll has finished.

This is a problem if you want to monitor the page position to simulate effects like the bumping and shunting of category headings like you might see in the address book app.

### Position drift

If the page is zoomed at all, which you can get in iOS when the user rotates from portrait to landscape, as the user scrolls in any scale beyond 1 (i.e. zoomed), the position fixed element drifts upwards (I've seen this drift entirely out of view before in other sites):

<iframe width="612" height="341" src="//www.youtube.com/embed/YIOdPf7jqK4?fs=1&amp;#038;feature=oembed" frameborder="0" allowfullscreen></iframe>

The page used was: [jsbin.com/3/ixewok/6/](http://jsbin.com/3/ixewok/6/) ([edit](http://jsbin.com/3/ixewok/6/edit?html,css,live))

### Focus jumping

If there's a focusable element inside the position fixed element, i.e. an input element, this can cause the entire fixed element to jump out of place. This will only happen if the user has scrolled any amount (but if you're using `position:fixed` you're expecting exactly that kind of usage).

<iframe width="612" height="341" src="//www.youtube.com/embed/lrnvZDwgJRc?rel=0" frameborder="0" allowfullscreen></iframe>

The page used was: [jsbin.com/3/ixewok/8/](http://jsbin.com/3/ixewok/8/) ([edit](http://jsbin.com/3/ixewok/8/edit?html,css,live))

### Scrolling == unusable position:fixed element

[Corey Dutson](https://twitter.com/#cdutson) pointed out there's *another* issue with position fixed. Although [his example](http://www.youtube.com/watch?v=NStzlMgvZy8) show scrolling using JavaScript, the core problem is: if the page moves programatically (i.e. the user didn't cause the scroll) the elements inside the fix element are unavailable.

From the screencast I've recorded you can see using [iWebInspector](http://www.iwebinspector.com) that although MobileSafari has painted the fixed element in place, it's actually not there - the actual element remains in place until you touch and move the page again.

<iframe width="612" height="341" src="//www.youtube.com/embed/R2MzdeJSCKw?fs=1&amp;#038;feature=oembed" frameborder="0" allowfullscreen></iframe>

The page used was: [jsbin.com/3/ixewok/13/](http://jsbin.com/3/ixewok/13/) ([edit](http://jsbin.com/3/ixewok/13/edit?html,css,live))

I don't have a fix for this yet, and I suspect it's a core painting issue inside of MobileSafari - but I will keep playing to see if there's something that can be done.

### Fixing juddering

With iOS 5, MobileSafari also came with `-webkit-overflow-scrolling: touch`. This is actually intended for inline blocks of content to the page (I mean inline with respect to the document).

If I change the CSS in my previous example, and set the height of my `html`, `body` and content block to 100%, then apply the scrolling touch property to the content, the juddering goes away. However, that alone does not fix the juddering.

The trick would seem to be: make sure your fixed position element is *not* on a "moving canvas". This example has the fixed element *over* a scrolling element, but *not* inside of it.

So when I tried to apply this technique to the `body` element, the juddering was still visible, as the fixed element was *inside* the scrolling element.

<iframe width="612" height="341" src="//www.youtube.com/embed/suXz5dKtlcA?rel=0" frameborder="0" allowfullscreen></iframe>

I also [captured this](http://www.youtube.com/watch?v=obTy5tWOsxA&hd=1) on the real device too.

The page used was: [jsbin.com/3/ixewok/10/](http://jsbin.com/3/ixewok/10/) ([edit](http://jsbin.com/3/ixewok/10/edit?html,css,live))


### Getting scroll position to update

Again, those keen eyes might have spotted values are moving again. Note that as I've changed the CSS the body is no longer scrolling, so the 0 values on the left and right are `window.scrollTop` and `window.pageYOffset` respectively. Since the window isn't scrolling, the content block is in an overflow, the values won't change.

However, the `content.scrollX` value *is changing* - but it doesn't by default.

Firstly, you have to attach *any* touch event handler to get this value to update as the user is scrolling (or actually touching), so in JavaScript I can add:

    content.ontouchstart = function () {};

The touch event will work with start, end and move, and just needs a value set (note that I didn't test just setting it to `true` - that *might* work too!).

However, it's still not perfect. You'll see from the video above, that it **only updated whilst I'm touching**. As soon as I let go during a swipe to scroll, the momentum makes the page continue to scroll, but the value doesn't update.

I've yet to work out if it's even possible to capture this value. ::sigh::

## To conclude / TL;DR

Don't use `position:fixed` inside a scrolling element, it's juddery and looks rubbish (I've seen much worse than the juddering shown in the videos). Do make use of `-webkit-overflow-scrolling: touch` and if you want the scroll values, make sure you attach a touch handler to that scrolling element.

At the same time: make this work in other mobile browsers too - don't just cater to Apple. It's a huge headache that Apple have half arsed-ed-ly fixed the `position:fixed` issue and done in a <strike>typically Microsoft</strike> proprietory way.