# My Workflow v2: Mobile, DevTools & LiveReload

Since I'm sat at [Mobilism 2013](http://mobilism.nl/2013) I think it's worth sharing my recent mobile (mainly CSS) workflow. It's not rocket science, but it's a nice follow on from [my workflow with devtools](http://remysharp.com/2012/12/21/my-workflow-never-having-to-leave-devtools/) I shared a few months back.

<iframe width="1280" height="720" src="http://www.youtube.com/embed/tIabBQatvD8?rel=0" frameborder="0" allowfullscreen></iframe>

It simply boils down to using [LiveReload](http://livereload.com/) on the page, using DevTools with the "Save As" functionality on the CSS, then simply make the change on the desktop using DevTools, which automatically saves to file, which causes LiveReload to trigger a reload on all devices (perhaps frustratingly on the desktop too), but also the remote devices - mobile or otherwise - to refresh allowing me a quick glance to make sure the styles look right.

Simple.

## What it should be

There is an ideal workflow, and I believe this is the way it's supposed to work (but maybe the browser isn't quite there just yet, but it feels like it's just around the corner).

You connect your mobile browser (Android Chrome in this case), run `adb` (and I think I saw a browser extension that makes this easy during some of the Google IO 2013 videos), open Chrome (Canary works) and navigate to `chrome://inspect` and you'll be able to launch the devtools for that page.

From *those* devtools I imagine I should be able to edit and save to disk and it would remove the requirement for LiveReload (though this doesn't solve working with iOS).  Pretty cool.