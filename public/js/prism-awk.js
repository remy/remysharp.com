Prism.languages.awk = {
  comment: /#.*/,
  string: /"(?:""|[^"\r\f\n])*"/i,
  number: {
    pattern: /([^$])(?:\b\d+\.|\B\.)?\d+(?:[eE][+-]?\d+)?\b/,
    lookbehind: true
  },
  'attr-name': /\b'\w+/i,
  keyword: /\b(?:BEGIN|BEGINFILE|else|while|for|switch|case|esac|print|default|break|continue|next|nextfile|exit|BINMODE|CONVFMT|FIELDWIDTHS|FPAT|FS|IGNORECASE|LINT|OFMT|OFS|ORS|RS|SUBSEP|TEXTDOMAIN|ARGC|ARGV|ARGIND|ENVIRON|ERRNO|FILENAME|FNR|NF|NR|PROCINFO|RLENGTH|RSTART|RT|atan2|cos|exp|int|log|rand|sin|sqrt|srand|asort|asorti|gensub|gsub|index|length|match|patsplit|split|sprintf|strtonum|sub|substr|tolower|toupper|close|fflush|system|mktime|strftime|systime|and|compl|lshift|rshift|xor|isarray|bindtextdomain|dcgettext|dcngettext)\b/i,
  boolean: /\b(?:true|false)\b/i,
  operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
  punctuation: /\.\.?|[,;():]/,
  char: /'.'/,
  variable: [/\b[a-z](?:[_a-z\d])*\b/i, /(?:\$[0-9]+)\b/]
};
