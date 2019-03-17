---
title: Living Standard - part 2
date: '2016-10-10 16:12:07'
modified: '2016-10-10 17:56:58'
complete: false
inprogress: true
tags:
  - web
draft: true
---
# Living Standard - part 2: what we can do today

**Today: what we can do, how can we do it, socially and with our work: "How can we keep the web a welcome and open place?"**

- Be open
- Be open to others
- Listen. Men aren't good at this. There's some really great resources on learning about yourselves out there. Bottom line: listen, don't offer opinion or response.

**This advice is optional, and is a lot easier when you're a position of privileged like me, but:**

- Use your access to raise the voice of others
- Share what you learn: there's always someone that can learn from your experience
- Blog, speak, evangelise
- Follow people on twitter that you might not normally follow. I found through Twitter analytics that I had (approximately) 9% followers were women. This made me sad. I realised I also didn't follow a lot of women myself. So I changed this. Over time, that number has increased to 15%. (worthwhile???)
- Learn about the use of language, tutorials with "just", "simple", "easy" don't always convey the right sentiment that really, as the author, I want you (the reader) to not be afraid and trust me as I guide you. Try dropping the words entirely
- Make the web a welcoming place.

## How do we make the web welcoming?

Keep it simple.

One source of complexity are build tools. I feelings on this are mixed. On one hand, I realise that they're an important part of a deployment system.

Myself, as a developer, I'm attracted to problem solving, to detail and the enjoyment I get out of solving a problem with the perfect most optimised answer. That's fine, but it's also *sometimes* a distraction. Sometimes, it's procrastination! The thing is, that build process, if it's assumed knowledge, then you lose participation.

A few examples. Nearly every single Python project I encounter on Github (and honestly, it's not many as I'm more often in JavaScript-land), none of them explain how to get the prerequisites on your machine. Because of this, I often go searching for an alternative or abandoning my intention entirely.

I've seen this myself, and heard it from peers a great deal of times: Spelunking into a module’s source due to bad docs, only to discover CoffeeScript

<video muted autoplay loop src="https://player.vimeo.com/external/186292630.sd.mp4?s=42ed7e4728c514857d4b9750101e352342172f1f&profile_id=164">



However, support for technology like ES6 has come a long way in a relatively short amount of time. Most browsers (though perhaps not Safari — at time of writing) are rolling out nightly builds that give us access to new standards and even experiments.

As the state of native support is so good, I try to experiment and prototype with the latest technology and without polyfills and processors.

If I'm blogging, I try to think: can this code be copied and pasted?

I'm constantly (trying to) think about the user who won't really all the words, but look for code that they can try out and interact with.

It's equally because of this, that my product JS Bin differs from CodePen and JSFiddle in that the full source code is shown the user. That way they can see *everything* that's required to run the code. So when they inevitably copy and paste the content, it does work.

---

## State of technology today

A polyfill is a piece of code that can fill in a browser hole whilst you wait for the native API to catch up. Polyfills should not live forever. They should expire. In using them, they should be reviewed and removed as support amongst your users increase. This is where as service like polyfills.io comes in useful, since it will polyfill on demand, rather be included for all your users.

Looking retrospectively, it's useful to see what I *used to* polyfill and where I no longer use them. Bear in mind, the term polyfill came along at height of HTML5.

- Web Storage - no polyfill
- etc - SEE STATE OF THE GAP

---

- Language. When helping via blog posts, articles and tweets, we're writing content for other humans. It's useful to remember that they probably don't have the same knowledge as you.


## Structured learning helps

- How to put together an HTML page
- What HTML, CSS and JavaScript is for, i.e. CSS isn't for application state, `div`s aren't for buttons, and JavaScript isn't for content. Of course, you can enhance…
- Progressive Enhancement. It seems like it's some kind of dark art that has been forgotten in time. Arguing that "sites don't have to work without JavaScript" is poppycock. Arguing that your users only use an iPhone only says that you're not interested in having more users (and thus more money for the business).t
