---
title: Idiot Proofing the jQuery.ready
date: '2008-03-09 01:52:51'
published: true
tags:
  - code
  - code
  - jquery
  - plugin
modified: '2014-09-03 16:15:12'
---
# Idiot Proofing the jQuery.ready

I'm always writing quick prototypes of ideas I've got, and often they'll include some quick jQuery.

However, for reasons unbeknownst to me, about 1/3 of the time I forget to wrap the statements in a <code>.ready()</code> function, and since I have the habit of putting my <code>script</code> tags in the <code>head</code> - the code never fires.  Sometimes it takes me a few minutes before I realise the simplicity of my mistake.  

Never again.

I've written a short piece of code that now idiot proofs the jQuery I write.


<!--more-->

This code overloads the <code>find</code> method in jQuery - which is fired when parsing the DOM.

Simply, what it does is:

* Cache a copy of the original <code>find</code> method
* Runs the original
* If there's results, stay quiet
* If there's no results, and the DOM isn't ready, it'll show a message
* If the DOM *is* ready, then it will self destruct the method, restoring the original

Include this code directly after you include jQuery, and you'll never be scratching your head again over why your perfectly good selector isn't returning anything.

<pre><code>(function ($) {
  var find = $.fn.find;
  var msg = 'DOM not ready.';

  $.fn.find = function (selector) {
    var ret = find.apply(this, arguments);

    if (!$.isReady && ret.length == 0 && selector != document && selector) {
      if (window.console && window.console.log) {
        console.log(msg);
      } else {
        alert(msg);  
      } 
    } else if ($.isReady) {
      // when the dom is ready, ditch this function
      $.fn.find = find; 
    }

    return ret;
  }; 
})(jQuery);</code></pre>
