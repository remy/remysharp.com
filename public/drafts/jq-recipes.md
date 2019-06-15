---
title: jq recipes
date: '2018-01-06 17:08:36'
modified: '2018-11-28 11:05:55'
complete: false
inprogress: true
tags:
  - code
draft: true
---

# jq recipes

All demos link to [jqterm](https://jqterm.com) - an alternative interactive jq web terminal with autocomplete (and faster querying with large datasets as they're cached online in private gists).

Here's a collection of jq recipes I've collected over the last few months.

---

Push on to an existing array (where source is `[1, 2, 3]`{id="demo-1"}):

```jq {data-source="#demo-1"}
. + [ 4 ] # result: [ 1, 2, 3, 4 ]
```

[Demo](https://jqterm.com/b3ca6e14912df02a8df7e634146f41b8?query=.%20%2B%20%5B4%5D)

---

Convert object to array, moving the key into the array item under the property
`slug`:

```jq
to_entries | map_values(.value + { slug: .key })
```

[Demo](https://jqterm.com/#!/155c8ee00d2584c70846bc7bfaac067a?query=to_entries%20%7C%20map_values%28.value%20%2B%20%7B%20slug%3A%20.key%20%7D%29)

---

Convert an array to a keyed object (the inverse of the above example):

```jq
map({ (.slug): . }) | add
```

[Demo](https://jqterm.com/#!/8105d5a8a4a0ec564c68508063a40aac?query=map%28%20%7B%20%28.slug%29%3A%20.%20%7D%20%29%20%7C%20add)

---

Swap the key/value pair to read as value/key object:

```jq
to_entries | map( {(.value) : .key } ) | add
```

[Demo](https://jqterm.com/#!/1b750d01608dc8c86e2320e4b7fb8e3a?query=to_entries%20%7C%20map%28%20%7B%28.value%29%20%3A%20.key%20%7D%20%29%20%7C%20add)

---

Read a plain list of strings from a file into an array, specifically splitting into an array and removing the last empty `\n`:

```bash
echo "1\n2\n3" | jq --slurp --raw-input 'split("\n")[:-1]'
```

[Demo](https://jqterm.com/456b1123085c3fa11b888fe376342a55?query=split%28%22%5Cn%22%29%5B%3A-1%5D&slurp=true&raw-input=true)

---

Convert a plain list of timestamps to an array of objects with date and time separated (using jq's `--slurp` and `--raw-input` options combined):

```bash
cat timestamps.txt | jq --slurp --raw-input 'split("\n")[:-1] | map({
	date: (. | strptime("%a, %d %b %Y %H:%M:%S") | todate[0:10]),
	time: (. | strptime("%a, %d %b %Y %H:%M:%S") | todate[11:19])
})'
```

[Demo](https://jqterm.com/e4ec7b09e9cca48a9569264f569bba9b?query=split%28%22%5Cn%22%29%5B%3A-1%5D%20%7C%20map%28%7B%20%0A%20%20date%3A%20%28.%20%7C%20strptime%28%22%25a%2C%20%25d%20%25b%20%25Y%20%25H%3A%25M%3A%25S%22%29%20%7C%20todate%5B0%3A10%5D%29%2C%0A%20%20time%3A%20%28.%20%7C%20strptime%28%22%25a%2C%20%25d%20%25b%20%25Y%20%25H%3A%25M%3A%25S%22%29%20%7C%20todate%5B11%3A19%5D%29%20%0A%7D%29&slurp=true&raw-input=true)

---

From a plain list of timestamps, count the occurrences of unique days (the first part is from the example above):

```jq
split("\n")[:-1] | map({
  date: (. | strptime("%a, %d %b %Y %H:%M:%S") | todate[0:10]),
  time: (. | strptime("%a, %d %b %Y %H:%M:%S") | todate[11:19])
}) | reduce .[] as $item (
  {}; # initial value
  .[$item.date] += 1 # reducer
)
```

[Demo](https://jqterm.com/e4ec7b09e9cca48a9569264f569bba9b?query=split%28%22%5Cn%22%29%5B%3A-1%5D%20%7C%20map%28%7B%20%0A%09date%3A%20%28.%20%7C%20strptime%28%22%25a%2C%20%25d%20%25b%20%25Y%20%25H%3A%25M%3A%25S%22%29%20%7C%20todate%5B0%3A10%5D%29%2C%0A%09time%3A%20%28.%20%7C%20strptime%28%22%25a%2C%20%25d%20%25b%20%25Y%20%25H%3A%25M%3A%25S%22%29%20%7C%20todate%5B11%3A19%5D%29%20%0A%7D%29%20%7C%20reduce%20.%5B%5D%20as%20%24item%20%28%0A%09%7B%7D%3B%0A%20%20%09.%5B%24item.date%5D%20%2B%3D%201%0A%29&slurp=true&raw-input=true)

---

Take an object with two similar objects, but separated between team and
formerly, and merge into a single object, adding a flag for all those from the
formerly group:

```jq
[.team, (.formerly | map(. + {formerly: true }))] | flatten
```

[Demo](https://jqterm.com/#!/d86a7fa855323ee5b3f9c5cf754099fe?query=%5B.team%2C%20%28.formerly%20%7C%20map%28.%20%2B%20%7Bformerly%3A%20true%20%7D%29%29%5D%20%7C%20flatten)

---

Download and extract all the files from a gist:

```bash
eval "$(
  curl https://api.github.com/gists/968b8937a153127cfae4a173b6000c1e |
  jq -r '
    .files |
    to_entries |
    .[].value |
    @sh "echo \(.content) > \(.filename)"
  '
)"
```

[Demo](https://jqterm.com/2ec37d92242d8457b919011bc023511e?query=.files%20%7C%20to_entries%20%7C%20.%5B%5D.value%20%7C%20@sh%20%22echo%20%5C%28.content%29%20%3E%20%5C%28.filename%29%22&raw=true)

---

Update all outdated npm dependencies to latest (possibly unsafe as it'll also update to major changes):

```bash
npm i $(echo $(npm outdated --json | jq -r 'to_entries | .[] | "\(.key)@\(.value.latest)"'))
```

Change the above from `.latest` to `.wanted` for a _safe_ upgrade.

[Demo](https://jqterm.com/#!/d7f34556e41e69568d10b5bc511fba68?query=to_entries%20%7C%20.%5B%5D%20%7C%20%22%5C%28.key%29@%5C%28.value.latest%29%22&raw=true)

---

Install the dependencies from one node project to another:

```bash
npm i $(cat ../other-project/package.json| jq '.dependencies | keys[]' -r)
```

[Demo](https://jqterm.com/#!/52dc3f83ee31266c193bd3d77311e93d?query=.dependencies%20%7C%20keys%5B%5D&raw=true)

---

Add a new property to every object:

```jq
map(. + { "draft": true })
```

Or

```jq
[.[] | . + { "draft" : true }]
```

[Demo](https://jqterm.com/#!/8e8dd22be903e002b418be272a2f8cf0?query=map%28.%20%2B%20%7B%20%22draft%22%3A%20true%20%7D%29)

---

Add new property to every object in a nested object, i.e. source looks like:

```json{id="demo-new-prop-1"}
{
 "offline-panel": {
    "title": "Offline Panel",
    "tags": [
      "web"
    ]
  },
  "rewrite-it": {
    "title": "Let's just rewrite it",
    "tags": [
      "business"
    ]
  }
}
```

Command:

```jq{data-source="#demo-new-prop-1"}
with_entries(.value += { "draft": true})
```

[Demo](https://jqterm.com/#!/c64de24dcdf718b3c9e32b7cef54c49f?query=with_entries%28.value%20%2B%3D%20%7B%20%22draft%22%3A%20true%7D%29)


---

Remove a property from a nested object (example as above):

```jq{data-source="#demo-new-prop-1"}
with_entries(.value |= del(.title))
```

[Demo](https://jqterm.com/#!/31652f74d0f513ae4e7d0e2a6430b80d?query=with_entries%28.value%20%7C%3D%20del%28.title%29%29)

---

List all the dependencies in a `package.json` for use in other commands, like `npm uninstall`:

```bash
echo $(cat package.json | jq '.dependencies | keys | .[] | "\(.)"' -r)
```

[Demo](https://jqterm.com/#!/91ad0e49459c2e6e41db363ca228574d?query=.dependencies%20%7C%20keys%20%7C%20.%5B%5D%20%7C%20%22%5C%28.%29%22&raw=true)

---

Get mongodb data into jq compatible format:

```bash
mongo <host>/<db> --norc --username <user> --password <pwd> \
  --eval 'printjson(db.getCollection("users").find().toArray())' | \
  jq '.[]'
```

---

From Twitter's API, take all DM received and sent and transform into readable format sorted by date order:

```jq
[ .[] | {
  text,
  date: .created_at,
  from: { screen_name: .sender.screen_name },
  to: { screen_name: .recipient.screen_name}
} ] |
sort_by(.date)
```

---

Using Serverless and Next.js and working out which dependencies I need to force include (because they live in the `.next` directory):

```bash
$ depcheck --json |
  jq '
    .using |
    [
      to_entries[] |
      select(.value[] | contains("/.next/")) |
      .key
    ] |
    unique |
    sort[] | "- \(.)"
  ' -r
```

Note: also uses [depcheck](https://www.npmjs.com/package/depcheck) to resolve the npm dependencies.

[Demo](https://jqterm.com/#!/dd6eb7b65d9c5a966919644b2ed60e57?query=.using%20%7C%20%5Bto_entries%5B%5D%20%7C%20select%28.value%5B%5D%20%7C%20contains%28%22/.next/%22%29%29%20%7C%20.key%5D%20%7C%20unique%20%7C%20sort%5B%5D%20%7C%20%22-%20%5C%28.%29%22&raw=true)

---

From a nested tree of objects, find the object whose `id` matches X:

```bash
curl -sL https://git.io/vxPyi | \
  jq '.. | objects | select(.id == "0:16")'
```

[Demo](https://jqterm.com/#!/d0619b651ba710d41878260f5947b98a?query=..%20%7C%20objects%20%7C%20select%28.id%20%3D%3D%20%220%3A16%22%29)

---

Strip all occurrences of a property (`email` in this example):

```jq
walk(if type == "object" then . | del(.email) else . end)
```

Note that the `walk` function is missing from jq@1.5 and needs to be added (seen in demo).

[Demo](https://jqterm.com/#!/5720a29ba9992666879ce0f915ab2208?query=%23%20walk%20was%20removed%20from%20jq%401.5%0Adef%20walk%28f%29%3A%0A%20%20.%20as%20%24in%0A%20%20%7C%20if%20type%20%3D%3D%20%22object%22%20then%0A%20%20%20%20%20%20reduce%20keys%5B%5D%20as%20%24key%0A%20%20%20%20%20%20%20%20%28%20%7B%7D%3B%20.%20%2B%20%7B%20%28%24key%29%3A%20%20%28%24in%5B%24key%5D%20%7C%20walk%28f%29%29%20%7D%20%29%20%7C%20f%0A%20%20elif%20type%20%3D%3D%20%22array%22%20then%20map%28%20walk%28f%29%20%29%20%7C%20f%0A%20%20else%20f%0A%20%20end%3B%0A%0Awalk%28if%20type%20%3D%3D%20%22object%22%20then%20.%20%7C%20del%28.email%29%20else%20.%20end%29)

---

Bulk insert into elastic search using a vanilla JSON array, i.e. [1,2,3,4] - zipping the array with the required elastic search metadata:

```bash
$ cat data.json | \
  jq 'reduce .[] as $n ([]; . + [{ "index" : { "_index": "my-index", "_type" : "my-type" } }, $n]) | .[]' -c | \
  curl -H "Content-Type: application/x-ndjson" -XPOST http://localhost:9200/_bulk --data-binary "@-"
```

[Demo](https://jqterm.com/#!/5016c9cd4d23cfad99f777e4d17560b3?query=reduce%20.%5B%5D%20as%20%24n%20%28%5B%5D%3B%20.%20%2B%20%5B%7B%20%22index%22%20%3A%20%7B%20%22_index%22%3A%20%22my-index%22%2C%20%22_type%22%20%3A%20%22my-type%22%20%7D%20%7D%2C%20%24n%5D%29%20%7C%20.%5B%5D)

---

Filter an array, similar to a JavaScript array filter:

```jq
def filter(cond): map(select(cond));

filter(. > 2)
```

[Demo](https://jqterm.com/b8a26d58f0d42ff9fb51bcb33eed0ad9?query=def%20filter%28cond%29%3A%20map%28select%28cond%29%29%3B%0A%0Afilter%28.%20%3E%202%29)

---

Converting a text output of columns and converting to a JSON object. In this case, running Zeit's `now ls | jq --raw-input --slurp` to find out how many running instance I have:

```jq
split("\n")[1:-3] | # split into an array of strings, removing the 1st and last few blank lines
map([ split(" ")[] | select(. != "") ]) | # convert large spaces into individual colmns
map({ # map into a usable object
  app: .[0],
  url: .[1],
  number: (if (.[2] == "-") then .[2] else .[2] | tonumber end),
  type: .[3],
  state: .[4],
  age: .[5]
}) |
# now I can query the result - in this case: how many running and are npm
map(select(.number > 0 and .type == "NPM")) | length
```

[Demo](https://jqterm.com/04157437953546ba69e57cd19581299d?query=split%28%22%5Cn%22%29%5B1%3A-3%5D%20%7C%20%23%20split%20and%20trim%20the%20lines%0Amap%28%5B%20split%28%22%20%22%29%5B%5D%20%7C%20select%28.%20!%3D%20%22%22%29%20%5D%29%20%7C%20%23%20break%20in%20to%20columns%0Amap%28%7B%20%0A%20%20app%3A%20.%5B0%5D%2C%20%0A%20%20url%3A%20.%5B1%5D%2C%20%0A%20%20number%3A%20%28if%20%28.%5B2%5D%20%3D%3D%20%22-%22%29%20then%20.%5B2%5D%20else%20.%5B2%5D%20%7C%20tonumber%20end%29%2C%20%0A%20%20type%3A%20.%5B3%5D%2C%20%0A%20%20state%3A%20.%5B4%5D%2C%20%0A%20%20age%3A%20.%5B5%5D%20%0A%7D%29%20%7C%0Amap%28select%28.number%20%3E%200%20and%20.type%20%3D%3D%20%22NPM%22%29%29%20%7C%20length&slurp=true&raw-input=true)

---

Find duplicates in an array based on a key:

```jq
[
  reduce .[].id as $item (
    {}; # initial value
    .[$item] += 1
  ) | to_entries[] | select(.value > 1)
] | from_entries
```

[Demo](https://jqterm.com/511d71a5f8414b87ee909fb27c00bdaf?query=%5B%20%0A%09reduce%20.%5B%5D.id%20as%20%24item%20%28%0A%09%20%20%7B%7D%3B%20%23%20initial%20value%0A%09%20%20.%5B%24item%5D%20%2B%3D%201%0A%09%29%20%7C%20to_entries%5B%5D%20%7C%20select%28.value%20%3E%201%29%0A%5D%20%7C%20from_entries)

---

Quickly convert a list of strings into an array (for JavaScript dev, etc):

```bash
$ pbpaste | jq -Rs 'split("\n")' | pbcopy
```

[Demo](https://jqterm.com/712b04bcc859bdae9a3393e0b6f3505b?query=split%28%22%5Cn%22%29&slurp=true&raw-input=true)

---

Strip empty strings from arrays (at any level deep):

```jq
walk(if type == "array" then map(select(length > 0)) else . end)
```

Note that this requires the `walk` method (that was removed in jq@1.5) but included in the demo below

[Demo](https://jqterm.com/cc83a3d78ac417bc2af3541a6047160b?query=def%20walk%28f%29%3A%0A%20%20.%20as%20%24in%0A%20%20%7C%20if%20type%20%3D%3D%20%22object%22%20then%0A%20%20%20%20%20%20reduce%20keys%5B%5D%20as%20%24key%0A%20%20%20%20%20%20%20%20%28%20%7B%7D%3B%20.%20%2B%20%7B%20%28%24key%29%3A%20%20%28%24in%5B%24key%5D%20%7C%20walk%28f%29%29%20%7D%20%29%20%7C%20f%0A%20%20%20%20elif%20type%20%3D%3D%20%22array%22%20then%20map%28%20walk%28f%29%20%29%20%7C%20f%0A%20%20%20%20else%20f%0A%20%20%20%20end%3B%0A%0Awalk%28if%20type%20%3D%3D%20%22array%22%20then%20map%28select%28length%20%3E%200%29%29%20else%20.%20end%29)

---

Install my missing dependencies (determined by using depcheck):

```jq
.missing | to_entries | map(.key) | join(" ") | "npm i \(.)"
```

[Demo](https://jqterm.com/237e26cc89e48bc03b2a69d525b017ae?query=.missing%20%7C%20to_entries%20%7C%20map%28.key%29%20%7C%20join%28%22%20%22%29%20%7C%20%22npm%20i%20%5C%28.%29%22&raw=true)

---

How to avoid non-existant keys when filtering for `null`. Where `endpoint` is sometimes missing, sometimes it's set to `null` and I want those objects. First ensure the key is present, then select if `null`:

```jq
map(select(has("endpoint") and .endpoint == null))
```

[Demo](https://jqterm.com/ff4823e49baba815aad30eb0d8beecef?query=map%28select%28has%28%22endpoint%22%29%20and%20.endpoint%20%3D%3D%20null%29%29)

---

How to find find null, ignoring non-existant keys - the invert of the above:

```jq
map(select(has("endpoint") | not))
```

[Demo](https://jqterm.com/ff4823e49baba815aad30eb0d8beecef?query=map%28select%28has%28%22endpoint%22%29%20%7C%20not%29%29)
