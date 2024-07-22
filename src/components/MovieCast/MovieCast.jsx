import css from './MovieCast.module.css'

export default function MovieCast({item}) {
  return (
    <>
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
    </>
  );
};
