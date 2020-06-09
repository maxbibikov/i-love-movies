import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import moviesReducer from '../features/movies/moviesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';
import movieDetailsReducer from '../features/movieDetails/movieDetailsSlice';

const reducers = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  watchlist: watchlistReducer,
  movieDetails: movieDetailsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
