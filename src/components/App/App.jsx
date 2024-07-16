import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import css from "./App.module.css";
import Home from "../../pages/Home";
import Movies from "../../pages/Movies";
import Cast from "../../pages/Cast";
import Reviews from "../../pages/Reviews";

function App() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.link} >
            Home
          </NavLink>
          <NavLink to="/movies" className={css.link} >
            Movies
          </NavLink>
        </nav>
      </header>

      <main className={css.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/movies/:id" />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;




