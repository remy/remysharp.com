---
title: What is JSONP?
date: '2007-10-08 09:30:09'
published: true
tags:
  - code
  - javascript
  - jquery
  - json
  - jsonp
modified: '2014-12-17 10:14:41'
---
# What is JSONP?

jQuery 1.2 introduced JSONP support, but on initial read of the release notes, I wasn't completely sure what it was - so for anyone else that might want the Dr Seuss explanation.

> JSONP is script tag injection, passing the response from the server in to a user specified function

<!--more-->

<div class="update">
**Updated 2014-11-22:** to show secure version of JSONP based on [Metal Toad post](http://www.metaltoad.com/blog/using-jsonp-safely) and [Andrew Betts's feedback](https://remysharp.com/2007/10/08/what-is-jsonp#comment-1707138872).
</div>

## How you can use JSONP

You need to mould both your request and response to handle JSONP - and in doing so, you can have cross domain JSON requests.

Your server will need to return the response as JSON, but also wrap the response in the requested call back, something like this in PHP (hosted on http://myotherserver.com):

```php
// where $_GET['callback'] = 'randomFn123'
$cb = $_GET['callback'];
if (preg_match('/\W/', $cb)) {
  // if $_GET['callback'] contains a non-word character,
  // this could be an XSS attack.
  header('HTTP/1.1 400 Bad Request');
  exit();
}
header('Content-type: application/javascript; charset=utf-8');
echo "/**/typeof ".$cb."==='function' && ".$cb."(".json_encode($data).")";
// prints: /**/typeof randomFn123==='function' && randomFn123({"name":"Remy", "id":"10", "blog":"http://remysharp.com"});
```

The jQuery script would be:

```js
$.ajax({
  dataType: 'jsonp',
  data: 'id=10',
  url: 'http://myotherserver.com/getdata',
  success: function () {
    // do stuff
  },
});
```

jQuery will change the url to include `&amp;callback=randomFn123` - but you can exclude it and it default to just 'callback'.

## Example in the Wild

[Twitter's JavaScript blog plugin](/2007/05/18/add-twitter-to-your-blog-step-by-step/) works in exactly the same way.  You create a function to handle the data from Twitter, and insert a script tag.  Once the script is inserted, it calls the function passing the Twitter data as a JSON object.

## How it works in jQuery

jQuery attaches a global function to the `window` object that is called when the script is injected, then the function is removed on completion.

Note that if the request is being made to the same domain, then jQuery will switch it down to a straight Ajax request.

## Potential Problems

1. Security.  There's documents out on the web that can help, but as a cursory check, I would check the referrer in the server side script.
2. There's no error handling.  The script injection either works, or it doesn't.  If there's an error from the injection, it'll hit the page, and short of a window wide error handler (bad, bad, very bad), you need to be sure the return value is valid on the server side.
