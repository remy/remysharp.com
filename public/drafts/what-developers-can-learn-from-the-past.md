# What developers can learn from the past

Don't repeat yourself.

Very recently there was a fun [code search](https://searchcode.com/?q=if(version%2Cstartswith(%22windows+9%22)) that revealed the reason why the next version of windows to be released was jump from 8 to 10: `if (os.startsWith("Windows 9")` ...which was old code to match Windows 95. 

This is reminiscent of the browser sniffing days that aren't that long forgotten. Remember when Opera was the first browser to hit double digits in it's version? They shipped with a user agent that had *both* Opera 9 and Opera 10!

We repeated this mistake.

More recently concerns about vendor prefixes and non-WebKit browsers adopting WebKit prefixes because us developers kept including a single vendor prefix.

Bruce Lawson has an excellent 20 minute talk on lessons we (should have) learnt from the days of "Works best in Internet Explorer". IE6 won the battle of the browsers because we refused to code for the "older" browsers. Similar to vendor prefixes, eh?

We repeated this mistake.

If you notice the reoccurring themes at conferences and discussion around the future of web sites on the web, it seems progressive enhancement is having a resurgence – as if it should! It should be baked into our development workflow.

We're repeating these mistakes.

So, if we can learn anything, I'd say: if it feels easy, and has a stink of not being future friendly, then you need to abort your current path and start again. It'll be worth it. You won't repeat those small, but nontrivial mistakes.
