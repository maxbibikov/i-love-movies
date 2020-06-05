import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenres, fetchGenresAsync } from './moviesSlice';

export function MovieGenres({ genre_ids }) {
  const dispatch = useDispatch();
  const allGenreList = useSelector(selectGenres);

  if (allGenreList.length === 0) {
    dispatch(fetchGenresAsync());
  }

  if (genre_ids) {
    // Compose current movie genre names array filtering all genres array by current movie genres array
    const movieGenreNames = allGenreList
      .filter(({ id }) => genre_ids.includes(id))
      .map(({ name }) => name);

    const renderGenres = movieGenreNames.slice(0, 3).join(', ');

    return <i>{renderGenres}</i>;
  }

  return '';
}
