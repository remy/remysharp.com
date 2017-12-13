# Is jQuery still relevant?

I've been cruising the reddit listings recently and without much searching I
found a staggering amount of _"jQuery is outdated"_, _"jQuery isn't relevant"_,
_"I think jQuery is dying out"_, _"…forget about jQuery. It isn't good for
anything anymore"_, _"jQuery hasn't been relevant for years in my opinion, it's
best to avoid a "career" that requires it"_!

Now, I think it's fair to say: _poppycock_. But poppycock aside, the question
remains: is jQuery still in 2017 (and as we join 2018) relevant and more
importantly, is it worth a newcomer learning the library today?

<!--more-->

## The short answer: yes

Yes, of course it's worth learning jQuery. The internet is littered with
tutorials and knowledge across your peers is vast - that's to say: help is in
abundance.

Moreover: jQuery is prolific in today's web and there's an extremely high chance
that you'll use it in your career. Sure, you might work for bleeding edge start
up from Sillygone Valley that only uses Ember version pre-release 20 (_not a
thing…yet_), but that's not the only job you'll have in your career.

## Proof in the wild

How about we look at some real world web sites, and potential employees and
clients and see if _they_ use jQuery, and importantly, how many of them.

I've been playing with [BigQuery](https://bigquery.cloud.google.com) and
querying [HTTP Archive's](http://httparchive.org/) dataset (you'll need to sign
up to access the tool).

The HTTP Archive crawls the top 10,000 web sites from the
[Alexa top 1,000,000](http://www.alexa.com/topsites) web sites and exposes all
that data in a BigQuery table (or as a
[downloadable mysql database](http://httparchive.org/downloads.php)). This year,
the HTTP Archive started testing and collecting JavaScript libraries under
`httparchive:scratchspace` (though it's not an exact science for all libraries,
it's reliable for jQuery based queries).

I've queried the HTTP Archive and includes the top 20 results in the charts
below.

### JavaScript library distribution

The chart below is a query from July 2017 aggregating the count of the library
name over a total of 998,346 web sites collected. The chart shows that jQuery
accounts for a massive 39% of libraries found on the web sites.

Reading through the next libraries, jQuery UI _requires_ jQuery, as does
Bootstrap and FlexSlider. Modernizr isn't a "do thing" library, nor are many of
the libraries until we hit Angular.JS.

![JavaScript library distribution](/images/library-distribution.png)

[BigQuery saved SQL statement: Libraries by usage](https://bigquery.cloud.google.com/savedquery/6055551911:e6fa748c2ec9441b8920e6be6716b5ca)

### jQuery versions

Are web sites staying up to date with their version of jQuery? The version of
the library is included in the the `httparchive:scratchspace`, so I've just
looked at the aggregate totals of particular versions:

![Top jQuery versions](/images/top-jquery-versions.png)

[BigQuery saved SQL statement: jQuery by version from latest dataset](https://bigquery.cloud.google.com/savedquery/6055551911:b281945347d44c9397e93db71dd33108)

jQuery@3 accounts for about 6.4% of all the data points. I don't think this is
because "jQuery is dying out", but more than jQuery solved a serious problem
with browser compatibility and make effects and ajax easy. In today's modern
browsers there's CSS transitions and a consistent implementation of
`XMLHttpRequest` or even the `fetch` API.

More specifically, I'd conclude that those web sites with much higher traffic
from "older" browsers (i.e. questionable interoperability) are using jQuery to
simplify their JavaScript.

### jQuery over time

Finally (and this query appears often): how year on year usage changes. I've
included Angular.JS for contrast. The table looks like the delta between 2016
and 2017 is showing the first drop in usage (by 2%):

![jQuery use year on year](/images/jquery-year-on-year.png)

[BigQuery saved SQL statement: jQuery year on growth](https://bigquery.cloud.google.com/savedquery/6055551911:30e7726dde8b4cf4bebe35a8f6977d63)

So, although this is a small change, I strongly suspect this will stabilise in
the next 5 years, rather than rapidly shrink.

## Wrapping up

I've seen this kind of dominance in the web before with IE4 and then IE6. And
that browser was (and is) hated on pretty hard - and to be fair, IE6 was fairly
riddled with issues. jQuery isn't the same. jQuery is
[actively maintained](https://github.com/jquery/jquery/commits/master) and
shipped as the default JavaScript library for _a lot_ of large projects
(WordPress being one of them).

You certainly don't _need_ jQuery today. Nor do you _need_ to learn jQuery.
However, jQuery is far from dead, dying, outdated or irrelevant. It serves many
developers from many different walks of life.

So, is jQuery still relevant? At the end of 2017: yes.
