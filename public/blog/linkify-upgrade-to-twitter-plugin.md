---
title: Linkify + upgrade to twitter plugin
date: '2007-06-04 14:35:57'
published: true
tags:
  - code
  - javascript
  - twitter
modified: '2014-09-03 16:15:12'
---
# Linkify + upgrade to twitter plugin

The [twitter plugin](/2007/05/18/add-twitter-to-your-blog-step-by-step/) has just been upgraded to (optionally) search for links in the twitter text and activate them as link.

So I thought I'd share the linkify code.


<!--more-->

<pre><code>String.prototype.linkify = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:% \?\/.=]+[^\.,\)\s*$]/g, function(m) {
    return m.link(m);
  });
};</code></pre>

Short and sweet - will return a string with the URLs as links.  Note that if the linkify function encounters a real link, it will break the link - ideally use this code with text you know may contain a plain text link.

For example, assuming status is an element on the page, and twitter.text is our text to search for links within:

<pre><code>status.innerHTML = twitter.text.linkify();</code></pre>

The function has been tested in IE7, Firefox 2, Safari 2 and Opera 9.  It has also been tested with domains with ports, paths and query strings.

I could see this being turned in to a bookmarklet to scan the current page to enable links, for instance in a forum where the link has been pasted in and not been converted (though the regex would need a tweak, or something altogether smarter may be required).

Let me know if you have any questions or feedback in case of mistakes.
