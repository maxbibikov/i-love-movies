import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { Button } from '../../components/Button';
import { ReactComponent as FavoriteOutlineIcon } from '../../assets/favorite_border-black-48dp.svg';
import { ReactComponent as FavoriteIcon } from '../../assets/favorite-black-48dp.svg';

// State
import { selectFavorites, addFavorite, removeFavorite } from './favoritesSlice';

export function FavoriteBtn({ movieData }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const inFavorites =
    favorites.length > 0 &&
    favorites.find((favorite) => {
      return favorite.id.toString() === movieData.id.toString();
    });

  const onAddFavoriteClick = () => {
    dispatch(addFavorite(movieData));
  };

  const onRemoveFavoriteClick = () => {
    dispatch(removeFavorite(movieData.id));
  };

  if (inFavorites) {
    return (
      <Button styleType="icon" onClick={onRemoveFavoriteClick}>
        <FavoriteIcon />
      </Button>
    );
  }

  return (
    <Button styleType="icon" onClick={onAddFavoriteClick}>
      <FavoriteOutlineIcon />
    </Button>
  );
}

FavoriteBtn.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};
