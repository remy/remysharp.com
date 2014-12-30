# VATMOSS: the misunderstanding of "proof"

When you apply EU VAT, you need to be sure of your customer's EU state. Indeed, you'll be asked for **two non-conflicting pieces of proof**. I'm unsure if this is a VATMOSS thing or EU VAT, but it doesn't really matter.

There was a recent clarification allowing companies to use one of [five presumptions for choosing location of residency](http://www.vatlive.com/eu-vat-rules/2015-digital-services-moss/location-of-customer-moss-2015/), but when I asked Rachel Andrew's opinion of the first draft of this post, she pointed out that the presumptions are for *fixed lined services* only (referring to notes that I can't see), but she's right.

<!--more-->

These presumptions are utterly useless to any normal small business running a web site. In fact, I'd argue that any service that can ascertain whether their customer is connected using a fixed land line or a mobile network (i.e. an ISP, Telecom provider or broadcaster) is not "mini" enough for a Mini One Stop Shop.

## 2 non-conflicting pieces of location data

The proof required for any web site selling digital products or services is 2 pieces of data, but if these are in conflict (i.e. the country doesn't match up) then you'll need a 3rd.

This is actually a bit of joke, because if the 3rd is also in conflict, you need another until you do actually have to items of data that resolves to a single country.

The suggestions of what this can be are actually a bit wishy-washy. You're fine if your first 2 items match, but getting a 3rd is the problem.

Here are the suggestions from HMRC:

> Any two pieces of non-contradictory evidence such as, IP address, bank account address or SIM card identifier code will suffice. – @HMRCcustomers

*[Source: Twitter, November 27, 2014](https://twitter.com/HMRCcustomers/status/537996346838761472)*

This has been further clarified by others to this list (which you'll see most posts suggesting):

Let's separate this list into what we can feasibly collect before the transaction occurs.

### Available before

* The billing address of the customer
* The Internet Protocol (IP) address of the device used by the customer
* Other commercially relevant information (for example, product coding information which electronically links the sale to a particular jurisdiction)

"Other commercially relevant information" is hand-wavy for "anything else". This is very, *very* specific to the product type. If your product has some kind of localised version or link to a particular jurisdiction, then great. However, **most services will only have the first two options available**.

### Available after

That leaves the following available *after* the customer has completed the transaction (though technically they can be collected before the transaction executes).

* The country code of SIM card used by the customer
* The location of the customer's fixed land line through which the service is supplied
* Location of the bank

SIM card is only available if you implement an extra SMS verification process ([Taxamo provide this as extra service](https://dashboard.taxamo.com/apidocs/api/v1/verification/docs.html)) - but it's a rare to have this technology available, plus the technical expertise to implement puts this out of reach for most small businesses.

Knowledge of the customer's fixed land line will *never* be available to web sites (again, this is fixed line services as mentioned at the start of this post).

So we're left with "location of the bank". I believe **if you have the bank location, you shouldn't need anything else**.

## Example case study

Jane living in the UK, working for Italian company Air Italy (the airline) as a developer and she needs a subscription to my product.

My product is going to get for 3 pieces of information on purchase of my product:

1. The billing address of the debit or credit card used
2. Her IP address run against a geoip lookup database (ie. to best guess her location)
3. The telephone landline number (using the country code from the phone number)

As the address the web site asks for, she puts the company head office address (she's guessing and assuming that this is actually the billing address, but she's unsure), her company uses a VPN to access the internet through their ISP and the landline number is +44...

The result is:

1. The billing address resolves to Italy
2. IP address resolves to Switerland (equally Jane could be travelling)
3. The phone number resolves to the UK

However, as she pays she has *two* options:

1. Use her personal bank card
2. Use the business bank card

If she uses her personal bank card, the country location is UK, and the money she has in her UK bank account is taxed under UK tax law.

If she uses her business bard card, then country location it Italy, and the money (in that bank account) is correctly taxed under Italian tax law.

Making the initial 3 pieces of information utterly redundant, and the card country origin the ultimate source of truth.

## The ultimate source of truth

Some businesses won't be able to get the card holder bank origin before actually applying the correct VAT. In this case, then you have to make the assumption based on the non-conflicting data.

However, if you're using a system like Stripe (as I am), then you get full details about the card data **before** you finalise the transaction cost.

If the bank that holds the card is based Italy (for instance) then the individual who opened the account must provide proof of citizenship to their Italian bank or if it was opened by a business, then the business must legally operate in that country.

Both of these facts require that the individual or business pay taxes in Italy, and **therefore if the card says it's registered in Italy, there's no other option that to charge them Italian VAT rates**.

Therefore: if you have the card country origin, you **don't need anything else**.


---

I've no idea how, but I'd love to see this proposed to the HMRC and HM Treasury groups that are discussing these problems behind closed doors.







