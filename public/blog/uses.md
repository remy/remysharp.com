---
title: Uses
tags:
  - personal
  - web
draft: true
date: 2020-02-26
---

# Uses

I've been asked about my terminal setup, my font and theme choices for my editor and general advice on software, so I thought I'd share my entire setup below.

This is an ever changing work in progress.

<small>_Updated: 23 Jan 2020_</small>

## Editor & terminal

My code editor and terminal are the bread and butter of my day work.

- [Visual Studio Code](https://code.visualstudio.com/) and [iTerm2](https://iterm2.com/)
- [My terminal setup](https://remysharp.com/2013/07/25/my-terminal-setup)
- Terminal font: [Fira Mono Powerline](https://github.com/powerline/fonts/tree/master/FiraMono) and [FuraMono Nerd](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraMono)
- Editor font: [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono)
- I [switch between light and dark themes](https://remysharp.com/2020/01/27/toggle-light-and-dark) in both VS Code and my terminal
- Terminal theme: [onedark](https://github.com/tilal6991/base16-onedark-scheme) ([preview](https://base16.netlify.com/previews/base16-onedark.html)) and [atelier-forest-light](https://github.com/atelierbram/base16-atelier-schemes) ([preview](https://base16.netlify.com/previews/base16-atelier-forest-light.html))
- Editor theme: [Nord](https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code), [Atom One Light](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onelight)
- My [dotfiles](https://github.com/remy/dotfiles) though not terribly useful, the [.aliases](https://github.com/remy/dotfiles/blob/master/.aliases) and [.functions](https://github.com/remy/dotfiles/blob/master/.functions) might be of interest
- The `ls` colouring command I use is entirely bespoke (and written by me): [nice-ls](https://github.com/remy/nice-ls) (the point being that it doesn't change my `ls` usage)

## Desktop apps

These are the apps that I rely on to make my work, or rather working with my laptop, a little easier day to day.

- [Bartender 3](https://www.macbartender.com/) - for hiding menu bar items and keeping the visible items tidy (I have very few menu icons on display)
- [Alfred](https://www.alfredapp.com/) - I also use the clipboard history that's built in, perhaps more than the core Alfred features
- [1password](https://1password.com/) - I finally ponyed up for a subscription and it's definitely worth it
- iStat Menus - using: clock, weather, battery and CPU widgets
- [Fantastical 2](https://flexibits.com/fantastical) - for fast/user friendly calendar event entry
- [TablePlus](https://www.tableplus.io/) - for sqlite, postgres, redis and more database browsing
- [Robo 3T](https://robomongo.org/) - (because MongoDB support isn't great in TablePlus)
- [Karabiner Elements](https://pqrs.org/osx/karabiner/) - really powerful, things like cap-lock is re-binded to <code>\`</code> and shift+caps is `~`
- [Moom](https://manytricks.com/moom/) - I've tried a few of these and Moom has the most functionality - including resizing to specific dimensions (useful for when I'm screencasting)
- [Monitor Control](https://github.com/the0neyouseek/MonitorControl) - control external monitor volume using my keyboard
- [Dash](https://kapeli.com/dash) - code documentation, useful with the ctrl+h shortcut in VS Code
- [Backblaze](https://www.backblaze.com/) - whole drive backups
- [Screenflow](https://www.telestream.net/screenflow/overview.htm) - for recording training videos, though I don't tend to upgrade often
- [NordVPN (IKE)](https://nordvpn.com/) - I bought a 3 year VPN license some time ago and although it hogs the CPU when my wifi is down, it's reasonable decent (and works on my phone) - I'm using the IKE variant that's available in the MacOS store (compared to the normal download) as it connects

## URLs that are always open

Email aside, here's some of the web sites that I have open on a near permanent basis:

- [duckduckgo.com](https://duckduckgo.com) - search
- [jqterm.com](https://jqterm.com) - json hacking
- [feedbin.com](https://feedbin.com) - my news
- [web.whatsapp.com](https://web.whatsapp.com) - messaging (both groups/teams and individuals)

## Websites I gladly pay for

…because these sites make my life a little bit easier.

- [feedbin.com](https://feedbin.com) - my news
- [updown.io](https://updown.io/r/tx47y) - I monitor a number of production projects with this extremely elegant service
- [Glitch](https://glitch.com) - I moved a small number of projects I had hosted on Vercel (AKA Zeit) and enabled the boosted app mode
- [1password](https://1password.com) - it's a business account that my partner and I are connected users and being able to share password vaults is a huge win

## Browser extensions

For personal browsing I use Firefox. For some JavaScript specific development I use Chrome Canary.

- [1password](https://1password.com/downloads/mac/#browsers)
- [Disable javascript](https://github.com/dpacassi/disable-javascript) - useful for quick hit testing (though in Chrome I can open devtools and disable from there)
- [DuckDuckGo Privacy Essentials](https://addons.mozilla.org/en-GB/firefox/addon/duckduckgo-for-firefox/) - visualises the state of trackers on a site - though I've recently found that it does causes problems on a very small handful of browsers
- [Enhancer for YouTube](https://www.mrfdev.com/enhancer-for-youtube) - a new addition to my extensions, generally cleans up YouTube from shouty to more reasonable
- [Facebook container](https://addons.mozilla.org/en-GB/firefox/addon/facebook-container/) - I use Facebook exclusively for my ZX Spectrum community stuff, and this helps to keep facebook out of my business otherwise
- [m-wiki](https://addons.mozilla.org/en-GB/firefox/addon/m-wiki/) - defaults to the mobile version of wikipedia (though the Chrome version is slightly better as this one will _push_ to my history)
- [Make Medium Readable Again](https://makemediumreadable.com/) - I don't really enjoy Medium so this makes it a little more tolerable
- [OctoLinker](https://octolinker.now.sh/) - makes links out of included files in github source code pages, such as `import X from 'foo'` - the `foo` part becomes a link to it's source
- [Pinboard WebExtension](https://github.com/gapop/pinboard-webextension) - I've tried a number of these and I prefer this one because it opens separately and doesn't loose the content when I click away
- [React Developer Tools](https://github.com/facebook/react) - definitely finding the "profile" section useful these days
- [Refined Github](https://github.com/sindresorhus/refined-github) - lots and lots of minor tweaks that makes github that little bit nicer
- [Simplify Gmail](https://simpl.fyi/) - I've no idea what what regular Gmail looks like these days - I'm a big fan of this
- [Toggl Track](https://toggl.com/track/) - used for tracking client work
- [uBlock Origin](https://github.com/gorhill/uBlock#ublock-origin) - I frequently uses this to block out large overlays that websites add or [crap that's designed to be distracting](https://remysharp.com/2020/06/19/clearing-twitter)

## Mobile apps

I moved across to Android a long time ago after getting super frustrated with iOS, some of these apps I know are Android specific.

- [Dark Sky](https://darksky.net/app) - hyper weather (actually fairly accurate based on experience)
- [FitNotes](https://www.fitnotesapp.com/) - absolutely essential gym (logging) app and the very best of all that I've tried
- [Todo Agenda widget](https://github.com/plusonelabs/calendar-widget) - my calendars at a glance on the main screen
- [Terminus (only on mobile)](https://www.termius.com/) - this is one of the better terminals on mobile, but I do not enjoy on desktop
- [ADV Screen Recorder](https://play.google.com/store/apps/details?id=com.blogspot.byterevapps.lollipopscreenrecorder) - screencasting from the mobile phone - useful for bug reports too
- [iA Writer](https://ia.net/writer) and [JotterPad](https://2appstudio.com/jotterpad/) - for writing blog posts on the go
- [Office Lens](https://www.microsoft.com/en-us/p/office-lens/9wzdncrfj3t8?activetab=pivot:overviewtab) - great for for taking photos of white boards and papers
- [Nova Launcher](http://novalauncher.com/) - for my launcher app, and I've tried a _lot_!
- [Snapdrop](https://snapdrop.net/) - PWA that lets me drop files between devices on the same network

## Physical space: My Desk

After years of working off a kitchen table, the house we're in now has an office and I now have a desk that I can make my own.

_TODO_
