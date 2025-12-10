// ==UserScript==
// @name         Bluesky Markdown Links
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Final cumulative byte shift and scoping fix for multi-link posts.
// @author       Gemini, ChatGPT and Remy
// @match        https://bsky.app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  function sample() {
    return {
      repo: 'did:plc:eh5je3z4jszqwmzuciqh6ijz',
      writes: [
        {
          $type: 'com.atproto.repo.applyWrites#create',
          collection: 'app.bsky.feed.post',
          rkey: '3m7mr5cg6qs25',
          value: {
            $type: 'app.bsky.feed.post',
            createdAt: '2025-12-10T09:37:23.384Z',
            text: "I've written a [tamper monkey script](remysharp.com/js/bsky-mark...) that I've got running in the browser that supports writing markdown style links and converts them into fancy links in bluesky.\n\nSadly no support in Mastodon.",
            facets: [
              {
                index: { byteStart: 38, byteEnd: 67 },
                features: [
                  {
                    $type: 'app.bsky.richtext.facet#link',
                    uri: 'https://remysharp.com/js/bsky-markdown-links-tampermonkey.js',
                  },
                ],
              },
            ],
            embed: {
              $type: 'app.bsky.embed.external',
              external: {
                uri: 'https://remysharp.com/js/bsky-mark...',
                title: '',
                description: '',
              },
            },
            langs: ['en'],
          },
        },
      ],
      validate: true,
    };
  }

  const TARGET_ENDPOINT = '/xrpc/com.atproto.repo.applyWrites';
  const CREATE_POST_TYPE = 'com.atproto.repo.applyWrites#create';
  const POST_COLLECTION = 'app.bsky.feed.post';

  function ensureProtocol(url) {
    if (!url) return url;
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }

  function convertMarkdownLinksToRichText(json) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const createPostWrite = json.writes.find(
      (write) =>
        write.$type === 'com.atproto.repo.applyWrites#create' &&
        write.collection === 'app.bsky.feed.post'
    );

    if (!createPostWrite) return json;

    const post = createPostWrite.value;
    let originalText = post.text;
    let currentFacets = post.facets || [];

    // Step 1: Reconstruct full URLs from facets into the text
    // Work backwards to maintain correct positions
    const linkFacets = currentFacets
      .filter((f) =>
        f.features?.some(
          (feat) => feat.$type === 'app.bsky.richtext.facet#link'
        )
      )
      .sort((a, b) => b.index.byteStart - a.index.byteStart);

    let reconstructedText = originalText;

    for (const facet of linkFacets) {
      const { byteStart, byteEnd } = facet.index;
      const linkFeature = facet.features.find(
        (f) => f.$type === 'app.bsky.richtext.facet#link'
      );
      if (!linkFeature) continue;

      const bytes = encoder.encode(reconstructedText);
      if (byteEnd > bytes.length) continue;

      const before = decoder.decode(bytes.subarray(0, byteStart));
      const charStart = before.length;

      const openBracketIndex = reconstructedText.lastIndexOf('[', charStart);
      const closeBracketIndex = reconstructedText.indexOf(
        ']',
        openBracketIndex
      );
      const openParenIndex = reconstructedText.indexOf('(', closeBracketIndex);
      const closeParenIndex = reconstructedText.indexOf(')', openParenIndex);

      if (
        openBracketIndex === -1 ||
        closeBracketIndex === -1 ||
        openParenIndex === -1 ||
        closeParenIndex === -1
      ) {
        continue;
      }

      const linkText = reconstructedText.slice(
        openBracketIndex + 1,
        closeBracketIndex
      );

      reconstructedText =
        reconstructedText.slice(0, openBracketIndex) +
        `[${linkText}](${linkFeature.uri})` +
        reconstructedText.slice(closeParenIndex + 1);
    }

    // Step 2: Now parse markdown links from reconstructed text
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const replacements = [];
    let match;

    while ((match = linkRegex.exec(reconstructedText)) !== null) {
      const fullMatch = match[0];
      const linkText = match[1];
      const url = match[2];

      const byteStartIndex = encoder.encode(
        reconstructedText.substring(0, match.index)
      ).length;
      const linkTextByteLength = encoder.encode(linkText).length;
      const fullMatchByteLength = encoder.encode(fullMatch).length;
      const removedByteLength = fullMatchByteLength - linkTextByteLength;

      replacements.push({
        charIndex: match.index,
        fullMatch,
        linkText,
        url,
        byteStartIndex,
        removedByteLength,
        linkTextByteLength,
        originalLinkEndByte: byteStartIndex + fullMatchByteLength,
      });
    }

    if (replacements.length === 0) return json;

    // Step 3: Create new text by stripping markdown syntax
    let newText = reconstructedText;
    for (let i = replacements.length - 1; i >= 0; i--) {
      const r = replacements[i];
      newText =
        newText.substring(0, r.charIndex) +
        r.linkText +
        newText.substring(r.charIndex + r.fullMatch.length);
    }
    post.text = newText;

    // Step 4: Create new facets with corrected byte positions
    const newFacets = [];
    let cumulativeRemoval = 0;

    for (const r of replacements) {
      const byteStart = r.byteStartIndex - cumulativeRemoval;
      const byteEnd = byteStart + r.linkTextByteLength;
      cumulativeRemoval += r.removedByteLength;

      newFacets.push({
        index: { byteStart, byteEnd },
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: ensureProtocol(r.url.trim()),
          },
        ],
      });
    }

    // Step 5: Handle any non-link facets (mentions, tags, etc.)
    const nonLinkFacets = currentFacets.filter(
      (f) =>
        !f.features?.some(
          (feat) => feat.$type === 'app.bsky.richtext.facet#link'
        )
    );

    for (const facet of nonLinkFacets) {
      let { byteStart, byteEnd } = facet.index;
      let shift = 0;

      for (const r of replacements) {
        if (byteStart >= r.originalLinkEndByte) {
          shift += r.removedByteLength;
        }
      }

      newFacets.push({
        ...facet,
        index: {
          byteStart: byteStart - shift,
          byteEnd: byteEnd - shift,
        },
      });
    }

    post.facets = newFacets.sort(
      (a, b) => a.index.byteStart - b.index.byteStart
    );
    return json;
  }

  // --- 1. Intercept Fetch API (CORRECTED Logic) ---
  if (typeof window !== 'undefined' && window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = async function (resource, options) {
      if (resource instanceof Request) {
        let finalResource = resource;
        let isTargetPost = false;
        let url = resource.url;
        isTargetPost =
          resource.method === 'POST' && url.includes(TARGET_ENDPOINT);

        if (isTargetPost && !resource.bodyUsed) {
          try {
            const clonedRequest = resource.clone();
            const originalBodyString = await clonedRequest.text();

            // INLINE MODIFICATION LOGIC
            let modifiedBodyString = originalBodyString;
            if (url.includes(TARGET_ENDPOINT) && originalBodyString) {
              const originalJson = JSON.parse(originalBodyString);
              const modifiedJson = convertMarkdownLinksToRichText(originalJson);
              modifiedBodyString = JSON.stringify(modifiedJson);
            }

            const { method, headers, credentials, mode, cache } = resource;

            // Create a NEW Request object with the modified body
            finalResource = new Request(resource, {
              body: modifiedBodyString,
              method,
              headers,
              credentials,
              mode,
              cache,
            });

            return originalFetch.apply(this, [finalResource]);
          } catch (e) {
            console.error(
              'Bluesky Link Stripper: Error cloning/modifying Request body. Sending original.',
              e
            );
            return originalFetch.apply(this, [resource]);
          }
        }
      }
      // Case B: The 'resource' is a URL string (two argument call)
      else if (typeof resource === 'string' && options) {
        let url = resource;
        let isTargetPost =
          options.method === 'POST' && url.includes(TARGET_ENDPOINT);

        if (isTargetPost && options.body) {
          try {
            const originalJson = JSON.parse(options.body);
            const modifiedJson = convertMarkdownLinksToRichText(originalJson);
            options.body = JSON.stringify(modifiedJson);
          } catch (e) {
            console.error(
              'Bluesky Link Stripper: JSON modification failed, sending original.',
              e
            );
          }
        }
      }

      // Send the original fetch call using the two arguments
      return originalFetch.apply(this, [resource, options]);
    };
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { convertMarkdownLinksToRichText, sample };
  }
})();
