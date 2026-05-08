---
date: 2026-05-08
tags:
  - web
title: A popover backdrop anti-pattern
ad: false
---
# A popover backdrop anti-pattern

After attending recent conferences and learning that I can swap out buckets of JavaScript for the HTML native `popover` property, I've been using it liberally throughout my own projects.

For little pop out menus it's perfect. Then I also started using it for modal boxes (yes, you might be thinking ahead of me: `dialog`, still, let's find out what happened).

The popover property was really easy for this, and the [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop) selector was perfect for adding a little backdrop blur to tell my user "this is the thing you're dealing with".

I especially love that all the UX around dismissing is handled for me. I can hit the escape key, or click outside the popover and it's dismissed.

Except, I kept noticing that when I dismissed my popover it would sometimes vanish then immediately pop back to life…

<!-- more -->

## On using the wrong tool

It was through a chat with [Bramus](https://www.bram.us/) during a [BTConf](https://beyondtellerrand.com/) lunch that it was pointed out that I should be using a `dialog` for a modal.

I think the reason I didn't think of this earlier is down to the age old problem of naming. I have a mental model that a modal is a different thing from a dialog box. Specifically a dialog lets me set it aside whilst I carry on with what I'm doing.

For example, in many native desktop apps, a preference dialog can be opened, but I can still interact with the software.

Whereas a modal is "you need to do this and we'll lock out the app until you do". Although dismissing the modal is also valid as an action.

Anyway, that was my thinking as to why I hadn't used a dialog for modal actions.

I also didn't know I could use the `::backdrop` selector with `dialog` - mostly because I'd heard of it in the context of the popover.

## So what's the anti-pattern?

A popover doesn't trap focus (which is the whole point of a `dialog`). But I wasn't looking at keyboard focus, I was looking at mouse focus.

When I used the popover for a modal (looking) element, and used a blur on the `backdrop` selector, I didn't realise that clicking on the backdrop would let the click carry through to whatever was underneath it.

So visually the UX is saying the modal is the thing that you need to do, and clicking anywhere else will dismiss it. Technically, I could have a solid colour hiding everything under the modal and you'd have no idea what you were clicking through to.

Let's look at the two buttons below. The "click jack" one will show an alert box. If you click the "modal" button, you'll get my modal, and under the solid backdrop, I'm going to position the "click jack" button across the entire screen, so when you click away to dismiss the modal, you should get the alert.

<div id="demo-popover" popover class="popover-demo">
  <p>This is my modal. I don't have a button to dismiss this, but you can click anywhere on the page to dismiss it, and … see what happens.</p>
</div>
<button type="button" class="button inline" onclick="alert('click jack button got clicked')" id="demo-clickjack">click jack</button>
<button type="button" class="button inline" popovertarget="demo-popover">modal</button>

<style>
#demo-popover::backdrop {
  /* note that I've used this semi-opaque color due to a bug in Firefox
     https://bugzilla.mozilla.org/show_bug.cgi?id=2038260
  */
  background-color: rgba(255, 19, 240, 0.99);
}

#demo-popover:popover-open + #demo-clickjack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}
</style>

Besides the JavaScript click handler for the click jack alert, this is all done with CSS:

```css
/* put a solid colour over the page */
#demo-popover::backdrop {
  background-color: hotpink;
  /*
    note there's a bug that I've filed in FF that
    doesn't like solid backgrounds.
    https://bugzilla.mozilla.org/2038260
  */
}

/* expand the "bad" button under the page */
#demo-popover:popover-open + #demo-clickjack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

This isn't really a demo of click jacking (I've not fully thought though whether it's a real world issue or not), but it shows how I had managed to click to dismiss my modal and then accidentally hit a "live" target in my blurred background.

## Now with a dialog

<dialog id="demo-dialog" class="popover-demo" closedby="any">
  <p>This is my modal. I don't have a button to dismiss this, but you can click anywhere on the page to dismiss it, and … see what happens.</p>
</dialog>
<button type="button" class="button inline" onclick="alert('click jack button got clicked')" id="demo-modal-clickjack">click jack</button>
<button type="button" class="button inline" command="show-modal" commandfor="demo-dialog">modal</button>

In this example, when the `::backdrop` is active, it does still have a giant "click jack" button under it (you'll need to inspect the DOM to validate this), but the backdrop _also_ traps the clicks and it doesn't go through.

That said, you can swap this same code to use `popovertarget` and the same problem occurs (because it's not modal, and won't trap the click).

_Side note: oddly, if you happen to click on the button that opened the popover, it doesn't re-open the popover. You can see this in the [MDN demo of dialog with popover](https://developer.mozilla.org/en-US/play?uuid=e989dbaddcdee714679e010fe188787cc8126a7b&state=hVBBCgIxDPxKyFndu9S9%2BAAvHnup29BWum3ZZhUR%2F26gK7ggeMokzEwmeaLnMeIe1WVmzglKLvlGE5vJER80jo%2BtDSZmp7E%2FFUrQOtU1fq%2BTTqrNINi14GMmJABV%2BrMPddHD3VTI4kcW5hqSA7NebQYOEscwT0FW0U51pfn8D%2FrLSRg%2BWJIrjjFX%2BsqvuqYTiBscapVvCLgulT2NJDAG5xlfbw%3D%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FHTML%2FReference%2FElements%2Fdialog%2F)_.

<style>
#demo-dialog::backdrop {
  background-color: rgba(255, 19, 240, 0.99);
}

#demo-dialog[open] + #demo-modal-clickjack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}
</style>


## I think ::backdrop might be the problem

For me to fall so quickly into this pattern of using a `popover` with the `::backdrop`, and not realise I was taking the wrong approach _feels_ like it might be something others will fall into quickly too - especially if you work in an environment where generated code isn't scrutinised.

I could even see developers trying to use `pointer-events` to prevent clicking through the `::backdrop` whilst using `popover` which would really be committing to the wrong approach.

Another question is: what is the `::backdrop` pseudo element for, if not obscuring the background? Therefore, if the background is obscured, then surely we're looking at a modal element (because the background is now visually out of focus)?

Which all leads me to wonder if `popover` should even have support for `::backdrop`.