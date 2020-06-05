import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from './favoritesSlice';
import { FavoriteCard } from './FavoriteCard';
import Styles from './Favorites.module.scss';

export function Favorites() {
  const favorites = useSelector(selectFavorites);
  const renderFavorites = favorites.map((favorite) => (
    <FavoriteCard key={favorite.id} {...favorite} />
  ));

  return (
    <section className={Styles.container}>
      <h1>Favorites</h1>
      <div className={Styles.favoriteList}>{renderFavorites}</div>
    </section>
  );
}
