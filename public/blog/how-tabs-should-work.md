# How tabs should work (updated)

Tabs in browsers (not *browser tabs*) are one of the oldest custom UI elements in a browser that I can think of. They've been done to death. But, sadly, the majority of times I come across them, the tabs have been badly, or rather *partially* implemented.

So this post is my definition of how a tabbing system should work, and *one* approach of implementing that.

<small>*This post was originally published on [24 Ways 2015](https://24ways.org/2015/how-tabs-should-work/) (nearly a year ago!), but I've updated the [accessibility section](#accessibility) with feedback and collaboration from [Léonie Watson](https://twitter.com/LeonieWatson).*</small>

## But...tabs are easy, right?

I've been writing code for tabbing systems in JavaScript for coming up on a decade...and at one point I was pretty proud of how small I could make the JavaScript for the tabbing system:

```js
var tabs = $('.tab').click(function () {
  tabs.hide().filter(this.hash).show();
}).map(function () {
  return $(this.hash)[0];
});

$('.tab:first').click();
```

[Simple, right](http://jsbin.com/metoya/edit?js,output)? Nearly fits in a tweet (ignoring the whole jQuery library...). Still, it's riddled with problems that make it a far from perfect solution.

## Requirements: what makes the perfect tab?

1. All content is navigable available without JavaScript (crawler compatible and lo-js compatible).
- ARIA roles.
- The *tabs* are anchor links that are:
  - Clickable.
  - Have block layout.
  - Have their `href` pointing to the `id` of the panel element.
  - Uses correct cursor (ie. `cursor: pointer`).
- Since tabs are clickable, the user can *open in a new tab/window* and the page correctly loads with the right tab open.
- Right clicking (and shift-clicking) *doesn't* cause the tab to be selected.
- Browser native back/forward button correctly changes the state of the selected tab (think about it working exactly as if there was no JavaScript in place).

The first three points are all to do with semantics of the markup and how the markup has been styled. I think it's easy to do a good job by thinking of tabs as links, and not as some part of an application. Links are navigable, and they should work the same way other links on the page work.

The last three points are JavaScript problems. Let's investigate that.

## The shitmus test

Like a litmus test, here's a couple of quick ways you can tell if a tabbing systems is poorly implemented:

- Change tab, then use the back button (or keyboard shortcut) and it breaks
- The tab isn't a link, so I can't open it in a new tab

These two basic things are, to me, the bear minimum that a tabbing system should have.

## Why is this important?

The people who push their "native" apps on users can't have more reasons why the web sucks. If something as basic as a tab doesn't work, obviously there's more ammo to push a closed native app or platform on your users.

If you're going to be a web developer, one of your responsibilities is to maintain established interactivity paradigms. This doesn't mean "don't innovate". But it *does* mean: stop fucking up my scrolling experience with your poorly executed scroll effects. `</rant>` *:breath:*

## URI fragment, absolute URL or query string?

A URI fragment (aka the # hash bit) would be using mysite.com/config#content to show the *content* panel. A fully addressable URL would be mysite.com/config/content. Using a query string (by way of "filtering" the page): mysite.com/config?tab=content.

This decision really depends on the context of your tabbing system. For something like Github's tabs to [view a pull request](https://github.com/remy/remysharp.com/pull/6) makes sense that the full URL changes.

For our problem though, I want to solve the problem where the page doesn't do a full URL update, i.e. your regular run of the mill tabbing system.

I used to be from the school of using the hash to show the right tab, but I've recently been exploring whether the query string can be used. The biggest reason is that multiple hashes doesn't work, and comma separated hash fragments doesn't make any sense to control multiple tabs (since it doesn't actually link to anything).

For this article, I'll keep focused on using a single tabbing system and a hash on the URL to control the tabs.

## Markup

I'm going to assume sub-content, so my markup would look like this (yes, this is a cat demo...):

```html
<ul class="tabs">
  <li><a class="tab" href="#dizzy">Dizzy</a></li>
  <li><a class="tab" href="#ninja">Ninja</a></li>
  <li><a class="tab" href="#missy">Missy</a></li>
</ul>

<div id="dizzy">
  <!-- panel content -->
</div>
<div id="ninja">
  <!-- panel content -->
</div>
<div id="missy">
  <!-- panel content -->
</div>
```

The important note in the markup is that the link used for the individual tab references it's panel content using the hash, pointing to the `id` on the panel. This will allow our content to connect up without JavaScript and give us a bunch of features for free which we'll see once we're on to writing the code.

## URL driven tabbing systems

Instead of making the code responsive to the user's *input*, we're going to exclusively use the browser URL and the `hashchange` event on the `window` to drive this tabbing system. This way we get the back button support for free.

So with that in mind, let's start building up our code. I'll assume we have the jQuery library, but I've also provided the full code working without a library, vanilla if you will, but it depends on relatively new (polyfill'able) tech like `classList` and `dataset` (which generally has IE10 and all other browser support).

*Note that I'll start with the simplest solution, and I'll re-factor the code as I go along, in places like where I keep calling jQuery selectors.*

```js
function show(id) {
  // remove the selected class from the tabs,
  // and add it back to the one the user selected
  $('.tab').removeClass('selected').filter(function () {
    return (this.hash === id);
  }).addClass('selected');

  // now hide all the panels, then filter to
  // the one we're interested in, and show it
  $('.panel').hide().filter(id).show();
}

$(window).on('hashchange', function () {
  show(location.hash);
});

// initialise by showing the first panel
show('#dizzy');
```

This works pretty well for such little code: http://output.jsbin.com/rimone/. Notice that we don't have any click handlers for the user, and the back button works right out the box.

However, there's a number of problems we need to fix:

1. The initialised tab is hard coded to the first panel, rather than what's on the URL.
2. If there's no hash on the URL, all the panels are hidden (and thus breaks).
3. If you scroll to the bottom of the example, you'll find a "top" link, clicking that will break our tabbing system.
4. I've purposely made the page long, so that when you click on a tab, you'll see the page scrolls to the top of the tab, not a huge deal, but a bit annoying.

Though, from our criteria at the start of this post, we've already solved item (4) and (5). Not a terrible start. Let's solve items 1 through 3 next.

### Using the URL to initialise correctly & protecting from breakage

Instead of arbitrarily picking the first panel from our collection, the code should read the current `location.hash` and use that if it's available.

The problem is: what if the hash on the URL isn't actually for a tab?

The solution here is that we need to cache a list of known panel ids. In fact, well written DOM scripting won't continuously search the DOM for nodes. i.e. when the `show` function kept calling `$('.tab').each(...)` it was wasteful. The result of `$('.tab')` should be cached.

So now the code will collect all the tabs, then find the related panels *from* those tabs, and we'll use that list to double the values we give the `show` function (during initialisation for instance).

```js
// collect all the tabs
var tabs = $('.tab');

// get an array of the panel ids (from the anchor hash)
var targets = tabs.map(function () {
  return this.hash;
}).get();

// use those ids to get a jQuery collection of panels
var panels = $(targets.join(','));

function show(id) {
  // if no value was given, let's take the first panel
  if (!id) {
    id = targets[0];
  }
  // remove the selected class from the tabs,
  // and add it back to the one the user selected
  tabs.removeClass('selected').filter(function () {
    return (this.hash === id);
  }).addClass('selected');

  // now hide all the panels, then filter to
  // the one we're interested in, and show it
  panels.hide().filter(id).show();
}

$(window).on('hashchange', function () {
  var hash = location.hash;
  if (targets.indexOf(hash) !== -1) {
    show(hash);
  }
});

// initialise
show(targets.indexOf(location.hash) !== -1 ? location.hash : '');
```

The core of working out what tab to initialise with is solved in that last line: is there a `location.hash`, is it in our list of valid target (panels)? If so, select that tab.

The second breakage that we saw in the original demo is that clicking the "top" link, would break our tabs, this was because the `hashchange` event fired and the code didn't validate the hash that was passed. Now this happens, the panels don't break.

So far we've got a tabbing system that:

- Works without JavaScript.
- Supports right click and shift click (and doesn't select in these cases).
- Loads the right panel if you start with a hash.
- Browser native navigation works.
- Keyboard support works.

The only annoying problem we have now, is the page jumps when a tab is selected. That's because the browser is following the default behaviour of an internal link on the page. To solve this, things are going to get a little hairy, but it's all for a good cause.

### Removing the jumping to tab

You'd be forgiven for thinking you just need to hook a click handler and `return false`. It's what I started with. Only that's not the solution. If we add the click handler, it breaks all the right click and shift click support.

There may be another way to solve this, but this is the way *I* found, and it works. It's just a bit...hairy, as I said.

We're going to strip the `id` attribute off the target panel when the user tries to navigate to it, and then put it back on once the `show` code starts to run. This change will mean the browser has no where to navigate to for that moment, and won't jump the page.

The change involves the following:

1. Add a click handle that removes the `id` from the target panel, and cache this in a `target` variable that we'll use later in `hashchange` (see point 4).
2. In the same click handler, set the `location.hash` to the current link's hash - this is important because it forces a `hashchange` event regardless of whether the URL actually changed which prevents the tabs breaking (try it yourself by removing this line).
3. For each panel, put a backup copy of the `id` attribute in a `data` property (I've called it `old-id`).
4. When the `hashchange` event fires, if we have a `target` value, let's put the `id` *back* on the panel.

These changes result in this final code:

```js
/*global $*/

// a temp value to cache *what* we're about to show
var target = null;

// collect all the tabs
var tabs = $('.tab').on('click', function () {
  target = $(this.hash).removeAttr('id');

  // if the URL isn't going to change, then hashchange
  // event doesn't fire, so we trigger the update manually
  if (location.hash === this.hash) {
    // but this has to happen after the DOM update has
    // completed, so we wrap it in a setTimeout 0
    setTimeout(update, 0);
  }
});

// get an array of the panel ids (from the anchor hash)
var targets = tabs.map(function () {
  return this.hash;
}).get();

// use those ids to get a jQuery collection of panels
var panels = $(targets.join(',')).each(function () {
  // keep a copy of what the original el.id was
  $(this).data('old-id', this.id);
});

function update() {
  if (target) {
    target.attr('id', target.data('old-id'));
    target = null;
  }

  var hash = window.location.hash;
  if (targets.indexOf(hash) !== -1) {
    show(hash);
  }
}

function show(id) {
  // if no value was given, let's take the first panel
  if (!id) {
    id = targets[0];
  }
  // remove the selected class from the tabs,
  // and add it back to the one the user selected
  tabs.removeClass('selected').filter(function () {
    return (this.hash === id);
  }).addClass('selected');

  // now hide all the panels, then filter to
  // the one we're interested in, and show it
  panels.hide().filter(id).show();
}

$(window).on('hashchange', update);

// initialise
if (targets.indexOf(window.location.hash) !== -1) {
  update();
} else {
  show();
}
```

This version, http://output.jsbin.com/xilula/ now has all the criteria I listed in my original criteria, *except* for the aria roles and accessibility. Getting this support is actually very cheap to add.

### Accessibility

This article on [ARIA tabs](http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml) made it very easy to get the tabbing system working as I wanted.

The tasks were simple:

1. Add `aria-role` set to `tab` for the tabs, and `tabpanel` for the panels.
2. Set `aria-controls` on the tabs to point to their related panel (by id).
3. I use JavaScript to add `tabindex=0` to all the tab elements.
4. When I add the `selected` class to the tab, I also set `aria-selected` to `true` and inversely, when I remove the `selected` class, I set `aria-selected` to `false`.
5. When I hide the panels, I add `aria-hidden=true` and when I show the specific panel, I set `aria-hidden=false`.

And that's it. Very small changes to get full sign off that the tabbing system is bullet proof and accessible.

The final version is here: http://output.jsbin.com/lorovu/ (and non-jQuery version as promised: http://jsbin.com/sehuxo/edit?js,output).

What my version is missing in particular is the keyboard cursor support. The visitor should be able to cycle through the tabs using the cursor keys. In theory, this would also cause the browser history to be appended to as the journey changes.

What I'd like to see is a library that can be dropped into our code that automagically gives keyboard support (that perhaps triggers clicks). But I tried it myself and already got into a rabbit hole because the DOM structure was specific to my application *and* the way I handled user clicks was specific (compounded by whether you use a library to handle clicks and so on). So…no quick fix, but all certainly doable.

## In conclusion

There's a *lot* of tab implementations out there, but there's an equal amount that break the browsing paradigm and the simple link-ability of content. Clearly there's a special hell for those tab systems that don't even use links, but I think it's clear that even in something that's relatively simple, it's the small details that make or break the user experience.

Obviously there's corners that I've not explored, like when there's more than one set of tabs on a page, and equally whether you should deliver the initial markup with the correct tab selected. I think the answer lies in using query strings in combination with hashes on the URL, but maybe that's for another year!
