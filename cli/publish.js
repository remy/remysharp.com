module.exports = publish;

var fs = require('then-fs');
var path = require('path');
var dirs = require('./dirs');
var moment = require('moment');
var elasticsearch = require('elasticsearch');
var exec = require('child_process').exec;

function readJSON(file) {
  return fs.readFile(file, 'utf8').then(function (data) {
    return JSON.parse(data);
  });
}

function publish(args) {
  var title = args._.join(' ').toLowerCase();
  console.log('title %s', title);
  return readJSON(path.resolve(dirs.draft, '_data.json')).then(function (drafts) {
    var picks = Object.keys(drafts).map(function (slug) {
      drafts[slug].slug = slug;
      return drafts[slug];
    }).reduce(function (prev, curr) {
      if (curr.title && curr.title.toLowerCase().indexOf(title) !== -1) {
        prev.push(curr);
      } else if (curr.slug.indexOf(title) !== -1) {
        prev.push(curr);
      }
      return prev;
    }, []);

    if (picks.length === 1) {
      var post = picks[0];
      console.log('publishing ' + post.title);

      var slug = post.slug;
      var source = path.resolve(dirs.draft, slug + '.md');
      var target = path.resolve(dirs.publish, slug + '.md');
      var publishedData = path.resolve(dirs.publish, '_data.json');

      return readJSON(publishedData)
        .then(function (published) {
          post.published = true;
          post.date = moment().format('YYYY-MM-DD HH:mm:ss');
          published[post.slug] = post;
          delete post.slug;
          delete post.inprogress;
          delete post.complete;
          return fs.writeFile(publishedData, JSON.stringify(published, '', 2));
        }).then(function () {
          var draftData = path.resolve(dirs.draft, '_data.json');

          return readJSON(draftData).then(function (drafts) {
            delete drafts[slug];
            return fs.writeFile(draftData, JSON.stringify(drafts, '', 2));
          });
        }).then(function () {
          return fs.readFile(source, 'utf8').then(addToSearch.bind(null, {
            slug: slug,
            title: post.title,
            tags: post.tags,
            date: post.date,
          }));
        }).then(function () {
          return new Promise(function (resolve, reject) {
            exec('git mv ' + source + ' ' + target, function (error, stdout, stderr) {
              if (error !== null) {
                reject(error);
              } else if (stderr) {
                reject(new Error(stderr.toString()));
              } else {
                resolve();
              }
            });
          });
        }).then(function () {
          return 'Successfully moved to published (remember to git `add -p`)';
        });
    } else if (picks.length === 0) {
      throw new Error('No matches found');
    } else {
      return 'Found multiple matches:\n' + picks.join('\n- ');
    }
  });
}



function addToSearch(json, doc) {
  return new Promise(function (resolve, reject) {
    if (!process.env.BONSAI_URL) {
      reject(new Error('Need to manually insert search data'));
    }

    var client = new elasticsearch.Client({
      host: process.env.BONSAI_URL,
      log: 'trace',
    });

    client.create({
      index: 'blog-posts',
      type: 'blog',
      id: json.slug,
      body: {
        title: json.title,
        tags: json.tags,
        published: true,
        date: json.date,
        body: doc.replace(/<(?:.|\n)*?>/gm, ''), // strip html
        counter: 1,
      },
    }, function (error) {
      client.close();
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}