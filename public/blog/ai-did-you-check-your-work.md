---
title: 'AI: did you check your work?'
date: '2025-05-31'
tags:
  - web
---

# AI: did you check your work?

There's no denying that the web industry, as with many others, has AI and LLMs as a ubiquitous presence. There's all kinds of different uses for LLMs, and comes with all the ethical concerns - ignored or perhaps at the heart of your use.

More recently "vibe coding" has me…wary.

<!-- more -->

Very recently I had a fairly simple, but dull task where I had to extract the number of lessons from a log (which read "23 lessons" etc) and add them up.

This on the surface would seem like a perfect match for an LLM. Give it the log, describe the problem and the bot spits out a single number. 

I threw this into chatgpt and it confidently (as always) gave me a number. 

A number, that just didn't feel right at all. I already had a sense of where the result should be, and chatgpt gave me a number that was way too low.

Intrigued, I decided to repeat the exact same request to a number of other models, including: Gemini, Claude, multiple OpenAI models, and a couple of offline models.

All, except one got the wrong answer, each having wildly different values. They weren't just a bit off, they were simply wrong. Then the problem with _one_ being right, unless you know the answer ahead of time, how do you tell?

![Multiple LLMs showing different answers to the same question](/images/ai-counting.jpg)

The actual answer took me a few minutes to code up and I trust my skills for a particularly simple task. But I didn't start by coding it myself because it took less than 30 seconds to describe the problem in written English, and I *thought* these are the kinds of tasks perfectly suited to LLMs.

Perhaps if I had asked the LLM to write me a script, it would have had a better outcome, but they would require me then saving and running the script myself, which, sort of defeated the point of throwing the problem to the LLM.

## Why does this concern me?

The simplicity of the task is one that, ideally, wouldn't require the kind rigour you might consider if the LLM were writing code for your code base. 

Compound this with the simple fact that both LLMs are not deterministic (ie. if I host a local LLM it's not going to give me the same answer, or rather it won't use the same pathway), and if you're using a remote/online LLM the models update under your feet.

I'm sure this is because I'm not "controlling" the LLM in the best possible way. I recently read Simon Wilison explaining that with 2 years of deep experience with LLMs the power user skill is about controlling the context the LLM has to guide it to the best outcome. 

But most users aren't power users.

I don't doubt that this will change both for the positive and negative over time. 

Is this just a hallucination? Do we seriously believe that developers will continuously check for hallucinations? I don't. 

The web development industry moved from copying snippets of code to solve problems to installing npm modules for the answer. That's to say, due diligence has reduced over time in favour of DX.

Are developers going to validate everything that comes out of their LLM, particularly as vibe coding (however interpreted) becomes popular?

I worry we won't. I worry that asking for more rigour is too tall of an ask.
