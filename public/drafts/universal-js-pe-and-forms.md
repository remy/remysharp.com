# Universal JS, PE and forms

I've been working on a number projects that make use of React through [Next.js](https://github.com/zeit/next.js) which affords me server side rendering without having to write any (additional) code.

With that, I've been trying to consider if there's any edge cases that might be missed whilst my brain starts to switch of thinking about server side support and progressive enhancement.

## Some background

With Next.js, I'm able to write a Todo app (because, heck, Twitter Hello World apps are sooo 2010!) with a single code base and it'll render correctly off the server. i.e. my litmus test is: can I curl the URL and see the content? With Next.js, the answer is yes (in nearly all the cases).

Okay, so that means my entire application works without JavaScript, right? Sort of.

Certainly if JavaScript [fails to load](https://kryogenix.org/code/browser/everyonehasjs.html) then the Todo app renders the list of todos, and it will render individual items, and so on.

Next.js allows me to then upgrade the UI via React components and their lifecycle (mounting, prop and state change and so on).

But what about POSTing to end points. Should forms work without JavaScript? To be clear: progressive enhancement does not equal "works without JavaScript".

The reason POSTs might be a problem is that

