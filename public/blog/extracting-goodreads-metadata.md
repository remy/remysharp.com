---
title: Extracting Goodreads metadata
date: '2020-01-06 12:00:00'
tags:
  - code
---

# Extracting Goodreads metadata

This week I posted the list of books and the reviews for 2019, but in addition, I also published [the decades](/2020/01/02/books-i-read-in-2019#books-by-decade) the books were published. That information wasn't so easy to extract from Goodreads, so I'm writing up for when I need it again in 12 months.

<!--more-->

## Overview

I'm using a Mac, but all the tools I use are on the command line. For this process to work you'll need (or _I'll_ need):

- [jq](https://stedolan.github.io/jq/download/) installed (or use [jqterm.com](https://jqterm.com))
- [xml-to-json-fast](https://github.com/sinelaw/xml-to-json-fast) - there's nothing specific about this XML to JSON tool, just that's what worked for me
- A [Goodreads](https://www.goodreads.com) account and an [API key](https://www.goodreads.com/api/keys) - if only to get metadata about a book title

For this you'll need a Goodreads account and the titles of your books. I actually go a step further and use the reviews I've posted on Goodreads to source the book titles from the previous year, but it's not entirely required.

The process will run do the following:

1. Hit the Goodreads search API for the title of your book
2. Convert the search result from XML to JSON
3. _Slurp_ the JSON and transform to HTML/Markdown reorganised by decade and year

## 1. Getting the year from Goodreads

Using the source title list, we'll generate a list of `curl` requests that hit the [search.books](https://www.goodreads.com/api/index#search.books) API and convert from XML to JSON. This is the first `jq` command I'll use:

```jq
split("\n")[] | @uri"curl -s \"https://www.goodreads.com/search/index.xml?key=${YOUR_API_KEY}&q=\(.)\" | xml-to-json-fast | jq -r -f book-year.jq"
```

This takes a list of titles as a source and generates a long list of `curl` requests. Note that I'm assuming the `YOUR_API_KEY` is inserted, also that I'm using [xml-to-json-fast](https://github.com/sinelaw/xml-to-json-fast) and finally that the XML output is being piped to a `jq` script called `book-year.jq` which I'll show you next.

You can [see how this looks](https://jqterm.com/17d629b6c173c224232f8686a45a2998?query=split%28%22%5Cn%22%29%5B%5D%20%7C%20%40uri%22curl%20-s%20%5C%22https%3A%2F%2Fwww.goodreads.com%2Fsearch%2Findex.xml%3Fkey%3D%24%7BYOUR_API_KEY%7D%26q%3D%5C%28.%29%5C%22%20%7C%20xml-to-json-fast%20%7C%20jq%20-r%20-f%20book-year.jq%22&slurp=true&raw-input=true&raw=true) - note that both input is _slurped_ and _raw_ and the output is _raw_. This output I've saved to a single `get-years.sh` and then on my command line I'll run `sh get-years.sh` so the whole command runs at once.

Before I run this code, I need to create the `book-year.jq` script.

## 2. Extracting the year

In a file in the current working directory a called called `book-year.jq` will contain:

```jq
def mapper:
  if type == "object" and .items then
    { (.name): .items[-1] | mapper }
  elif type == "array" then
	  reduce .[] as $el ({}; . + { ($el.name): $el.items[-1] | mapper } )
  else
    .
  end
;

.items[1].items |
last.items[0].items |
mapper + (.[-1].items | mapper) |
{ title, year: .original_publication_year, author: .author.name }
```

This script will take the JSON output from `xml-to-json-fast` and transform it into a single object that contains the `title, year, author`.

As this script is run multiple times, I'll put all the `curl` commands into a single bash script - that way I can either abort the process or more importantly, I can capture the output in a single file.

```bash
sh capture-book-year.sh > book-years.json
```

Once the process finishes you should have a file that looks a bit like this:

```json
{
  "title": "Skipping Christmas",
  "year": "2001",
  "author": "John Grisham"
}
{
  "title": "Death's End (Remembrance of Earth’s Past #3)",
  "year": "2010",
  "author": "Liu Cixin"
}
{
  "title": "The Afterlife of Walter Augustus",
  "year": "2018",
  "author": "Hannah M. Lynn"
}
{
  "title": "Miss Pettigrew Lives for a Day",
  "year": "1938",
  "author": "Winifred Watson"
}
{
  // and so on
}
```

The important thing to note is that this is not valid JSON - it is actually a stream of JSON objects, but jq is fine with consuming a stream.

One final touch: the Goodreads API is not great and in fact it can be missing some data at random. In my case, 3 of the 27 titles I sent to their API was missing a year, so I had to manually add those myself. To find any missing years, you can run the following on the command line:

```sh
cat book-year.json| jq 'select(.year == null)'
```

Then edit `book-year.json` directly adding in the missing data.

## 3. Transforming to readable content

The aim is to restructure the data so that the books are grouped into their decades and then sorted by year. To do this I need to add the decade to each title and then reduce the dataset into a decaded _keyed_ object.

The jq command needs to _slurp_ the source JSON using the `--slurp` flag:

```sh
cat book-year.json | jq --slurp '…'
```

The following can transform the JSON into the "right" structure:

```jq
map({
  # construct a title prop that is: "[year]: [title] by [author]"
  title: "\(.year): \(.title) by \(.author)",
  # to get the decade I slice first 3 year chars + "0"
  key: (.year | .[:3] + "0")
}) |

# sort by the decade
sort_by(.key) |

# reduce to { [decade]: [ { [year]: [title] }, …], … }
reduce .[] as $e (
  {};
  . + { "\($e.key)": (.["\($e.key)"] + [$e.title] | sort ) }
)
```

You can see the code above [running in jqterm here](https://jqterm.com/9997b9955515e24339d1a0f80b7cbfa9?query=map%28%7B%0A%20%20title%3A%20%22%5C%28.year%29%3A%20%5C%28.title%29%20by%20%5C%28.author%29%22%2C%0A%20%20key%3A%20%28.year%20%7C%20.%5B%3A3%5D%20%2B%20%220%22%29%0A%7D%29%20%7C%0A%0Asort_by%28.key%29%20%7C%0A%0Areduce%20.%5B%5D%20as%20%24e%20%28%0A%20%20%7B%7D%3B%0A%20%20.%20%2B%20%7B%20%22%5C%28%24e.key%29%22%3A%20%28.%5B%22%5C%28%24e.key%29%22%5D%20%2B%20%5B%24e.title%5D%20%7C%20sort%20%29%20%7D%0A%29&slurp=true). The result is now structured the way I want for posting:

```json
{
  "1920": [
    "1921: We by Yevgeny Zamyatin"
  ],
  "1930": [
    "1938: Miss Pettigrew Lives for a Day by Winifred Watson"
  ],
  "1950": [
    "1953: Fahrenheit 451 by Ray Bradbury",
    "1954: I Am Legend by Richard Matheson",
    "1954: Lord of the Flies by William Golding",
    "1955: The Chrysalids by John Wyndham"
  ]
}
```

The final part (for me) is to transform this into markdown so that I can paste it into my blog post by adding the following line to my code and selecting the output as "raw":

```jq
to_entries | map("## \(.key)\n- \(.value | join("\n- "))\n")[]
```

The result is now ready for my blog post:

```markdown
## 1920
- 1921: We by Yevgeny Zamyatin

## 1930
- 1938: Miss Pettigrew Lives for a Day by Winifred Watson

## 1950
- 1953: Fahrenheit 451 by Ray Bradbury
- 1954: I Am Legend by Richard Matheson
- 1954: Lord of the Flies by William Golding
- 1955: The Chrysalids by John Wyndham
```

You can tinker [with the final result](https://jqterm.com/9997b9955515e24339d1a0f80b7cbfa9?query=map%28%7B%0A%20%20title%3A%20%22%5C%28.year%29%3A%20%5C%28.title%29%20by%20%5C%28.author%29%22%2C%0A%20%20key%3A%20%28.year%20%7C%20.%5B%3A3%5D%20%2B%20%220%22%29%0A%7D%29%20%7C%0A%0Asort_by%28.key%29%20%7C%0A%0Areduce%20.%5B%5D%20as%20%24e%20%28%0A%20%20%7B%7D%3B%0A%20%20.%20%2B%20%7B%20%22%5C%28%24e.key%29%22%3A%20%28.%5B%22%5C%28%24e.key%29%22%5D%20%2B%20%5B%24e.title%5D%20%7C%20sort%20%29%20%7D%0A%29%20%7C%0A%0Ato_entries%20%7C%20map%28%22%23%23%20%5C%28.key%29%5Cn-%20%5C%28.value%20%7C%20join%28%22%5Cn-%20%22%29%29%5Cn%22%29%5B%5D&slurp=true&raw=true). I hope this was useful, albeit, in parts!
