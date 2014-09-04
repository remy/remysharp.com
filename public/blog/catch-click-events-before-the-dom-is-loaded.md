# Catch click events before the DOM is loaded

I'm currently working on a project that's heavily JavaScript driven.  One of the key goals of the project is to get the user to click a bright yellow button (I won't go in to any more detail than that).

The button is perfect, it's eye catching and when you see it, you just want to click on it.  When it's clicked, it fires the appropriate JavaScript event.


<!--more-->

## Problem!

However, our success was also our downfall: the button would be clickable before the <abbr title="Document Object Model">DOM</abbr> had completely loaded.

The application wasn't designed to degrade, mostly because it has a particular targeted audience, so the clicking action screws up the experience if the DOM isn't finished and all the appropriate click handlers are in place (and yes: I did argue for a degrading system, but that's entirely another story).

## Solution.

The solution is straight forward.  You hook a click caching system during the DOM load.  

All the links you want to catch an early click event, you add the following:

<pre><code>&lt;a href=&quot;#?&quot; 
  <strong>onclick=&quot;return earlyClickHandler.call(this);&quot;</strong>
&gt;CLICK ME!&lt;/a&gt;</code></pre>

Then the following JavaScript needs to be added as the first block of JavaScript directly after you load [jQuery](http://jquery.com/ "jQuery: The Write Less, Do More, JavaScript Library") (or your library du jour), in the <code>&lt;head&gt;</code> tag:

<pre><code>function earlyClickHandler() {
  var t = this;
  if (typeof $.isReady == 'boolean' &amp;&amp; $.isReady) {
    return true;
  } else if (!t.clicked){
    t.clicked = true;
    // once DOM is loaded, fire this click handler
    $(function () { 
      $(t).click();  
    });
  }
  return false;
}</code></pre>

The effect is the user can click on the link and it won't do anything until the DOM is loaded, and once it is loaded, it will fire the click event the user requested.

This example only caches one click event per link (with the <code>t.clicked = true</code>).  It is also using jQuery to test if the DOM is ready, and if it is, just pass control back to the DOM, which is in turn passed back to jQuery (assuming you've hooked an event).

It should be simple enough to convert the function to work with [Prototype](http://www.prototypejs.org/ "Prototype JavaScript framework: Easy Ajax and DOM manipulation for dynamic web applications") or [YUI](http://developer.yahoo.com/yui/ "The Yahoo! User Interface Library (YUI)") or the library (or not) of your choice.

## Wrap up.

I would only recommend using this technique when you absolutely must, because by adding the <code>onclick</code> attribute, you're mixing behaviour with presentation.  There are [articles explaining why this is a best practise](http://www.digital-web.com/articles/separating_behavior_and_structure_2/) but I believe, in the right situation, it can benefit the user.