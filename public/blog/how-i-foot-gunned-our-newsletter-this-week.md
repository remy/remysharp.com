---
title: 'How I foot-gunned our newsletter this week'
date: '2026-06-05'
ad: false
tags:
  - code
---

# How I foot-gunned our newsletter this week

For the second year running, as part of our "stay sane" strategy for FFConf, Julie and I write and send a weekly newsletter. It's structured the same way so it means we have a much better line of sight as to what we have to say.

The open rate is usually around 40% (though I know some email systems synthetically do this), but our click rates are also usually pretty good.

This week however, open rate was 3% and click rate was just 8 clicks. Something was definitely…afoot.

<!-- more -->

## Spam scores

I had a report from a friend of the event that last week's newsletter landed in their spam folder. From this, I decided to integrate [spamassassin](https://spamassassin.apache.org/) to try to score the content (which it almost always comes back clean).

As belt and braces, I also paid for some credit for [Mail Tester](https://mail-tester.com/) which gives me an email address that I can send to and it'll run all manner of tests, including stuff outside of the actual markup.

I had a score of 9.8/10 - so I dipped into what could be improved, and suggested "check DMARC policy state".

## DMARC

The page suggested:

![A screenshot of the recommendation to add a DMARC record where p=reject](/images/dmarc.avif)

Not being that versed in email security set up, and like many of us, having to wear _many_ hats, I just copied what I needed and trotted along adding this record.

What I didn't appreciate was that this change translates to:

> If the email didn't come from Left Logic, just **reject** it.

The problem being is that the email _doesn't_ come from Left Logic, it comes from AWS because I use SES for sending the newsletters. So even though our newsletter [product](https://www.mailcoach.app/) said they were all sent. AWS also said they were all sent. Only a handful of people had the email.

The _only_ reason I figured it out was because I hadn't received the email to my personal email.

The temporary fix was to add this to the `_dmarc.leftlogic.com` as a TXT:

```
"v=DMARC1; p=none; rua=mailto:dmarc@leftlogic.com"
```

I do need to sort out proper SPF records and DKIM and "Easy DMARC" (whatever that is), but next time around I might be a little more careful with what I copy and paste…

(though, who am I kidding!)

*[DMARC]: Domain-based Message Authentication
*[DKIM]: DomainKeys Identified Mail
*[SPF]: Sender Policy Framework