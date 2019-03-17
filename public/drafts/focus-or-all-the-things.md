---
title: Focus or all the things?
date: '2017-05-02 18:18:13'
modified: '2017-06-01 11:32:12'
complete: false
inprogress: true
tags:
  - personal
draft: true
---
# Focus or all the things?

I've been considering this question a lot recently: can I focus on one thing? Strangely this has come about (again) because of a pricing structure change over at [zeit.co](https://zeit.co). I'm a big fan of what the team are doing and have been a reasonably early adopter. This past weekend they announced new features and a new pricing model to compliment the changes.

This post is a bit of a introspection of my own thinking and not at all a complaint at Zeit.

<!--more-->

## How pricing changes things

I've always had a little side project on the go throughout time. [JS Bin](https://jsbin.com) was a side project (that in some ways still is, just a rather large one these days). I hadn't realised, but the speed and number of side projects I was churning out had increased over the last 6 months, and now I'm fairly sure this has a direct correlation the 1,000 deploys (which also meant instances) on the premium plan (that I was on).

Since the start of the year, I've created and deployed around 15 side projects (either new or upgraded) ranging from tiny dashboards to static sites to full apps (like [jsonbin.org](https://jsonbin.org)).

In the new pricing, the model changed so that my current subscription is limited to 10 instances (i.e. running deployments). Everything above that is $15 per month (assuming it's running 247 during that month). Obviously I can upgrade to the next subscription level (a viable option), but it now makes me ask: should I focus on one project, instead of 20?

## Focus on less, do more


## The spread

I'm coming to realise that I can't just buy up machines or VMs as quickly and easily as I buy domains, so I need to compartmentalise what goes where.

Here's my categorisations I've come to:

- **Production projects**: significant traffic, take money, need to run inside reliable and proven infrastructures and potentially don't rely directly on bespoke platform technology (ie. can be moved). On additional important factor is being able to specify the geographic location of the instance.
- **Side projects**: non-mission critical, potentially take money.
- **Experiments**: throw away, and ideally available on demand - though acceptable if it goes down for a period of time or potentially forever.

Across these categories, the types of projects I run split between static sites, potentially static sites and dynamic sites (typically node).

Here's my plan for target deployments:

- All static sites: AWS S3 and CloudFront for SNI SSL certificate (example [Marbles&sup2;](https://marbles2.com/))
- Production: typically bespoke, either AWS EC2 or Heroku (example: [ffconf](https://ffconf.org))
- Side projects: Zeit's now platform (example: [jsonbin](https://jsonbin.org))
- Experiments: Glitch (example: [kids drawing app](https://glitch.com/edit/#!/draw?path=index.html:18:14))

I do also have one production project running on DigitalOcean and I expect eventually I will move it out.

## Full stack

Sadly, the platform the technology is running on is not the start of the stack. The start is the registrar, then the name servers.

For domains, I use:

- hover.com for discovery only (not for buying domains)
- gandi.net for .io domains
- name.com for a single .jobs domain
- namecheap.com for everything else, .com, .org, .training, etc.

For name servers I use:

- namecheap.com very rarely (though I'm actively moving all DNS _off_)
- DNSimple
- Route 53
- cloudflare

I used to run my own name servers, and recently I started looking at running my own again using PowerDNS, and although it was starting to work (and had a nice RESTful API), in the end the time I was investing trying to understand how to full configure and secure name servers just couldn't be justified.




