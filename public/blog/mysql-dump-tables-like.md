---
title: MySQL dump tables like...
date: '2007-09-16 23:35:41'
published: true
tags:
  - code
  - mysql
  - shell-script-bash
modified: '2014-09-03 16:15:12'
---
# MySQL dump tables like...

    mysql $DB -u$USERNAME -p$PASSWORD -e 'show tables like "$LIKE%"' | grep -v Tables_in | xargs mysqldump --add-drop-table $DB -u$USERNAME -p$PASSWORD

Replace dollar variables with your details to drop a group of tables.  Useful when you've got one database hosting a number of different web sites and you need a dump of a particular site.
