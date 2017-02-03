# Beginners guide to Stripe integration

I've used Stripe on a number of projects in varying levels of complexity, but if you just want to sell a thing (digital or otherwise), the process is relatively contained, but does require a server side aspect – which I've written up here as a node project.

<!--more-->

* Demo: https://stripe-demo.isthe.link
* Github source: https://github.com/remy/stripe-tutorial
* Live source: https://stripe-demo.isthe.link/_src

## The goal of this post

The end result should be an HTML page that includes Stripe's checkout button that allows your visitor to enter their card details for the given price and click "buy".

There will be a server side component that will receive the token that Stripe generates for you and the server side code will complete the payment transaction.

From there, the money will be in your Stripe account, and you'll need to handle (yourself) delivering the product (digital or otherwise) to your visitor and handling tax reporting (which I'll touch on at the end of this post).

## Assumptions

This guide assumes you're vaguely comfortable with JavaScript (via node) - or at least comfortable with copying and pasting! It also assumes you just want to sell a thing and don't want or need a fully managed system (for stock tracking etc), though of course you could add that, I'm just not going to cover it!

This guide will provide a strategy for testing the integration and releasing the integration (the different between test and live credentials), and I'll also show you how you can deploy it live.

This also assumes you're in one of the [25 countries that Stripe supports](https://stripe.com/global).

