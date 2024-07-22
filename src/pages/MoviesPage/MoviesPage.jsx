import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api";
import toast from "react-hot-toast";
import { useSearchParams, useLocation } from "react-router-dom";

import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage({ genres }) {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieFilter = searchParams.get("movie") ?? "";
  const [movieName, setMovieName] = useState(movieFilter);

  // Update movieName state when the searchParams change
  useEffect(() => {
    if (movieFilter !== movieName) {
      setMovieName(movieFilter);
    }
  }, [movieFilter]);

  // Fetch movies when movieName changes
  useEffect(() => {
    async function getSearchedMovies() {
      if (!movieName) return;

      try {
        setMoviesList([]);
        setTotalResults(0);
        setLoader(true);
        setError(false);

        const data = await searchMovies(movieName);
        setMoviesList(Array.isArray(data.results) ? data.results : []);
        setTotalResults(data.total_results || 0);
      } catch (error) {
        setError(true);
        toast.error(error.message);
        setMoviesList([]);
        setTotalResults(0);
      } finally {
        setLoader(false);
      }
    }

    getSearchedMovies();
  }, [movieName]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const value = event.target.search.value.trim().toLowerCase();
    if (value) {
      setMovieName(value);
      searchParams.set("movie", value);
      setSearchParams(searchParams);
      setHasSearched(true); // Set hasSearched to true when a search is submitted
    } else {
      toast.error("Please enter a movie name.");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={css.form}>
        <input
          type="text"
          name="search"
          id="search"
          className={css.input}
          defaultValue={movieFilter}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {loader && <MoviesLoader />}

      {error ? (
        <ErrorMessage />
      ) : hasSearched && !loader && totalResults === 0 ? (
        <p>No results found</p>
      ) : (
        <MovieList movies={moviesList} genres={genres} />
      )}
    </>
  );
}
