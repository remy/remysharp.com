/**
 * 1. create draft
 * 2. publish draft
 * 3. release
 */

var path = require('path');
var moment = require('moment');
var Promise = require('promise');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var draftDir = path.resolve(process.cwd(), 'public', 'drafts');

function slugify(s) {
  return (s||'').trim().toLowerCase().replace(/[\s-]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
}

function draft(title, tags) {
  var drafts = require(path.resolve(draftDir, '_data.json'));
  var slug = slugify(title);

  drafts[slug] = {
    title: title,
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
    complete: false,
    inprogress: true,
    tags: tags || ['web']
  };

  console.log(drafts);
}

function publish() {

}

function release() {

}

function get(prompt) {
  return new Promise(function (resolve, reject) {
    rl.question(prompt, function(answer) {
      rl.pause();
      resolve(answer.trim());
    });
  });
}

function prompt() {
  var title = '', tags = [];

  rl.setPrompt('title: ');
  rl.prompt();

  var title = '';
  rl.on('line', function(line) {
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
  }).on('close', function() {
    draft(title, tags);
    process.exit(0);
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
    actions[action](args.join(' '));
  } else {
    prompt();
  }
}

module.exports = blog;