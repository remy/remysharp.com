var util = require('util');
var moment = require('moment');
var elasticsearch = require('elasticsearch');
module.exports = function (args) {
  var client = new elasticsearch.Client({
    host: process.env.BONSAI_URL || 'localhost:9200',
    log: args.debug ? 'trace' : null,
  });

  return new Promise(function (resolve, reject) {
    client.search({
      index: 'blog-posts',
      body: {
        query: {
          match: {
            body: args._.join(' '),
          }
        },
        highlight: {
          fields: {
            body: {
              number_of_fragments: 10,
              fragment_size: 400,
            },
          },
        },
      },
      fields: 'title,date,highlight',
    }, function (error, response) {
      // console.log(util.inspect(response, {showHidden: false, depth: null}));
      client.close();
      resolve(response.hits.hits.map(function (res) {
        return util.format('%s -- https://remysharp.com/%s/%s (score: %s)',
          res.fields.title,
          moment(res.fields.date.toString()).format('YYYY/MM/DD'),
          res._id,
          res._score
        );
      }).join('\n'));
    });
  });
};

