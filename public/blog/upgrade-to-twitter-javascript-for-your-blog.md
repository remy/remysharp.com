---
title: Upgrade to Twitter JavaScript for your blog
date: '2008-02-26 15:08:08'
published: true
tags:
  - code
  - javascript
  - twitter
modified: '2014-09-03 16:15:12'
---
# Upgrade to Twitter JavaScript for your blog

I've been following the [requests](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/#comments) on the current [Twitter JS plugin](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/) and decided to implement a few.

In particular there's now support for templates, which gives you full control of how the tweet is displayed.


<!--more-->

I've updated the original page.

Templates are easy to write and insert into the <code>li</code> element that is printed.  This way you can add your own classes, prefixes and suffixes as you please.

For example, here's is [John Resig's](http://ejohn.org) twitters with friends based on the following template:

<pre><code>&lt;span class=&quot;prefix&quot;&gt;
  &lt;img height=&quot;16&quot; width=&quot;16&quot; src=&quot;%user_profile_image_url%&quot; /&gt;
  &lt;a href=&quot;http://twitter.com/%user_screen_name%&quot;&gt;%user_name%&lt;/a&gt; said:
&lt;/span&gt;
&lt;span class=&quot;status&quot;&gt;&quot;%text%&quot;&lt;/span&gt;
&lt;span class=&quot;time&quot;&gt;
  &lt;a href=&quot;http://twitter.com/%user_screen_name%/statuses/%id%&quot;&gt;%time%&lt;/a&gt;
&lt;/span&gt;</code></pre>

Using this template, I've been able to wrap the status in quote and make the 'ago' time a link to the original twitter posting.

See the original [add twitter to your blog](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/) post for a full list of template values and options.

<link rel="stylesheet" href="/images/twitter.css" type="text/css" media="screen" title="no title" charset="utf-8" />

<script src="/images/twitter.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
getTwitters('twitters', {
    id: 'jeresig',
    clearContents: true,
    count: 10,
    withFriends: true,
    enableLinks: true,
    ignoreReplies: false,
    template: '<span class="prefix"><img height="16" width="16" src="%user_profile_image_url%" /> <a href="http://twitter.com/%user_screen_name%">%user_name%</a> said: </span> <span class="status">"%text%"</span> <span class="time"><a href="http://twitter.com/%user_screen_name%/statuses/%id%">%time%</a></span>'
});
</script>

<div id="twitters">
  <p>Please wait while tweets load <img src="images/spinner.gif"></p>
</div>
