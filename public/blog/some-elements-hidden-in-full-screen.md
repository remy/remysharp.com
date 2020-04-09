---
title: Some elements hidden in full screen?
date: 2020-04-09
tags:
  - code
---

# Some elements hidden in full screen?

This is one of those "I spent nearly a day debugging this and I don't want to forget, so I'm writing it here for all eternity\*

_\* Or as long as I renew the dns…_

<!--more-->

## The problem

I had a React based project that had a main "board" view and triggered by the user, a modal would appear. This worked fine during development and though I didn't touch the code around the modal at all, the modal would not appear at all in mobile.

Why was that?

One thing I did notice, that eventually helped, was that the modal was only missing in full screen mode and when the website returned to non-full screen, the model would magically appear.

## Some context

This is a snippet of the code that React boots in the browser. It's not so much that React caused me a problem, but more that with libraries like React, Vue and so on, is that they attach onto a node in the DOM that's not _quite_ the root (I've suffered this in the past when trying to do a flex 100% wide and tall React app).

Note that the main board view the visitor sees is in `<Game>`.

```jsx
<TableContext.Provider value={this.tableContext}>
  <Helmet>
    <title>{title(table)}</title>
  </Helmet>
  <UpdateNotice />
  <Game {...this.props} />
  <StandModal table={table} />
  <CloseWindowModal />
  <GettingStartedModal />
</TableContext.Provider>
```

The visitor would then load up the board and they tap "full screen", from thereon in, the modals, like `<GettingStartedModal>` is invisible.

It's in the DOM. In Chrome Canary I could see the modal in the DOM and I when I hovered over I could see devtools highlighting where _it should be_, but it wasn't there.

The modal didn't have any opacity, visibility or anything else funky going on. So, what was it 🤔🤷‍♀️

## Full screen context

The full screen API and selector applies at a DOM node level. In this case, the DOM node for the `<Game>` component was going full screen. The component was designed to stretch across the viewport, so that's the only thing that would be seen when in full screen.

This meant the full screen context was on the DOM node that was a _sibling_ of the modal.

**The modal would need to be a child of the full screen context.**

So that was it, I need to move the full screen to a higher up element. In the end I hacked about with React's `useRef` to make use of `document.body` but it certainly had me stumped for almost a day!
