# Headless Raspberry Pi setup

The following information is scattered around the web and it's taken me a few times to find it each time, so I'm putting it here for safe keeping.

As much as I love the Raspberry Pi's, I rarely have a mouse and keyboard handy for setup, and nearly all concessions, I want to run the Pi in headless mode (and ssh into the machine). This guide is a bullet point tick list to getting the Pi accessible on the network.

<!--more-->

## Prerequisites

A Raspberry Pi (I quite like [this UK store](https://shop.pimoroni.com/)), min 8gb micro SD card (with cradle) class 6 to 10 (ideally), and disk image flashing software, [Etcher](https://etcher.io/) is a pretty nice cross platform solution.

1. Download the [Raspbian Stretch Lite image](https://www.raspberrypi.org/downloads/raspbian/).
2. Using [Etcher](https://etcher.io/) and select the downloaded zip file, and flash onto an SD card. Once flashed, remove and reinsert, and navigate to the `/boot` drive.

## Configuration

Create two files in the root of the `boot` directory/drive:

1. `ssh` - an *empty file*, this boots the Pi with SSH turned on
2. `wpa_supplicant.conf` - this is the wifi configuration, as follows:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="[YOUR-SSID]"
    psk="[YOUR-PASSWORD]"
    scan_ssid=1
}
```

**Important note about wifi** the Pi Zero doesn't have 5Ghz wifi support (so make sure you connect to the appropriate wifi network).

## Connecting

Once the Pi is running, you'll want to discover the IP address on the network. For a Mac, there's a couple of methods to discover devices on the network.

The following command will list all the IP addresses on your network (assuming your machine is on the same network as your Pi). It's useful if there's a small list of IP addresses:

```bash
$ arp -a # lists all IP addresses on network
? (192.168.1.1) at 2c:03:33:d4:98:70 on en0 ifscope [ethernet]
? (192.168.1.5) at 78:db:cf:f2:ab:71 on en0 ifscope [ethernet]
? (192.168.1.100) at 6c:40:23:94:1e:1c on en0 ifscope permanent [ethernet]
? (192.168.1.115) at c0:ef:fb:53:11:1e on en0 ifscope [ethernet]
? (192.168.1.124) at 9c:21:77:7e:ce:bf on en0 ifscope [ethernet]
# etc
```

For a more detailed (and useful) report, you can use [nmap](https://nmap.org) to scan your router for devices and their hardware name (and using `grep` to filter to the string "raspberry"), in my case `[ROUTER-IP]` is `192.168.1.1`:

```bash
$ sudo nmap -sn [ROUTER-IP]/24 | grep -i raspberry -B 2

Nmap scan report for <strong>192.168.1.143</strong>
Host is up (0.20s latency).
MAC Address: B9:20:E9:DB:32:88 (Raspberry Pi Foundation)
```

Now I've found the ip address of the IP on my network, I can connect using `ssh pi@<ip-address>` with the default password of `raspberry` (which I'll change immediately).