Finally, if you're based in Europe, you'll need to report VAT, and certainly in the UK regardless of whether you're VAT registered or not, you'll need to report [VATMOSS](https://www.freeagent.com/glossary/vat-moss/) – I'll explain at the end of this post how something I'm working on can help.

## 1. Get an account

Before you do anything, you'll need [a Stripe account](https://dashboard.stripe.com/register). The process is fairly painless, but requires a fair amount of information, including your company details (if applicable), address and so on.

Now you need to collect your [API keys](https://dashboard.stripe.com/account/apikeys).

It's worth creating a directory where your code will live. Then put the test keys in a file called `.dev.env` and the live keys in `.env` like such. We're also going to put the currency and the cost in here too:

```nohighlight
STRIPE_SECRET=sk_test_BQokikJOvBiI2HlWgH4olfQ2
STRIPE_PUBLIC=pk_test_6pRNASCoBOKtIshFeQd4XMUh
STRIPE_CCY=gbp
STRIPE_COST=999
```

Note that currency codes [ISO codes](https://support.stripe.com/questions/which-currencies-does-stripe-support#supportedcurrencies) (defaulting to USD) and the cost is in cents/pence, so the example value above is £9.99.

## 2. Use Stripe's Checkout

I've also assumed you've got some kind of product page, where you want your visitor to buy something, ebook, software, and so on. We're looking to add a "buy" button.

Stripe has an [embeddable checkout process](https://stripe.com/docs/checkout/tutorial#embedding). You add the embed form where you want your button to go, and Stripe will upgrade the form using JavaScript (note that this also assumes you're relying 100% on JavaScript to process the first step of payment).

I'm going to give you some boilerplate JavaScript that will allow you to serve this up and handle offline and online environment. For now, you'll want a product page (I've called mine `index.html`) with the checkout form:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My ebook</title>
</head>
<body>
  <h1>Buy "My Book"</h1>
  <p>It's all about me!</p>

  <!-- this is copied from the Stripe checkout embed -->
  <form action="/your-server-side-code" method="POST">
    <script
      src="https://checkout.stripe.com/checkout.js" class="stripe-button"
      data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
      data-amount="999"
      data-currency="EUR"
      data-name="My Company"
      data-description="My Book"
      data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
      data-locale="auto">
    </script>
  </form>
  <!-- end of Stripe embed -->

</body>
</html>
```

A few items to note:

1. The form `action`, we'll update this in a moment to point to your charge URL (we'll come on to this next).
2. There are values that we've repeated from the `.env` files, we'll update this later on so you manage it from a single point in the code.
3. `data-key` is your publishable key.
4. `data-amount` is in cents (or pennies), i.e. the price divided by 100, so the price above will show €9.99 (also because the `data-currency` is in Euros).
5. If you want to specify custom text in the button you'll need to add `data-label="My custom button text"`.
6. **I highly recommend** adding `data-zip-code="true"` to the form, it means Stripe will ask your user for their postal code which helps with evidence for taxation (particularly for VATMOSS).

Once you've got that working, and you're using your test publishable key, you should be able to simulate buying your thing using [Stripe's test card numbers](https://stripe.com/docs/testing#cards). For the non-US readers, scroll down a little on that link and you'll find country specific cards – I found this very useful for testing tax calculations later on in the process.

## 3. Completing the charge

Ignoring for a moment that we need to run this server code somewhere, the following code is all you need to complete handling the transaction. Note that the way the Stripe's Checkout works is that Stripe captures the visitor's card details and your server never see the the card (this is a **good thing**). Your server will receive a token, and that token is used to complete the transaction:

```js
// load the stripe module pass in your secret token
// this will configure the `stripe` object for your
// account that you created earlier
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// this function will charge the user's card,
// note that `req` is the http request, we'll
// see how to connect this all up later.
module.exports = (req) => {
  // the token is generated by Stripe and POST'ed
  // to the `action` URL in our form
  const token = req.body.stripeToken;

  // now we create a charge which returns a `promise`
  // so we need to make sure we correctly handle
  // success and failure, but that's outside of this
  // function (and we'll see it later)
  return stripe.charges.create({
    // ensures we send a number, and not a string
    amount: parseInt(process.env.STRIPE_COST, 10),
    currency: process.env.STRIPE_CCY,
    source: token,
    description: 'My Book', // 👈 remember to change this!
    // this metadata object property can hold any
    // extra private meta data (like IP address)
    metadata: {},
  });
}
```

The code above, plus the client side form is pretty much all you need to complete the charging process. However, you *do* need to wire this charge code into a web server. I'm going to use [Express](http://expressjs.com/) with some boilerplate code. If you're familiar with another web framework, do use that, and if you're not familiar with Express, there's plenty of [resources across the web](http://expressjs.com/en/resources/books-blogs.html).

I'll include the full code in a git repo for you to download and view, but the main route to handle the post is simply this:

```js
app.post('/charge', (req, res, next) => {
  charge(req).then(data => {
    res.render('thanks');
  }).catch(error => {
    res.render('error', error);
  });
});
```

On a successful `POST` to the `/charge` endpoint, the request is passed to our `charge` module (described by the previous code block) and if the promise succeeds, then we show the "thanks" page, otherwise we show the user the error - though I'd recommend checking the specific errors and showing a user friendly message rather than doing what I'm doing above and passing the error directly to the page.

*I'll publish a blog post next month on extending the charge process so you can capture information that's useful for EU tax reporting - just [subscribe](/subscribe) or [follow me on twitter](https://twitter.com/rem) for when it's released.*

## 4. Configuration

As I mentioned earlier that we would have a development configuration (via `.dev.env`) and production (via `.env`). You don't _have_ to do this of course, but it makes testing a little easier, and with Stripe in particular, you get two sets of API keys: one for testing, and one for actually taking money.

A regular pattern I use is to have these two files to control environments and conditionally load them depending on the value of `NODE_ENV`. The `NODE_ENV` is something we set in the environment when we run node.

For example, to set `NODE_ENV=production` on the command line you can run:

```bash
NODE_ENV=production node app.js
```

Inside our application code, we make use of a package called [dotenv](https://www.npmjs.com/package/dotenv) and load the `*.env` file as per:

```js
const dotenv = require('dotenv');
const envfile = process.env.NODE_ENV === 'production' ?
      '.env' :    // production
      '.dev.env'; // development

// load the contents of the env file into
// the `process.env` object.
dotenv.config({
  silent: true,
  path: `${__dirname}/${envfile}`,
});
```

**Importantly** this needs to be done _before_ you try to read any of the `process.env.*` values, like we do in the charge logic.

**Also importantly** these `.env` files contain private information. Do not put them somewhere that they can be read (note the ones I've show you so far use Stripe's own test API keys). This means: don't check these files into a public github repo, and don't put these files on the web where someone can read them.

## 5. Deploying

Now that you've got the logic pieces, we need to get the site on a URL for people to buy the thing. I'm currently very partial to [Zeit's now](https://zeit.co) platform ([I wrote about it recently](/2016/12/14/on-moving-from-heroku-to-now) and include some deploy tips).

However, and this is important, if you decide to use Zeit, but use a free tier (which is default), every file you deploy is public. So you'll need to remove your `.env` file, and set the environment values on the command line when you deploy. What's nice about using `process.env` for the values is that even though you'll remove the `.env` file, none of your code will need changing.

Firstly, create a file called `.gitignore` and include (at least) `.env` - this means git will ignore this file, but also Zeit's now command will not upload the file.

Using the following command will deploy using `now` and include all of your environment values as an argument (using `-e KEY=VALUE`) to the `now` command:

```bash
now $(sed -e 's/^/-e /' .env)
```

One caveat with the expression above: your `.env` file can't contain comments and can't contain spaces.

Or you can use a product like [surge.sh](https://surge.sh) or Heroku, or anything that you're comfortable with.

## 6. Tax

I mentioned tax. If you're in the EU (or…in the UK…#brexit), you'll need to report any EU based tax, which isn't terribly complicated, but fiddly for sure. In the UK this is known as VATMOSS, I'm sure it has equally confusing names in other EU states.

There's services available, and I've written my own focused mini product to do just that (of course, you'll need EU sales to see any data) over on [taxdo.eu](https://taxdo.eu). Taxdo is free right now (as I'm beta testing), but feel free to sign up and try (or send me feedback).

There's also products that will do the *whole* process for you, in particular [Quaderno](https://quaderno.io/stripe-vat-subscriptions/) (though I've not tried personally, their name constantly comes up in this area). If you want to learn more about VATMOSS, I highly recommend reading [Rachel Andrew's material](https://rachelandrew.co.uk/archives/tag/vat).

## Final notes

Hopefully you're now armed with the essential steps to start taking money on the web using Stripe. Again, all the [source code](https://github.com/remy/stripe-tutorial) is available and a [live instance is online](https://stripe-demo.isthe.link) for you to try out and test.
