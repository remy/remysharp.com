var util = require('util');
var moment = require('moment');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

client.search({
  index: 'myindex',
  q: 'body:' + process.argv[2],
  fields: 'title,date'
}, function (error, response) {
  response.hits.hits.forEach(function (res) {
    console.log(res.fields.title + ' -- https://remysharp.com/' + moment(res.fields.date.toString()).format('YYYY/MM/DD') + '/' + res._id + ' (score: %s)', res._score);
  });
});
