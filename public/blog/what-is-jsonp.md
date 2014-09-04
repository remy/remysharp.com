# What is JSONP?

jQuery 1.2 introduced JSONP support, but on initial read of the release notes, I wasn't completely sure what it was - so for anyone else that might want the Dr Seuss explanation.

> JSONP is script tag injection, passing the response from the server in to a user specified function


<!--more-->

## How you can use JSONP

You need to mould both your request and response to handle JSONP - and in doing so, you can have cross domain JSON requests.

Your server will need to return the response as JSON, but also wrap the response in the requested call back, something like this in PHP (hosted on http://myotherserver.com):

<pre><code>$data = getDataAsJSON($_GET['id']);
echo $_GET['jsonp_callback'] . '(' . $data . ');';
// prints: jsonp123({"name" : "Remy", "id" : "10", "blog" : "http://remysharp.com"});</code></pre>

The jQuery script would be:

<pre><code>$.ajax({
  dataType: 'jsonp',
  data: 'id=10',
  jsonp: 'jsonp_callback',
  url: 'http://myotherserver.com/getdata',
  success: function () {
    // do stuff
  },
});</code></pre>

jQuery will change the url to include <code>&amp;jsonp_callback=jsonpmethod</code> - but you can exclude it and it default to just 'callback'.

## Example in the Wild

[Twitter's JavaScript blog plugin](http://remysharp.com/2007/05/18/add-twitter-to-your-blog-step-by-step/) works in exactly the same way.  You create a function to handle the data from Twitter, and insert a script tag.  Once the script is inserted, it calls the function passing the Twitter data as a JSON object.

## How it works in jQuery

jQuery attaches a global function to the <code>window</code> object that is called when the script is injected, then the function is removed on completion.

Note that if the request is being made to the same domain, then jQuery will switch it down to a straight Ajax request.

## Potential Problems

1. Security.  There's documents out on the web that can help, but as a cursory check, I would check the referrer in the server side script.
2. There's no error handling.  The script injection either works, or it doesn't.  If there's an error from the injection, it'll hit the page, and short of a window wide error handler (bad, bad, very bad), you need to be sure the return value is valid on the server side.