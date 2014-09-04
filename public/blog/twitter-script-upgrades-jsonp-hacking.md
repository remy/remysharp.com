# Twitter script upgrades & JSONP hacking

Given that recently Twitter has been going up and down like a yo-yo (and I'm sure they're working on it), I've upgraded the twitter script to support timeouts.

Twitter have also messed with the API...


<!--more-->

I've upgraded the script to allow you to specify timeouts, and how the timeout is handled if the call actually succeeds.

Also, Twitter recently changed their API forcing authentication on calls with friends.  As such, I've disabled the functionality until I find out WTF!?

I've also moved the code to be hosted with Google code so that versioning can be better tracked, or you can hot link to the latest version if you want.

[http://code.google.com/p/twitterjs/](http://code.google.com/p/twitterjs/)

For those interested, I've got a nice little trick inside the script which allows me to run a [JSONP](http://remysharp.com/2007/10/08/what-is-jsonp/) call and cancel it at a predefined timeout.

Since I'm dynamically creating a function for the JSONP callback to succeed to, upon timeout (if the user chooses to) I change the original callback function to be empty.  This way when the script finishes, either via the browser timeout, or actually succeeds, but too late for our liking, it doesn't execute.

Here's an example using Flickr's JSONP API:

<pre><code>var url = 'http://www.flickr.com/services/rest/?' + 
  'method=flickr.photos.search&format=json&api_key=' + apiKey +
  '&user_id=38257258@N00&tags=bikeadventures&per_page=10' + 
  '&jsoncallback=<strong>renderPictures</strong>';

// do the JSONP work:
var script = document.createElement('script');
script.setAttribute('src', url);

// where the magic happens:
// before we call the script - set the timer for 5 seconds
var timeoutTimer = setTimeout(function () {
  // on timeout, completely clear out the renderPictures function
  // but leave it available to be called when the JSONP finishes.
  renderPictures = function () {};
}, 5000);

// call
document.getElementsByTagName('head')[0].appendChild(script);

function renderPictures(data) {
  // cancel the timeout
  if (timeoutTimer) clearTimeout(timeoutTimer);
  
  // continue as normal...
}</code></pre>