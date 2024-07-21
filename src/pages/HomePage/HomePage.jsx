import React from "react";
import { trendingMovies } from "../../movies-api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage({ genres }) {
  const [movieList, setMovieList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function trendMovieList() {
      try {
        setLoader(true);
        setError(false);

        const data = await trendingMovies();
        setMovieList(data.results);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
    trendMovieList();
  }, []);

  return (
    <>
      <header className={css.header}>
        <h1 className={css.title}>Welcome to Movie Hub</h1>
        <p className={css.description}>
          Discover and explore a wide range of movies. Find details, ratings,
          and genres for your favorite films.
        </p>
      </header>
      {loader && <MoviesLoader />}

      {error ? (
        <ErrorMessage />
      ) : (
        movieList.length > 0 && (
          <MoviesList movies={movieList} genres={genres} />
        )
      )}

    </>
  );
}

