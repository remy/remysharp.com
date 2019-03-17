---
title: When github email scope fails
date: '2017-04-24 07:49:48'
modified: '2017-03-21 07:07:36'
tags:
  - code
published: true
---
# When github email scope fails

I've written many many Node.js applications, and whenever I add Github as the auth process, I find that even though I'm asking for `scope:email` there's often a number of users that end up *without* an email address.

A few years later, I finally worked out why and how to fix it.

<!--more-->

**Note:** *this is not a tutorial on how to perform auth, so a number of previous assumptions are applied in the code samples.*

## Before

My code tends to use [passport.js](http://passportjs.org/) (though I'm fairly sure this problem applies regardless). Here's my typical strategy for a github based auth:

```js
const passport = require('passport');
const undefsafe = require('undefsafe');
const User = require('../db/user');
const Strategy = require('passport-github2').Strategy;

const strategy = new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK,
}, (accessToken, refreshToken, profile, done) => {

  // now I pluck the email from profile.emails[0].value
  const email = undefsafe(profile, 'emails.0.value');

  User.findOrCreate({ email })
    .then(done)
    .catch(e => done(e));
});
```

And the scope is defined when I authenticate with github:

```js
passport.authenticate('github', { scope: [ 'user:email' ] })
```

The github auth library returns an array for emails (as per [passport's profile normalisation](http://passportjs.org/docs/profile)), except **sometimes email is empty**.

This happens when the github user doesn't have a public email address. But…we just completed a full auth and this isn't a public profile we're after, so surely we should have the email? The answer is no, but here's how to fix that.

## After

Inside the auth callback, I'll check if I actually have an email address, and if not, I'll immediately make a `https://api.github.com/user/emails` call (with the newly captured access token) which **now includes private email addresses** so I can properly use this as a unique identifier in my application.

The callback looks (a bit) like this:

```js
// now I pluck the email from profile.emails[0].value
const email = undefsafe(profile, 'emails.0.value');
let promise = null;

if (email) {
  promise = Promise.resolve(email);
} else {
  promise = new Promise((resolve, reject) => {
    request({
      url: 'https://api.github.com/user/emails',
      json: true,
      headers: {
        'user-agent': 'my user-agent',
        authorization: `token ${accessToken}`,
      },
    }, (error, res, body) => {
      if (error) {
        return reject(error);
      }

      // resolve with the primary email address
      resolve(body.find(entry => entry.primary).email);
    });
  });
}

promise.then(email => {
  User.findOrCreate({ email })
    .then(done)
    .catch(e => done(e));
  });
});
```

And that's it, it'll ensure that you'll get an email address which is what I tend to use as the unique identifier for users.

---

## Follow up

Of course whilst writing this post, I decided to check out the source code to [passport-github](https://github.com/jaredhanson/passport-github) and discovered by sifting through the source that there's a helper function called `.userProfile` which does exactly this. Oddly though, it's not documented (which I may send a PR for).

Still, now my projects correctly capture the details they need.
