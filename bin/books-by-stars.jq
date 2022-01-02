def year: "2021";

def print:
	"- [\(.title)](/books/\(year)/\(.slug)) - \(.pages) pages"
;

def stars($stars):
	[
		"### \($stars) stars\n",
		map(select(.rating == $stars) | print)[]
	] | join("\n")
;

map(select(.read | startswith(year))) | sort_by(.read) |

[stars(5), stars(4)] | join("\n\n")
