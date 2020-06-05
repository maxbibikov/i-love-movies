import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as WatchlistListIcon } from '../../assets/add-black-48dp.svg';
import { ReactComponent as WatchlistListRemoveIcon } from '../../assets/remove-black-48dp.svg';

import {
  addToWatchlist,
  removeFromWatchlist,
  selectWatchlist,
} from './watchlistSlice';
import { Button } from '../../components/Button';

export function WatchlistBtn({ movieData }) {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const inWatchlist =
    watchlist.length > 0 &&
    watchlist.find(
      (watchlistMedia) =>
        watchlistMedia.id.toString() === movieData.id.toString()
    );

  const onAddToWatchlistClick = () => {
    dispatch(addToWatchlist(movieData));
  };

  const onRemoveFromWatchlistClick = () => {
    dispatch(removeFromWatchlist(movieData.id));
  };

  if (inWatchlist) {
    return (
      <Button
        type="button"
        styleType="outlined"
        aria-label="Remove from watchlist"
        onClick={onRemoveFromWatchlistClick}
      >
        <WatchlistListRemoveIcon />
        Watchlist
      </Button>
    );
  }

  return (
    <Button
      type="button"
      styleType="contained"
      aria-label="Add to watchlist"
      onClick={onAddToWatchlistClick}
    >
      <WatchlistListIcon />
      Watchlist
    </Button>
  );
}
