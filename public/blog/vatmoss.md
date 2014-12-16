# VATMOSS

If you want a good foundation of understand for VATMOSS, then I highly recommend reading [Rachel Andrew's posts](http://rachelandrew.co.uk/archives/tag/vat).

That said, having read as much as I can around the web, I still don't feel like I have a good handle on this thing, but I'm posting this, partly to flesh out my thoughts, help others in the same situation, and probably rant.

We have to be VATMOSS ready by 1-Jan 2015. That's just over 2 weeks away.

## What is VATMOSS

In my own words, and my layman understanding:

Being in the UK and VAT registered, today I need to charge 20% VAT to all non VAT registered EU customers. Outside the EU, there's no VAT applied. If the customer is VAT registered, then I don't apply VAT.

This changes with VATMOSS, but only for those EU customers. Instead of charging UK 20% VAT, I must charge the individual their local VAT. So if the customer is German, I charge them 19% VAT.

## Technical considerations

There's a list of important technical items I need to check off to make sure I'm compliant:

- Collect *two* pieces of non-conflicting information that proves which EU member state the customer is in. This can be IP address (with country lookup), or bank country, or address, and so on. I believe Stripe has all this information for me and I don't need to collect anything extra.
- I need an up to date list of all the VAT rates for EU states. http://jsonvat.com is a good example of what I need, but it's maintained by an individual so I intend to use a copy of the file, and try, somehow, to manually stay on top of live updates via [VAT live](http://www.vatlive.com/vat-rates/european-vat-rates/eu-vat-rates/). Far from ideal.
- Since I have users that are subscribed to a subscription model, I need to shift them all off the existing 20% fixed VAT subscription and move them to the new system of dynamic VAT rates (and I'll email all those individuals to attempt to explain).
- I'm using [Stripe](https://stripe.com) for payment processing, so we're having to upgrade with the following logic:
  1. Add an addition invoice item to their initial subscription that adds VAT.
  2. When the `invoice.created` webhook comes in, only if the `data.paid` is `false` then add the VAT as an addition invoice item.

## Issues

1. I don't see any way to retrospectively ask my existing subscriptions for more information about their sign up. It's technically possibly that I capture their IP address in our application logs, and manually add them to our Stripe customers, but that's a messy process.
2. I read that the invoices have to adhere to the county's regulations. I've no idea what that is for all the countries. It was hard enough finding a list of the rates, let alone the invoice requirements.
3. We don't currently send out any emails from JS Bin on subscription renewal - I suspect that's a weak spot and we'll need to implement that.
4. A way to report for the EU MOSS return...sigh.

My biggest issue, and the one that's actually killing business in the UK, is the admin overhead of this change outweighs the benefits.

I've considered blocking EU members from subscribing (and therefore unsubscribing existing EU customers), but some "legislation (eg anti discrimination) may apply".

I've considered just killing the business side of JS Bin because this whole process is so disheartening.

I've joked about charging a flat 25% VAT (as this is the highest) and intentionally reporting the wrong TAX to the VAT office. Historically if they owe you money, the VAT office is horrible to work with (whereas if you owe them money, they're particularly efficient), so maybe this is a clean simple "solution".

I've looked at [Quaderno](http://quaderno.io) and [Taxamo](http://www.taxamo.com/), but the technical implementation isn't our issue - it's the business admin. I'm also wary of changing our existing UX for the upgrade process, asking for a tonne more information seems overkill and unnecessary, and only required to satisfy these over the top legislations.

## In closing

VATMOSS is a total mess. It's even more concerning that the details haven't [even been fleshed](https://www.enterprisenation.com/blog/posts/exclusive-hmrc-update-on-vat-moss) out yet with 2 weeks to go (notice the post says they're going to post detailed guidance...).

I'm reviewing Quaderno right now, but the more I look the more I feel like our bespoke solution is the right way to go.

However, this does leave a very sour taste in my mouth for running more business online, and it's further support that the UK government does not care anywhere near as much as it should, about entrepreneurship in the UK.

This legislation is killing business in the UK.