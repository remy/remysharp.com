# The toxic side of free. Or: how I lost the love for my side project

This is a story about JS Bin. I've told one story of JS Bin before, and this is the b-side: the dark side. But remember with everything I share with you, JS Bin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

<!--more-->

The story has been broken into 5 parts, released over a series of days.

- [Part 1: The start of the DDoS](/jsbin-toxic-part-1)
- [Part 2: Spam](/jsbin-toxic-part-2)
- [Part 3: Registered users wreaking havoc](/jsbin-toxic-part-3)
- [Part 4: The cost](/jsbin-toxic-part-4)
- [Part 5: Police](/jsbin-toxic-part-5)

## Part 3: Registered users wreaking havoc

Originally JS Bin was 100% anonymous. I liked that. But after about a year (or so...I forget), there was clearly an important feature missing: people couldn't recall their old bins.

Duh. Obviously. It's *anonymous*. But that didn't really fly for an answer. Before the full version 3 rewrite (from PHP to Node), I implemented a simple system that you could "register" your name and "key" as your token. This meant that advanced users would know how to recall their bins (so long as this special cookie was in place).

When I realised I had implemented user sign-in in quite possibly the crapest way, version 3, new, clean, slick JS Bin, came with proper sign-in, register and password reminder.

With one fatal flaw: there were zero checks on your account. No email authentication, no captcha (I hate crapchas), no nothing. And registered users didn't have *any* limitations on their bins - the public output would remain public.

This, unknowingly to me, lead to an increase in registrations. Yay! No. Not yay. These were not the kinds of folk you wanted in your system. What's worse, is these users would create multiple accounts to create multiple bins, all of which were not limited. They'd still be limited by the blacklisting, but blacklisting is simple and probably doesn't even catch 20% of the junk.

### Grinding to a total halt

On the morning of March 26th, 2015, I was solo parenting looking after my awesome little ones, when I started noticing reports on JS Bin that something might be very wrong.

![The Sharps](/images/seren-family.jpg)

Earlier I mentioned that the bins went from 10 million to 15 million in around 6 months (or so). Our registration rate was also climbing insanely quickly. The net effect of this: storing more content.

Storage is cheap, right? Sure is. JS Bin stores it's database on a 100GB drive. It's *just text* for heavens sake.

JS Bin's database ran out of disk space. All of it. Gone. So much so, that I *couldn't delete data*. (I think) because MySQL needs to create a tmp file to run queries, that since there was literally no disk space, it couldn't create the tmp file to delete the junk bins that were seemingly coming in faster and faster.

The weird thing was that JS Bin still worked. It could recall bins and you could use JS Bin, you *just couldn't save* (though, that's kind of a problem...).

When you're solo parenting, though, there's no support around and there was no way I was going to (or even *could*) abandon the kids to work on solving this issue. I had to suck it up, and trying to focus entirely on the kids and ignore the problem until my wife returned home. I did manage to put out a [cry](https://twitter.com/rem/status/581004721785167872) for [help](https://github.com/jsbin/jsbin/issues/2320) which had lots of lovely support, but support doesn't fix fucked disks.

Though, eventually, a few hours later, I managed to swap in a 400GB disk to the AWS database. This solved the issue right away, but the source of the problem was still wide open.

### If you (still) can't play nice...

Wide open registrations was always a stupid idea. An entirely anonymous web site, given JS Bin's purpose, is also a stupid idea.

In the end the *only* way to register with JS Bin *now* is via GitHub. I don't like this, but it does lean on GitHub's verification process. It doesn't kill the issue 100%, but it reduced our sign-up rate significantly and we only have the odd one arsehat come through (which I also then report back to GitHub).

---

In [part 4](/jsbin-toxic-part-4), I'll talk about the costs of running JS Bin, and how pro failed to save the day.