import React from 'react';
import dayjs from 'dayjs';
import { array } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from '../favorites/favoritesSlice';

import Styles from './MovieCard.module.scss';

// Components
import { Movies } from './Movies';
import { Button } from '../../components/Button/Button';
import { ReactComponent as StarIcon } from '../../assets/star_rate-black-48dp.svg';
import { ReactComponent as FavoriteOutlineIcon } from '../../assets/favorite_border-black-48dp.svg';
import { ReactComponent as FavoriteIcon } from '../../assets/favorite-black-48dp.svg';
import { ReactComponent as WatchListIcon } from '../../assets/add_to_queue-black-48dp.svg';

export function MovieCard({
  id,
  posterUrl,
  title,
  voteAverage,
  releaseDate,
  overview,
  movieGenreIds,
  allGenreList,
}) {
  const dispatch = useDispatch();
  const nodeRef = React.useRef(null);
  const favorites = useSelector(selectFavorites);
  const inFavorites =
    favorites.length > 0 && favorites.find((favorite) => favorite.id === id);
  const renderOverview =
    overview.length > 150 ? `${overview.substring(0, 150)}...` : overview;
  let renderGenres = '';

  if (movieGenreIds) {
    // Compose current movie genre names array filtering all genres array by current movie genres array
    const movieGenreNames = allGenreList
      .filter(({ id }) => movieGenreIds.includes(id))
      .map(({ name }) => name);

    renderGenres = movieGenreNames.slice(0, 3).join(', ');
  }

  const onAddFavoriteClick = () => {
    dispatch(
      addFavorite({
        id,
        posterUrl,
        title,
        voteAverage,
        releaseDate,
        overview,
      })
    );
  };

  const onRemoveFavoriteClick = () => {
    dispatch(removeFavorite(id));
  };

  const favoriteBtn = inFavorites ? (
    <Button
      styleType="icon"
      aria-label="Remove from favorites"
      onClick={onRemoveFavoriteClick}
    >
      <FavoriteIcon />
    </Button>
  ) : (
    <Button
      styleType="icon"
      aria-label="Add to favorites"
      onClick={onAddFavoriteClick}
    >
      <FavoriteOutlineIcon />
    </Button>
  );

  const watchListBtn = (
    <Button
      styleType="contained"
      aria-label="Add to watchlist"
      onClick={() => {}}
    >
      <WatchListIcon />
      Watchlist
    </Button>
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      appear
      in
      timeout={1000}
      unmountOnExit
      classNames={{
        appear: Styles['appear-enter'],
        appearActive: Styles['appear-enter-active'],
      }}
    >
      <div className={Styles.movie} ref={nodeRef}>
        <div className={Styles.poster}>
          <img
            alt={`poster: ${title}`}
            src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
          />
        </div>
        <header>
          <div className={Styles.rating}>
            {voteAverage > 0 ? (
              <>
                <StarIcon />
                {Math.floor(voteAverage * 10)}%
              </>
            ) : (
              'No rating'
            )}
          </div>
          <h3 className={Styles.title}>{title}</h3>
          <p className={Styles.genres}>{renderGenres}</p>
          <p className={Styles.date}>
            {dayjs(releaseDate).format('MMM DD, YYYY')}
          </p>
        </header>
        <main className={Styles.content}>
          <p className={Styles.overview}>{renderOverview}</p>
        </main>
        <footer className={Styles.actions}>
          {watchListBtn}
          {favoriteBtn}
        </footer>
      </div>
    </CSSTransition>
  );
}

Movies.propTypes = {
  movieGenreIds: array.isRequired,
  allGenreList: array.isRequired,
};

Movies.defaultProps = {
  movieGenreIds: [],
  allGenreList: [],
};
