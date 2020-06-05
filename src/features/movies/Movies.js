import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './Movies.module.scss';

// Components
import { ReactComponent as ArrowUpIcon } from '../../assets/arrow_upward-black-48dp.svg';
import { MovieCard } from './MovieCard';
import { Button } from '../../components/Button/Button';
import { Pagination } from './Pagination';

// State
import {
  selectMovies,
  selectPage,
  fetchMoviesAsync,
  nextPage,
  previousPage,
  selectTotalPages,
} from './moviesSlice';

export function Movies() {
  const movies = useSelector(selectMovies);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const filter = 'upcoming';
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMoviesAsync({ filter, page }));
  }, [dispatch, page]);

  const onPreviousBtnClick = () => {
    dispatch(previousPage());
  };

  const onNextBtnClick = () => {
    dispatch(nextPage());
  };

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: 'smooth',
    });

  const renderMovies = movies
    .filter(({ poster_path }) => poster_path !== null)
    .map((movieData) => <MovieCard key={movieData.id} movieData={movieData} />);

  return (
    <section className={Styles.container}>
      <h1>Top Movies</h1>
      <div className={Styles.moviesContainer}>{renderMovies}</div>
      <div className={Styles.row}>
        <Pagination
          totalPages={totalPages}
          page={page}
          onPreviousBtnClick={onPreviousBtnClick}
          onNextBtnClick={onNextBtnClick}
        />
      </div>
      <div className={Styles.row}>
        <Button styleType="outlined" type="button" onClick={scrollToTop}>
          <ArrowUpIcon /> Top
        </Button>
      </div>
    </section>
  );
}
