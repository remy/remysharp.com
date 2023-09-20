import type { Config, Context } from 'https://edge.netlify.com';

const root = new URL('https://remysharp.com');

export default async function (req: Request, { next }: Context) {
  try {
    // Get the URL from the query string parameter 'url'
    const url = new URL(req.url);
    const urlParam = url.searchParams.get('url');
    const res = await next({ sendConditionalRequest: true });

    if (urlParam === null) {
      console.log('[fail] bad usage');
      return Response.redirect(root, 301);
    }

    if (res.status === 304) {
      console.log('[cached] returning untouched');
      return res;
    }

    const targetUrl = new URL(urlParam);

    let status = 0;

    try {
      const response = await fetchWithTimeout(targetUrl, {}, 1000);
      status = response.status;
    } catch (_) {
      status = 400;
    }

    // Check the status code of the response
    if (status === 200) {
      console.log('[ok] redirecting to 200 resource');
      return Response.redirect(urlParam, 301);
    } else {
      // If the status code is not 200, fetch the Wayback Machine API
      const waybackUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(
        urlParam
      )}`;
      const waybackResponse = await fetch(waybackUrl);
      const waybackData = await waybackResponse.json();

      // Check if the Wayback Machine response includes a value of 200
      if (
        waybackData &&
        waybackData.archived_snapshots &&
        waybackData.archived_snapshots.closest &&
        waybackData.archived_snapshots.closest.status === '200'
      ) {
        // Redirect to the URL from Wayback Machine
        const waybackUrl = new URL(waybackData.archived_snapshots.closest.url);
        console.log('[301] redirecting to wayback archive');
        return Response.redirect(waybackUrl, 301);
      } else {
        // Return an error response if the Wayback Machine does not have a valid snapshot
        console.log('[fail] sending 302 to original URL, unknown');
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

  const timeout = setTimeout(() => {
    controller.abort();
  }, time);

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
