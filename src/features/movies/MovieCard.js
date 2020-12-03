import React from 'react';
import dayjs from 'dayjs';
import { array } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Styles from './MovieCard.module.scss';

// Components
import { Movies } from './Movies';
import { FavoriteBtn } from '../favorites/FavoriteBtn';
import { WatchlistBtn } from '../watchlist/WatchlistBtn';
import { MovieGenres } from './MovieGenres';
import { ReactComponent as StarIcon } from '../../assets/star_rate-black-48dp.svg';

// Utils
import { getPercentRating } from '../../utils';

export function MovieCard({ movieData }) {
  const {
    id,
    overview,
    genre_ids,
    title,
    vote_average,
    release_date,
    poster_path,
  } = movieData;
  const nodeRef = React.useRef(null);

  const renderOverview =
    overview.length > 150 ? `${overview.substring(0, 150)}...` : overview;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      appear
      in
      timeout={200}
      unmountOnExit
      classNames={{
        appear: Styles['appear-enter'],
        appearActive: Styles['appear-enter-active'],
      }}
    >
      <div data-testid="movie-card" className={Styles.movie} ref={nodeRef}>
        <Link to={`/movies/${id}`}>
          <div className={Styles.poster}>
            <img
              alt={`poster: ${title}`}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            />
          </div>
        </Link>
        <header>
          <div className={Styles.rating}>
            {vote_average > 0 ? (
              <>
                <StarIcon />
                {getPercentRating(vote_average)}%
              </>
            ) : (
              'No rating'
            )}
          </div>
          <Link to={`/movies/${id}`}>
            <h3 className={Styles.title}>{title}</h3>
          </Link>
          <MovieGenres genre_ids={genre_ids} />
          <p className={Styles.date}>
            {dayjs(release_date).format('MMM DD, YYYY')}
          </p>
        </header>
        <main className={Styles.content}>
          <p className={Styles.overview}>{renderOverview}</p>
        </main>
        <footer className={Styles.actions}>
          <WatchlistBtn movieData={movieData} />
          <FavoriteBtn movieData={movieData} />
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
