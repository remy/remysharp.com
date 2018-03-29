# Speed

Bottom line: latency based DNS. Only available in AWS AFAIK, plus instances need to be on AWS.

- I deployed a site using Zeit's now (which I love), but from the UK latency was >200ms - too long for a 3rd party API
- I looked at other services to understand how they were getting such low latency
- CDN required for dynamic content
- Which meant putting my servers in multiple locations, and using AWS' unique latency based DNS
- Now need to deploy same environment as easily as possible…dokku similar to Heroku (git push) experience
- Found vagrant for building dokku automatically in each region (also found scaleway.com for Paris and Amsterdam hosting)
- Had to also adjust the nginx installation for dokku as there was bugs with http2 and specific versions of nginx (at time of writing this includes the latest version), so I would install nginx=1.11.* (from chrislea's PPA) - which then enabled http2 for dokku (via nginx)
- Used local redis for rate limiting, but this was only based on IP and not a user, so I need to add user database. **Problem**: database is now another bottleneck if I'm using one, so need to look at replication
- Couchdb has the best rep (I know) for replication
- Considering spinning up couch on each instance then replicating back to a single primary instance (arbitrarily picking one), but this seemed like a heavy approach
- Used pouchdb to abstract couchdb away from my code (I also ended up adding an interface from my original mongoose based schema to pouch - which sorta works).
- Locally each machine would use LevelDown based on adapter for pouchdb, and then replicate back to a single couchdb instance
- I had to add a storage plugin, to persist the user database across deploys (so I mounted `/tmp/` as storage, and point LevelDB to `/tmp/${db-name}`)
- Worked firs time, but when I deployed again, original instance still had an open connect so the new instance couldn't take over (since LevelDown only allows a single connect to the file based db).
- I moved to MemDOWN (memory based leveldb) and when the connect starts up, it syncs from the primary (I also need to add deployment checks to only pass once this is complete).
- Using setImmediate to defer some action (such as updating the user database as a fire and forget) as this will allow the server to respond to the http request and *then* do the setImmedate request

# Details

## Installing Dokku

Launch from this stack: https://github.com/tobiasmcnulty/dokku-aws

Then update the machine, and add ssh for dokku using:

```bash
$ curl -s https://jsonbin.org/remy/ssh-key  | sudo dokku ssh-keys:add $USER
```

## SSL

I looked at using AWS Cerficate Manager, and this works with CloudFront distributions, but this is just a CDN. A CDN for dynamic content is great, except that taxtools' general usage is a one off hit to get all the data you need, so that first hit **must** be fast, and with a CDN, the first request runs through the CDN and retrieves the original object, and returns it. The second hit is the fast one, but that's too late for us already.

Handled by LetsEncrypt, but there's a problem. The way that the certificate validation works is by making a webhook callback to the machine making the LE request. If the machine responds correctly, a new certificate is provision.

All well and good in theory, but what if you trigger the LE request from your machine based in Germany, and the LE server requests the domain but hits the US east one because the geo-based DNS is working? Well…you're screwed.

**In the end**, I purchased a 2 year SSL certificate and deployed manually to avoid the headache!

```bash
ssh dokku@dokku.us1 certs:add iptotax < cert/certs-2017-05-13.tar
```

## Monitoring

Currently I use updown.io to monitor taxtools, which does actually report requests from different locations across the globe, but it's very easy to be mislead into thinking that the server is fine because it renders well in the UK, when in fact the US East 1 server has bailed.

_To be continued_.


## 1. dokku via vagrant on aws

- vagrant
- [find the AMI](https://cloud-images.ubuntu.com/locator/) for the specific region AND for ubuntu (otherwise it doesn't work)

## LetsEncrypt & SSL

From the instance itself, run:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

Now on your local machine (talking through the local dokku command) add LE:

```bash
dokku domains:add myapp myapp.com # add your root domain
dokku config:set --no-restart myapp DOKKU_LETSENCRYPT_EMAIL=you@email.com
dokku letsencrypt myapp
dokku letsencrypt:cron-job --add
```

## http/2

You need to upgrade nginx to 1.11.9 (stable seems to be on 1.10.0 and [has issues](https://github.com/dokku/dokku/issues/2435))

```bash
sudo add-apt-repository ppa:chris-lea/nginx-devel
sudo apt-get update
sudo apt-get install nginx=1.11.* -y
```

## Problems

- Need to put monitoring in place for **all** systems, not just the domain (I'm using updown.io but thankfully it requests from different locations so it hits different individual servers)

With Docker and Dokku in particular, I kept leaving old unused containers laying around, and since I also used the default 8gb AWS drive, it would run out of space every few months, and not all at the same time. The error typically picked up by updown.io as a 500.

Running out of diskspace also meant that the `dokku cleanup` command would fail entirely with a rather obtuse error:

```bash
$ ssh dokku@dokku.us1 cleanup
/home/dokku/.basher/bash: main: command not found
Access denied
```

This was because it didn't have diskspace to actually run the command 🤷‍

Potential solutions:

1. Add external drive (100gb) to defer the problem
2. Auto-cleanup on deploy which combined would do the trick, since 8gb really isn't much space.

Good resource for cleanup (via cronjob?)

```bash
# https://github.com/spotify/docker-gc#running-as-a-docker-container
$ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker-gc:/var/lib/docker-gc -v /etc:/etc samsaffron/docker-gc
```

⚠️ Also worth running `sudo apt-get autoremove` on default ubuntu installations because there's about 2gb of `src` files taking up space that we can recover.

---

Potential issue if the machine restarts: https://github.com/dokku/dokku/issues/2403 - docker IPs will be lost and need to be restored.

---

Upgrading node:

```
$ sudo apt-get install --only-upgrade nodejs
```
