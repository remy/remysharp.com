---
title: Add Twitter to your blog (step-by-step)
date: '2007-05-18 08:34:31'
published: true
tags:
  - javascript
  - project
  - twitter
  - web
modified: '2014-09-03 16:15:12'
---
# Add Twitter to your blog (step-by-step)

<div class="update"><p>Due to recent changes in the twitter API auth policy, the current version of twitter.js does not work. I am actively working on a solution, but can't say much more than that right now. If I do find a decent solution, you shouldn't need to change anything as twitter.js will inherit the latest code automatically.</p></div>

<h2>Hotlink from Google</h2>

<pre><code>&lt;script src=&quot;http://twitterjs.googlecode.com/svn/trunk/src/twitter.min.js&quot;&gt;&lt;/script&gt;</code></pre>

<h2>Download to self host</h2>

<p><a href="http://code.google.com/p/twitterjs/downloads/list" class="download">Download latest Twitter.js</a></p>

<p>Following on from <a href="/2007/03/20/how-to-add-twitter-to-your-blog-without-it-hanging-your-site/">how to add Twitter without hanging your blog</a>, as requested, here is a step-by-step guide to adding Twitter to your blog without it hanging your web site.</p>

<!--more-->

<p>Below is a working example of loading twitters after the page has completed, thus preventing the whole page from locking up (notice that the spinner will continue until the twitters are loaded) - based on <a href="http://twitter.com/rem">my tweets</a> from myself:</p>

<script src="http://twitterjs.googlecode.com/svn/trunk/src/twitter.min.js"></script>
<script type="text/javascript" charset="utf-8">
  getTwitters('twitters', {
      id: 'rem',
      clearContents: true,
      count: 5,
      withFriends: true,
      ignoreReplies: false,
      template: '<span class="prefix"><img height="16" width="16" src="%user_profile_image_url%" /> <a href="http://twitter.com/%user_screen_name%">%user_name%</a> said: </span> <span class="status">"%text%"</span> <span class="time"><a href="http://twitter.com/%user_screen_name%/statuses/%id_str%">%time%</a></span>'
  });
</script>

<link rel="stylesheet" href="/images/twitter.css" type="text/css" media="screen" title="no title" charset="utf-8" />

<div id="twitters"><p>Please wait while my tweets load <img src="/images/indicator.gif" /></p>
</div>

