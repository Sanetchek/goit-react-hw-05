import { Routes, Route, NavLink } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { fetchGenres } from "../../movies-api";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

import Navigation from '../Navigation/Navigation';
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MoviePage = lazy(() => import("../../pages/MoviePage/MoviePage"));
const CastPage = lazy(() => import("../../pages/CastPage/CastPage"));
const ReviewsPage = lazy(() => import("../../pages/ReviewsPage/ReviewsPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    async function getGenreList() {
      try {
        const data = await fetchGenres();
        setGenreList(data.genres);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getGenreList();
  }, []);

  return (
    <>
      <Navigation />

      <main className={css.container}>
        <div className={css.main}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage genres={genreList} />} />
              <Route
                path="/movies"
                element={<MoviesPage genres={genreList} />}
              />
              <Route path="/movies/:movieId" element={<MoviePage />}>
                <Route path="cast" element={<CastPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>

        <Toaster />
      </main>
    </>
  );
}

export default App;
























