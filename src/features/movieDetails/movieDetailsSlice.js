import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieDBApi } from '../../utils';

export const fetchMovieDetailsAsync = createAsyncThunk(
  'movieDetails',
  async (movieId) => {
    try {
      const response = await fetch(movieDBApi.movieDetailsUrl(movieId));
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
