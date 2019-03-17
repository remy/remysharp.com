---
title: to hex
date: '2007-09-30 20:01:11'
published: true
tags:
  - code
  - code
  - hex
  - javascript
  - numbers
modified: '2014-09-03 16:15:12'
---
# to hex

    d.toString(16)

Beautifully simple way to get a hex value from a number.  Note that `d` is a number.  If you want a string as a hex XML valid code, use:

    '&#x' + parseInt(number).toString(16).toUpperCase() + ';'
