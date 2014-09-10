# When's a static IP not a static IP? When it's with Plusnet

When [we](/about) moved back from Canada I went through the usual job of checking out all the best <abbr title="Internet Service Providers">ISP</abbr>s.

There was also a couple of prerequisites:

1. At least a 1mb connection.
2. Static IP.
3. Good reputation with customer services.

Finally through reading around the Net and general recommendations from colleagues, I settled on [Plusnet](http://plus.net)'s £22.99 per month for a 2mb static IP.

Turns out lately, I was wrong on all three fronts.


<!--more-->

## First Problems

On the 24th August 2006 my Internet goes down.  Since I'm now working from home between 3-4 days a week (thank you [DL](http://www.digitallook.com)) it's a major inconvenience.

Since the Internet is down, I can't just lookup their details (God knows where my dial up details anyway).  However, I did have them saved in my address book.

I leave all the details of the problem, "yes, it's plugged in, yes, it's turned on, yes, I've rebooted", the usual PC World questions&dagger;.

<small>&dagger; i.e. treat everyone like an idiot and chances are you'll fix most problems.</small>

Once they've got all my info, they tell me it'll be **8 hours** before I can expect *any* response!

Okay, well, I'm not a business user, so maybe that's why.

About a hour later the Internet comes back by itself.  However, I still get a call on my landline (even though I gave my mobile number...) asking how it's going.

Then the engineer says:

"If you have the problem again, use our web site to log the issue and a customer service rep will get back to you - it's much faster that going by phone."

Hang on.  My Internet is down, how am I going to log it?  More importantly, the guy is saying using the phone is going to be dog slow.  Damn.

## Second Problems

So, over the next few days the connection continues to drop in and out throughout the day.

I keep logging the problems on their support pages (once the Internet is back up...obviously).

After hearing absolutely **zip** all, I start to wonder if anyone is going to respond.

The response on the support pages are:

> This has not been raised please could you do this.

And then on the 31st of August 2006:

> Dear Mr Sharp,
> For some reason your problem was not raised to the supplier. This has now been done and I am awaiting their response. I apologise for the delay and the inconvenience caused

Then on the 7th of September:

> Dear Mr Sharp,
> By looking at your connection log it seems that the problems that you were experiencing have now been resolved. Please do not hesitate to contact us if any problems persist.

Damn!  So I got straight back to them explaining that it was still going down, asking how, suddenly the problem has fixed itself (oh - if programming was just as easy!).

I start logging the connection via a quick ping script.  Yep, the Internet is still going down.

Plusnet are now saying that there was a problem, but the recent issues could be due to my modem timing out.  Wow, what a coincident.  My modem suddenly screwing up, just days after their Internet problems have magically resolved themselves.

## The Last Straw

With my Internet as stable as tight rope walker staple gunned to an elephant, this morning, 21st September 2006, I find I can't connect to my office machine.

The net is up, but there's something wrong.  I get on to the sysadmins, tell them to sort out the server or the iptables or whatever, I need to get in.

Something's amiss.  I'm told to check my IP.

Well, let me put it like this: my static IP, nope, that's gone, lost, misplaced, hidden, who knows?  I'm now on a dynamic IP range.

By this point I was raging.  I sent a message via their support forms, desperately trying not to swear, leaving points like: outraged, compensation and apology.

This explains why my <acronym title="Secure Shell">SSH</acronym> is blocked, and why my email isn't sending.

While Plusnet are offering 8mb at £9.99, and I'm paying double for a 2mb and static...well, really non-static connection.

I really am getting screwed.  Time to switch me thinks.