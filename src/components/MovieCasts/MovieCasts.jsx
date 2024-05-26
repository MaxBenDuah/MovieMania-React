import { useEffect, useState } from "react";

import Casts from "./Casts";
import styles from "./MovieCasts.module.scss";
import { useWatchedMovies } from "../../contexts/WatchedMoviesProvider";

const KEY = "9b22856c339406c84c600cdd45f5d532";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieCasts() {
  const { movieId } = useWatchedMovies();
  const [castData, setCastData] = useState({});

  useEffect(
    function () {
      async function getCastsData() {
        const res = await fetch(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`
        );

        const data = await res.json();
        setCastData(data);
      }

      getCastsData();
    },
    [movieId]
  );

  return (
    <div>
      <h2>Top Cast</h2>
      <ul className={styles.movieCastCont}>
        {castData?.cast?.slice(0, 10).map((cast) => (
          <Casts key={cast.id} cast={cast} />
        ))}
      </ul>
    </div>
  );
}

export default MovieCasts;
