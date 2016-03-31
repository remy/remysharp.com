module.exports = updateTimestamps;

var fs = require('then-fs');
var path = require('path');
var moment = require('moment');
var draft = path.resolve(process.cwd(), 'public', 'drafts');
var public = path.resolve(process.cwd(), 'public', 'blog');

function updateTimestamps() {
  return Promise.all([update(draft), update(public)]).then(function (res) {
    return res.join('');
  });
}

function update(dir) {
  var filename = path.resolve(dir, '_data.json');
  return fs.readFile(filename, 'utf8').then(JSON.parse).then(function (posts) {
    var ids = Object.keys(posts);
    var promises = ids.map(function (id) {
      return fs.stat(dir + '/' + id + '.md').then(function (stat) {
        return {
          id: id,
          date: moment(stat.mtime).format('YYYY-MM-DD HH:mm:ss'),
        };
      }).catch(function () {
        return false;
      });
    });

    return Promise.all(promises).then(function (stats) {
      stats = stats.filter(Boolean);

      var changed = stats.filter(function (stat) {
        var draft = posts[stat.id];
        var date = stat.date;
        if (draft.date !== date) {
          draft.modified = date;
          return true;
        }
        return false;
      }).filter(Boolean).sort(function (a, b) {
        return a.date < b.date ? 1 : -1;
      }).map(function (res) {
        return res.date + ': ' + res.id;
      });

      return fs.writeFile(filename, JSON.stringify(posts, '', 2)).then(function () {
        return changed.join('\n');
      });
    });
  });
}
