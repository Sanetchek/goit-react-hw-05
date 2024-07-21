import BounceLoader from "react-spinners/BounceLoader";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.overlay}>
      <BounceLoader className={css.loader} color="#000" size={60} />
    </div>
  );
}

