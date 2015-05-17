var fs = require('fs');
var elasticsearch = require('elasticsearch');
var blogs = require('../public/blog/_data.json');

var posts = Object.keys(blogs).map(function (slug) {
  blogs[slug].slug = slug;
  return blogs[slug];
});

var client = new elasticsearch.Client({
  host: 'https://pxv6gs1hif:9nqdd6ulpg@remysharp-com-5390076812.eu-west-1.bonsai.io',
  log: 'trace',
});


function create(json, doc) {
  client.create({
    index: 'blog-posts',
    type: 'blog',
    id: json.slug,
    body: {
      title: json.title,
      tags: json.tags,
      published: true,
      date: json.date,
      body: doc,
      counter: 1,
    },
  }, function (error, response) {
    console.log(error);
  });
}

posts.forEach(function (post) {
  fs.readFile(__dirname + '/../public/blog/' + post.slug + '.md', function (error, doc) {
    create(post, doc.toString());
  });
});