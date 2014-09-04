# Feature based development

Recently we changed the way we were working on JS Bin. Instead of pushing new
features whenever it took my fancy - which could result in success or equally
some kind of breakage - we're now pushing new features under feature flags and
it's proving to be really quite powerful (and fun).

<!--more-->

## feature-gateway

The module is up on npm and can be installed via `npm install feature-gateway`. It's not specifically for Node (in that it'll work on the client side too), but if you put your feature test in the client, it's obviously easy for a visitor to hack.

It's got tests and it up on github under [remy/feature-gateway](https://github.com/remy/feature-gateway) for anyone to learn from or use.

## Simple example

The library I've written is extremely simple (and purposely so). It's used in regular `if` conditionals, as part of Express routing and inside our Handlebar templates.

If we have a feature called "ssl-login" that we're testing, the router might look like this:

    app.get('/login', features.route('ssl-login'), renderSecureLogin);
    app.get('/login', showLogin); // the old way

And an example in a Handlebars template to access the "sandbox" feature:

    {{#feature request "sandbox"}}
      <button>Launch sandbox</button>
    {{else}}
      <a href="/...">Find out about upcoming Sandbox feature</a>
    {{/feature}}

Aside: I'm not 100% happy with the template requiring the `request` object being passed, but it's neccessary right now (unless someone can answer my [SO question](http://stackoverflow.com/questions/21972729/is-it-possible-to-bind-a-handlebars-helper-before-render-using-express-hbs)) - though I've been told that Handlebars 2 might allow a way to bind the helper to objects.

There's more examples of actual usage in the [README](https://github.com/remy/feature-gateway/blob/master/README.md) for the feature-gateway project.

## How the feature flag works

The feature flag is a gateway to a part of functionality, that tests some particular value, and if true, the user has access to the feature. 

The way JS Bin works is that all our feature tests accept the (http) request object. From here, since in our case, the user's session is also attached to the request object we can use a wide range of tests:

- Does the logged in user have a "pro" flag on their account?
- Does the request include a specific cookie value?
- Does the request come from a specific IP address or range?
- Is the logged in user part of an alpha test group?

## Two methods of implementation

So far we've used them for two specific uses. The first is simple: new features are wrapped in the feature test. For example: adding the ability to create private bins is *new* functionality.

The second is quite a bit more complicated: existing functionality is running side-by-side with functionality that's only accessible via a feature flag. For example *changing* the way the login & register works requires that the old way still works, whilst the new way can be accessed via the feature flag. I'll be honest, this can get tricky.

## Continued development

Feature flags seem to be working really well for us on JS Bin, and I'd definitely recommend using them in some way if you can. The obvious next step is tying in some kind of analytics, then A/B testing and then I'm sure more ideas will follow.