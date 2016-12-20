# Beginners guide to Stripe integration

I've used Stripe on a number of projects in varying levels of complexity, but if you just want to sell a thing (digital or otherwise), the process is relatively contained, but does require a server side aspect – which I've written up here as a node project.

<!--more-->

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
STRIPE_SECRET=sk_test_XXXXXXXXXXXXX
STRIPE_PUBLIC=pk_test_XXXXXXXXXXXXX
STRIPE_CCY=EUR
STRIPE_COST=999
```

Note that currency codes [ISO codes](https://support.stripe.com/questions/which-currencies-does-stripe-support#supportedcurrencies) (defaulting to USD) and the cost is in cents/pence, so the example value above is €9.99.

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

Demo: https://stripe-demo.isthe.link/
Source: https://stripe-demo.isthe.link/_src/
