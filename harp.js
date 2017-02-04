const harp = require('harp');
const Marked = require('terraform/node_modules/marked');
const sizeOf = require('image-size');

module.exports = harp;

// no widows in paragraphs
const widowRe = /^[a-z\.!?"'():%$£&;]+$/;
Marked.Renderer.prototype.paragraph = function(text) {
  const words = text.split(' ');
  const last = words[words.length - 1];
  if (words.length > 1 && widowRe.test(last)) {
    return `<p>${words.slice(0, -1).join(' ')}&nbsp;${last}</p>\n`;
  }
  return `<p>${text}</p>`;
}

Marked.Renderer.prototype.listitem = function(text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<input disabled type="checkbox"> ')
      .replace(/^\s*\[x\]\s*/, '<input disabled type="checkbox" checked> ');

    return '<li class="checkbox" style="list-style: none">' + text + '</li>';
  } else {
    return '<li>' + text + '</li>';
  }
};

// dynamically get the dimensions of the images
Marked.Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  if (!href.endsWith('.svg')) {
    try {
      if (href.includes('://remysharp.com')) {
        href = href.replace(/^https?:\/\/remysharp.com/, '');
      }
      const dim = sizeOf(__dirname + '/public' + href);
      if (dim.width/2 <= 680) {
        const base = 680 / dim.width;
        const h = dim.height * base;
        out += `width="680" height="${h|0}"`;
      } else {
        out += `width="${dim.width}" height="${dim.height}"`;
      }
    } catch (e) {
      console.log('failed', href);
    }
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};