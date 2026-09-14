# v2 redesign — page style checklist

Every unique page *style* on the site, with a live URL to eyeball on
`http://localhost:9000` and the template that produces it.

Tick a box once that style looks right in v2 (light **and** dark).

Styling lives in [public/css/v2/](public/css/v2/) — `base.css` (everything),
`article.css` (only loaded by blog + tif posts), `fonts.css`.

---

## 1. Global chrome — appears on nearly every page

- [ ] **Site nav (non-post pages)** — [_partials/page-nav.pug](public/_partials/page-nav.pug) — Home / Search / Latest post — e.g. http://localhost:9000/til/
- [ ] **Post nav (post pages)** — [_partials/post-nav.pug](public/_partials/post-nav.pug) — Home / Search / Previous / Next — e.g. http://localhost:9000/2025/01/03/server-isnt-sending-content-length
- [ ] **Notice banner** — [_partials/notice.pug](public/_partials/notice.pug) — `#notice` FFConf strip above the nav
- [ ] **Search drawer** — [_partials/search.pug](public/_partials/search.pug) — the `#search` panel the nav toggles
- [ ] **Site footer** — [_partials/layout.pug](public/_partials/layout.pug) — 3-column: archives / links / avatar + bio + licence
- [ ] **Inline ad blocks** — [_partials/ads/](public/_partials/ads/) — injected mid-post at `<!-- more -->` — http://localhost:9000/2025/01/03/server-isnt-sending-content-length
- [ ] **Comments** — [_partials/comments.pug](public/_partials/comments.pug) — http://localhost:9000/2025/02/06/blog-questions-challenge
- [ ] **Webmention likes** — `.webmentions` block under a post's metadata

## 2. Long-form / article styles

- [ ] **Blog post** — [blog/_layout.pug](public/blog/_layout.pug) + `article.css` — the big one: h-entry, ad slot, tags metadata, likes, comments — http://localhost:9000/2025/01/03/server-isnt-sending-content-length
  - [ ] **…with code blocks** (Prism) — http://localhost:9000/2025/04/18/how-i-made-an-led-driver-smart
  - [ ] **…with figures / images** — http://localhost:9000/2025/05/31/ai-did-you-check-your-work
  - [ ] **…draft variant** (`.warning` banner + `p.update`) — set `draft: true` in front matter
- [ ] **TIL post** — [til/_layout.pug](public/til/_layout.pug) — "Learned at …" footer — http://localhost:9000/til/cli/debugging-shell-scripts
- [ ] **Link post** — [links/_layout.pug](public/links/_layout.pug) — `.link-post`, "Bookmark:" title, source footer — http://localhost:9000/links/2011-07-12-7899e8c7
- [ ] **TIF post** — [tif/_layout.pug](public/tif/_layout.pug) + `article.css` — optional photo, "Fixed on …" — http://localhost:9000/tif/2023-02-11-space-invaders
- [ ] **Devlog post** — [devlog/_layout.pug](public/devlog/_layout.pug) — "Saved … for <project>" — http://localhost:9000/devlog/go-mummy/
- [ ] **Book review** — [books/_layout.pug](public/books/_layout.pug) — `h-review`, star rating, book meta table, cover, series links — http://localhost:9000/books/2025/butter
- [ ] **Newsletter** — [newsletters/_layout.pug](public/newsletters/_layout.pug) — plus "work with me" footer — http://localhost:9000/newsletters/2017-06/
- [ ] **Draft post** — [drafts/_layout.pug](public/drafts/_layout.pug) — `.warning` banner variant — http://localhost:9000/drafts/Meaninglessness
- [ ] **Generic markdown page** — [_layout.pug](public/_layout.pug) — the catch-all for root `.md` pages — http://localhost:9000/about (also `/ethos`, `/work`, `/rider`, `/feeds`, `/house-rules`)

## 3. Listing / index styles

