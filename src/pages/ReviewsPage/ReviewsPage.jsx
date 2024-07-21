import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieReviews } from "../../movies-api";
import toast from "react-hot-toast";
import css from "./ReviewsPage.module.css";

export default function ReviewsPage() {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function getreviewInfo() {
      try {
        const data = await movieReviews(movieId);
        setReview(data.review);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getreviewInfo();
  }, [movieId]);

  if (!review) {
    return <p>No review information available.</p>;
  }

  return <p>{!review ? 'No review information available.' : review}</p>;
}








