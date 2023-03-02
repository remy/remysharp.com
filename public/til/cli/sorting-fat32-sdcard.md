# Sorting files on your FAT 32 SD card

Windows (as usual) has lots of options, this seems popular: https://www.anerty.net/software/file/DriveSort/ - but Mac users? 😱

I'm on a mac so this is the solution I finally found (which might also work on linux).

First you'll need to install fatsort - best method I've found is using https://brew.sh via `brew install fatsort`. Then using your favourite terminal app:

- Put sd card in your machine (Mac/PC) and run `mount` on the command line - take note of the `/dev/…` path NEXT is mounted on (for instance, mine is /dev/disk2`
- Unmount from the command line using `diskutil unmount /Volumes/NEXT` (leave the sd card inserted)
- Run fatsort as root: `sudo fatsort -D /GAMES/ -a -c -o a /dev/disk2` - this says to only sort /GAMES and all the sub directories (-D), and ascii sort (-a), ignore casing (-c), files and directories are not differentiated (-o a)

Now my /GAMES directory is sorted and easier to navigate 👍

**Updated: 2023-03-02** - there's now a useful [GUI for macOS to sorting FAT 32 files](https://fat-drive-sorter.netlify.app/) 🎉
