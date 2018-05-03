# jq recipes

All demos link to [jqterm](https://jqterm.com) - an alternative interactive jq web terminal with autocomplete (and faster querying with large datasets as they're cached online in private gists).

Here's a collection of jq recipes I've collected over the last few months.

---

Convert object to array, moving the key into the array item under the property
`slug`:

```
to_entries | map_values(.value + { slug: .key })
```

[Demo](https://jqterm.com/#!/155c8ee00d2584c70846bc7bfaac067a?query=to_entries%20%7C%20map_values%28.value%20%2B%20%7B%20slug%3A%20.key%20%7D%29)

---

Convert an array to a keyed object (the inverse of the above example):

```
map({ (.slug): . }) | add
```

[Demo](https://jqterm.com/#!/8105d5a8a4a0ec564c68508063a40aac?query=map%28%20%7B%20%28.slug%29%3A%20.%20%7D%20%29%20%7C%20add)

---

Swap the key/value pair to read as value/key object:

```
to_entries | map( {(.value) : .key } ) | add
```

[Demo](https://jqterm.com/#!/1b750d01608dc8c86e2320e4b7fb8e3a?query=to_entries%20%7C%20map%28%20%7B%28.value%29%20%3A%20.key%20%7D%20%29%20%7C%20add)

---

Take an object with two similar objects, but separated between team and
formerly, and merge into a single object, adding a flag for all those from the
formerly group:

```
[.team, (.formerly | map(. + {formerly: true }))] | flatten
```

[Demo](https://jqterm.com/#!/d86a7fa855323ee5b3f9c5cf754099fe?query=%5B.team%2C%20%28.formerly%20%7C%20map%28.%20%2B%20%7Bformerly%3A%20true%20%7D%29%29%5D%20%7C%20flatten)

---

Download and extract all the files from a gist:

```
eval "$(curl https://api.github.com/gists/968b8937a153127cfae4a173b6000c1e | jq -r '.files | to_entries | .[].value | @sh "echo \(.content) > \(.filename)"')"
```

[Demo](https://jqterm.com/#!/2ec37d92242d8457b919011bc023511e?query=.files%20%7C%20to_entries%20%7C%20.%5B%5D.value%20%7C%20@sh%20%22echo%20%5C%28.content%29%20%3E%20%5C%28.filename%29%22)

---

Update all outdated npm dependencies:

```
npm i $(echo $(npm outdated --json | jq -r 'to_entries | .[] | "\(.key)@\(.value.latest)"'))
```

[Demo](https://jqterm.com/#!/d7f34556e41e69568d10b5bc511fba68?query=to_entries%20%7C%20.%5B%5D%20%7C%20%22%5C%28.key%29@%5C%28.value.latest%29%22)

---

Install the dependencies from one node project to another:

```
npm i $(cat ../other-project/package.json| jq '.dependencies | keys[]' -r)
```

[Demo](https://jqterm.com/#!/52dc3f83ee31266c193bd3d77311e93d?query=.dependencies%20%7C%20keys%5B%5D)

---

Add a new property to every object:

```
map(. + { "draft": true })
```

Or

```
[.[] | . + { "draft" : true }]
```

[Demo](https://jqterm.com/#!/8e8dd22be903e002b418be272a2f8cf0?query=map%28.%20%2B%20%7B%20%22draft%22%3A%20true%20%7D%29)

---

Add new property to every object in a nested object, i.e. source looks like:

```json
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

```
with_entries(.value += { "draft": true})
```

[Demo](https://jqterm.com/#!/c64de24dcdf718b3c9e32b7cef54c49f?query=with_entries%28.value%20%2B%3D%20%7B%20%22draft%22%3A%20true%7D%29)


---

Remove a property from a nested object (example as above):

```
with_entries(.value |= del(.title))
```

[Demo](https://jqterm.com/#!/31652f74d0f513ae4e7d0e2a6430b80d?query=with_entries%28.value%20%7C%3D%20del%28.title%29%29)

---

List all the dependencies in a `package.json` for use in other commands (like `npm un`):

```
echo $(cat package.json | jq '.dependencies | keys | .[] | "\(.)"' -r)
```

[Demo](https://jqterm.com/#!/91ad0e49459c2e6e41db363ca228574d?query=.dependencies%20%7C%20keys%20%7C%20.%5B%5D%20%7C%20%22%5C%28.%29%22)

---

Get mongodb data into jq compatible format:

```
mongo <host>/<db> --norc --username <user> --password <pwd> \
  --eval 'printjson(db.getCollection("users").find().toArray())' | \
  jq '.[]'
```

---

From Twitter's API, take all DM received and sent and transform into readable format sorted by date order:

```
[ .[] | { text, date: .created_at, from: { screen_name: .sender.screen_name }, to: { screen_name: .recipient.screen_name} } ] | sort_by(.date)
```

---

Using Serverless and Next.js and working out which dependencies I need to force include (because they live in the `.next` directory):

```
$ depcheck --json | jq '.using | [to_entries[] | select(.value[] | contains("/.next/")) | .key] | unique | sort[] | "- \(.)"' -r
```

Note: also uses [depcheck](https://www.npmjs.com/package/depcheck) to resolve the npm dependencies.

[Demo](https://jqterm.com/#!/dd6eb7b65d9c5a966919644b2ed60e57?query=.using%20%7C%20%5Bto_entries%5B%5D%20%7C%20select%28.value%5B%5D%20%7C%20contains%28%22/.next/%22%29%29%20%7C%20.key%5D%20%7C%20unique%20%7C%20sort%5B%5D%20%7C%20%22-%20%5C%28.%29%22)

---

From a nested tree of objects, find the object whose `id` matches X:

```
curl -sL https://git.io/vxPyi | \
  jq '.. | objects | select(.id == "0:16")'
```

[Demo](https://jqterm.com/#!/d0619b651ba710d41878260f5947b98a?query=..%20%7C%20objects%20%7C%20select%28.id%20%3D%3D%20%220%3A16%22%29)

---

Strip all occurrences of a property (`email` in this example):

```
walk(if type == "object" then . | del(.email) else . end)
```

Note that the `walk` function is missing from jq@1.5 and needs to be added (seen in demo).

[Demo](https://jqterm.com/#!/5720a29ba9992666879ce0f915ab2208?query=%23%20walk%20was%20removed%20from%20jq%401.5%0Adef%20walk%28f%29%3A%0A%20%20.%20as%20%24in%0A%20%20%7C%20if%20type%20%3D%3D%20%22object%22%20then%0A%20%20%20%20%20%20reduce%20keys%5B%5D%20as%20%24key%0A%20%20%20%20%20%20%20%20%28%20%7B%7D%3B%20.%20%2B%20%7B%20%28%24key%29%3A%20%20%28%24in%5B%24key%5D%20%7C%20walk%28f%29%29%20%7D%20%29%20%7C%20f%0A%20%20elif%20type%20%3D%3D%20%22array%22%20then%20map%28%20walk%28f%29%20%29%20%7C%20f%0A%20%20else%20f%0A%20%20end%3B%0A%0Awalk%28if%20type%20%3D%3D%20%22object%22%20then%20.%20%7C%20del%28.email%29%20else%20.%20end%29)

---

Bulk insert into elastic search using a vanilla JSON array, i.e. [1,2,3,4] - zipping the array with the required elastic search metadata:

```
cat data.json | \
  jq 'reduce .[] as $n ([]; . + [{ "index" : { "_index": "my-index", "_type" : "my-type" } }, $n]) | .[]' -c | \
  curl -H "Content-Type: application/x-ndjson" -XPOST http://localhost:9200/_bulk --data-binary "@-"
```

[Demo](https://jqterm.com/#!/5016c9cd4d23cfad99f777e4d17560b3?query=reduce%20.%5B%5D%20as%20%24n%20%28%5B%5D%3B%20.%20%2B%20%5B%7B%20%22index%22%20%3A%20%7B%20%22_index%22%3A%20%22my-index%22%2C%20%22_type%22%20%3A%20%22my-type%22%20%7D%20%7D%2C%20%24n%5D%29%20%7C%20.%5B%5D)
