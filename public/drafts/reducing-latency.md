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
