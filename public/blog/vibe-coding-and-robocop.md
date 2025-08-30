---
title: 'Vibe coding and Robocop'
date: 2025-07-18
tags:
  - web
image: /images/robocop-card.jpg
---

# Vibe coding and Robocop

I've been immersing myself in the AI news for the last few months, trying to get understanding of the landscape, what and why there's excitement, whether the ethics (both from a copyright and climate change perspective) are being considered, and what's the impact of my own usage.

In particular lately I've been looking at the idea of vibe coding. I've been playing with [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) which, as an experienced developer, is hard _not_ to like (at time of writing!).

The short version of what I want to say is: vibe coding seems to live very squarely in the land of prototypes and toys. Promoting software that's been built entirely using this method would be akin to sending a hacked weekend prototype to production and expecting it to be stable.

<!-- more -->

## Robocop

Perhaps because I watched it when I was way too young to, but the original (1987) Robocop always pops into my mind when I think about unvetted coded going into a production level environment. Specifically Ed 209 being the prototype with the odd "glitch" (if you want an idea, here's a [NSFW clip, heavy on the squibs](https://www.youtube.com/watch?v=TYsulVXpgYg)).

Robocop however was the version of the machine that had a human at the core to consider the protocols and determine the outcomes.

![Ed 209 with the words "Vibe Coding" above it, and Robocop with "Human Experience" above it](/images/robocop.jpg)

Without Ed 209, there would be no Robocop, and in the world of Robocop, Robocop is (apparently) a good thing for society (which, going by Robocop 3, has rather gone to shit).

That's to say, in an analogy that I've rather stretched: prototypes entirely belong as part of the process.

## Vibe coding for toys

If you're following AI it's likely you're following Simon Willison's work. He talks about using [vibe coding for creating tools and toys](https://simonwillison.net/tags/vibe-coding/) (note this was linked July 2025).

I've used it myself to solve really bespoke problems where the user count is one. Most recently a tool I'd written years ago to manage our tax accounts and calculated all the VAT from Stripe stopped working (because I didn't maintain it and eventually all the libraries stopped working).

I turned to Claude Code and was able to create an extremely simple, but effective, single page app that would group the Stripe data (as we needed) and gave us the income and VAT that needed to be paid for the quarter. Then, again using Claude, I wrapped it up in [Tauri](https://tauri.app/) so it could like on mine and Julie's computer (and _not_ on the web) and it does the work. It took around 1-2 hour of gently giving direction to Claude Code and cost me around $5 of API tokens.

I can also tell you that this tool that was generated doesn't have tests. It's not accessible. It's not semantic, and it's certainly not written to the standard that I set for myself. However, that wasn't the aim, the aim was to get something working.

Would I put this out to production: absolutely not.

Though, perhaps I'm just a snowflake, because VCs are happy to throw money at anything that's popular in the moment. [Lovable, that has a $1.8B valuation](https://www.forbes.com/sites/iainmartin/2025/07/17/ai-vibe-coder-lovable-is-swedens-latest-unicorn/) does exactly this: chat prompt => product for it's users. But then, VC culture has always been a weird thing to me.

## Consideration

The problems I still don't have answers (even just for myself) to square away the rampant theft of content and the unprecedented energy consumption (along with data centers being built that take [priority over who gets the water](https://www.bbc.co.uk/news/articles/cy8gy7lv448o)).

My concerns also sit with those people starting development careers. It's partly: if vibe, or AI assisted coding is all you learn, what happens when that generation of developers mature? This _feels_ like something that might resolve itself (I'd love to see some research on this though), but moreover, money is required for vibe coding.

The costs of this kind of development cycle isn't really visible (yet). When you consider that junior developers or students won't have a lot of floating/free cash (if any), though I appreciate it's "only" cost me $5 to make the Stripe VAT tool, I've also spent quite a bit more on subscriptions and API costs before I got to that point.

I've got more to explore here, but I needed to get the Ed 209 vs. Robocop off my chest (albeit and excuse to actually use the analogy). Now, if you've not, go watch Robocop, it's peak late-80s over the top action (and probably violence, but in a way that makes you go - ew - see the "I'm _melting_" scene!).

