import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from './favoritesSlice';

import Styles from './Favorites.module.scss';

// Components
import { FavoriteCard } from './FavoriteCard';

export function Favorites() {
  const favorites = useSelector(selectFavorites);

  const renderFavorites = favorites.map((favorite) => (
    <FavoriteCard {...favorite} />
  ));
  return (
    <section className={Styles.container}>
      <h1>Your Favorites</h1>
      <div className={Styles.favoriteList}>{renderFavorites}</div>
    </section>
  );
}
