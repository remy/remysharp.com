# jq recipes

Convert object to array, moving the key into the array item under the property
`key`:

```
. | to_entries | map_values(.value + { key })
```

---

Swap the key/value pair to read as value/key object:

```
to_entries | map( {(.value) : .key } ) | add
```

[Demo](https://jace.isthe.link/#!/ca0efa20-cd58-4244-9591-d8ffbe5f0038)

---

Take an object with two similar objects, but separated between team and
formerly, and merge into a single object, adding a flag for all those from the
formerly group:

```
[.team, (.formerly | map(. + {formerly: true }))] | flatten
```

---

Download and extract all the files from a gist:

```
eval "$(curl https://api.github.com/gists/968b8937a153127cfae4a173b6000c1e | jq -r '.files | to_entries | .[].value | @sh "echo \(.content) > \(.filename)"')"
```

---

Update all outdated npm dependencies:

```
npm i $(echo $(npm outdated --json | jq -r 'to_entries | .[] | "\(.key)@\(.value.latest)"'))
```

---

Add a new property to every object:

```
map(. + { "draft": true })
```

Or

```
[.[] | . + { "draft" : true }]
```

[Example](https://jace.isthe.link/#!/b58f7f62-c667-40c2-b95a-64e9308ac6c0?query=%5B.%5B%5D%20%7C%20.%20+%20%7B%20%22draft%22%20%3A%20true%20%7D%5D)

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

---

Remove a property from a nested object (example as above):

```
with_entries(.value |= del(.title))
```

---

List all the dependencies in a `package.json` for use in other commands (like `npm un`):

```
echo $(cat package.json | jq '.dependencies | keys | .[] | "\(.)"' -r)
```
