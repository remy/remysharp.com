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
  var plain = unescape(
    content
      .replace(re, '')
      .replace(/<code.*<\/code>/gms, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
  );

  // remove duplicated words and duplicated spaces
  var string = [...new Set(plain.split(/\s+/))].join(' ');

  // remove short and less meaningful words
  var result = string
    .replace(
      /\b(\.|,|can|all|out|now|how|one|are|get|use|way|day|got|run|quot|this|that|with|have|from|like|when|just|your|some|also|know|there|which|about|though|really|should|because|actually|recently|something|particular|particularly|specifically|the|had|you|your|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
      ''
    )
    .replace(/[^\w\s]/gm, ' ')
    .replace(/\b\w{1,2}\b/gm, '')
    .replace(/\s{2,}/gm, ' ');

  return result.trim();
};
