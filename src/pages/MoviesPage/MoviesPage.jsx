import { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../../movies-api";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage({ genres }) {
  const [movieName, setMovieName] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieFilter = searchParams.get("movie") ?? "";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const value = event.target.search.value.trim();
    setMovieName(value.toLowerCase());
    searchParams.set("movie", value);
    setSearchParams(searchParams);
  };

  const filteredMovies = useMemo(() => {
    return moviesList.filter((movie) =>
      movie.cardOwner.toLowerCase().includes(movieFilter.toLowerCase())
    );
  }, [movieFilter, moviesList]);

  useEffect(() => {
    if (!movieName) {
      return;
    }

    async function getSearchedMovies() {
      try {
        const data = await searchMovies(movieName);
        setMoviesList(data.results);
        setTotalResults(data.total_results);
        console.log(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getSearchedMovies();
  }, [movieName]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className={css.form}>
        <input type="text" name="search" id="search" className={css.input} />
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

















