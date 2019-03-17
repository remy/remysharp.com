---
title: Tiny two way data binding
date: '2015-06-02 11:42:26'
tags:
  - code
published: true
modified: '2015-06-02 15:35:10'
---
# Tiny two way data binding

Data binding to the DOM is just one of those things that's damn handy when you've got it and super laborious when you don't. The problem is that it usually comes at a price of a hefty framework (hefty can apply to byte-size, but more often: the learning curve to use said framework).

So, as any good re-inventer of wheels, I wrote my own two-way data binding library, partly to experiment, partly to solve existing needs in my own projects - weighing in at < 2K compressed.

I present (cleverly named): **[bind.js](https://github.com/remy/bind.js)**

<!--more-->

## Demo time

Below is an [interactive demo](http://rem.jsbin.com/nepuda/edit?console,output) of bind in action. As you change the state of the form, you'll see the object update on the right (a `JSON.stringify` output).

<a class="jsbin-embed" href="https://rem.jsbin.com/nepuda/embed?console,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.js"></script>

## Example usage

The concept behind the API is fairly simple: take an object bind it to functions and/selectors given a particular mapping.

[For example](https://jsbin.com/remutu/edit?js,console,output), to bind a score and player name to the DOM:

```js
var user = Bind({
  name: '[new user]',
  game: { score: 0 }
}, {
  'game.score': 'span.score',
  name: 'input[name="username"]'
})

// in the game
user.game.score += 25;
```

...and the HTML updates take care of themselves. Then the user enters their name in the input field, it'll update the `user` object.

The mapping value is flexible too, and can be:

* A string representing a selector
* A function which receives the new value
* An object that supports any of the following properties: `dom`, `callback` and `transform`

With an object as the value of the mapping, it allows you to do a transform on your data before it lands in the DOM. This is obviously useful for things like updating [list elements](https://jsbin.com/nemubo/1/edit?js,output):

```js
var data = Bind({
  cats: ['nap', 'sam', 'prince']
}, {
  cats: {
    dom: '#cats',
    transform: function (value) {
      return '<li>I had a cat called <em>' + this.safe(value) + '</em></li>';
    }
  },
  'cats.0': {
    dom: '#first-cat',
    transform: function (value) {
      return 'My first cat was ' + this.safe(value);
    }
  }
});
```

Inside the `transform` function also has a helper, `this.safe()` which will escape your content safe for HTML.

## Object.observe?

Nope. I'm not using it, which is also why there's some limitations (property deletion being the main/only one).

Why not? Mostly for a larger platform of support. This library supports IE9 upwards (and thus all other browsers) and includes feature detection.

I also tried an `Object.observe` polyfill early on, but didn't have much success (though I don't recall what the issues were). I also fancies the code challenge :)

## HTML decorators?

Nope (again). I was recently debugging some Knockout code, and found myself struggling as I realised that the actual binding was happening in the HTML, and the manipulation was happening in the separate JavaScript file.

So no, there's no `data-*` support, intentionally. All the code lives in one place: in the JavaScript.

I personally like that my data binding is all in one place. If you're not so keen, there's always Angular, Knockout and the like.

## Nice to haves

I've started opening a few [issues](https://github.com/remy/bind/issues) on things I'd like, but they currently include:

- Root object mapping support (i.e. to be able to hook a callback on *anything* changing)
- Glob support, i.e. `me.*.name` will fire callbacks matching any path starting with `me` and ending with `name`
- Test to test every individual form element (currently it's a bit of a mishmash)

Feel free to [raise an issue](https://github.com/remy/bind/issues) or feature request or let me know if you'd use this even!
