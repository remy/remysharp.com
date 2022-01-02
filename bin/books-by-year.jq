def year: "2021";

def print:
	"\(.published): [\(.title)](/books/\(year)/\(.slug)) _by \(.author)_<br>"
;

map(select(.read | startswith(year))) |

sort_by(.published) | reduce .[] as $book (
	{  };
  	.["\($book.published / 10 | floor * 10)"] += [ $book ]
) | to_entries | map(
	"**\(.key)**<br>\n\(.value | map(print) | join("\n"))"
) | join("\n\n")
