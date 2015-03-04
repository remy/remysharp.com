# Getting CORS Working

Recently I ran a workshop where I ran a small section of the workshop on CORS and how to enable it. In the past, I've found it to be very easy but this time around everything backfired and it didn't work. So after the workshop I went about understanding why the CORS demo it didn't work, and how to get it working.

*Disclaimer:* other people have explained this before, this post is mostly for me!

<!--more-->

## CORS?

Cross Origin Resource Sharing - i.e. cross domain Ajax. The technical side of getting CORS to work has been explained in a lot more detail by [Nicholas C. Zakas](http://twitter/slicknet) in his article [Cross-domain Ajax with Cross-Origin Resource Sharing](http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/), (i.e. IE8, for reasons beyond most, use `XDomainRequest` - utterly bespoke - but that's Microsoft for you).

## Simple CORS

CORS, if you're not doing anything clever is easy. The client side should just be the following code (assuming we're not IE - see link above for IE hoop jumping):

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://different-domain.com');
    xhr.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        console.log('response: ' + this.responseText);
      }
    };
    xhr.send();

So just a simple XHR send - in fact, exactly the same with the exception that the url goes to a domain that's different to the *origin*.

The only thing you need to have on your *different-domain.com* server is an additional header that tells the browser it's okay to go cross domain. In PHP that header looks like this:

    <?php
    header('Access-Control-Allow-Origin: http://www.some-site.com');
    ?>

Equally, if you want to make the API public to anyone to access, you can use:

    <?php
    header('Access-Control-Allow-Origin: *');
    ?>

As simple live example of this can be seen here: [jsbin.com/oxiyi4/1](http://jsbin.com/oxiyi4/1) which makes a request to [remysharp.com/demo/cors.php](http://remysharp.com/demo/cors.php) which includes a rule that allows any origin to access the resource.

This is simple and easy. However, it's the *preflight* that causes confusion. That's where it all went wrong for me.

## Preflight

In *plain Remy language* preflight is an additional request the XHR object makes to make sure it's *allowed* to actually make the request.

By default, there's no preflight, so why was this a problem for me?

**Setting custom headers on XHR requests triggers a preflight request.**

## Detecting Ajax on the server

Most JavaScript libraries send a custom header in the XHR request which can be sniffed on the server side to allow us to simple detect an Ajax request:

    <?php
    $ajax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
            $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';

    if ($ajax) {
      // handle specific Ajax differently...
    }
    ?>

This way my server side code handles regular traffic differently to Ajax traffic.

When I manually set the `x-requested-with` header on the XHR object, it triggered the preflight, which is where it all hit the fan.

## Handling the preflight x-requested-with

The request process, with a preflight, if successful should look like the follow request exchange (note that I've stripped some headers that weren't pertinent to this article, like User-Agent, etc).

This is a real request from one domain to place an XHR request for [http://jsbin.com/canvas/73/source](http://jsbin.com/canvas/73/source).

*Client sends XHR request with custom header:*

    OPTIONS /canvas/73/source HTTP/1.1
    Host: jsbin.com
    Access-Control-Request-Method: GET
    Origin: http://jsconsole.com
    Access-Control-Request-Headers: x-requested-with

*Server responds to OPTIONS request (no content served in this case):*

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: X-Requested-With

*Client sends GET request as it has permission to do so:*

    GET /canvas/73/source HTTP/1.1
    Host: jsbin.com
    x-requested-with: XMLHttpRequest

*Server responds to GET request with content:*

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Content-Length: 977

This only works, because my server side is specifically looking out for the `OPTIONS` request, and handling it as you'll see in my following server code.

## Server code to handle prelight

The following PHP code simply checks for the `OPTIONS` request method. If `OPTIONS` has been used to make the request, and the user is requesting using CORS, my server responds saying that the `X-Requested-With` header is permitted:

    // respond to preflights
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      // return only the headers and not the content
      // only allow CORS if we're doing a GET - i.e. no saving for now.
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With');
      }
      exit;
    }

Now the XHR CORS request allows the `X-Requested-With` header, the rest of my code remain in place, and the flag to indicate it's an Ajax request if the `X-Requested-Header` is present works as it did before.

## Avoid preflight if possible

Jumping through these hoops was pretty tricky, and only after I solved this puzzle did I breakout [Wireshark](http://www.wireshark.org/) for packet sniffing - which might have helped to debug the whole issue in
the first place.

Funnily enough, when making a CORS request using jQuery, the JavaScript library *specifically* [avoids setting the custom header](https://github.com/jquery/jquery/blob/master/src/ajax/xhr.js#L95), along with a word of warning to developers:

> // For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.

So possibly the best advice, if possible, is to avoid setting the custom header if you don't want to do the preflight dance. Otherwise good luck my friend, I hope this has helped!