- [ ] **Home page** — [index.pug](public/index.pug) — bespoke: avatar h1, intro, latest posts, currently reading — http://localhost:9000/
- [ ] **TIL listing** — [til.pug](public/til.pug) — `.til-listing`, grouped by folder, `h2` + `ul` + `time.date` — http://localhost:9000/til/
- [ ] **Links listing** — [links.pug](public/links.pug) — `.link-listing`, per-link excerpt + `p.tags` — http://localhost:9000/links/
- [ ] **Devlog listing** — [devlog.pug](public/devlog.pug) — `.link-listing`, grouped by project, dates only — http://localhost:9000/devlog/
- [ ] **TIF listing** — [tif.pug](public/tif.pug) — `ul.tifs`, content + thumbnail per row — http://localhost:9000/tif/
- [ ] **Books index** — [books/index.pug](public/books/index.pug) — cover grid by year, currently-reading — http://localhost:9000/books/
- [ ] **Newsletters index** — [newsletters/index.pug](public/newsletters/index.pug) — grouped by year/month — http://localhost:9000/newsletters/
- [ ] **Drafts index** — [drafts/index.pug](public/drafts/index.pug) — ready count + age-sorted list — http://localhost:9000/drafts/
- [ ] **Archive, all years** — [_partials/archive.pug](public/_partials/archive.pug) — filter checkboxes + year/month groups — http://localhost:9000/archive/
- [ ] **Archive, single year** — same partial, `year` set — filter bar + months only — http://localhost:9000/2025/
- [ ] **Tag listing** — [_partials/tag.pug](public/_partials/tag.pug) — http://localhost:9000/tag/code/ (also `web`, `business`, `personal`, `retro`)
- [ ] **Popular** — [popular.pug](public/popular.pug) — `ol.popular` with view-count stat lines — http://localhost:9000/popular
- [ ] **Projects** — [projects/index.pug](public/projects/index.pug) — `.projects-group` cards in 3 categories — http://localhost:9000/projects/
- [ ] **Speaking** — [speaking/index.pug](public/speaking/index.pug) — `ul.inline` year jump-list + talks — http://localhost:9000/speaking/
- [ ] **The Attic** — [attic/index.pug](public/attic/index.pug) — screenshots of old designs — http://localhost:9000/attic/

## 4. Utility / form styles

- [ ] **Search** — [search.pug](public/search.pug) — form + `#search-results` list — http://localhost:9000/search
- [ ] **Subscribe** — [subscribe.pug](public/subscribe.pug) — embedded ConvertKit form (third-party styles) — http://localhost:9000/subscribe
- [ ] **Feedback** — [feedback.pug](public/feedback.pug) — the only real `label`/`input`/`textarea` form on the site — http://localhost:9000/feedback
- [ ] **404** — [404.pug](public/404.pug) — http://localhost:9000/404
- [ ] **404 lite** — [404-lite.pug](public/404-lite.pug) — http://localhost:9000/404-lite
- [ ] **Offline** — [offline.pug](public/offline.pug) — JS-populated `#offline-posts` — http://localhost:9000/offline
- [ ] **Gameboys** — [gameboys.pug](public/gameboys.pug) — wall of Twitter embed blockquotes — http://localhost:9000/gameboys

## 5. Out of scope

Self-contained HTML with their own inline styles — they don't use the layout,
so the redesign doesn't touch them:

`/wave.html`, `/maths-wave.html`, `/tones.html`, `/underdog.html`,
`/lametric.html`, `/tia/letter.html`, `/attic/2006|2007|2008|2014/`

---

## Cross-cutting checks

- [ ] Dark mode on every ticked style (only the blog post style is confirmed so far)
- [ ] Narrow / mobile widths
- [ ] Wide content: `pre`, tables, and images that overflow the measure
- [ ] Markdown extras in use: abbreviations, task lists, image figures + captions
- [ ] `article.css` is only linked from blog + tif — check whether TIL / links / devlog / books posts need it too
