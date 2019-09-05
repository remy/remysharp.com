/* global Prism */
(function(Prism) {
  var interpolation = /\\\((?:[^()]|\([^()]*\))*\)/.source;
  var string = RegExp(
    /"(?:[^"\r\n\\]|\\[^\r\n(]|__)*"/.source.replace(/__/g, interpolation)
  );
  var stringInterpolation = {
    interpolation: {
      pattern: RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + interpolation),
      lookbehind: true,
      inside: {
        content: {
          pattern: /^(\\\()[\s\S]+(?=\)$)/,
          lookbehind: true,
          inside: null // see below
        },
        punctuation: /^\\\(|\)$/
      }
    }
  };

  var jq = (Prism.languages.jq = {
    comment: /#.*/,
    property: {
      pattern: RegExp(string.source + /(?=\s*:(?!:))/.source),
      greedy: true,
      inside: stringInterpolation
    },
    string: {
      pattern: string,
      greedy: true,
      inside: stringInterpolation
    },

    function: {
      pattern: /(\bdef\s+)[a-z_]\w+/i,
      lookbehind: true
    },

    variable: /\B\$\w+/,
    'property-literal': {
      pattern: /[a-z_]\w*(?=\s*:(?!:))/i,
      alias: 'property'
    },
    // keyword: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
    keyword: /\b(?:add|all|any|arrays|ascii_downcase|ascii_upcase|booleans|bsearch|builtins|capture|combinations|contains|debug|del|delpaths|empty|endswith|env|error|explode|finites|first|flatten|floor|foreach|from_entries|fromstream|getpath|group_by|gsub|halt_error|halt|has|if|then|else|elif|end|implode|in|index|indices|infinite|input_filename|input_line_number|input|inputs|inside|isfinite|isinfinite|isnan|isnormal|iterables|join|keys_unsorted|keys|last|leaf_paths|length|limit|ltrimstr|map_values|map|match|max_by|max|min_by|min|modulemeta|nan|normals|nth|nulls|numbers|objects|path|paths|range|recurse_down|reduce|recurse|reverse|rindex|rtrimstr|scalars|sort|sort_by|scan|select|setpath|split|splits|sqrt|startswith|stderr|strings|sub|test|to_entries|tonumber|tostream|tostring|transpose|truncate_stream|type|unique_by|unique|until|utf8bytelength|values|walk|while|with_entries|strptime|strftime|strflocaltime|mktime|gmtime|localtime|now|fromdateiso8601|todateiso8601|fromdate|todate|todateiso8601|def|if|elif|else|end|then|as|null)(?![:.])\b/,
    boolean: /\b(?:true|false)\b/,
    number: /(?:\b\d+\.|\B\.)?\d+(?:[eE][+-]?\d+)?\b/,

    operator: [
      {
        pattern: /\|=?/,
        alias: 'pipe'
      },
      /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|or|not)\b/
    ],
    'c-style-function': {
      pattern: /\b[a-z_]\w*(?=\s*\()/i,
      alias: 'function'
    },
    punctuation: /::|[()\[\]{},:;]|\.(?=\s*[[\w$])/,
    dot: {
      pattern: /\./,
      alias: 'important'
    }
  });

  stringInterpolation.interpolation.inside.content.inside = jq;
})(Prism);
