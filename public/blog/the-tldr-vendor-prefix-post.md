---
title: The TL;DR vendor-prefix post
date: '2012-02-10 14:18:33'
published: true
tags:
  - css
  - web
modified: '2014-09-03 16:15:12'
---
# The TL;DR vendor-prefix post

With my [post yesterday](/2012/02/09/vendor-prefixes-about-to-go-south/) I appreciate it might be a bit long and perhaps focused mostly on my take on the meeting minutes. I wanted to be super clear about what I think about the situation, what will happen and what we can do - in super easy bullet form.

<!--more-->

1. Browser vendors for Firefox, Opera and IE will eventually implement `-webkit-` prefixes (a subset). Sad, but true. It's an amazingly bad idea, and I'd love to be wrong, but browsers are like bulldozers, they'll go where they want and more importantly: need to go.
2. Vendor prefixes are a good thing. Or rather **experimental** prefixes are a good thing. They allow developers to test and feed back to vendors.
3. Vendor prefixes *should* be dropped from production level browsers and only made available in beta browser versions.
4. Point above will not happen (or at least in the short term). Google and Apple have said as much. This was the same reasons Microsoft gave: they didn't want to break the web. Microsoft did eventually drop propitiatory tech like CSS filters (well, it vendor-prefixed it, but the effect non-prefixed is "broken" in IE9), so maybe in the future this *may* happen.
5. Maybe the middle ground is we draw a line in the sand, and say: All current prefixes will remain as they are (WRT production browsers). All **new** experimental properties will have a finite lifetime, and *not* make it to production.
6. Yep, the working group should move faster to retire beta technology (*if it works*), but this hasn't happened any time soon (see the irony?!).
7. Do not go duplicating *every* `-webkit-` prefix you find: they're not all supported, nor are all the values always the same. Use your head, obviously! This needs to be done on a case-by-case basis. ie. Add `-moz-` et al for `-webkit-border-radius` but when you encounter linear gradients the syntax is different.
8. Do check your code against tools like [csslint](http://csslint.net) - it will tell you which vendor-prefixes can be reused today. I'm close to having a tool ready that will automatically fix these for you - but to be clear: this will only stem the flow of the wound, and doesn't fix it ultimately for the future.
9. Should all browsers use the WebKit render engine? Hell no. WebKit would continue to innovate until it was finished, then we'd have that really long quiet period that Microsoft demonstrated with IE6, where expectations move on but browsers don't. No, this a stupid suggestion.
10. Don't stop evangelising. It's a slow slog and is never a completed job.
