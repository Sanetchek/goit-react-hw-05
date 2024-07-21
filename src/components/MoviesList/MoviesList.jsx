import css from "./MoviesList.module.css";
import MovieCard from "../MovieCard/MovieCard";

export default function MoviesList({ movies, genres }) {
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
