# The toxic side of free. Or: how I lost the love for my side project

This is a story about JS Bin. I've told one story of JS Bin before, and this is the b-side: the dark side. But remember with everything I share with you, JS Bin is the longest running live pastebin, and it's not going anywhere. It will continue to run and serve its users. Even the scumbags.

<!--more-->

The story has been broken into 5 parts, released over a series of days.

- [Part 1: The start of the DDoS](/jsbin-toxic-part-1)
- [Part 2: Spam](/jsbin-toxic-part-2)
- Part 3: Registered users wreaking havoc
- Part 4: The cost
- Part 5: Police

## Part 2: Spam

Who doesn't love a filthy dose of spam with their product? Let's picture exactly what JS Bin is: a place that people can *anonymously* create public web pages.

So...yeah...I guess I should have known I was asking for trouble.

JS Bin, as of April 2015, has well over 15,000,000 bins. It crossed 10 million bins late last year, so that number has been accelerating. It should. That's what growth is about. But I had to face it, there's no way there's 5 million new bins with everyone learning the magic of the web stack. There's going to be some spam in there.

![https://www.flickr.com/photos/the-lobster/4767649914](/images/spam.jpg)

<!-- photo via: https://www.flickr.com/photos/the-lobster/4767649914 -->

### Affiliate spam

No, not spam that I, or JS Bin are affiliated with! At some point in 2014, I searched Google with "site:jsbin.com" just to see what awesome content existed. Sadly, Google's only reply, and pages of reply, was this "affiliate spam".

Bear with me: it's a page that contains a tonne of links that usually entices the reader to click through for some kind of random product. Maybe a DVD or a CD containing the secrets to earning your first million or some such nonsense.

In some cases, since I have admin access to JS Bin, I would just delete the bin. But it was (and is) like playing whack-a-mole. You delete one, and immediately find another - partly also because with JS Bin, you're deleting a revision, and not the whole collection of bins (I've yet to develop that).

So in this case, I would head to the database and run dangerous manual queries to delete all the bins with the offending URL. Thankfully, in the 15 million rows, I had the good sense to add an index early on to the URL field, so it's quick and doesn't lock up the table.

### SEO spam

I don't really understand what this is, but it's definitely a thing. Similar to the affiliate junk, SEO spam would just contain an insane amount of links to web sites. I still don't understand it, but it's definitely nefarious.

### Phishing

Yay, phishing. Phishing is actually the very first type of abuse I ever came across on JS Bin. I don't remember who reported it to me, but at some point, someone was trying to phish the Habbo.com homepage.

It's why, even today, the [*public* config](https://github.com/jsbin/jsbin/blob/config.default.json) for JS Bin contains a default blacklist for `habbo.com` and `processform.cgi`. The blacklist prevents the bin from being saved. Everything works, but it just silently fails to save.

In production the blacklisting is much much larger these days, and includes frankly stupid stuff like `kardishain`, `Clickbank` and snippets of nasty code like `...|63|0A|27|73|70|2E|2F|...` which aims to prevent code that's used in some kinds of attacks.

But yeah: whack-a-mole.

### Link hiding

The last type of spam that appeared in JS Bin is using JS Bin as a link sharing site to the dark and shitty side of the web. Arsehats (the nasty users, as I like to call them) would use JS Bin to redirect using `top.location="http://arsehat.com"`. Then, using the full output URL, it would be shared on networks like Twitter and Facebook.

Since "arsehat.com" was already blocked on Facebook and Twitter, but JS Bin wasn't, it's an efficient way to share links to bad places, and hide under JS Bin.

It's kinda depressing that when I search Twitter for "jsbin.com", it would mostly yield weirdos sharing things like webcams to their toilet fetish funsies.

### If you can't play nice...

In August 2014, I made the hard decision that I would have to reduce JS Bin's functionality if it was going to continue to positively contribute to the web, instead of flooding it sludge filled spam.

I limited the full output *for anonymous bins* to last 90 minutes, then it would automatically revert to the edit view. Since the edit view is compiled using JavaScript, it had no use to SEO indexing. The live output `iframe` is also protected with a `sandbox` attribute that prevents location redirects, so the link hiding issue also (mostly) went away.

Finally, all output views (i.e. the full output without the "JS Bin editor" bit) include the `X-Robots-Tag: nofollow` header - which is the new way of doing `robots.txt`. This seems to have helped stamp out the "SEO" use of JS Bin.

But it didn't end there...

---

Return for part 3: how the registered users, who I thought were the goodies, wreaked havoc.