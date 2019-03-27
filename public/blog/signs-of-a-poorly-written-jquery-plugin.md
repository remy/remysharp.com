---
title: Signs of a poorly written jQuery plugin
date: '2010-06-03 13:27:24'
published: true
tags:
  - jquery
  - plugin
  - code
  - web
modified: '2014-09-03 16:15:12'
---
# Signs of a poorly written jQuery plugin

So far with every single workshop I've given, both for advanced JavaScript and jQuery for Designers, this question (or some variation thereof) has come up:

> How do you know if the plugin is good to use?

It's always dependant on the problem they're trying to solve, but in lieu of a better jQuery plugin ranking system, here's a couple of tips that should raise a red flag.

<!--more-->

Consider the following:

```js
$.fn.myplugin = function () {
  var me = $(this).each(function() {
    return $(this).bind('someEvent', function () {
      // does something
    });
  });

  return me;
};
```

Although the code may be perfect once some event has run, most times you don't have time to read through *all* the code carefully and you need to make a decision so you can move on to the actual problem you're trying to solve.

In the code above, there's a number of red flags that have gone up for me, and I tend to look in this area of code first.  If these patterns have been used, it tells me the author hasn't quite grasped how jQuery works and hasn't considered making simple tuning changes.

## The inline return

```js
$.fn.myplugin = function () {
  var me = $(this).each(fn);
  return me;
};
```

Should be written as:

```js
$.fn.myplugin = function () {
  return $(this).each(fn);
};
```

The <code>me</code> variable isn't being used again, so there's no point in creating it.

## Double jQuery

```js
$.fn.myplugin = function () {
  return $(this).each(fn);
};
```

Whilst within the context of the plugin code - i.e. within the function attached to <code>.fn</code>, the keyword <code>this</code> refers to the jQuery instance, **not** DOM elements.

If I were to rewrite <code>this</code> to show you the value, you'd see:

```js
$.fn.myplugin = function () {
  return $($('div.foo')).each(fn);
};
```

So within the actual plugin (*not* jQuery callbacks), <code>this</code> refers to jQuery, so we can access jQuery's methods directly:

```js
$.fn.myplugin = function () {
  return this.each(fn);
};
```

## Returning *what* to each?

```js
$.fn.myplugin = function () {
  return this.each(function () {
    return $(this).bind('someEvent', fn);
  });
};
```

jQuery's each iterator simply loops, it doesn't collect anything. The result variable is jQuery with the original collection inside it still - you can't modify the collection by returning or not returning.

So <code>return</code> isn't required at all in this case:

```js
$.fn.myplugin = function () {
  return this.each(function () {
    $(this).bind('someEvent', fn);
  });
};
```

## Wasteful use of each

```js
$.fn.myplugin = function () {
  return this.each(function () {
    $(this).bind('someEvent', fn);
  });
};
```

Hopefully by removing all the cruft from the starting version, this next step should be obvious. If not, here's a clue:

* What's returned from an <code>each</code> call? A jQuery collection.
* What's returned from a <code>bind</code> call? A jQuery collection.

Since we're running the <code>bind</code> on <code>each</code> element, and only doing that, it means there's no difference. So let's throw away the <code>each</code> call and *just* return the <code>bind</code>:

```js
$.fn.myplugin = function () {
  return this.bind('someEvent', fn);
};
```

Remember that within the plugin, <code>this</code> refers to the jQuery instance, and not the element, so we don't need the wrapping <code>$()</code>.

All better now, eh?
