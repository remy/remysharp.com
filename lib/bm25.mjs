import squash from './squash.js';

export default function bm25(content) {
  const text = squash(content);

  //   { slug: 'a', tf: { remy: 3, javascript: 2, css: 1 }, len: 6 },
  const tf = new Map();
  let len = 0;

  text.split(' ').forEach(token => {
    const value = tf.get(token) ?? 0;
    tf.set(token, value + 1);
    len++;
  });

  return { tf: Object.fromEntries(tf), len }
}

export function buildBM25(data) {

  for (const d of data) {

    console.log(bm25(d.input));
    break;
  }

  //   - const format = _ => ({ url: _.url, date: moment(_.data.date).format('yyyy-MM-dd'), title: _.data.title, text: collections.squash(_.output), t: _.data.tags });
  // - const res = collections.posts.map(format);
  // - const df = res.reduce((acc, { text: { tf } }) => { for (const key of tf) { if (!acc[key]) { acc[key] = 0 } acc[key] += tf[key] }; return acc }, {})
  // - const data = JSON.stringify(res);

}