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

  const TARGET_ENDPOINT = '/xrpc/com.atproto.repo.applyWrites';
  const CREATE_POST_TYPE = 'com.atproto.repo.applyWrites#create';
  const POST_COLLECTION = 'app.bsky.feed.post';

  function ensureProtocol(url) {
    if (!url) return url;
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }

  /**
   * Converts a Bluesky post JSON by detecting Markdown links [text](url),
   * stripping the (url) part from the 'text' field, and updating the
   * 'facets' using correct UTF-8 byte offsets and precise calculation.
   */
  function convertMarkdownLinksToRichText(json) {
    const encoder = new TextEncoder();
    const createPostWrite = json.writes.find(
      (write) =>
        write.$type === CREATE_POST_TYPE && write.collection === POST_COLLECTION
    );

    if (!createPostWrite) return json;

    const post = createPostWrite.value;
    let originalText = post.text;
    let currentFacets = post.facets || [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const replacements = [];
    let match;

    // 1. Calculate byte properties for all replacements
    while ((match = linkRegex.exec(originalText)) !== null) {
      const fullMatch = match[0];
      const linkText = match[1];
      const url = match[2];

      const byteStartIndex = encoder.encode(
        originalText.substring(0, match.index)
      ).length;

      const linkTextByteLength = encoder.encode(linkText).length;

      // Calculate the end byte of the original full markdown link using byte lengths
      const originalLinkByteLength = encoder.encode(fullMatch).length;
      const removedByteLength = originalLinkByteLength - linkTextByteLength;

      replacements.push({
        charIndex: match.index,
        fullMatch,
        linkText,
        url,
        byteStartIndex,
        removedByteLength,
        linkTextByteLength,
        originalLinkEndByte: byteStartIndex + originalLinkByteLength,
      });
    }

    if (replacements.length === 0) return json;

    // 2. Recalculate and update post.text (using character indices)
    let newText = originalText;
    for (let i = replacements.length - 1; i >= 0; i--) {
      const r = replacements[i];
      newText =
        newText.substring(0, r.charIndex) +
        r.linkText +
        newText.substring(r.charIndex + r.fullMatch.length);
    }
    post.text = newText;

    // 3. Rebuild markdown facets and shift any pre-existing facets accordingly
    const preservedFacets = [];
    if (currentFacets.length > 0) {
      currentFacets.forEach((facet) => {
        const clone = JSON.parse(JSON.stringify(facet));
        let shift = 0;
        let overlapsMarkdown = false;

        for (const r of replacements) {
          if (
            clone.index.byteStart >= r.byteStartIndex &&
            clone.index.byteEnd <= r.originalLinkEndByte
          ) {
            overlapsMarkdown = true;
            break;
          }

          if (clone.index.byteStart >= r.originalLinkEndByte) {
            shift += r.removedByteLength;
          }
        }

        if (!overlapsMarkdown) {
          clone.index.byteStart -= shift;
          clone.index.byteEnd -= shift;
          preservedFacets.push(clone);
        }
      });
    }

    const markdownFacets = [];
    let cumulativeRemoval = 0;
    for (const r of replacements) {
      const byteStart = r.byteStartIndex - cumulativeRemoval;
      const byteEnd = byteStart + r.linkTextByteLength;
      cumulativeRemoval += r.removedByteLength;

      markdownFacets.push({
        index: { byteStart, byteEnd },
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: ensureProtocol(r.url.trim()),
          },
        ],
      });
    }

    post.facets = [...preservedFacets, ...markdownFacets].sort(
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
})();
