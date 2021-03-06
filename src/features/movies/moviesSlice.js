import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieDBApi } from '../../utils';

export const fetchMoviesAsync = createAsyncThunk(
  'movies',
  async ({ movieListType, page }) => {
    try {
      const response = await fetch(movieDBApi.moviesUrl(movieListType, page));
      const data = await response.json();

      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const fetchGenresAsync = createAsyncThunk('genres', async () => {
  try {
    const response = await fetch(movieDBApi.genresUrl());
    const data = await response.json();

    return data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    entities: [],
    genres: [],
    status: 'idle',
    page: 1,
    totalPages: 1,
    movieListType: 'top_rated',
    error: null,
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
    setMovieListType: (state, action) => {
      state.movieListType = action.payload;
    },
  },

  extraReducers: {
    [fetchMoviesAsync.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [fetchMoviesAsync.fulfilled]: (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.entities =
          action.payload.results && Array.from(action.payload.results);
        state.totalPages = action.payload.total_pages;
      }
    },
    [fetchMoviesAsync.rejected]: (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.entities = [];
        state.error = action.error;
      }
    },
    [fetchGenresAsync.fulfilled]: (state, action) => {
      state.genres = Array.from(action.payload.genres);
    },
  },
});

export const { nextPage, previousPage, setMovieListType } = moviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMovies = (state) => state.movies.entities;
export const selectGenres = (state) => state.movies.genres;
export const selectPage = (state) => state.movies.page;
export const selectTotalPages = (state) => state.movies.totalPages;
export const selectMovieListType = (state) => state.movies.movieListType;
export const selectStatus = (state) => state.movies.status;

export default moviesSlice.reducer;
