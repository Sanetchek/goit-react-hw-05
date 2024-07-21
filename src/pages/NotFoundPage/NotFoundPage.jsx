import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.errorCode}>404</h1>
      <p className={css.message}>Page Not Found</p>
      <NavLink to="/" className={css.homeLink}>
        Go to Home
      </NavLink>
    </div>
  );
}



