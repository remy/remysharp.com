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
