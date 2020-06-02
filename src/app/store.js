import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';

export default configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
  },
});
