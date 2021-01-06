---
title: 'Connecting to Atlas replica sets'
date: '2021-01-06'
tags:
  - code
---

# Connecting to Atlas replica sets

As much as using mongodb makes me feel like I'm being lazy, and as much as I dislike using mongoose in Node, I do keep using it… Up until last year I was using mlab, but they shut down, so for free sandbox mongo databases, I'm using [Mongo Atlas](https://cloud.mongodb.com).

Except actually connecting is a bit of a faff and not entirely obvious, so this post is here for me to find again in the future for when I forget.

<!--more-->

This post is based on the Mongo Atlas interface as of Jan 2021. Hopefully it doesn't change so much that in a few years this is utterly irrelevant.

The short version is that it seems (certainly in my case) that I must connect using the **replica set** and _not_ the standalone connection string format.

So, with that uphill struggle ahead of us, let's press on.

## 1. Get your hostname.

This can normally be found under "Clusters" (left hand side menu), then "Connect" (button), then "Connect with the mongo shell".

Below is what we need:

![](/images/mongo-connect.png)

## 2. Collect the replica set hostnames

Using the command line, run the following DNS lookup against the hostname:

```shell
nslookup -type=SRV _mongodb._tcp.<YOUR_HOSTNAME>
```

Note that I couldn't find any online tools that let me do this _particular_ type of lookup for those either without the command line or perhaps put off.

You should get a reply a bit like the following:

```text
nslookup -type=SRV _mongodb._tcp.jsonbin.mi3g4.mongodb.net
Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
_mongodb._tcp.jsonbin.mi3g4.mongodb.net	service = 0 0 27017 jsonbin-shard-00-01.mi3g4.mongodb.net.
_mongodb._tcp.jsonbin.mi3g4.mongodb.net	service = 0 0 27017 jsonbin-shard-00-02.mi3g4.mongodb.net.
_mongodb._tcp.jsonbin.mi3g4.mongodb.net	service = 0 0 27017 jsonbin-shard-00-00.mi3g4.mongodb.net.
```

The values at the end of the 3 records are the replica set. Collect these.

## 3. Get the `repliaSet` value

Another `nslookup` required, this time on the `TXT` record. This time also you don't need the `_mongodb._tcp.` part.

```txt
nslookup -type=TXT jsonbin.mi3g4.mongodb.

Server:		192.168.1.1
Address:	192.168.1.1#53

Non-authoritative answer:
jsonbin.mi3g4.mongodb.net	text = "authSource=admin&replicaSet=atlas-ozezc3-shard-0"
```

This `text = ` reply makes up part of our connection URI string.

## 3. Construct the connection URI

Using the 3 replica hosts and adding in your username, password, connection port (likely to be `27017`), your database name and the replicaSet string, the URI can be made using the following:

```
mongodb://<username>:<password>@<replica1>:27017,<replica2>:27017,<replica3>:27017/<dbname>?ssl=true&authSource=admin&replicaSet=<replicaset>&retryWrites=true&w=majority
```

And that, with all the hoop jumping, is how to connect to a replica set.
