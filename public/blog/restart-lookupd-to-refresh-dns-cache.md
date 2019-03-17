---
title: Restart lookupd (to refresh dns cache)
date: '2007-09-27 17:53:38'
published: true
tags:
  - code
  - dns
  - code
  - lookupd
  - mac
  - shell-script
modified: '2014-11-21 17:20:35'
---
# Restart lookupd (to refresh dns cache)

    ps ax | grep lookupd | grep -v grep | perl -ne 'split; print $_[0]' | xargs sudo kill -HUP

I'm often connecting to different networks depending on what job I'm doing, and sometimes I'll need to tweak my <code>/etc/hosts</code> file.  Since my system will cache DNS lookups, I'll need to restart <code>lookupd</code>, and this command does it in one hit.

## Refresh DNS in Leopard

    sudo dscacheutil -flushcache

## Refresh DNS in Yosemite

    sudo discoveryutil udnsflushcaches
