---
title: 'Automatically uploading screenshots using my own tools'
date: '2022-10-13'
draft: true
tags:
  - code
---

# Automatically uploading screenshots using my own tools

Get the latest file from the screenshots folder and automatically upload to AWS and copy the URL for sharing.

<!--more-->

AWS Policy required

```json
 {
  "Version": "2012-10-17",
  "Id": "Policy1397632521960",
  "Statement": [
    {
      "Sid": "Stmt1397633323327",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::screenshots.remysharp.com/*"
    }
  ]
}
```

Filename: `~/Library/LaunchAgents/upload_screenshot.plist`

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC -//Apple Computer//DTD PLIST 1.0//EN
http://www.apple.com/DTDs/PropertyList-1.0.dtd>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>Upload Screenshot</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/remy/bin/upload_screenshot</string>
  </array>
  <key>WatchPaths</key>
  <array>
    <string>~/Desktop/Screenshots</string>
  </array>
</dict>
</plist>
```

Filename: `~/bin/upload_screenshot`

```bash
DIR=/Users/remy/Desktop/Screenshots

# get the latest file
FILE=$(ls -rAt $DIR | tail -n 1)

# if it's a junk file, or it's a processed file, exit
if [[ "$FILE" == .DS_Store ]]; then exit; fi
if [[ "$FILE" == *-min.png ]]; then exit; fi

# copy the URL early to the clipboard
echo https://remysharp.com/shot/$(basename $FILE .png)-min.png | pbcopy

# compress the original and output as $FILE-min.png
/Users/remy/bin/pngquant $DIR/$FILE --ext -min.png

# remove the original
rm $DIR/$FILE

# upload to AWS under my "screenshot" profile
AWS_PROFILE=screenshot /usr/local/bin/aws s3 cp $DIR/$(basename $FILE .png)-min.png s3://screenshots.remysharp.com

# play tone so I know it's ready
afplay /System/Library/Sounds/Blow.aiff
```

Finally the Netlify 200 redirect:

```
/shot/* https://s3.eu-west-2.amazonaws.com/screenshots.remysharp.com/:splat 200
```
