# On moving from Heroku to now

I use Heroku for a lot of my quick projects and a number of sites that need (in my view) to be online indefinitely (this [blog](https://remysharp.com), my business [Left Logic](https://leftlogic.com) and all the [ffconf](https://ffconf.org) sites).

Since Salesforce took over Heroku it seems to be a bit wobbly over what how it handles it's free teir, and by no means is it particularly expensive, but the costs do go up as more project require 247 hosting. So I'm always on the look out for alternatives. [Zeit's now is just that](https://zeit.co).

This post explains why I moved, some of the technical details and gotchas and reasons some of my sites haven't migrated (yet).

## Why Zeit?

It's also worth pointing out that [Surge](https://surge.sh) is an excellent solution for front end sites (backed with a solid CDN, transforms and more baked in).

### 1. Pricing

The pricing for Zeit scales so much better for the experimental nature of my projects. I've bought a domain that I deploy a lot of personal hacks and experiments on and each project is it's own deployment. They need to run 247 and can sleep, so long as they spin up upon request.

Currently with Heroku, if I keep the deployments in the free tier, I'll run out of free hours and *everything* shuts down until the month renews. The alternative is $7 a month, which isn't much at all, but quickly gets expensive for 10 quick hacks.

Zeit on the other hand is $15 all in (but there is a free which I'd highly encourage you to try out). That means I can deploy 10 quick hacks, on separate domains, and it costs me $15 per month. It scales really nicely as a development playground.

The free offering has everything you get in premium ($15) except for a few limiting factors:

1. 20 deploys per month. This is the biggest limiting factor, because I can do test deploys of a project and have 15 deploys for a single site, premium allows for 1,000 deploys per month. 20 deploys is a small amount so you need to be sure you want to deploy.
* All projects source code is available under `/_src`
* No custom domains
* Lower bandwidth and storage capacity

For me, the $15 was worth the custom domains. I hadn't hit the deploy limit only because I upgraded so quickly.

### 2. SSL certificates

Heroku recently announced that you can upload and they'll host your SSL certificate for free (instead of $20 per month). Okay, that's assuming you're happy to provision those damn SSL certificates, or at the very least learn LetsEncrypt and manage auto generating the certificate.

On the other hand, when I use now to deploy a new instance, a new SSL certificate is provisions for that domain (which is generated automatically) and is automatically renewed. I don't have to do a single thing.

Even better, is when I alias a deployment to my production domain, like the now deployment [snapbird-ozwcynvkyb.now.sh](https://snapbird-ozwcynvkyb.now.sh) to [snapbird.org](https://snapbird.org), now manages the SSL certificate provisioning and the automatic renewing. **Again, I did nothing to make this work.**

To top it all off, all traffic is served over HTTP2.

### 3. Open source

The user facing software (like the CLI tool) is open source. That means you can [contribute](https://github.com/zeit/now-cli/pull/93/files) changes to the way the code works (mine was to make `now alias` read the `package.json` file).

It's also very easy to build on top of the [now-client](https://github.com/zeit/now-client), for example, the CLI agent doesn't have a way to list all the deployments that don't have an alias (i.e. a domain that isn't under now.sh), so I wrote a mini tool for that: [now-no-alias](https://github.com/remy/now-no-alias/blob/master/index.js).

---

## Considerations when porting to Zeit

Moving from Heroku (or some other system) to Zeit's now platform is for the most part, straight forward, but there are a few considerations.

### Immutable platform

Most importantly, Zeit's platform is immutable. What that means is: you can't write to disk after the deployment is complete. For instance, my own blog is a static site that's generated upon start up, so this doesn't work.

However, you *can* make changes during the deploy process, via your package's `scripts.build` command. I could change my blog to generate the static content during the build process.

### Everything is deployed

Unlike Heroku which uses git to manage what's deployed, running `now` will zip up the current directory and deploy. This is good because it doesn't put a reliance on git, at the same time, it can also scoop up assets you don't want live.

The `now` CLI tool does also use the `.gitignore` and `.npmignore` files to manage files skipped in the deployment. I personally use [dotenv](https://www.npmjs.com/package/dotenv) for my environment, so I need that deployed with the new instance, but *not* pushed to github.

To solve this, ideally you would use the package's `files` array, but that's [not supported right now](https://github.com/zeit/now-cli/issues/157), so you have include a negative rule in `.npmignore`:

```
!.env
```

This will ensure the `.env` file is deployed (but watch that you don't push to npm too!).

## Sweet workflow

Many of my projects get deployed and moved to live with a simple:

```
$ now && now alias
```

This does two things: deploys the current directory, and then aliases the now.sh URL to the value in my package under `now.alias`:

```
  "now": {
    "alias": "myhack.isthe.link"
  },
```

Note that I'm doing this from my local environment. I've not yet moved to continuous deployment using now, but I'm confident that I could script it myself, or use something like [now-pipeline](https://www.npmjs.com/package/now-pipeline).

## Server Sent Events

This is a special case that I had to get help via the [Zeit community slack channel](https://zeit-community.slack.com/messages/now/). If you're using server sent events, which I do for a number of projects, to ensure messages get through (and thus prevent the nginx layer inside Zeit's architecture from buffering), when you send your headers to the `EventSource` request, it [must include](https://github.com/remy/inline-log/blob/master/index.js#L43-L49) `'x-accel-buffering': 'no'`:

```js
res.writeHead(200, {
  'content-type': 'text/event-stream',
  'cache-control': 'no-cache',
  'connection': 'keep-alive',
  'x-accel-buffering': 'no',
});
```

If you don't do this, then the `EventSource` will never see a message.

## Always ensuring production

As I mentioned, I use [dotenv](https://www.npmjs.com/package/dotenv) to manage my environment values. To make the deployment see the environment there's a number of options, but I pretty much *always* forget to do it on the CLI using `now -e NODE_ENV=production`.

1. Include `now.env` in your package with at least `"NODE_ENV": "production"`
2. Use `scripts.now-start` as: `"now-start": "NODE_ENV=production node index.js"`

I'll quiet often use method (2) from above.

## Caching through CloudFlare
