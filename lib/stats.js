/*

Generated data from https://ga-dev-tools.appspot.com/query-explorer/?ids=ga%3A2975832&start-date=2006-03-01&end-date=yesterday&metrics=ga%3Apageviews&dimensions=ga%3ApagePath&sort=-ga%3Apageviews

*/

const diff = require('date-fns/differenceInCalendarDays');
const today = new Date();

// remap
var data = require('../stats/ga.json').rows.reduce((acc, curr) => {
  acc[curr[0]] = curr[1];
  return acc;
}, {});

// group
const urls = Object.keys(data);

var re = new RegExp(/^\/\d{4}\/\d{2}\/\d{2}\//);
const dateFromURL = (url) => {
  const res = url.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\//);
  const [_, y, m, d] = res;
  return new Date(`${y}-${m}-${d}`);
};

// remap to just slugs
const remap = urls
  .filter((v) => re.test(v))
  .sort() // why sort?
  .reduce((acc, curr) => {
    var url = curr.replace(re, '').replace(/\/.*$/, '').trim();
    if (!url) {
      return acc;
    }

    if (!acc[url]) {
      acc[url] = { views: 0, url: curr, slug: url };
    }

    acc[url].views += parseInt(data[curr], 10);
    return acc;
  }, {});

const all = Object.keys(remap)
  .map((key) => remap[key])
  .map(({ views, url, slug }) => {
    const date = dateFromURL(url);
    var meta = { views, url, slug, date };

    meta.age = diff(today, date);
    meta.index = parseFloat((meta.views / meta.age).toFixed(2));

    return meta;
  })
  .reduce((acc, curr) => ({ ...acc, [curr.slug]: curr }), {});

const ordered = Object.keys(all).sort((a, b) =>
  all[a].index < all[b].index ? 1 : -1
);

module.exports = { all, ordered };
