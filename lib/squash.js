/**
 * Make a search index string by removing duplicated words
 * and removing less useful, common short words
 *
 * Adjusted from Philmopalodous Hawksworthy https://git.io/fjUmi
 *
 * @param {String} text
 */

module.exports = function(text) {
  // all lower case, please
  const content = (text + '').toLowerCase();

  // remove all html elements and new lines
  var re = /(&lt;.*?&gt;)/gi;
  var plain = unescape(content.replace(re, ''));

  // remove duplicated words and duplicated spaces
  var string = [...new Set(plain.split(/\s+/))].join(' ');

  // remove short and less meaningful words
  var result = string.replace(
    /\b(\.|,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
    ''
  );
  //remove newlines, and punctuation
  result = result.replace(/\.|,|\?|-|—|\n/g, '');
  //remove repeated spaces

  return result;
};
