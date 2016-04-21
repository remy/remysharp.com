# VATMOSS rules

I'm posting this only because I keep losing this simple VATMOSS logic, and my blog doubles as my online memory bank. It's also important for me to say **VATMOSS does not rule**, it's terrible.

Anyway, this is the logic that states when VAT should be applied to which kinds of customers.

<!--more-->

## What to capture

- COUNTRY
- VAT (optional and validated though all kinds of silly methods)

## Logic

This is from the perspective of being in the UK.

```text
IF country IS "GB"
  ADD_VAT
IF country IS IN (eu) AND vat IS EMPTY
  ADD_VAT
IF country IS IN (eu) AND vat IS NOT EMPTY
  DO_NOT_ADD_VAT
ELSE
  DO_NOT_ADD_VAT
```

Where to get latest EU VAT rates: http://jsonvat.com

Usual caveat's apply: *this not consistute as financial advice, if you copy and paste this and it's wrong, you're responsible!*
