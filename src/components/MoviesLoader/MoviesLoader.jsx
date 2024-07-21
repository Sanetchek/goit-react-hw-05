import SyncLoader from "react-spinners/SyncLoader";
import css from './MoviesLoader.module.css'

export default function MoviesLoader() {
  return (
    <div className={css.container}>
      <SyncLoader className={css.loader} color="#000" size={10} />
    </div>
  );
}





