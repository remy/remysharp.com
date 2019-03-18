const http = require('http');
const handler = require('serve-handler');

http
  .createServer(async (request, response) => {
    console.log(request.url);

    if (request.url.startsWith('/images/')) {
      response.writeHead(302, {
        Location: 'https://remysharp.netlify.com' + request.url,
      });
      response.end();
      return;
    }

    await handler(request, response, { public: '_site' });
  })
  .listen(9000);
