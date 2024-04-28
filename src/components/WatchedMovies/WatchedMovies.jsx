import Watched from "./Watched";
import styles from "./WatchedMovies.module.scss";

function WatchedMovies({ watchedMoviesData, onDeleteWatchedMovie, rating }) {
  return (
    <div className={styles.watchedMoviesMainCont}>
      <h2>Watched Movies</h2>
      <ul>
        {watchedMoviesData.map((movie) => (
          <Watched
            key={movie.id}
            movie={movie}
            onDeleteWatchedMovie={onDeleteWatchedMovie}
            rating={rating}
          />
        ))}
      </ul>
    </div>
  );
}

export default WatchedMovies;
