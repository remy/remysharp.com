# A reminder to test

I recently bought myself a [LaMetric](http://lametric.com/) smart clock (whatever that means), and given that Christmas is nearing, it didn't take much work to create a Christmas countdown for the clock.

Except, of course, I didn't write tests and of course it was wrong.

<!--more-->

## Lesson 1: always test

I pushed the app out and happily viewed the number of days to Christmas, impressing my kids with my genius. Then Julie, my partners, asked me: _is there really "39 days" to Christmas?_

So I asked Google. Who replied saying there were 40 days. So I asked [Alexa](https://twitter.com/rem/status/795259044395106305) and she said it was 40 days too. Perhaps there was a bug in my code…

Without tests though, I had no idea who was right (but lets face it, it was me). My [code](https://github.com/remy/days-to-christmas) included a "simple" date diff (using [moment.js](http://momentjs.com/)):

```js
const xmas = moment([new Date().getYear() + 1900, 11, 25]);
const days = xmas.diff(moment(), 'days'); // looks legit…
```

Except there's a bug. Any time calculation in computing is doomed (I should have [remembered](https://www.youtube.com/watch?v=-5wpm-gesOY)). The particular bug here is that it's counting the *whole* number of days between the **time now** and Christmas at midnight.

Unless _now_ happens to be midnight, the result of the code above will always be a fraction of a day out. I should have been comparing _midnight_ today to Christmas at midnight. In moment, it looks like this:

```js
const days = xmas.diff(moment().startOf('day'), 'days'); // 👍
```

Better. But even though it's fixed, there's still no tests there…

## Lesson 2: there's always a bare minimum

If I'm working on an application that has a single purpose, like showing the number of days to Christmas, it's screaming to have _at least_ one test that confirms that figure is right.

To be honest, most applications have a single highest function. Take JS Bin for instance, with all it's functionality, if there's only one thing that is tested, it has to be the most important feature: the ability to save. Otherwise _everything_ else is second place.

So this is a lesson to me, but please also heed my warning: test the bare minimum!

Here's my [test strategy](https://remysharp.com/2015/12/14/my-node-test-strategy) from earlier this year if you're interested in the _how_.

## Lesson 3: testing can lead the way to important questions

Okay, so, we now know that I should have tested up front. But now that I have my first test in place, it prompts me to think more critically about my software and the conditions it runs in.

Typically (for me), when I write unit tests, I'll include expected values and erroneous values (like what happens if the date is Christmas day, or the day after). In doing so, it prompts me to think about different environments the software runs in, and whether there's factors I haven't considered.

Tests allow me to emulate those factors (in some cases). I saw a tweet with my Christmas countdown app in it's glory being used by someone in Switzerland:

[![Testing my new gadget](/images/testing-my-new-gadget.jpg)](https://twitter.com/reneelechner/status/800380670782701568)

…which immediately leads me to ask the question: what time zone is my code running in?

The LaMetric device will make an API call to my [countdown service](https://days-to-xmas.isthe.link/) but the service has no idea what country the user is in. I'm using a machine that has the system clock set to UTC, which happens to be fine for me, and likely most European countries won't notice, but if anyone from San Francisco uses my clock, at [4pm on Christmas Eve](http://everytimezone.com/#2016-12-24,720,cn3), they'll see the clock change to say "0 days!" and they'll see Santa instead of the flashing tree.

The lesson: always include, at least, a test.

The secondary lesson: never work with animals, children or *time*!
