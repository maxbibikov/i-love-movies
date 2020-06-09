import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiKey = 'f95b4780d100c9d941e03e79486e1503';
const moviedbAPI = `https://api.themoviedb.org/3/`;
const movieDetailsAPI = (movieId) =>
  `${moviedbAPI}movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`;

export const fetchMovieDetailsAsync = createAsyncThunk(
  'movieDetails',
  async (movieId) => {
    try {
      const response = await fetch(movieDetailsAPI(movieId));
      const data = await response.json();

      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    clearMovieDetails: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [fetchMovieDetailsAsync.pending]: (state, action) => {
      if (state.status === 'idle') {
        state.status = 'pending';
      }
    },
    [fetchMovieDetailsAsync.fulfilled]: (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.data = action.payload;
      }
    },
    [fetchMovieDetailsAsync.rejected]: (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle';
        state.error = action.error;
        state.data = {};
      }
    },
  },
});

export const selectMovieDetails = (state) => state.movieDetails.data;
export const selectStatus = (state) => state.movieDetails.status;
export const { clearMovieDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
