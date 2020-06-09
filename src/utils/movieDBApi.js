const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
const moviedbAPI = `https://api.themoviedb.org/3/`;

const moviesUrl = (movieListType = 'top_rated', page = 1) =>
  `${moviedbAPI}movie/${movieListType}?api_key=${apiKey}&language=en-US&region=US&page=${page}`;

const genresUrl = (lang = 'en-US') =>
  `${moviedbAPI}genre/movie/list?api_key=${apiKey}&language=${lang}`;

const movieDetailsUrl = (movieId) =>
  `${moviedbAPI}movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`;

export const movieDBApi = {
  moviesUrl,
  genresUrl,
  movieDetailsUrl,
};
