# Heroku to now

I use Heroku for a lot of my quick projects and a number of sites that need (in my view) to be online indefinitely (this [blog](https://remysharp.com), my business [Left Logic](https://leftlogic.com) and all the [ffconf](https://ffconf.org) sites).

Since Salesforce took over Heroku it seems to be a bit wobbly over what how it handles it's free teir, and by no means is it particularly expensive, but the costs do go up as more project require 247 hosting. So I'm always on the look out for alternatives. [Zeit's now is just that](https://zeit.co).

This post explains why I moved, the technical hows, and how I run my continious deployments with `now`.

## Items

- DNS
- CloudFlare for cdn (but currently `CF-Cache-Status: MISS`)
- Deploys everything in the dir (similarly to surge) can be a bit slow, but been told there's optimisations coming
- Use `scripts.build` to modified what's deployed, because changes after the fact will blow up
- Instances do sleep
