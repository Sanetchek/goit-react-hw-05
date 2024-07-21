import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieCredits } from "../../movies-api";
import toast from "react-hot-toast";
import css from "./CastPage.module.css";

export default function CastPage() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCastInfo() {
      try {
        const data = await movieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getCastInfo();
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {cast.length > 0 ? (
        cast.map((item) => (
          <li key={item.id} className={css.castItem}>
            {item.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                alt={item.name}
                className={css.castImage}
              />
            ) : (
              <div className={css.placeholder}></div>
            )}
            <div className={css.castDetails}>
              <h3>{item.name}</h3>
              <p>Character: {item.character}</p>
            </div>
          </li>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </ul>
  );
}






