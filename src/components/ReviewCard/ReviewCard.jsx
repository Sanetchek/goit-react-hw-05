import css from './ReviewCard.module.css';

export default function ReviewCard({ review }) {
  return (
    <div className={css.reviewCard}>
      {review.author_details.avatar_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
          alt={review.author_details.name}
          className={css.avatar}
        />
      )}
      <div className={css.reviewContent}>
        <h3 className={css.authorName}>{review.author}</h3>
        <p className={css.rating}>Rating: {review.author_details.rating}</p>
        <p className={css.content}>{review.content}</p>
      </div>
    </div>
  );
};

