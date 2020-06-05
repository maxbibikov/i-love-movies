import React from 'react';
import { string, number, oneOfType } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../watchlist/watchlistSlice';

import Styles from './WatchlistCard.module.scss';

// Components
import { Button } from '../../components/Button/Button';
import { MovieGenres } from '../movies/MovieGenres';
import { ReactComponent as StarIcon } from '../../assets/star_rate-black-48dp.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete-black-48dp.svg';

export function WatchlistCard({
  id,
  poster_path,
  title,
  vote_average,
  overview,
  genre_ids,
}) {
  const dispatch = useDispatch();
  const nodeRef = React.useRef(null);
  const renderOverview = (maxLength) =>
    overview.length > maxLength
      ? `${overview.substring(0, maxLength)}...`
      : overview;

  const onRemoveFromWatchlistClick = () => {
    dispatch(removeFromWatchlist(id));
  };

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
      <div className={Styles.container} ref={nodeRef}>
        <div className={Styles.poster}>
          <Link to={`/movies/${id}`}>
            <img
              alt={`poster: ${title}`}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            />
          </Link>
          <div className={Styles.rating}>
            {vote_average > 0 ? (
              <>
                <StarIcon />
                {Math.floor(vote_average * 10)}%
              </>
            ) : (
              'No rating'
            )}
          </div>
        </div>
        <main className={Styles.content}>
          <header>
            <Link to={`/movies/${id}`}>
              <h3 className={Styles.title}>{title}</h3>
            </Link>
            <MovieGenres genre_ids={genre_ids} />
          </header>
          {/* Overview for small screens */}
          <p className={Styles.overview}>{renderOverview(50)}</p>
          {/* Overview for large screens */}
          <p className={Styles.overviewLarge}>{renderOverview(150)}</p>
        </main>
        <div className={Styles.actions}>
          <Button
            styleType="icon"
            aria-label="Remove from watchlist"
            onClick={onRemoveFromWatchlistClick}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
}

WatchlistCard.propTypes = {
  id: oneOfType([string, number]).isRequired,
  title: string.isRequired,
  vote_average: number.isRequired,
  overview: string.isRequired,
};
