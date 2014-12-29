# VATMOSS: "proof"

To "correctly" apply the right amount of VAT in light of recent EU VAT changes you now only need to capture one piece of proof to support your VAT selection.

Your options are "simple", that is, assuming you're an Internet Service Provider. In reality even for a tech savvy company like myself, the "Five Presumptions for choosing location of residency" are [frankly a joke](http://www.vatlive.com/eu-vat-rules/2015-digital-services-moss/location-of-customer-moss-2015/). The include things like this:

> If the services are provided through mobile networks, the customer is presumed to reside in the same country as that of the SIM card code

And how exactly is the web site supposed to get the SIM card code? Sure...

## The backup

The official alternative if you're not an ISP with insane access to things like whether "services are provided through a fixed landline" or not, is to capture **2 non-conflicting pieces of location data**, then a 3rd piece in case the first two are in conflict.

However, I believe this to be futile. The first issue is if the first 2 pieces of location data are in conflict, there's a decent chance that the 3rd piece will also be in conflict, and how you've got a bunch of data none of which actually tells you anything.

More importantly, I believe **if you have the bank location, you shouldn't need anything else**.

## The ultimate source of truth

Some businesses won't be able to get the card holder bank origin before actually applying the correct VAT. In this case, then you have to make the assumption based on the "non-conflicting data".

However, if you're using a system like Stripe (as I am), then you get full details about the card data **before** you finalise the transaction cost.

If the bank that holds the card is based Spain (for instance) then the individual who opened the account must provide proof of citizenship or if it was opened by a business, then the business must legally operate in that country.

Both of these facts require that the individual or business pay taxes in Spain, and **therefore if the card says it's registered in Spain, there's no other option that to charge them Spanish VAT rates**.

Therefore: if you have the card country origin, you **don't need anything else**.

## Example case study

Say Jane is British, working and living in Italy for Air Italy (the airline) as a developer and she needs a subscription to my product.

My product is going to get for 3 pieces of information on purchase of my product:

1. The billing address of the debit or credit card used
2. Her IP address run against a geoip lookup database (ie. to best guess her location)
3. The telephone landline number (using the country code from the phone number)

As the address the web site asks for, she puts her home address (due to bad web site copy), her company uses proxies for web traffic and the landline number is +39...

The result is:

1. The address resolves to the UK
2. IP address resolves to Switerland
3. The phone number resolves to Italy

However, as she pays she has *two* options:

1. Use her personal bank card
2. Use the business bank card

If she uses her personal bank card, the country location is UK, and the money she has in her UK bank account is taxed under UK tax law.

If she uses her business bard card, then country location it Italy, and the money (in that bank account) is correctly taxed under Italian tax law.

Making the initial 3 pieces of information utterly redundant, and the card country origin the ultimate source of truth.

---

I've no idea how, but I'd love to see this proposed to the HMRC and HM Treasury groups that are discussing these problems behind closed doors.







