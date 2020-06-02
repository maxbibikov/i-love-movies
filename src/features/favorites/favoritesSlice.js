import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      return state.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
