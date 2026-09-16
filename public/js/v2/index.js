/* eslint-env browser */
/* global whenReady */
const $$ = (s, context = document) => Array.from(context.querySelectorAll(s));
const $ = (s, context = document) => context.querySelector(s) || {};


const fitVidSelector = [
  "iframe[src*='player.vimeo.com']",
  "iframe[src*='youtube.com']",
  "iframe[src*='youtube-nocookie.com']",
  "iframe[src*='kickstarter.com'][src*='video.html']",
  // 'video',
  'object',
  'embed',
].join(',');

$$(fitVidSelector).forEach((el) => {
  var wrapper = document.createElement('div');
  wrapper.classList.add('video');

  // insert wrapper before el in the DOM tree
  el.parentNode.insertBefore(wrapper, el);

  // move el into wrapper
  wrapper.appendChild(el);
});