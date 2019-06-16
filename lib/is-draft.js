const now = new Date();
module.exports = post =>
  !post.data.date ||
  post.data.date > now ||
  post.data.complete === false ||
  post.data.draft === true;
