---
title: 'Light/Dark firefox theme switching'
date: '2021-06-21'
tags:
  - web
---

# Light/Dark firefox theme switching

After baulking at the fuss over light and dark theming in both browsers and systems, I've fully jumped into the bandwagon and enjoy when my system theme switches to "evening" mode and everything goes easier on my eyes - I even [blogged about my set up](https://remysharp.com/2020/01/27/toggle-light-and-dark) last year.

Firefox recently updated with a System Theme that would change when the system went from light to dark and back again, but I wasn't personally so keen on the light theme.

The excellent [Firefox Color](https://color.firefox.com/) lets me easily customise and adjust the theme, but at the cost of having to manually switch between light and dark. So I wrote an extension to do it for me!

<!--more-->

## The addon

The addon is currently going through the approval process (currently 52 of 52!), but when it's live it will be [available here](https://addons.mozilla.org/en-GB/firefox/addon/light-dark-switcher/).

If you can't wait, then I've uploaded a self signed version of the addon [on github](https://github.com/remy/light-dark-switcher/releases) which you can install by going to `about:addons` and then clicking the settings gear on the top right, and selecting "Install Add-on From File..."

Once installed, you can select an existing installed theme for light and dark setup, or you can paste a URL from [Firefox Color](https://color.firefox.com/) and it'll automatically parse and activate it.

This is all managed in the plugin preferences so it's tucked away and you don't have to think about it again once setup.

![Light/Dark switcher options](/images/light-dark-switcher.png)

## How it works

The nice "today I learned" bit of the project was that the `matchMedia` JavaScript method inherits events, so along with actually testing whether a CSS expression matches, I can watch for _when_ it starts to match.

This means I can have an event listen to notify when the operating system switches into a dark mode (or light mode) using the following code:

```js
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  toggleTo(e.matches ? DARK : LIGHT);
});
```

Now my `toggleTo` will receive a constant so that it can handle the updating of the Firefox theme when the CSS expression evaluated value changes.

Beyond that bit of code, the background script to the addon re-uses the code from [Firefox Color](https://github.com/mozilla/FirefoxColor/blob/f7f89b64506c865c7434f77ad217dbd9ff43352b/src/web/index.js#L52) to decode the URL into a theme JavaScript object which can then be used to _update_ the current theme.

Along with supporting the URLs from Firefox Color, I decided to enumerate the installed themes the user had to let them select a preinstalled theme (which actually allows for a more customised theme as they can support background images).

Frustratingly, the UI for this part of the Firefox addon preferences should have used a `datalist` element bound to an `input` text box. This would allow for an autocomplete component to allow the user to either freely enter a Firefox Color URL or select from the autocomplete list an installed theme. The problem is, simply, the `datalist` element doesn't work at all in the preferences panel.

I don't really understand why the addon frame is being handled differently and I can't understand how it wouldn't work, but it doesn't (at time of writing).

Beyond that, it's all fairly straight forward wiring from one side of things to another.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/1OvxEepAxSU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
