import { useWatchedMovies } from "../../contexts/WatchedMoviesProvider";
import Message from "../Message/Message";
import Watched from "./Watched";
import styles from "./WatchedMovies.module.scss";

function WatchedMovies() {
  const { watchedMoviesData } = useWatchedMovies();
  //Displaying a message in the watchedMovies box if there are no watched movies added
  if (!watchedMoviesData?.length)
    return (
      <div className={styles.message}>
        <h2>Watched Movies</h2>
        <Message
          className={styles.messageDets}
          messsage="👋 Hey fellow movie enthusiast, step into the cinematic universe! Add your favorite film to your watched list by searching and rating it here! 🎥🍿"
        />
      </div>
    );

  return (
    <div className={styles.watchedMoviesMainCont}>
      <h2>Watched Movies</h2>
      <ul className={styles.watchedCont}>
        {watchedMoviesData?.map((movie) => (
          <Watched key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default WatchedMovies;
