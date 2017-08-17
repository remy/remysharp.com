# Contrast ratio in devtools

Recently I've been wary of accessibility (a11y) of colour in my work, and I've known about the contrast ratio checker in devtools, but it's recently been upgraded and is super charged:

![picker](/images/contrast-picker.png)

<!--more-->

To enable it (as of August 2017), you need the following steps:

1. Use Chrome Canary
2. Enable experiments: chrome://flags/#enable-devtools-experiments (copy and paste this internal link into Canary)
3. From devtools, open settings (F1)
4. Open the experiments panel
5. Hit `shift` seven times (no, I'm not kidding)
6. Check the "Color contrast ratio line in color picker"

To get the extra detail (that's shown in the screenshot above), you need to click on the contrast value and it will toggle the a11y colour information.

Huge props to [Alice Boxhall](https://mobile.twitter.com/sundress) for her [superb work](https://github.com/ChromeDevTools/devtools-frontend/commit/fde06fd07631e7613f236ded98244ff23f8d88ad) on the contrast picker 💪.

If you're interested in gathering contrast information quickly, I'd highly recommend using [aXe devtools extension](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) (for [Firefox too](https://addons.mozilla.org/en-GB/firefox/addon/axe-devtools/)) too, I've personally found this to be very useful.
