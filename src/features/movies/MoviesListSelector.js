import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Styles from './MoviesListSelector.module.scss';
import { selectMovieListType, setMovieListType } from './moviesSlice';
import { ReactComponent as ExpandIcon } from '../../assets/expand_more-black-48dp.svg';

export function MoviesListSelector() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const movieListType = useSelector(selectMovieListType);
  const nodeRef = React.useRef(null);

  const onListBtnClick = () => setMenuOpen(!menuOpen);
  const onListTypeBtnClick = (event) => {
    dispatch(setMovieListType(event.target.dataset.name));
    setMenuOpen(false);
  };

  let selectedTypeList = '';

  switch (movieListType) {
    case 'top_rated':
      selectedTypeList = 'Top Rated';
      break;
    case 'popular':
      selectedTypeList = 'Popular';
      break;
    case 'upcoming':
      selectedTypeList = 'Upcoming';
      break;
    case 'now_playing':
      selectedTypeList = 'Now Playing';
      break;

    default:
      break;
  }

  return (
    <div className={Styles.container}>
      <button data-testid="list-menu-toggle" className={Styles.menuToggleBtn} onClick={onListBtnClick}>
        {selectedTypeList}{' '}
        <ExpandIcon
          className={Styles.arrowIcon}
          style={
            menuOpen
              ? {
                  transform: 'rotate(180deg)',
                }
              : {}
          }
        />
      </button>
      <CSSTransition
        nodeRef={nodeRef}
        in={menuOpen}
        timeout={100}
        unmountOnExit
        classNames={{
          enter: Styles['enter'],
          enterActive: Styles['enter-active'],
          exit: Styles['exit'],
          exitActive: Styles['exit-active'],
        }}
      >
        <div ref={nodeRef} className={Styles.listMenu}>
          {movieListType !== 'top_rated' && (
            <button onClick={onListTypeBtnClick} data-name="top_rated">
              Top Rated
            </button>
          )}
          {movieListType !== 'upcoming' && (
            <button onClick={onListTypeBtnClick} data-name="upcoming">
              Upcoming
            </button>
          )}
          {movieListType !== 'popular' && (
            <button onClick={onListTypeBtnClick} data-name="popular">
              Popular
            </button>
          )}
          {movieListType !== 'now_playing' && (
            <button onClick={onListTypeBtnClick} data-name="now_playing">
              Now Playing
            </button>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
