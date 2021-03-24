---
title: 'The mythical code review'
date: '2021-03-24'
summary: "I've been doing code reviews since the early 2000s. It's taken me some twenty years to finally articulate that they're not that useful - or certainly not useful in the form I've seen them in the first two decades of my career."
tags:
  - web
  - business
---

# The mythical code review

For anyone who's worked in a development team (that involves code) and more than a single individual then the idea of a code review is going to have floated past your bow at some point or another.

I've been doing code reviews since the early 2000s. It's taken me some twenty years to finally articulate that they're not that useful - or certainly not useful in the form I've seen them in the first two decades of my career.

<!--more-->

My code reviews these days are now split between business where teams work together or from pull requests against my open source projects (which I'm honest is fairly infrequent).

Practice in software development is a thousand times better than my days back in the early 2000s, and I wanted to get my thoughts down on what works for code reviews that I've seen and been part of over the more recent years.

## What's the purpose of a code review?

It's easier to determine what a code review **is not**:

- Code review is not quality assurance - actual QA process is for that
- Code review is not going to catch bugs - actual tests, at least unit tests, are for that
- Code review is not to ensure code style is being maintained - automated linting is for that
- Code review is not to tell a peer they're doing it wrong - work together to get on the same page
- Code review is not to act as gate keeping - all of the above (linting, tests, QA) is for that
- Code review is not to point out other changes that _could be made_ - that's for another future code change
- Code review is not for relinquishing responsibility for the code - that's still on the author

So… what exactly is a code review good for? If there's a QA process in place, and tests and coding styles and linting, what exactly is the point of reviewing?

I think, **a code review is useful only as a way for someone else to know that a change occurred** and roughly where it occurred. It should go without say that it's useful to spread knowledge of code around more than a single person.

But that's kind of it.

However, if I really have to code review, what works?

## Small and often

A code review for a handful of lines of code is my kind of perfect. It'll often be for a laser focused pull request that resolves a very specific issue.

During small reviews it's possible to grok the code and functionality from these lines (effectively "imagining" how the code will work).

## When there's a large code review

Large code reviews are pretty worthless on their own. I've started to take the approach that when I'm the author of the large code reviews, that I add comments throughout in the pull request.

Which begs the question, why not comments in the code? Because comments in the code explain the _why_ of the code (or something that's not immediately obvious), whereas comments in the pull request, against the specific lines of code in a large(r) pull request adds information that's specific to the code review.

## Massive code reviews

We're talking multi-developer, hundreds of lines of code - it's not a code review. At best you're going to get someone to scroll the complete length of the files but it's not going in.

There's a couple of options here:

1. Sign off comes from a full and thorough QA process
2. Break the feature into multiple parts so it's staggered pull requests

Generally though, avoid this - it doesn't help the author or the company and it can lead to some real discomfort around code reviews if it happens often.

---

I've included the following as a cautionary tale to developers today. I pray you're not going through a similar process, but if you are - it's not a sustainable approach.

## My own backstory with code reviews

My first exposure to code reviews was for the company I worked for from '99 through to 2008. The standard process was that developers in the team would collect every file they had touched and add the full file name and path  to an Excel spreadsheet. This would happen on the afternoon of a release, and we'd often have multiple forks of work going on so there'd be multiple releases per month.

This was the days of CSV (which predates SVN which predates Git), so the revision control system was, comparatively basic to what I have today.

I would download _all_ the production code and then individually diff every single file. Quite often a release would involve well over a hundred files, modified by four or more developers.

Automated tests weren't part of our business back then so my eyes were the last pass before the code would go live. Hundreds of files, hundreds more lines to diff without any real-time context.

I remember it would take me hours. We laughably upgraded the process so that team leads (as the team grew) would run the diffs and "if they was too much to diff, another team lead would help" - like we all didn't have enough to do. At no point did anyone step back and ask: _why are there so many files in a single release?_

So the release would go live. Inevitably something would break (large releases + no tests = sure way to break things) and the question would be asked: Remy, why didn't you spot this bug?

I wish I had the experience I have now to reply: because I just diffed over 500 lines of code and it was a single line bug - you need to invest in testing and not relying on tired eyes at the end the day to hopefully catch obscure bugs.

With the next 20 years experience I would learn not only what works, but also learn to have the confidence in being able to push back against bad practices.

---

Where do you sit on code reviews?
