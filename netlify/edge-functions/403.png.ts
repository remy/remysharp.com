import type { Config, Context } from 'https://edge.netlify.com';

const BASE_URL = 'https://remysharp.com/shot';

const images = [
  `${BASE_URL}/cat-drunk-icon.png`,
  `${BASE_URL}/cat-grumpy-icon.png`,
  `${BASE_URL}/cat-poo-icon.png`,
  `${BASE_URL}/cat-clean-icon.png`,
  `${BASE_URL}/cat-box-icon.png`,
  `${BASE_URL}/cat-tied-icon.png`,
];

export default async (
  request: Request,
  context: Context
): Promise<Response> => {
  // Get a random image from the array
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // Fetch the image
  const response = await fetch(randomImage);

  // Create a new response with the image data
  const newResponse = new Response(response.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });

  return newResponse;
};

export const config: Config = {
  path: '/service/403.png',
};
