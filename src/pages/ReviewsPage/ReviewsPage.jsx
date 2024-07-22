import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieReviews } from "../../movies-api";
import toast from "react-hot-toast";

import css from "./ReviewsPage.module.css";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function ReviewsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviewInfo() {
      try {
        setLoader(true);
        setError(false);

        const data = await movieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
    getReviewInfo();
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      {loader && <MoviesLoader />}
      {error && <ErrorMessage />}
      {!error && !loader && reviews.length === 0 && (
        <p>No review information available.</p>
      )}
      {!error && !loader && reviews.length > 0 && (
        <div className={css.reviewsList}>
          {reviews.map((review) => (
            <MovieReviews key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
