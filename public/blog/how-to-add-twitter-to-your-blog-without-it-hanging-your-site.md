# How to add Twitter to your blog, without it hanging your site

<img alt="Twitter logo" src="http://remysharp.com/wp-content/uploads/2007/03/twitter_logo.png" style="float: right; padding: 0 0 5px 5px;" />

<div class="update"><p><strong>Update:</strong> for the latest version of this script, and complete control over how it looks, see <a href="http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/">Add Twitter to your blog (step-by-step)</a></p></div>

&nbsp;

[Add tweets to your pages that won't break when Twitter goes down!](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/)

&nbsp;

You might be inclined to add your '[Twitters](http://twitter.com/rem)' to your blog via JavaScript - the only problem is when Twitter's traffic goes up, their servers slow down, and the net result is your web page is hanging because it's waiting to load the Twitter feed.

Some server side caching could do the trick, but it's an additional pain, so let's not bother:

Here's a fix that will allow you to keep Twitter on your sidebar using JavaScript and not worry about it hanging your blog.


<!--more-->

As the [JavaScript badge examples](http://twitter.com/account/badge) show you can use a [JSON](http://wikipedia.com/wiki/JSON) feed of your 'tweets' to plug in to your page.  Once the JSON is loaded, it calls the callback method: 'twitterCallback'.

We're going to wait until the page has loaded before we pull in the Twitter feed - if Twitter is fast, the reader won't notice any difference, but if Twitter is slow, the page won't hang, and Twitter will load in it's own time.

<pre><code>window.onload = function() {
  var url = 'http://www.twitter.com/t/status/user_timeline/rem?callback=twitterCallback&count=1';

  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.body.appendChild(script);
}</code></pre>

<small>Obviously change the URL to your own timeline - the user ID can be seen in your own personal Twitter RSS feed - or in the code for the JavaScript badge.</small>

I prefer not to overwrite the .onload event, so I would use [jQuery](http://jquery.com) to add to the onload events and change

<code>window.onload = function() {</code>
  
...to:

<code>jQuery(function() { ...</code>
  
But you can use whatever library or 'polite' onload handler you want.  However, if the Twitter code is the only JavaScript on your page - you can keep it as is.