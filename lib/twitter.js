const request = require('request');

module.exports = () =>
  new Promise((resolve) => {
    request(
      {
        url: 'https://cdn.syndication.twimg.com/widgets/followbutton/info.json?lang=en&screen_names=rem',
        json: true,
      },
      (error, res, body) => {
        const returnErrorState = () => {
          resolve({
            followers_count: 49987,
            formatted_followers_count: '47K followers',
            id: '648873',
            name: '@rem',
            screen_name: 'rem',
          });
        };
        if (error) {
          console.log(error);

          return returnErrorState();
        }

        try {
          resolve(body[0]);
        } catch (e) {
          returnErrorState();
        }
      }
    );
  });
