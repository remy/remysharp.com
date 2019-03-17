---
title: How to detect when an external library has loaded
date: '2007-04-12 15:57:25'
published: true
tags:
  - code
  - javascript
  - onload
  - safari
  - script
  - tip
modified: '2014-09-03 16:15:12'
---
# How to detect when an external library has loaded

Sometimes in a web app, you'll want to load a script externally.  The only problem is if you need to reference something within the external library, which you should only do once it's definitely loaded.

Here's a tip that works with **all** browsers to ensure the script is loaded before running your dependant code.


<!--more-->

Here's the JavaScript code to load the external library with a callback passed in:
<pre><code>function loadExtScript(src, callback) {
  var s = document.createElement('script');
  s.src = src;
  document.body.appendChild(s);

  // if loaded...call the callback
}</code></pre>
Firefox allows you to listen for the onload event on the script element:
<pre><code>s.onload = callback;</code></pre>
With Internet Explorer you can wait for a state change on the script element:
<pre><code>s.onreadystatechange = function() {
  if ( this.readyState != "loaded" ) return;
  callback.call();
}</code></pre>
The problem comes with Safari - there's no event change for Safari, so we can't tell when the script has loaded.

This is the solution I came up with (and this solution should also work with Opera):
<pre><code>function loadExtScript(src, test, callback) {
  var s = document.createElement('script');
  s.src = src;
  document.body.appendChild(s);

  var callbackTimer = setInterval(function() {
    var call = false;
    try {
      call = test.call();
    } catch (e) {}

    if (call) {
      clearInterval(callbackTimer);
      callback.call();
    }
  }, 100);
}</code></pre>
The function takes a test as a parameter.  Since you are the designer of the app, you'll know what successful test is.  Once this test is true, it will execute the callback.

A simple test could be to check whether a function exists, for example:
<pre><code>loadExtScript('/fixpng.js', function() {
  return (typeof fixpng == 'function');
}, myCallbackFunction);</code></pre>
