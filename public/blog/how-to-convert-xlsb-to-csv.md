---
title: 'How to convert xlsb to csv'
tags:
  - web
  - code
date: 2020-02-05
summary: 'Niche skill: converting from xlsb to csv on the command line and in headless mode'
---

# How to convert xlsb to csv

Converting from Excel formats to csv is something I've had to do many times in my career - usually to get the data into a database-import friendly format. The problem with xlsb is that it's a binary/zip format where support isn't great.

JavaScript is my goto language, but there's no library that specifically deals with the binary xls format.

<!--more-->

## One sheet with Libreoffice

I got this from method [from a stackoverflow](https://stackoverflow.com/a/36803899/22617) answer and it works well enough - but doesn't scale easily to multiple sheets, nor does it allow for any specific handling of fields (which hasn't been a problem for me as yet).

```bash
$ soffice --headless --convert-to csv file.xlsb
```

This uses the `soffice` binary that ships as part of [Libreoffice](https://www.libreoffice.org/). It's likely `soffice` isn't in your path, so you can find it here:

- Mac: `/Applications/LibreOffice.app/Contents/MacOS/soffice`
- Windows: `"C:\Program Files\LibreOffice 5\program\soffice.exe"`
- Linux - I'm not so sure, but you might find `libreoffice` works

## Multi-sheet and/or special field handling

For multiple sheets you _can_ use macros in Libreoffice, but you'll need to edit the sheet ahead of time which wasn't practical in my case. So we turn to python for processing.

I'm not a regular python coder, so my instructions below will be hacky, but hopefully mean that it's easy for someone whose unfamiliar with python can get it going.

This python code was tested with python3 (see note at the end for python2 support).

We'll make two files:

- `requirements.txt`

```txt
pyxlsb==1.0.6
```

- `extract.py`

```python
import sys
from pyxlsb import open_workbook

if len(sys.argv) < 2:
    raise ValueError('You need to pass in an xlsb filename')

def toString(s):
    if s is None: return ''
    # change `str` to `unicode` if python2
    if isinstance(s, (str)): return s
    # note that floats are default for numbers
    # you may want to use `repr(int(s))`
    return repr(s)

with open_workbook(sys.argv[1]) as wb:
    for sheetname in wb.sheets:
        # make a new file for each sheet
        f = open(sheetname + ".csv", "w+")
        with wb.get_sheet(sheetname) as sheet:
            for row in sheet.rows():
                values = [r.v for r in row]
                f.write(','.join(map(toString, values)) + "\n")
```

To use the code above, first install the dependencies then run the `extract.py` with a single argument of the xlsb file and the program will stream out the CSV output.

```bash
$ pip install -r requirements.txt
$ python extract.py file.xlsb
```

If this works, it will create individual files for each sheet. If you want to combine all the sheets into a single file (assuming they have the same structure), then you can use this command to add your own header and collect the data _without_ their csv header, into a single file:

```bash
$ (echo "col1,col2,col3,etc" ; tail +2 -q *.csv) > final.csv
```

## Working around python

When I run the `python` command I get the following error:

```txt
Traceback (most recent call last):
  File "extract.py", line 2, in <module>
    from pyxlsb import open_workbook
ModuleNotFoundError: No module named 'pyxlsb'
```

Somehow my python paths aren't configured correctly, but pip was able to install the dependency so it's _somewhere_ on my machine. I solve this doing the following:

1. Discover where the dependencies are installed: `pip show pyxlsb | grep Location`
2. Use `PYTHONPATH`

So my command now reads:

```bash
PYTHONPATH=/usr/local/lib/python3.7/site-packages python extract.py file.xlsb
```

An alterative method to get the dependency to be found, a way that I suspect is hacky, is to change the line `import sys` for the following two lines:

```python
import sys
sys.path.insert(0, '/usr/local/lib/python3.7/site-packages')  # location of src
```

Now the dependency can be used. Probably very bad method, but frankly all the examples around python expect the user to know how this stuff should be configured which can lead to some [frustration](https://mobile.twitter.com/rem/status/1224443746923642881)…
