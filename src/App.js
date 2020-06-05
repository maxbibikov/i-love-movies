import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';

// Components
import { Movies } from './features/movies/Movies';
import { MovieDetails } from './features/movieDetails/MovieDetails';
import { Favorites } from './features/favorites/Favorites';
import { Watchlist } from './features/watchlist/Watchlist';

// Assets
import Styles from './App.module.scss';
import { ReactComponent as HeartIcon } from './assets/favorite-black-48dp.svg';

function App() {
  return (
    <BrowserRouter>
      <div className={Styles.App}>
        <header className={Styles.AppHeader}>
          <Link to="/">
            <h2 className={Styles.AppLogo}>
              I
              <HeartIcon />
              Movies
            </h2>
          </Link>
          <nav className={Styles.Nav}>
            <NavLink exact to="/" activeClassName={Styles.NavSelected}>
              Movies
            </NavLink>
            <NavLink to="/favorites" activeClassName={Styles.NavSelected}>
              Favorites
            </NavLink>
            <NavLink to="/watchlist" activeClassName={Styles.NavSelected}>
              Watchlist
            </NavLink>
          </nav>
        </header>
        <main className={Styles.AppMain}>
          <Switch>
            <Route exact path="/">
              <Movies />
            </Route>
            <Route path="/movies/:movieId" component={MovieDetails} />
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/watchlist">
              <Watchlist />
            </Route>
          </Switch>
        </main>
        <footer className={Styles.AppFooter}>
          <p>© {new Date().getFullYear()} Maksym Bibikov</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
