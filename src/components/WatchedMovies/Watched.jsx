import styles from "./WatchedMovies.module.scss";
import { X } from "@phosphor-icons/react";

function Watched({ movie, onDeleteWatchedMovie, rating }) {
  // console.log(movie);

  const {
    poster_path: poster,
    title,
    runtime,
    vote_average: movieRating,
  } = movie;

  return (
    <li className={styles.watchedListCont}>
      <div className={styles.watchedImgCont}>
        <img
          src={`https://image.tmdb.org/t/p/w780${poster}`}
          alt={title}
          className={styles.watchedImg}
        />
      </div>
      <div className={styles.watchedDetsCont}>
        <div className={styles.watchedDets}>
          <p className={styles.watchedTitle}>{title}</p>
          <div className={styles.watchedMovieSpecifics}>
            <p>⭐️ {Number(movieRating).toFixed(1)}</p>
            <p>🤩 {rating}</p>
            <p>⏱ {runtime} min</p>
            {/* <button onClick={() => onDeleteWatchedMovie(movie.id)}>X</button> */}
          </div>
        </div>
        <button
          className={styles.deleteBtn}
          onClick={() => onDeleteWatchedMovie(movie.id)}
        >
          <X color="#fff" size={12} />
        </button>
      </div>
    </li>
  );
}

export default Watched;
