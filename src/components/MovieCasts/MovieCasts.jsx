import { useEffect, useState } from "react";
import Casts from "./Casts";
import styles from "./MovieCasts.module.scss";

const KEY = "9b22856c339406c84c600cdd45f5d532";

function MovieCasts({ movieId }) {
  const [castData, setCastData] = useState({});

  // const { casts } = castData;

  useEffect(
    function () {
      async function getCastsData() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}`
        );

        const data = await res.json();
        setCastData(data);
        console.log(data);
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
