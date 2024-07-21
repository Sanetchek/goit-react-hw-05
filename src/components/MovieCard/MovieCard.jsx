import { Link } from "react-router-dom";
import css from "./MovieCard.module.css";

// Helper function to get genre names
const getGenres = (genreIds, genres) => {
  return genreIds
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "Unknown";
    })
    .join(", ");
};

export default function MovieCard({ movie, genres }) {
  return (
    <div className={css.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className={css.moviePoster}
      />
      <div className={css.movieDetails}>
        <h2 className={css.movieTitle}>{movie.title}</h2>
        <p className={css.movieOverview}>{movie.overview}</p>
        <p className={css.movieRating}>Rating: {movie.vote_average} / 10</p>
        <p className={css.movieGenre}>
          Genre: {getGenres(movie.genre_ids, genres)}
        </p>

        <Link to={`/movies/${movie.id}`}>Read More</Link>
      </div>
    </div>
  );
}

