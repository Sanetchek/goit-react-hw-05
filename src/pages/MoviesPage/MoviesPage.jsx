import { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../../movies-api";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function MoviesPage({ genres }) {
  const [movieName, setMovieName] = useState("");
  const [moviesList, setMoviesList] = useState([]); // Ensured initialization to empty array
  const [totalResults, setTotalResults] = useState(0);
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

        const data = await searchMovies(movieName);
        setMoviesList(Array.isArray(data.results) ? data.results : []);
        setTotalResults(data.total_results || 0);
        console.log(data);
      } catch (error) {
        toast.error(error.message);
        setMoviesList([]);
        setTotalResults(0);
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

      {totalResults > 0 ? (
        <MoviesList movies={filteredMovies} genres={genres} />
      ) : (
        <p>No results found</p>
      )}
    </>
  );
}

