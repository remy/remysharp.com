/**
 * Pull data from netlify with limit of 100 in `/page` endpoint. Then pass through:
 *
 * .data |
 *   map(.resource) |
 *   map(
 *     select(
 *       split("")[1] == "2"
 *     )
 *   ) |
 *   map(
 *     rtrimstr("/") |
 *     split("/") |
 *     last |
 *     select(
 *       test("^[0-9]+$") | not)
 *     ) |
 *   sort |
 *   unique
 */

module.exports = [
  "a-better-twitter-search",
  "an-adventure-in-sparse-arrays",
  "apps-i-use-that-you-might-not-know",
  "blocks-of-tetris-code",
  "books-i-read-in-2019",
  "casio-f91w-modding",
  "chrome-remote-debugging-over-wifi",
  "cli-improved",
  "code-highlighting-server-or-client",
  "css-parent-selector",
  "devtools-how-to-query-through-the-shadow-dom",
  "element-in-view-event-plugin",
  "fixing-my-slow-mac-network-speeds",
  "getting-my-highlights-and-notes-from-koreader",
  "home-assistant-how-get-realtime-electricity-and-gas.md",
  "how-has-ffconf-changed-since-it-was-known-as-full-frontal",
  "how-i-foot-gunned-our-newsletter-this-week",
  "how-to-inspect-elements-that-hide-on-mouse-move",
  "how-to-quickly-spot-a-fake-game-boy-cartridge",
  "html5-enabling-script",
  "is-jquery-still-relevant",
  "issues-with-position-fixed-scrolling-on-ios",
  "js-bin-down-in-2026",
  "jsbin-toxic-part-1",
  "json-store-as-a-service-jsonbin",
  "my-2025",
  "nodejs-rapid-development-nodemon",
  "open-source-with-a-cap-in-hand",
  "please-disable-javascript-to-view-this-site",
  "popover-backdrop-anti-pattern",
  "progressive-enhancement",
  "progressive-web-apps-the-long-game",
  "scraping-goodreads",
  "shell-debugging-vanishing-text",
  "syntax-highlighting-in-web-component-templates",
  "the-30-year-game",
  "the-web-didnt-change-you-did",
  "throttling-function-calls",
  "unhooking-from-amazon-ebooks",
  "vibe-coding-and-robocop",
  "vs-code-using-all-of-the-cpus-and-how-to-fix-it",
  "web-of-state-of-the-browser-day-out",
  "what-is-a-polyfill",
  "why-i-stopped-loving-slashes-in-self-closing-tags"
]