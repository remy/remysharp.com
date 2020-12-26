def print:
	"\(.published): [\(.title)](/books/2020/\(.slug)) _by \(.author)_<br>"
;

sort_by(.published) | reduce .[] as $book (
	{  };
  	.["\($book.published / 10 | floor * 10)"] += [ $book ]
) | to_entries | map(
	"**\(.key)**<br>\n\(.value | map(print) | join("\n"))"
) | join("\n\n")
