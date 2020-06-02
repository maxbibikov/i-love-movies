import React from 'react';
import { array } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../favorites/favoritesSlice';

import Styles from './FavoriteCard.module.scss';

// Components
import { Button } from '../../components/Button/Button';
import { ReactComponent as StarIcon } from '../../assets/star_rate-black-48dp.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete-black-48dp.svg';

export function FavoriteCard({ id, posterUrl, title, voteAverage, overview }) {
  const dispatch = useDispatch();
  const nodeRef = React.useRef(null);
  const renderOverview =
    overview.length > 50 ? `${overview.substring(0, 50)}...` : overview;

  const onRemoveFavoriteClick = () => {
    dispatch(removeFavorite(id));
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
          <img
            alt={`poster: ${title}`}
            src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
          />
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
        </div>
        <main className={Styles.content}>
          <header>
            <h3 className={Styles.title}>{title}</h3>
          </header>
          <p className={Styles.overview}>{renderOverview}</p>
        </main>
        <div className={Styles.actions}>
          <Button
            styleType="icon"
            aria-label="Remove from favorites"
            onClick={onRemoveFavoriteClick}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
}

FavoriteCard.propTypes = {
  movieGenreIds: array.isRequired,
  allGenreList: array.isRequired,
};

FavoriteCard.defaultProps = {
  movieGenreIds: [],
  allGenreList: [],
};
