---
title: On Chrome hiding URLs to protect users from phishing
date: '2014-05-04 19:10:46'
published: true
tags:
  - chrome
  - google
  - security
  - web
modified: '2014-09-03 16:15:12'
---
# On Chrome hiding URLs to protect users from phishing

Jake and Jeremy have posted about how chrome is experimenting with a way to protect users from phishing. Jake is pro the approach, Jeremy against. Read their posts: [Jake's](http://jakearchibald.com/2014/improving-the-url-bar/) and [Jeremy's](http://adactio.com/journal/6779/).

<!--more-->

*Please note, this post is unedited – and written on a tablet!*

What I'm posting is a proposal for an alternative approach (that I couldn't fit, and didn't want to fit into 140 characters!).

Instead of hiding the URL entirely, take the lead from what exist now (the path is semi-opaque), **but in addition the subdomain is truncated** and dimmed the same way long paths are.

The point is to get the *actual domain* across to the visitor, so how about this for a solution:

![/images/jake-evil-better.png](/images/jake-evil-better.png)

Note that the URL is shown in the browser tab (because in this example, there's no `title` element), this should also be used to highlight the actual domain, and not default to showing the full URL.

When compared to the current situation:

![/images/jake-evil.png](/images/jake-evil.png)

The change (which I'd expect across all Chrome browsers, i.e. mobile too) is:

- Semi-opaque pathname
- Semi-opaque subdomains (cname)
- Truncate long paths to ellipsis
- **Truncate any preceding subdomains with ellipsis (with sensible defaults, like it would show `www` or perhaps the final subdomain fragment)**
- When the `title` element is missing, match the text displayed in the tab title to the truncated URL shown in the URL bar.

I'll note that most browsers already highlight the domain part of the URL, but the point I'm trying to make with my proposed mockup, is that everything before the domain (the jakearchibald.com part), **should be truncated *as well as* dimmed**.

Perhaps this is a strong enough move to make clear to visitors exactly what URL they're on, whilst still communicating that they're visiting a specific URL and not just the root of the domain.
