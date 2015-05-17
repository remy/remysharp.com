/**
 * 1. create draft
 * 2. publish draft
 * 3. release
 */

var path = require('path');
var moment = require('moment');
var Promise = require('promise');
var readline = require('readline');
var shell = require('shelljs');
var fs = require('then-fs');
var exec = require('child_process').exec;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var draftDir = path.resolve(process.cwd(), 'public', 'drafts');
var publishedDir = path.resolve(process.cwd(), 'public', 'blog');

function readJSON(file) {
  return fs.readFile(file, 'utf8').then(function (data) {
    return JSON.parse(data);
  });
}

function slugify(s) {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');
}

function draft(title, tags) {
  return readJSON(path.resolve(draftDir, '_data.json')).then(function (drafts) {
    var slug = slugify(title);

    if (!title) {
      console.error('Failed: A title is required for new posts');
      process.exit(1);
    }

    drafts[slug] = {
      title: title,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      complete: false,
      inprogress: true,
      tags: tags.length ? tags : ['web'],
    };

    var body = '# ' + title + '\n\n';
    resolve(fs.writeFile(path.resolve(draftDir, slug + '.md'), body).then(function () {
      return fs.writeFile(path.resolve(draftDir, '_data.json'), JSON.stringify(drafts, '', 2));
    }));
  });
}

function publish(title) {
  title = title.toLowerCase();
  console.log('title %s', title);
  return readJSON(path.resolve(draftDir, '_data.json')).then(function (drafts) {
    var picks = Object.keys(drafts).map(function (slug) {
      drafts[slug].slug = slug;
      return drafts[slug];
    }).reduce(function (prev, curr) {
      if (curr.title && curr.title.toLowerCase().indexOf(title) !== -1) {
        prev.push(curr);
      }
      return prev;
    }, []);

    if (picks.length === 1) {
      var post = picks[0];
      console.log('publishing ' + post.title);

      var slug = post.slug;
      var source = path.resolve(draftDir, slug + '.md');
      var target = path.resolve(publishedDir, slug + '.md');
      var publishedData = path.resolve(publishedDir, '_data.json');

      return readJSON(publishedData)
        .then(function (published) {
          console.log(published);
          post.published = true;
          post.date = moment().format('YYYY-MM-DD HH:mm:ss');
          published[post.slug] = post;
          delete post.slug;
          delete post.inprogress;
          delete post.complete;
          return fs.writeFile(publishedData, JSON.stringify(published, '', 2));
        }).then(function () {
          var draftData = path.resolve(draftDir, '_data.json');

          return readJSON(draftData).then(function (drafts) {
            delete drafts[slug];
            return fs.writeFile(draftData, JSON.stringify(drafts, '', 2));
          });
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
          console.log('done');
        });
    } else if (picks.length === 0) {
      console.log('Not matches found');
    } else {
      console.log('Found multiple matches');
      console.log(picks);
    }
  });
}

function release() {

}

function get(prompt) {
  return new Promise(function (resolve, reject) {
    rl.question(prompt, function (answer) {
      rl.pause();
      resolve(answer.trim());
    });
  });
}

function prompt() {
  var title = '';
  var tags = [];

  rl.setPrompt('title: ');
  rl.prompt();

  var title = '';
  rl.on('line', function (line) {
    if (!title) {
      title = line.trim();
      if (title) {
        rl.setPrompt(' tags: ');
      }
      rl.prompt();
    } else {
      tags = line.trim().replace(/,/g, '').replace(/\s{2,}/, ' ').split(' ');
      rl.close();
    }
  }).on('close', function () {
    draft(title, tags).then(function () {
      process.exit(0);
    }).catch(function (error) {
      console.error(error);
      process.exit(1);
    });
  });
}

var actions = {
  draft: draft,
  publish: publish,
  release: release,
  prompt: prompt,
};

function blog() {
  var args = process.argv.slice(2);
  if (args.length > 0) {
    var action = actions[args[0]] ? args.shift() : 'prompt';
    actions[action](args.join(' '))
    .then(process.exit).catch(function (error) {
      console.log(error.stack);
      process.exit(1);
    });
  } else {
    prompt();
  }
}

module.exports = blog;