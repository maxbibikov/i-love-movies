import React from 'react';
import { useSelector } from 'react-redux';
import { selectWatchlist } from './watchlistSlice';
import { WatchlistCard } from './WatchlistCard';
import Styles from './Watchlist.module.scss';

export function Watchlist() {
  const watchlist = useSelector(selectWatchlist);
  const renderWatchlist = watchlist.map((media) => (
    <WatchlistCard key={media.id} {...media} />
  ));
  return (
    <section className={Styles.container}>
      <h1>Watchlist</h1>
      <div className={Styles.watchList}>{renderWatchlist}</div>
    </section>
  );
}
