import { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../../movies-api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import css from "./MoviesPage.module.css";
import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage({ genres }) {
  const [movieName, setMovieName] = useState("");
  const [moviesList, setMoviesList] = useState([]); // Ensured initialization to empty array
  const [totalResults, setTotalResults] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieFilter = searchParams.get("movie") ?? "";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const value = event.target.search.value.trim().toLowerCase();
    if (value) {
      setMovieName(value);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("movie", value);
      setSearchParams(newSearchParams);
    } else {
      toast.error("Please enter a movie name.");
    }
  };

  const filteredMovies = useMemo(() => {
    return (moviesList || []).filter((movie) =>
      movie.title.toLowerCase().includes(movieFilter.toLowerCase())
    );
  }, [movieFilter, moviesList]);

  useEffect(() => {
    if (!movieName) {
      return;
    }

    async function getSearchedMovies() {
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
      ) : (
        totalResults > 0 ? (
          <MoviesList movies={filteredMovies} genres={genres} />
        ) : (
          <p>No results found</p>
        )
      )}

    </>
  );
}








