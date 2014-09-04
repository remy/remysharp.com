# When should we stop caring about IE6?

Microsoft's bastard child needs your love, but surely not forever?  [Simon raises a point](http://remysharp.com/2008/03/06/ie8-hands-on-a-developers-view/#comment-53531) that even though IE8 is on it's way - due to IE6's market share, IE8 is almost good for nothing.

I don't agree.


<!--more-->

I've found there's often web sites showing market share and charts of market share, but I've yet to find somewhere showing show IE has grown.

So I went to [TheCounter.com](http://www.thecounter.com) and starting from [Jan 1999](http://www.thecounter.com/stats/1999/January/browser.php) I pulled up all the records for IE until February 2008, and parsed them to create a chart showing the rise and fall of each IE version.

## IE version data

<img src="http://remysharp.com/wp-content/uploads/2008/03/msie-browser-version-adaption.png" width="600" height="400" alt="MSIE browser version adoption covering 1999 to 2008" title="MSIE browser version adoption" />

[Source chart URL](http://icanhaz.com/ie-adoption)

## Chart notes

The chart shows every months worth of percentage take up for IE browsers 4 through 7 in the whole browser market.

I've included markers in the chart to highlight the launch of each new browser (from IE5 onwards).

There looks like there may have been a data correction for IE7 around February 2007 which could explain the large dip.  Nothing particularly important happened during that period on the [browser timelines](http://en.wikipedia.org/wiki/Browser_timeline).

## What does this show?

* IE6s lengthy exposure to the market means that it's in more households that previous, and current incarnations of IE.
* When Microsoft bring out a new browser, it *does* gradually replace the previous browser.
* If you compare the progress of adoption when IE6 came out to when IE7 came out, they're near the same.  The difference is the previous browser's adoption and it's impact on these figures.
* [Today](http://www.thecounter.com/stats/2008/February/browser.php), according to TheCounter.com, IE7 has just passed IE6.
* I believe the adoption of IE7 is not a great as IE6 (see period Aug 2001-Aug 2002 and Jul 2006-Jan 2008) will be due to greater choice of browsers on the market today - Firefox starts to have a [significant market share](http://en.wikipedia.org/wiki/Mozilla_Firefox#Market_adoption) in 2006.


## Conclusion

Generally, your normal user (i.e. not the techies) will upgrade their browser if it's forced upon them.  This is either through forced updates from Microsoft, or, more likely in my opinion: PC upgrades.

New PCs mean new browsers, and if you buy a machine today you'll have IE7.  In a year, if you buy a PC you'll have IE8 - and that's where the real take up will happen.  Since PCs are getting cheaper and more powerful (as they keep doing over the years), PC turnover increases.

Sure Microsoft will advertise IE8, and this will encourage change, but I believe PC turnover will be one of the greatest factors driving the market shift.  

## My prediction

Depending on your views, a browser below x% of the market does not have to be supported.  For me, this is any browser below the 10% mark.  If it's a standards based browser, then my layout will work anyway (I'm looking at you Safari).

From this data, I'm predicting that by 2010 IE6 will have a small enough market share to be ignored.

That said, by then, we *should* be on Firefox 4-5, <del>IE10</del> IE9-beta and Safari 5.  

Sure, 2010 is pretty far away right now, but it'll be here before you know it.  

The bottom line is, as developers and designers, if we want to support the majority of users, we're going to have to support all the latest browsers, and for the big boys, Microsoft in particular (though if Google enter that market we could have another big boy on our hands) - we're going to have to support all the [stupid](http://ejohn.org/blog/most-bizarre-ie-quirk/) [little](http://remysharp.com/2007/02/10/ie-7-breaks-getelementbyid/) [quirks](http://www.quirksmode.org/bugreports/archives/explorer_7/index.html) for last 3 revisions of the browser.