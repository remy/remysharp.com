---
title: 'Accessible, degradable style control - part 2'
date: '2007-10-24 00:12:24'
published: true
tags:
  - accessbility
  - css
  - degradable
  - htaccess
  - javascript
  - php
  - style
  - web
modified: '2014-09-03 16:15:12'
---
# Accessible, degradable style control - part 2

As promised, the second instalment of accessible, degradable style control (that follows [part 1](http://remysharp.com/2007/02/23/accessible-degradable-style-control-part-1/)).

This entry will cover style sheet control, and although this has been covered by other posts in the past, often they rely entirely on JavaScript.  This method does not.


<!--more-->

My aim is to provide two links, one to strip all the style from the page, and one to return to the default style.

## Steps Involved

1. [The HTML](#html)
2. [Server side script to managed non-JavaScript enabled browsers](#server_side)
3. [JavaScript to manage the style sheet dynamically](#javascript)

<h2 id="html">HTML</h2>

When someone visits [my business web site](http://leftlogic.com), they will see the [font control](http://remysharp.com/2007/02/23/accessible-degradable-style-control-part-1/) links, and the 'no style' link.

When the style is turned off, they will also be able to see the 'default style' link:

<pre><code>
&lt;li&gt;&lt;a href=&quot;/change/style/blank&quot; class=&quot;ctlStyleSwitcher&quot; rel=&quot;blank&quot;&gt;No Style&lt;/a&gt;&lt;/li&gt;
&lt;li class=&quot;hide&quot;&gt;&lt;a href=&quot;/change/style/default&quot; class=&quot;ctlStyleSwitcher&quot; rel=&quot;default&quot;&gt;Default Style&lt;/a&gt;&lt;/li&gt;
</code></pre>

Class 'hide' refers to 'display: none'.

Note that we're using classes as a hook for the JavaScript, and the '[rel](http://www.w3.org/TR/html401/struct/links.html#adef-rel)' attribute to define the particular type of style.

In our <code>head</code> tag we add the following style sheet links, note that this needs to be later managed by the [server side](#server_side):

<pre><code>&lt;link rel=&quot;stylesheet&quot; title=&quot;default&quot; href=&quot;/css/default.css&quot; type=&quot;text/css&quot; /&gt;
&lt;link rel=&quot;alternate stylesheet&quot; title=&quot;blank&quot; href=&quot;/css/blank.css&quot; type=&quot;text/css&quot; /&gt;</code></pre>

default.css contains our core style.  blank.css is, literally, an empty css file.

<h2 id="server_side">Server Side</h2>

As per, [part 1](http://remysharp.com/2007/02/23/accessible-degradable-style-control-part-1/#server_side), you will need to set up .htaccess and non-htaccess (if you don't have mod\_rewrite).

<h3 id="files">Change file</h3>

The change file from the part 1, will be upgrade to handle the style sheet.  This script will only be accessed when JavaScript enabled, and thus used to switch styles.

#### change.php

Upgrading change.php from part 1, here's what we will add:

<pre><code>
...
if ($methods[2] == &apos;style&apos;) {
  $s = isset($methods[3]) ? $methods[3] : &apos;default&apos;;
  $ok = setcookie(&quot;style&quot;, $s, time()+(3600*365), &apos;/&apos;); // expire in a year
}
...
</code></pre>

## Printing the &lt;link&gt; tag

<pre><code>
$styles = array(&apos;stylesheet&apos;, &apos;alternate stylesheet&apos;);
if (isset($_COOKIE[&apos;style&apos;]) &amp;&amp; ($_COOKIE[&apos;style&apos;] == &apos;blank&apos;)) {
  $styles = array(&apos;alternate stylesheet&apos;, &apos;stylesheet&apos;);
}

echo &apos;&lt;link rel=&quot;&apos; . $styles[0] . &apos;&quot; title=&quot;default&quot; href=&quot;/css/default.css&quot; type=&quot;text/css&quot; /&gt;&apos;;
echo &apos;&lt;link rel=&quot;&apos; . $styles[1] . &apos;&quot; title=&quot;blank&quot; href=&quot;/css/blank.css&quot; type=&quot;text/css&quot; /&gt;&apos;;
</code></pre>

This allows browsers that don't have JavaScript enabled to select the right style sheet when the page is loaded, and leaving the alternative style sheet aside.

<h2 id="javascript">JavaScript</h2>

The solution so far should work without JavaScript enabled.  However, we want to allow this functionality without having to reload the page.

Using [Kelvin Luck's style switcher](http://kelvinluck.com/article/switch-stylesheets-with-jquery) we're going to select the correct style on the page loading:

<pre><code>
function switchStylestyle(styleName) {
  // note - pre jQuery 1.2 the selector needs to read $('link[@rel*=style][@title]')
  $(&apos;link[rel*=style][@title]&apos;).each(function(i) { 
    this.disabled = true;
    if (this.getAttribute(&apos;title&apos;) == styleName) this.disabled = false;
  });
  createCookie(&apos;style&apos;, styleName, 365);
}

var c = readCookie(&apos;style&apos;);
if (c) switchStylestyle(c);
</code></pre>

Get the [cookie module](http://remysharp.com/wp-content/uploads/2007/02/cookie.js) if you don't have it already.

## Wrapping up

Remember to test your implementation with both JavaScript turned on and turned off - otherwise all your hard work is wasted if someone else finds a silly little bug.

If you have any questions, comments or recommendations please drop me a comment and I'll do my best to reply.
