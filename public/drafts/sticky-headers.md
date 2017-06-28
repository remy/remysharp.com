# Sticky headers (part 1/3)

I have mixed feelings about sticky headers on web pages, but it annoys me more when the implementation causes scroll jank or contributes to it.

The coding pattern needs a few small changes. I'm also posting this under: *stuff that's been said before, but is worth saying again*.

<!--more-->

## The sample starting point

I recently bought an HTML single page template for a project I'm working on, and have been slowly making my way through the code tweaking it to my preferences, when I saw this:

```js
var toggleHeaderFloating = function() {
  // Floating Header
  if ( $window.scrollTop() > 80 ) {
    $( '.header-section' ).addClass( 'floating' );
  } else {
    $( '.header-section' ).removeClass( 'floating' );
  };
};

$window.on( 'scroll', toggleHeaderFloating );
```

The code will check on every scroll tick whether the scroll position is over 80 pixels, and if it is, it'll add a class (that "floats" the header section) or it will remove the class.

It's fair to assume that `$window` is a jQuery instance of the `window` object. However, there's a whole bunch of no-nos going on in this code for me. It's not a big deal, but understanding the red flags helps us to understand how to avoid little snags in the future.

## Do nothing-to-nothing on scroll

I can't find the original post, but Paul Irish, some many years ago shared insights into scrolling performance, and recommended that inside of the `scroll` event (and likely also applies to `wheel` and probably `mousemove`), that you should avoid touching the DOM and avoid triggering layout (also known as reflows). Paul also collected an excellent list of [what triggers layout](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) which is brief enough for me to remember.

If we're doing _nothing_ inside a scroll event, what can we do? We can debounce, using `requestAnimationFrame`. When the user scrolls, we'll *schedule* a function that will check the scroll position, but if the user is scrolling quickly, then that action will take priority, and ideally avoid scroll-jank:

```js
// used to only run on raf call
var rafTimer;

$window.on('scroll', function () {
  cancelAnimationFrame(rafTimer);
  rafTimer = requestAnimationFrame(toggleHeaderFloating);
});
```

If you need to support IE9 and below (which for this, I'd recommend just not having the sticky header at all), you can use [Paul's polyfill for rAF from 2011](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/).

## jQuery selecting

The original code does two things that bothers me:

1. Runs a jQuery selector **every** time the scroll event fires
2. Queries every element

Admittedly `getElementsByClassName` (which jQuery/sizzle [uses if the selector is a single class](https://github.com/jquery/jquery/blob/b14ce54334a568eaaa107be4c441660a57c3db24/external/sizzle/dist/sizzle.js#L262-L265)) is pretty well optimised, so it's not of great concern. However, we don't need to construct a new jQuery object on every scroll tick.

For an idea of the number of times that code would be run, in Chrome devtools put this the console and scroll the page:

```js
window.onscroll = () => console.count('scroll')
// or monitorEvents('scroll')
```

Let's cache:

```js
var $headerSection = $('.header-section');
var toggleHeaderFloating = function() {
  // Floating Header
  if ( $window.scrollTop() > 80 ) {
    $headerSection.addClass( 'floating' );
  } else {
    $headerSection.removeClass( 'floating' );
  };
};

var rafTimer;
$window.on('scroll', function () {
  cancelAnimationFrame(rafTimer);
  rafTimer = requestAnimationFrame(toggleHeaderFloating);
});
```

## Only change the class once

The class on the header section really only needs changing in one scenario: when the scroll position goes over a certain threshold.

The alternative is to use `classList` as it's optimised to check whether the class needs changing before it touches the DOM.

Here's my (vanilla) version that I use on the [ffconf 2016 conference site](https://2016.ffconf.org):

```js
var rafTimer;
window.onscroll = function (event) {
  cancelAnimationFrame(rafTimer);
  rafTimer = equestAnimationFrame(toggleHeaderFloating);
};

function toggleHeaderFloating() {
  // does cause layout/reflow: https://git.io/vQCMn
  if (window.scrollY > 80) {
    document.body.classList.add('sticky');
  } else {
    document.body.classList.remove('sticky');
  }
}
```

In the next part, I'll share how I combined this technique with smooth scrolling.
