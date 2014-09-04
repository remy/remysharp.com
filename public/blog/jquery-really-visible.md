# jQuery *really* :visible

On a project I worked with [Paul Irish](http://paulirish.com/) on recently we found that we needed to asset whether an element was visible, but the <code>:visible</code> selector doesn't always do the job.

<!--more-->

<div class="update"><p><strong>Update:</strong> As of jQuery 1.3.2 this is no longer a problem or required. See <a href="#comment-135222">Paul's comment</a> below.</p></div>

## The Problem with :visible

The <code>:visible</code> selector works fine if you're asking whether the particular element has been set to invisible (either via the <code>display</code> or <code>visibility</code> CSS style).

However, if the element is hidden because a parent element is set to hidden, the <code>:visible</code> selector returns a false positive.

## Solution

If you want to know whether the element is truly visible, you need to step through the parent elements to be 100% sure.

You can do this via a macro selector too:

<pre><code>jQuery.extend(
  jQuery.expr[ ":" ], 
  { reallyvisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }}
);</code></pre>

[See the working example](http://jsbin.com/ageta) ([source](http://jsbin.com/ageta/edit))

An important note: I tried overloading the <code>:visible</code> selector using this new <code>:reallyvisible</code> and it actually breaks the show/hide functions within jQuery - so don't go renaming it!