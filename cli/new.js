module.exports = newPost;

var path = require('path');
var fs = require('then-fs');
var inquirer = require('inquirer');
var moment = require('moment');
var dirs = require('./dirs');

function newPost() {
  var prompts = [{
    name: 'title',
    message: 'Title:',
  }, {
    type: 'checkbox',
    message: 'Tags:',
    name: 'tags',
    choices: ['web', 'code', 'personal', 'business'],
  }];

  return new Promise(function (resolve) {
    inquirer.prompt(prompts, function (answers) {
      draft(answers.title, answers.tags).then(function (filename) {
        resolve('Draft created: ' + path.relative(process.cwd(), filename));
      });
    });
  });
}

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
    .replace(/^-+|-+$/g, '')
    .replace(/[\s-]+/g, '-');
}

function draft(title, tags) {
  var dataPath = path.resolve(dirs.draft, '_data.json');
  return readJSON(dataPath).then(function (drafts) {
    var slug = slugify(title);

    if (!title) {
      var error = new Error('Failed: A title is required for new posts');
      throw error;
    }

    var now = moment().format('YYYY-MM-DD HH:mm:ss');

    drafts[slug] = {
      title: title,
      date: now,
      modified: now,
      complete: false,
      inprogress: true,
      tags: tags.length ? tags : ['web'],
    };

    var body = '# ' + title + '\n\n';

    var filename = path.resolve(dirs.draft, slug + '.md');

    return fs.writeFile(dataPath, JSON.stringify(drafts, '', 2))
      .then(function () {
        return fs.exists(filename);
      })
      .then(function (exists) {
        if (!exists) {
          return fs.writeFile(filename, body);
        }
      }).then(function () {
        return filename;
      });
  });
}
