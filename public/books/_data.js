const books = require('./_books.json');
const fixes = require('./_fixes.json');

// const res = [...books, ...fixes.reviews].sort((a, b) => {
//   return a.read < b.read ? 1 : -1;
// });

const res = [...books, ...fixes.reviews]
  .map((book) => {
    if (fixes.mods[book.id]) {
      Object.keys(fixes.mods[book.id]).forEach((key) => {
        book[key] = fixes.mods[book.id][key];
      });
    }
    return book;
  })
  .sort((a, b) => {
    return a.read < b.read ? 1 : -1;
  });

module.exports = res;
