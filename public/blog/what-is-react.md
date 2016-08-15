# What is React

Firstly, spoiler: I don't know. This post is simply framing my question fully that I [posted on twitter](https://twitter.com/rem/status/765104131459743744).

> What is React? What is React to building web sites in 10 years? Why is it important? Why will similar techniques emerge?

Let me explain.

<!--more-->

I don't use React. I don't really gravitate towards larger frameworks, only because my daily work doesn't require it, and I'm personally more interested in the lower level techniques and parts of the web and JavaScript. I also work either on my own, or in very small teams where existing frameworks (or what have-you) aren't already in place.

Why am I asking what React is, if I don't really buy into these frameworks (I'm lumping Angular, Polymer and the likes into "frameworks")?

I had a short conversation with [Jim Purbrick](https://twitter.com/JimPurbrick), a fellow Brightonian asking what the sessions at [ffconf](https://ffconf.org) were going to be on. He also works for Facebook so naturally (to me), React, TypeScript and [Flowtype](https://flowtype.org/docs/react.html) came up, and why they weren't included (in his defence, I don't believe he even said this, but it's a question I hear in my head all the time).

My reply is usually the same: React.js, Ember and so on, they're all a blip in the history of the web. They won't be here in 10 years. Something else will be. I'm not too interested on these talks because they're tied to a point in time, and I'm interested in what lasts. In my head, it's akin to fashion vs style.

A pretty harsh view, to be fair, but I'm just being honest, and it's what I feel in my gut.

What I didn't expect was Jim's response, which was completely reasonable: but these *techniques* are important, and that's why they're starting to re-emerge in libraries and frameworks.

The virtual DOM really interests me, but that's because it's a hack to get around the question of "what's changed" and "how can I optimise this change". But it is a hack, so I'd like to think in 10 years, this is part of DOM level X. Perhaps this is more important than I realise. Replies on twitter suggest that React is like jQuery in some ways, in adoption and ease of use. Perhaps React's legacy will be a standardised virtual DOM and DOM diffing.

But what is React? Is it data binding? Is that solved with the `data-*` attributes (no, I don't think so)? Is React removing the need for coded HTML, and generating the UI with pre-bound JavaScript objects?

Maybe it's state control which is so lacking in JavaScript. I've seen the time travel debugging tools that React developers have made and its amazing. Sign me up, I want that.

But do these developer tools exist because the mentality of React development is completely different to my own? My own approach of: build HTML, enhance with JavaScript where it makes sense and control as much of the UI with smart use of CSS.

Is React reactive programming? Is this being standardised. Is it harder to wrap our head around than "regular" DOM scripting? I'm thinking in particular, about the beginners coming to the industry with the aim of copy/paste/live approach.

---

Am I trolling the React developers? No. This is a real question to help me get to the heart of something I believe I'm missing.

Components. Speed. Optimisations. Ecosystem. None of these are unique to React.

System design. State management. Reactive streams. I *think* there's something special, and important here.

What I want to know is: what should I be taking away from React into my own continued evolution as a web developer?
