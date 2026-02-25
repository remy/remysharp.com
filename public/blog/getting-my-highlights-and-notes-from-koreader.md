---
title: 'Getting my highlights & notes from KOReader'
date: '2025-07-22'
tags:
  - personal
---

# Getting my highlights & notes from KOReader

It's not an intuitive process and requires a few speciality commands to work, so it made sense that I write up the process so I can [duck myself](https://duckduckgo.com/?q=site%3Aremysharp.com+kindle&t=newext) later on.

<!-- more -->

Since I'm getting my [Amazon Kindle book highlights](https://remysharp.com/2025/05/01/showing-book-clippings-on-my-blog) already but am also actively trying to buy books from [anywhere that isn't Amazon](https://remysharp.com/2025/06/29/unhooking-from-amazon-ebooks) it means my highlights are in KOReader.

There's a multi-step process that requires special command line tools _and_ navigating KOReader into the "right" state to allow for syncing (I'm certain there's other ways to do this process, but I've not found it yet myself).

## 1. Export the highlights

Probably the simplest part, and if you're happy to connect the Kindle via a USB port, probably a lot easier to get the exported notes off (but I'm taking the wireless route, so it's trickier!).

Whilst the current book is open, open the "tools" menu (the spanner and screwdriver icon), then _Export highlights_ and _Export all notes in current book_.

I've already selected the format as JSON and selected my export folder (arbitrarily my exports are going to `/mnt/us/koreader/clipboard`).

Now the file is waiting to be lifted to my computer.

## 2. WebDAV

From the machine I want to upload the JSON file to, I need to run a WebDAV server (a technology I've always known about but never really had an need or use for until now).

There's quite a few options for WebDAV servers, but I wanted something very lightweight and that I could run on the command line. I ended up using a [Go based server](https://github.com/hacdias/webdav), via `brew install webdav`.

Which ever server you use, you'll need to make sure it has write permissions. To run this go version in write, in the directory I want the JSON file uploaded to, I run:

```sh
WD_PERMISSIONS=CRUD webdav -p 8181
```

This says:

1. Run on port 8181
2. Run with create, read, update and delete permissions

Once I'm done with the process, I then terminate the WebDAV server.

However, before I shut the server down, I need to upload my JSON notes from the Kindle.

## 3. Uploading to WebDAV from KOReader

This is where KOReader's UI gets clunky again. You need to use the "Cloud Storage" option.

Cloud Storage is _only_ visible in the tools menu when you're in the file browser (not in the book reading mode).

Once the Cloud Storage is open, tap the plus icon on the top right, then fill out the details. Assuming the Kindle is on the same network as the computer (because it needs to be), the URL/host is `http://{IP}:8181` and the folder is just `/`.

Once this is saved, tap on the connection name. If the directory is empty, you'll see a new screen with no files. If there's any `.pub` ebooks, then those will be listed (and could be downloaded).

From this new screen, tap the top left plus icon to upload a file. Navigate to the file, and long press on the file to "choose" the file to be uploaded.

If all is successful, KOReader should say so. If it fails, it could be related to permissions. I had earlier luck with a [python WebDAV server](https://wsgidav.readthedocs.io/en/latest/).

## 4. Transform

The JSON structure is fairly simplistic, but I have this specific [jq transform](https://jqterm.com) to get into the format I use:

```jq
def slug:
  ascii_downcase
  | gsub("[^a-z0-9]+"; "-")
  | gsub("(^-|-$)"; "");

. +  { slug: .title | slug } | {
  "\(.slug)": {
    title,
    author,
    highlights: .entries | map({ text, page, note })
  }
}
```

Alternatively, if I'm lifting the annotations (highlights) directly from Calibre, this works:

```jq
def clean: tostring | gsub("\\\\\\n"; "\n\n") | gsub("[’‘]"; "'"; "g");
def percent($total): . / $total * 100;

def slug:
  ascii_downcase
  | gsub("[^a-z0-9]+"; "-")
  | gsub("(^-|-$)"; "");

. as $_ | { slug: .stats.title | slug } | {
  "\(.slug)": {
    title: $_.stats.title,
    author: $_.stats.authors,
    highlights: $_.annotations | to_entries | map(.value | { text: .text | clean, page: "\(.pageno)/\($_.stats.pages)", note: (.note | clean) })
  }
}
```

---

That's how I get my notes from non-Amazon bought books into my own blog.