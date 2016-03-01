var path = require('path');

module.exports = {
  draft: path.resolve(process.cwd(), 'public', 'drafts'),
  publish: path.resolve(process.cwd(), 'public', 'blog'),
};