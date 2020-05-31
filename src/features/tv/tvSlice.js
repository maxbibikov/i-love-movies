import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiKey = 'f95b4780d100c9d941e03e79486e1503';
const moviedbAPI = `https://api.themoviedb.org/3/`;
const moviesAPI = (filter = 'top_rated', page = 1) =>
  `${moviedbAPI}/movie/top_rated?api_key=${apiKey}&language=en-US&region=US&page=${page}`;
const tvShowsAPI = (filter = 'top_rated', page = 1) =>
  `${moviedbAPI}/tv/top_rated?api_key=${apiKey}&language=en-US&region=US&page=${page}`;

export const fetchMoviesAsync = createAsyncThunk('movies', async ({ page }) => {
  try {
    const response = await fetch(moviesAPI(page));
    const data = await response.json();

    return data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const fetchTVShowsAsync = createAsyncThunk(
  'movies',
  async ({ page }) => {
    try {
      const response = await fetch(tvShowsAPI(page));
      const data = await response.json();

      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    entities: [],
    loading: 'idle',
    page: 1,
    totalPages: 1,
  },
  reducers: {
    nextPage: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const nextPage = state.page + 1;
      if (state.totalPages > 1 && nextPage <= state.totalPages) {
        state.page = nextPage;
      }
    },
    previousPage: (state) => {
      const previousPage = state.page - 1;

      if (state.totalPages > 1 && state.page > 1) {
        state.page = previousPage;
      }
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: {
    [fetchMoviesAsync.fulfilled]: (state, action) => {
      state.entities = Array.from(action.payload.results);
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
  },
});

export const { nextPage, previousPage } = moviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMovies = (state) => state.movies.entities;
export const selectPage = (state) => state.movies.page;

export default moviesSlice.reducer;
