---
title: 'Working with the ESP in Cspect [spectrum]'
date: '2021-09-09'
tags:
  - code, spectrum
---

# Working with the ESP in Cspect [spectrum]

After developing the [.http tool](https://github.com/remy/next-http) for the [Spectrum Next](http://www.specnext.com/) in assembly, for my own workflow I did most of the testing against an emulator (before moving to hardware), however there's some quirks with [Cspect](http://cspect.org/) and the wifi/esp/internet setup, and since I've been through the fire and come out the other side it makes sense to write it up.

<!--more-->

## By default

With no changes, Cspect does support making TCP/IP requests and emulates a small subset of ESP AT commands, such as `AT+CIPSTART`, `AT+CIPSEND=...` etc.

**The big gotcha is that all data is encoded as 7-bit.**

This is important because if you're working with ASCII text like a protocol like gopher, then everything will work fine. However, if you're sending raw 8-bit bytes over a socket, Cspect will corrupt the data. For example, if the server sends `0xFF` it will be corrupted to `0x7F`.

However, there's also no logging so debugging can be especially hard. This is where [Robin Verhagen-Guest's github repo](https://github.com/Threetwosevensixseven/CSpectPlugins) comes to the rescue.

## Enabling 8-bit bytes

The [UART replacement](https://github.com/Threetwosevensixseven/CSpectPlugins/wiki/UART-Replacement) Cspect plugin replaces Cspect's own implementation and, from my own experience, makes the ESP communication near identical to the Spectrum Next's own comms. However, you will need your own ESP module attached to your development machine (in my case, my Mac).

The directions are very simple to follow once you've [download the plugin zip file](https://github.com/Threetwosevensixseven/CSpectPlugins/releases/latest):

> Download the CSpectPlugins.zip file, then extract the UARTReplacement.dll and UARTReplacement.dll.config files. Exit CSpect, then copy these into your CSpect directory

Now you need to plug your ESP module into the machine you're working with. I used this specific adapter and it worked with zero setup: [OPEN-SMART USB To ESP8266 ESP-01](https://www.amazon.co.uk/Runrain-OPEN-SMART-ESP8266-ESP-01-Adapter/dp/B07G6ZPY9D). Of course, you'll also need an ESP-01. You can find these on Amazon (a pack of 4 for £12) or [87p on AliExpress](https://www.aliexpress.com/item/32662289814.html) (if you're happy to wait).

You will need to discover the port that the device is connected to. On Windows this is typically `COM1` but it's worth checking your devices to be sure. MacOS is a little trickier, but typically can be found using `ls /dev/tty.*` (though `/dev/cu.*` might also work). Take note and use this in the `UARTReplacement.dll.config`.

This is my own MacOS config file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Settings xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <EspPortName>/dev/tty.wchusbserial1420</EspPortName>
</Settings>
```

*Updated 2023-11-16 to change `PortName` to `EspPortName`*

Using Cspect now will pass the requests directly to the ESP which gives you a much closer experience to the Spectrum hardware.

## Logging

Again, Robin's repo solves this problem. In the [same zip file](https://github.com/Threetwosevensixseven/CSpectPlugins/releases/latest) is the [UART Logger](https://github.com/Threetwosevensixseven/CSpectPlugins/wiki/UART-Logger). Again, drop this into your Cspect directory and now all ESP comms are logged (by default) in the Cspect directory in a file called `ESPLogFile.txt`.

The result is all the back and forth communication between the ESP and the software:

![Result of cspect logger](/images/cspect-esp-logging.png)

## Final background reading

I'd also recommend reading around the ESP itself to understand some of it's quirks, since the actual hardware can host different versions of the AT commands - with that in mind, I personally recommend sticking to the lowest common commands - usually _just_ `CIPSEND`.

I did write up [my braindump on ESP](https://remysharp.com/2021/04/28/fun-with-esp-modules) modules which could be useful follow up reading.
