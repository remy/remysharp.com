/* global Prism */
(function (Prism) {
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
          inside: null, // see below
        },
        punctuation: /^\\\(|\)$/,
      },
    },
  };

  var nextbasic = (Prism.languages.nextbasic = {
    comment: /; .*/,
    property: {
      pattern: RegExp(string.source + /(?=\s*:(?!:))/.source),
      greedy: true,
      inside: stringInterpolation,
    },
    string: {
      pattern: string,
      greedy: true,
      inside: stringInterpolation,
    },
    function: {
      pattern: /(\b(?:DEFPROC|DEF)\s+)[a-z_]\w+/i,
      lookbehind: true,
    },
    variable: /\B\$\w+/,
    'property-literal': {
      pattern: /[a-z_]\w*(?=\s*:(?!:))/i,
      alias: 'property',
    },
    keyword: /\b(?:AS|BEEP|BIN|BORDER|BRIGHT|CAT|CIRCLE|CLEAR|CLS|CONTINUE|COPY|DATA|DPOKE|DEF FN|DIM|DRAW|ERASE|FLASH|FORMAT|FOR|GO SUB|GO TO|IF|INK|INPUT|INVERSE|LET|LIST|LLIST|LOAD|LPRINT|MERGE|MOVE|NEW|NEXT|ON|OUT|OVER|PAPER|PAUSE|PLOT|POKE|PRINT|RANDOMIZE|READ|RESTORE|RETURN|RUN|SAVE|VERIFY|AT|LINE|STEP|TAB|THEN|TO|STOP|ELSE|ELSEIF|GOTO|GOSUB|WHILE|UNTIL|BANK|LAYER|PALETTE|SPRITE|TILE|REMOUNT|PWD|CD|MKDIR|RMDIR|DRIVER|PROC|DEFPROC|ENDPROC|LOCAL|OPEN|CLOSE|REPEAT|SPECTRUM)(?![:.])\b/,
    number: /(?:\b\d+\.|\B\.)?\d+(?:[eE][+-]?\d+)?\b/,

    operator: [
      {
        pattern: /\|=?/,
        alias: 'pipe',
      },
      /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|or|not)\b/,
    ],
    'c-style-function': {
      pattern: /\b[a-z_]\w*(?=\s*\()/i,
      alias: 'function',
    },
    punctuation: /::|[()\[\]{},:;]|\.(?=\s*[[\w$])/,
    dot: {
      pattern: /\./,
      alias: 'important',
    },
  });

  stringInterpolation.interpolation.inside.content.inside = nextbasic;
})(Prism);
