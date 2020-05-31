import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Movies } from './features/movies/Movies';
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
            <NavLink to="/tv-shows" activeClassName={Styles.NavSelected}>
              TV
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
            <Route path="/tv-shows"></Route>
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
