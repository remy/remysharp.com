# Safari 3.1 web developer functionality

I've just upgraded to Safari 3.1 and I'm trying to catalogue the list of available functionality.

I'm certain this upgrade is driven by the announcement of the SDK for the iPhone, because in the demos showing that web development has been upgraded, it shows how features can be exploited on an iPhone - but as developers on our Macs, Safari 3 didn't support most of these features...yet.


<!--more-->

Here's a list of the main features I've found to be now working in Safari 3.1 and previously weren't available on Safari 3.0.

* [Client side database storage](http://webkit.org/blog/126/webkit-does-html5-client-side-database-storage/)
* [CSS Transformations](http://webkit.org/blog/130/css-transforms/)
* [CSS Animations](http://webkit.org/blog/138/css-animation/)
* [HTML5 Media support](http://webkit.org/blog/140/html5-media-support/)
* [querySelector and querySelectorAll support](http://webkit.org/blog/156/queryselector-and-queryselectorall/)<sup>&dagger;</sup>
* [Native getElementsByClassName support](http://webkit.org/blog/153/webkit-gets-native-getelementsbyclassname/)
* [Downloadable fonts](http://webkit.org/blog/124/downloadable-fonts/)

<small>&dagger; I've asked [John](http://ejohn.org) whether jQuery will sniff for this functionality in the find method - which would be a massive boost to the selectors...whether it's easy or not is another matter.</small>

The inspector has also been upgraded to [edit CSS styles](http://webkit.org/blog/148/web-inspector-update/) (thanks Mark for the correction) - and it includes the fonts downloaded and the local database stored values.

Finally, though Safari 3.1 is not the latest version of WebKit (obviously), it's definitely moving closer towards 100% on the [Acid 3](http://acid3.acidtests.org/) test.  Here's the current stats:

* Safari 3.0 - 38/100
* Safari 3.1 - 74/100
* WebKit - [93/100](http://webkit.org/blog/161/webkit-hits-93100-in-acid3/)
