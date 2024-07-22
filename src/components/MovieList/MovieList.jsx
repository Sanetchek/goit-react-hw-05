import css from "./MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList({ movies, genres }) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <MovieCard movie={movie} genres={genres} />
        </li>
      ))}
    </ul>
  );
}
