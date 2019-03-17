---
title: VATMOSS rules
date: '2016-04-21 15:37:29'
modified: '2016-04-28 18:19:28'
tags:
  - business
published: true
---
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

## Data

List of EU countries and ISO codes (from [GOV.UK](https://www.gov.uk/eu-eea)):

Austria `AT`, Belgium `BE`, Bulgaria `BG`, Croatia `HR`, Republic of Cyprus `CY`, Czech Republic `CZ`, Denmark `DK`, Estonia `EE`, Finland `FI`, France `FR`, Germany `DE`, Greece `EL`, Hungary `HU`, Ireland `IE`, Italy `IT`, Latvia `LV`, Lithuania `LT`, Luxembourg `LU`, Malta `MT`, Netherlands `NL`, Poland `PL`, Portugal `PT`, Romania `RO`, Slovakia `SK`, Slovenia `SI`, Spain `ES`, Sweden `SE` and the UK `GB`.

```js
var EU = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL', 'ES', 'FI', 'FR', 'GB', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];
```

Where to get latest EU VAT rates: http://jsonvat.com

---

Usual caveat's apply: *this not consistute as financial advice, if you copy and paste this and it's wrong, you're responsible!*
