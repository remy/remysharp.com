var fs = require('fs');
var elasticsearch = require('elasticsearch');
var blogs = require('../public/blog/_data.json');

var posts = Object.keys(blogs).map(function (slug) {
  blogs[slug].slug = slug;
  return blogs[slug];
});

// kick  curl -XPUT https://pxv6gs1hif:9nqdd6ulpg@remysharp-com-5390076812.eu-west-1.bonsai.io/blog-posts

var client = new elasticsearch.Client({
  host: process.env.BONSAI_URL,
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
      body: doc.replace(/<\/?[a-z]+ ?[^>]*>/igm, ''), // strip html
      counter: 1,
    },
  }, function (error, response) {
    // console.log(error);
    // client.close();
  });
}

/*
posts.forEach(function (post) {
  fs.readFile(__dirname + '/../public/blog/' + post.slug + '.md', function (error, doc) {
    if (error) {
      console.log(error);
      return;
    }
    create(post, doc.toString());
  });
});
//*/

//*
posts.filter(function (post) {
  return post.slug === 'devtool-tricks-for-when-i-forget';
}).forEach(function (post) {
  fs.readFile(__dirname + '/../public/blog/' + post.slug + '.md', function (error, doc) {
    create(post, doc.toString());
  });
});

//*/
