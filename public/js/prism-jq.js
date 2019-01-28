Prism.languages.jq = {
  comment: /#.*/,
  string: {
    pattern: /(")(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  keyword: /\b(?:add|all|any|arrays|ascii_downcase|ascii_upcase|booleans|bsearch|builtins|capture|combinations|contains|debug|del|delpaths|empty|endswith|env|error|explode|finites|first|flatten|floor|foreach|from_entries|fromstream|getpath|group_by|gsub|halt_error|halt|has|if|then|else|elif|end|implode|in|index|indices|infinite|input_filename|input_line_number|input|inputs|inside|isfinite|isinfinite|isnan|isnormal|iterables|join|keys_unsorted|keys|last|leaf_paths|length|limit|ltrimstr|map_values|map|match|max_by|max|min_by|min|modulemeta|nan|normals|nth|nulls|numbers|objects|path|paths|range|recurse_down|reduce|recurse|reverse|rindex|rtrimstr|scalars|sort|sort_by|scan|select|setpath|split|splits|sqrt|startswith|stderr|strings|sub|test|to_entries|tonumber|tostream|tostring|transpose|truncate_stream|type|unique_by|unique|until|utf8bytelength|values|walk|while|with_entries|strptime|strftime|strflocaltime|mktime|gmtime|localtime|now|fromdateiso8601|todateiso8601|fromdate|todate|todateiso8601|def|if|elif|else|end|then|as|null)(?![:.])\b/,
  boolean: /\b(?:true|false)\b/,
  variable: /\.[\w\xA0-\uFFFF]*(?=\s*)/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  function: /[a-z0-9_]+(?=\()/i,
  punctuation: /[{}[\];(),:]/,
};
