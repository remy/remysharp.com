# What developers can learn from the past

I was asked, amongst many others, "what can developers learn from the past" by [.net magazine](http://www.creativebloq.com/web-design/what-can-web-designers-learn-past-41514659) some months ago. Alas, my response was way, way over budget, so I've posted it here in it complete form.

DRY: **Don't repeat yourself**. But I don't mean DRY code, it's actually much similar than that.

<!--more-->

---

Recently there was a fun [code search](https://searchcode.com/?q=if(version%2Cstartswith(%22windows+9%22)) that revealed the reason why the next version of Windows to be released was going jump from 8 to 10: `if (os.startsWith("Windows 9")` ...a mass of code that showed hard coded lines attempting to match Windows 95. 

This search shows a huge amount legacy code that relies on a string matching that didn't consider at the time there might be another Windows 9x. Understandable the first time around I guess.

This is reminiscent of the browser sniffing days that aren't that long forgotten. Remember when Opera was the first browser to hit double digits in it's version? They shipped with a user agent that had *both* Opera 9 and Opera 10! The reason behind this madness: browser sniffing (done poorly I might add).

**We repeated these mistakes.**

More recently (in 2012) concerns about vendor prefixes and [non-WebKit browsers adopting WebKit prefixes](https://remysharp.com/2012/02/09/vendor-prefixes-about-to-go-south) because us developers kept including a single vendor prefix.

Bruce Lawson has an [excellent 20 minute talk](http://vimeo.com/m/52171395) on lessons we (should have) learnt from the days of "Works best in Internet Explorer". IE6 won the battle of the browsers because we refused to code for the "older" browsers. Similar to vendor prefixes, eh?

**We repeated these mistakes.**

If you notice the reoccurring themes at conferences and discussion around the future of web sites on the web, it seems progressive enhancement is having a resurgence – as if it should! It should be baked into our development workflow.

There's been a recent surge of "blank page sites". And certainly "You need Safari/Chrome to view this site properly". Poppycock.

**We're repeated these mistakes.**

So, if we can learn anything, I'd say: if it feels easy, and has a stink of not being future friendly, then you you consider aborting your current path and start again. It'll be worth it. You won't repeat those small, but nontrivial mistakes.

Don't tell yourself that just because Google is able to crawl your JavaScript is an excuse to get lazy. Google isn't the prevailing entity here; you, your work and your legacy is.

What can developers learn from the past? **Don't repeat these mistakes.**
