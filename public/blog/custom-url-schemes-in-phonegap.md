---
title: Custom URL schemes in PhoneGap
date: '2010-10-01 12:00:15'
published: true
tags:
  - code
  - ios
  - javascript
  - phonegap
modified: '2014-09-03 16:15:12'
---
# Custom URL schemes in PhoneGap

With [Marbles2](http://marbles2.com) for iOS I wanted people to be able to click on a url, like [http://marbles2.com/app/?seed=2A72367A](http://marbles2.com/app/?seed=2A72367A) and if the app is installed on the iOS device, for it to launch Marbles2 and initialise with the "seed" passed in.

It required a change to the iPhone PhoneGap project, which has been since [merged in to the git hosted code](http://github.com/phonegap/phonegap-iphone/commit/ab5b6270e2f669e021ba1f6e78361abc12d81104), so I'm going to show you what to do and how to access this info.

<div class="update">A personal note (possibly just for me) this was not posted on 2010-09-01 - it was written in advance and scheduled for this date. In the end, published some months after this date.</div>

<!--more-->

## Associating the custom url scheme

You need to edit your app-Info.plist (where app is "marbles" in my case), and add the "URL types" key and follow the directions on the [iOS reference](http://developer.apple.com/iphone/library/documentation/iphone/conceptual/iphoneosprogrammingguide/StandardBehaviors/StandardBehaviors.html#//apple_ref/doc/uid/TP40007072-CH4-SW50). In the end it should look a little like the screenshot below, where "marbles" is the custom url scheme, and "com.leftlogic.${PRODUCT_NAME}" is my product identifier.

<img src="/images/info-plist.png" width="600" />

## Accessing the custom url data

If you're using the latest version of the PhoneGap iPhone project, then when you hit the url that looks like:

[marbles:///?seed=2A72367A](marbles:///?seed=2A72367A)

Hitting the link whilst in your device (or simulator) will launch the app you installed with the associated custom url scheme, and PhoneGap will introduce a new object on the global scope called <code>Invoke_params</code>. So to access the "seed" argument, I do:

<pre><code>alert('Seed is ' + window.Invoke_params.seed);</code></pre>

Simple, eh? Now you've got a way to pass in custom arguments to launch your app.

## Dual web and native support

Now that the native PhoneGap version of Marbles2 supports the custom url, what about the url I posted, say to Twitter?

The way Marbles2 works is that if you visit the web version, and you pass in a seed (this is the way to play other people's sequence of boards), and you have the native version installed - I want to send you to the native app.

The way I manage this is that when you hit the web version of Marbles2, it checks for a seed on the url. If there is, it tries to open an iframe pointing to the custom url scheme. If the app is installed, this will cause the app to be launched (though it'll prompt before opening the app). Since the native app doesn't have the seed on the <code>window.location</code> object, I'm able to use *exactly the same* code between the native app and the web app using a simple bit of code like this:

<pre><code>// if the url contains "seed=xyz" then this code will run
window.location.search.replace(/bseed=([^&=]*)b/, function (m, seed) {
  var iframe = getIFrame();
  document.body.appendChild(iframe);

  // discard the iframe when it's finished
  iframe.onload = function () {
    document.body.removeChild(iframe);
  };

  // this pops up an ugly window in Mobile WebKit - would be nice to suppress it
  // but if the native app is installed, it will launch Marbles2 and pass in
  // the game seed.
  iframe.contentWindow.location = 'marbles:///?seed=' + seed;

  // carry on as normal, if the custom url doesn't do anything,
  // initialise the game with the passed in "seed"
  Marbles.seed(seed); // handle the web based game using the seed
});

// create an iframe that's on the page, but hidden visibly
function getIFrame() {
  var iframe = document.createElement('iframe');
  iframe.style.visibility = 'none';
  iframe.style.position = 'absolute';
  iframe.style.left = '-999px';
  iframe.style.height = '1px';
  iframe.style.width = '1px';
  return iframe;
}</code></pre>

## Marbles2

Do have a play with the [online version](http://marbles2.com) and I'll be posting the native version to the iTunes store in the next month or so, so you'll be able to see the effect if you don't already play around with it yourself.

If you want to learn more about PhoneGap, my conference Full Frontal, is running a [full day workshop with Brian LeRoux](http://2010.full-frontal.org/workshops#phonegap) entirely on  PhoneGap, so check it out!
