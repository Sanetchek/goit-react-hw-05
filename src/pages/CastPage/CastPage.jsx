import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieCredits } from "../../movies-api";
import toast from "react-hot-toast";
import css from "./CastPage.module.css";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function CastPage() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCastInfo() {
      try {
        setLoader(true);
        setError(false);

        const data = await movieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }
    getCastInfo();
  }, [movieId]);

  return (
    <>
      {loader && <MoviesLoader />}

      {error ? (
        <ErrorMessage />
      ) : (
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
      )}
    </>
  );
}














