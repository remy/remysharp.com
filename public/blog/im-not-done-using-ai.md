---
title: "I'm not done using AI"
date: '2026-08-13'
tags:
  - web
---

# I'm not done using AI

I recently read this post [I'm done using AI](https://brettcodes.com/im-done-using-ai/) (which is primarily around coding but also for general chat).

Along with this post, I've read _many_ other posts over the last two months (I have a new RSS reader) that swing on either side: why they're quitting, why they love it. Thankfully I've managed to miss the "I want to shove AI down your throat" posts.

What's interesting (to me) about Brett's post is that their introduction experience of LLMs was very close to my own, but the outcome for me is quite different, and I think I know why.

<!-- more -->

## An note on "AI"

> You should all be using AI for your work

And,

> AI is bad

- are, in my opinion, both incredibly reductive and also completely void of any actual content. "AI", certainly from what I've learnt, doesn't have any useful meaning. It's shorthand for technology, and the era we're currently in.

I _think_ it's also shorthand for the Big Tech companies.

But shorthand only serves to confuse things. A lot of the time in conversations I've had over the last 5 years, AI has been meant as shorthand for LLMs by Big Tech companies. Not the projects from developers using tools like TensorFlow for image recognition and categorisation (for instance).

But saying "you should all use AI for work" or "AI is bad" does happen to sweep everything under this banner.

That's to say: I'm not a fan, nor am I fan of casually using AI, when I mean specific sector of AI. Similarly I don't like saying I'm in IT, or "work in computers". It's reductive, but I do understand why we have shorthand.

## Introductions and tensions

Around 2023 I was being introduced to LLMs, primarily through VS Code's Copilot product which was desperate to autocomplete for me.

I remember running a workshop back in 2017, and being asked during the practical sessions why I didn't use auto suggest - and it was simple: I found it distracting.

Copilot in 2023 was the same as this, but dialled up to 11. My fingers wer doing the work my brain had already calculated, so for the logic to be pushed into the code editor for me was a huge distraction and usually derailed my process entirely.

During that time I had Copilot disabled and only turned to LLMs, ChatGPT in a separate window provided by the client I was working for, to solve annoying TypeScript complaints about incompatible types or some other cryptic error. Suffice to say, [it didn't go well](https://remysharp.com/2024/02/23/why-my-code-isnt-in-typescript).

I personally found LLM generated code just wasn't ready, either for problem solving (since I tend to live in the edge case problems) and certainly not for production.

---

There's also the constant background noise of wannabe messiah-complex bros announcing to the world that their LLM models were so advance they were going to, or already had, created _real_ artificial intelligence (ignore that none of them can define intelligence).

Obviously the unspoken message there is: "buy our AI business model".

---

Finally, I had been doing constant reading around the technology itself, and the real world impact. Karen Hao's [Empire of AI](https://remysharp.com/books/2025/empire-of-ai-dreams-and-nightmares-in-sam-altmans-openai) was an absolutely superb book for getting a deeper understanding.

The ethics, for me, really boil down to two aspect:

- Data centre consumption of water and related power and land demands
- The "stealing" of content

I want to address the "stealing" point now though. This is a complicated point, because it's not particularly stolen in the general sense of the word. The issue, as we all know, is that companies like OpenAI ingested Common Crawl (which contained most/a lot of the public web) into their models.

We bloggers were rightly pissed off because we don't publish our content to help line the pockets of the already mega-rich, and we didn't even get the slightest thanks.

The problem is that it was just a social contract. We publish content for the [greater good](https://youtu.be/yUpbOliTHJY?si=FvzVDt4wnIimcmUo&t=7), and though it's always been technically possible, there was this expectation, or understanding, or maybe we just didn't think it feasible, that all our words would be slurped up for capital at such a massive scale.

The theft part has been and done, and there's nothing that can undo it. The energy usage is… at odds with LLM usage, for certainly quite a few of us.

As a poor comparison, on the back of (virtual) napkin: a return flight from London to Amsterdam (~136kg CO2 equivalent) would be worth around sixteen months of heavy LLM usage for one person. So the decision _not_ to use LLMs is similar to not flying, it's not going to make much impact. It requires A LOT (like, entire percentages of the globe) to stop to make an impact. Similarly with green initiatives are nice from individuals, but really _need_ to be made by the big organisations.

Still, it's a tension and more of a matter of ethics, and one that I've personally haven't been able to squared away.

## What to do with three months without a contract work

From September 2025 I didn't have a contract, and because I needed to focus on the conference and my family for holidays, I decided that instead of coding I would try out LLMs In earnest, and I found that I could create lots of little tools that I use all the time.

At the start of 2026 I returned with a client contract and the project was now all TypeScript and because of my experience with LLMs I was much more comfortable using AI to generate code. But at the same time, since 2023, and as we're seeing in lots of blog posts, the capability of tools like Claude in particular have massively improved where they're very capable of doing the work so long as you describe the work properly.

For me personally, what I've loved about technology is that I can make something without having to invest in a lot of external products in the first place. So with woodwork you need tools and you need materials. With code I just needed a place to be able to run it and the browser was always that place so I was able to express myself freely but I was never hell-bent on the language or the fact that it was software that I'd written quite happily include a JavaScript library that was written by someone else if it could save me from having to write it myself.

Now obviously there's some fun in learning how to do a thing and learning how to solve a particular problem. But for me, the majority of the time I'm just trying to solve the problem and I don't really care how I get there. Again, this is for my personal projects.

And what I learned from doing quite a large-ish LLM-based project in the Marble Square game that I developed was that it's my ability to communicate technically and to be able to preempt problems and describe describe how to approach the work in a human language, something that I have been doing since the late 90s as a piece of work where I as the technical person had to speak to the business side and I needed to translate their requirements into code and explain what was possible and what was not, where the compromises were being made.

So that was always going to be a communications job rather than writing the code. The code I do in my head and I can tell you what's possible but today it's all possible it always has been possible it's just that I can get something else to write it for me and I'm okay with that.

Now one of the big differences between Brett's post and my experience is that I don't have tickets that I'm then feeding straight into an LLM. A lot of the time the tickets that we generate are discussions between me and a manager and us kind of working out what the requirements are between us.

So I've already formed an idea of how it would be solved in the code already. So getting the LM to actually generate that code is neither here nor. I do feel like it lets me get through tickets a little bit faster but no one's contesting the fact that you can generate code faster.