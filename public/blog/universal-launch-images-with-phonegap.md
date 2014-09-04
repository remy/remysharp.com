# Universal launch images with PhoneGap

I've been playing with PhoneGap a lot recently, in part to prepare [Marbles2](http://marbles2.com), but also to bring [JS Console](http://jsconsole.com) to the iPhone as a native app. I've always wanted to create an app that worked on all devices, but getting the launch image correct for each device can be tricky.

<!--more-->

## How the launch image works on PhoneGap

Basically there's *two* launch images. Once for the native app and once (manually by PhoneGap) whilst the UIWebView (aka Safari) is loading up. The native one is handled by the app as per the documentation on the Apple developer site, but the overlaid image is hardcoded to 'Default.png'. This is what we'll fix.

## Changes to PhoneGapDelegate.m

To get the three devices to work properly, you need to make a change to <code>PhoneGapDelegate.m</code>. Changing the [following line](http://github.com/phonegap/phonegap-iphone/blob/master/PhoneGapLib/Classes/PhoneGapDelegate.m#L209)<sup>&dagger;</sup>:

<pre><code>UIImage* image = [[UIImage alloc] initWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"Default" ofType:@"png"]];
imageView = [[UIImageView alloc] initWithImage:image];
[image release];</code></pre>

To:

<pre><code>UIImage *image = [UIImage imageNamed:"Default"];
imageView = [[UIImageView alloc] initWithImage:image];
// [image release]</code></pre>

<small>&dagger; Note that I've not learnt Objective-c, I've just messed around and Googled enough to get to this point!</small>

### imageNamed

The reason we switch from <code>initWithContentsOfFile</code> to <code>imageNamed</code> is for two reasons:

1. <code>initWithContentsOfFile</code> is also using the bespoke <code>pathForResource</code> which returns the full path to the file, which we don't want as I'll explain.
2. <code>initWithContentsOfFile</code> [apparently doesn't correctly pick up](http://atastypixel.com/blog/uiimage-resolution-independence-and-the-iphone-4s-retina-display/) the @2x resources for the iPhone 4 retina displays

## Adding the Launch Images

Now you need to create three images, for:

1. iPhone 3GS and below
2. iPad
3. iPhone 4 double resolution

The details of the resolutions are available [Apple's developer reference](http://developer.apple.com/iphone/library/documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14-SW5).

The iPhone 4 image is easy, you call it <code>Default@2x.png</code> and drag it in to the xcode project. The iPhone 3GS (and below) image is called <code>Default.png</code> and also dragged in to the project (there will probably already be a phonegap default image that you'll overwrite).  Finally the iPad image needs to be called <code>Default~ipad.png</code>.

This only works because we've made the change to use <code>initWithImage</code> because it'll automatically detect the device type and add the extension.

## One Final Tip

If you notice that when your app loads the launch image jumps, it's because the phonegap UIWebView is (incorrectly) offset by negative 20 pixels - we can fix this too. 

[Michael Brooks](http://github.com/mwbrooks) wrote a really elegant little bit of code that fixes the offset in the web view that's also contributing to the launch image jumping.

Add the code from this gist [http://gist.github.com/510407](http://gist.github.com/510407) to your *AppDelegate.m (in that if your app is called jsconsole, add the code to jsconsoleAppDelegate.m).

Once that code is in, you'll have your universal phonegap app with launch images all in the appropriate size for the app.

I used this technique for the iOS version of [JS Console](http://jsconsole.com/app/) (though I'm not totally sure it'll get accepted to the itunes store!!!).

Finally, if you want to learn more about PhoneGap, my conference Full Frontal, is running a [full day workshop with Brian LeRoux](http://2010.full-frontal.org/workshops#phonegap) entirely on  PhoneGap, so check it out!