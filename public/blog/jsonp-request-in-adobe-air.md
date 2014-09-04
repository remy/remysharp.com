# JSONP request in Adobe Air

With the [jQuery API browser](http://api.jquery.com) my key aim was to build an app that worked both in the Adobe Air environment and without any changes work on the web.

Typically, the environment is the same, with a few exceptions - one of which I ran in to yesterday.

Making a [JSONP](http://remysharp.com/2007/10/08/what-is-jsonp/) call simply doesn't return back to the application.

So here's a work around to get JSONP to work in Adobe Air.


<!--more-->

## The Problem

Originally I was trying to do a simple JSONP, by creating a script element, setting the source and inserting it in to the body.  Although using the DOM inspector for Air showed that the element was in place, and the resource had been loaded, the callback never triggered. Nor was there an error.

I'm not completely sure of the actual source of the problem, but my suspicion is that Air may be ignoring the <code>src</code> attribute being set ([since they say it's prohibited anyway](http://www.tostring.org/books/adobe-air-for-javascript-developers-pocketguide/1.0/en/working-with-javascript-and-html-within-adobe-air/) - search for 'script.src').

I did try messing around with iframes and bridges, and googling, but there didn't seem to be any resources that explained how to get this to work.

Very simply, here's an example I would expect to work:

<pre><code>function jsonFlickrApi(data) {
  alert('jsonp completed: ' + data.photos.photo.length);
}

// I've stripped the api key for the purpose of this article
var url = 'http://www.flickr.com/services/rest/?method=' + 
          'flickr.photos.getRecent&format=json';

var script = document.createElement('script');
script.src = url;
document.getElementsByTagName('body')[0].appendChild(script);</code></pre>

This works fine on the web, and pops up an alert saying it found 10 photos.

The same code in Adobe Air does nothing.

Note that I know this particular API could be called as XML and loaded via a direct Ajax call. My particular problem only supported JSONP requests.

## The Solution

The solution is to use Ajax, combined with JSON combined with a prefilter function.

I'm including jQuery to simplify the Ajax request.

I make the JSON call, and I will use <code>substr</code> to strip out (and cache) the function name using the <code>dataFilter</code> function.  Once the real JSON is passed in to the <code>success</code> function, I will look up the original function on the global <code>window</code> object and call the function manually.  The follow code also support calling methods on objects (though I've only tested it on one method deep in a global object, i.e. <code>myObject.success(data)</code>).

<pre><code>// the same function exists to capture the JSONP success
function jsonFlickrApi(data) {
  alert('jsonp completed: ' + data.photos.photo.length);
}

var url = 'http://www.flickr.com/services/rest/?method=' + 
          'flickr.photos.getRecent&format=json';

// the variable to cache the original function name
var fnStr = '';
$.ajax({
  url: url,
  dataType: 'json', // note we're using json rather than jsonp
  dataFilter: function (data) {
    // data is the original string such as: jsonFlickrApi({...})
    
    fnStr = data.substr(0, data.indexOf('('));
    var start = data.indexOf('(');
    
    // return everything in between the 'jsonFlickrApi(' and last ')'
    return data.substr(start + 1, data.lastIndexOf(')') - start - 1);
  },
  success: function (data) {
    // work out the original name space the jsonp function was on
    var ns = fnStr.split('.'), p = window, last = window, i;
    for (i = 0; i < ns.length; i++) {
      last = p;
      p = p[ns[i]] || p;
    }
    
    // call the function against the content of the parent
    // i.e. this may just be window.jsonFlickrApi, but it
    // could also be window.flickr.update(data)
    p.call(last, data);
  }
});</code></pre>