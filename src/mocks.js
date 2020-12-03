import { setupWorker, rest } from 'msw';
import { movieDBApi } from './utils/index';

// Configure mocking routes
const worker = setupWorker(
  rest.get(movieDBApi.moviesUrl(), (req, res, ctx) => {
    return res(
      // Set custom status
      ctx.status(200),

      // Set headers
      ctx.set({ 'X-Header': 'Mocked value' }),

      // Delay the response
      ctx.delay(1000),

      // send JSON response body
      ctx.json([
        {
          popularity: 58.694,
          vote_count: 16476,
          video: false,
          poster_path: '/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg',
          id: 278,
          adult: false,
          backdrop_path: '/avedvodAZUcwqevBfm8p4G2NziQ.jpg',
          original_language: 'en',
          original_title: 'The Shawshank Redemption',
          genre_ids: [80, 18],
          title: 'The Shawshank Redemption',
          vote_average: 8.7,
          overview:
            'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
          release_date: '1994-09-23',
        },
        {
          popularity: 47.437,
          id: 238,
          video: false,
          vote_count: 12445,
          vote_average: 8.7,
          title: 'The Godfather',
          release_date: '1972-03-14',
          original_language: 'en',
          original_title: 'The Godfather',
          genre_ids: [18, 80],
          backdrop_path: '/ejdD20cdHNFAYAN2DlqPToXKyzx.jpg',
          adult: false,
          overview:
            'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
          poster_path: '/9nzglwFdTHiuMQFzIXHVmkkJdI1.jpg',
        },
      ])
    );
  })
);

/* Start the Service Worker */
worker.start();