Using my [twitter.js](http://code.google.com/p/twitterjs/downloads/list) script.

## Options

The function tags the following parameters:

* CSS id of target element
* Settings object (details below)

Settings object:

* id: your screen name on Twitter, for example mine is "<a href="http://twitter.com/rem">rem</a>". This can also be a list (in the format of user/list-name, ie. rem/conferences) or a hash tag.
* count: number of twitters you want, defaults to 1.
* clearContents: if you have content in the container you may want to clear it.  Defaults to true.
* enableLinks: true/false - scans the tweet for a link and makes it clickable, includes @replies and #hashtags, by default is true.
* ignoreReplies: true/false - skips over tweets starting with @.  If requesting 1 tweet, and this flag is set, behind the scenes it will request 2 in case the first starts with @ - but if the 2 most recent are replies, nothing will be shown.
* <em><a href="http://getsatisfaction.com/twitter/topics/friends_timeline_api_call_suddenly_requires_auth">currently disabled</a></em> withFriends: true/false - whether to include friends tweets.  Defaults to false.
* template: the HTML template to use within each <code>li</code> element.  See below for template variables.
* prefix: if not using a template, you can use this. If you want to prefix each twitter, add here, e.g. 'Remy said'.  Note that you can use template variables in this field.
* timeout: Number of milliseconds before triggering onTimeout.  If onTimeout is set, timeout defaults to 10 seconds.
* onTimeout: Function to call when timeout is reached.  Context is set to HTML element tweets were going to be inserted into.
* onTimeoutCancel: true/false - if not set, the timeout can trigger, but then the Twitter script could complete and override the cancel.  To avoid this, set onTimeoutCancel = true.  Defaults to false.
* newwindow: true/false - if set to true, all links in tweets (and otherwise) will open in a new window. Defaults to false.
* callback - Function to call when the twitter render is completed. Doesn't fire if the script times out.

For example:

<pre><code>getTwitters('tweet', {
  id: 'rem',
  count: 1,
  enableLinks: true,
  ignoreReplies: true,
  clearContents: true,
  template: '"%text%" &lt;a href="http://twitter.com/%user_screen_name%/statuses/%id_str%/"&gt;%time%&lt;/a&gt;'
});</code></pre>

## Template variables

All variables should be wrapped in % symbols (see the above example).

* text - the actual status message
* id\_str - id of status message (note that id was used before, but for the ids to be correct, you need to use id\_str)
* source
* time - relative 'friendly' time
* created\_at - raw time
* user\_name - real name
* user\_screen\_name - username
* user\_id_str
* user\_profile\_image\_url - avatar
* user\_url - home page
* user\_location
* user\_description

## Container HTML

You need to insert a holder element for the twitters to go in to.  In the example above, I've included some 'waiting to load' content - but you don't have to.

Here's what I did:

<pre><code>&lt;div id=&quot;tweet&quot;&gt;
&nbsp;&lt;p&gt;Please wait while my tweets load &lt;img src=&quot;/images/indicator.gif&quot; /&gt;&lt;/p&gt;
 &lt;p&gt;&lt;a href=&quot;http://twitter.com/rem&quot;&gt;If you can&#39;t wait - check out what I&#39;ve been twittering&lt;/a&gt;&lt;/p&gt;
&lt;/div&gt;</code></pre>

Here are some more [progress indicators](http://ajaxload.info/).

If you include contents inside the holder <code>div</code>, then you'll need to set the 'clearContents' flag.

## Add the script

You can directly from the Google code repository (as seen in the example below).

Add the following code within the <code>head</code> or (best at the bottom of the) <code>body</code> tag:

<pre><code>&lt;script
 src=&quot;http://twitterjs.googlecode.com/svn/trunk/src/twitter.min.js&quot;
 type=&quot;text/javascript&quot;&gt;
&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;
getTwitters('tweet', {
  id: 'rem',
  count: 1,
  enableLinks: true,
  ignoreReplies: true,
  clearContents: true,
  template: '"%text%" &lt;a href="http://twitter.com/%user_screen_name%/statuses/%id_str%/"&gt;%time%&lt;/a&gt;'
});
&lt;/script&gt;</code></pre>

(this example will generate my twitter status in quotes on a single line with the 'ago' linkable back to the original twitter post)

Note that the getTwitters function will execute after the page has been loaded by your browser.  It will fire once the <abbr title="Document Object Model">DOM</abbr> is loaded but before images are loaded.

## Styling

If you don't use a template, then the HTML is generated for you.

Each block of text is contained with in a span and includes it's own class, e.g. the HTML generated would look like this:

<pre><code>&lt;div id=&quot;tweet&quot;&gt;
  &lt;ul&gt;
    &lt;li&gt;
      &lt;span class=&quot;twitterPrefix&quot;&gt;Remy said: &lt;/span&gt;
      &lt;span class=&quot;twitterStatus&quot;&gt;I just had a bizarre spaces moment - moving my cursor to the bottom of the screen switched space - annoying if it hadn&#39;t just gone away.&lt;/span&gt;
      &lt;span class=&quot;twitterTime&quot;&gt;20 minutes ago&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
      &lt;span class=&quot;twitterPrefix&quot;&gt;Remy said: &lt;/span&gt;
      &lt;span class=&quot;twitterStatus&quot;&gt;Great quote - Michael J Fox: &quot;my happiness grows in direct proportion to my acceptance, and in inverse proportion to my expectations.&quot;&lt;/span&gt;
      &lt;span class=&quot;twitterTime&quot;&gt;7 days ago&lt;/span&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</code></pre>

So each block of content is targetable using CSS to style the way you wish.

Comments, feedback or suggestions will be more thank welcome.
