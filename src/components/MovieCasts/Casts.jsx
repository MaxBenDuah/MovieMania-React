import styles from "./MovieCasts.module.scss";

function Casts({ cast }) {
  const { character, name, profile_path: poster } = cast;
  return (
    <li>
      <div className={styles.castImgCont}>
        <img
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={name}
          className={styles.castImg}
        />
      </div>
      <div className={styles.characterName}>
        <p>
          <strong>{name}</strong>
        </p>
        <p>{character}</p>
      </div>
    </li>
  );
}

export default Casts;
