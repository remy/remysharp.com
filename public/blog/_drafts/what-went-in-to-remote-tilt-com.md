# What went in to remote-tilt.com

Last week I felt that there was no simple way to test device motion events without *actually* developing on a mobile device: not fun. Since these are *just* events, I knew I could create a polyfill to replicate these events allowing me to test in my development environment.

One week later I released [remote-tilt.com](http://remote-tilt.com). This post is about a couple of things I learnt and some of the tricks I used.

<!--more-->

## Piping events from the real mobile device

So this is the really cool part of remote-tilt: you move your mobile phone and the motion events fire on your test page. 

Basically the whole piping mobile to desktop took about 2 hours of dev, and looks [roughly like this](https://github.com/remy/remote-tilt/blob/master/server.js):

    server.on('connection', function (socket) {
      var url = parse(socket.req.url),
          key = path.basename(url.pathname),
          type = LISTEN;
      
      if (url.pathname.indexOf('/listen/') === 0) {
        if (!connections[key]) connections[key] = [];
        connections[key].push(socket);
      } else if (url.pathname.indexOf('/serve/') === 0) {
        type = SERVE;
      }

      if (type == SERVE) {
        socket.on('message', function (message) {
          // broadcast to listen sockets on the same key
          if (connections[key] && connections[key].length) {
            connections[key].forEach(function (socket) {
              socket.send(message);
            });
          }
        });
      }

      // <snip>
    });

All I'm doing it marrying up client (*LISTEN*) connections and sending them messages from the server (*SERVE*) using the `key` value from the url (`socket.req.url`).  I dropped in [websocket.io](https://github.com/LearnBoost/websocket.io) and it all works.

Really this technique suits Server-Sent Events, but I needed to go cross origin (and without the hassle I went through with [jsconsole](http://jsconsole.com/remote-debugging.html)).  I'd be lying if I didn't say this blog post wasn't also here to pimp my workshop :)

I'm running a [real-time Node.js and HTML5 workshop](http://leftlogic.com/training?ref=remysharp.com/blogpost#node) in March in the UK - where you'll learn all about these techniques and how it takes very little work to get them in place (I've also written a useful short article [why your boss should send you](http://leftlogic.com/training/whynode) too!).

## Popups

The remote control is a little popup of a phone with sliders. I knew I didn't want to create an inline element on the current page partly because styling can be a pain, but also the remote could be lost in some 3D effect applied with motion events (which was my particular use case).

So, popups. We've all played with them once. I generally consider them nasty, but I discovered a few tricks and fairly significant bugs in using them.

### The pageless popup

I've got this uncomfortable feeling in my gut when I need to create a single HTML file just to serve a popup that's going to include my script.  Why can't I just include the script and ignore the HTML file. You can create inline iframes (by using JavaScript to generate them) so why can't I create inline popups?  Turns out I can :)

I've got a more detailed post coming up on what the options I considered, but what I do in remote-tilt's case is to open a popup to the window that you created the popup from. So, that's the child popup source is the same as the parent's.

Why do that?  It's essential that I can send messages from the popup directly back to the parent window. I needed to trigger events on the parent window object, and to do so, requires that the origin of the popup is the same as the parent window. So to get around this I just create a popup to `window.location`, i.e. to the same document.

My JavaScript then kicks in and takes control of rendering (as much as possible) the page. If you open the remote control window, and inspect the DOM, you'll see the original DOM from the parent window sitting inside.

Then your script replaces the DOM and is able to send messages to the `window.opener`:

    if (window.location.hash.indexOf('#popup') === -1) {
      window.open(window.location + '#popup', 'Popup', 'width=300,height=300');
    } else {
      // we are the popup
      initPopupClient();
    }

    function initPopupClient() {
      // here we're overwriting the contents of the HTML element
      document.documentElement.innerHTML = [
        '<title>Popup tool</title>',
        '<style>* { font-family: comic sans; }</style>',
        '<p>Welcome to our dynamically generated popup</p>'
      ].join('');

      // now trigger any function on our parent window
      window.opener.alert('Hello from the popup');

      // or send it messages nicely
      window.opener.postMessage('This is less invasive I guess!');
    }

### Popups are broken in Chrome

Yeah, Chrome right!? Although Chrome blocks popups, it doesn't really. Here's an example: [popups still run in Chrome](http://jsbin.com/uticev/3). If the popup didn't run, then you *shouldn't* see *"Yep, this came from the popup you just blocked"*. In Chrome, and (at time of writing) Canary (so production to bleeding edge) you'll see this content.

This content comes from the [popup url](http://jsbin.com/egixav/2/) which simply runs:

    window.opener.insert("Yep, this came from the popup you just blocked");

What's extra special is that none of the activity in the popup is logged (in the *Network* tab for instance). So you could run all kinds of secret JavaScript without any record of it happening (which could be fun as an Easter egg...or maybe something nasty...).

So with some help from the Twitter community, I can now detect whether the popup was blocked or not using this nasty piece of logic:
      
    var remote = window.open(window.location.toString() + '#tiltremote', 'Tilt', 'width=300,height=' + height);
    
    // stupid logic to detect if Chrome really did block the window
    if (remote) {
      remote.onload = function () {
        setTimeout(function () {
          if (remote.innerHeight <= 0) {
            blocked();
          }        
        }, 10);
      };
    } else {
      blocked();
    }



## Self contained

## Node.js

## Collaborating with designers

## CSS columns
