import React from "react";
import css from "./MovieDetails.module.css";

export default function MovieDetails({ info }) {
  return (
    <div className={css.container}>
      <h1 className={css.header}>{info.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
        alt={info.title}
        className={css.poster}
      />
      <div className={css.details}>
        <div className={css.detailItem}>
          <strong>Overview:</strong> {info.overview}
        </div>
        <div className={css.detailItem}>
          <strong>Release Date:</strong> {info.release_date}
        </div>
        <div className={css.detailItem}>
          <strong>Rating:</strong> {info.vote_average} ({info.vote_count} votes)
        </div>
        <div className={css.detailItem}>
          <strong>Genres:</strong>
          <div className={css.genres}>
            {info.genres.map((genre) => (
              <span key={genre.id} className={css.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className={css.detailItem}>
          <strong>Tagline:</strong> {info.tagline}
        </div>
        <div className={css.detailItem}>
          <strong>Production Companies:</strong>
          <ul>
            {info.production_companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>
        <div className={css.detailItem}>
          <strong>Homepage:</strong>{" "}
          <a href={info.homepage} target="_blank" rel="noopener noreferrer">
            {info.homepage}
          </a>
        </div>
      </div>
    </div>
  );
}

