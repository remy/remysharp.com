# jq recipes

All demos link to [jqterm](https://jqterm.com) - an interactive jq web terminal with autocomplete (and faster querying with large datasets as they're cached online in private gists).

Convert object to array, moving the key into the array item under the property
`slug`:

```
. | to_entries | map_values(.value + { slug: .key })
```

[Demo](https://jqterm.com/#!/155c8ee00d2584c70846bc7bfaac067a?query=.%20%7C%20to_entries%20%7C%20map_values%28.value%20+%20%7B%20slug%3A%20.key%20%7D%29)

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

[Demo](https://jqterm.com/#!/d86a7fa855323ee5b3f9c5cf754099fe?query=%5B.team%2C%20%28.formerly%20%7C%20map%28.%20+%20%7Bformerly%3A%20true%20%7D%29%29%5D%20%7C%20flatten)

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

Add a new property to every object:

```
map(. + { "draft": true })
```

Or

```
[.[] | . + { "draft" : true }]
```

[Demo](https://jqterm.com/#!/8e8dd22be903e002b418be272a2f8cf0?query=map%28.%20+%20%7B%20%22draft%22%3A%20true%20%7D%29)

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

[Demo](https://jqterm.com/#!/c64de24dcdf718b3c9e32b7cef54c49f?query=with_entries%28.value%20+%3D%20%7B%20%22draft%22%3A%20true%7D%29)


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
mongo <host>/<db> --norc --username <username> --password <password> --eval 'DBQuery.shellBatchSize = 500; db.getCollection("users").find({"created" : { $gte : new ISODate("2018-02-09T00:15:31Z") }}, { email: 1 }).map(function(_){ delete _._id; return tojson(_) })' |
jq --slurp '.[]'
```

---

From Twitter's API, take all DM received and sent and transform into readable format sorted by date order:

```
[ .[] | { text, date: .created_at, from: { screen_name: .sender.screen_name }, to: { screen_name: .recipient.screen_name} } ] | sort_by(.date)
```
