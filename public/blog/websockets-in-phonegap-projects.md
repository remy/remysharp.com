---
title: WebSockets in PhoneGap Projects
date: '2010-10-04 13:35:57'
published: true
tags:
  - code
  - phonegap
  - websockets
modified: '2014-09-03 16:15:12'
---
# WebSockets in PhoneGap Projects

I'm a big fan of the [WebSockets API](http://dev.w3.org/html5/websockets/) for all the real-time goodness it offers, but the iOS platform doesn't (currently) bake the WebSockets API in to mobile Safari. That sucks, particularly because I can enjoy making iOS native apps using awesome frameworks like [PhoneGap](http://www.phonegap.com/ "PhoneGap"). *However*, because I'm using PhoneGap, I *can* create a PhoneGap plugin that introduces WebSockets to my HTML & JavaScript. So that's what I did.

<!--more-->

## Installation

I'm assuming you've got your PhoneGap project and XCode to manage and build the project.  These instructions are going to explain how to get WebSockets working in your project.

### Step 1: Cocoa Async Socket

Download and include `AsyncSocket.h/.m` from the [cocoaasyncsocket](http://code.google.com/p/cocoaasyncsocket/) project in your project directory (or some subdirectory, as you please).

Next, drag these files (`AsyncSocket.h/.m`) in to the XCode project space - this will include the files properly when the project is built.

### Step 2: PhoneGap Plugin: WebSocket

Now download (or fork) the [PhoneGap-Plugin-WebSocket](http://github.com/remy/PhoneGap-Plugin-WebSocket) project.  Now repeat the process you did with the Async project with the `WebSocketCommand.h/.m` files.

Next, copy `websocket.js` in to your `www` directory and include the following *after* you include *phonegap.js*:

    <script src="websocket.js"></script>
    
**Note:** you can also release your project to the web and include the `websocket.js` script, because it will only introduce WebSockets if a) WebSockets aren't already available, and b) only if PhoneGap is in place.

So now you're read to rock and roll with native WebSocket support in your PhoneGap project.

## Usage

Once you've followed the installation, usage is exactly the same as using a WebSocket normally:

    var ws = new WebSocket('ws://example.com');
    ws.onmessage = function () {
      alert('a message was recieved');
    };
    
    ws.onopen = function () {
      ws.send('I just connected!');
    };

One small caveat, if you need the WebSocket straight away, you will need to wait until the `deviceready` event fires, but otherwise you can just create the socket on demand.

If you want to learn more about PhoneGap, my conference Full Frontal, is running a [full day workshop with Brian LeRoux](http://2010.full-frontal.org/workshops#phonegap) entirely on PhoneGap, so check it out!
