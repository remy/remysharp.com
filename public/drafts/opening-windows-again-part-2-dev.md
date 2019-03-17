---
title: 'Opening Windows again (part 2: dev)'
date: '2018-01-09 10:45:34'
modified: '2018-01-12 11:15:14'
complete: false
inprogress: true
tags:
  - code
draft: true
---
# Opening Windows again (part 2: dev)

Problems:

1. Internet horribly slow from bash - fix: /etc/resolve.conf + `nameserver 8.8.8.8 nameserver 8.8.4.4` - except it keeps on getting overwritten, and I've yet to solve it
2. Finding the $HOME dir in Windows (to edit code) is horrible: https://www.howtogeek.com/261383/how-to-access-your-ubuntu-bash-files-in-windows-and-your-windows-system-drive-in-bash/
3. Subsystem doesn't seem to get io events across the platform
4. Environment variables catch me out: `set DEBUG=x`

Made worse for me by:

1. shift + 4 rarely works (which I use a lot for `!$`)
2. Trackpad doesn't often click, have to be really specific bottom left, or tap to click - which I'm not a fan of
