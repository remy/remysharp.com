import type { Config, Context } from 'https://edge.netlify.com';

const rootUrl = 'https://remysharp.com';

const root = new URL(rootUrl);

export default async function (req: Request, { next }: Context) {
  try {
    if (!req.headers.get('referer')?.startsWith(rootUrl)) {
      return new Response(null, { status: 204 });
    }

    // Get the URL from the query string parameter 'url'
    const url = new URL(req.url);
    const urlParam = url.searchParams.get('url');
    if (urlParam === null) {
      return new Response(null, { status: 204 });
    }

    const res = await next({ sendConditionalRequest: true });

    const useWayback = !!url.searchParams.get('wayback');

    if (res.status === 304) {
      // if the client is has a cached version, just let them do it
      return res;
    }

    const targetUrl = new URL(urlParam);

    let status = 0;

    try {
      if (!useWayback) {
        // set a 2s timeout (1s was too tight for some sites)
        const response = await fetchWithTimeout(targetUrl, {}, 2000);
        status = response.status;
      }
    } catch (_) {
      status = 400;
    }

    // Check the status code of the response
    if (status === 200) {
      // the target page is fine, so redirect to it as a perma-redirect
      return Response.redirect(urlParam, 301);
    } else {
      // If the status code is not 200, fetch the Wayback Machine CDX API
      let waybackUrl = `https://web.archive.org/cdx/search/cdx?output=json&filter=statuscode:200&url=${encodeURIComponent(
        urlParam
      )}&`;

      // then add the date of the blog post (if we can from that) to get an
      // good representative of the page at the time
      const date = url.searchParams.get('date');
      if (date) {
        waybackUrl += `from=${date}&limit=1`;
      } else {
        // otherwise just take the last 200
        waybackUrl += `limit=-1`;
      }

      const waybackResponse = await fetch(waybackUrl);
      const waybackData = (await waybackResponse.json()) as [
        String[],
        String[]
      ];

      // Check if the Wayback Machine response includes a value of 200
      if (waybackData && waybackData.length > 1 && waybackData[1]) {
        // Redirect to the URL from Wayback Machine
        const waybackUrl = new URL(
          `https://web.archive.org/web/${waybackData[1][1]}/${waybackData[1][2]}`
        );
        return Response.redirect(waybackUrl, 301);
      } else {
        // fail: sending 302 to original URL, unknown
        return Response.redirect(targetUrl, 302);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the execution
    console.log('[fail] errored: ' + error.message);
    return Response.redirect(root, 500);
  }
}

export const config: Config = {
  path: '/redirect',
};

async function fetchWithTimeout(uri: URL, options = {}, time = 5000) {
  const controller = new AbortController();
  const config = { ...options, signal: controller.signal };

  setTimeout(() => controller.abort(), time);

  try {
    const response = await fetch(uri, config);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    // When we abort our `fetch`, the controller conveniently throws
    // a named error, allowing us to handle them separately from
    // other errors.
    if (error.name === 'AbortError') {
      throw new Error('Response timed out');
    }

    throw new Error(error.message);
  }
}
