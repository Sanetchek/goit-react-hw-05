import { Link, NavLink } from "react-router-dom";
import css from './Navigation.module.css';
import logo from "../../images/logo.svg";
import clsx from "clsx";

export const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation(params) {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link to="/" className={css.logoLink}>
          <img src={logo} alt="logo" className={css.logoImg} />
        </Link>

        <ul className={css.navList}>
          <li className={css.navLink}>
            <NavLink to="/" className={makeNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={css.navLink}>
            <NavLink to="/movies" className={makeNavLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};







