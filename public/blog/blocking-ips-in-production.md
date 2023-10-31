---
title: 'Blocking IPs in production'
date: '2023-10-31'
tags:
  - code
---

# Blocking IPs in production

This is probably a hacky way to go about things, but if I don't write it down, I know I'll have forgotten it by the time maintenance comes around in 2033…

TL;DR: use `ufw` but ensure you can access ssh.

<!--more-->

## ufw - Uncomplicated Firewall

Although when I'm maintaining a machine directly I'm likely doing it through AWS, and AWS does also have IP level security, it (AWS) is a pain to navigate and I often get lost. Plus, knowing `ufw` is useful away from AWS.

`ufw` is a firewall tool that (in my case) was disabled by default, and when enabled, denies _all_ incoming traffic - including my own SSH connections.

So, this is a short primer (and reminder) for future me.

```sh
$ sudo ufw status # expecting "disabled"
$ sudo ufw allow ssh # let us back in using SSH
$ sudo ufw allow https # because I'm usually running a server
$ sudo ufw enable
```

Now test, importantly **without** closing the current connection.

This puts the firewall in place. Now if I want to block an individual IP address:

```sh
$ sudo ufw deny from 1.2.3.4 to any
```

Now _any_ requests from `1.2.3.4` are discarded at the network level, allowing my resources to happily continue without wasting resources on a client that's been configured to automatically request from my machine multiple times a second with the wrong API key…

## Fair warning

As I mentioned, this feels like a bit of a fast and lose approach, and this wouldn't get me a job as head of Ops in Big Corp. But it works for me. Your mileage may vary!
