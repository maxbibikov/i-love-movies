import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import dayjs from 'dayjs';

import Styles from './MovieDetails.module.scss';

// Components
import { Loader } from '../../components/Loader';
import { VideoModal } from './VideoModal';
import { FavoriteBtn } from '../favorites/FavoriteBtn';
import { WatchlistBtn } from '../watchlist/WatchlistBtn';
import { ReactComponent as PlayIcon } from '../../assets/play_arrow-black-48dp.svg';

// State
import {
  selectMovieDetails,
  fetchMovieDetailsAsync,
  clearMovieDetails,
  selectStatus,
} from './movieDetailsSlice';

// Utils
import { getPercentRating } from '../../utils';

export function MovieDetails() {
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const dispatch = useDispatch();
  const { movieId } = useParams('movieId');
  const movieDetails = useSelector(selectMovieDetails);
  const status = useSelector(selectStatus);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(fetchMovieDetailsAsync(movieId));

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, movieId]);

  const onVideoImgClick = () => {
    setShowVideoModal(true);
  };

  const closeModal = () => {
    setShowVideoModal(false);
  };

  if (status === 'pending' || !movieDetails.id) {
    return <Loader />;
  }

  const {
    title,
    release_date,
    vote_average,
    tagline,
    overview,
    genres,
    runtime,
    budget,
    homepage,
    videos,
    credits,
    poster_path,
  } = movieDetails;
  const videoKey =
    videos &&
    videos.results
      .filter(({ site, type }) => site === 'YouTube' && type === 'Trailer')
      .map(({ key }) => key)[0];
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
  const director = credits.crew.find(({ job }) => job === 'Director');
  const novel = credits.crew.find(({ job }) => job === 'Novel');
  const screenplay = credits.crew.find(({ job }) => job === 'Screenplay');

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
      <section ref={nodeRef} className={Styles.container}>
        <header className={Styles.header}>
          <img className={Styles.backgroundImg} src={backdropUrl} alt={title} />
          <img className={Styles.poster} src={posterUrl} alt={title} />

          <div>
            <h1>
              {title}{' '}
              <span className={Styles.year}>
                ({dayjs(release_date).year()})
              </span>
            </h1>

            <p>
              <i>{genres.map((genre) => genre.name).join(', ')}</i>
            </p>

            <p>
              <strong>{getPercentRating(vote_average)}% </strong>User Rating{' '}
              {homepage && (
                <>
                  <strong>|</strong>{' '}
                  <a href={homepage} target="_blank" rel="noopener noreferrer">
                    <strong>Official Website</strong>
                  </a>
                </>
              )}
            </p>

            <p>
              Duration: <strong>{Math.floor(runtime / 60)}</strong>h{' '}
              <strong> {runtime % 60}</strong>min
            </p>

            <p>
              Release date:{' '}
              <strong>{dayjs(release_date).format('MMMM DD, YYYY')}</strong>
            </p>
            {budget > 0 && (
              <p>
                Budget: <strong>{budget.toLocaleString()}$</strong>
              </p>
            )}
            <div className={Styles.overview}>
              {tagline && (
                <i>
                  <q>{tagline}</q>
                </i>
              )}
              <h3>Overview</h3> <p>{overview}</p>
            </div>

            <div className={Styles.mainCredits}>
              {director && (
                <p>
                  Director
                  <strong>{director.name}</strong>
                </p>
              )}

              {novel && (
                <p>
                  Novel
                  <strong>{novel.name}</strong>
                </p>
              )}

              {screenplay && (
                <p>
                  Screenplay
                  <strong>{screenplay.name}</strong>
                </p>
              )}
            </div>
          </div>
        </header>

        {/* ACTIONS */}
        <div className={Styles.actions}>
          <WatchlistBtn movieData={movieDetails} />
        </div>

        {/* TRAILERS */}
        <section className={Styles.trailers}>
          <h1>Watch Trailer</h1>
          <button className={Styles.trailerBtn} onClick={onVideoImgClick}>
            <img
              src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
              alt={`${title} video thumbnail`}
            />
            <PlayIcon />
          </button>
        </section>

        <VideoModal
          videoKey={videoKey}
          onCloseClick={closeModal}
          title={title}
          showVideoModal={showVideoModal}
        />

        {/* CAST */}
        <div className={Styles.castContainer}>
          <h1>Top Billed Cast</h1>
          <div className={Styles.castList}>
            {credits.cast
              .filter((actor) => actor.profile_path)
              .slice(0, 8)
              .map((actor) => (
                <div key={actor.id} className={Styles.actor}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <strong>{actor.name}</strong>
                  <p>{actor.character}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={Styles.fab}>
          <FavoriteBtn movieData={movieDetails} />
        </div>
      </section>
    </CSSTransition>
  );
}
