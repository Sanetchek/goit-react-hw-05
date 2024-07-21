import { Suspense, useEffect, useRef, useState } from "react";
import {
  NavLink,
  useParams,
  Outlet,
  useLocation,
  Link
} from "react-router-dom";
import { movieDetails } from "../../movies-api.js";
import toast from "react-hot-toast";
import MovieDetails from "../../components/MovieDetails/MovieDetails.jsx";
import MoviesLoader from "../../components/MoviesLoader/MoviesLoader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from './MoviePage.module.css';
import clsx from "clsx";

export const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.tab, isActive && css.activeTab);
};

export default function MoviePage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  console.log(location);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setLoader(true);
        setError(false);

        const data = await movieDetails(movieId);
        setInfo(data);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    }

    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backLinkRef.current}>← Go Back</Link>

      {loader && <MoviesLoader />}

      {error ? <ErrorMessage /> : info && <MovieDetails info={info} />}

      <div className={css.tabs}>
        <NavLink to="cast" className={makeNavLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={makeNavLinkClass}>
          Reviews
        </NavLink>
      </div>

      <Suspense fallback={<MoviesLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
