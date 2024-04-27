import styles from "./MovieCasts.module.scss";

function Casts({ cast }) {
  const { character, name, profile_path: poster } = cast;
  return (
    <li>
      <img
        src={`https://image.tmdb.org/t/p/w780${poster}`}
        alt={name}
        className={styles.castImg}
      />
      <p>{name}</p>
      <p>{character}</p>
    </li>
  );
}

export default Casts;
