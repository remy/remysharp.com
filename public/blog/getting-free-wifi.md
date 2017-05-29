# Getting free wifi

Have you ever picked up free wifi in a hotel or airport and had the "30 minutes free wifi" and then had the option to pay silly money for an hour? This tip allows you to completely reset that 30 minute grace period, prompted by the following tweet.

<!--more-->

[![Free wifi quote](/images/free-wifi.png)](https://twitter.com/misprintedtype/status/869108264126042112)

The following command will spoof the mac address of your machine, so the captive portal wifi will see your machine as brand new, and reset your free period:

```bash
alias freewifi="sudo ifconfig en0 ether `openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//'`"
```

This will make a new command called `freewifi` that changes you MAC address to a random value. Note that to reset your MAC address, you'll either need to reboot, or take a backup of it first (to restore later on):

```bash
ifconfig en0 | grep ether
```

You don't particularly need to understand the details, but if you want to learn, I do cover `alias`, `sudo`, piping and `sed` in my [terminal training course](https://terminal.training).

Enjoy 👍

Credit to [Jorge Luis‏](https://twitter.com/jorgelbgm/status/844559438799392770) and [Web Bos](https://twitter.com/wesbos) for tweeting this concept into my timeline and [further reading here](http://osxdaily.com/2012/03/01/change-mac-address-os-x/).
